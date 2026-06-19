import Link from "next/link"
import GovernedCallVisual from "@/components/hero/GovernedCallVisual"

/* Home hero — two columns: the statement and one animated mockup of an
   inbound call being governed by Lyric in real time (GovernedCallVisual).

   The floret image was removed here; the warm ground is now a CSS gradient
   sampled from the floret's own colors (gold core, sage petals, cream
   ground). The gradient lives on the home-only .lv-hero-product modifier
   so the shared /about hero, which still uses .lv-hero + the floret, is
   untouched. The prior type-led floret hero is preserved at
   components/home-archive/HomeHeroTypeLed.tsx. */

export default function HomeHero() {
  return (
    <section className="lv-hero lv-hero-product lv-on-floret">
      <div className="lv-hero-grid">
        <div className="lv-hero-copy">
          <h1>
            One brand voice across every <em>agent</em>.
          </h1>
          <p className="lv-hero-supporting">
            Enterprises run AI agents on the web, on the phone, and in their
            apps. Each one speaks to customers. Lyric keeps every agent on brand
            with governance that works across models and speech engines.
          </p>
          <Link href="/opus" className="lv-link-cta">
            See how it works <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="lv-hero-demo">
          <GovernedCallVisual />
        </div>
      </div>
    </section>
  )
}
