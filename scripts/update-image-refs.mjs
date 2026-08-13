import { readFile, writeFile } from "fs/promises";
import path from "path";

const dataPath = path.resolve(process.cwd(), "data/guide.json");
const raw = await readFile(dataPath, "utf8");
const data = JSON.parse(raw);

let replaced = 0;
function toWebp(src) {
  const next = src.replace(/\.(png|jpe?g)$/i, ".webp");
  if (next !== src) replaced++;
  return next;
}

for (const w of data.workInstructions) {
  if (Array.isArray(w.images)) {
    w.images = w.images.map((step) => step.map(toWebp));
  }
}

if (data.flowchartImages) {
  for (const key of Object.keys(data.flowchartImages)) {
    data.flowchartImages[key] = toWebp(data.flowchartImages[key]);
  }
}

await writeFile(dataPath, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(`Updated ${replaced} image path references to .webp.`);
