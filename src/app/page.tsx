"use client";
import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG — Each LP customizes only this block
// ─────────────────────────────────────────────────────────────────────────────
const P = {
  name: "BimFlow",
  waPhone: "261386626100",
  palette: {
    mode: "light" as "dark" | "light",
    bg: "#F1F5F9",
    bg2: "#E2E8F0",
    surface: "rgba(0,0,0,0.035)",
    border: "rgba(0,0,0,0.08)",
    txt1: "#0F172A",
    txt2: "#475569",
    txt3: "#94A3B8",
    accent: "#0F172A",
    accentSoft: "rgba(15,23,42,0.08)",
    accentBorder: "rgba(15,23,42,0.30)",
    accentGlow: "rgba(15,23,42,0.10)",
    navBg: "rgba(241,245,249,0.85)",
  },
  content: {
    fr: {
      langLabel: "FR",
      tagLabel: "BIM · IFC · Nuage de points · IA",
      taglines: ["Vos maquettes IFC ingerees.", "Vos geometries extraites.", "Automatiquement."],
      taglineAccentIdx: 2,
      desc: "BimFlow analyse vos fichiers IFC et nuages de points 3D, extrait les informations geometriques avec une precision au millimetre et livre les donnees structurees directement dans vos outils metier.",
      navLinks: [
        { label: "Fonctionnalites", href: "#features" },
        { label: "Comment ca marche", href: "#process" },
        { label: "Pourquoi maintenant", href: "#why" },
        { label: "Contact", href: "#cta" },
      ],
      metrics: [
        { value: "<3min", label: "100M points traites" },
        { value: "±2mm", label: "precision geometrique" },
        { value: "12+", label: "formats supportes" },
        { value: "100%", label: "export automatique" },
      ],
      features: [
        { icon: "🏗️", title: "Parsing IFC complet", desc: "Lecture des modeles IFC 2x3 et 4.0. Extraction des elements structurels, MEP, espaces et proprietes associees — livrables en JSON structure." },
        { icon: "☁️", title: "Segmentation nuage de points", desc: "Classification automatique des nuages de points : sol, murs, poutres, equipements. Algorithme RANSAC + deep learning. Compatible LAS, LAZ, E57." },
        { icon: "📦", title: "Export multi-format", desc: "Resultats livres en GeoJSON, CSV, JSON ou directement dans votre BIM 360, Autodesk Forge ou Revit via API. Zero manipulation manuelle." },
      ],
      steps: [
        { num: "01", title: "Deposez vos fichiers IFC ou nuages de points", desc: "Glissez-deposez vos fichiers sur l'interface ou connectez votre bucket cloud. BimFlow accepte IFC, LAS, LAZ, E57, RCP et plus de 12 formats." },
        { num: "02", title: "L'agent analyse et extrait", desc: "BimFlow segmente, classe et extrait les informations geometriques et semantiques. Chaque element est identifie, mesure et rattache a ses proprietes IFC." },
        { num: "03", title: "Donnees livrees dans vos outils", desc: "Export automatique vers votre BIM 360, Revit, ou votre propre API. Tableaux de quantitatifs, plans de masse et donnees structurees exploitables immediatement." },
      ],
      persuasion: {
        sectionTag: "Pourquoi maintenant",
        title: "Vos modeles 3D pesent des giga-octets. Vos quantitatifs se font sur Excel.",
        paragraphs: [
          { type: "pathos", text: "Mercredi 22h31, cabinet d'architecture. Votre BIM manager est encore au bureau pour traiter le nuage de points du chantier de renovation tertiaire — 120 millions de points, scan laser realisé lundi par les geometres. Elle ouvre Cloud Compare, isole les murs porteurs a la main, exporte vers Revit, et constate qu'il manque un etage. Faute professionnelle ? Non — le scan a juste capture deux niveaux qui se superposent en plan, et personne ne pouvait le voir sans segmentation IA. Le client passe a 9h le lendemain pour valider les quantitatifs. Votre BIM manager va dormir trois heures. Cette scene se rejoue sur tous vos chantiers ou la 3D rencontre l'humain." },
          { type: "logos", text: "McKinsey mesure que les entreprises BIM avancees livrent leurs projets 20% plus vite et avec 30% moins de litiges de quantitatifs que celles qui restent sur DWG. Le marche du Scan-to-BIM croit a 18% par an parce que la legislation europeenne sur la renovation energetique impose desormais des audits geometriques precis sur le bati existant. Forrester predit que d'ici 2027, 60% des cabinets d'architecture europeens auront automatise leur pipeline IFC + nuage de points — celui qui ne le fait pas perd les appels d'offres au benefice des plus rapides." },
          { type: "ethos", text: "Wikolabs construit des agents IA en production depuis 2023 pour des scale-ups B2B, family offices et fintechs reglementees. Nous avons brule nos doigts sur les memes problemes que vous : pipelines qui hallucinent, briefs ignores, dashboards desertes. BimFlow est ce que nous avons construit pour nos propres clients exigeants avant de le proposer au marche." },
          { type: "solution", text: "Concretement : vous deposez vos fichiers IFC, LAS, LAZ, E57, RCP ou plus de 12 autres formats sur l'interface ou via votre bucket cloud. BimFlow parse les modeles IFC 2x3 et 4.0, segmente les nuages de points avec RANSAC et deep learning, identifie chaque element avec une precision de plus ou moins 2mm. Resultats exportes en GeoJSON, CSV, JSON ou directement dans Revit, BIM 360 ou Autodesk Forge via API. 100 millions de points traites en moins de 3 minutes. Votre BIM manager rentre chez elle a une heure raisonnable." },
        ],
      },
      ctaTitle: "Automatisez votre pipeline BIM des aujourd'hui",
      ctaDesc: "Premiers resultats en moins de 10 minutes. Integration Revit, ArchiCAD et Autodesk Forge incluse. Aucune carte bancaire.",
      ctaPrimary: "Reserver un appel",
      ctaWhatsApp: "WhatsApp",
      ctaDemo: "Demander une demo",
      ctaSoonBadge: "Bientot",
      footerTagline: "Agent IA BIM pour la construction et l'immobilier",
    },
    en: {
      langLabel: "EN",
      tagLabel: "BIM · IFC · Point cloud · AI",
      taglines: ["Your IFC models ingested.", "Your geometry extracted.", "Automatically."],
      taglineAccentIdx: 2,
      desc: "BimFlow analyzes your IFC files and 3D point clouds, extracts geometric information with millimeter precision, and delivers structured data directly into your business tools.",
      navLinks: [
        { label: "Features", href: "#features" },
        { label: "How it works", href: "#process" },
        { label: "Why now", href: "#why" },
        { label: "Contact", href: "#cta" },
      ],
      metrics: [
        { value: "<3min", label: "100M points processed" },
        { value: "±2mm", label: "geometric precision" },
        { value: "12+", label: "formats supported" },
        { value: "100%", label: "automated export" },
      ],
      features: [
        { icon: "🏗️", title: "Complete IFC parsing", desc: "Reads IFC 2x3 and 4.0 models. Extracts structural elements, MEP, spaces and associated properties — delivered as structured JSON." },
        { icon: "☁️", title: "Point cloud segmentation", desc: "Automatic point cloud classification: floors, walls, beams, equipment. RANSAC + deep learning. Compatible with LAS, LAZ, E57." },
        { icon: "📦", title: "Multi-format export", desc: "Results delivered as GeoJSON, CSV, JSON or directly into BIM 360, Autodesk Forge or Revit via API. Zero manual handling." },
      ],
      steps: [
        { num: "01", title: "Drop your IFC files or point clouds", desc: "Drag and drop your files onto the interface or connect your cloud bucket. BimFlow accepts IFC, LAS, LAZ, E57, RCP and 12+ formats." },
        { num: "02", title: "The agent analyzes and extracts", desc: "BimFlow segments, classifies and extracts geometric and semantic information. Every element is identified, measured and tied back to its IFC properties." },
        { num: "03", title: "Data lands in your tools", desc: "Automatic export to BIM 360, Revit, or your own API. Quantity tables, site plans and structured data immediately usable." },
      ],
      persuasion: {
        sectionTag: "Why now",
        title: "Your 3D models are gigabytes. Your takeoffs are in Excel.",
        paragraphs: [
          { type: "pathos", text: "Wednesday 10:31pm, architecture firm. Your BIM manager is still at the office processing the point cloud from the tertiary renovation site — 120 million points, laser-scanned Monday by the surveyors. She opens Cloud Compare, isolates load-bearing walls by hand, exports to Revit, and realizes a floor is missing. Professional error? No — the scan just captured two overlapping levels and nobody could see it without AI segmentation. The client comes at 9am the next day to validate the takeoffs. Your BIM manager will sleep three hours. This scene plays out on every project where 3D meets a human." },
          { type: "logos", text: "McKinsey measured that advanced BIM firms deliver projects 20% faster and with 30% fewer takeoff disputes than those still on DWG. The Scan-to-BIM market is growing 18% per year because European energy renovation legislation now mandates precise geometric audits of existing buildings. Forrester predicts that by 2027, 60% of European architecture firms will have automated their IFC + point cloud pipeline — those who don't will lose tenders to the faster ones." },
          { type: "ethos", text: "Wikolabs has been building production AI agents since 2023 for B2B scale-ups, family offices and regulated fintechs. We burned our fingers on the same problems you face: hallucinating pipelines, ignored briefs, abandoned dashboards. BimFlow is what we built for our own demanding customers before bringing it to market." },
          { type: "solution", text: "Concretely: you drop your IFC, LAS, LAZ, E57, RCP or 12+ other formats onto the interface or via cloud bucket. BimFlow parses IFC 2x3 and 4.0 models, segments point clouds with RANSAC and deep learning, identifies every element with ±2mm precision. Results exported as GeoJSON, CSV, JSON or directly into Revit, BIM 360 or Autodesk Forge via API. 100 million points processed in under 3 minutes. Your BIM manager goes home at a reasonable hour." },
        ],
      },
      ctaTitle: "Automate your BIM pipeline today",
      ctaDesc: "First results in under 10 minutes. Revit, ArchiCAD and Autodesk Forge integration included. No credit card.",
      ctaPrimary: "Book a call",
      ctaWhatsApp: "WhatsApp",
      ctaDemo: "Request a demo",
      ctaSoonBadge: "Soon",
      footerTagline: "AI BIM agent for construction and real estate",
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT — identical for all LPs
// ─────────────────────────────────────────────────────────────────────────────
export default function Page() {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const t = P.content[lang];
  const pal = P.palette;
  const isDark = pal.mode === "dark";
  const cardOverlayHover = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)";

  const waLink = `https://wa.me/${P.waPhone}?text=${encodeURIComponent(
    lang === "fr"
      ? `Bonjour, je souhaite discuter de ${P.name} avec Wikolabs.`
      : `Hello, I'd like to discuss ${P.name} with Wikolabs.`
  )}`;

  return (
    <div style={{ minHeight: "100vh", background: pal.bg, color: pal.txt1 }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        @keyframes wkBgShift { 0% { transform: translate3d(0,0,0) rotate(0deg); } 50% { transform: translate3d(-2%, 1.5%, 0) rotate(180deg); } 100% { transform: translate3d(0,0,0) rotate(360deg); } }
        .wk-bg-fx { position: fixed; inset: -10%; pointer-events: none; z-index: 0; opacity: .55; will-change: transform; animation: wkBgShift 38s linear infinite; }
        .wk-bg-fx::before, .wk-bg-fx::after { content: ""; position: absolute; inset: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulseDot { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.4; transform:scale(1.6); } }
        .wk-card { transition: background .3s, border-color .3s, transform .35s cubic-bezier(.34,1.2,.64,1); }
        .wk-card:hover { background: ${cardOverlayHover} !important; border-color: ${pal.accentBorder} !important; transform: translateY(-6px); }
        .wk-btn { transition: opacity .2s, transform .2s, box-shadow .2s; }
        .wk-btn:hover { opacity:.92; transform:translateY(-2px); box-shadow:0 12px 32px ${pal.accentGlow}; }
        .wk-btn-wa { transition: opacity .2s, transform .2s; }
        .wk-btn-wa:hover { opacity:.92; transform:translateY(-2px); }
        .wk-btn-demo { opacity:.78; transition: opacity .2s, transform .2s, background .2s; }
        .wk-btn-demo:hover { opacity:1; transform:translateY(-2px); background:${pal.accentSoft}!important; }
        .wk-nav-link { color:${pal.txt2}; text-decoration:none; font-size:14px; font-weight:500; transition:color .2s; }
        .wk-nav-link:hover { color:${pal.txt1}; }
        .wk-lang { display:inline-flex; border:1px solid ${pal.border}; border-radius:100px; padding:2px; background:${pal.surface}; }
        .wk-lang button { background:transparent; border:none; padding:4px 12px; font-size:11px; font-weight:700; letter-spacing:.5px; cursor:pointer; border-radius:100px; color:${pal.txt2}; transition: background .2s, color .2s; font-family:inherit; }
        .wk-lang button.active { background:${pal.accent}; color:${isDark ? "#04080F" : "#FFFFFF"}; }
        @media(max-width:768px){
          .wk-hide-sm{ display:none!important; }
          .wk-hero-title{ font-size:2.4rem!important; }
          .wk-section{ padding-left:20px!important; padding-right:20px!important; }
          .wk-cards-grid{ grid-template-columns: 1fr !important; max-width:380px; margin-left:auto; margin-right:auto; }
          .wk-metrics-row{ justify-content:center; }
          .wk-cta-row{ flex-direction:column; align-items:stretch; max-width:340px; margin-left:auto; margin-right:auto; }
          .wk-cta-row > *{ width:100%; justify-content:center; }
          .wk-persuasion{ padding:60px 20px!important; }
          .wk-foot{ flex-direction:column; gap:12px; text-align:center; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="wk-section" style={{ position:"sticky", top:0, zIndex:100, background:pal.navBg, backdropFilter:"blur(20px)", borderBottom:`1px solid ${pal.border}`, padding:"0 40px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontSize:18, fontWeight:800, letterSpacing:"-0.5px", color:pal.txt1 }}>
          {P.name}<span style={{ color:pal.accent }}>.</span>
        </span>
        <div style={{ display:"flex", gap:24, alignItems:"center" }}>
          <div className="wk-hide-sm" style={{ display:"flex", gap:22 }}>
            {t.navLinks.map(l => <a key={l.label} href={l.href} className="wk-nav-link">{l.label}</a>)}
          </div>
          <div className="wk-lang" role="group" aria-label="language">
            <button type="button" className={lang==="fr"?"active":""} onClick={()=>setLang("fr")}>FR</button>
            <button type="button" className={lang==="en"?"active":""} onClick={()=>setLang("en")}>EN</button>
          </div>
          <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' className="wk-btn"
            style={{ background:pal.accent, color:isDark?"#04080F":"#FFFFFF", border:"none", borderRadius:8, padding:"9px 18px", fontWeight:700, fontSize:13.5, cursor:"pointer", fontFamily:"inherit" }}>
            {t.ctaPrimary} →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="wk-section" style={{ padding:"100px 40px 80px", maxWidth:1040, margin:"0 auto", textAlign:"center", position:"relative" }}>
        <div style={{ position:"absolute", top:-60, left:"50%", transform:"translateX(-50%)", width:720, height:600, background:`radial-gradient(ellipse at 50% 30%, ${pal.accentGlow} 0%, transparent 60%)`, pointerEvents:"none" }} />
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:24, background:pal.accentSoft, border:`1px solid ${pal.accentBorder}`, borderRadius:100, padding:"6px 18px", animation:"fadeUp .5s ease both" }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:pal.accent, display:"inline-block", animation:"pulseDot 2s ease-in-out infinite" }} />
          <span style={{ color:pal.accent, fontSize:11.5, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase" }}>{t.tagLabel}</span>
        </div>
        <h1 className="wk-hero-title" style={{ fontSize:"clamp(2.6rem,6vw,5rem)", fontWeight:700, lineHeight:1.08, letterSpacing:"-0.03em", marginBottom:28, fontFamily:"'Instrument Serif',Georgia,serif", animation:"fadeUp .5s .08s ease both" }}>
          {t.taglines.map((line, i) => (
            <span key={i} style={{ display:"block", color:i===t.taglineAccentIdx?pal.accent:pal.txt1, fontStyle:i===t.taglineAccentIdx?"italic":"normal" }}>{line}</span>
          ))}
        </h1>
        <p style={{ fontSize:"1.1rem", color:pal.txt2, lineHeight:1.72, maxWidth:600, margin:"0 auto 44px", animation:"fadeUp .5s .16s ease both" }}>{t.desc}</p>
        <div className="wk-metrics-row" style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:14, marginBottom:44, animation:"fadeUp .5s .24s ease both" }}>
          {t.metrics.map(m => (
            <div key={m.label} style={{ background:pal.surface, border:`1px solid ${pal.border}`, borderRadius:18, padding:"14px 22px", textAlign:"center", minWidth:118 }}>
              <div style={{ fontSize:"1.7rem", fontWeight:800, color:pal.txt1, letterSpacing:"-1.5px", lineHeight:1 }}>{m.value}</div>
              <div style={{ fontSize:"0.62rem", color:pal.txt3, textTransform:"uppercase", letterSpacing:"1.5px", marginTop:5 }}>{m.label}</div>
            </div>
          ))}
        </div>
        <CtaRow t={t} pal={pal} isDark={isDark} waLink={waLink} />
      </section>

      {/* FEATURES */}
      <section id="features" className="wk-section" style={{ padding:"80px 40px", maxWidth:1100, margin:"0 auto" }}>
        <SectionHead pal={pal} tag={lang==="fr"?"Fonctionnalites":"Features"} title={lang==="fr"?"Tout automatise, <em>rien a gerer</em>":"Fully automated, <em>nothing to manage</em>"} />
        <div className="wk-cards-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:20 }}>
          {t.features.map((f, i) => (
            <div key={f.title} className="wk-card" style={{ background:pal.surface, border:`1px solid ${pal.border}`, borderRadius:20, padding:"28px 28px 26px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${pal.accent},transparent)`, opacity:.55 }} />
              <div style={{ fontSize:"2rem", marginBottom:16 }}>{f.icon}</div>
              <h3 style={{ fontSize:"1.05rem", fontWeight:700, color:pal.txt1, marginBottom:10 }}>{f.title}</h3>
              <p style={{ fontSize:"0.88rem", color:pal.txt2, lineHeight:1.7, margin:0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="process" className="wk-section" style={{ padding:"80px 40px", background:pal.bg2 }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <SectionHead pal={pal} tag={lang==="fr"?"Comment ca marche":"How it works"} title={lang==="fr"?"En place en <em>10 minutes</em>":"Live in <em>10 minutes</em>"} />
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {t.steps.map((s, i) => (
              <div key={s.num} style={{ display:"flex", alignItems:"flex-start", gap:22, background:pal.surface, border:`1px solid ${pal.border}`, borderRadius:18, padding:"22px 26px" }}>
                <div style={{ flexShrink:0, width:46, height:46, background:pal.accentSoft, border:`1px solid ${pal.accentBorder}`, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", color:pal.accent, fontWeight:800, fontSize:15 }}>
                  {s.num}
                </div>
                <div>
                  <h3 style={{ fontSize:"1rem", fontWeight:700, color:pal.txt1, marginBottom:6, lineHeight:1.3 }}>{s.title}</h3>
                  <p style={{ fontSize:"0.87rem", color:pal.txt2, lineHeight:1.7, margin:0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERSUASION — pathos / logos / ethos / solution */}
      <section id="why" className="wk-persuasion wk-section" style={{ padding:"100px 40px", maxWidth:860, margin:"0 auto" }}>
        <SectionHead pal={pal} tag={t.persuasion.sectionTag} title={t.persuasion.title} />
        <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
          {t.persuasion.paragraphs.map((p, i) => {
            const labelMap: Record<string, { fr: string; en: string }> = {
              pathos:   { fr: "L'enjeu humain",  en: "What's at stake" },
              logos:    { fr: "Les faits",       en: "The facts" },
              ethos:    { fr: "Notre legitimite", en: "Our credibility" },
              solution: { fr: "Notre reponse",   en: "Our answer" },
            };
            const label = labelMap[p.type]?.[lang] ?? "";
            return (
              <div key={i} style={{ borderLeft:`2px solid ${pal.accentBorder}`, paddingLeft:22 }}>
                <div style={{ fontSize:"0.62rem", fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:pal.accent, marginBottom:10 }}>{label}</div>
                <p style={{ fontSize:"1.02rem", color:pal.txt2, lineHeight:1.85, margin:0 }}>{p.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="wk-section" style={{ padding:"0 40px 100px", maxWidth:860, margin:"0 auto" }}>
        <div style={{ background:pal.surface, border:`1px solid ${pal.accentBorder}`, borderRadius:24, padding:"64px 48px", textAlign:"center", backgroundImage:`radial-gradient(ellipse at 50% 0%, ${pal.accentSoft} 0%, transparent 65%)` }}>
          <p style={{ fontSize:"0.68rem", color:pal.accent, letterSpacing:"3px", textTransform:"uppercase", fontWeight:700, marginBottom:16 }}>{lang==="fr"?"Demarrer":"Get started"}</p>
          <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:700, color:pal.txt1, marginBottom:14, letterSpacing:"-0.02em", fontFamily:"'Instrument Serif',Georgia,serif" }}>{t.ctaTitle}</h2>
          <p style={{ color:pal.txt2, fontSize:"1rem", marginBottom:36, lineHeight:1.7, maxWidth:540, margin:"0 auto 36px" }}>{t.ctaDesc}</p>
          <CtaRow t={t} pal={pal} isDark={isDark} waLink={waLink} />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="wk-section" style={{ borderTop:`1px solid ${pal.border}`, padding:"32px 40px" }}>
        <div className="wk-foot" style={{ maxWidth:1200, margin:"0 auto", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:16 }}>
          <div>
            <span style={{ fontWeight:800, fontSize:16, color:pal.txt1 }}>{P.name}</span><span style={{ color:pal.accent }}>.</span>
            <span style={{ display:"block", fontSize:12, color:pal.txt3, marginTop:3 }}>{t.footerTagline}</span>
          </div>
          <p style={{ fontSize:13, color:pal.txt3, margin:0 }}>© 2026 {P.name} — {lang==="fr"?"Un produit":"A product by"} <a href="https://wikolabs.com" style={{ color:pal.txt2, textDecoration:"none" }}>Wikolabs</a></p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:16, fontSize:13, alignItems:"center" }}>
            <a href="mailto:team@wikolabs.com" style={{ color:pal.txt3, textDecoration:"none" }}>team@wikolabs.com</a>
            <span style={{ color:pal.txt3 }}>·</span>
            <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' style={{ background:"none", border:"none", color:pal.txt3, fontSize:13, cursor:"pointer", fontFamily:"inherit", padding:0 }}>{t.ctaPrimary}</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function SectionHead({ pal, tag, title }: { pal: typeof P.palette; tag: string; title: string }) {
  return (
    <div style={{ textAlign:"center", marginBottom:52 }}>
      <p style={{ fontSize:"0.68rem", color:pal.accent, letterSpacing:"3px", textTransform:"uppercase", fontWeight:700, marginBottom:14 }}>{tag}</p>
      <h2
        style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:700, color:pal.txt1, letterSpacing:"-0.02em", fontFamily:"'Instrument Serif',Georgia,serif", lineHeight:1.15, margin:0 }}
        dangerouslySetInnerHTML={{ __html: title.replace(/<em>/g, `<em style="font-style:italic;color:${pal.accent}">`) }}
      />
    </div>
  );
}

function CtaRow({ t, pal, isDark, waLink }: { t: typeof P.content.fr; pal: typeof P.palette; isDark: boolean; waLink: string }) {
  return (
    <div className="wk-cta-row" style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center", animation:"fadeUp .5s .32s ease both" }}>
      <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' className="wk-btn"
        style={{ background:pal.accent, color:isDark?"#04080F":"#FFFFFF", border:"none", borderRadius:10, padding:"14px 28px", fontWeight:700, fontSize:15, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:8, fontFamily:"inherit" }}>
        📅 {t.ctaPrimary}
      </button>
      <a href={waLink} target="_blank" rel="noopener noreferrer" className="wk-btn-wa"
        style={{ background:"#25d366", color:"#FFFFFF", borderRadius:10, padding:"14px 28px", fontWeight:700, fontSize:15, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8 }}>
        💬 {t.ctaWhatsApp}
      </a>
      <a href="/demo" className="wk-btn-demo" data-orig-btn="1"
        style={{ background:"transparent", color:pal.txt2, border:`1px solid ${pal.border}`, borderRadius:10, padding:"14px 28px", fontWeight:700, fontSize:15, display:"inline-flex", alignItems:"center", gap:10, fontFamily:"inherit", position:"relative" }}>
        ✨ {t.ctaDemo}
      </a>
    </div>
  );
}
