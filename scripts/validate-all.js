/* eslint-disable no-console */
const path = require("path");
const fs = require("fs");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv({
  allErrors: true,
  strict: false
});

// Enable date-time and other standard formats
addFormats(ajv);

const schemaPath = path.join(__dirname, "..", "schema", "video.schema.json");
const examplesDir = path.join(__dirname, "..", "examples");

const schemaJson = fs.readFileSync(schemaPath, "utf8");
const schema = JSON.parse(schemaJson);

const validate = ajv.compile(schema);

// Only validate the VIDEO example files, not index.json
const exampleFiles = [
  "video-basic.json",
  "video-dash.json",
  "video-hls.json",
  "video-kids-lesson.json"
];

console.log("Validating example files against schema...");

let hasError = false;

for (const fileName of exampleFiles) {
  const fullPath = path.join(examplesDir, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const data = JSON.parse(raw);

  const valid = validate(data);
  if (!valid) {
    hasError = true;
    console.error(`❌ ${fileName} is INVALID:`);
    console.error(validate.errors);
  } else {
    console.log(`✅ ${fileName} is valid.`);
  }
}

if (hasError) {
  console.error("❌ One or more example files failed validation.");
  process.exit(1);
} else {
  console.log("✅ All example files are valid.");
}