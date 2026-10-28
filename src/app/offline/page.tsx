"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { WifiOff, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/common/Button";
import { PitchOverlay } from "@/components/common/PitchOverlay";

export default function OfflinePage() {
  const router = useRouter();
  const [checking, setChecking] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRetry = async () => {
    setChecking(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/health");
      if (res.ok) {
        router.push("/");
      } else {
        const data = await res.json();
        setErrorMsg(data.message || data.error || "O banco de dados continua inacessível.");
      }
    } catch {
      setErrorMsg("Não foi possível conectar ao servidor. Verifique sua conexão.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <>
      <PitchOverlay />
      <main className="relative z-10 min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-xl sm:max-w-2xl rounded-3xl card-silver-glass border border-white/20 p-6 sm:p-10 md:p-12 flex flex-col items-center text-center gap-5 sm:gap-6 shadow-2xl backdrop-blur-2xl">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
          <WifiOff className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Serviço Temporariamente Indisponível</span>
        </div>

        <div className="space-y-2">
          <h1 className="font-display text-responsive-h1 text-white tracking-wide leading-tight">
            Estádio em Manutenção
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-lg leading-relaxed">
            Não foi possível carregar a escalação dos atletas no nosso banco de dados. O serviço pode estar temporariamente fora do ar ou sem conexão.
          </p>
        </div>

        {errorMsg && (
          <div
            role="alert"
            aria-live="polite"
            className="w-full p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-start gap-2.5 text-left"
          >
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
            <span className="leading-snug">{errorMsg}</span>
          </div>
        )}

        <div className="w-full pt-2 flex justify-center">
          <Button
            variant="gradient"
            size="lg"
            onClick={handleRetry}
            disabled={checking}
            aria-busy={checking}
            className="w-full sm:w-auto min-w-[240px] flex items-center justify-center gap-2 py-3 px-8 text-sm sm:text-base"
          >
            <RefreshCw className={`w-4 h-4 ${checking ? "animate-spin" : ""}`} />
            <span>{checking ? "Verificando Conexão..." : "Tentar Novamente"}</span>
          </Button>
        </div>
        </div>
      </main>
    </>
  );
}
