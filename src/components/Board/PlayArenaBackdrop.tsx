"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * @description Palco de Arena Noturna para /play:
 * Fundo sólido Petróleo/Turfa sem linhas cruzando os cards + refletores sutis no topo.
 */
export function PlayArenaBackdrop() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="play-arena-backdrop" aria-hidden="true">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0.35 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="play-arena-floodlights"
      />
      <div className="play-arena-spotlight" />
    </div>
  );
}
