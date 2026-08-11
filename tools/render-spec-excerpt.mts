/* Spec-excerpt generator — renders the section-4 document on /callio from
   the REAL callio adapters. Never hand-edit the output; to change what
   appears, change the selection here.

   Usage (from anywhere; the tsconfig flag makes callio's @/ alias resolve):
     npx tsx --tsconfig <callio-checkout>/tsconfig.json \
       tools/render-spec-excerpt.mts \
       --callio <callio-checkout> \
       --out components/callio/spec-excerpt.generated.ts

   SELECTION (per Lyric 2026-08-12): a STRUCTURAL view only. Section headers,
   rule IDs with their short titles, the named obligation slots with owners
   (in the artifact's own emit-empty format), and the withheld-bodies count.
   NO rule bodies: the authored rule text is the product and is never
   published here.

   CUT from the rendered header: any line describing build state rather than
   governance (currently the FS-P-20 RENDERING STATUS line). The DRAFT
   counsel-gate line is gone at the source (cleared 2026-08-02). */

import { execSync } from "node:child_process"
import { writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { pathToFileURL } from "node:url"

function arg(name: string): string {
  const i = process.argv.indexOf(`--${name}`)
  if (i === -1 || !process.argv[i + 1]) {
    console.error(`Missing --${name}`)
    process.exit(1)
  }
  return process.argv[i + 1]
}

const callioPath = resolve(arg("callio"))
const outPath = resolve(arg("out"))

process.chdir(callioPath)
const sha = execSync("git rev-parse HEAD", { cwd: callioPath }).toString().trim()
const dirty = execSync("git status --porcelain -- lib docs", { cwd: callioPath })
  .toString()
  .trim().length > 0

const voiceAdapter = await import(pathToFileURL(resolve(callioPath, "lib/voice-adapter.ts")).href)
const textAdapters = await import(pathToFileURL(resolve(callioPath, "lib/text-adapters.ts")).href)
const { readFileSync } = await import("node:fs")

const render = voiceAdapter.renderVoicePromptAdapter({ vertical: "financial_services" })
const { part1 } = textAdapters.parseTextGovernance()

/* Header: keep governance lines; cut build-state lines. */
const headerLines = render.text
  .split("\n")
  .filter((l: string) => l.startsWith("#"))
  .filter((l: string) => !/RENDERING STATUS/.test(l))
  .join("\n")

/* Section headers verbatim from the governance doc itself. */
const gov = readFileSync(textAdapters.GOV_PATH, "utf8")
const sectionTitle = (marker: string) =>
  gov.split("\n").find((l: string) => l.startsWith(marker))?.replace(/^#+\s*/, "") ?? marker

const included = new Set(render.blocksIncluded)
const blocks = part1.filter((b: { id: string }) => included.has(b.id))
const fsp = blocks.filter((b: { id: string }) => b.id.startsWith("FS-P-"))
const manner = blocks.filter((b: { id: string }) => !b.id.startsWith("FS-P-"))

const outline = [
  `## ${sectionTitle("## Part 1 ")}`,
  ...fsp.map((b: { id: string; title: string }) => `${b.id} · ${b.title}`),
  "",
  `## ${sectionTitle("## Part 1b ")}`,
  ...manner.map((b: { id: string; title: string }) => `${b.id} · ${b.title}`),
].join("\n")

/* Obligation slots in the artifact's own emit-empty vocabulary. */
const slotLines = render.slots
  .filter((s: { filled: boolean }) => !s.filled)
  .map(
    (s: { name: string; provenance: string }) =>
      `[[UNFILLED SLOT ${s.name} — owed by ${s.provenance}]]`,
  )
  .join("\n")

const withheld = render.blocksIncluded.length

const excerpt = [
  headerLines,
  "",
  outline,
  "",
  `· · · ${withheld} rule bodies withheld · · ·`,
  "",
  slotLines,
].join("\n")

const generatedAt = new Date().toISOString().slice(0, 10)
const shaLabel = dirty ? `${sha} (with uncommitted adapter fixes pending push)` : sha

const file = `/* GENERATED FILE. DO NOT EDIT.
   Rendered from lyricvoices-gif/callio @ ${shaLabel}
   Adapter: renderVoicePromptAdapter (voice channel) + parseTextGovernance
   Generated: ${generatedAt}
   Regenerate (docs/callio-page-plan.md):
     npx tsx --tsconfig <callio-checkout>/tsconfig.json \\
       tools/render-spec-excerpt.mts --callio <callio-checkout> \\
       --out components/callio/spec-excerpt.generated.ts
   Structural view only: no rule bodies. The render is verbatim, including
   its own punctuation. To change what appears, change the generator. */

export const SPEC_EXCERPT = {
  callioSha: "${sha}",
  callioShaShort: "${sha.slice(0, 7)}",
  callioDirty: ${dirty},
  adapter: "renderVoicePromptAdapter",
  generatedAt: "${generatedAt}",
  bodiesWithheld: ${withheld},
  text: ${JSON.stringify(excerpt)},
} as const
`

writeFileSync(outPath, file)
console.log(`wrote ${outPath}`)
console.log(
  `callio @ ${sha.slice(0, 7)}${dirty ? " DIRTY" : ""}, ${withheld} bodies withheld, blocks: ${fsp.length} FS-P + ${manner.length} manner`,
)
