import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ViewModeProvider } from "@/lib/context/ViewModeContext";
import { WaitlistProvider } from "@/lib/context/WaitlistContext";
import { AuthProvider } from "@/lib/context/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FDE Agency - Forward Deployed Engineers",
  description: "Professional agency connecting elite Forward Deployed Engineers with companies building AI systems. Pre-vetted talent, simulation-based assessment, rapid deployment.",
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
        <AuthProvider>
          <ViewModeProvider>
            <WaitlistProvider>
              <Navigation />
              <main className="pt-20">{children}</main>
            </WaitlistProvider>
          </ViewModeProvider>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
