/* Movement 3 — the numbered mechanism, the right column of the "What it governs"
   style two-column layout. Three rows (Codify / Govern / Port) separated by
   hairline rules; the gold italic numeral sits where the home-page audio player
   puts its play button, with the step name + one line as the body. Type only —
   no per-step graphic; the words and the gold numerals are the design. */

const STEPS = [
  { key: "codify", n: "01", title: "Codify", line: "Your brand’s voice becomes a portable spec." },
  {
    key: "govern",
    n: "02",
    title: "Govern",
    line: "Every agent is held to it, before a word reaches the customer.",
  },
  { key: "port", n: "03", title: "Port", line: "The spec rides above any model and any engine." },
] as const

export default function CallioFlow() {
  return (
    <div className="lv-opus-flow">
      {STEPS.map((s) => (
        <div className={`lv-opus-flow-row is-${s.key}`} key={s.key}>
          <span className="lv-opus-flow-num">{s.n}</span>
          <div className="lv-opus-flow-body">
            <h3 className="lv-opus-flow-title">{s.title}</h3>
            <p className="lv-opus-flow-line">{s.line}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
