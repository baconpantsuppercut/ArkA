# arkA Roadmap (v0.2)

## Overview
This roadmap outlines the core milestones for transforming arkA from a conceptual protocol into a usable reference implementation.  
The focus is on **simplicity**, **modularity**, and **approachability** — so contributors of all skill levels can participate.

---

# Phase 0 — Foundation (Current)

### 0.1 — Clarify What arkA *Is*
- A **video metadata + indexing protocol** (like RSS, but for video).  
- Not a platform, not a startup, not a service.  
- Creator-owned. Client-agnostic. Storage-agnostic.

### 0.2 — Documentation Pass (ACTIVE)
- Clean up README and folder structure  
- Add contributor-friendly sub-docs  
- Add user-facing explanation for non-developers  
- Add diagrams / examples (future)

**Deliverables:**
- `/docs/architecture.md`
- `/docs/schema.md`
- `/docs/user-stories.md`
- `/docs/founder.md` (complete)

---

# Phase 1 — Protocol Minimum Viable Draft

### 1.1 — Core Metadata Schema (JSON)
A simple open schema that defines *what a video is*:

- title  
- description  
- creator identity  
- storage location (URL, IPFS CID, Arweave ID, etc.)  
- transcoded formats  
- duration  
- tags  
- family-safety markers  
- accessibility features  
- content warnings (optional)

**Deliverables:**
- `schema/video.json`
- `schema/playlist.json`
- Example files in `/examples/`

---

### 1.2 — Index Format (The “arkA Feed”)
Equivalent to RSS/Atom for videos.  
Defines:

- how multiple videos are grouped  
- how a viewer retrieves them  
- how creators publish feeds  
- optional signatures  
- modular extensions

**Deliverables:**
- `/docs/index-format.md`
- Example index files

---

# Phase 2 — Reference Client (First Working “Reader”)

### 2.1 — Static Web Client (HTML/JS Only)
A simple, dependency-light viewer that can:

- load an arkA index  
- list videos  
- read metadata  
- fetch and play video from any storage  
- handle multiple formats  
- handle safety flags

No backend. Purely static.

**Deliverables:**
- `/client/index.html`
- `/client/js/reader.js`
- `/client/js/player.js`
- `/client/css/`

---

### 2.2 — Simple Creator Tool (Optional Early Prototype)
A minimal web form that lets a creator:

- paste video URLs  
- fill metadata fields  
- generate an arkA index JSON file  
- export it

---

# Phase 3 — Ecosystem Seeds

### 3.1 — Extensions System
Allow modular add-ons such as:

- AI transcripts  
- safety classification  
- face/object detection  
- educational layers  
- sensory-friendly modes (arkA Kids)  
- learning-optimized modes (arkA Aspire)

### 3.2 — Storage Abstraction Layer
Optional helper library for:

- IPFS  
- Arweave  
- S3 / R2  
- local files

### 3.3 — Basic Governance (DAO-Free, Crypto-Free)
Simple open governance:

- community proposals  
- versioning  
- standard updates  
- maintainers  
- protocol evolution

---

# Phase 4 — Specialized Flows (arkA Kids & arkA Aspire)

### 4.1 — arkA Kids Layer
Additional schema fields:

- sensory profile  
- pacing  
- looping rules  
- visual simplification  
- audio safety  
- color/brightness flags  

Plus UI considerations via extensions.

### 4.2 — arkA Aspire Layer
For gifted / high-potential learners:

- prerequisite tags  
- follow-up learning paths  
- mastery-level metadata  
- creative “expansion prompts”

---

# Phase 5 — Long-Term Research Tracks

### 5.1 — Safe Device Mode
Future exploration of:

- rugged devices  
- locked-down OS  
- neurodiverse-friendly design  
- offline-first mode

### 5.2 — Intent-Adaptive UI Integration
Collaboration with “sentient UI” / gesture-driven / adaptive UI devs.

---

# Status Summary (v0.2)

**Complete:**  
- Project structure  
- Founder story  
- Discussions enabled  
- Early community engagement  

**In Progress:**  
- Documentation cleanup  
- Initial schema design  
- User story gathering  

**Next:**  
- Draft schema  
- Draft index format  
- Start reference client