import { VideoMetadata } from "../types/video";

export function renderVideo(video: VideoMetadata) {
  const container = document.getElementById("app")!;
  container.innerHTML = `
    <h1>${video.title}</h1>
    <video controls src="${video.sources[0].uri}" width="640"></video>
  `;
}