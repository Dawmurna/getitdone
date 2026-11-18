import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "GetItDone | Real people. Real skills. Real help.",
  description: "Find trusted artisans, professionals and experts near you and book them in minutes.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F26B1D",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <AppProvider>
          <Navbar />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
