import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { data } from "@/data/data";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/next";
import { CommandPalette } from "@/components/command-palette/command-palette";
import { ViewTransitions } from "next-view-transitions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shivypatel.com"),
  title: "Anusan Portfolio",
  description: "A beautiful portfolio showcasing my work as a software engineer.",
  icons: {
    icon: "/anusan_logo.png",
    shortcut: "/anusan_logo.png",
    apple: "/anusan_logo.png",
  },
  openGraph: {
    type: "website",
    url: "https://shivypatel.com",
    title: "Anusan Portfolio",
    description: "Software Engineer who likes building things.",
    siteName: "Anusan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anusan Portfolio",
    description: "Software Engineer who likes building things.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased relative`}
        >
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Navbar navItems={data.nav} />
            <CommandPalette />
            <Image
              src="/layout/background-ellipse3.svg"
              alt=""
              fill={false}
              width={0}
              height={0}
              className="z-1 blur-lg absolute max-w-5xl top-0 left-1/2 transform -translate-x-1/2 -translate-y-5/9 w-full pointer-events-none select-none"
              aria-hidden="true"
              priority
            />
            {children}
            <Footer />
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  );
}
