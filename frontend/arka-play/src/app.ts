import type { ArkAVideo, ArkASource } from "./types";

export class VideoRepository {
  /**
   * Load a list of ArkA videos from a JSON index.
   * This is intentionally very simple for now.
   */
  async loadFromUrl(indexUrl: string): Promise<ArkAVideo[]> {
    const res = await fetch(indexUrl);
    if (!res.ok) {
      throw new Error(`Failed to load index: ${res.status}`);
    }
    const data = await res.json();
    // Later we can validate against JSON Schema here.
    return data as ArkAVideo[];
  }
}

export class VideoPlayerController {
  private currentVideo: ArkAVideo | null = null;
  private currentSource: ArkASource | null = null;

  constructor(
    // DOM element ids or handles, framework-agnostic for now
    private readonly videoElement: HTMLVideoElement
  ) {}

  setVideo(video: ArkAVideo): void {
    this.currentVideo = video;
    this.currentSource = this.pickBestSource(video);
    this.applySource();
  }

  private pickBestSource(video: ArkAVideo): ArkASource | null {
    // Extremely naive selection for now:
    // 1. Prefer HLS, then DASH, then file.
    const preferredOrder: ArkASource["type"][] = ["hls", "dash", "file"];
    for (const type of preferredOrder) {
      const match = video.sources.find((s) => s.type === type);
      if (match) return match;
    }
    return video.sources[0] ?? null;
  }

  private applySource(): void {
    if (!this.currentSource) return;
    if (!this.videoElement) return;

    const src = this.currentSource.manifest ?? this.currentSource.url;
    if (!src) return;

    // For now assume a plain <video> tag with a simple src.
    // HLS / DASH clients can replace this logic later.
    this.videoElement.src = src;
  }

  play(): void {
    void this.videoElement.play();
  }

  pause(): void {
    this.videoElement.pause();
  }
}

/**
 * Minimal bootstrap for a plain HTML page:
 *
 * <video id="arka-player" controls></video>
 * <script type="module" src="./app.js"></script>
 */
export async function bootstrapSimplePlayer(
  indexUrl: string,
  videoElementId = "arka-player"
): Promise<void> {
  const videoEl = document.getElementById(
    videoElementId
  ) as HTMLVideoElement | null;

  if (!videoEl) {
    console.error(`No <video> element found with id=${videoElementId}`);
    return;
  }

  const repo = new VideoRepository();
  const controller = new VideoPlayerController(videoEl);

  const videos = await repo.loadFromUrl(indexUrl);
  if (videos.length === 0) {
    console.warn("arkA index is empty.");
    return;
  }

  controller.setVideo(videos[0]);
  controller.play();
}