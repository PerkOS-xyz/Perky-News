import type { Metadata } from "next";
import { Sora, Outfit } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Perky News — The Agent Economy Chronicle",
  description: "Your definitive source for x402, ERC-8004, AI agents, and Web3 infrastructure news.",
  keywords: ["x402", "ERC-8004", "AI agents", "Web3", "crypto", "DeFi", "ElizaOS", "OpenClaw"],
  openGraph: {
    title: "Perky News — The Agent Economy Chronicle",
    description: "Deep analysis of x402, ERC-8004, AI agents, and the infrastructure powering Web3's next chapter.",
    type: "website",
    siteName: "Perky News",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${sora.variable} ${outfit.variable}`}>
      <body 
        className="antialiased min-h-screen flex flex-col"
        style={{ 
          fontFamily: 'var(--font-outfit), system-ui, sans-serif',
          backgroundColor: '#FFFFFF',
          color: '#0E0716'
        }}
      >
        {children}
      </body>
    </html>
  );
}
