import Link from "next/link"

import ScrollReveal from "@/components/ScrollReveal"

type LaunchPath = {
  href: string
  cta: string
}

const PATHS: LaunchPath[] = [
  {
    href: "/callio",
    cta: "Start with Callio",
  },
  {
    href: "/agents",
    cta: "Explore pre-built agents",
  },
]

export default function LaunchPaths() {
  return (
    <section className="lv-launch" aria-labelledby="launch-paths-title">
      <div className="lv-launch-inner">
        <ScrollReveal>
          <div className="lv-launch-intro">
            <div>
              <div className="lv-philosophy-eyebrow">
                <span className="lv-eyebrow-dot" aria-hidden="true" />
                <span>Two ways to launch</span>
              </div>
              <h2 id="launch-paths-title">Choose how you begin.</h2>
            </div>
          </div>
        </ScrollReveal>

        <div className="lv-launch-paths">
          {PATHS.map((path, index) => (
            <ScrollReveal key={path.href} delay={index * 100}>
              <div className="lv-launch-path">
                <Link href={path.href} className="lv-launch-link">
                  {path.cta} <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
