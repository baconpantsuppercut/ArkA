v0.1.0 — First Automated Build Pipeline (Nov 2025)

Build System
	•	Repaired Rollup config and restored all client builds
	•	Added @rollup/plugin-node-resolve and @rollup/plugin-commonjs
	•	Migrated repo to strict ESM compatibility
	•	Updated npm scripts (build, lint, lint:md, lint:schema, validate)

CI/CD
	•	Added multi-stage GitHub Actions workflow:
	•	JS linting
	•	Markdown linting
	•	Schema validation with Ajv
	•	Rollup bundle build
	•	Client deploy build

Schema & Validation
	•	Updated schema formats and Ajv configuration
	•	Fixed example JSON files that failed validation
	•	Standardized error handling and output

Linting
	•	Upgraded ESLint to v9 and modern config format
	•	Fixed all legacy rules
	•	Added:
	•	browser globals (document, fetch)
	•	node globals (require, process, __dirname)
	•	Cleaned up markdown headings, duplicate H1s, code fences

Documentation
	•	Repaired roadmap heading structure
	•	Fixed manifesto formatting issues
	•	Cleaned spacing and fenced blocks
	•	Added contributor & client build notes
