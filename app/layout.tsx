import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Khaḍga & Chāitya | Kathmandu Valley Heritage Guide",
  description:
    "Explore 51 heritage places across Kathmandu, Lalitpur, and Bhaktapur through a faithful guide to the valley's temples, courtyards, and sacred sites.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Khaḍga & Chāitya | Kathmandu Valley Heritage Guide",
    description:
      "A guide to Kathmandu Valley’s historic temples, squares, stupas, and pilgrimage sites.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--ink)] text-[var(--foreground)]">{children}</body>
    </html>
  );
}
