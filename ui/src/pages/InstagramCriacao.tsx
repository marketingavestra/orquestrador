import { useState } from "react";
import { Sparkles, Copy, Check, RefreshCw, Image, Video, FileText, ChevronDown, Filter, Wand2, BookOpen, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "../lib/utils";

type FormatoPost = "carrossel" | "reels" | "feed" | "stories" | "ideia_video";

const FORMATO_LABELS: Record<FormatoPost, string> = {
  carrossel: "Carrossel",
  reels: "Reels",
  feed: "Feed",
  stories: "Stories",
  ideia_video: "Ideia de Vídeo",
};

const FORMATO_ICONS: Record<FormatoPost, React.ElementType> = {
  carrossel: BookOpen,
  reels: Video,
  feed: Image,
  stories: FileText,
  ideia_video: Video,
};

const MOCK_COPIES = [
  {
    id: "1",
    formato: "reels" as FormatoPost,
    titulo: "Você foi demitido sem justa causa? Veja o que você tem direito",
    copy: `🚨 Demitido sem justa causa? Não saia sem receber TUDO que é seu.

Muita gente aceita o que a empresa oferece sem saber que está deixando dinheiro na mesa.

Veja o que você tem direito:
✅ Saldo de salário
✅ Férias proporcionais + 1/3
✅ 13º proporcional
✅ Aviso prévio (trabalhado ou indenizado)
✅ Multa de 40% do FGTS
✅ Seguro-desemprego

Não assine nada antes de consultar um advogado.
Primeira consulta GRATUITA. 👇

#direitotrabalhista #demissao #fgts #trabalhista #advogado`,
    objetivo: "Conversão",
    publicoAlvo: "Trabalhador CLT recém-demitido",
    cta: "Primeira consulta gratuita",
    aprovado: null as boolean | null,
  },
  {
    id: "2",
    formato: "carrossel" as FormatoPost,
    titulo: "5 direitos trabalhistas que sua empresa não quer que você saiba",
    copy: `Slide 1: Título
"5 direitos trabalhistas que sua empresa não quer que você saiba"

Slide 2: Horas extras
Trabalhou além das 8h diárias? Você tem direito a receber com acréscimo de 50% (ou 100% em feriados). Muitas empresas simplesmente ignoram isso.

Slide 3: Intervalo intrajornada
Trabalhou mais de 6h sem pausa de 1h? A empresa deve pagar o tempo de intervalo não concedido.

Slide 4: Desvio de função
Faz tarefas que não estão no seu contrato há mais de 3 meses? Você pode pedir equiparação salarial.

Slide 5: Assédio moral
Pressão excessiva, humilhação ou ameaças constantes configuram assédio moral — e você pode processar.

Slide 6: Rescisão indireta
A empresa descumpriu o contrato? Você pode pedir demissão e receber como se tivesse sido demitido sem justa causa.

Slide 7: CTA
Identificou alguma dessas situações? Fale com a gente. Consulta gratuita e sem compromisso. 👇`,
    objetivo: "Educacional + Conversão",
    publicoAlvo: "Trabalhador CLT ativo",
    cta: "Consulta gratuita",
    aprovado: null as boolean | null,
  },
  {
    id: "3",
    formato: "ideia_video" as FormatoPost,
    titulo: "Como funciona a rescisão indireta? (Reels 60s)",
    copy: `ROTEIRO — Reels 60 segundos

[0-5s] GANCHO:
"Você pode se demitir e ainda receber como se tivesse sido mandado embora. Isso existe e se chama rescisão indireta."

[5-20s] PROBLEMA:
"Muita gente aguenta situações absurdas no trabalho com medo de perder os benefícios da demissão sem justa causa. Mas existe uma saída."

[20-40s] SOLUÇÃO:
"A rescisão indireta acontece quando a empresa descumpre o contrato. Exemplos: não pagar salário em dia, exigir tarefas perigosas, assédio moral comprovado."

[40-55s] PROVA:
"Já ajudamos dezenas de clientes a usar esse direito. Um deles recebeu mais de R$ 30 mil após 2 anos de assédio."

[55-60s] CTA:
"Acha que sua situação se encaixa? Comenta RESCISÃO aqui embaixo que eu te explico."`,
    objetivo: "Alcance + Engajamento",
    publicoAlvo: "Trabalhador CLT em situação difícil",
    cta: "Comentar 'RESCISÃO'",
    aprovado: null as boolean | null,
  },
  {
    id: "4",
    formato: "feed" as FormatoPost,
    titulo: "Depoimento: Cliente recuperou R$ 45.000 em horas extras",
    copy: `"Trabalhei 4 anos fazendo horas extras que nunca foram pagas. Achei que não tinha como provar. A equipe do Dr. Jonas encontrou os registros e em 8 meses recebi tudo."

— Marcos T., operador de logística, São Paulo

Você também pode ter direito a valores que nunca recebeu.

Não precisa ter provas perfeitas. Precisa de um advogado que saiba onde procurar.

👇 Primeira consulta gratuita. Clique no link da bio.

#direitotrabalhista #horasextras #advogadotrabalhista #justicatrabalhista`,
    objetivo: "Prova Social + Conversão",
    publicoAlvo: "Trabalhador CLT com horas extras não pagas",
    cta: "Link na bio",
    aprovado: null as boolean | null,
  },
];

export function InstagramCriacao() {
  const [copies, setCopies] = useState(MOCK_COPIES);
  const [filtroFormato, setFiltroFormato] = useState<FormatoPost | "todos">("todos");
  const [copiado, setCopiado] = useState<string | null>(null);
  const [gerando, setGerando] = useState(false);
  const [expandido, setExpandido] = useState<string | null>("1");

  function handleCopiar(id: string, texto: string) {
    navigator.clipboard.writeText(texto).catch(() => {});
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  }

  function handleAprovar(id: string, aprovado: boolean) {
    setCopies(copies.map(c => c.id === id ? { ...c, aprovado } : c));
  }

  function handleGerar() {
    setGerando(true);
    setTimeout(() => setGerando(false), 3000);
  }

  const copiesFiltradas = filtroFormato === "todos"
    ? copies
    : copies.filter(c => c.formato === filtroFormato);

  const formatos: (FormatoPost | "todos")[] = ["todos", "reels", "carrossel", "feed", "stories", "ideia_video"];

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="border-b border-border px-6 py-4 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              Criação — Copy para Publicações
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Claude gera copies baseadas no ICP, pesquisa de concorrentes e linha de comunicação
            </p>
          </div>
          <Button onClick={handleGerar} disabled={gerando}>
            {gerando ? (
              <><RefreshCw className="h-4 w-4 mr-1.5 animate-spin" />Gerando copies...</>
            ) : (
              <><Wand2 className="h-4 w-4 mr-1.5" />Gerar Novas Copies</>
            )}
          </Button>
        </div>

        {/* Filtros de formato */}
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {formatos.map((f) => (
            <button
              key={f}
              onClick={() => setFiltroFormato(f)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                filtroFormato === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {f === "todos" ? "Todos" : FORMATO_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de copies */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-5">
        <div className="flex flex-col gap-4 max-w-3xl">
          {copiesFiltradas.map((c) => {
            const FormatoIcon = FORMATO_ICONS[c.formato];
            const isExpanded = expandido === c.id;
            return (
              <div key={c.id} className={cn(
                "rounded-lg border bg-card overflow-hidden transition-colors",
                c.aprovado === true ? "border-green-400 dark:border-green-700" :
                c.aprovado === false ? "border-red-300 dark:border-red-800" :
                "border-border"
              )}>
                {/* Header do card */}
                <div
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => setExpandido(isExpanded ? null : c.id)}
                >
                  <span className="rounded-md bg-muted p-1.5 shrink-0">
                    <FormatoIcon className="h-4 w-4 text-muted-foreground" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{FORMATO_LABELS[c.formato]}</span>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{c.objetivo}</span>
                      {c.aprovado === true && <span className="rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 text-[10px] font-medium">Aprovado</span>}
                      {c.aprovado === false && <span className="rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-0.5 text-[10px] font-medium">Rejeitado</span>}
                    </div>
                    <p className="text-sm font-medium mt-0.5 truncate">{c.titulo}</p>
                  </div>
                  <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform shrink-0", isExpanded && "rotate-180")} />
                </div>

                {/* Conteúdo expandido */}
                {isExpanded && (
                  <div className="border-t border-border px-4 py-4">
                    <div className="flex gap-3 mb-3 text-xs text-muted-foreground">
                      <span>Público: <strong className="text-foreground">{c.publicoAlvo}</strong></span>
                      <span>CTA: <strong className="text-foreground">{c.cta}</strong></span>
                    </div>
                    <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed bg-muted/30 rounded-md p-4 border border-border">
                      {c.copy}
                    </pre>
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8"
                        onClick={() => handleCopiar(c.id, c.copy)}
                      >
                        {copiado === c.id ? (
                          <><Check className="h-3.5 w-3.5 mr-1.5 text-green-500" />Copiado!</>
                        ) : (
                          <><Copy className="h-3.5 w-3.5 mr-1.5" />Copiar</>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn("h-8", c.aprovado === true && "border-green-500 text-green-600")}
                        onClick={() => handleAprovar(c.id, true)}
                      >
                        <ThumbsUp className="h-3.5 w-3.5 mr-1.5" />Aprovar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn("h-8", c.aprovado === false && "border-red-500 text-red-600")}
                        onClick={() => handleAprovar(c.id, false)}
                      >
                        <ThumbsDown className="h-3.5 w-3.5 mr-1.5" />Rejeitar
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 ml-auto">
                        <RefreshCw className="h-3.5 w-3.5 mr-1.5" />Regenerar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
