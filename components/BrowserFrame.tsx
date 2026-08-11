/* The shared browser-chrome frame for product captures — extracted verbatim
   from the home page's CallioProductStory shell so the home page and /callio
   cannot drift. Styles: lv-cxp-browser-* in globals.css. */

import type { ReactNode } from "react"

export default function BrowserFrame({
  children,
  screenshotSlot = false,
}: {
  children: ReactNode
  screenshotSlot?: boolean
}) {
  return (
    <div className="lv-cxp-browser-shell" {...(screenshotSlot ? { "data-callio-screenshot-slot": true } : {})}>
      <div className="lv-cxp-browser-bar" aria-hidden="true">
        <div className="lv-cxp-browser-dots">
          <span />
          <span />
          <span />
        </div>
        <div className="lv-cxp-browser-address">app.callio.ai</div>
        <div className="lv-cxp-browser-spacer" />
      </div>
      <div className="lv-cxp-browser-screen">{children}</div>
    </div>
  )
}
