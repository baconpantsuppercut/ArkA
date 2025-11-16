// scripts/validate-all.js
// Validate all example JSON files against the appropriate schemas.

const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

// Allow unknown formats like "date-time" without failing
const ajv = new Ajv({ allErrors: true, strict: false });

// Resolve paths from repo root (GitHub Actions runs from repo root)
const rootDir = process.cwd();
const schemaDir = path.join(rootDir, "schema");
const examplesDir = path.join(rootDir, "examples");

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

// Load schemas
const videoSchemaPath = path.join(schemaDir, "video.schema.json");
const indexSchemaPath = path.join(schemaDir, "index.schema.json");

const videoSchema = readJson(videoSchemaPath);
const indexSchema = readJson(indexSchemaPath);

const validateVideo = ajv.compile(videoSchema);
const validateIndex = ajv.compile(indexSchema);

console.log("Validating example files against schema...");

// Collect all JSON files in examples/
const exampleFiles = fs
  .readdirSync(examplesDir)
  .filter((f) => f.endsWith(".json"));

let hasErrors = false;

for (const file of exampleFiles) {
  const fullPath = path.join(examplesDir, file);
  const data = readJson(fullPath);

  const isIndex = file === "index.json";
  const validate = isIndex ? validateIndex : validateVideo;

  const valid = validate(data);

  if (!valid) {
    hasErrors = true;
    console.error(`❌ ${file} is INVALID:`);
    console.error(JSON.stringify(validate.errors, null, 2));
  } else {
    console.log(`✅ ${file} is valid.`);
  }
}

if (hasErrors) {
  console.error("❌ One or more example files failed validation.");
  process.exit(1);
} else {
  console.log("✅ All example files passed validation.");
  process.exit(0);
}