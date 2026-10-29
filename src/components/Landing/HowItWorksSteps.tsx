"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { GuessRow } from "@/components/Board/GuessRow";
import {
  COLE_PALMER_PLAYER,
  PALMER_DEMO_GUESS,
  HAALAND_DEMO_GUESS
} from "@/components/Landing/landingExamples";
import { Search } from "lucide-react";

const QUINT_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * @description Fluxo editorial de 3 passos com entrada em scroll usando os componentes reais do jogo (Cole Palmer -> Erling Haaland).
 */
export function HowItWorksSteps() {
  const reduceMotion = useReducedMotion();

  const revealProps = (delay = 0) => ({
    initial: reduceMotion ? false : ({ opacity: 0, y: 20 } as const),
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.46, delay, ease: QUINT_OUT }
  });

  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-heading"
      className="w-full flex flex-col gap-4 scroll-mt-10"
    >
      <motion.div {...revealProps(0)} className="flex flex-col mb-1">
        <h2
          id="como-funciona-heading"
          className="text-2xl sm:text-3xl font-extrabold text-stadium-ink tracking-tight"
        >
          Como funciona a rodada
        </h2>
        <p className="text-sm sm:text-base text-stadium-muted mt-1.5 max-w-xl leading-relaxed">
          Três movimentos diretos separam o primeiro chute da revelação do craque secreto.
        </p>
      </motion.div>

      {/* PASSO 01 */}
      <motion.div
        {...revealProps(0.04)}
        className="card-stadium-matte rounded-2xl p-4 sm:p-5 flex items-start gap-4"
      >
        <span
          aria-hidden="true"
          className="font-display text-3xl sm:text-4xl text-stadium-accent leading-none pt-0.5 shrink-0"
        >
          01
        </span>

        <div className="flex-1 min-w-0 flex flex-col">
          <h3 className="text-base sm:text-lg font-bold text-stadium-ink leading-snug">
            Digite qualquer atleta
          </h3>
          <p className="text-xs sm:text-sm text-stadium-muted mt-1 leading-relaxed">
            Busque jogadores atuando nas 5 grandes ligas europeias e selecione um nome na lista suspensa. As seis pistas aparecem na hora.
          </p>

          {/* Simulação fiel da busca com atleta real */}
          <div className="mt-3.5 surface-stadium-inset rounded-xl px-3.5 py-2.5 flex items-center gap-3">
            <Search className="w-4 h-4 text-stadium-subtle shrink-0" aria-hidden="true" />
            <div className="w-7 h-7 rounded-full overflow-hidden surface-stadium-inset shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={COLE_PALMER_PLAYER.photoUrl}
                alt={COLE_PALMER_PLAYER.knownName}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-stadium-ink truncate">
              {COLE_PALMER_PLAYER.knownName}
            </span>
            <span className="ml-auto text-xs font-medium text-stadium-muted shrink-0">
              Chelsea • Meia
            </span>
          </div>
        </div>
      </motion.div>

      {/* PASSO 02 */}
      <motion.div
        {...revealProps(0.06)}
        className="card-stadium-matte rounded-2xl p-4 sm:p-5 flex items-start gap-4"
      >
        <span
          aria-hidden="true"
          className="font-display text-3xl sm:text-4xl text-stadium-accent leading-none pt-0.5 shrink-0"
        >
          02
        </span>

        <div className="flex-1 min-w-0 flex flex-col">
          <h3 className="text-base sm:text-lg font-bold text-stadium-ink leading-snug">
            Leia as pistas comparativas
          </h3>
          <p className="text-xs sm:text-sm text-stadium-muted mt-1 leading-relaxed">
            Cada coluna revela quão próximo seu chute passou do jogador misterioso:
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md chip-clue-correct font-semibold">
              Verde
            </span>
            <span className="text-stadium-muted mr-1.5">é acerto exato,</span>

            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md chip-clue-partial font-semibold">
              Âmbar
            </span>
            <span className="text-stadium-muted mr-1.5">indica proximidade ou ex-clube,</span>

            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md surface-stadium-inset text-stadium-ink font-semibold">
              Neutro
            </span>
            <span className="text-stadium-muted">orienta com setas (↑/↓) ou descarta.</span>
          </div>
        </div>
      </motion.div>

      {/* CARD REAL #1: Cole Palmer avaliado contra Erling Haaland */}
      <motion.div {...revealProps(0.08)} data-ui="guess-demo-row">
        <GuessRow guess={PALMER_DEMO_GUESS} variant="matte" />
      </motion.div>

      {/* PASSO 03 */}
      <motion.div
        {...revealProps(0.06)}
        className="card-stadium-matte rounded-2xl p-4 sm:p-5 flex items-start gap-4"
      >
        <span
          aria-hidden="true"
          className="font-display text-3xl sm:text-4xl text-stadium-accent leading-none pt-0.5 shrink-0"
        >
          03
        </span>

        <div className="flex-1 min-w-0 flex flex-col">
          <h3 className="text-base sm:text-lg font-bold text-stadium-ink leading-snug">
            Crave o craque secreto e vença
          </h3>
          <p className="text-xs sm:text-sm text-stadium-muted mt-1 leading-relaxed">
            Acima, a Premier League bateu em cheio, o escudo do Manchester City acendeu como clube em comum e as setas pediram um atacante mais alto e goleador. Fechando 6 de 6 em até 10 chutes, a rodada é sua!
          </p>
        </div>
      </motion.div>

      {/* CARD REAL #2: Erling Haaland 100% Verde */}
      <motion.div {...revealProps(0.08)} data-ui="guess-demo-win">
        <GuessRow guess={HAALAND_DEMO_GUESS} variant="matte" />
      </motion.div>
    </section>
  );
}
