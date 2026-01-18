import type { Metadata } from "next";
import { Lato } from 'next/font/google';
import "./globals.css";
import BalloonWrapper from "@/components/balloons/BalloonWrapper";
import { LanguageProvider } from "@/components/hooks/language";


const lato = Lato({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Ylikellotus 2026",
  description: "Vuoden 2026 ylikellotus on nyt täällä! Tervetuloa juhlimaan maailman tylsimmille synttäreille. Meillä on pallomeri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
      {/*<header className="fixed left-0 right-0 h-16 z-50 top-0 bg-blue-700 text-white flex flex-row items-center justify-between mx-auto px-4 py-3 sm:px-6">
          <div className="flex flex-row gap-2">
            <Link href="/"><strong className="text-2xl">Ylikelatus 2026</strong></Link>
          </div>
          <div className="flex flex-row gap-2">
          </div>
        </header>*/}
        <LanguageProvider>
          <BalloonWrapper>
            <main className="min-h-screen">
              {children}
            </main>
          </BalloonWrapper>
        </LanguageProvider>
       {/*
        <footer className="bg-blue-700 text-white flex justify-between px-4 py-3 text-sm">
          <div className="flex gap-0 flex-col md:gap-2 md:flex-row self-end">
            <p>© 2026 Tietokilta</p>
            <p>Kaikki oikeudet pidätetään</p>
          </div>
          <div className="flex gap-2 flex-col md:gap-4 md:flex-row">
          </div>
        </footer> */}
      </body>
    </html >
  );
}
