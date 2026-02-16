import type { Metadata } from "next";
import { Inter, Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansGeorgian = Noto_Sans_Georgian({
  variable: "--font-noto-georgian",
  subsets: ["georgian"],
});

export const metadata: Metadata = {
  title: "Cleaning Service Tbilisi",
  description: "Professional cleaning services in Tbilisi with transparent pricing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${notoSansGeorgian.variable} antialiased bg-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}
