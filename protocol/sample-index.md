# Arka MVP (Minimum Viable Product)

This document defines the smallest possible implementation of Arka that proves
the concept end to end.

The MVP should be simple, understandable, forkable, and deployable by anyone.

---

## Core Requirements

### 1. Static Video Index (JSON)
A single JSON file that lists available videos.

Example:

```json
[
  {
    "id": "demo-001",
    "title": "Welcome to Arka",
    "creator": "demo",
    "thumbnail_uri": "ipfs://examplehash",
    "media_uri": "ipfs://examplehash",
    "tags": ["demo"],
    "created_at": "2025-01-01"
  }
]