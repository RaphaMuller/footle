import React from "react";

export interface SoccerBallIconProps {
  className?: string;
}

/**
 * @description Bola de futebol com geometria vetorial euclidiana exata (pentágono regular 72°).
 */
export function SoccerBallIcon({
  className = "w-[0.82em] h-[0.82em]"
}: SoccerBallIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block align-middle shrink-0 ${className}`}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
      <polygon
        points="12,8 15.8,10.76 14.35,15.24 9.65,15.24 8.2,10.76"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <line x1="12" y1="8" x2="12" y2="2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="15.8" y1="10.76" x2="21.51" y2="8.91" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="14.35" y1="15.24" x2="17.88" y2="20.09" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="9.65" y1="15.24" x2="6.12" y2="20.09" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="8.2" y1="10.76" x2="2.49" y2="8.91" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
