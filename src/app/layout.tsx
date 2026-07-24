import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AppShell } from "@/components/AppShell";
import { getCurrentMember } from "@/lib/current-member";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CORE — California Operational Roleplay Entity",
    template: "%s · CORE France Project",
  },
  description:
    "CORE France Project — collectif RolePlay FiveM (GTA V). Institutions, forces de l'ordre et univers immersif. Création fictive.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const member = await getCurrentMember();

  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <AppShell member={member}>{children}</AppShell>
      </body>
    </html>
  );
}
