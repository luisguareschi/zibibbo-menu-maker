import type { Metadata } from "next";
import { Poppins, Sorts_Mill_Goudy } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const aramoFont = localFont({
  src: "../public/aramo.ttf",
  variable: "--font-aramo",
});

const goudiFont = Sorts_Mill_Goudy({
  subsets: ["latin"],
  variable: "--font-goudi",
  weight: ["400"],
});

const font = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BaseApp",
  description: "A next js template for building apps",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full w-full">
      <body
        className={cn(
          aramoFont.variable,
          goudiFont.variable,
          font.className,
          "h-full w-full",
        )}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
