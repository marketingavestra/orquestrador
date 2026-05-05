import { useState } from "react";
import { Target, User, MapPin, Briefcase, Heart, AlertTriangle, TrendingUp, RefreshCw, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "../lib/utils";

const MOCK_ICP = {
  gerado: true,
  nome: "Carlos — O Trabalhador Lesado",
  avatar: "CL",
  resumo:
    "Trabalhador CLT entre 30 e 50 anos, com carteira assinada há mais de 2 anos, que suspeita ou já sofreu algum tipo de violação de direitos trabalhistas — seja horas extras não pagas, demissão sem justa causa, assédio moral ou desvio de função. Busca resolver a situação de forma rápida, sem burocracia e com alguém de confiança ao lado.",
  demografico: {
    idade: "30 – 50 anos",
    genero: "60% masculino / 40% feminino",
    localizacao: "Grandes centros urbanos (SP, RJ, BH, Curitiba)",
    escolaridade: "Ensino médio completo a superior incompleto",
    renda: "R$ 2.000 – R$ 6.000/mês",
    ocupacao: "Operador, vendedor, técnico, auxiliar administrativo",
  },
  comportamento: {
    redesSociais: ["Instagram", "WhatsApp", "YouTube"],
    conteudoConsume: ["Vídeos curtos explicativos", "Carrosséis com dicas", "Depoimentos reais"],
    horarioPico: "18h – 22h (após o trabalho)",
    dispositivo: "Smartphone (Android, 85%)",
  },
  dores: [
    "Não sabe se tem direito a reclamar",
    "Medo de perder o emprego ao processar a empresa",
    "Já tentou resolver sozinho e não conseguiu",
    "Desconfia de advogados por experiências ruins ou custo alto",
    "Sente que a empresa sempre leva vantagem",
  ],
  desejos: [
    "Receber o que é seu por direito sem complicação",
    "Ter um advogado que fale a sua língua",
    "Resolver rápido, sem anos de processo",
    "Sentir que alguém está do seu lado",
    "Não pagar nada adiantado",
  ],
  objecoes: [
    "Isso vai demorar anos",
    "Advogado é caro demais",
    "Não tenho provas suficientes",
    "Minha empresa vai me demitir se eu processar",
  ],
  gatilhos: [
    "Demissão recente sem receber tudo",
    "Amigo ou familiar que ganhou processo trabalhista",
    "Viu conteúdo educativo sobre direitos no Instagram",
    "Recebeu proposta de acordo que parece injusta",
  ],
  mensagemChave: "Você trabalhou duro. Seus direitos existem. Nós fazemos você receber o que é seu — sem complicação e sem pagar nada adiantado.",
};

type Secao = "perfil" | "dores" | "gatilhos" | "mensagem";

export function InstagramICP() {
  const [secaoAtiva, setSecaoAtiva] = useState<Secao>("perfil");
  const [gerando, setGerando] = useState(false);

  function handleGerar() {
    setGerando(true);
    setTimeout(() => setGerando(false), 2800);
  }

  const secoes: { id: Secao; label: string; icon: React.ElementType }[] = [
    { id: "perfil", label: "Perfil", icon: User },
    { id: "dores", label: "Dores & Desejos", icon: Heart },
    { id: "gatilhos", label: "Gatilhos & Objeções", icon: AlertTriangle },
    { id: "mensagem", label: "Mensagem-Chave", icon: TrendingUp },
  ];

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="border-b border-border px-6 py-4 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-500" />
              ICP — Perfil do Cliente Ideal
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Gerado com base nos documentos, pesquisa de concorrentes e linha de comunicação
            </p>
          </div>
          <Button onClick={handleGerar} disabled={gerando} variant="outline" size="sm">
            {gerando ? (
              <><RefreshCw className="h-4 w-4 mr-1.5 animate-spin" />Gerando ICP...</>
            ) : (
              <><RefreshCw className="h-4 w-4 mr-1.5" />Regenerar ICP</>
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-48 shrink-0 border-r border-border flex flex-col gap-1 p-3">
          {secoes.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setSecaoAtiva(s.id)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-left transition-colors",
                  secaoAtiva === s.id
                    ? "bg-accent text-foreground"
                    : "text-foreground/70 hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Conteúdo */}
        <div className="flex-1 min-h-0 overflow-y-auto p-6">

          {/* PERFIL */}
          {secaoAtiva === "perfil" && (
            <div className="max-w-2xl">
              {/* Card de persona */}
              <div className="rounded-lg border border-border bg-card p-5 mb-5">
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {MOCK_ICP.avatar}
                  </div>
                  <div>
                    <h2 className="text-base font-semibold">{MOCK_ICP.nome}</h2>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{MOCK_ICP.resumo}</p>
                  </div>
                </div>
              </div>

              {/* Demográfico */}
              <div className="rounded-lg border border-border overflow-hidden mb-5">
                <div className="px-4 py-2.5 bg-muted/40 border-b border-border">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" /> Perfil Demográfico
                  </h3>
                </div>
                <div className="divide-y divide-border">
                  {Object.entries(MOCK_ICP.demografico).map(([key, val]) => {
                    const labels: Record<string, string> = {
                      idade: "Idade", genero: "Gênero", localizacao: "Localização",
                      escolaridade: "Escolaridade", renda: "Renda", ocupacao: "Ocupação",
                    };
                    return (
                      <div key={key} className="flex items-center px-4 py-2.5">
                        <span className="w-32 text-xs text-muted-foreground shrink-0">{labels[key]}</span>
                        <span className="text-sm font-medium">{val}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Comportamento digital */}
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="px-4 py-2.5 bg-muted/40 border-b border-border">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Comportamento Digital</h3>
                </div>
                <div className="divide-y divide-border">
                  <div className="flex items-start px-4 py-2.5">
                    <span className="w-32 text-xs text-muted-foreground shrink-0 mt-0.5">Redes Sociais</span>
                    <div className="flex gap-1.5 flex-wrap">
                      {MOCK_ICP.comportamento.redesSociais.map((r) => (
                        <span key={r} className="rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 text-xs font-medium">{r}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start px-4 py-2.5">
                    <span className="w-32 text-xs text-muted-foreground shrink-0 mt-0.5">Conteúdo</span>
                    <div className="flex flex-col gap-1">
                      {MOCK_ICP.comportamento.conteudoConsume.map((c) => (
                        <span key={c} className="text-sm">• {c}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center px-4 py-2.5">
                    <span className="w-32 text-xs text-muted-foreground shrink-0">Horário Pico</span>
                    <span className="text-sm font-medium">{MOCK_ICP.comportamento.horarioPico}</span>
                  </div>
                  <div className="flex items-center px-4 py-2.5">
                    <span className="w-32 text-xs text-muted-foreground shrink-0">Dispositivo</span>
                    <span className="text-sm font-medium">{MOCK_ICP.comportamento.dispositivo}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DORES & DESEJOS */}
          {secaoAtiva === "dores" && (
            <div className="max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="px-4 py-2.5 bg-red-50 dark:bg-red-900/20 border-b border-border">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">Dores Principais</h3>
                </div>
                <div className="p-4 flex flex-col gap-2.5">
                  {MOCK_ICP.dores.map((d, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="mt-0.5 h-5 w-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 text-xs font-bold shrink-0">{i + 1}</span>
                      <p className="text-sm">{d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="px-4 py-2.5 bg-green-50 dark:bg-green-900/20 border-b border-border">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">Desejos & Sonhos</h3>
                </div>
                <div className="p-4 flex flex-col gap-2.5">
                  {MOCK_ICP.desejos.map((d, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="mt-0.5 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 text-xs font-bold shrink-0">{i + 1}</span>
                      <p className="text-sm">{d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* GATILHOS & OBJEÇÕES */}
          {secaoAtiva === "gatilhos" && (
            <div className="max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="px-4 py-2.5 bg-purple-50 dark:bg-purple-900/20 border-b border-border">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-400">Gatilhos de Compra</h3>
                </div>
                <div className="p-4 flex flex-col gap-2.5">
                  {MOCK_ICP.gatilhos.map((g, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="text-purple-500 mt-0.5 shrink-0">⚡</span>
                      <p className="text-sm">{g}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="px-4 py-2.5 bg-amber-50 dark:bg-amber-900/20 border-b border-border">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">Objeções Comuns</h3>
                </div>
                <div className="p-4 flex flex-col gap-2.5">
                  {MOCK_ICP.objecoes.map((o, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="text-amber-500 mt-0.5 shrink-0">⚠</span>
                      <p className="text-sm">{o}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MENSAGEM-CHAVE */}
          {secaoAtiva === "mensagem" && (
            <div className="max-w-2xl">
              <div className="rounded-lg border-2 border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20 p-6 text-center mb-5">
                <TrendingUp className="h-8 w-8 mx-auto mb-3 text-orange-500" />
                <h2 className="text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400 mb-3">Mensagem-Chave</h2>
                <p className="text-lg font-semibold leading-relaxed">"{MOCK_ICP.mensagemChave}"</p>
              </div>
              <div className="rounded-lg border border-border p-4 bg-muted/30">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Como usar</h3>
                <p className="text-sm text-muted-foreground">
                  Essa mensagem deve estar presente em todas as publicações, seja de forma direta ou implícita. Ela resume a proposta de valor e fala diretamente com a dor principal do ICP.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
