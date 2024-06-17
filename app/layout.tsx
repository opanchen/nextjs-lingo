import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";

import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lingo",
  description: "Learn, practice and master new languages with Lingo.",
  keywords: "Learning, Language, Foreign Languages, Application",
  manifest: "/meta/site.webmanifest",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL as string),
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL as string,
  },
  openGraph: {
    title: "Lingo",
    description: "Learn, practice and master new languages with Lingo.",
    siteName: "Lingo",
    locale: "en-US",
    url: process.env.NEXT_PUBLIC_APP_URL as string,
    images: [
      {
        url: "/meta/ogp-image.jpg",
        width: 2048,
        height: 1280,
        alt: "Lingo app",
      },
    ],
  },
  icons: {
    icon: [
      {
        url: "/meta/favicon.ico",
      },
      {
        url: "/meta/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/meta/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/meta/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    shortcut: "/meta/favicon.ico",
    apple: "/meta/apple-touch-icon.png",
    other: {
      rel: "/meta/apple-touch-icon.png",
      url: "/meta/apple-touch-icon.png",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
