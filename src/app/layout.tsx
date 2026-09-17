import type { Metadata } from "next";
import { Playfair_Display, Pinyon_Script, Plus_Jakarta_Sans, Cinzel } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700"],
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  variable: "--font-pinyon",
  weight: ["400"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Akram & Maryam | The Wedding Celebration",
  description: "You are cordially invited to celebrate the union of Akram & Maryam on Saturday, 8th August 2026 at Oak Ray Regency, Kandy.",
  openGraph: {
    title: "Akram & Maryam | Wedding Invitation",
    description: "Saturday, 8th August 2026 at Oak Ray Regency, Kandy. Join us in celebrating our union.",
    type: "website",
    locale: "en_US",
    siteName: "Akram & Maryam Wedding",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akram & Maryam | Wedding Invitation",
    description: "Saturday, 8th August 2026 at Oak Ray Regency, Kandy.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${cinzel.variable} ${pinyon.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-gray-dark bg-cream overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
