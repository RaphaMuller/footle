"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { WifiOff, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/common/Button";

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
    <main className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl card-silver-glass border border-white/20 p-6 sm:p-8 flex flex-col items-center text-center gap-4 shadow-2xl backdrop-blur-2xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
          <WifiOff className="w-8 h-8" />
        </div>

        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-white tracking-wide">
            Estádio em Manutenção
          </h1>
          <p className="text-sm text-slate-300 mt-1 leading-relaxed">
            Não foi possível carregar a escalação dos atletas no Supabase. O serviço pode estar temporariamente fora do ar ou sem conexão.
          </p>
        </div>

        {errorMsg && (
          <div className="w-full p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2 text-left">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="w-full pt-2">
          <Button
            variant="gradient"
            size="lg"
            onClick={handleRetry}
            disabled={checking}
            className="w-full flex items-center justify-center gap-2 py-3"
          >
            <RefreshCw className={`w-4 h-4 ${checking ? "animate-spin" : ""}`} />
            <span>{checking ? "Verificando Conexão..." : "Tentar Novamente"}</span>
          </Button>
        </div>
      </div>
    </main>
  );
}
