"use client"

import React, {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react"

/* Scroll-linked per-word highlight. Each word starts dim and lifts to full
   opacity tied to the host element's progress through the viewport — the
   words fade in one after another as the reader scrolls past them, like a
   highlighter sweep.

   Used in the manifesto only — the editorial pacing rewards slow reading.
   Not used elsewhere on the page (audiences/products/etc. are scannable
   and would feel forced with this treatment).

   Implementation notes:
   - Walks `children` recursively so inline elements like <em> are preserved
     around their (now split) word spans.
   - One scroll listener per mounted instance, RAF-throttled.
   - Accessibility floor: full contrast is the DEFAULT. Words render at full
     opacity in the markup (SSR, pre-hydration, deep links, no-JS) and under
     prefers-reduced-motion; the dim state exists only while the scroll
     handler is actively driving a reveal.
   - The dim floor is legible on the warm cream ground, not a fade to
     nothing; the Instrument-Serif italic words get a higher floor still,
     since their thin strokes drop out first against cream. */

/* Faintest a word may render mid-reveal. Cream tolerates far less dimming
   than white or dark grounds; 0.45 olive over cream stays dim-but-legible. */
const DIM_OPACITY = 0.45
/* Italic accent words (Instrument Serif) are thin-stroked and fragile on
   cream — their floor sits higher so they never drop out of the line. */
const DIM_OPACITY_EM = 0.58
const REVEAL_START_VH = 0.78  // top edge of the reveal range (further down)
const REVEAL_END_VH = 0.32    // top edge of the reveal range (closer to top)

type Props = {
  children: ReactNode
  as?: keyof React.JSX.IntrinsicElements
  className?: string
  style?: CSSProperties
}

export default function ScrollHighlightText({
  children,
  as: Tag = "p",
  className,
  style,
}: Props) {
  const containerRef = useRef<HTMLElement>(null)
  const wordsRef = useRef<HTMLSpanElement[]>([])
  const floorsRef = useRef<number[]>([])

  const registerWord = (el: HTMLSpanElement | null, index: number, floor: number) => {
    if (el) {
      wordsRef.current[index] = el
      floorsRef.current[index] = floor
    }
  }

  // Counter scoped to the current render so each leaf word gets a unique key
  // and a stable index into wordsRef.
  let wordIndex = 0
  const getNextIndex = () => wordIndex++

  function wrap(node: ReactNode, keyPrefix: string, inEm = false): ReactNode {
    if (typeof node === "string") {
      const parts = node.split(/(\s+)/)
      const floor = inEm ? DIM_OPACITY_EM : DIM_OPACITY
      return parts.map((part, i) => {
        if (part === "" || /^\s+$/.test(part)) return part
        const idx = getNextIndex()
        return (
          <span
            key={`${keyPrefix}-${i}`}
            ref={(el) => registerWord(el, idx, floor)}
            /* No dim in the markup: full contrast is the resting default
               (SSR, pre-hydration, reduced motion). The scroll handler is
               the only thing that ever lowers a word below 1. */
            style={{ transition: "opacity 80ms linear" }}
          >
            {part}
          </span>
        )
      })
    }
    if (Array.isArray(node)) {
      return node.map((child, i) =>
        <React.Fragment key={`${keyPrefix}-f${i}`}>{wrap(child, `${keyPrefix}-${i}`, inEm)}</React.Fragment>
      )
    }
    if (isValidElement(node)) {
      const element = node as React.ReactElement<{ children?: ReactNode }>
      const childIsEm = inEm || element.type === "em" || element.type === "i"
      return cloneElement(element, {}, wrap(element.props.children, keyPrefix, childIsEm))
    }
    return node
  }

  // Reset the index on each render — wordsRef will be re-registered as
  // refs run, so indices stay aligned with the rendered word spans.
  wordIndex = 0
  const wrapped = wrap(children, "w")
  const totalWords = wordIndex

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Reduced motion: leave the markup's full-contrast default untouched —
    // no listener, no dimming, nothing to clean up.
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    let raf = 0

    function update() {
      const rect = el!.getBoundingClientRect()
      const vh = window.innerHeight
      // Map element's top from REVEAL_START_VH (further down viewport, no
      // reveal yet) to REVEAL_END_VH (further up, fully revealed).
      const startY = vh * REVEAL_START_VH
      const endY = vh * REVEAL_END_VH
      const progress = Math.max(0, Math.min(1, (startY - rect.top) / (startY - endY)))

      const words = wordsRef.current
      const total = words.length
      if (total === 0) return
      for (let i = 0; i < total; i++) {
        const word = words[i]
        if (!word) continue
        // Each word reveals over a slice of the total progress range, from
        // its legibility floor (never zero on cream) up to full contrast.
        const floor = floorsRef.current[i] ?? DIM_OPACITY
        const wordProgress = Math.max(0, Math.min(1, progress * total - i))
        word.style.opacity = String(floor + (1 - floor) * wordProgress)
      }
    }

    function onScroll() {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [totalWords])

  // Suppress the lint complaint about Tag — keyof IntrinsicElements is a
  // valid React component reference.
  const TagName = Tag as React.ElementType
  return (
    <TagName ref={containerRef} className={className} style={style}>
      {wrapped}
    </TagName>
  )
}
