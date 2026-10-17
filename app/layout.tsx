import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { SplashScreen } from "@/components/site/splash-screen";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas-neue" });

export const metadata: Metadata = {
  title: "Samad Calli — AI Calling Agent for Security Providers",
  description: "AI calling agent integration for security provider websites with live roster management and 24/7 automated guard dispatch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${bebasNeue.variable} bg-background text-foreground antialiased font-sans`}>
        <SplashScreen />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
