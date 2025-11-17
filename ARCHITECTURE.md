# arkA Architecture Overview

arkA is a simple, open video protocol defined around 3 ideas:

## 1. Host-Anywhere Storage
Videos can live on:
- IPFS
- HTTPS/CDN
- Local NAS
- S3 / object storage
- Anything that can serve bytes

arkA does not mandate a single host — it describes *how* to reference media, not where.

---

## 2. JSON Schemas as the Core API
Every video, playlist, channel, or feed is a **JSON document** validated against shared schemas.

Key schemas include:
- `video.json` — metadata & media references  
- `index.json` — collections, relationships, search index building  
- `feed.json` — for subscription-style updates  

Static files are all you need.

---

## 3. Reference Client (Static Web App)
A lightweight JavaScript client:
- Reads the JSON  
- Fetches the media from any URL/IPFS CID  
- Plays videos with HLS/MP4/etc.  
- Displays channels, feeds, and indexes  

Design goal:  
**If you can fetch the JSON, you can watch the video.**

---

## Lifecycle

### 🔹 Publishing
1. Creator uploads media anywhere  
2. Creator generates JSON metadata files  
3. Creator updates index.json (or publishes feed entry)

### 🔹 Viewing
1. Client fetches the index JSON  
2. Client resolves media URLs/CIDs  
3. Client streams the video directly

---

## Optional Components (Future)
- Token-based access URLs (expiring signing keys)
- Encrypted video references
- Decentralized indexing networks
- WebRTC live streaming profiles

---

This document evolves as the protocol expands.