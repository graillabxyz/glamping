import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hortensia Field Glamping Village Proposal",
  description: "A sustainable mountain retreat partnership proposal for the local village. Low-impact tourism with direct community profit sharing.",
  keywords: ["glamping", "bali", "sustainable tourism", "village partnership", "hortensia field", "eco-friendly"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
