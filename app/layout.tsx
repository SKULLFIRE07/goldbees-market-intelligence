import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://skullfire07.github.io/goldbees-market-intelligence";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Goldbees — Market Intelligence & Distributor Targeting",
    template: "%s · Goldbees",
  },
  description:
    "AI-powered market intelligence prototype: regional demand, distributor targeting, pricing, trends and a 90-day forecast across Amazon, Flipkart, IndiaMART, JustDial and Quick Commerce.",
  keywords: [
    "market intelligence",
    "distributor targeting",
    "demand forecasting",
    "Goldbees",
    "FMCG analytics",
    "India",
  ],
  authors: [{ name: "Goldbees" }],
  openGraph: {
    title: "Goldbees — Market Intelligence & Distributor Targeting",
    description:
      "AI-powered market intelligence prototype: regional demand, distributor targeting, pricing, trends and forecasting.",
    url: SITE_URL,
    siteName: "Goldbees",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Goldbees — Market Intelligence & Distributor Targeting",
    description:
      "AI-powered market intelligence prototype for regional demand and distributor targeting.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans">
        <div className="flex min-h-screen flex-col md:flex-row">
          <Sidebar />
          <MobileNav />
          <div className="flex-1 min-w-0 flex flex-col">
            <Header />
            <main className="flex-1 p-4 sm:p-6 lg:p-10">
              <div className="mx-auto w-full max-w-[1400px]">{children}</div>
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
