/* Spec-excerpt generator — renders the section-4 document on /callio from
   the REAL callio adapters. Never hand-edit the output; to change what
   appears, change the selection below.

   Usage (from anywhere; the tsconfig flag makes callio's @/ alias resolve):
     npx tsx --tsconfig <callio-checkout>/tsconfig.json \
       tools/render-spec-excerpt.mts \
       --callio <callio-checkout> \
       --out components/callio/spec-excerpt.generated.ts

   Selection (approved with the page plan): the adapter render's own header
   (status, provenance, unfilled obligations with owners), plus ONE complete
   manner rule that the governance doc itself audits as outside the counsel
   gate (FS-P-11), plus a computed elision line. The counsel-gated rules are
   the substance Callio sells and are never excerpted. */

import { execSync } from "node:child_process"
import { writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { pathToFileURL } from "node:url"

const EXCERPT_BLOCK_ID = "FS-P-11"

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

// The callio adapters read their governance docs relative to cwd.
process.chdir(callioPath)
const sha = execSync("git rev-parse HEAD", { cwd: callioPath }).toString().trim()

const voiceAdapter = await import(pathToFileURL(resolve(callioPath, "lib/voice-adapter.ts")).href)
const textAdapters = await import(pathToFileURL(resolve(callioPath, "lib/text-adapters.ts")).href)

const render = voiceAdapter.renderVoicePromptAdapter({ vertical: "financial_services" })

const { part1 } = textAdapters.parseTextGovernance()
const block = part1.find((b: { id: string }) => b.id === EXCERPT_BLOCK_ID)
if (!block) {
  console.error(`Block ${EXCERPT_BLOCK_ID} not found in the governance doc`)
  process.exit(1)
}
const blockText = textAdapters.substituteSlots(
  block.body,
  {},
  new Map(),
  textAdapters.readSlotDefaults(),
)

const headerLines = render.text
  .split("\n")
  .filter((l: string) => l.startsWith("#"))
  .join("\n")

const elided = render.blocksIncluded.length - 1

const excerpt = [
  headerLines,
  "",
  `## ${block.id} · ${block.title}`,
  "",
  blockText.trim(),
  "",
  `· · · ${elided} further rules elided from this excerpt · · ·`,
].join("\n")

const generatedAt = new Date().toISOString().slice(0, 10)

const file = `/* GENERATED FILE. DO NOT EDIT.
   Rendered from lyricvoices-gif/callio @ ${sha}
   Adapter: renderVoicePromptAdapter (voice channel) + parseTextGovernance
   Generated: ${generatedAt}
   Regenerate (docs/callio-page-plan.md):
     npx tsx --tsconfig <callio-checkout>/tsconfig.json \\
       tools/render-spec-excerpt.mts --callio <callio-checkout> \\
       --out components/callio/spec-excerpt.generated.ts
   The render is verbatim, including its own punctuation. To change what
   appears, change the selection in the generator, never this file. */

export const SPEC_EXCERPT = {
  callioSha: "${sha}",
  callioShaShort: "${sha.slice(0, 7)}",
  adapter: "renderVoicePromptAdapter",
  generatedAt: "${generatedAt}",
  blocksElided: ${elided},
  text: ${JSON.stringify(excerpt)},
} as const
`

writeFileSync(outPath, file)
console.log(`wrote ${outPath}`)
console.log(`callio @ ${sha.slice(0, 7)}, ${elided} blocks elided, excerpt ${excerpt.length} chars`)
