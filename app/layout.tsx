import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ViewModeProvider } from "@/lib/context/ViewModeContext";
import { Navigation } from "@/components/Navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TalentLoop - AI Talent Agency for FDEs",
  description: "Deploy AI Agents. Hire the Builders. Connect with elite Forward Deployed Engineers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <ViewModeProvider>
          <Navigation />
          <main className="pt-20">{children}</main>
        </ViewModeProvider>
      </body>
    </html>
  );
}
