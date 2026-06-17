import Link from "next/link"

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
          One brand voice across every <em>agent</em>.
        </h1>
        <p className="lv-hero-supporting">
          Enterprises now run AI agents on the web, on the phone, and in their
          apps. Each one speaks to customers. Lyric is the governance layer that
          keeps all of them on brand, whatever model or speech engine runs
          underneath.
        </p>
        <Link href="/opus" className="lv-link-cta">
          See how it works <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  )
}
