"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "O que é o Footle?",
    answer:
      "Um jogo diário de adivinhação de jogadores de futebol. Você tem até 10 chutes para descobrir o atleta misterioso das 5 grandes ligas europeias."
  },
  {
    id: "faq-2",
    question: "Que horas o jogador do dia é atualizado?",
    answer:
      "Um novo craque entra em campo todos os dias à meia-noite (00:00). Todo mundo enfrenta o mesmo desafio durante as 24 horas da rodada."
  },
  {
    id: "faq-3",
    question: "Como funciona o anel colorido nos escudos de clubes?",
    answer:
      "O bloco de clubes exibe até 5 camisas de elite que o atleta vestiu. Se algum ex-clube coincidir com o histórico ou time atual do alvo secreto, apenas aquele escudo recebe um anel colorido."
  },
  {
    id: "faq-4",
    question: "Quando o bloco de Gols ou Nacionalidade fica âmbar?",
    answer:
      "Em Nacionalidade, o âmbar indica mesmo continente (ex: Inglaterra e Noruega na Europa). Em Gols na Carreira, acende âmbar quando você está a no máximo 25 gols da marca exata."
  },
  {
    id: "faq-5",
    question: "Preciso criar conta para salvar minha sequência?",
    answer:
      "Não. O jogo é 100% gratuito e sem cadastro. Suas vitórias e sequência diária ficam salvas localmente no navegador."
  }
];

const QUINT_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * @description Seção de Perguntas Frequentes em 2 colunas no desktop (título à esquerda + acordeões à direita).
 */
export function FaqSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="duvidas"
      aria-labelledby="faq-heading"
      className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start scroll-mt-10"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.44, ease: QUINT_OUT }}
        className="md:col-span-4 flex flex-col"
      >
        <h2
          id="faq-heading"
          className="text-2xl sm:text-3xl font-extrabold text-stadium-ink tracking-tight"
        >
          Dúvidas da torcida
        </h2>
        <p className="text-sm text-stadium-muted mt-2 leading-relaxed">
          Regras de virada diária, leitura do histórico de clubes e critérios de proximidade.
        </p>
      </motion.div>

      <motion.div
        initial={reduceMotion ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.05
            }
          }
        }}
        className="md:col-span-8 flex flex-col gap-2.5 w-full"
      >
        {FAQ_ITEMS.map((item) => (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.38, ease: QUINT_OUT }
              }
            }}
          >
            <details className="group card-stadium-matte-interactive rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between px-4 sm:px-5 py-3.5 cursor-pointer list-none font-semibold text-stadium-ink text-xs sm:text-sm select-none gap-3">
                <span>{item.question}</span>
                <Plus
                  className="w-4 h-4 text-stadium-accent group-open:rotate-45 transition-transform duration-150 shrink-0"
                  aria-hidden="true"
                />
              </summary>

              <div className="px-4 sm:px-5 pb-4 pt-0.5 text-xs sm:text-sm text-stadium-muted leading-relaxed">
                {item.answer}
              </div>
            </details>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
