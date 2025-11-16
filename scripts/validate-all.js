/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

// Configure Ajv
const ajv = new Ajv({
  allErrors: true,
  strict: false
});

// Load schemas
const videoSchemaPath = path.resolve(__dirname, "../schema/video.schema.json");
const indexSchemaPath = path.resolve(__dirname, "../schema/index.schema.json");

const videoSchema = JSON.parse(fs.readFileSync(videoSchemaPath, "utf8"));
const indexSchema = JSON.parse(fs.readFileSync(indexSchemaPath, "utf8"));

const validateVideo = ajv.compile(videoSchema);
const validateIndex = ajv.compile(indexSchema);

const examplesDir = path.resolve(__dirname, "../examples");

// Utility: validate one file with the right schema
function validateFile(filePath) {
  const fileName = path.basename(filePath);
  const isIndex = fileName === "index.json";

  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);

  const validate = isIndex ? validateIndex : validateVideo;
  const schemaLabel = isIndex ? "index.schema.json" : "video.schema.json";

  const valid = validate(data);

  if (valid) {
    console.log(`✅ ${fileName} is valid against ${schemaLabel}.`);
    return true;
  }

  console.error(`❌ ${fileName} is INVALID:`);
  console.error(validate.errors);
  return false;
}

// Main
(function run() {
  console.log("Validating example files against schema...");

  const files = fs
    .readdirSync(examplesDir)
    .filter((f) => f.endsWith(".json"));

  let allValid = true;

  for (const file of files) {
    const fullPath = path.join(examplesDir, file);
    const ok = validateFile(fullPath);
    if (!ok) {
      allValid = false;
    }
  }

  if (!allValid) {
    console.error("❌ One or more example files failed validation.");
    process.exit(1);
  } else {
    console.log("✅ All example files passed validation.");
  }
})();