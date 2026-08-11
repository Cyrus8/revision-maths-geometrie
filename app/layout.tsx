import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RévisionMaths — catalogue de problèmes",
  description: "Catalogue de problèmes de maths interactifs, classés par classe et par chapitre.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
