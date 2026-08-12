"use client"

import React from "react"

export default function GovernConversationVisual() {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [running, setRunning] = React.useState(false)
  const [reducedMotion, setReducedMotion] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncPreference = () => setReducedMotion(media.matches)
    syncPreference()
    media.addEventListener("change", syncPreference)

    const root = rootRef.current
    if (!root || !("IntersectionObserver" in window)) {
      setRunning(true)
      return () => media.removeEventListener("change", syncPreference)
    }

    const observer = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { threshold: 0.28 },
    )
    observer.observe(root)

    return () => {
      observer.disconnect()
      media.removeEventListener("change", syncPreference)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className={`lv-cxp-govern-conversation${running ? " is-running" : ""}${reducedMotion ? " is-reduced" : ""}`}
      aria-label="Illustration of a governed customer conversation"
    >
      <div className="lv-cxp-govern-conversation-head">
        <span>Voice + text</span>
        <span>In tolerance</span>
      </div>

      <div className="lv-cxp-govern-turn is-agent is-opening">
        <span className="lv-cxp-govern-speaker">Agent</span>
        <p>For quality and training purposes, calls may be recorded.</p>
        <div className="lv-cxp-govern-annotations">
          <span><i aria-hidden="true" /> Disclosure present</span>
        </div>
      </div>

      <div className="lv-cxp-govern-turn is-customer">
        <span className="lv-cxp-govern-speaker">Customer</span>
        <p>There’s a charge I definitely didn’t make.</p>
      </div>

      <div className="lv-cxp-govern-turn is-agent is-verification">
        <span className="lv-cxp-govern-speaker">Agent</span>
        <p>Before I can access your account, I’ll need to verify your identity.</p>
        <div className="lv-cxp-govern-annotations" aria-label="Governance checks demonstrated">
          <span><i aria-hidden="true" /> Verify before access</span>
          <span><i aria-hidden="true" /> Required behavior met</span>
        </div>
      </div>
    </div>
  )
}
