"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { CardTileContent } from "@/components/common/CardTileContent";
import type { CategoryFeedback } from "@/lib/schemas";

export interface CardTileProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  icon?: React.ReactNode;
  feedback?: CategoryFeedback;
  isPending?: boolean;
  revealIndex?: number;
  shouldReveal?: boolean;
}

const FLIP_EASE: [number, number, number, number] = [0.16, 1, 0.4, 1];

function resolveTileStatusClass(
  label: string,
  feedback?: CategoryFeedback
): string {
  if (!feedback) return "tile-status-neutral";
  if (label === "Clubes" && feedback.status === "PARTIAL") {
    return "tile-status-neutral";
  }
  if (feedback.status === "CORRECT") return "tile-status-correct";
  if (feedback.status === "PARTIAL") return "tile-status-partial";
  return "tile-status-neutral";
}

/**
 * @example
 * <CardTile label="Liga" feedback={categories.league} revealIndex={2} shouldReveal />
 */
export function CardTile({
  label,
  icon,
  feedback,
  isPending = false,
  revealIndex = 0,
  shouldReveal = false,
  className = "",
  ...props
}: CardTileProps) {
  const reduceMotion = useReducedMotion();
  const statusClass = resolveTileStatusClass(label, feedback);
  const use3DCardFlip = (isPending || shouldReveal || !feedback) && !reduceMotion;

  const frontInner = (
    <>
      <div className="flex items-center gap-1.5 text-center text-xs font-semibold text-white/85 w-full justify-center">
        {icon && <span className="shrink-0 text-white/80">{icon}</span>}
        <span className="truncate">{label}</span>
      </div>

      <div className="flex-1 flex items-center justify-center w-full py-0.5">
        {feedback ? (
          <CardTileContent feedback={feedback} animateValue={shouldReveal} />
        ) : (
          <span className="w-7 h-1.5 rounded-full bg-white/15" />
        )}
      </div>
    </>
  );

  if (use3DCardFlip) {
    const isFlippedToFront = Boolean(feedback && !isPending);

    return (
      <div
        className={`w-full h-full min-h-20 sm:min-h-22 tile-flip-scene ${className}`}
        aria-busy={isPending}
        {...props}
      >
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isFlippedToFront ? 180 : 0 }}
          transition={{
            duration: 1.6,
            delay: isFlippedToFront ? 0.16 + revealIndex * 0.2 : 0,
            ease: FLIP_EASE
          }}
          className="tile-flip-card min-h-20 sm:min-h-22"
        >
          <div
            aria-hidden={isFlippedToFront}
            className="tile-flip-face tile-flip-back rounded-xl tile-status-pending p-2 flex flex-col justify-between items-center"
          >
            <div className="flex items-center gap-1.5 text-center text-xs font-semibold text-ds-muted w-full justify-center">
              {icon && <span className="shrink-0 opacity-75">{icon}</span>}
              <span className="truncate">{label}</span>
            </div>

            <div className="flex-1 flex items-center justify-center w-full py-1">
              <motion.span
                animate={
                  isPending ? { opacity: [0.25, 0.8, 0.25] } : { opacity: 0.3 }
                }
                transition={
                  isPending
                    ? {
                        duration: 0.95,
                        repeat: Infinity,
                        delay: revealIndex * 0.07,
                        ease: "easeInOut"
                      }
                    : { duration: 0.16 }
                }
                className="w-7 h-1.5 rounded-full bg-white/20"
              />
            </div>
          </div>

          <div
            className={`tile-flip-face tile-flip-front min-h-20 sm:min-h-22 rounded-xl p-2 flex flex-col justify-between items-center ${statusClass}`}
          >
            {feedback ? frontInner : null}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full min-h-20 sm:min-h-22 rounded-xl p-2 flex flex-col justify-between items-center min-h-0 ${statusClass} ${className}`}
      {...props}
    >
      {frontInner}
    </div>
  );
}
