/* Vertical mockup — one consistent, illustrative format across every card so
   the carousel reads as a designed set, differentiated by per-card content and
   the card's accent color (inherited via --card-accent). Representative, not
   live product, labeled "EXAMPLE." Built so a real product visual can drop
   into .lv-vert-mock later without changing the card. CSS + inline SVG only. */

function Check() {
  return (
    <svg
      className="lv-vert-check"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function VerticalMockup({
  contexts,
  term,
  disclosure,
  tone,
}: {
  contexts: string[]
  term: string
  disclosure: string
  tone: string
}) {
  return (
    <div className="lv-vert-mock">
      <div className="lv-vert-mock-head">
        <span className="lv-vert-mock-tag">Example</span>
        <span className="lv-vert-mock-spec">one brand spec</span>
      </div>

      <div className="lv-vert-ctx">
        {contexts.map((c) => (
          <span key={c} className="lv-vert-ctx-chip">
            {c}
          </span>
        ))}
      </div>

      <div className="lv-vert-mock-div" />

      <ul className="lv-vert-rows">
        <li className="lv-vert-row">
          <span className="lv-vert-row-label">“{term}”</span>
          <span className="lv-vert-row-status">
            <Check />
            on brand
          </span>
        </li>
        <li className="lv-vert-row">
          <span className="lv-vert-row-label">{disclosure}</span>
          <span className="lv-vert-row-status">
            <Check />
            present
          </span>
        </li>
        <li className="lv-vert-row">
          <span className="lv-vert-row-label">tone</span>
          <span className="lv-vert-row-status lv-vert-row-plain">{tone}</span>
        </li>
      </ul>
    </div>
  )
}
