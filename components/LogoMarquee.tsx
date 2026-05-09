/* Founder credit line + brand strip. The eight brand SVGs render in a
   uniform monochrome treatment as the visual completion of the credit
   line "Our founders shaped voice AI at" — copy and logos read as one
   unbroken sentence, so the spacing between them is intentionally tight.
   Brands are ordered to alternate sizes (medium, square, wide, square,
   wide, square, wide, medium) so the line has rhythm and no single mark
   dominates. The marks aren't interactive — these are credentials, not
   navigation. */

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
      <div className="lv-logos-inner">
        <p className="lv-logos-eyebrow">Our founders shaped voice AI at</p>

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
