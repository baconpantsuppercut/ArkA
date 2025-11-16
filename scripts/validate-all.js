import fs from "fs/promises";
import path from "path";
import Ajv from "ajv";

const ajv = new Ajv({
  allErrors: true,
  strict: false,
});

const SCHEMA_PATH = "schema/video.schema.json";
const EXAMPLES_DIR = "examples";

async function loadSchema() {
  const raw = await fs.readFile(SCHEMA_PATH, "utf-8");
  const schema = JSON.parse(raw);
  return ajv.compile(schema);
}

async function validateExamples() {
  const validate = await loadSchema();
  const files = await fs.readdir(EXAMPLES_DIR);

  let allOk = true;

  for (const file of files) {
    // Only validate per-video examples, e.g. video-basic.json, video-hls.json, etc.
    if (!file.endsWith(".json")) continue;
    if (!file.startsWith("video-")) continue;

    const fullPath = path.join(EXAMPLES_DIR, file);
    const dataRaw = await fs.readFile(fullPath, "utf-8");
    const data = JSON.parse(dataRaw);

    console.log(`\nValidating ${file}...`);

    const ok = validate(data);
    if (!ok) {
      allOk = false;
      console.error(`${fullPath} invalid`);
      console.error(validate.errors);
    } else {
      console.log(`${fullPath} is valid ✅`);
    }
  }

  if (!allOk) {
    console.error("\n❌ Some example files FAILED validation.");
    process.exit(1);
  } else {
    console.log("\n✅ All example files passed validation.");
  }
}

validateExamples().catch((err) => {
  console.error("Validation run failed:", err);
  process.exit(1);
});