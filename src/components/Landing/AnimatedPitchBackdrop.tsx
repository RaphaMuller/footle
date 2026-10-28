"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * @description Ato 1 (0.00s -> 0.95s): Montagem híbrida do campo parte por parte + Ato 2 (0.88s): Vinheta central.
 */
export function AnimatedPitchBackdrop() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="hero-pitch-frame">
          <div className="hero-line-h top-0" />
          <div className="hero-line-h bottom-0" />
          <div className="hero-line-v left-0" />
          <div className="hero-line-v right-0" />
          <div className="hero-midline" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="hero-center-svg">
              <circle cx="100" cy="100" r="96" className="hero-svg-circle" />
              <circle cx="100" cy="100" r="3.6" className="hero-svg-dot" />
            </svg>
          </div>
          <div className="absolute inset-y-0 left-0 flex items-center">
            <div className="hero-box-left">
              <div className="hero-six-left" />
              <div className="hero-spot-left" />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center justify-end">
            <div className="hero-box-right">
              <div className="hero-six-right" />
              <div className="hero-spot-right" />
            </div>
          </div>
          <div className="pitch-corner pitch-corner-tl" />
          <div className="pitch-corner pitch-corner-tr" />
          <div className="pitch-corner pitch-corner-bl" />
          <div className="pitch-corner pitch-corner-br" />
        </div>
        <div className="hero-center-vignette" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="hero-pitch-frame">
        {/* 1. Perímetro externo fechando o quadro (0.00s - 0.36s) */}
        <motion.div
          className="hero-line-h top-0 origin-left"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.36, delay: 0.02, ease: EXPO_OUT }}
        />
        <motion.div
          className="hero-line-h bottom-0 origin-right"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.36, delay: 0.06, ease: EXPO_OUT }}
        />
        <motion.div
          className="hero-line-v left-0 origin-top"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.36, delay: 0.1, ease: EXPO_OUT }}
        />
        <motion.div
          className="hero-line-v right-0 origin-bottom"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.36, delay: 0.14, ease: EXPO_OUT }}
        />

        {/* 2. Linha de meio-campo + Círculo central em traço contínuo (0.24s - 0.78s) */}
        <motion.div
          className="hero-midline origin-center"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.24, ease: EXPO_OUT }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.svg
            viewBox="0 0 200 200"
            className="hero-center-svg"
            initial={{ rotate: -90 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.56, delay: 0.28, ease: EXPO_OUT }}
          >
            <motion.circle
              cx="100"
              cy="100"
              r="96"
              className="hero-svg-circle"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.54, delay: 0.28, ease: EXPO_OUT }}
            />
            <motion.circle
              cx="100"
              cy="100"
              r="3.6"
              className="hero-svg-dot"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.24, delay: 0.54, ease: EXPO_OUT }}
            />
          </motion.svg>
        </div>

        {/* 3. Grandes áreas e pequenas áreas encaixando das laterais (0.46s - 0.92s) */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <motion.div
            className="hero-box-left"
            initial={{ x: -44, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.44, delay: 0.46, ease: EXPO_OUT }}
          >
            <motion.div
              className="hero-six-left"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.36, delay: 0.56, ease: EXPO_OUT }}
            />
            <motion.div
              className="hero-spot-left"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.24, delay: 0.68, ease: EXPO_OUT }}
            />
          </motion.div>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center justify-end">
          <motion.div
            className="hero-box-right"
            initial={{ x: 44, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.44, delay: 0.46, ease: EXPO_OUT }}
          >
            <motion.div
              className="hero-six-right"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.36, delay: 0.56, ease: EXPO_OUT }}
            />
            <motion.div
              className="hero-spot-right"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.24, delay: 0.68, ease: EXPO_OUT }}
            />
          </motion.div>
        </div>

        {/* 4. Os 4 arcos de escanteio travando nos cantos (0.62s - 0.92s) */}
        <motion.div
          className="pitch-corner pitch-corner-tl origin-top-left"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.28, delay: 0.62, ease: EXPO_OUT }}
        />
        <motion.div
          className="pitch-corner pitch-corner-tr origin-top-right"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.28, delay: 0.65, ease: EXPO_OUT }}
        />
        <motion.div
          className="pitch-corner pitch-corner-bl origin-bottom-left"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.28, delay: 0.68, ease: EXPO_OUT }}
        />
        <motion.div
          className="pitch-corner pitch-corner-br origin-bottom-right"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.28, delay: 0.71, ease: EXPO_OUT }}
        />
      </div>

      {/* 5. Vinheta central escurecendo o meio-campo antes da estampa da logo (0.88s - 1.28s) */}
      <motion.div
        className="hero-center-vignette"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.42, delay: 0.88, ease: "easeOut" }}
      />
    </div>
  );
}
