export default function BIMFlowPage() {
  return (
    <main style={{ fontFamily: "var(--font-body)", color: "#111827" }}>
      {/* Nav */}
      <nav style={{ background: "#111827", padding: "0 2rem", borderBottom: "1px solid #374151" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <span style={{ fontFamily: "var(--font-display)", color: "#f3f4f6", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            BIM<span style={{ color: "#6b7280" }}>Flow</span>
          </span>
          <a
            href="https://calendly.com/wikolabs" target="_blank" rel="noopener noreferrer"
            style={{ background: "transparent", color: "#9ca3af", padding: "0.4rem 1.1rem", borderRadius: 4, fontWeight: 600, fontSize: "0.8rem", textDecoration: "none", border: "1px solid #374151", textTransform: "uppercase", letterSpacing: "0.08em" }}
          >
            Démo
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem 3rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", color: "#6b7280", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.25rem", borderLeft: "2px solid #374151", paddingLeft: "0.75rem" }}>
            BIM · Point Cloud · IFC
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: 1.1, marginBottom: "1.25rem", color: "#111827", letterSpacing: "0.02em" }}>
            Votre maquette<br />numérique analysée.<br /><span style={{ color: "#6b7280" }}>Automatiquement.</span>
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#4b5563", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 440 }}>
            BIMFlow ingère vos fichiers IFC et nuages de points, extrait les informations géométriques et les livre en données structurées exploitables.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <a
              href="https://calendly.com/wikolabs"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", background: "#374151", color: "#f9fafb", padding: "0.75rem 1.75rem", borderRadius: 4, fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "0.08em" }}
            >
              📅 Réserver un créneau →
            </a>
            <a
              href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20BIMFlow%20avec%20Wikolabs."
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", background: "#25d366", color: "#fff", padding: "0.75rem 1.75rem", borderRadius: 4, fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "0.08em" }}
            >
              💬 WhatsApp →
            </a>
          </div>
        </div>

        {/* 3D Wireframe Grid */}
        <div style={{ position: "relative", aspectRatio: "1/0.85" }}>
          <svg viewBox="0 0 400 340" style={{ width: "100%", height: "100%" }} xmlns="http://www.w3.org/2000/svg">
            {/* Grid floor */}
            {[0,1,2,3,4,5,6].map(i => (
              <line key={`h${i}`} x1={50 + i*50} y1={50} x2={50 + i*50 - 80} y2={260} stroke="#d1d5db" strokeWidth="0.6" />
            ))}
            {[0,1,2,3,4].map(i => (
              <line key={`v${i}`} x1={50} y1={50 + i*52.5} x2={350} y2={50 + i*52.5 - 35} stroke="#d1d5db" strokeWidth="0.6" />
            ))}
            {/* Building outline */}
            <polygon points="120,200 280,200 280,100 200,60 120,100" fill="none" stroke="#374151" strokeWidth="1.5" />
            <line x1="200" y1="60" x2="200" y2="200" stroke="#6b7280" strokeWidth="0.8" strokeDasharray="4,3" />
            <line x1="120" y1="150" x2="280" y2="150" stroke="#6b7280" strokeWidth="0.8" strokeDasharray="4,3" />
            {/* Dimensions */}
            <line x1="120" y1="220" x2="280" y2="220" stroke="#374151" strokeWidth="1" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
            <text x="200" y="234" textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="monospace">24.80 m</text>
            <line x1="295" y1="100" x2="295" y2="200" stroke="#374151" strokeWidth="1" />
            <text x="310" y="155" fontSize="9" fill="#6b7280" fontFamily="monospace">12.4 m</text>
            {/* Point cloud dots */}
            {[
              [140,130],[160,125],[180,135],[200,128],[220,132],[240,130],[260,127],
              [145,160],[165,155],[185,162],[205,158],[225,160],[245,155],
              [150,190],[170,188],[190,192],[210,190],[230,188],[250,190]
            ].map(([cx,cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="2" fill={i % 3 === 0 ? "#374151" : i % 3 === 1 ? "#6b7280" : "#9ca3af"} />
            ))}
            <defs>
              <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6" fill="none" stroke="#374151" strokeWidth="1" />
              </marker>
            </defs>
          </svg>
          {/* Overlay badges */}
          <div style={{ position: "absolute", top: "12%", right: "5%", background: "#111827", color: "#9ca3af", fontSize: "0.65rem", fontFamily: "var(--font-display)", padding: "0.35rem 0.7rem", borderRadius: 3, letterSpacing: "0.08em", border: "1px solid #374151" }}>
            IFC 4.0 ✓
          </div>
          <div style={{ position: "absolute", bottom: "15%", left: "0%", background: "#f9fafb", color: "#374151", fontSize: "0.65rem", fontFamily: "var(--font-display)", padding: "0.35rem 0.7rem", borderRadius: 3, letterSpacing: "0.08em", border: "1px solid #e5e7eb" }}>
            1.2M points
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section style={{ background: "#111827", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", textAlign: "center" }}>
          {[
            ["< 3 min", "Traitement 100M pts"],
            ["± 2 mm", "Précision géométrique"],
            ["12+", "Formats supportés"],
            ["100%", "Export automatique"],
          ].map(([val, label]) => (
            <div key={label} style={{ borderLeft: "1px solid #374151", paddingLeft: "1.5rem" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "#f9fafb", letterSpacing: "0.04em" }}>{val}</div>
              <div style={{ fontSize: "0.72rem", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.25rem" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#374151", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2.5rem", textAlign: "center" }}>
            Capacités techniques
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "1.25rem" }}>
            {[
              { title: "IFC Parsing", desc: "Lecture des modèles IFC 2x3 et 4.0. Extraction des éléments structurels, MEP, espaces et propriétés associées." },
              { title: "Point Cloud Segmentation", desc: "Classification automatique des nuages de points : sol, murs, poutres, équipements. Algorithme RANSAC + deep learning." },
              { title: "Export automatique", desc: "Résultats livrés en GeoJSON, CSV, JSON structuré ou directement dans votre BIM 360 / Autodesk Forge via API." },
            ].map((f) => (
              <div key={f.title} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 6, padding: "1.75rem", borderTop: "2px solid #374151" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 700, color: "#111827", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>{f.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#374151", padding: "4rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#f9fafb", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>
          Automatisez votre pipeline BIM
        </h2>
        <p style={{ color: "#9ca3af", marginBottom: "2rem", fontSize: "0.95rem" }}>Intégration possible avec Revit, ArchiCAD, Autodesk Forge et tout système IFC compatible.</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="https://calendly.com/wikolabs"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", background: "#f9fafb", color: "#111827", padding: "0.9rem 2.5rem", borderRadius: 4, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "0.1em" }}
          >
            📅 Réserver un créneau →
          </a>
          <a
            href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20BIMFlow%20avec%20Wikolabs."
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", background: "#25d366", color: "#fff", padding: "0.9rem 2.5rem", borderRadius: 4, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "0.1em" }}
          >
            💬 WhatsApp →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#111827", padding: "1.25rem 2rem", textAlign: "center", borderTop: "1px solid #374151" }}>
        <p style={{ color: "#6b7280", fontSize: "0.8rem", margin: 0, fontFamily: "var(--font-display)", letterSpacing: "0.06em" }}>© 2025 BIMFlow — Un produit Wikolabs</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", marginTop: "0.5rem", fontSize: "0.8rem" }}>
          <a href="mailto:team@wikolabs.com" style={{ textDecoration: "none", color: "inherit" }}>team@wikolabs.com</a>
          <span>·</span>
          <a href="tel:+261386626100" style={{ textDecoration: "none", color: "inherit" }}>+261 38 66 261 00</a>
          <span>·</span>
          <a href="https://calendly.com/wikolabs" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>Prendre RDV</a>
        </div>
      </footer>
    </main>
  );
}
