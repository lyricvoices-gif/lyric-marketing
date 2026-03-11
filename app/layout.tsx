import type { Metadata } from "next"
import { Cormorant_Garamond } from "next/font/google"
import "./globals.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "lyric — The AI voice platform built for intentional sound",
    template: "%s — lyric",
  },
  description:
    "Lyric is a design-led AI company creating expressive voices performed by professional actors. Built for creators, brands, and product teams.",
  metadataBase: new URL("https://lyricvoices.ai"),
  openGraph: {
    siteName: "lyric",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cormorant.variable}>
      <body>
        <Nav />
        <main style={{ paddingTop: "52px" }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
