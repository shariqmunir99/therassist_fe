// File validation utilities for audio uploads

const AUDIO_MIME_TYPES: Record<string, string> = {
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".m4a": "audio/mp4",
  ".mp4": "audio/mp4",
  ".aac": "audio/aac",
  ".flac": "audio/flac",
  ".ogg": "audio/ogg",
  ".webm": "audio/webm",
};

const ALLOWED_AUDIO_TYPES = Object.values(AUDIO_MIME_TYPES);
const MIN_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500 MB
const MIN_DURATION_MIN = 5;
const MAX_DURATION_MIN = 90;

/**
 * Validates an audio file for type and size constraints
 * @param file - The file to validate
 * @returns Error message string if invalid, null if valid
 */
export function validateAudioFile(file: File): string | null {
  // Check file type
  const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
  const isValidType =
    ALLOWED_AUDIO_TYPES.includes(file.type) ||
    Object.keys(AUDIO_MIME_TYPES).includes(fileExtension);

  if (!isValidType) {
    return "Invalid file type. Please upload an audio file (MP3, WAV, M4A, AAC, FLAC, OGG, or WebM).";
  }

  // Check file size
  if (file.size < MIN_FILE_SIZE) {
    return `File size must be at least ${formatFileSize(MIN_FILE_SIZE)}.`;
  }

  if (file.size > MAX_FILE_SIZE) {
    return `File size must be less than ${formatFileSize(MAX_FILE_SIZE)}.`;
  }

  return null;
}

/**
 * Gets the duration of an audio file in minutes
 * Uses HTML5 Audio for smaller files (<50MB) and header parsing for larger files
 * @param file - The audio file to analyze
 * @returns Duration in minutes, or null if unable to determine
 */
export async function getAudioDuration(file: File): Promise<number | null> {
  try {
    // For files smaller than 50MB, use HTML5 Audio element
    if (file.size < 50 * 1024 * 1024) {
      return await getAudioDurationFromElement(file);
    }

    // For larger files, try to parse headers
    return await getAudioDurationFromHeaders(file);
  } catch (error) {
    console.error("Error getting audio duration:", error);
    return null;
  }
}

/**
 * Gets audio duration using HTML5 Audio element
 */
async function getAudioDurationFromElement(file: File): Promise<number | null> {
  return new Promise((resolve) => {
    const audio = new Audio();
    const objectUrl = URL.createObjectURL(file);

    audio.addEventListener("loadedmetadata", () => {
      URL.revokeObjectURL(objectUrl);
      const durationMinutes = audio.duration / 60;
      resolve(durationMinutes);
    });

    audio.addEventListener("error", () => {
      URL.revokeObjectURL(objectUrl);
      resolve(null);
    });

    audio.src = objectUrl;
  });
}

/**
 * Attempts to get audio duration by parsing file headers
 * This is a simplified implementation that reads file headers
 */
async function getAudioDurationFromHeaders(file: File): Promise<number | null> {
  try {
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

    // For MP3 files
    if (fileExtension === ".mp3" || file.type === "audio/mpeg") {
      return await parseMp3Duration(file);
    }

    // For M4A/MP4 files
    if (
      fileExtension === ".m4a" ||
      fileExtension === ".mp4" ||
      file.type === "audio/mp4"
    ) {
      return await parseMp4Duration(file);
    }

    // For WAV files
    if (fileExtension === ".wav" || file.type === "audio/wav") {
      return await parseWavDuration(file);
    }

    // For other formats, fall back to HTML5 Audio
    return await getAudioDurationFromElement(file);
  } catch (error) {
    console.error("Error parsing audio headers:", error);
    return null;
  }
}

/**
 * Parses MP3 file headers to extract duration
 * Reads ID3 tags and attempts to calculate duration from bitrate
 */
async function parseMp3Duration(file: File): Promise<number | null> {
  try {
    // Read first 128KB to get ID3 tags and frame info
    const headerSize = 128 * 1024;
    const blob = file.slice(0, Math.min(headerSize, file.size));
    const arrayBuffer = await blob.arrayBuffer();
    const view = new DataView(arrayBuffer);

    // Skip ID3v2 tag if present
    let offset = 0;
    if (
      view.getUint8(0) === 0x49 &&
      view.getUint8(1) === 0x44 &&
      view.getUint8(2) === 0x33
    ) {
      // ID3v2 tag present
      const size =
        ((view.getUint8(6) & 0x7f) << 21) |
        ((view.getUint8(7) & 0x7f) << 14) |
        ((view.getUint8(8) & 0x7f) << 7) |
        (view.getUint8(9) & 0x7f);
      offset = size + 10;
    }

    // Find first MP3 frame header
    while (offset < view.byteLength - 4) {
      if (
        view.getUint8(offset) === 0xff &&
        (view.getUint8(offset + 1) & 0xe0) === 0xe0
      ) {
        // Found frame sync
        const header = view.getUint32(offset, false);
        const bitrate = getBitrate(header);
        const sampleRate = getSampleRate(header);

        if (bitrate && sampleRate) {
          // Estimate duration: (file size * 8) / (bitrate * 1000) / 60
          const durationSeconds = (file.size * 8) / (bitrate * 1000);
          return durationSeconds / 60;
        }
        break;
      }
      offset++;
    }

    return null;
  } catch (error) {
    console.error("Error parsing MP3:", error);
    return null;
  }
}

