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
 * @description Exibe o grid 2x3 em escala vertical (2 colunas por 3 linhas) com os 6 cards unitários de feedback:
 * Linha 1: Nacionalidade, Clube Atual.
 * Linha 2: Liga, Posição.
 * Linha 3: Idade, Gols na Carreira.
 * 
 * @param {CategoryFeedbackGridProps} props - Propriedades com as 6 categorias avaliadas.
 */
export function CategoryFeedbackGrid({ categories }: CategoryFeedbackGridProps) {
  return (
    <div className="w-full max-w-[380px] sm:max-w-[420px] grid grid-cols-2 gap-2 sm:gap-2.5 items-center justify-center">
      <CategoryTile
        feedback={categories.nationality}
        categoryKey="nationality"
      />
      <CategoryTile
        feedback={categories.currentClub}
        categoryKey="currentClub"
      />
      <CategoryTile
        feedback={categories.league}
        categoryKey="league"
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
    </div>
  );
}
