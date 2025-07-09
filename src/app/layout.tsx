import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/utilityComponents/ThemeProvider";
import Navbar from "@/components/Navbar";
import SmoothScrollProvider from "@/components/utilityComponents/SmoothScrollProvider";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // optional: to use as CSS variable
  display: "swap", // recommended for better performance
});

export const metadata: Metadata = {
  title: "Reetam BG - Portfolio",
  description: "Built with Next.js, GSAP, Lenis, Tailwind CSS and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <body>
        <ThemeProvider
          attribute="class"
          // defaultTheme="system"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
