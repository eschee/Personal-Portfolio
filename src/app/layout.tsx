import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

// next/font downloads these at build time and serves them from this site,
// so visitors' browsers never contact Google.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Thomas Scheel",
    // Child pages set a title like "WhoToRoot"; this turns it into
    // "WhoToRoot · Thomas Scheel" in the browser tab.
    template: "%s · Thomas Scheel",
  },
  description: "Projects by Thomas Scheel.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
