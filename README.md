# BIMFlow — Analyse et collaboration sur les maquettes BIM/IFC

> Votre maquette numérique analysée automatiquement. Conflits détectés. Quantitatifs extraits.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org)
[![IFC.js](https://img.shields.io/badge/IFC.js-2.0-blue?style=flat)](https://ifcjs.github.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat&logo=postgresql)](https://postgresql.org)

---

## Vue d'ensemble

BIMFlow est une plateforme d'analyse de maquettes BIM (Building Information Modeling) au format IFC. Elle parse les fichiers IFC 2x3 et 4.0, extrait les éléments structurels, MEP (Mechanical, Electrical, Plumbing), espaces et propriétés, détecte les conflits (clash detection), et génère les quantitatifs pour les métrés automatiques.

**Domaine :** AEC (Architecture, Engineering, Construction) / BIM  
**Port VM :** 3022 | **Sous-domaine :** bimflow.wikolabs.com

---

## Stack technique

| Couche | Technologie | Rôle |
|--------|------------|------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS | Viewer IFC 3D, tableau de bord analyse |
| Backend | FastAPI (Python 3.11), Uvicorn | API parsing IFC, clash detection, quantitatifs |
| IFC Parsing | **IfcOpenShell** (Python) | Lecture IFC 2x3 + 4.0 |
| 3D Viewer | **IFC.js** (Three.js) | Visualisation IFC dans le browser |
| Clash Detection | Custom (shapely + numpy) | Détection intersections géométriques |
| Storage | Minio (S3-compatible) | Fichiers IFC |
| Base de données | PostgreSQL 16 | Projets, éléments, conflits, quantitatifs |
| Queue | Celery + Redis | Parsing async |
| Infra | Docker Compose, Nginx | VM mono-repo (port 3022) |

### backend/requirements.txt
```
fastapi==0.111.0
uvicorn[standard]==0.29.0
ifcopenshell==0.7.0
shapely==2.0.4
numpy==1.26.4
pandas==2.2.2
celery==5.4.0
redis==5.0.4
asyncpg==0.29.0
sqlalchemy[asyncio]==2.0.30
pydantic==2.7.1
boto3==1.34.0
```

---

## Architecture mono-repo

```
bimflow/
├── frontend/
│   ├── src/app/
│   │   ├── page.tsx              # Dashboard projets BIM
│   │   ├── projects/[id]/        # Viewer IFC + analyse
│   │   ├── clashes/              # Liste conflits détectés
│   │   └── quantities/           # Tableau quantitatifs
│   └── src/components/
│       ├── IfcViewer.tsx         # IFC.js Three.js 3D viewer
│       ├── ClashList.tsx         # Liste conflits avec navigation
│       ├── ElementTree.tsx       # Arbre hiérarchique IFC
│       ├── QuantityTable.tsx     # Tableau métrés par catégorie
│       └── PropertyPanel.tsx     # Propriétés IFC d'un élément
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/
│   │   │   ├── projects.py       # Upload IFC + CRUD
│   │   │   ├── elements.py       # GET éléments + propriétés
│   │   │   ├── clashes.py        # GET conflits détectés
│   │   │   └── quantities.py     # GET quantitatifs
│   │   ├── services/
│   │   │   ├── ifc_parser.py     # IfcOpenShell parsing
│   │   │   ├── clash_detector.py # Intersection géométrique
│   │   │   ├── quantity_engine.py# Calcul surfaces/volumes
│   │   │   └── export.py         # Export Excel/BCF
│   │   └── models/
│   │       └── ifc_element.py
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
└── .github/workflows/deploy.yml
```

---

## Diagrammes UML

### Architecture système

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#374151', 'primaryTextColor': '#fff', 'primaryBorderColor': '#1f2937', 'lineColor': '#374151', 'secondaryColor': '#f9fafb'}}}%%
flowchart TB
    subgraph VM["🖥️ VM — Docker Compose (port 3022)"]
        NEXT["Next.js 14\nBIM Platform"]
        API["FastAPI"]
        CELERY["Celery Workers\nIFC parsing async"]

        subgraph BIM["🏗️ BIM Engine"]
            IFC["IfcOpenShell\nIFC 2x3 + 4.0 parsing"]
            CLASH["Clash Detector\nGeometric intersections"]
            QTO["Quantity Takeoff\nSurfaces + volumes"]
        end

        PG[("PostgreSQL\nElements + Clashes")]
        MINIO[("Minio S3\nIFC files")]
    end

    REVIT["Revit / ArchiCAD\nIFC export"] --> MINIO
    MINIO --> IFC
```

### Séquence — Analyse d'une maquette IFC

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#374151', 'primaryTextColor': '#fff', 'lineColor': '#374151'}}}%%
sequenceDiagram
    participant BIM_MGR as BIM Manager
    participant API as FastAPI
    participant MINIO as Minio
    participant CELERY as Celery
    participant IFC as IfcOpenShell
    participant CLASH as Clash Detector
    participant QTO as Quantity Engine

    BIM_MGR->>API: POST /projects/upload (maquette.ifc)
    API->>MINIO: store(maquette.ifc)
    API->>CELERY: enqueue_analysis(project_id)
    API-->>BIM_MGR: {project_id, status: "processing"}

    CELERY->>IFC: open_file(maquette.ifc)
    IFC-->>CELERY: {elements_count: 12450, schema: IFC4}

    CELERY->>IFC: extract_elements(types=[IfcWall, IfcSlab, IfcBeam, IfcDoor, IfcWindow, IfcDuctSegment])
    IFC-->>CELERY: [{guid, type, name, storey, properties, geometry}...]

    CELERY->>CLASH: detect_clashes(elements_geometry)
    CLASH-->>CELERY: [{clash_type: HARD, elem1: duct_01, elem2: beam_14, location: {x, y, z}}...]

    CELERY->>QTO: compute_quantities(elements)
    QTO-->>CELERY: {walls_m2: 2840, slabs_m2: 1200, columns_m3: 180, doors_count: 47}

    CELERY->>API: analysis_complete(project_id, 12450 elements, 23 clashes)
    API-->>BIM_MGR: {elements: 12450, clashes: 23, quantities: {...}}
```

### Modèle de données (ER)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#374151', 'primaryTextColor': '#fff', 'lineColor': '#374151'}}}%%
erDiagram
    BIM_PROJECT {
        uuid id PK
        string name
        string ifc_schema
        string ifc_s3_key
        int elements_count
        int clashes_count
        string status
        timestamp uploaded_at
    }
    IFC_ELEMENT {
        uuid id PK
        uuid project_id FK
        string ifc_guid
        string ifc_type
        string name
        string storey
        jsonb properties
        jsonb geometry_bbox
    }
    CLASH {
        uuid id PK
        uuid project_id FK
        string clash_type
        string element1_guid
        string element2_guid
        jsonb location
        string status
        string discipline
    }
    QUANTITY {
        uuid id PK
        uuid project_id FK
        string element_type
        string unit
        float value
        string storey
    }

    BIM_PROJECT ||--o{ IFC_ELEMENT : "contains"
    BIM_PROJECT ||--o{ CLASH : "has"
    BIM_PROJECT ||--o{ QUANTITY : "quantified_as"
    IFC_ELEMENT }o--o{ CLASH : "involved_in"
```

---

## PRD

### Problème
La coordination entre les disciplines (structure, MEP, architecte) sur les projets BIM est manuelle. Les conflits entre gaines de ventilation et poutres ne sont découverts qu'en chantier, coûtant 5-10x plus cher à corriger. Les métrés sont ressaisis manuellement depuis la maquette par les économistes.

### Solution
BIMFlow analyse automatiquement les maquettes IFC dès leur upload : détection de conflits en quelques secondes, extraction des quantitatifs (surfaces, volumes, comptage) par catégorie et par niveau, et viewer 3D pour naviguer les éléments en conflit.

### Utilisateurs cibles
| Persona | Besoin |
|---------|--------|
| BIM Manager | Coordination inter-disciplinaire, clash detection |
| Économiste de la Construction | Métrés automatiques depuis la maquette |
| Architecte / Ingénieur | Vérification qualité IFC, navigation éléments |

### OKRs
- 100% des conflits HARD détectés (recall = 1.0)
- Temps d'analyse < 5 minutes pour une maquette 50 000 éléments
- Précision quantitatifs ≤ 2% vs métrés manuels

---

## User Stories

```
US-01 [BIM Manager] En tant que BIM Manager,
      je veux uploader la maquette IFC consolidée (structure + MEP)
      et voir en 5 minutes tous les conflits HARD détectés
      afin de les soumettre aux disciplines concernées.

US-02 [Économiste] En tant qu'économiste,
      je veux extraire les métrés (m² de murs, m³ de béton, nb portes)
      par niveau et par lot
      afin d'alimenter mon tableur d'estimation sans ressaisie.

US-03 [BIM Manager] En tant que BIM Manager,
      je veux naviguer en 3D vers le conflit détecté
      et voir les deux éléments en conflit mis en surbrillance
      afin de transmettre le screenshot exact aux ingénieurs concernés.

US-04 [Architecte] En tant qu'architecte,
      je veux voir l'arbre hiérarchique IFC (site → bâtiment → niveau → espace → éléments)
      et cliquer sur un élément pour voir ses propriétés IFC
      afin de vérifier la qualité de notre modélisation.

US-05 [Manager] En tant que directeur technique,
      je veux un rapport PDF des conflits
      (localisation, éléments en cause, discipline, statut résolution)
      afin de le partager en réunion de coordination BIM.
```

---

## Règles métier

| # | Règle | Description | Simulable UI |
|---|-------|-------------|-------------|
| R1 | IFC versions | IFC 2x3 et IFC4 / IFC4.1 supportés | ✅ Schema badge |
| R2 | Clash HARD | Intersection géométrique réelle (volume commun > 0) | ✅ Clash count |
| R3 | Clash SOFT | Clearance violation (distance < seuil configurable) | ✅ Soft clash |
| R4 | Disciplines | Clash entre Structure et MEP prioritaire (rouge), MEP vs MEP (orange) | ✅ Discipline filter |
| R5 | Quantitatifs | Murs: m², Dalles: m², Poteaux: m³, Menuiseries: nb | ✅ Quantity table |
| R6 | Par niveau | Quantitatifs filtrables par étage | ✅ Storey filter |
| R7 | Export BCF | Conflits exportables au format BCF 2.1 (standard BIM) | ✅ BCF export |
| R8 | Export Excel | Quantitatifs exportables CSV/Excel | ✅ Excel export |
| R9 | Statut clash | Open → In Review → Resolved (workflow collaboratif) | ✅ Clash workflow |
| R10 | Big IFC | Streaming parsing pour IFC > 500 Mo | ✅ Progress bar |

---

## Spécification API

**Base URL :** `http://bimflow.wikolabs.com/api/v1`

### POST /projects/upload
```
Content-Type: multipart/form-data
file: maquette.ifc, project_name: "Tour Montparnasse RDC"
// Response: {"project_id": "p_xyz", "status": "processing", "eta_seconds": 60}
```

### GET /projects/{id}/clashes
```json
// Response: {"clashes": [{"type": "HARD", "elem1": {"type": "IfcDuct", "name": "DUCT-01"}, "elem2": {"type": "IfcBeam", "name": "BEAM-14"}, "location": {"x": 12.4, "y": 3.2, "z": 6.8}}], "count": 23}
```

### GET /projects/{id}/quantities
```json
// Response: {"by_type": {"IfcWall": {"m2": 2840, "by_storey": {"R+1": 720}}, "IfcSlab": {"m2": 1200}}}
```

---

## Simulation UI

| Composant | Description |
|-----------|-------------|
| **IFC 3D Viewer** | IFC.js (Three.js) : navigation orbite/pan/zoom, sélection éléments |
| **Clash Navigator** | Liste conflits → clic → camera zoom sur conflit dans viewer |
| **Element Tree** | Arbre hiérarchique IFC filtrable par type/niveau |
| **Quantity Table** | Tableau métrés par catégorie et niveau |
| **Property Panel** | Panneau propriétés IFC de l'élément sélectionné |

---

## Déploiement

```yaml
version: "3.9"
services:
  postgres:
    image: postgres:16-alpine
    environment: {POSTGRES_DB: bimflow, POSTGRES_USER: bf_user, POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"}
  redis:
    image: redis:7-alpine
  minio:
    image: minio/minio
    command: server /data
    environment: {MINIO_ROOT_USER: "${MINIO_USER}", MINIO_ROOT_PASSWORD: "${MINIO_PASSWORD}"}
  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql+asyncpg://bf_user:${POSTGRES_PASSWORD}@postgres/bimflow
      MINIO_URL: "http://minio:9000"
    depends_on: [postgres, redis, minio]
    expose: ["8000"]
  worker:
    build: ./backend
    command: celery -A app.worker worker --loglevel=info
    depends_on: [redis]
  frontend:
    build: ./frontend
    expose: ["3000"]
  nginx:
    image: nginx:alpine
    ports: ["3022:80"]
volumes:
  pg_data:
  minio_data:
```

---

## Roadmap

### Phase 1 — MVP
- [ ] Parsing IFC IfcOpenShell
- [ ] Visualisation IFC.js 3D
- [ ] Quantitatifs automatiques

### Phase 2 — Coordination
- [ ] Clash detection HARD + SOFT
- [ ] Export BCF 2.1
- [ ] Workflow résolution conflits

### Phase 3 — IA
- [ ] Classification automatique gravité conflits (ML)
- [ ] Suggestion résolution (LLM)
- [ ] Intégration BIM 360 / Procore

---

*Un produit [Wikolabs](https://wikolabs.com) — Intelligence artificielle appliquée aux métiers*
