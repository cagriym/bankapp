import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import ClientAuthProvider from "@/components/ClientAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Munja Banka Hoşgeldiniz!",
  description: "Munja Banka Hoşgeldiniz!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-background font-sans text-foreground antialiased ${geistSans.variable} ${geistMono.variable}`}
      >
        <ClientAuthProvider>
          <Navbar />
          {children}
        </ClientAuthProvider>
      </body>
    </html>
  );
}
