/* Section 4 — How it works. Four steps of the governance lifecycle, the right
   column of the dark "What it governs" style layout. The gold italic numeral
   sits where the home-page audio player puts its play button; the step name and
   one line are the body. Type only, except Monitor, which carries a small
   mechanism block.

   Monitor shows the MECHANISM, not a finished dashboard: what Callio watches
   (drift, consistency, disclosure adherence) and how it diagnoses (settings,
   voice model, input text). This is brand-voice governance monitoring, stated
   plainly so it is not read as security or compliance-certification monitoring.
   No fabricated metrics, trend lines, or alert counts. */

const STEPS = [
  {
    key: "codify",
    n: "01",
    title: "Codify",
    line: "Codify your brand, policy, and approved language into one portable spec.",
  },
  {
    key: "govern",
    n: "02",
    title: "Govern",
    line: "Govern every response before it reaches the customer.",
  },
  {
    key: "port",
    n: "03",
    title: "Port",
    line: "Port the spec across models, channels, and vendors. Change either and the brand voice stays the same.",
  },
  {
    key: "monitor",
    n: "04",
    title: "Monitor",
    line: "Monitor every governed agent over time. Callio listens for drift against the spec, checks consistency and disclosure adherence, and when something sounds off-brand it diagnoses the cause.",
  },
] as const

const WATCHES = ["Voice and text drift", "Consistency across agents", "Disclosure adherence"]
const DIAGNOSES = ["Settings", "Voice model", "Input text"]

export default function CallioFlow() {
  return (
    <div className="lv-opus-flow">
      {STEPS.map((s) => (
        <div className={`lv-opus-flow-row is-${s.key}`} key={s.key}>
          <span className="lv-opus-flow-num">{s.n}</span>
          <div className="lv-opus-flow-body">
            <h3 className="lv-opus-flow-title">{s.title}</h3>
            <p className="lv-opus-flow-line">{s.line}</p>

            {s.key === "monitor" && (
              <div className="lv-opus-mon">
                <div className="lv-opus-mon-grid">
                  <div className="lv-opus-mon-col">
                    <span className="lv-opus-mon-label">Watches for</span>
                    <ul>
                      {WATCHES.map((w) => (
                        <li key={w}>{w}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="lv-opus-mon-col">
                    <span className="lv-opus-mon-label">Diagnoses the cause</span>
                    <ul>
                      {DIAGNOSES.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="lv-opus-mon-note">
                  Brand-voice governance monitoring only.
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
