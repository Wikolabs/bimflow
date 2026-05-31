import { NextResponse } from "next/server";
import { chat, isConfigured } from "@/lib/llm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT_FR = `Tu es BimFlow, un agent IA d'analyse BIM pour BIM managers, architectes et bureaux d'etudes. Tu inspectes un modele 3D (IFC ou nuage de points) et produis un rapport d'extraction de specs + detection de clashes, dans le style d'un livrable BIM coordination.

Format de sortie exact en MARKDOWN :
**📐 Specifications extraites**
- [3-4 puces, chaque puce mentionne un element du modele (mur, poutre, gaine MEP, espace) avec une mesure realiste : surface m2, volume m3, longueur, nombre d'occurrences]

**⚠️ Clashes detectes**
- [2-3 puces decrivant des conflits geometriques realistes : ex "Gaine VMC traverse poutre IPE220 niveau R+2 zone A", avec severite Haute/Moyenne/Faible]

**📤 Livrables suggeres**
- [2-3 puces : format d'export et destinataire entre crochets, ex GeoJSON [Geometre], CSV [Quantitatif], JSON Revit [BIM Manager]]

Tu DOIS inventer des valeurs realistes pour la demo (ne dis JAMAIS "je ne peux pas analyser un fichier"). Tu joues le role d'un BIM coordinateur senior qui a parse le projet ce matin. Reste technique, evite le marketing. Maximum 350 mots.`;

const SYSTEM_PROMPT_EN = `You are BimFlow, an AI BIM analysis agent for BIM managers, architects and engineering offices. You inspect a 3D model (IFC or point cloud) and produce a spec extraction + clash detection report, styled as a BIM coordination deliverable.

Exact MARKDOWN output format:
**📐 Extracted specifications**
- [3-4 bullets, each mentions a model element (wall, beam, MEP duct, space) with realistic measurement: m2 area, m3 volume, length, occurrence count]

**⚠️ Detected clashes**
- [2-3 bullets describing realistic geometric conflicts: e.g. "HVAC duct crosses IPE220 beam level R+2 zone A", with severity High/Medium/Low]

**📤 Suggested deliverables**
- [2-3 bullets: export format and target in brackets, e.g. GeoJSON [Surveyor], CSV [Quantity surveyor], JSON Revit [BIM Manager]]

You MUST invent realistic values for the demo (NEVER say "I cannot analyze a file"). You play a senior BIM coordinator who parsed the project this morning. Stay technical, avoid marketing. Maximum 350 words.`;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const projectName: string = typeof body.projectName === "string" ? body.projectName.trim() : "";
    const roomTypes: string = typeof body.roomTypes === "string" ? body.roomTypes.trim() : "";
    const format: string = typeof body.format === "string" ? body.format.trim() : "IFC";
    const lang: "fr" | "en" = body.lang === "en" ? "en" : "fr";

    if (!projectName) {
      return NextResponse.json(
        { error: lang === "fr" ? "Entrez un nom de projet BIM." : "Enter a BIM project name." },
        { status: 400 }
      );
    }

    if (!isConfigured()) {
      return NextResponse.json(
        {
          error: "llm_not_configured",
          message: lang === "fr"
            ? "Demo en mode statique — la cle LLM sera configuree au prochain deploiement."
            : "Static demo mode — LLM key will be configured at next deploy.",
          mockBrief: buildMockBrief(projectName, roomTypes, format, lang),
        },
        { status: 200 }
      );
    }

    const userMsg = lang === "fr"
      ? `Projet BIM : ${projectName}\nFormat source : ${format}\nTypes d'espaces declares : ${roomTypes || "non precise"}\n\nGenere le rapport d'extraction + clashes pour ce modele.`
      : `BIM project: ${projectName}\nSource format: ${format}\nDeclared space types: ${roomTypes || "unspecified"}\n\nGenerate the spec extraction + clash report for this model.`;

    const { text, model } = await chat(
      [
        { role: "system", content: lang === "fr" ? SYSTEM_PROMPT_FR : SYSTEM_PROMPT_EN },
        { role: "user", content: userMsg },
      ],
      900
    );

    return NextResponse.json({ brief: text, model, generatedAt: new Date().toISOString() });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "unknown";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

function buildMockBrief(project: string, rooms: string, format: string, lang: "fr" | "en"): string {
  const r = rooms || (lang === "fr" ? "bureaux, sanitaires, circulation" : "offices, restrooms, circulation");
  if (lang === "en") {
    return `**📐 Extracted specifications**\n- Project ${project} (${format}): 1,847 walls parsed, total surface 12,430 m2, average thickness 18 cm.\n- 412 spaces classified across declared types (${r}). Total net floor area 8,920 m2.\n- 96 IPE structural beams detected, longest span 11.2 m, total steel weight estimate 41.6 t.\n- MEP network: 2.1 km of HVAC ducts, 380 sprinkler heads, 1,240 electrical points.\n\n**⚠️ Detected clashes**\n- HVAC duct crosses IPE220 beam level R+2 zone A — Severity: High (rerouting required before structural sign-off).\n- Sprinkler line conflict with suspended ceiling grid level R+1 (47 occurrences) — Severity: Medium.\n- Door swing zone overlap with electrical cabinet in 6 technical rooms — Severity: Low.\n\n**📤 Suggested deliverables**\n- GeoJSON of spaces + quantities, push to [Quantity Surveyor].\n- Clash report XLSX with screenshots per item, push to [BIM Manager].\n- Revit-ready JSON parameters bundle, push to [Architect lead].`;
  }
  return `**📐 Specifications extraites**\n- Projet ${project} (${format}) : 1 847 murs parses, surface totale 12 430 m2, epaisseur moyenne 18 cm.\n- 412 espaces classifies sur les types declares (${r}). Surface utile nette 8 920 m2.\n- 96 poutres IPE structurelles detectees, portee max 11,2 m, poids acier total estime 41,6 t.\n- Reseau MEP : 2,1 km de gaines VMC, 380 tetes sprinkler, 1 240 points electriques.\n\n**⚠️ Clashes detectes**\n- Gaine VMC traverse poutre IPE220 niveau R+2 zone A — Severite : Haute (re-routage requis avant validation structure).\n- Conflit sprinkler / trame faux-plafond niveau R+1 (47 occurrences) — Severite : Moyenne.\n- Empietement debattement porte / armoire electrique dans 6 locaux techniques — Severite : Faible.\n\n**📤 Livrables suggeres**\n- GeoJSON des espaces + quantites, envoi a [Geometre].\n- Rapport clash XLSX avec capture par item, envoi a [BIM Manager].\n- Bundle parametres JSON Revit-ready, envoi a [Architecte chef].`;
}
