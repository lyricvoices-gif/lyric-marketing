/* Mints a short-lived LiveKit join token for the pricing page's live call.
   Each call gets its own room, so the hosted Cloud agent (the production
   worker on the callio-demos project) dispatches a fresh session per caller.

   This route deliberately has no local-dev fallback: the page demonstrates
   the production agent, so a missing configuration must surface as an
   unavailable line, never a silent join to the wrong server. Set
   LIVEKIT_URL, LIVEKIT_API_KEY, and LIVEKIT_API_SECRET in the deployment
   environment (Vercel: Settings -> Environment Variables, Production). */

import { AccessToken } from "livekit-server-sdk"
import { NextResponse } from "next/server"

export async function POST() {
  const url = process.env.LIVEKIT_URL
  const apiKey = process.env.LIVEKIT_API_KEY
  const apiSecret = process.env.LIVEKIT_API_SECRET

  if (!url || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "The call line is not configured." },
      { status: 503 },
    )
  }

  const room = `demo-${crypto.randomUUID().slice(0, 8)}`
  const at = new AccessToken(apiKey, apiSecret, {
    identity: `caller-${crypto.randomUUID().slice(0, 8)}`,
    ttl: "15m",
  })
  at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true })
  return NextResponse.json({ url, room, token: await at.toJwt() })
}
