# arkA-play — Reference Web Client (Mockups)

This document describes a minimal first version of the **arkA-play** client:  
a general-purpose web UI for browsing and viewing arkA-indexed videos.

The goal is to give developers a clear mental model of the UI and UX, so the
implementation feels obvious.

---

## 1. Layout Overview (Desktop)

High-level wireframe (text-only):

```
+----------------------------------------------------------+
| arkA-play                                [Settings ⚙]    |
+----------------------------------------------------------+
| [Search 🔍 ____________________________]  [Filters ⌄]     |
+----------------------------------------------------------+
| [Sidebar]                                  [Main Area]   |
|                                                 	       |
| - Home                                        	       |
| - All Videos                            +----------------+
| - Playlists                             | Video Card     |
| - Tags                                  | Thumbnail      |
| - Kids Mode (link to arkA-kids)         | Title          |
| - About                                 | Duration       |
|                                         | Tags           |
|                                         +----------------+
|                                         +----------------+
|                                         | Video Card     |
|                                         | ...            |
|                                         +----------------+
+----------------------------------------------------------+
| [Footer: protocol link · GitHub · Docs]                  |
+----------------------------------------------------------+
```

---

## 2. Main Views

### 2.1 Home View

**Purpose:** Show a simple intro and a list of recent/featured videos.

Components:
- Short intro text: “This is arkA-play, a reference client for the arkA protocol.”
- Button: **“Load demo index”** (uses a local `examples/index.json`).
- List of video cards from the loaded index.

Video card (minimal):
- Thumbnail (placeholder if none)
- Title
- Duration
- Tags (comma-separated)
- “Play” button or clicking the card opens the player view.

---

### 2.2 Video List View

Shows a scrollable list of all videos in the current index.

Elements:
- Search box (filters by title, description, tags)
- Filter dropdown:
  - All
  - Kids-friendly
  - Educational
  - Long-form / Short-form
- Cards as described above.

---

### 2.3 Video Detail / Player View

Wireframe:

```
+----------------------------------------------------------+
| [Back to list]                                           |
+----------------------------------------------------------+
| [ <video> player area ]                                  |
|   - uses src or HLS/DASH depending on source             |
+----------------------------------------------------------+
| Title                                                    |
| Duration · Tags                                          |
| Description                                              |
|                                                          |
| Source info:                                             |
| - Storage type (file / hls / dash)                       |
| - Backend hint (S3/R2/IPFS/etc.)                         |
+----------------------------------------------------------+
```

The first version can:
- Use a `<video>` tag for direct file URLs.
- Later extend to HLS/DASH for advanced sources.

---

## 3. Navigation & State

State assumptions:
- The client loads one `index.json` at a time.
- Index contains an array of video entries with IDs.
- When user selects a video, route changes to `#/video/:id` (simple hash routing).

Minimal routes:
- `#/` — home
- `#/videos` — list
- `#/video/:id` — detail view

---

## 4. Mobile Layout Adjustments

On mobile:
- Sidebar collapses into a top-left “☰ Menu”
- Video grid becomes a one-column list
- Player view goes full-width, title/description below

---

## 5. Visual Style (MVP)

Keep it neutral:
- Light background
- Dark text
- Subtle borders
- No heavy branding

Goal: **clarity over aesthetics** so developers can focus on behaviour and data binding.

---

## 6. Developer Notes

The first implementation can be plain:
- `index.html`
- `style.css`
- `app.js` (no framework)

Future:
- Can evolve to React/Vue/Svelte, but the mockups are **framework-agnostic**.

The intention is that a developer reading this can immediately:
- Create the three views
- Wire up simple hash-based routing
- Bind to `examples/index.json`
- Extend over time