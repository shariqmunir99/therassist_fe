import { getEmotionStyles } from "../utils/emotionUtils";
import { cn } from "@/lib/utils";

interface EmotionBadgeProps {
  emotion?: string;
  className?: string;
}

export function EmotionBadge({ emotion, className }: EmotionBadgeProps) {
  if (!emotion) return null;

  const { bgClass, textClass } = getEmotionStyles(emotion);

  return (
    <div
      className={cn(
        "flex items-center rounded-full px-2 py-0.5",
        bgClass,
        className
      )}
    >
      <p className={cn("text-xs font-medium capitalize", textClass)}>
        {emotion}
      </p>
    </div>
  );
}
