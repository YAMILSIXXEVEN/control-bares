import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gestión de Bares",
  description: "Plataforma privada para administrar DRYFT, RASTER y MR TASTY.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/raster-logo.png",
    shortcut: "/raster-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
