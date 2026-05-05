import { useState } from "react";
import { BarChart2, Upload, TrendingUp, TrendingDown, DollarSign, Eye, MousePointer, ShoppingCart, Users, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "../lib/utils";

const MOCK_METRICAS = {
  periodo: "01/04/2026 – 30/04/2026",
  resumo: {
    investimento: "R$ 4.820,00",
    alcance: "187.430",
    impressoes: "312.890",
    cliques: "8.940",
    ctr: "2,86%",
    cpc: "R$ 0,54",
    leads: "312",
    cpl: "R$ 15,45",
    conversoes: "28",
    cpa: "R$ 172,14",
    roas: "4,2x",
  },
  campanhas: [
    {
      nome: "Trabalhista — Demissão Sem Justa Causa",
      status: "ativa",
      investimento: "R$ 1.800,00",
      alcance: "72.400",
      cliques: "3.240",
      ctr: "3,12%",
      leads: "128",
      cpl: "R$ 14,06",
      conversoes: "12",
      tendencia: "up",
    },
    {
      nome: "Previdenciário — Aposentadoria",
      status: "ativa",
      investimento: "R$ 1.200,00",
      alcance: "48.900",
      cliques: "2.100",
      ctr: "2,41%",
      leads: "87",
      cpl: "R$ 13,79",
      conversoes: "8",
      tendencia: "up",
    },
    {
      nome: "Família — Divórcio e Guarda",
      status: "pausada",
      investimento: "R$ 980,00",
      alcance: "38.200",
      cliques: "1.890",
      ctr: "2,78%",
      leads: "62",
      cpl: "R$ 15,81",
      conversoes: "5",
      tendencia: "down",
    },
    {
      nome: "Consumidor — Banco e Financeiras",
      status: "ativa",
      investimento: "R$ 840,00",
      alcance: "27.930",
      cliques: "1.710",
      ctr: "2,98%",
      leads: "35",
      cpl: "R$ 24,00",
      conversoes: "3",
      tendencia: "down",
    },
  ],
  insights: [
    { tipo: "positivo", texto: "Campanha Trabalhista tem o melhor CPL (R$ 14,06) e maior volume de conversões. Recomendado aumentar orçamento em 30%." },
    { tipo: "positivo", texto: "CTR geral de 2,86% está acima da média do setor jurídico (1,8%). Criativos performando bem." },
    { tipo: "atencao", texto: "Campanha Família está pausada. CPL de R$ 15,81 ainda é aceitável — considere reativar com novos criativos." },
    { tipo: "negativo", texto: "Campanha Consumidor tem CPL de R$ 24,00 — 55% acima da média. Revisar segmentação e criativos." },
    { tipo: "positivo", texto: "ROAS de 4,2x indica retorno saudável. Para cada R$ 1 investido, R$ 4,20 em receita gerada." },
  ],
  topCreativos: [
    { nome: "Reels — Demissão sem justa causa", impressoes: "89.400", ctr: "4,1%", leads: "67", cpl: "R$ 11,20" },
    { nome: "Carrossel — 5 direitos trabalhistas", impressoes: "62.300", ctr: "3,8%", leads: "48", cpl: "R$ 12,50" },
    { nome: "Feed — Depoimento Marcos T.", impressoes: "41.200", ctr: "3,2%", leads: "31", cpl: "R$ 13,87" },
  ],
};

type MetricaCard = {
  label: string;
  valor: string;
  icon: React.ElementType;
  cor: string;
  tendencia?: "up" | "down" | "neutral";
};

export function InstagramDashboard() {
  const [csvCarregado, setCsvCarregado] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [analisando, setAnalisando] = useState(false);

  function handleAnalisar() {
    setAnalisando(true);
    setTimeout(() => { setAnalisando(false); setCsvCarregado(true); }, 2500);
  }

  const metricas: MetricaCard[] = [
    { label: "Investimento", valor: MOCK_METRICAS.resumo.investimento, icon: DollarSign, cor: "text-blue-500", tendencia: "neutral" },
    { label: "Alcance", valor: MOCK_METRICAS.resumo.alcance, icon: Eye, cor: "text-purple-500", tendencia: "up" },
    { label: "Cliques", valor: MOCK_METRICAS.resumo.cliques, icon: MousePointer, cor: "text-orange-500", tendencia: "up" },
    { label: "CTR", valor: MOCK_METRICAS.resumo.ctr, icon: TrendingUp, cor: "text-green-500", tendencia: "up" },
    { label: "Leads", valor: MOCK_METRICAS.resumo.leads, icon: Users, cor: "text-pink-500", tendencia: "up" },
    { label: "CPL", valor: MOCK_METRICAS.resumo.cpl, icon: DollarSign, cor: "text-emerald-500", tendencia: "up" },
    { label: "Conversões", valor: MOCK_METRICAS.resumo.conversoes, icon: ShoppingCart, cor: "text-indigo-500", tendencia: "up" },
    { label: "ROAS", valor: MOCK_METRICAS.resumo.roas, icon: TrendingUp, cor: "text-yellow-500", tendencia: "up" },
  ];

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="border-b border-border px-6 py-4 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-blue-500" />
              Dashboard & Análise — Meta ADS
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Importe o CSV do Meta ADS e receba análise automática com insights de IA
            </p>
          </div>
          {csvCarregado && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Período: {MOCK_METRICAS.periodo}</span>
              <Button variant="outline" size="sm" onClick={handleAnalisar} disabled={analisando}>
                {analisando ? <><RefreshCw className="h-4 w-4 mr-1.5 animate-spin" />Analisando...</> : <><RefreshCw className="h-4 w-4 mr-1.5" />Atualizar</>}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-5">
        {!csvCarregado ? (
          /* Upload de CSV */
          <div className="max-w-lg mx-auto mt-10">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => { e.preventDefault(); setDragging(false); handleAnalisar(); }}
              className={cn(
                "border-2 border-dashed rounded-xl p-12 text-center transition-colors",
                dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              )}
            >
              <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
              <h2 className="text-base font-semibold mb-1">Importe o CSV do Meta ADS</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Exporte o relatório de campanhas no Gerenciador de Anúncios e arraste aqui
              </p>
              <Button onClick={handleAnalisar} disabled={analisando}>
                {analisando ? <><RefreshCw className="h-4 w-4 mr-1.5 animate-spin" />Analisando...</> : <><Upload className="h-4 w-4 mr-1.5" />Selecionar CSV</>}
              </Button>
              <p className="text-xs text-muted-foreground mt-3">Formato: .csv exportado do Meta Business Suite</p>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl">
            {/* Métricas resumo */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {metricas.map((m) => {
                const Icon = m.icon;
                return (
                  <div key={m.label} className="rounded-lg border border-border bg-card p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{m.label}</span>
                      <Icon className={cn("h-4 w-4", m.cor)} />
                    </div>
                    <div className="flex items-end gap-1.5">
                      <span className="text-xl font-bold">{m.valor}</span>
                      {m.tendencia === "up" && <TrendingUp className="h-3.5 w-3.5 text-green-500 mb-0.5" />}
                      {m.tendencia === "down" && <TrendingDown className="h-3.5 w-3.5 text-red-500 mb-0.5" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Insights de IA */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 text-xs">✦</span>
                Insights da IA
              </h2>
              <div className="flex flex-col gap-2">
                {MOCK_METRICAS.insights.map((ins, i) => (
                  <div key={i} className={cn(
                    "flex items-start gap-3 rounded-lg border p-3 text-sm",
                    ins.tipo === "positivo" ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20" :
                    ins.tipo === "negativo" ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20" :
                    "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20"
                  )}>
                    <span className="shrink-0 mt-0.5">
                      {ins.tipo === "positivo" ? "✅" : ins.tipo === "negativo" ? "🔴" : "⚠️"}
                    </span>
                    <p>{ins.texto}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabela de campanhas */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold mb-3">Campanhas</h2>
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/40">
                        <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Campanha</th>
                        <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Status</th>
                        <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">Investimento</th>
                        <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">CTR</th>
                        <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">Leads</th>
                        <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">CPL</th>
                        <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">Conv.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_METRICAS.campanhas.map((camp, i) => (
                        <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {camp.tendencia === "up"
                                ? <TrendingUp className="h-3.5 w-3.5 text-green-500 shrink-0" />
                                : <TrendingDown className="h-3.5 w-3.5 text-red-500 shrink-0" />}
                              <span className="font-medium">{camp.nome}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={cn(
                              "rounded-full px-2 py-0.5 text-xs font-medium",
                              camp.status === "ativa"
                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                : "bg-muted text-muted-foreground"
                            )}>
                              {camp.status === "ativa" ? "Ativa" : "Pausada"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right font-medium">{camp.investimento}</td>
                          <td className="px-4 py-3 text-right">{camp.ctr}</td>
                          <td className="px-4 py-3 text-right">{camp.leads}</td>
                          <td className="px-4 py-3 text-right font-medium">{camp.cpl}</td>
                          <td className="px-4 py-3 text-right font-bold">{camp.conversoes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Top criativos */}
            <div>
              <h2 className="text-sm font-semibold mb-3">Top Criativos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {MOCK_METRICAS.topCreativos.map((cr, i) => (
                  <div key={i} className="rounded-lg border border-border bg-card p-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="h-5 w-5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 text-xs font-bold shrink-0">#{i + 1}</span>
                      <p className="text-xs font-medium truncate">{cr.nome}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-muted-foreground">Impressões</p>
                        <p className="font-semibold">{cr.impressoes}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">CTR</p>
                        <p className="font-semibold text-green-600 dark:text-green-400">{cr.ctr}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Leads</p>
                        <p className="font-semibold">{cr.leads}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">CPL</p>
                        <p className="font-semibold">{cr.cpl}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
