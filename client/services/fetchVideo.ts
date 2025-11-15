import type { VideoMetadata } from "../types/video";

export async function loadVideo(url: string): Promise<VideoMetadata> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load metadata");
  return await res.json();
}