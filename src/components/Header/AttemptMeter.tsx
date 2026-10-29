"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export interface AttemptMeterProps {
  attemptsLeft: number;
  maxAttempts: number;
  isWon: boolean;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * @example
 * <AttemptMeter attemptsLeft={7} maxAttempts={10} isWon={false} />
 */
export function AttemptMeter({
  attemptsLeft,
  maxAttempts,
  isWon
}: AttemptMeterProps) {
  const reduceMotion = useReducedMotion();
  const slots = Array.from({ length: maxAttempts }, (_, idx) => idx);

  return (
    <div
      role="status"
      aria-label={`${attemptsLeft} de ${maxAttempts} chances restantes`}
      title={`${attemptsLeft} de ${maxAttempts} chances restantes`}
      className="play-orbs-pill rounded-xl px-2.5 sm:px-3 h-9 sm:h-10 flex items-center gap-2 shrink-0"
    >
      <div className="flex items-baseline gap-0.5 text-xs font-bold tabular-nums">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={attemptsLeft}
            initial={reduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            className="inline-block text-ds-ink"
          >
            {attemptsLeft}
          </motion.span>
        </AnimatePresence>
        <span className="text-ds-subtle">/{maxAttempts}</span>
      </div>

      <div className="hidden sm:flex items-center gap-1" aria-hidden="true">
        {slots.map((slotIndex) => {
          const isLit = slotIndex < attemptsLeft;

          return (
            <div
              key={slotIndex}
              className="relative w-2 h-2 rounded-full chance-slot-empty flex items-center justify-center shrink-0"
            >
              <AnimatePresence initial={false}>
                {isLit && (
                  <motion.span
                    key={`orb-${slotIndex}`}
                    initial={
                      reduceMotion ? { opacity: 1 } : { scale: 0.5, opacity: 0 }
                    }
                    animate={
                      isWon && !reduceMotion
                        ? {
                            scale: [1, 1.3, 1],
                            opacity: 1,
                            transition: {
                              duration: 0.4,
                              delay: slotIndex * 0.035,
                              ease: EASE_OUT
                            }
                          }
                        : { scale: 1, opacity: 1 }
                    }
                    exit={
                      reduceMotion
                        ? { opacity: 0, transition: { duration: 0.1 } }
                        : {
                            scale: 0.25,
                            opacity: 0,
                            transition: { duration: 0.2, ease: EASE_OUT }
                          }
                    }
                    className="absolute inset-0 rounded-full chance-orb-active pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
