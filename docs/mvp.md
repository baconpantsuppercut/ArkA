# arkA MVP

This document defines the smallest, simplest implementation of arkA that proves the concept.

---

## MVP Components

### 1. Video Schema (JSON)
A minimal JSON representation of a video:
- id  
- title  
- creator  
- thumbnail_uri  
- media_uri  
- tags  
- created_at  

Stored at:
`protocol/video.schema.json`

---

### 2. Index Schema (JSON)
A JSON file listing all videos.

Example:
```json
[
  {
    "id": "demo-001",
    "title": "Welcome to arkA",
    "thumbnail_uri": "ipfs://...",
    "media_uri": "ipfs://...",
    "creator": "demo",
    "tags": []
  }
]
