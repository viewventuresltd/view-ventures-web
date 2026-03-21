import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  weight: ["100", "200", "300", "400"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["100", "200", "300"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://viewventures.co"),
  title: "View Ventures | Multi-Sector Investment Company",
  description:
    "View Ventures operates across transportation, real estate, wellness, and technology. Third generation. First venture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
