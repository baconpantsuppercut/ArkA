# Project Structure — arkA

```
/               Root of repository
├─ LICENSE
├─ README.md
├─ docs/          Documentation
│   ├─ roadmap.md
│   ├─ contributor-economy.md
│   ├─ founder-transparency.md
│   ├─ onboarding-guide.md
│   ├─ schema.md
│   └─ extensions/
│       ├─ hls.md
│       ├─ dash.md
│       ├─ encrypted-hls.md
│       ├─ encrypted-dash.md
│       └─ cmaf.md
├─ examples/      Example JSON index files
│   ├─ video.json
│   └─ video-dash.json
├─ schema/        Core metadata schemas
│   ├─ video.json
│   └─ playlist.json
├─ client/        Static web client
│   ├─ index.html
│   ├─ js/
│   └─ css/
├─ scripts/       Builds and helpers
├─ .github/
│   └─ workflows/
│       └─ ci.yml
└─ package.json
```

## Purpose Summary
- **docs/** = all documentation.
- **schema/** = core JSON schemas.
- **examples/** = real-world example files.
- **client/** = reference static web client code.
- **scripts/** = build helpers and utilities.
- **.github/workflows/** = CI/CD configuration.

Using this structure a new developer should be able to:
1. Browse `docs/` to see project direction.
2. Open `schema/` to review metadata definitions.
3. Inspect `examples/` to see real usages.
4. Try the `client/` to see how index files render.
5. Run `npm run build` and see the deploy pipeline.
