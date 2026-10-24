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
 * @description Exibe o grid de feedback em formato 2:3 na horizontal (3 colunas por 2 linhas),
 * ocupando o bloco de forma fluida e responsiva sem valores arbitrários.
 * 
 * @param {CategoryFeedbackGridProps} props - Propriedades com as 6 categorias avaliadas.
 */
export function CategoryFeedbackGrid({ categories }: CategoryFeedbackGridProps) {
  return (
    <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 gap-2 items-stretch justify-center">
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
