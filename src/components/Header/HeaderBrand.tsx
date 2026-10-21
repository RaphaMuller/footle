"use client";

import React from "react";

/**
 * Contrato de propriedades do componente HeaderBrand.
 */
export interface HeaderBrandProps {
  /** Título customizado exibido no logotipo (padrão: "FOOTLE") */
  title?: string;
}

/**
 * @description Exibe a marca gráfica da aplicação: ícone de futebol estilizado
 * e tipografia de destaque (Luckiest Guy) com efeito glow esmeralda.
 * 
 * @param {HeaderBrandProps} props - Propriedades do logotipo.
 */
export function HeaderBrand({ title = "FOOTLE" }: HeaderBrandProps) {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
      {/* Imagem / Ícone de Bola de Futebol */}
      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center shadow-lg shadow-emerald-950/50">
        <span className="text-xl sm:text-2xl select-none" role="img" aria-label="Bola de futebol">
          ⚽
        </span>
      </div>

      {/* Título com Luckiest Guy */}
      <div className="flex flex-col">
        <span className="font-display text-xl sm:text-2xl md:text-3xl tracking-wider text-white drop-shadow-[0_2px_8px_var(--border-glow)]">
          {title}
        </span>
      </div>
    </div>
  );
}
