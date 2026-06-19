/* Illustrative mockups for the verticals cards. Representative, not live
   product: each carries the same "Example" tag treatment the eval card uses.
   The two are deliberately different motifs so the cards do not read as the
   same picture, even though both verticals are multi-context:

     - RegisterMockup (property): one spec, three registers. Register pills
       per context lead the panel.
     - ComplianceMockup (banking): a checklist of disclosures and terms held
       to the spec.

   Built so a real product visual can drop into .lv-vert-mock later without
   changing the card layout. CSS + inline SVG only; static. */

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

function MockHead() {
  return (
    <div className="lv-vert-mock-head">
      <span className="lv-vert-mock-tag">Example</span>
      <span className="lv-vert-mock-spec">one brand spec</span>
    </div>
  )
}

const REGISTERS = [
  { ctx: "Leasing", reg: "warm" },
  { ctx: "Maintenance", reg: "calm" },
  { ctx: "Collections", reg: "firm, fair" },
]

export function RegisterMockup() {
  return (
    <div className="lv-vert-mock lv-vert-mock-register">
      <MockHead />
      <ul className="lv-vert-reg-rows">
        {REGISTERS.map((r) => (
          <li key={r.ctx} className="lv-vert-reg-row">
            <span className="lv-vert-reg-ctx">{r.ctx}</span>
            <span className="lv-vert-reg-tag">{r.reg}</span>
          </li>
        ))}
      </ul>
      <div className="lv-vert-mock-div" />
      <ul className="lv-vert-mock-checks">
        <li className="lv-vert-mock-check">
          <span>“CAM charges” said on brand</span>
          <Check />
        </li>
        <li className="lv-vert-mock-check">
          <span>collection disclosure present</span>
          <Check />
        </li>
      </ul>
    </div>
  )
}

const BANK_ROWS = [
  { label: "Recording disclosure", note: "present", check: true },
  { label: "“APR” said on brand", check: true },
  { label: "“FDIC” said on brand", check: true },
  { label: "tone under stress", note: "firm, calm", check: false },
]

export function ComplianceMockup() {
  return (
    <div className="lv-vert-mock lv-vert-mock-compliance">
      <MockHead />
      <ul className="lv-vert-comp-rows">
        {BANK_ROWS.map((r) => (
          <li key={r.label} className="lv-vert-comp-row">
            <span className="lv-vert-comp-label">{r.label}</span>
            <span className="lv-vert-comp-status">
              {r.note && <span className="lv-vert-comp-note">{r.note}</span>}
              {r.check && <Check />}
            </span>
          </li>
        ))}
      </ul>
      <div className="lv-vert-mock-div" />
      <p className="lv-vert-comp-contexts">support · disputes · servicing</p>
    </div>
  )
}
