import Image from "next/image"
import SmoothAnchor from "@/components/SmoothAnchor"

export default function HomeHero() {
  return (
    <section className="lv-hero">
      <div className="lv-hero-bg" aria-hidden="true">
        <Image
          src="/images/floret-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="lv-hero-statement">
        <h1>
          Voice <em>artistry</em> in the age of AI.
        </h1>
        <p className="lv-hero-supporting">
          Over 75% of brands are searching for a better approach to voice AI. We&apos;re
          building it.
        </p>
        <SmoothAnchor targetId="manifesto" offset={64} className="lv-hero-cta">
          Read the manifesto <span aria-hidden="true">&rarr;</span>
        </SmoothAnchor>
      </div>
    </section>
  )
}
