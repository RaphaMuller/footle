"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/common/Button";
import { Play } from "lucide-react";

const QUINT_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * @description Bloco de conversão estruturado antes do rodapé.
 */
export function LandingCta() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-label="Entrar na partida de hoje"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.44, ease: QUINT_OUT }}
      className="w-full card-stadium-matte rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left"
    >
      <div className="flex flex-col">
        <h2 className="text-xl sm:text-2xl font-extrabold text-stadium-ink tracking-tight">
          Pronto para entrar em campo hoje?
        </h2>
        <p className="text-xs sm:text-sm text-stadium-muted mt-1">
          Grátis, sem cadastro e com um novo craque secreto a cada meia-noite.
        </p>
      </div>

      <Link href="/play" className="inline-block shrink-0">
        <Button variant="emerald-pill" size="lg" className="px-8">
          <Play className="w-4 h-4 fill-current shrink-0" />
          <span>Jogar o desafio de hoje</span>
        </Button>
      </Link>
    </motion.section>
  );
}
