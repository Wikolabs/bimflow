"""BimFlow demo backend — production-ready POC.

In production: this service would also parse IFC/LAS files server-side, run
clash detection via geometric engines, and produce BCF deliverables.
For the demo: it only invokes the LLM and returns the brief.
"""
from datetime import datetime, timezone
from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .llm import chat, is_configured

app = FastAPI(
    title="BimFlow Demo Backend",
    description="POC backend — Groq/Gemini LLM. No third-party connections.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────────────────────────────────────────
# Prompts
# ─────────────────────────────────────────────────────────────────────────────
SYSTEM_PROMPT_FR = """Tu es BimFlow, un agent IA d'analyse BIM pour BIM managers, architectes et bureaux d'etudes. Tu inspectes un modele 3D (IFC ou nuage de points) et produis un rapport d'extraction de specs + detection de clashes, dans le style d'un livrable BIM coordination.

Format de sortie exact en MARKDOWN :
**📐 Specifications extraites**
- [3-4 puces, chaque puce mentionne un element du modele (mur, poutre, gaine MEP, espace) avec une mesure realiste : surface m2, volume m3, longueur, nombre d'occurrences]

**⚠️ Clashes detectes**
- [2-3 puces decrivant des conflits geometriques realistes : ex "Gaine VMC traverse poutre IPE220 niveau R+2 zone A", avec severite Haute/Moyenne/Faible]

**📤 Livrables suggeres**
- [2-3 puces : format d'export et destinataire entre crochets, ex GeoJSON [Geometre], CSV [Quantitatif], JSON Revit [BIM Manager]]

Tu DOIS inventer des valeurs realistes pour la demo (ne dis JAMAIS "je ne peux pas analyser un fichier"). Tu joues le role d'un BIM coordinateur senior qui a parse le projet ce matin. Reste technique, evite le marketing. Maximum 350 mots."""

SYSTEM_PROMPT_EN = """You are BimFlow, an AI BIM analysis agent for BIM managers, architects and engineering offices. You inspect a 3D model (IFC or point cloud) and produce a spec extraction + clash detection report, styled as a BIM coordination deliverable.

Exact MARKDOWN output format:
**📐 Extracted specifications**
- [3-4 bullets, each mentions a model element (wall, beam, MEP duct, space) with realistic measurement: m2 area, m3 volume, length, occurrence count]

**⚠️ Detected clashes**
- [2-3 bullets describing realistic geometric conflicts: e.g. "HVAC duct crosses IPE220 beam level R+2 zone A", with severity High/Medium/Low]

**📤 Suggested deliverables**
- [2-3 bullets: export format and target in brackets, e.g. GeoJSON [Surveyor], CSV [Quantity surveyor], JSON Revit [BIM Manager]]

You MUST invent realistic values for the demo (NEVER say "I cannot analyze a file"). You play a senior BIM coordinator who parsed the project this morning. Stay technical, avoid marketing. Maximum 350 words."""


# ─────────────────────────────────────────────────────────────────────────────
# Models
# ─────────────────────────────────────────────────────────────────────────────
class GenerateRequest(BaseModel):
    project_name: str = Field(..., min_length=1)
    room_types: str = ""
    format: str = "IFC"
    lang: Literal["fr", "en"] = "fr"


class GenerateResponse(BaseModel):
    brief: str
    model: str
    generated_at: str
    static_mode: bool = False


# ─────────────────────────────────────────────────────────────────────────────
# Routes
# ─────────────────────────────────────────────────────────────────────────────
@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "bimflow-backend",
        "llm_configured": is_configured(),
    }


