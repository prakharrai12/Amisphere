import type { Metadata } from "next";
import { Cormorant_Garamond, Crimson_Pro, Cinzel } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const crimson = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amisphere | Amizone Classical University Portal",
  description: "A prestigious university portal featuring student, faculty, HOD, and administrative workspaces crafted in the Classical Academia tradition.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${crimson.variable} ${cinzel.variable}`}>
      <body className="bg-[#1C1714] text-[#E8DFD4] antialiased min-h-screen">
        <div className="paper-texture" aria-hidden="true" />
        <div className="vignette-overlay" aria-hidden="true" />
        <div className="relative z-10 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
