import type { Metadata, Viewport } from "next";
import { Luckiest_Guy, Inter } from "next/font/google";
import "./globals.css";

const luckiestGuy = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  title: "Footle | Spotle de Jogadores",
  description: "Adivinhe o jogador de futebol do dia das 5 grandes ligas."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${luckiestGuy.variable} ${inter.variable}`}>
      <body className="relative min-h-screen">
        {/* Ilustração do Campo de Futebol Completo em CSS */}
        <div className="pitch-overlay" aria-hidden="true">
          {/* Áreas dos Gols (Esquerda e Direita) */}
          <div className="pitch-goal pitch-goal-left" />
          <div className="pitch-goal pitch-goal-right" />

          {/* Arcos de Escanteio (4 cantos) */}
          <div className="pitch-corner pitch-corner-tl" />
          <div className="pitch-corner pitch-corner-tr" />
          <div className="pitch-corner pitch-corner-bl" />
          <div className="pitch-corner pitch-corner-br" />
        </div>

        {/* Conteúdo da Aplicação acima do campo */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
