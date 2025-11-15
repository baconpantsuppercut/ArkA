# arkA Extension: Encrypted HLS (Draft)

## Purpose

This extension defines how arkA can reference **encrypted HLS** streams.

The goal is to support:

- protected kids/education content
- region-locked or restricted material
- parental-control scenarios
- institution-only content (schools, clinics, etc.)

…without baking any specific DRM vendor into the core protocol.

This builds on the base `hls` extension and adds optional encryption metadata.

---

## Relationship to the Base HLS Extension

- The base HLS extension defines `type: "hls"` with a `manifest` URL.
- This encrypted HLS extension **does not change** how players fetch the `.m3u8` manifest.
- It only adds metadata describing the **key system** and **policy** so clients can decide whether they can or should play it.

If a client does not understand or support the given encryption, it should fall back to another source or refuse playback.

---

## Encrypted HLS Source Format

```json
{
  "type": "hls_encrypted",
  "manifest": "https://cdn.example.com/video/playlist.m3u8",
  "drm": {
    "system": "widevine",        // or "fairplay", "playready", "custom"
    "license_url": "https://license.example.com/wv",
    "key_rotation": true,
    "policy": "kids-locked"
  }
}
```

### Fields

| Field           | Type    | Required | Description                                          |
|-----------------|---------|----------|------------------------------------------------------|
| `type`          | string  | yes      | `"hls_encrypted"`                                    |
| `manifest`      | string  | yes      | URL to `.m3u8` manifest                              |
| `drm.system`    | string  | yes      | `"widevine"`, `"fairplay"`, `"playready"`, `"custom"`|
| `drm.license_url` | string | yes    | License server URL                                  |
| `drm.key_rotation` | bool | no      | Whether keys rotate over time                        |
| `drm.policy`    | string  | no       | Free-form policy label (e.g. `"kids-locked"`)        |

arkA does **not** define how license servers work, or how keys are issued. That is left to implementers.

---

## Example arkA Video Object with Encrypted HLS

```json
{
  "title": "Protected Kids Lesson",
  "description": "Only accessible on approved clients.",
  "duration": 900,
  "sources": [
    {
      "type": "hls_encrypted",
      "manifest": "https://cdn.example.com/kids/lesson1/playlist.m3u8",
      "drm": {
        "system": "widevine",
        "license_url": "https://license.example.com/wv/kids",
        "key_rotation": true,
        "policy": "kids-locked"
      }
    },
    {
      "type": "file",
      "url": "https://cdn.example.com/kids/lesson1/backup.mp4",
      "format": "mp4"
    }
  ]
}
```

---

## Client Behaviour

Clients that claim `hls_encrypted` support should:

- detect the `drm.system` value
- decide if they support that DRM stack
- request keys via `license_url` using their own integration
- respect any local parental / policy configurations

If a client does **not** support the DRM system:

- it should try other sources in `sources[]`, or
- clearly inform the user that the content is protected and cannot be played

---

## Scope

Out of scope for arkA:

- key management
- license issuance logic
- offline key storage
- account systems and entitlements

Those belong to separate systems that sit beside arkA.

---

**Status:** Draft  
**Version:** 0.1