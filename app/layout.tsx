import type { Metadata } from "next";
import { Averia_Serif_Libre, Hanken_Grotesk } from "next/font/google";
import { MetaPixel } from "@/app/components/MetaPixel";
import "./globals.css";

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const display = Averia_Serif_Libre({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orbit by Glow Gadget — the SD card reader that doubles as a charm",
  description:
    "Orbit is a compact SD and microSD card reader that doubles as a bag charm. Move photos from your camera to your phone in seconds. Join the release list for early access.",
  openGraph: {
    type: "website",
    siteName: "Glow Gadget",
    title: "Orbit by Glow Gadget — share your photos before the night ends",
    description:
      "A compact SD card reader that doubles as a bag charm. Join the release list for launch updates and early access.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        <MetaPixel />
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
