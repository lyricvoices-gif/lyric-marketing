import type { Metadata } from "next"
import { Pinyon_Script, Instrument_Serif } from "next/font/google"
import "./globals.css"
import AudioPlayerProvider from "@/components/audio/AudioPlayerProvider"
import PersistentPlaybackBar from "@/components/audio/PersistentPlaybackBar"
import Footer from "@/components/Footer"
import Nav from "@/components/Nav"
import SmoothScroll from "@/components/SmoothScroll"

// Display + body faces (GT Super, GT America) load via @font-face in
// globals.css from /public/fonts/grilli-type/. They're not Google Fonts.

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
  display: "swap",
})

// Italic-only emotional accent face. The italic style ships at weight 400 only,
// which is fine — these are pull-quote / manifesto-italic moments, never bold.
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Lyric — Real voices for real brands. Composed, not cloned.",
    template: "%s — Lyric",
  },
  description:
    "Lyric is a voice talent partnership for the AI era. Real voice actors. Transparent licensing. Ongoing compensation. Voices brands can deploy with legal clarity.",
  metadataBase: new URL("https://lyricvoices.ai"),
  openGraph: {
    siteName: "Lyric",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pinyon.variable} ${instrument.variable}`}>
      <body>
        <AudioPlayerProvider>
          <SmoothScroll />
          <Nav />
          <main>{children}</main>
          <Footer />
          <PersistentPlaybackBar />
        </AudioPlayerProvider>
      </body>
    </html>
  )
}
