/* eslint-disable no-console */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log("Validating example files against schema...");

  const schemaPath = path.join(__dirname, "..", "schema", "video.schema.json");
  const schemaText = await fs.readFile(schemaPath, "utf8");
  const schema = JSON.parse(schemaText);

  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(schema);

  const examplesDir = path.join(__dirname, "..", "examples");
  const files = await fs.readdir(examplesDir);

  let allValid = true;

  for (const file of files) {
    // Only validate video-* examples; skip index.json and any other non-video files
    if (!file.startsWith("video-") || !file.endsWith(".json")) {
      continue;
    }

    const fullPath = path.join(examplesDir, file);
    const dataText = await fs.readFile(fullPath, "utf8");
    const data = JSON.parse(dataText);

    const ok = validate(data);

    if (!ok) {
      allValid = false;
      console.error(`❌ ${file} is INVALID:`);
      console.error(validate.errors);
    } else {
      console.log(`✅ ${file} is valid.`);
    }
  }

  if (!allValid) {
    process.exitCode = 1;
  } else {
    console.log("✅ All video example files are valid.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});