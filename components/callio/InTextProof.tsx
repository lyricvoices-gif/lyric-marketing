/* Section 6 — Governance across channels. The same governed answer to one
   question, expressed across SMS, web chat, email, and voice. The point: Callio
   does not make every answer identical. It keeps the voice consistent while
   adapting to each channel's norms. The web chat can say more; email keeps a
   full closing; SMS stays short. The voice channel is heard, not read, so it
   links back to the Before / After module in Section 2 rather than re-rendering
   audio. The audio-grade module appears once on the page.

   Styled to read as channel-distinct on the Lyric palette, deliberately not
   iMessage. Static and server-rendered; the page handles entrance reveal. */

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
        <a href="#hear" className="lv-chan-link">
          Listen in the before and after
        </a>
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
          <span className="lv-chan-label">{c.label}</span>
          {c.body}
        </div>
      ))}
    </div>
  )
}
