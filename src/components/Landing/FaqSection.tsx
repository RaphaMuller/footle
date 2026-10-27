"use client";

import React from "react";
import { Section } from "@/components/Landing/Section";
import { SectionContainer } from "@/components/Landing/SectionContainer";
import { SectionHeader } from "@/components/Landing/SectionHeader";
import { HelpCircle, ChevronDown } from "lucide-react";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "O que é o Footle?",
    answer: "O Footle é um jogo diário de palpites esportivos inspirado no Spotle e Wordle. O objetivo é adivinhar o atleta secreto das 5 grandes ligas europeias (Premier League, La Liga, Serie A, Bundesliga e Ligue 1) em até 10 tentativas."
  },
  {
    id: "faq-2",
    question: "Que horas o jogador do dia é atualizado?",
    answer: "Um novo desafio entra em campo diariamente à meia-noite (00:00). Todos os jogadores disputam o mesmo atleta secreto durante as 24 horas da rodada."
  },
  {
    id: "faq-3",
    question: "O jogo é 100% gratuito e sem cadastro?",
    answer: "Sim. O Footle é um projeto aberto e não exige criação de conta, login ou dados pessoais. Seu histórico de partidas, vitórias e sequências é salvo de forma privada diretamente no armazenamento local do seu navegador."
  },
  {
    id: "faq-4",
    question: "Quais ligas e atletas estão cadastrados?",
    answer: "A base oficial conta com 1.717 atletas e 127 clubes da 1ª divisão das 5 maiores ligas da Europa, sincronizados continuamente com endpoints de dados do Wikidata e FotMob."
  },
  {
    id: "faq-5",
    question: "Como funciona a correspondência de ex-clubes?",
    answer: "Se o atleta que você chutou já vestiu a camisa de um clube onde o jogador secreto também atuou no passado, o card exibe retorno Âmbar (Parcial), sinalizando o vínculo histórico entre os dois."
  },
  {
    id: "faq-6",
    question: "Como interpretar as setas direcionais de Idade e Gols?",
    answer: "A seta para cima (⬆) indica que o atleta secreto tem um número maior (é mais velho ou marcou mais gols). A seta para baixo (⬇) indica um valor menor. Em Gols, uma diferença de até ±25 gols ativa retorno Âmbar de proximidade."
  }
];

/**
 * @description Seção de Perguntas Frequentes (FAQ) com acordeão semântico acessível.
 */
export function FaqSection() {
  return (
    <Section variant="default" size="lg" className="py-12 sm:py-20">
      <SectionContainer size="md" centered padded className="flex flex-col gap-8 sm:gap-10">
        
        {/* Cabeçalho */}
        <SectionHeader
          badge="DÚVIDAS FREQUENTES"
          icon={<HelpCircle className="w-3.5 h-3.5 text-emerald-400" />}
          title="PERGUNTAS FREQUENTES"
          subtitle="Tudo o que você precisa saber sobre o funcionamento da rodada diária e regras do jogo."
          align="center"
        />

        {/* Lista de Acordeões com <details> e <summary> */}
        <div className="flex flex-col gap-3 w-full">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.id}
              className="group card-silver-glass rounded-2xl border border-white/10 hover:border-white/20 transition-all overflow-hidden"
            >
              <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none font-semibold text-white text-xs sm:text-sm select-none gap-4">
                <span>{item.question}</span>
                <ChevronDown className="w-4 h-4 text-emerald-400 group-open:rotate-180 transition-transform duration-200 shrink-0" />
              </summary>

              <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                {item.answer}
              </div>
            </details>
          ))}
        </div>

      </SectionContainer>
    </Section>
  );
}
