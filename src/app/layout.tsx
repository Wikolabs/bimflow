import type { Metadata } from "next";
import { Orbitron, Oxanium } from "next/font/google";
import "./globals.css";

const fontDisplay = Orbitron({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
});

const fontBody = Oxanium({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "BIMFlow — Votre maquette numérique analysée. Automatiquement.",
  description:
    "Traitement de nuages de points 3D, analyse BIM et extraction d'informations géométriques pour la construction et l'immobilier.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${fontDisplay.variable} ${fontBody.variable}`}
        style={{ background: "#f9fafb", fontFamily: "var(--font-body)" }}
      >
        {children}
      </body>
    </html>
  );
}
