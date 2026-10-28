import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Luckiest_Guy, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display"
});

const luckiestGuy = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-luckiest"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-landing",
  weight: ["400", "500", "600", "700", "800"]
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  title: "Footle | Desafio Diário das 5 Grandes Ligas",
  description: "Adivinhe o jogador de futebol secreto do dia das 5 grandes ligas europeias em até 10 chutes."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${bebasNeue.variable} ${luckiestGuy.variable} ${inter.variable} ${plusJakartaSans.variable}`}
    >
      <body className="relative min-h-dvh">{children}</body>
    </html>
  );
}
