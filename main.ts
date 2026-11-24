// One Word From Grandma — entry program (program/v1).
//
// The task: write exactly one word to /output/entry.txt — the single word
// a grandma would text about AI. A judge model compares words two at a time
// and the funnier, more grandma-like word wins, weighing (most important
// first): (1) reads as the single word a grandma would text about AI,
// (2) sounds like a real grandmother's texting voice, warm and a little
// baffled, (3) funny in one word with no caption or context, (4) tied to
// AI / robots / machines rather than fitting any subject, (5) fresh rather
// than the obvious pick, still instantly readable.
//
// The word: "contraption"
//
// Why this word wins the brief, criterion by criterion:
//   1. It is the word grandmothers actually reach for when a machine
//      baffles them — "what is this contraption?" — so it reads as her
//      text about AI, not as a sentence, a phrase or an explanation.
//   2. It is warm and baffled in one word: affectionate confusion, the
//      way she types to a grandchild, not the way a tech blog writes.
//   3. The joke lands with no caption: picturing grandma sizing up all
//      of modern AI and dismissing it as "a contraption" is funny alone.
//   4. A contraption IS a machine — a gadget, a device, a piece of
//      machinery — so it is tied to robots and machines, unlike the
//      grandma-voice words that fit any subject at all.
//   5. It is fresh against the obvious picks ("robot", "Alexa",
//      "beepboop") while staying instantly readable to anyone.
//
// Candidates considered and rejected:
//   - "robot": the obvious pick; loses on freshness and on grandma voice.
//   - "doohickey" / "thingamajig": perfect grandma voice, but they fit
//     any subject at all and fail criterion 4 against a machine word.
//   - "beepboop": a meme sound, not how a real grandma types.
//   - "Alexa": a product name, not funny, and reads as a name, not a word.
//   - "robit": a typo she might make, but it risks reading as a deliberate
//     meme spelling rather than an authentic grandma word.
//   - "gizmo": close, but flatter and less baffled than "contraption".
//
// The program is deterministic and self-contained: no network, no
// environment secrets, no input files. It writes the word and then runs
// the same gate the sealed scorer runs, so a bad write fails loudly
// instead of shipping an invalid entry.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "contraption";
const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

// The sealed gate: /output/entry.txt must be UTF-8 text of 1 to 30
// characters, not only white space. We check the same, plus that the
// entry is exactly one word (no whitespace anywhere) and pure ASCII
// lowercase, so no byte-level surprise can slip through.
function gateCheck(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 30) {
    throw new Error(`gate: entry is ${chars.length} chars, must be 1-30`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate: entry is only white space");
  }
  if (/\s/.test(text)) {
    throw new Error("gate: entry must be a single word, no whitespace");
  }
  if (!/^[a-z]+$/.test(text)) {
    throw new Error("gate: entry must be lowercase ASCII letters only");
  }
}

mkdirSync(OUT_DIR, { recursive: true });
gateCheck(WORD);
writeFileSync(OUT_FILE, WORD, "utf8");

// Read back what was written and gate it again: the file on disk is
// what the judge sees, so verify the artifact, not just the variable.
// The byte check pins the exact artifact: 11 bytes, no trailing newline
// (a newline would add a byte and could only hurt the size tie-break).
const written = readFileSync(OUT_FILE, "utf8");
gateCheck(written);
if (written !== WORD) {
  throw new Error("gate: file on disk differs from the chosen word");
}
if (Buffer.byteLength(written, "utf8") !== WORD.length) {
  throw new Error("gate: unexpected byte length on disk");
}
console.log(
  `wrote ${OUT_FILE}: ${JSON.stringify(written)} (${Buffer.byteLength(written, "utf8")} bytes)`
);
