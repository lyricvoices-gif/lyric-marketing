/* Products section — three pillars of the Lyric imprint, presented as
   a single pinned scrollytelling frame on the olive ground chapter
   break.

   The centered header scrolls normally; below it the composition pins
   while the reader scrolls through three segments — a copy rail on the
   left (all three pillars listed, the active one expanded) and one
   visual stage on the right that cross-fades between the per-pillar
   compositions. One frame, three movements: the layout itself makes
   the "three pillars, one imprint" argument. Mechanics and the pillar
   copy live in components/products/ProductsScrolly.tsx; the visuals
   stay CSS + inline SVG so the section remains lightweight.

   Composer, Timbre (now Direction), and The Lyric Briefing are no
   longer top-level pillars in this section. Composer and Direction are
   the two modes inside Callio; the Briefing lives under the Imprint as
   ongoing cultural output. Both still exist as routes; they just no
   longer surface here. */

import ScrollReveal from "@/components/ScrollReveal"
import ProductsScrolly from "@/components/products/ProductsScrolly"

export default function ProductsSection() {
  return (
    <section className="lv-products">
      <div className="lv-products-header">
        <ScrollReveal>
          <div className="lv-philosophy-eyebrow">
            <span className="lv-eyebrow-dot" aria-hidden="true" />
            <span>The Imprint</span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <h2 className="lv-products-headline">
            Three pillars. One <em>imprint</em>.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={220}>
          <p className="lv-products-supporting">
            Lyric is an imprint of curated AI voice identities, built with
            real artists. Each pillar gives that imprint a different way to
            live in the world. To be directed, licensed, and learned from.
          </p>
        </ScrollReveal>
      </div>

      <ProductsScrolly />
    </section>
  )
}
