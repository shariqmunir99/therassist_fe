/**
 * Generates a consistent light color for a given theme name
 * Uses a simple hash function to ensure the same theme always gets the same color
 * Colors are optimized for dark text (good contrast with light backgrounds)
 *
 * @param themeName - The clinical theme name
 * @returns A hex color string (e.g., "#E8F5E9")
 */
export function getThemeColor(themeName: string): string {
  // Simple hash function for consistent color generation
  let hash = 0;
  for (let i = 0; i < themeName.length; i++) {
    hash = themeName.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Generate hue from hash (0-360 degrees)
  const hue = Math.abs(hash % 360);

  // Use consistent saturation and lightness for pastel colors
  // Saturation: 60-70% for vibrant but not overwhelming colors
  // Lightness: 85-92% for very light backgrounds that work with dark text
  const saturation = 60 + (Math.abs(hash) % 11); // 60-70%
  const lightness = 85 + (Math.abs(hash >> 8) % 8); // 85-92%

  // Convert HSL to hex
  return hslToHex(hue, saturation, lightness);
}

/**
 * Converts HSL color values to hex format
 * @param h - Hue (0-360)
 * @param s - Saturation (0-100)
 * @param l - Lightness (0-100)
 * @returns Hex color string
 */
function hslToHex(h: number, s: number, l: number): string {
  const hDecimal = h / 360;
  const sDecimal = s / 100;
  const lDecimal = l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = lDecimal; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q =
      lDecimal < 0.5
        ? lDecimal * (1 + sDecimal)
        : lDecimal + sDecimal - lDecimal * sDecimal;
    const p = 2 * lDecimal - q;

    r = hue2rgb(p, q, hDecimal + 1 / 3);
    g = hue2rgb(p, q, hDecimal);
    b = hue2rgb(p, q, hDecimal - 1 / 3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Extracts theme names from clinical_themes object
 * Returns only the keys (theme names), ignoring confidence scores
 *
 * @param clinicalThemes - Object with theme names as keys and confidence scores as values
 * @returns Array of theme name strings, empty array if no themes
 */
export function extractThemeNames(
  clinicalThemes: Record<string, number> | undefined | null
): string[] {
  if (!clinicalThemes || typeof clinicalThemes !== "object") {
    return [];
  }

  const themeNames = Object.keys(clinicalThemes);

  // Filter out empty strings and return
  return themeNames.filter((name) => name.trim().length > 0);
}

/**
 * Gets the text color (dark) that works well with light theme backgrounds
 * @returns Tailwind-compatible dark text color
 */
export function getThemeTextColor(): string {
  return "#1f2937"; // gray-800 for good contrast with light backgrounds
}