@app.post("/process", response_model=GenerateResponse)
async def process(req: GenerateRequest) -> GenerateResponse:
    project_name = req.project_name.strip()
    if not project_name:
        raise HTTPException(status_code=400, detail="empty_project_name")

    room_types = req.room_types.strip()
    fmt = req.format.strip() or "IFC"
    now_iso = datetime.now(timezone.utc).isoformat()

    user_msg = (
        f"Projet BIM : {project_name}\nFormat source : {fmt}\nTypes d'espaces declares : {room_types or 'non precise'}\n\nGenere le rapport d'extraction + clashes pour ce modele."
        if req.lang == "fr"
        else f"BIM project: {project_name}\nSource format: {fmt}\nDeclared space types: {room_types or 'unspecified'}\n\nGenerate the spec extraction + clash report for this model."
    )

    if not is_configured():
        return GenerateResponse(
            brief=_build_mock_brief(project_name, room_types, fmt, req.lang),
            model="static-mock",
            generated_at=now_iso,
            static_mode=True,
        )

    try:
        text, model = await chat(
            [
                {"role": "system", "content": SYSTEM_PROMPT_FR if req.lang == "fr" else SYSTEM_PROMPT_EN},
                {"role": "user", "content": user_msg},
            ],
            max_tokens=900,
        )
    except Exception:
        return GenerateResponse(
            brief=_build_mock_brief(project_name, room_types, fmt, req.lang),
            model="static-mock",
            generated_at=now_iso,
            static_mode=True,
        )

    return GenerateResponse(brief=text, model=model, generated_at=now_iso)


# ─────────────────────────────────────────────────────────────────────────────
# Mock brief (used when no LLM key configured)
# ─────────────────────────────────────────────────────────────────────────────
def _build_mock_brief(project: str, rooms: str, fmt: str, lang: str) -> str:
    r = rooms or ("bureaux, sanitaires, circulation" if lang == "fr" else "offices, restrooms, circulation")
    if lang == "en":
        return (
            f"**📐 Extracted specifications**\n"
            f"- Project {project} ({fmt}): 1,847 walls parsed, total surface 12,430 m2, average thickness 18 cm.\n"
            f"- 412 spaces classified across declared types ({r}). Total net floor area 8,920 m2.\n"
            f"- 96 IPE structural beams detected, longest span 11.2 m, total steel weight estimate 41.6 t.\n"
            f"- MEP network: 2.1 km of HVAC ducts, 380 sprinkler heads, 1,240 electrical points.\n\n"
            f"**⚠️ Detected clashes**\n"
            f"- HVAC duct crosses IPE220 beam level R+2 zone A — Severity: High (rerouting required before structural sign-off).\n"
            f"- Sprinkler line conflict with suspended ceiling grid level R+1 (47 occurrences) — Severity: Medium.\n"
            f"- Door swing zone overlap with electrical cabinet in 6 technical rooms — Severity: Low.\n\n"
            f"**📤 Suggested deliverables**\n"
            f"- GeoJSON of spaces + quantities, push to [Quantity Surveyor].\n"
            f"- Clash report XLSX with screenshots per item, push to [BIM Manager].\n"
            f"- Revit-ready JSON parameters bundle, push to [Architect lead]."
        )
    return (
        f"**📐 Specifications extraites**\n"
        f"- Projet {project} ({fmt}) : 1 847 murs parses, surface totale 12 430 m2, epaisseur moyenne 18 cm.\n"
        f"- 412 espaces classifies sur les types declares ({r}). Surface utile nette 8 920 m2.\n"
        f"- 96 poutres IPE structurelles detectees, portee max 11,2 m, poids acier total estime 41,6 t.\n"
        f"- Reseau MEP : 2,1 km de gaines VMC, 380 tetes sprinkler, 1 240 points electriques.\n\n"
        f"**⚠️ Clashes detectes**\n"
        f"- Gaine VMC traverse poutre IPE220 niveau R+2 zone A — Severite : Haute (re-routage requis avant validation structure).\n"
        f"- Conflit sprinkler / trame faux-plafond niveau R+1 (47 occurrences) — Severite : Moyenne.\n"
        f"- Empietement debattement porte / armoire electrique dans 6 locaux techniques — Severite : Faible.\n\n"
        f"**📤 Livrables suggeres**\n"
        f"- GeoJSON des espaces + quantites, envoi a [Geometre].\n"
        f"- Rapport clash XLSX avec capture par item, envoi a [BIM Manager].\n"
        f"- Bundle parametres JSON Revit-ready, envoi a [Architecte chef]."
    )
