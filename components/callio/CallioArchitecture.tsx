/* Section 7 — Deployment and architecture. The visual proof of the position:
   Callio is the governance spec layer that sits ABOVE the model and the speech
   engine and directs them. The spec flows down into each model, engine, channel,
   and system, governing output before it reaches the customer. Swap any engine
   and the brand voice holds.

   Built in the site's visual language (CSS + type, no image assets). Static and
   server-rendered; the page wraps it in ScrollReveal. No invented vendor logos
   or metrics, deliberately generic node labels. */

const GROUPS: ReadonlyArray<{ label: string; nodes: string[] }> = [
  { label: "Models", nodes: ["Language models"] },
  { label: "Speech engines", nodes: ["TTS", "STT"] },
  {
    label: "Channels and systems",
    nodes: ["Calls", "Chat", "SMS", "Voice Agent (In-App)", "Email"],
  },
]

export default function CallioArchitecture() {
  return (
    <div className="lv-arch" aria-hidden="false">
      {/* The governance layer, on top and spanning everything below it. */}
      <div className="lv-arch-spec">
        <span className="lv-arch-spec-name">Callio</span>
        <span className="lv-arch-spec-role">Governance spec layer</span>
      </div>

      {/* The spec descends into each group it directs. */}
      <div className="lv-arch-flow" aria-hidden="true">
        {GROUPS.map((g) => (
          <span className="lv-arch-flow-line" key={g.label} />
        ))}
      </div>

      <div className="lv-arch-groups">
        {GROUPS.map((g) => (
          <div className="lv-arch-group" key={g.label}>
            <span className="lv-arch-group-label">{g.label}</span>
            <div className="lv-arch-nodes">
              {g.nodes.map((n) => (
                <span className="lv-arch-node" key={n}>
                  {n}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Output is governed on the way out. */}
      <p className="lv-arch-gate">Governed before it reaches the customer</p>
    </div>
  )
}
