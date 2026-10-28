import React from "react";

/**
 * @description Ilustração estática do campo de futebol em tela inteira (utilizada em /play e /offline).
 */
export function PitchOverlay() {
  return (
    <div className="pitch-overlay" aria-hidden="true">
      <div className="pitch-goal pitch-goal-left" />
      <div className="pitch-goal pitch-goal-right" />

      <div className="pitch-corner pitch-corner-tl" />
      <div className="pitch-corner pitch-corner-tr" />
      <div className="pitch-corner pitch-corner-bl" />
      <div className="pitch-corner pitch-corner-br" />
    </div>
  );
}
