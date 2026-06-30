/* Section 6 — Governance across channels. The same governed answer to one
   question, expressed across SMS, web chat, email, and voice. The point: Callio
   does not make every answer identical. It keeps the voice consistent while
   adapting to each channel's norms. The web chat can say more; email keeps a
   full closing; SMS stays short. The voice channel is heard, not read, so it
   links back to the Before / After module in Section 2 rather than re-rendering
   audio. The audio-grade module appears once on the page.

   Styled to read as channel-distinct on the Lyric palette, deliberately not
   iMessage. Static and server-rendered; the page handles entrance reveal. */

import SmoothAnchor from "@/components/SmoothAnchor"

/* Channel iconography, mirroring the hero's CallioDriftVisual: 16px line icons
   that inherit currentColor. SMS / chat / voice match the hero's set; email is
   the one addition (an envelope), so the channels read as one family. */
function ChannelIcon({ kind }: { kind: string }) {
  if (kind === "sms") {
    return (
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M2.5 4.5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7l-3 2.5V10.5h-.5a2 2 0 0 1-2-2z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (kind === "chat") {
    return (
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="12" height="8.5" rx="2.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5.5 13.5 8 11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="6" cy="7.2" r="0.7" fill="currentColor" />
        <circle cx="8" cy="7.2" r="0.7" fill="currentColor" />
        <circle cx="10" cy="7.2" r="0.7" fill="currentColor" />
      </svg>
    )
  }
  if (kind === "email") {
    return (
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="2" y="3.5" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M2.6 4.6 8 8.5l5.4-3.9" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    )
  }
  // voice — the hero's phone glyph
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M5.2 2.5 6.4 5l-1.3 1.3a8 8 0 0 0 3.6 3.6L10 8.6l2.5 1.2v2.4a1 1 0 0 1-1.1 1A10.5 10.5 0 0 1 2.8 4.6a1 1 0 0 1 1-1.1z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type Channel = {
  key: string
  label: string
  body: React.ReactNode
}

const CHANNELS: ReadonlyArray<Channel> = [
  {
    key: "sms",
    label: "SMS",
    body: <p className="lv-chan-text">Your payment posted today. You&rsquo;re all set.</p>,
  },
  {
    key: "chat",
    label: "Web chat",
    body: (
      <p className="lv-chan-text">
        Your payment posted today. You&rsquo;re all set. You can view it in your
        account under &lsquo;Activity&rsquo;.
      </p>
    ),
  },
  {
    key: "email",
    label: "Email",
    body: (
      <p className="lv-chan-text">
        Hi Mara, your payment posted today and you&rsquo;re all set. You can view
        it anytime in your account under Activity.
        <span className="lv-chan-sign">Thanks, Cascade</span>
      </p>
    ),
  },
  {
    key: "voice",
    label: "Voice",
    body: (
      <p className="lv-chan-text lv-chan-voice">
        Heard, not read.{" "}
        <SmoothAnchor targetId="hear" offset={64} className="lv-chan-link">
          Listen in the before and after
        </SmoothAnchor>
        .
      </p>
    ),
  },
]

export default function InTextProof() {
  return (
    <div className="lv-chan-grid">
      {CHANNELS.map((c) => (
        <div className={`lv-chan lv-chan-${c.key}`} key={c.key}>
          <span className="lv-chan-label">
            <span className="lv-chan-icon">
              <ChannelIcon kind={c.key} />
            </span>
            {c.label}
          </span>
          {c.body}
        </div>
      ))}
    </div>
  )
}
