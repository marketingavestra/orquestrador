import { useState, useEffect } from "react";
import { ListChecks, CheckCircle, Clock, Loader2, AlertCircle, ChevronDown, ChevronUp, Zap } from "lucide-react";
import { cn } from "../lib/utils";

type TaskStatus = "pendente" | "em_andamento" | "concluido" | "erro";

type TaskStep = {
  id: string;
  descricao: string;
  status: TaskStatus;
  detalhe?: string;
  duracao?: string;
};

type Task = {
  id: string;
  titulo: string;
  modulo: string;
  status: TaskStatus;
  iniciadoEm: string;
  concluidoEm?: string;
  progresso: number;
  steps: TaskStep[];
};

const MOCK_TASKS: Task[] = [
  {
    id: "t1",
    titulo: "Pesquisa de Concorrentes — @silvaadvocacia",
    modulo: "Pesquisa de Concorrentes",
    status: "concluido",
    iniciadoEm: "Hoje, 14:28",
    concluidoEm: "Hoje, 14:32",
    progresso: 100,
    steps: [
      { id: "s1", descricao: "Conectando à API do Manus", status: "concluido", duracao: "0.8s" },
      { id: "s2", descricao: "Buscando perfil @silvaadvocacia", status: "concluido", duracao: "1.2s" },
      { id: "s3", descricao: "Coletando últimas 30 publicações", status: "concluido", duracao: "2.1s" },
      { id: "s4", descricao: "Analisando vertentes de conteúdo", status: "concluido", duracao: "1.5s", detalhe: "Identificadas 4 vertentes: Educacional (45%), Cases (25%), Dicas (20%), Institucional (10%)" },
      { id: "s5", descricao: "Extraindo hashtags e horários de pico", status: "concluido", duracao: "0.9s" },
      { id: "s6", descricao: "Gerando relatório final", status: "concluido", duracao: "0.6s" },
    ],
  },
  {
    id: "t2",
    titulo: "Geração de ICP — Advocacia Jonas & Associados",
    modulo: "ICP",
    status: "concluido",
    iniciadoEm: "Hoje, 14:35",
    concluidoEm: "Hoje, 14:37",
    progresso: 100,
    steps: [
      { id: "s1", descricao: "Carregando documentos indexados (4 arquivos)", status: "concluido", duracao: "0.4s" },
      { id: "s2", descricao: "Lendo pesquisa de concorrentes", status: "concluido", duracao: "0.3s" },
      { id: "s3", descricao: "Enviando contexto para Claude", status: "concluido", duracao: "1.1s" },
      { id: "s4", descricao: "Gerando perfil demográfico", status: "concluido", duracao: "3.2s", detalhe: "Persona: Carlos — O Trabalhador Lesado, 30-50 anos, CLT" },
      { id: "s5", descricao: "Mapeando dores e desejos", status: "concluido", duracao: "2.8s" },
      { id: "s6", descricao: "Definindo mensagem-chave", status: "concluido", duracao: "1.9s" },
    ],
  },
  {
    id: "t3",
    titulo: "Criação de Copies — Lote #3 (4 publicações)",
    modulo: "Criação",
    status: "em_andamento",
    iniciadoEm: "Hoje, 14:40",
    progresso: 62,
    steps: [
      { id: "s1", descricao: "Carregando ICP e linha de comunicação", status: "concluido", duracao: "0.3s" },
      { id: "s2", descricao: "Carregando pesquisa de concorrentes", status: "concluido", duracao: "0.2s" },
      { id: "s3", descricao: "Gerando copy — Reels (Demissão sem justa causa)", status: "concluido", duracao: "4.1s" },
      { id: "s4", descricao: "Gerando copy — Carrossel (5 direitos trabalhistas)", status: "concluido", duracao: "3.8s" },
      { id: "s5", descricao: "Gerando roteiro — Ideia de Vídeo (Rescisão indireta)", status: "em_andamento", detalhe: "Claude está escrevendo o roteiro..." },
      { id: "s6", descricao: "Gerando copy — Feed (Depoimento)", status: "pendente" },
    ],
  },
  {
    id: "t4",
    titulo: "Análise de CSV — Meta ADS Abril/2026",
    modulo: "Dashboard & Análise",
    status: "concluido",
    iniciadoEm: "Hoje, 13:15",
    concluidoEm: "Hoje, 13:17",
    progresso: 100,
    steps: [
      { id: "s1", descricao: "Lendo arquivo CSV (4 campanhas, 847 linhas)", status: "concluido", duracao: "0.5s" },
      { id: "s2", descricao: "Calculando métricas consolidadas", status: "concluido", duracao: "0.8s" },
      { id: "s3", descricao: "Identificando top criativos", status: "concluido", duracao: "0.6s" },
      { id: "s4", descricao: "Gerando insights com IA", status: "concluido", duracao: "5.2s", detalhe: "5 insights gerados — 3 positivos, 1 atenção, 1 crítico" },
      { id: "s5", descricao: "Montando dashboard", status: "concluido", duracao: "0.4s" },
    ],
  },
];

