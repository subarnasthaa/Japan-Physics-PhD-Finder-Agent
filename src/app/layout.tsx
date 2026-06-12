import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Japan Physics PhD Finder - For Nepali Students",
  description: "Comprehensive guide for Nepali MSc Physics students from Tribhuvan University to find PhD programs in Japan. Explore Imperial Universities, RIKEN, KEK, JAEA, MEXT scholarships, JSPS Fellowships, and get AI-powered assistance.",
  keywords: ["Japan", "PhD", "Physics", "MEXT", "JSPS", "RIKEN", "KEK", "Imperial University", "Japanese universities", "Nepal", "Tribhuvan University", "study in Japan", "IELTS", "doctoral scholarship", "Monbukagakusho"],
  authors: [{ name: "Japan Physics PhD Finder" }],
  openGraph: {
    title: "Japan Physics PhD Finder",
    description: "Find your Physics PhD in Japan - Guide for Nepali Physics students with MEXT, RIKEN, JSPS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan Physics PhD Finder",
    description: "Find your Physics PhD in Japan - Guide for Nepali Physics students with MEXT, RIKEN, JSPS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
