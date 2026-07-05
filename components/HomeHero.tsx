import Link from "next/link"
import CallioDriftVisual from "@/components/hero/CallioDriftVisual"

/* Home hero — two columns: the statement and the three-agents multichannel
   comparison (CallioDriftVisual): the same customer question answered on
   Phone, Web chat, and SMS. The breadth proof beside the breadth claim —
   many channels, one brand voice at stake. (The deep governed-call
   transcript, GovernedCallVisual, now sits in the Callio product hero,
   where the depth claim lives.)

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
            apps. Each one speaks to customers. Callio keeps every agent on brand
            with governance that works across models and speech engines.
          </p>
          <Link href="/callio" className="lv-link-cta">
            See how it works <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="lv-hero-demo">
          <CallioDriftVisual />
        </div>
      </div>
    </section>
  )
}
