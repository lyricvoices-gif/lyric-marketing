import { NextRequest, NextResponse } from "next/server"

/* Two front doors, one project. The portfolio domain serves the standalone
   landing page (app/case-studies/page.tsx) at its root; every other host —
   lyricvoices.ai, the .vercel.app preview — sees the Lyric marketing site
   untouched. Scoped to "/" only via the matcher, so no other route pays the
   middleware cost. Case-study links keep their /case-studies/* paths and
   resolve on either domain. */

const PORTFOLIO_HOSTS = new Set(["mikelang.design", "www.mikelang.design"])

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") ?? "").toLowerCase().split(":")[0]
  if (!PORTFOLIO_HOSTS.has(host)) return NextResponse.next()

  const url = req.nextUrl.clone()
  url.pathname = "/case-studies"
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: "/",
}
