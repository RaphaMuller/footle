"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * @example
 * <PlayArenaBackdrop />
 */
export function PlayArenaBackdrop() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="play-arena-backdrop" aria-hidden="true">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="play-arena-floodlights"
      />
      <div className="play-arena-spotlight" />
    </div>
  );
}