const STATUS_CONFIG: Record<TaskStatus, { label: string; icon: React.ElementType; cor: string; bg: string }> = {
  pendente: { label: "Pendente", icon: Clock, cor: "text-muted-foreground", bg: "bg-muted" },
  em_andamento: { label: "Em andamento", icon: Loader2, cor: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
  concluido: { label: "Concluído", icon: CheckCircle, cor: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30" },
  erro: { label: "Erro", icon: AlertCircle, cor: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/30" },
};

const MODULO_CORES: Record<string, string> = {
  "Pesquisa de Concorrentes": "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400",
  "Montagem": "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
  "ICP": "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400",
  "Criação": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
  "Dashboard & Análise": "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
};

function StepIcon({ status }: { status: TaskStatus }) {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span className={cn("h-5 w-5 rounded-full flex items-center justify-center shrink-0", cfg.bg)}>
      <Icon className={cn("h-3 w-3", cfg.cor, status === "em_andamento" && "animate-spin")} />
    </span>
  );
}

export function InstagramTarefas() {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [expandido, setExpandido] = useState<string | null>("t3");
  const [progresso, setProgresso] = useState(62);

  // Simula progresso da tarefa em andamento
  useEffect(() => {
    const interval = setInterval(() => {
      setProgresso((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const emAndamento = tasks.filter(t => t.status === "em_andamento");
  const concluidas = tasks.filter(t => t.status === "concluido");

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="border-b border-border px-6 py-4 shrink-0">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-indigo-500" />
          Acompanhamento de Tarefas
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Acompanhe em tempo real todas as tarefas sendo executadas pela IA
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-5">
        <div className="max-w-3xl">

          {/* Em andamento */}
          {emAndamento.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                </span>
                Em andamento
              </h2>
              <div className="flex flex-col gap-3">
                {emAndamento.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={{ ...task, progresso }}
                    expandido={expandido === task.id}
                    onToggle={() => setExpandido(expandido === task.id ? null : task.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Concluídas */}
          {concluidas.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Concluídas</h2>
              <div className="flex flex-col gap-3">
                {concluidas.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    expandido={expandido === task.id}
                    onToggle={() => setExpandido(expandido === task.id ? null : task.id)}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

function TaskCard({ task, expandido, onToggle }: { task: Task; expandido: boolean; onToggle: () => void }) {
  const cfg = STATUS_CONFIG[task.status];
  const StatusIcon = cfg.icon;

  return (
    <div className={cn(
      "rounded-lg border bg-card overflow-hidden",
      task.status === "em_andamento" ? "border-blue-300 dark:border-blue-700" : "border-border"
    )}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/30 transition-colors"
        onClick={onToggle}
      >
        <StatusIcon className={cn("h-4 w-4 shrink-0", cfg.cor, task.status === "em_andamento" && "animate-spin")} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", MODULO_CORES[task.modulo] ?? "bg-muted text-muted-foreground")}>
              {task.modulo}
            </span>
          </div>
          <p className="text-sm font-medium truncate">{task.titulo}</p>
          <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
            <span>Iniciado: {task.iniciadoEm}</span>
            {task.concluidoEm && <span>Concluído: {task.concluidoEm}</span>}
          </div>
        </div>

        {/* Progresso */}
        <div className="hidden sm:flex flex-col items-end gap-1 shrink-0 w-24">
          <span className={cn("text-xs font-medium", cfg.cor)}>{task.progresso}%</span>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                task.status === "concluido" ? "bg-green-500" :
                task.status === "em_andamento" ? "bg-blue-500" :
                task.status === "erro" ? "bg-red-500" : "bg-muted-foreground"
              )}
              style={{ width: `${task.progresso}%` }}
            />
          </div>
        </div>

        <div className="ml-2 text-muted-foreground">
          {expandido ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </div>

      {/* Steps expandidos */}
      {expandido && (
        <div className="border-t border-border px-4 py-3">
          <div className="flex flex-col gap-2">
            {task.steps.map((step, i) => (
              <div key={step.id} className="flex items-start gap-3">
                <StepIcon status={step.status} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-sm",
                      step.status === "pendente" ? "text-muted-foreground" : "text-foreground"
                    )}>
                      {step.descricao}
                    </span>
                    {step.duracao && (
                      <span className="text-xs text-muted-foreground ml-auto shrink-0">{step.duracao}</span>
                    )}
                  </div>
                  {step.detalhe && (
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <Zap className="h-3 w-3 text-yellow-500 shrink-0" />
                      {step.detalhe}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
