/* eslint-env node */

const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

const ajv = new Ajv({
  allErrors: true,
  strict: false
});

const schemaPath = path.join(__dirname, "..", "schema", "video.schema.json");
const examplesDir = path.join(__dirname, "..", "examples");

function loadJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function validateExamples() {
  console.log("Validating example files against schema...");

  const schema = loadJson(schemaPath);
  const validate = ajv.compile(schema);

  const exampleFiles = fs
    .readdirSync(examplesDir)
    .filter((name) => name.endsWith(".json"));

  let hadError = false;

  for (const fileName of exampleFiles) {
    const fullPath = path.join(examplesDir, fileName);
    const data = loadJson(fullPath);

    const valid = validate(data);

    if (valid) {
      console.log(`✅ ${fileName} is valid.`);
    } else {
      hadError = true;
      console.error(`❌ ${fileName} is INVALID:`);
      console.error(validate.errors);
    }
  }

  if (hadError) {
    console.error("❌ One or more example files failed validation.");
    process.exitCode = 1;
  } else {
    console.log("✅ All example files passed validation.");
  }
}

validateExamples();