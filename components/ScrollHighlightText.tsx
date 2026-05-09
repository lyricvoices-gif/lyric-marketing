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

/* Scroll-linked per-word highlight. Each word starts at low opacity and
   lifts to full opacity tied to the host element's progress through the
   viewport — the words fade in one after another as the reader scrolls
   past them, like a highlighter sweep.

   Used in the manifesto only — the editorial pacing rewards slow reading.
   Not used elsewhere on the page (audiences/products/etc. are scannable
   and would feel forced with this treatment).

   Implementation notes:
   - Walks `children` recursively so inline elements like <em> are preserved
     around their (now split) word spans.
   - One scroll listener per mounted instance, RAF-throttled.
   - Honors prefers-reduced-motion: renders all words at full opacity. */

const DIM_OPACITY = 0.22
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

  const registerWord = (el: HTMLSpanElement | null, index: number) => {
    if (el) wordsRef.current[index] = el
  }

  // Counter scoped to the current render so each leaf word gets a unique key
  // and a stable index into wordsRef.
  let wordIndex = 0
  const getNextIndex = () => wordIndex++

  function wrap(node: ReactNode, keyPrefix: string): ReactNode {
    if (typeof node === "string") {
      const parts = node.split(/(\s+)/)
      return parts.map((part, i) => {
        if (part === "" || /^\s+$/.test(part)) return part
        const idx = getNextIndex()
        return (
          <span
            key={`${keyPrefix}-${i}`}
            ref={(el) => registerWord(el, idx)}
            style={{ opacity: DIM_OPACITY, transition: "opacity 80ms linear" }}
          >
            {part}
          </span>
        )
      })
    }
    if (Array.isArray(node)) {
      return node.map((child, i) =>
        <React.Fragment key={`${keyPrefix}-f${i}`}>{wrap(child, `${keyPrefix}-${i}`)}</React.Fragment>
      )
    }
    if (isValidElement(node)) {
      const element = node as React.ReactElement<{ children?: ReactNode }>
      return cloneElement(element, {}, wrap(element.props.children, keyPrefix))
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

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wordsRef.current.forEach((w) => {
        if (w) w.style.opacity = "1"
      })
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
        // Each word reveals over a slice of the total progress range.
        const wordProgress = Math.max(0, Math.min(1, progress * total - i))
        word.style.opacity = String(DIM_OPACITY + (1 - DIM_OPACITY) * wordProgress)
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
