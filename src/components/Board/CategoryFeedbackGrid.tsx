"use client";

import React from "react";
import { GuessEvaluation } from "@/lib/schemas";
import { CategoryTile } from "./CategoryTile";

export type GuessCategories = GuessEvaluation["categories"];

/**
 * Contrato de propriedades do componente CategoryFeedbackGrid.
 */
export interface CategoryFeedbackGridProps {
  /** Objeto de feedback contendo a avaliação das 6 categorias do palpite */
  categories: GuessCategories;
}

/**
 * @description Exibe o grid 3x2 horizontal com os 6 cards unitários de feedback:
 * Linha 1: Nacionalidade, Clube Atual, Posição.
 * Linha 2: Idade, Gols na Carreira, Clubes Passados em Comum.
 * 
 * @param {CategoryFeedbackGridProps} props - Propriedades com as 6 categorias avaliadas.
 */
export function CategoryFeedbackGrid({ categories }: CategoryFeedbackGridProps) {
  return (
    <div className="w-full max-w-[540px] grid grid-cols-3 gap-2 sm:gap-2.5 items-center justify-center">
      <CategoryTile
        feedback={categories.nationality}
        categoryKey="nationality"
      />
      <CategoryTile
        feedback={categories.currentClub}
        categoryKey="currentClub"
      />
      <CategoryTile
        feedback={categories.position}
        categoryKey="position"
      />
      <CategoryTile
        feedback={categories.age}
        categoryKey="age"
      />
      <CategoryTile
        feedback={categories.careerGoals}
        categoryKey="careerGoals"
      />
      <CategoryTile
        feedback={categories.pastClubs}
        categoryKey="pastClubs"
      />
    </div>
  );
}
