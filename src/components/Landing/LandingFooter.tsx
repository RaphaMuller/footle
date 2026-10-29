"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { SoccerBallIcon } from "@/components/Landing/SoccerBallIcon";
import { ArrowUpRight } from "lucide-react";

const QUINT_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * @description Rodapé estruturado de produto com navegação rápida, links de projeto e aviso legal independente.
 */
export function LandingFooter() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.footer
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.42, ease: QUINT_OUT }}
      className="w-full card-stadium-matte rounded-2xl p-5 sm:p-6 flex flex-col gap-5"
    >
      <div className="grid grid-cols-2 sm:grid-cols-12 gap-6 text-left">
        {/* Coluna 1: Identidade Footle */}
        <div className="col-span-2 sm:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left">
          <a
            href="#topo"
            aria-label="Footle, voltar ao topo"
            className="landing-wordmark text-2xl leading-none text-stadium-ink inline-flex items-center select-none"
          >
            <span aria-hidden="true">FO</span>
            <span aria-hidden="true" className="mx-0.5 inline-flex items-center justify-center">
              <SoccerBallIcon />
            </span>
            <span aria-hidden="true">TLE</span>
          </a>

          <p className="text-xs text-stadium-muted leading-relaxed mt-2">
            Desafio diário de adivinhação de atletas das 5 grandes ligas do futebol europeu.
          </p>

          <span className="text-xs text-stadium-subtle mt-2.5">
            ©2026 - By Raphael Muller - Footle.
          </span>
        </div>

        {/* Coluna 2: Navegação Rápida */}
        <nav aria-label="Navegação do rodapé" className="col-span-1 sm:col-span-4 flex flex-col">
          <span className="text-xs font-bold text-stadium-accent">
            Navegação
          </span>

          <ul className="flex flex-col gap-2 mt-2.5 text-xs text-stadium-muted">
            <li>
              <Link
                href="/play"
                className="hover:text-stadium-ink transition-colors font-medium"
              >
                Jogar hoje
              </Link>
            </li>
            <li>
              <a
                href="#como-funciona"
                className="hover:text-stadium-ink transition-colors"
              >
                Como funciona
              </a>
            </li>
            <li>
              <a
                href="#atributos"
                className="hover:text-stadium-ink transition-colors"
              >
                Atributos avaliados
              </a>
            </li>
            <li>
              <a
                href="#duvidas"
                className="hover:text-stadium-ink transition-colors"
              >
                Dúvidas da torcida
              </a>
            </li>
          </ul>
        </nav>

        {/* Coluna 3: Comunidade e Código */}
        <div className="col-span-1 sm:col-span-3 flex flex-col">
          <span className="text-xs font-bold text-stadium-accent">
            Projeto
          </span>

          <ul className="flex flex-col gap-2 mt-2.5 text-xs text-stadium-muted">
            <li>
              <a
                href="https://github.com/RaphaMuller/footle"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-stadium-ink transition-colors"
              >
                <span>GitHub oficial</span>
                <ArrowUpRight className="w-3 h-3 shrink-0" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/RaphaMuller/footle/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-stadium-ink transition-colors"
              >
                <span>Sugerir / Reportar</span>
                <ArrowUpRight className="w-3 h-3 shrink-0" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/RaphaMuller"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-stadium-ink transition-colors"
              >
                <span>@RaphaMuller</span>
                <ArrowUpRight className="w-3 h-3 shrink-0" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Nota Legal Independente (separada por degrau de superfície, sem hairline) */}
      <div className="surface-stadium-inset rounded-xl px-3.5 py-2.5 text-xs text-stadium-subtle leading-relaxed text-center">
        Projeto independente feito para fãs de futebol, sem vínculo comercial ou oficial com FIFA, UEFA, ligas nacionais ou clubes exibidos.
      </div>
    </motion.footer>
  );
}
