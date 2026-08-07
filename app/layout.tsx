import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { LEAGUE_NAME, THEME } from "@/config";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

const display = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${LEAGUE_NAME} | Fantasy Football`,
  description:
    "TED DYNASTY — a 12-team fantasy football dynasty league. Live standings, bonus tracker, and draft countdown, powered by Sleeper.",
  icons: {
    icon: "/ted-49ers-transparent.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} dark`}>
      <body
        className="min-h-screen bg-ink-900 font-sans text-ink-100 antialiased"
        style={
          {
            "--color-primary": THEME.primary,
            "--color-accent": THEME.accent,
          } as React.CSSProperties
        }
      >
        <NavBar />
        <main className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
