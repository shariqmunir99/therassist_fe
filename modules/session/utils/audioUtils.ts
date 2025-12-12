/**
 * Format seconds to MM:SS timestamp
 * @param seconds - Time in seconds
 * @returns Formatted timestamp string (e.g., "01:05", "00:32")
 */
export function formatTimestamp(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

/**
 * Validate if audio URL has supported format
 * Supported formats: wav, mp3, mp4, m4a, aac, flac, ogg, webm
 * @param url - Audio file URL
 * @returns True if format is supported
 */
export function isValidAudioFormat(url: string): boolean {
  const supportedFormats = [
    "wav",
    "mp3",
    "mp4",
    "m4a",
    "aac",
    "flac",
    "ogg",
    "webm",
  ];

  const extension = url.split(".").pop()?.toLowerCase();
  return supportedFormats.includes(extension || "");
}
