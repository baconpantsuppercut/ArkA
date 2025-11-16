# arkA-kids — Child & Neurodiverse-Friendly Client (Mockups)

This document describes a minimal first version of the **arkA-kids** client:
a UI focused on safety, predictability, and low-stimulation viewing for children,
especially autistic and neurodiverse kids.

The goal is to give developers strong constraints and a clear mental model.

---

## 1. Design Principles

- **Low stimulation**
  - No autoplaying thumbnails
  - No infinite scroll
  - No surprise sounds or animations

- **Predictable**
  - Fixed layout
  - Same button positions every screen
  - Simple navigation

- **Caregiver control**
  - Hidden settings behind a PIN
  - Only pre-approved arkA indexes / playlists

- **Focused**
  - Few choices per screen
  - Clear, large touch targets

---

## 2. Layout Overview (Tablet / Landscape)

Wireframe:

```
+----------------------------------------------------------+
| arkA-kids                                [🔒 Parent]     |
+----------------------------------------------------------+
| [Profile / Mode selector - optional future]             |
+----------------------------------------------------------+
| [Category Strip]                                       |
|  [Favorites] [Learning] [Calm] [Stories] [Music]        |
+----------------------------------------------------------+
| [Row of 2–4 large video tiles]                         |
|  +------------------+  +------------------+             |
|  | Thumbnail        |  | Thumbnail        |             |
|  | Big Title        |  | Big Title        |             |
|  +------------------+  +------------------+             |
|                                                          |
+----------------------------------------------------------+
| [Back]                          [Play Last] [Next ▶]     |
+----------------------------------------------------------+
```

---

## 3. Main Views

### 3.1 Home / Library View

Shows:
- Short, calm title (“What would you like to watch?”)
- 2–4 large tiles per row
- Each tile:
  - thumbnail (non-flashing)
  - short title (2–3 words)
  - optional icon (e.g. 🎨, 📖, 🎵)

Sorting:
- Content is pre-curated by caregivers.
- No algorithmic “related” suggestions.

---

### 3.2 Video Player View

Wireframe:

```
+----------------------------------------------------------+
| [⬅ Back]                                 [🔒 Parent]     |
+----------------------------------------------------------+
| [ <video> player area ]                                  |
+----------------------------------------------------------+
| [Big title]                                              |
| [Simple controls: ◀  ⏯  ▶ ]                              |
+----------------------------------------------------------+
```

Controls:
- Very few buttons:
  - Play/Pause
  - Optional “Back 10s” and “Forward 10s”
- No volume control on-screen (use device volume)
- No progress bar scrubbing in MVP (to avoid obsessive scrubbing)

---

## 4. Parent / Caregiver Settings (Locked)

Entry:
- Tap [🔒 Parent]
- Prompt: 4–6 digit PIN

Settings Screen (text-only mock):

```
+----------------------------------------------------------+
| Parent Settings (PIN-locked)                             |
+----------------------------------------------------------+
| [Select content source]                                  |
|  - Local index file                                      |
|  - Remote URL                                            |
|                                                          |
| [Allowed categories] [✓ Learning] [✓ Calm] [ ] Music     |
|                                                          |
| [Max session length] [ 30 min ⌄ ]                        |
| [Break reminders] [ Every 10 min ⌄ ]                     |
|                                                          |
| [Save & Exit]                                            |
+----------------------------------------------------------+
```

All settings stored locally (e.g., `localStorage`) in the MVP.

---

## 5. Navigation & State

Minimal routes:
- `#/kids` — main kids grid
- `#/kids/video/:id` — player
- `#/kids/parent` — settings (PIN-locked)

State:
- Current index (arkA JSON) loaded from a caregiver-defined location
- Limited subset of metadata fields:
  - `title`
  - `thumbnail`
  - `duration`
  - `tags` (e.g., `["kids", "calm"]`)
  - `safety` flags

---

## 6. Visual Style (MVP)

- Soft colors (blues, greens, off-white)
- No harsh contrasts or rapid color changes
- Large, rounded buttons
- Plenty of spacing
- Legible, simple font

No flashy animations.  
No hover-only interactions (touch-first).

---

## 7. Developer Notes

For v0:

- Implementation can share some logic with arkA-play but use a separate HTML/CSS/JS bundle.
- Focus first on:
  - loading a **kids-only index**
  - rendering large tiles
  - stable navigation between grid and player
  - basic parent PIN lock for settings

The **first working version** should be simple but *emotionally safe*.
From there, we can layer on:
- schedules
- reward structures
- calm-down playlists
- therapist/teacher configuration modes.