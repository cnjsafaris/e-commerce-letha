import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import { StructuredData } from "@/components/structured-data"
import { Toaster } from "@/components/ui/sonner"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "LethaShop - Designs by L.S | Premier Goods",
    template: "%s | LethaShop",
  },
  description:
    "Discover our collection of premier goods at LethaShop. Designs by L.S - where quality meets style in every product.",
  keywords: [
    "LethaShop",
    "Designs by L.S",
    "premier goods",
    "quality products",
    "online shopping",
    "fashion accessories",
    "lifestyle products",
    "premium quality",
    "handcrafted items",
  ],
  authors: [{ name: "Designs by L.S" }],
  creator: "Designs by L.S",
  publisher: "LethaShop",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://lethashop.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lethashop.vercel.app",
    siteName: "LethaShop",
    title: "LethaShop - Designs by L.S | Premier Goods",
    description:
      "Discover our collection of premier goods at LethaShop. Designs by L.S - where quality meets style in every product.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "LethaShop - Designs by L.S",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@lethashop",
    creator: "@designsbyls",
    title: "LethaShop - Designs by L.S | Premier Goods",
    description:
      "Discover our collection of premier goods at LethaShop. Designs by L.S - where quality meets style in every product.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} antialiased`}>
      <head>
        <StructuredData type="organization" />
        <link rel="canonical" href="https://lethashop.vercel.app" />
      </head>
      <body>
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}
