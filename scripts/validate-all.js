/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

// Ajv instance
const ajv = new Ajv({ allErrors: true });

// Paths
const schemaPath = path.join(__dirname, "..", "schema", "video.schema.json");
const examplesDir = path.join(__dirname, "..", "examples");

// Load schema
const schemaRaw = fs.readFileSync(schemaPath, "utf8");
const schema = JSON.parse(schemaRaw);
const validate = ajv.compile(schema);

console.log("Validating example *video* files against schema...");

// Only validate files that start with "video-" and end with ".json"
const exampleFiles = fs
  .readdirSync(examplesDir)
  .filter((file) => file.startsWith("video-") && file.endsWith(".json"));

let hadError = false;

for (const file of exampleFiles) {
  const fullPath = path.join(examplesDir, file);
  const dataRaw = fs.readFileSync(fullPath, "utf8");
  const data = JSON.parse(dataRaw);

  const valid = validate(data);
  if (!valid) {
    hadError = true;
    console.error(`❌ ${file} is INVALID:`);
    console.error(validate.errors);
  } else {
    console.log(`✅ ${file} is valid.`);
  }
}

if (hadError) {
  console.error("❌ One or more example files failed validation.");
  process.exit(1);
} else {
  console.log("✅ All example video files passed validation.");
}