import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
});

const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: {
    default: "Aura — інтернет-магазин парфумерії",
    template: "%s | Aura",
  },
  description:
    "Оригінальна парфумерія відомих брендів. Каталог, добір аромату за квізом, швидка доставка по Україні.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${sans.variable} ${serif.variable} flex min-h-screen flex-col bg-[#faf7f2] font-[family-name:var(--font-sans)] text-stone-900 antialiased`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
