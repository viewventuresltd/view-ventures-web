import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://viewventures.co"),
  title: "View Ventures | Multi-Sector Company",
  description:
    "View Ventures operates across transportation, travel, real estate, wellness, and technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
