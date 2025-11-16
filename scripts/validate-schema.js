/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");
const Ajv = require("ajv").default;
const addFormats = require("ajv-formats");

const ajv = new Ajv({
  allErrors: true,
  strict: false
});
addFormats(ajv);

const schemaPath = path.join(__dirname, "..", "schema", "video.schema.json");
const raw = fs.readFileSync(schemaPath, "utf8");
const schema = JSON.parse(raw);

const isValid = ajv.validateSchema(schema);

if (isValid) {
  console.log("✅ video.schema.json is a valid JSON Schema.");
} else {
  console.log("❌ video.schema.json has schema errors:");
  console.log(ajv.errors);
  process.exit(1);
}