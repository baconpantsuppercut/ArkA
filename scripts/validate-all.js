/* eslint-env node */

// scripts/validate-all.js
const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

const ajv = new Ajv({
  allErrors: true
});

const schemaPath = path.join(__dirname, "..", "schema", "video.schema.json");
const examplesDir = path.join(__dirname, "..", "examples");

const schemaRaw = fs.readFileSync(schemaPath, "utf8");
const schema = JSON.parse(schemaRaw);

const validate = ajv.compile(schema);

// Grab every .json file in examples/
const exampleFiles = fs
  .readdirSync(examplesDir)
  .filter((file) => file.endsWith(".json"));

console.log("Validating example files against schema...");

let hasErrors = false;

for (const file of exampleFiles) {
  const fullPath = path.join(examplesDir, file);
  const data = JSON.parse(fs.readFileSync(fullPath, "utf8"));

  const valid = validate(data);

  if (valid) {
    console.log(`✅ ${file} is valid.`);
  } else {
    hasErrors = true;
    console.log(`❌ ${file} is INVALID:`);
    console.log(validate.errors);
  }
}

if (hasErrors) {
  process.exitCode = 1;
} else {
  console.log("✅ All example files are valid.");
}