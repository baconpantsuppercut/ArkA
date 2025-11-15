import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import Ajv from "ajv";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, "..");
const schemaPath = path.join(rootDir, "protocol", "video.schema.v1.json");
const examplesDir = path.join(rootDir, "examples");

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function collectExampleFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectExampleFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      files.push(full);
    }
  }

  return files;
}

function main() {
  const schema = readJson(schemaPath);

  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);

  const files = collectExampleFiles(examplesDir);
  if (files.length === 0) {
    console.log("No example JSON files found in", examplesDir);
    return;
  }

  let okCount = 0;
  let failCount = 0;

  for (const file of files) {
    const rel = path.relative(rootDir, file);
    const data = readJson(file);

    const valid = validate(data);
    if (valid) {
      console.log(`✅ ${rel}`);
      okCount++;
    } else {
      console.log(`❌ ${rel}`);
      console.log(validate.errors);
      failCount++;
    }
  }

  console.log(`\nDone. OK: ${okCount}, Failed: ${failCount}`);
  if (failCount > 0) {
    process.exitCode = 1;
  }
}

main();