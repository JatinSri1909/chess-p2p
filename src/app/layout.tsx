import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Chess P2P",
  description: "Play chess with players worldwide through P2P connections",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
