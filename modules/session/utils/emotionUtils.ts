/**
 * Get Tailwind CSS classes for emotion badges
 * @param emotion - Emotion label from backend
 * @returns Object with background and text color classes for light and dark modes
 */
export function getEmotionStyles(emotion?: string): {
  bgClass: string;
  textClass: string;
} {
  if (!emotion) {
    return {
      bgClass: "bg-gray-100 dark:bg-gray-700",
      textClass: "text-gray-700 dark:text-gray-300",
    };
  }

  const emotionLower = emotion.toLowerCase();

  switch (emotionLower) {
    case "anxious":
      return {
        bgClass: "bg-red-100 dark:bg-red-900/50",
        textClass: "text-red-700 dark:text-red-300",
      };
    case "empathetic":
      return {
        bgClass: "bg-green-100 dark:bg-green-900/50",
        textClass: "text-green-800 dark:text-green-300",
      };
    case "uncertain":
      return {
        bgClass: "bg-yellow-100 dark:bg-yellow-900/50",
        textClass: "text-yellow-800 dark:text-yellow-300",
      };
    case "probing":
      return {
        bgClass: "bg-purple-100 dark:bg-purple-900/50",
        textClass: "text-purple-800 dark:text-purple-300",
      };
    case "reflective":
      return {
        bgClass: "bg-blue-100 dark:bg-blue-900/50",
        textClass: "text-blue-800 dark:text-blue-300",
      };
    default:
      return {
        bgClass: "bg-gray-100 dark:bg-gray-700",
        textClass: "text-gray-700 dark:text-gray-300",
      };
  }
}
