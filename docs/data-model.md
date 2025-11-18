# arkA Video Data Model (v1 draft) for the win

This document defines the **core video metadata model** for arkA.

The goals:

- Simple enough that anyone can read or hand-edit it.
- Strict enough that different clients can interoperate.
- Extensible so future fields do not break older clients.

The canonical machine-readable version of this model lives in:

- `protocol/video.schema.v1.json`

---

## Top-level structure

Each video is described by a single JSON object that conforms to the schema below.

```jsonc
{
  "schema_version": "arka-video-1.0",
  "id": "https://example.com/videos/abc123",   // optional, stable identifier
  "slug": "sample-dash-video",
  "title": "Sample DASH Video",
  "description": "A minimal example demonstrating MPEG-DASH.",
  "creator": {
    "id": "creator:example",
    "name": "Example Creator",
    "channel_url": "https://example.com/@example"
  },
  "duration_seconds": 185,
  "published_at": "2025-01-01T12:00:00Z",
  "updated_at": "2025-01-01T12:00:00Z",

  "tags": ["example", "dash", "adaptive-streaming"],
  "categories": ["technology", "tutorial"],

  "languages": {
    "audio": ["en"],
    "subtitles": ["en"]
  },

  "thumbnails": [
    {
      "url": "https://cdn.example.com/thumbs/video-abc123_640.jpg",
      "width": 640,
      "height": 360
    }
  ],

  "sources": [
    {
      "type": "dash",
      "manifest": "https://cdn.example.com/media/example/manifest.mpd",
      "profiles": ["on-demand"],
      "codecs": ["h264", "aac"]
    },
    {
      "type": "file",
      "format": "mp4",
      "url": "https://cdn.example.com/media/example/video.mp4"
    }
  ],

  "family_safety": {
    "is_safe": true,
    "age_rating": "PG",
    "notes": "No violence, no sensitive topics."
  },

  "accessibility": {
    "has_captions": true,
    "has_audio_description": false
  },

  "stats": {
    "view_count": 0,
    "like_count": 0
  },

  "license": {
    "type": "cc-by-4.0",
    "url": "https://creativecommons.org/licenses/by/4.0/"
  },

  "extensions": {}
}