import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Glow Gadget — Playful utility, practical accessory",
  description:
    "A compact, stylish way to upload and share digital-camera photos shortly after taking them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
