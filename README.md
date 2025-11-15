# arkA — The Open Video Protocol

**arkA** is an open, community-driven protocol for publishing, discovering, and  
viewing video content without centralized control, censorship, or platform lock-in.

arkA is not a platform.  
arkA is not a company.  
arkA is a **protocol** and an **ecosystem** anyone can build clients and services on.

Its goals:

- **Free expression** without corporate censorship  
- **Creator ownership** of identity, content, and audience  
- **Open clients** (web, mobile, special-needs-friendly, child-safe)  
- **Decentralized storage** (IPFS, Arweave, S3, R2, local hosting)  
- **Interoperability** via open schemas  
- **Safe guided mode for children & neurodiverse users**  
- **Future hardware exploration** for accessibility  
- **A protocol that no entity can capture or own**

---

## 🌱 Project Status — Phase 0

arkA is currently defining:

- the manifesto  
- the MVP  
- the core Video JSON schema  
- the index format  
- the initial roadmap  
- early reference clients (HTML/JS)

The project is open for discussion and contributions.

---

## 📚 Key Documents

- [Manifesto](docs/manifesto.md)  
- [Roadmap](docs/roadmap.md)  
- [MVP](docs/mvp.md)  
- [Protocol Overview](protocol/README.md)  
- Architecture Overview *(coming soon)*  

---

## 📁 Repository Structure

```
arka/                 Root of the project
├── docs/             Documentation, vision, roadmap
├── protocol/         Schemas & open formats
├── frontend/         Reference arkA clients
│   ├── arka-play/    General-purpose web client (MVP)
│   └── arka-kids/    Child-friendly & neurodiverse-friendly client
├── backend/          Optional future backend services
├── community/        Community docs, outreach materials
└── governance/       Decision-making & contribution guidelines
```

---

## ⚡ Quickstart for Developers

### 1. Clone the repo
```bash
git clone https://github.com/baconpantsuppercut/arkA
cd arkA
```

### 2. Install dependencies
```bash
npm install
```

### 3. Build the reference client
```bash
npm run build
```

### 4. Run a local dev server
```bash
npm run dev
```

### 5. View sample media metadata  
See:  
```
protocol/examples/
```

---

## 🤝 Contributing

1. Read the [Manifesto](docs/manifesto.md)  
2. Join active [Discussions](../../discussions)  
3. Review open [Issues](../../issues)  
4. Propose ideas, user stories, schemas, or PRs  
5. Participate even if you're not a developer — writers, educators, designers, parents welcome

**No minimum skill level required.**

---

## 🚫 What arkA Is *Not*

To avoid confusion:

- ❌ Not a YouTube competitor  
- ❌ Not a platform  
- ❌ Not a startup  
- ❌ Not cryptocurrency or token-based  
- ❌ Not a "decentralized video site"  

arkA is a **protocol layer** — like RSS for video.

Anyone can build on top of it.

---

## 📜 License

See [LICENSE](LICENSE).  
arkA is open-source and may be forked, remixed, and extended.

---

## ✨ Vision

arkA exists to restore human sovereignty over video — while enabling a healthier digital future for creators, communities, children, and neurodiverse minds.

---

## 🛠 Build Status & Badges

[![Build Reference Client](https://github.com/baconpantsuppercut/arkA/actions/workflows/build.yml/badge.svg)](https://github.com/baconpantsuppercut/arkA/actions)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Status: Phase 0](https://img.shields.io/badge/Status-Phase%200-yellow.svg)
![Discussions: Open](https://img.shields.io/badge/Discussions-Open-green.svg)