/* eslint-env node */

const fs = require("fs");
const path = require("path");
const Ajv = require("ajv").default;

// Configure AJV once
const ajv = new Ajv({
  allErrors: true,
  strict: false
});

const schemaPath = path.join(__dirname, "..", "schema", "video.schema.json");
const examplesDir = path.join(__dirname, "..", "examples");

function loadJSON(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function validateExample(fileName, validate) {
  const dataPath = path.join(examplesDir, fileName);
  const data = loadJSON(dataPath);

  const valid = validate(data);

  if (valid) {
    console.log(`✅ ${fileName} is valid.`);
  } else {
    console.error(`❌ ${fileName} is INVALID:`);
    console.error(validate.errors);
    // Mark process as failed, but keep checking other files
    process.exitCode = 1;
  }
}

function main() {
  console.log("Validating example files against schema...");

  // Load and compile schema once
  const schema = loadJSON(schemaPath);
  const validate = ajv.compile(schema);

  const files = fs
    .readdirSync(examplesDir)
    .filter((f) => f.endsWith(".json"));

  files.forEach((fileName) => {
    validateExample(fileName, validate);
  });

  if (process.exitCode) {
    console.error("❌ One or more example files failed validation.");
    process.exit(process.exitCode);
  } else {
    console.log("✅ All example files validated successfully.");
  }
}

main();