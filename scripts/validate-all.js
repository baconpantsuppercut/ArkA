// scripts/validate-all.js
/* eslint-env node */
/* eslint-disable no-console */

const path = require('path');
const fs = require('fs');
const Ajv = require('ajv');

// Ajv instance (non-strict so we can iterate fast during early design)
const ajv = new Ajv({ allErrors: true, strict: false });

// Load core arkA video schema
const schemaPath = path.join(__dirname, '..', 'schema', 'video.schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const validateVideo = ajv.compile(schema);

// Find example files
const examplesDir = path.join(__dirname, '..', 'examples');
const files = fs.readdirSync(examplesDir).filter((f) => f.endsWith('.json'));

console.log('Validating example files against schema...');

let hasErrors = false;

for (const file of files) {
  // NOTE:
  // index.json represents an INDEX of videos, not a single video object.
  // It will get its own schema later; for now we only validate video-* files.
  if (file === 'index.json') {
    continue;
  }

  const fullPath = path.join(examplesDir, file);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const data = JSON.parse(raw);

  const valid = validateVideo(data);
  if (!valid) {
    hasErrors = true;
    console.log(`❌ ${file} is INVALID:`);
    console.log(validateVideo.errors);
  } else {
    console.log(`✅ ${file} is valid.`);
  }
}

if (hasErrors) {
  console.log('❌ One or more example files failed validation.');
  process.exit(1);
} else {
  console.log('✅ All example video metadata files passed validation.');
}