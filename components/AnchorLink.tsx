"use client"

/* In-page anchor that scrolls smoothly instead of jumping. Falls back to an
   instant jump under prefers-reduced-motion, and to default anchor behavior
   if the target is not on the page. */

export default function AnchorLink({
  href,
  className,
  ariaLabel,
  children,
}: {
  href: string
  className?: string
  ariaLabel?: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={(e) => {
        const el = document.querySelector(href)
        if (!el) return
        e.preventDefault()
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" })
      }}
    >
      {children}
    </a>
  )
}
