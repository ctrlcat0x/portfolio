import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Oneko from "@/components/oneko";
import { PreloaderProvider } from "@/components/PreloaderProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { globalConfig } from "../../global.config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sahil Rana - Design Engineer",
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <PreloaderProvider>
            <LenisProvider>{children}</LenisProvider>
          </PreloaderProvider>
          {globalConfig.playfulUi.onekoFollower.enabled ? (
            <Oneko
              meow={globalConfig.playfulUi.onekoFollower.meow}
              opacity={globalConfig.playfulUi.onekoFollower.opacity}
              scale={globalConfig.playfulUi.onekoFollower.scale}
              zIndex={globalConfig.playfulUi.onekoFollower.zIndex}
              followDistance={
                globalConfig.playfulUi.onekoFollower.followDistance
              }
            />
          ) : null}
        </ThemeProvider>
      </body>
    </html>
  );
}
