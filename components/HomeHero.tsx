import SmoothAnchor from "@/components/SmoothAnchor"

export default function HomeHero() {
  return (
    <section className="lv-hero">
      <img
        className="lv-hero-floret"
        src="/images/floret-home-hero.jpg"
        alt=""
        aria-hidden="true"
      />
      <div className="lv-hero-statement">
        <h1>
          Voice <em>artistry</em> in the age of AI.
        </h1>
        <p className="lv-hero-supporting">
          79% of brands say AI voices should come from real, attributed voice
          artists. We built Lyric that way from the start.
        </p>
        <SmoothAnchor targetId="manifesto" offset={64} className="lv-hero-cta">
          Read the manifesto <span aria-hidden="true">&rarr;</span>
        </SmoothAnchor>
      </div>
    </section>
  )
}
