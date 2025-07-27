import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";

import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Authenticate from "@/components/Authenticate";
import NextTopLoader from "nextjs-toploader";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dummy Shop",
  description: "Dummy Shop description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistMono.className}>
        <Authenticate/>
        <NextTopLoader color="#6200EE"/>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
