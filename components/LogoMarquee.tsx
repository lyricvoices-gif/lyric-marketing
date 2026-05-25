/* Founder credit line + brand strip. At desktop the credit line and
   the logo marquee sit on the same y-axis. The credit anchors to the
   left edge of the content max-width (its pre-redesign x-position),
   and the marquee viewport fills the remaining width on the right.
   Logos enter from the offscreen right, slide leftward toward the
   credit, and fade out (via the marquee viewport's left mask edge)
   right before they would collide with the "at" word — so each brand,
   in turn, briefly reads as the implicit completion of the sentence:
   "Our founders shaped voice AI at [Google]" … fades … "at [Meta]"
   and so on.

   At mobile the layout falls back to stacked (credit above, marquee
   below) because the side-by-side layout doesn't have room.

   Brands are ordered to alternate sizes (medium, square, wide, square,
   wide, square, wide, medium) so the line has rhythm and no single
   mark dominates. The marks aren't interactive — these are
   credentials, not navigation. */

type Brand = {
  name: string
  src: string
  /* Per-logo optical scale, applied as a multiplier of the base row
     height (set in CSS as --logo-h). Wide wordmarks scale down; square
     icon-style marks scale up; medium wordmarks stay near 1. */
  scale: number
}

const BRANDS: Brand[] = [
  { name: "Google",          src: "/images/logos/google.svg",         scale: 0.95 },
  { name: "JBL",             src: "/images/logos/jbl.svg",            scale: 1.15 },
  { name: "United Airlines", src: "/images/logos/unitedairlines.svg", scale: 0.78 },
  { name: "Virgin Atlantic", src: "/images/logos/virginatlantic.svg", scale: 1.2  },
  { name: "Verizon",         src: "/images/logos/verizon.svg",        scale: 0.78 },
  { name: "BMW Group",       src: "/images/logos/bmw.svg",            scale: 1.2  },
  { name: "Appfolio",        src: "/images/logos/appfolio.svg",       scale: 0.78 },
  { name: "Meta",            src: "/images/logos/meta.svg",           scale: 1.3  },
]

export default function LogoMarquee() {
  return (
    <section className="lv-logos">
      <div className="lv-logos-row">
        <p className="lv-logos-credit">Our founders shaped voice AI at</p>

        <div className="lv-logos-viewport" aria-hidden="true">
          <div className="lv-logos-track">
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <img
                key={`${brand.name}-${i}`}
                className="lv-logos-mark"
                src={brand.src}
                alt={brand.name}
                aria-label={brand.name}
                style={{ height: `calc(var(--logo-h) * ${brand.scale})` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
