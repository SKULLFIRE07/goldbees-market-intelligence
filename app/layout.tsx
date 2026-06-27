import "./globals.css";
import type { Metadata, Viewport } from "next";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="flex min-h-screen flex-col md:flex-row">
          <Sidebar />
          <MobileNav />
          <div className="flex-1 min-w-0 flex flex-col md:border-l border-black">
            <Header />
            <main className="flex-1 p-4 md:p-8">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
