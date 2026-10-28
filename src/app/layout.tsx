import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "GoHoliday — Kailash & Tibet Tours",
  description: "Kailash Mansarovar yatras, Tibet tours and overland journeys from Kathmandu, planned by local experts.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${interTight.variable} ${instrumentSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
