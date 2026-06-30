import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Alpha Company | Software Engineering Studio",
    template: "%s | Alpha Company",
  },
  description:
    "Alpha Company designs, builds, and scales modern software products through expert engineering, AI, and cloud technologies.",
  metadataBase: new URL("https://alphacompany.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Alpha Company | Engineering Software That Lasts.",
    description:
      "Engineering-first software studio building digital products, AI solutions, and scalable platforms for ambitious businesses.",
    url: "https://alphacompany.com",
    siteName: "Alpha Company",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpha Company | Engineering Software That Lasts.",
    description:
      "Engineering-first software studio building digital products, AI solutions, and scalable platforms.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background-primary text-text-primary selection:bg-accent-blue/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
