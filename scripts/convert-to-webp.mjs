import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import path from "path";

const ROOT = path.resolve(process.cwd(), "public/assets");
const EXTS = new Set([".png", ".jpg", ".jpeg"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (EXTS.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

const files = await walk(ROOT);
console.log(`Found ${files.length} images to convert.`);

let totalBefore = 0;
let totalAfter = 0;
let done = 0;
const failures = [];

for (const file of files) {
  const before = (await stat(file)).size;
  const outPath = file.replace(/\.(png|jpe?g)$/i, ".webp");
  try {
    await sharp(file).webp({ quality: 82 }).toFile(outPath);
    const after = (await stat(outPath)).size;
    totalBefore += before;
    totalAfter += after;
  } catch (e) {
    failures.push({ file, error: e.message });
  }
  done++;
  if (done % 200 === 0) console.log(`  ${done}/${files.length}...`);
}

console.log(`Done. ${done - failures.length}/${files.length} converted.`);
console.log(`Total before: ${(totalBefore / 1024 / 1024).toFixed(1)} MB`);
console.log(`Total after:  ${(totalAfter / 1024 / 1024).toFixed(1)} MB`);
console.log(`Reduction: ${(100 - (totalAfter / totalBefore) * 100).toFixed(1)}%`);
if (failures.length) {
  console.log("FAILURES:", JSON.stringify(failures, null, 2));
}
