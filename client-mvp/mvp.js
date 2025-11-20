// arkA MVP Client Script (Restored + Improved)
// Handles CID input, gateway selection, URL auto-binding, and video playback.

const cidInput = document.getElementById("cid-input");
const gatewayInput = document.getElementById("gateway-input");
const form = document.getElementById("cid-form");
const statusEl = document.getElementById("status");
const videoEl = document.getElementById("video-player");

const DEFAULT_GATEWAY = "https://ipfs.io/ipfs/";

// Extract ?cid= from the URL on page load
function getCidFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const cid = params.get("cid");
  return cid ? cid.trim() : "";
}

// Normalize anything the user pastes
function buildVideoUrl(cidOrUrl, gateway) {
  const value = cidOrUrl.trim();

  if (!value) return "";

  // If it already looks like a URL, return as-is
  if (/^https?:\/\//i.test(value)) return value;

  // Otherwise treat it as a CID
  const base = (gateway || DEFAULT_GATEWAY).trim() || DEFAULT_GATEWAY;

  const normalizedBase = base.endsWith("/") ? base : base + "/";

  return normalizedBase + value;
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? "#f55" : "#a0aec0";
}

function playFromInput() {
  const cidOrUrl = cidInput.value;
  const gateway = gatewayInput.value || DEFAULT_GATEWAY;

  if (!cidOrUrl.trim()) {
    setStatus("Please enter a CID or URL.", true);
    return;
  }

  const videoUrl = buildVideoUrl(cidOrUrl, gateway);

  if (!videoUrl) {
    setStatus("Could not build URL.", true);
    return;
  }

  setStatus("Loading video…");
  videoEl.src = videoUrl;

  videoEl
    .play()
    .then(() => setStatus("Playing video."))
    .catch(() => setStatus("Ready. Press play if autoplay was blocked."));

  // Update ?cid=
  try {
    const url = new URL(window.location.href);
    url.searchParams.set("cid", cidOrUrl.trim());
    history.replaceState({}, "", url.toString());
  } catch (err) {}
}

// Form submit handler
form.addEventListener("submit", (event) => {
  event.preventDefault();
  playFromInput();
});

// Auto-load if ?cid= exists
window.addEventListener("DOMContentLoaded", () => {
  const cid = getCidFromQuery();
  if (cid) {
    cidInput.value = cid;
    playFromInput();
  } else {
    setStatus("Paste a CID to begin.");
  }
});