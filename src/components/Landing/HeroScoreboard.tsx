"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/common/Button";
import { BIG_FIVE_LEAGUES } from "@/components/Landing/landingExamples";
import { SoccerBallIcon } from "@/components/Landing/SoccerBallIcon";
import { AnimatedPitchBackdrop } from "@/components/Landing/AnimatedPitchBackdrop";
import { Play, ChevronDown } from "lucide-react";

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const QUINT_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * @description Capítulo 1 (100dvh, sticky): Campo encaixando parte por parte + estampa FOOTLE + cascata Hero.
 */
export function HeroScoreboard() {
  const reduceMotion = useReducedMotion();

  return (
    <header className="sticky top-0 z-10 h-dvh w-full overflow-hidden hero-pitch-ground hero-sticky-stage flex flex-col items-center justify-center">
      {/* Fundo exclusivo do Hero: campo encaixando + vinheta radial */}
      <AnimatedPitchBackdrop />

      {/* Conteúdo central (Ato 2: 0.96s -> 1.70s) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        {/* 1. Estampa Firme da Logo FOOTLE (Press Stamp) */}
        <motion.h1
          aria-label="Footle"
          initial={
            reduceMotion
              ? false
              : { opacity: 0, scale: 1.15, y: -6, filter: "blur(8px)" }
          }
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.48, delay: 0.96, ease: EXPO_OUT }}
          className="landing-wordmark text-7xl sm:text-8xl md:text-9xl leading-none text-stadium-ink flex items-center justify-center select-none"
        >
          <span aria-hidden="true">FO</span>
          <motion.span
            aria-hidden="true"
            initial={reduceMotion ? false : { rotate: -108, scale: 1.2 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.54, delay: 0.98, ease: EXPO_OUT }}
            className="mx-1 sm:mx-2 inline-flex items-center justify-center"
          >
            <SoccerBallIcon />
          </motion.span>
          <span aria-hidden="true">TLE</span>
        </motion.h1>

        {/* 2. Carrossel Contínuo das 5 Grandes Ligas */}
        <motion.div
          aria-label="As 5 grandes ligas europeias: Premier League, La Liga, Serie A, Bundesliga e Ligue 1"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.44, delay: 1.2, ease: QUINT_OUT }}
          className="mt-6 sm:mt-7 w-full max-w-lg card-stadium-matte rounded-2xl py-3.5 league-carousel-viewport"
        >
          <div className="league-carousel-track">
            {[0, 1].map((groupIndex) => (
              <div
                key={groupIndex}
                aria-hidden={groupIndex === 1 ? "true" : undefined}
                className="flex items-center gap-8 sm:gap-10 pr-8 sm:pr-10 shrink-0"
              >
                {BIG_FIVE_LEAGUES.map((league) => (
                  <div
                    key={`${groupIndex}-${league.name}`}
                    className="flex flex-col items-center justify-center gap-1.5 min-w-[76px] sm:min-w-[88px]"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={league.logoUrl}
                        alt={groupIndex === 0 ? league.name : ""}
                        className="w-full h-full object-contain"
                        loading="eager"
                      />
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-stadium-ink leading-tight whitespace-nowrap">
                      {league.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3. Subtitle Enxuto e Direto */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 1.28, ease: QUINT_OUT }}
          className="mt-5 text-xs sm:text-sm text-stadium-muted font-medium leading-snug max-w-md"
        >
          Descubra o jogador secreto do dia em até 10 chutes.
        </motion.p>

        {/* 4. Botão de Jogar Desafio Diário */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.42, delay: 1.36, ease: QUINT_OUT }}
          className="mt-5"
        >
          <Link href="/play" className="inline-block">
            <Button variant="emerald-pill" size="lg" className="px-8">
              <Play className="w-4 h-4 fill-current shrink-0" />
              <span>Jogar desafio diário</span>
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Âncora discreta na base interna do campo para chamar a Seção 2 */}
      <motion.a
        href="#como-funciona"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.54, ease: QUINT_OUT }}
        className="absolute bottom-8 sm:bottom-10 z-10 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full surface-stadium-inset text-xs font-semibold text-stadium-muted hover:text-stadium-ink transition-colors"
      >
        <span>Como funciona</span>
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex"
        >
          <ChevronDown className="w-3.5 h-3.5 text-stadium-accent" aria-hidden="true" />
        </motion.span>
      </motion.a>
    </header>
  );
}
