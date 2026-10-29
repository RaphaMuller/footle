"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Globe, Shield, Trophy, Footprints, Ruler, Flame } from "lucide-react";

export interface AttributeSummaryItem {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ATTRIBUTE_ITEMS: AttributeSummaryItem[] = [
  {
    id: "attr-nationality",
    label: "Nacionalidade",
    description: "Verde para o mesmo país; âmbar quando ambos defendem seleções do mesmo continente.",
    icon: Globe
  },
  {
    id: "attr-clubs",
    label: "Clubes",
    description: "Verde no time atual; anel aceso no escudo quando dividiram algum ex-clube na carreira.",
    icon: Shield
  },
  {
    id: "attr-league",
    label: "Liga",
    description: "Compara a liga atual entre Premier League, La Liga, Serie A, Bundesliga e Ligue 1.",
    icon: Trophy
  },
  {
    id: "attr-position",
    label: "Posição",
    description: "Verde na função exata em campo; âmbar para faixas táticas vizinhas.",
    icon: Footprints
  },
  {
    id: "attr-height",
    label: "Altura",
    description: "Altura oficial em centímetros: acende âmbar a até ±3 cm de diferença e aponta (↑/↓).",
    icon: Ruler
  },
  {
    id: "attr-goals",
    label: "Gols em Ligas",
    description: "Gols marcados em ligas nacionais de clubes: acende âmbar até ±25 gols e aponta (↑/↓).",
    icon: Flame
  }
];

const QUINT_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * @description Grid 3x2 editorial dos 6 atributos avaliados a cada chute com stagger em scroll.
 */
export function AttributesGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="atributos"
      aria-labelledby="atributos-heading"
      className="w-full flex flex-col gap-5 scroll-mt-10"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.44, ease: QUINT_OUT }}
        className="flex flex-col"
      >
        <h2
          id="atributos-heading"
          className="text-2xl sm:text-3xl font-extrabold text-stadium-ink tracking-tight"
        >
          Os 6 atributos avaliados
        </h2>
        <p className="text-sm sm:text-base text-stadium-muted mt-1.5 max-w-xl leading-relaxed">
          Cada tentativa cruza instantaneamente seis dados oficiais da trajetória do atleta.
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
              staggerChildren: 0.06
            }
          }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 w-full"
      >
        {ATTRIBUTE_ITEMS.map((attr) => {
          const Icon = attr.icon;
          return (
            <motion.article
              key={attr.id}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.42, ease: QUINT_OUT }
                }
              }}
              className="card-stadium-matte rounded-2xl p-4 sm:p-5 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-bold text-stadium-accent leading-tight">
                  {attr.label}
                </h3>
                <Icon
                  className="w-4 h-4 text-stadium-subtle shrink-0"
                  aria-hidden="true"
                />
              </div>

              <p className="text-xs sm:text-sm text-stadium-muted leading-relaxed">
                {attr.description}
              </p>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
