import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import NavBar from './components/NavBar';
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import Hydrate from "@/app/components/Hydrate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next E-Commerce 15",
  description: "Next E-Commerce utilizando a versão 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-600`}>
          <Hydrate>
            <NavBar/>
            <main className="bg-neutral-600 h-screen p-16 overflow-y-auto overflow-x-hidden">{children}</main>
          </Hydrate>
        </body>
      </html>
    </ClerkProvider>
  );
}