/**
 * Parses MP4/M4A file headers to extract duration
 */
async function parseMp4Duration(file: File): Promise<number | null> {
  try {
    // Read first 100KB to find mvhd atom
    const headerSize = 100 * 1024;
    const blob = file.slice(0, Math.min(headerSize, file.size));
    const arrayBuffer = await blob.arrayBuffer();
    const view = new DataView(arrayBuffer);

    // Search for 'mvhd' atom which contains duration
    for (let i = 0; i < view.byteLength - 8; i++) {
      if (
        view.getUint8(i) === 0x6d &&
        view.getUint8(i + 1) === 0x76 &&
        view.getUint8(i + 2) === 0x68 &&
        view.getUint8(i + 3) === 0x64
      ) {
        // Found mvhd atom
        const version = view.getUint8(i + 4);
        const timeScaleOffset = version === 0 ? i + 16 : i + 24;
        const durationOffset = version === 0 ? i + 20 : i + 28;

        if (durationOffset + 4 <= view.byteLength) {
          const timeScale = view.getUint32(timeScaleOffset, false);
          const duration = view.getUint32(durationOffset, false);
          return duration / timeScale / 60;
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error parsing MP4:", error);
    return null;
  }
}

/**
 * Parses WAV file headers to extract duration
 */
async function parseWavDuration(file: File): Promise<number | null> {
  try {
    // Read first 44 bytes (WAV header)
    const blob = file.slice(0, 44);
    const arrayBuffer = await blob.arrayBuffer();
    const view = new DataView(arrayBuffer);

    // Check for RIFF header
    if (
      view.getUint8(0) !== 0x52 ||
      view.getUint8(1) !== 0x49 ||
      view.getUint8(2) !== 0x46 ||
      view.getUint8(3) !== 0x46
    ) {
      return null;
    }

    // Get byte rate (bytes per second)
    const byteRate = view.getUint32(28, true);

    if (byteRate > 0) {
      const durationSeconds = file.size / byteRate;
      return durationSeconds / 60;
    }

    return null;
  } catch (error) {
    console.error("Error parsing WAV:", error);
    return null;
  }
}

/**
 * Helper function to extract bitrate from MP3 frame header
 */
function getBitrate(header: number): number | null {
  const bitrateIndex = (header >> 12) & 0xf;
  const versionIndex = (header >> 19) & 0x3;
  const layerIndex = (header >> 17) & 0x3;

  // MPEG1 Layer 3 bitrate table
  const bitrates = [
    0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0,
  ];

  if (versionIndex === 3 && layerIndex === 1) {
    return bitrates[bitrateIndex] || null;
  }

  return null;
}

/**
 * Helper function to extract sample rate from MP3 frame header
 */
function getSampleRate(header: number): number | null {
  const sampleRateIndex = (header >> 10) & 0x3;
  const sampleRates = [44100, 48000, 32000, 0];
  return sampleRates[sampleRateIndex] || null;
}

/**
 * Validates audio duration against constraints
 * @param durationMinutes - Duration in minutes
 * @returns Error message if invalid, null if valid
 */
export function validateAudioDuration(durationMinutes: number): string | null {
  if (durationMinutes < MIN_DURATION_MIN) {
    return `Audio duration must be at least ${MIN_DURATION_MIN} minutes.`;
  }

  if (durationMinutes > MAX_DURATION_MIN) {
    return `Audio duration must be less than ${MAX_DURATION_MIN} minutes.`;
  }

  return null;
}

/**
 * Formats file size in human-readable format
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "14.8 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }

  const mb = kb / 1024;
  if (mb < 1024) {
    return `${mb.toFixed(1)} MB`;
  }

  const gb = mb / 1024;
  return `${gb.toFixed(1)} GB`;
}

/**
 * Formats duration in human-readable format
 * @param minutes - Duration in minutes
 * @returns Formatted string (e.g., "45 min" or "1 hr 30 min")
 */
export function formatDuration(minutes: number): string {
  const roundedMinutes = Math.round(minutes);

  if (roundedMinutes < 60) {
    return `${roundedMinutes} min`;
  }

  const hours = Math.floor(roundedMinutes / 60);
  const remainingMinutes = roundedMinutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${remainingMinutes} min`;
}
