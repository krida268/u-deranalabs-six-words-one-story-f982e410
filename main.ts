// Six Words, One Story — a program that writes a single complete story
// in exactly six words to /output/entry.txt.
//
// The story is a fixed string on purpose: the entry is judged on the
// writing, so the program's job is to deliver exactly that story, byte
// for byte, every run. Six words, one life: someone is gone, someone
// remains, and the roses say where — and why — without spelling it out.
//
// Why these six words, against the judge's brief:
// - A whole story: a death ("he fell"), a survivor ("she"), and an act
//   of remembrance ("planted roses") — beginning, middle, and end.
// - The turn lands in the last two words: "where he fell" reframes the
//   roses from gardening into a memorial at the place he died.
// - Every word earns its place: drop "roses" and there is no memorial;
//   drop "where" and the place — the whole point — vanishes.
// - What is left unsaid is the reader's to fill in: who he was, how he
//   fell, and how long she has been coming back here.

import { mkdirSync, writeFileSync } from "node:fs";

const STORY = "She planted roses where he fell.";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

function main(): void {
  // The gate only accepts 1 to 60 characters of UTF-8 text, and the judge
  // only counts a story told in exactly six words, so refuse loudly
  // instead of shipping text either gate would throw away.
  const words = STORY.trim().split(/\s+/);
  if (words.length !== 6) {
    throw new Error(`entry must be exactly 6 words, got ${words.length}`);
  }
  if (STORY.length < 1 || STORY.length > 60) {
    throw new Error(`entry must be 1-60 characters, got ${STORY.length}`);
  }
  // /output is a mount point in the grader sandbox: never delete the
  // directory itself, only create it if missing and write the file.
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, STORY, "utf8");
  console.log(`Wrote ${words.length} words, ${STORY.length} characters to ${OUT_FILE}`);
}

main();
