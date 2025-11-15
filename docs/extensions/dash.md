# arkA Extension: MPEG-DASH Streaming Support (Draft)

## Purpose
This document defines how arkA can reference **MPEG-DASH** manifests (`.mpd`) as an optional extension to the core protocol.

DASH provides:
- adaptive bitrate streaming  
- superior performance on unstable networks  
- flexible segment/container options  
- excellent cross-platform compatibility (Android, Smart TVs, etc.)

This extension is optional.  
Clients may choose to support DASH or fall back to other sources.

---

## How It Works

arkA video objects allow multiple `sources`.  
This extension adds a new type: `"dash"`.

### DASH Source Format

```json
{
  "type": "dash",
  "manifest": "https://cdn.example.com/video/manifest.mpd",
  "profiles": ["on-demand"],
  "codecs": ["h264", "aac"]
}
```

### Fields

| Field       | Type       | Required | Description |
|-------------|------------|----------|-------------|
| `type`      | string     | yes      | `"dash"` |
| `manifest`  | string     | yes      | URL or gateway path to `.mpd` file |
| `profiles`  | array      | no       | `"on-demand"`, `"live"`, `"main"`, etc. |
| `codecs`    | array      | no       | Helpful for client-side capability detection |

---

## Example arkA Video Object with DASH

```json
{
  "title": "Example DASH Video",
  "description": "Demonstration of DASH extension.",
  "duration": 240,
  "sources": [
    {
      "type": "dash",
      "manifest": "https://cdn.example.com/video/manifest.mpd",
      "profiles": ["on-demand"],
      "codecs": ["h264", "aac"]
    },
    {
      "type": "file",
      "url": "https://cdn.example.com/video/fallback.mp4",
      "format": "mp4"
    }
  ]
}
```

---

## Client Responsibilities (If Supporting DASH)

Clients SHOULD:
- parse and load `.mpd` manifests  
- support adaptive bitrate switching  
- fall back gracefully to non-DASH sources  
- detect missing segments or invalid manifests

Clients MAY:
- use `dash.js` or other DASH players  
- expose bitrate/quality controls  
- implement auto-quality switching based on heuristics  

---

## Publishing Requirements

To publish DASH content, creators need:
- a transcoder capable of producing DASH segments  
- an `.mpd` manifest referencing segment URLs  
- files accessible on the public web (or via IPFS/Arweave gateways)

No blockchain, no crypto, no additional protocols required.

---

## Fallback Behavior

If a client does not support DASH:
1. Skip `type: "dash"`  
2. Continue down the `sources[]` list  
3. Select first playable direct file or other supported type  

This mirrors the fallback logic in RSS podcasting for unsupported codecs.

---

## Open Questions
- Should arkA define recommended DASH encoding presets?  
- Should low-latency DASH be included later (v1.1)?  
- Do IPFS/Arweave-hosted manifests need special handling?  

---

**Status:** Draft  
**Version:** 0.1  