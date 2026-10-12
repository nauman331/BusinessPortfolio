import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { SplashScreen } from "@/components/site/splash-screen";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas-neue" });

export const metadata: Metadata = {
  title: "Nauman Studio",
  description: "Simple Next.js frontend starter with shadcn/ui, Framer Motion, and Lenis.",
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
