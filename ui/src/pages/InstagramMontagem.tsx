import { useState } from "react";
import { Brain, Upload, FileText, Mic, MessageSquare, Trash2, Plus, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "../lib/utils";

const MOCK_DOCUMENTOS = [
  { id: "1", nome: "Apresentação Institucional.pdf", tipo: "PDF", tamanho: "2.4 MB", status: "processado", data: "02/05/2026" },
  { id: "2", nome: "Proposta de Honorários.docx", tipo: "DOCX", tamanho: "890 KB", status: "processado", data: "02/05/2026" },
  { id: "3", nome: "Cases de Sucesso.pdf", tipo: "PDF", tamanho: "5.1 MB", status: "processado", data: "01/05/2026" },
  { id: "4", nome: "Depoimentos de Clientes.txt", tipo: "TXT", tamanho: "45 KB", status: "processado", data: "01/05/2026" },
];

const MOCK_TOM_VOZ = {
  personalidade: "Profissional, acessível e empático. Fala de forma clara, sem juridiquês, tornando o direito compreensível para todos.",
  valores: ["Transparência", "Humanização", "Resultados", "Confiança", "Acessibilidade"],
  evitar: ["Termos técnicos sem explicação", "Tom frio ou distante", "Promessas de resultado garantido", "Linguagem agressiva"],
  exemplos: [
    { bom: "Você tem direito a isso e nós vamos lutar por você.", ruim: "Conforme o art. 477 da CLT, o empregado tem direito..." },
    { bom: "Entendemos o quanto essa situação é difícil. Estamos aqui para ajudar.", ruim: "Protocolaremos a petição inicial no prazo legal." },
  ],
};

const MOCK_FALAS = [
  { id: "1", categoria: "Abertura", texto: "Você sabia que milhares de trabalhadores perdem direitos por não conhecer a lei? Nós mudamos isso." },
  { id: "2", categoria: "CTA", texto: "Fale com um especialista agora. Primeira consulta gratuita e sem compromisso." },
  { id: "3", categoria: "Prova Social", texto: "Mais de 500 clientes atendidos. Histórias reais de quem recuperou o que era seu por direito." },
  { id: "4", categoria: "Educacional", texto: "Direito trabalhista não é complicado quando você tem quem explica do jeito certo." },
];

type Secao = "documentos" | "tomvoz" | "falas" | "segundo-cerebro";

export function InstagramMontagem() {
  const [secaoAtiva, setSecaoAtiva] = useState<Secao>("documentos");
  const [documentos, setDocumentos] = useState(MOCK_DOCUMENTOS);
  const [dragging, setDragging] = useState(false);
  const [expandido, setExpandido] = useState<string | null>(null);

  const secoes: { id: Secao; label: string; icon: React.ElementType; desc: string }[] = [
    { id: "documentos", label: "Documentos", icon: FileText, desc: "Anexe materiais da empresa" },
    { id: "tomvoz", label: "Tom de Voz", icon: Mic, desc: "Defina a personalidade da marca" },
    { id: "falas", label: "Falas & Scripts", icon: MessageSquare, desc: "Frases e roteiros prontos" },
    { id: "segundo-cerebro", label: "Segundo Cérebro", icon: Brain, desc: "Visão consolidada" },
  ];

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="border-b border-border px-6 py-4 shrink-0">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-500" />
          Montagem — Linha de Comunicação
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Monte o segundo cérebro da empresa: tom de voz, documentos e scripts de comunicação
        </p>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar de seções */}
        <div className="w-56 shrink-0 border-r border-border flex flex-col gap-1 p-3">
          {secoes.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setSecaoAtiva(s.id)}
                className={cn(
                  "flex flex-col items-start gap-0.5 rounded-md px-3 py-2.5 text-left transition-colors",
                  secaoAtiva === s.id
                    ? "bg-accent text-foreground"
                    : "text-foreground/70 hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Icon className="h-4 w-4 shrink-0" />
                  {s.label}
                </span>
                <span className="text-[11px] text-muted-foreground pl-6">{s.desc}</span>
              </button>
            );
          })}
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 min-h-0 overflow-y-auto p-6">

          {/* DOCUMENTOS */}
          {secaoAtiva === "documentos" && (
            <div className="max-w-2xl">
              <h2 className="text-sm font-semibold mb-1">Documentos da Empresa</h2>
              <p className="text-xs text-muted-foreground mb-4">
                Anexe apresentações, propostas, cases, depoimentos e qualquer material que represente a empresa. Esses documentos serão usados para criar o ICP e as copies.
              </p>

              {/* Drop zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); }}
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center transition-colors mb-5",
                  dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                )}
              >
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">Arraste arquivos aqui ou clique para selecionar</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, TXT, PNG — até 20MB por arquivo</p>
                <Button variant="outline" size="sm" className="mt-3">Selecionar Arquivos</Button>
              </div>

              {/* Lista de documentos */}
              <div className="rounded-lg border border-border overflow-hidden">
                {documentos.map((doc, i) => (
                  <div key={doc.id} className={cn("flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors", i > 0 && "border-t border-border")}>
                    <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{doc.nome}</p>
                      <p className="text-xs text-muted-foreground">{doc.tipo} · {doc.tamanho} · {doc.data}</p>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 shrink-0">
                      <CheckCircle className="h-3.5 w-3.5" /> Processado
                    </span>
                    <button
                      onClick={() => setDocumentos(documentos.filter(d => d.id !== doc.id))}
                      className="ml-2 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TOM DE VOZ */}
          {secaoAtiva === "tomvoz" && (
            <div className="max-w-2xl">
              <h2 className="text-sm font-semibold mb-1">Tom de Voz da Marca</h2>
              <p className="text-xs text-muted-foreground mb-4">
                Defina como a empresa se comunica. Isso guiará toda a criação de conteúdo.
              </p>

              <div className="rounded-lg border border-border p-4 mb-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Personalidade</h3>
                <p className="text-sm">{MOCK_TOM_VOZ.personalidade}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="rounded-lg border border-border p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Valores</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {MOCK_TOM_VOZ.valores.map((v) => (
                      <span key={v} className="rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2.5 py-0.5 text-xs font-medium">{v}</span>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Evitar</h3>
                  <div className="flex flex-col gap-1">
                    {MOCK_TOM_VOZ.evitar.map((v) => (
                      <span key={v} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <span className="text-red-400 mt-0.5">✕</span>{v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Exemplos de Linguagem</h3>
                <div className="flex flex-col gap-3">
                  {MOCK_TOM_VOZ.exemplos.map((ex, i) => (
                    <div key={i} className="grid grid-cols-2 gap-3">
                      <div className="rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3">
                        <p className="text-[10px] font-semibold text-green-600 dark:text-green-400 mb-1">✓ USE</p>
                        <p className="text-xs">{ex.bom}</p>
                      </div>
                      <div className="rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
                        <p className="text-[10px] font-semibold text-red-600 dark:text-red-400 mb-1">✕ EVITE</p>
                        <p className="text-xs">{ex.ruim}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FALAS */}
          {secaoAtiva === "falas" && (
            <div className="max-w-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-semibold">Falas & Scripts</h2>
                  <p className="text-xs text-muted-foreground">Frases prontas para usar nas publicações</p>
                </div>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1.5" />Nova Fala
                </Button>
              </div>
              <div className="flex flex-col gap-3">
                {MOCK_FALAS.map((f) => (
                  <div key={f.id} className="rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{f.categoria}</span>
                      <button className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="text-sm">{f.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEGUNDO CÉREBRO */}
          {secaoAtiva === "segundo-cerebro" && (
            <div className="max-w-2xl">
              <h2 className="text-sm font-semibold mb-1">Segundo Cérebro — Visão Consolidada</h2>
              <p className="text-xs text-muted-foreground mb-4">
                Resumo de tudo que foi configurado. Esse é o contexto que será enviado para o Claude na etapa de Criação.
              </p>

              <div className="rounded-lg border border-border divide-y divide-border">
                {[
                  { label: "Documentos indexados", valor: `${MOCK_DOCUMENTOS.length} arquivos`, ok: true },
                  { label: "Tom de voz", valor: "Configurado", ok: true },
                  { label: "Falas & Scripts", valor: `${MOCK_FALAS.length} scripts`, ok: true },
                  { label: "ICP", valor: "Pendente — configure na aba ICP", ok: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between px-4 py-3">
                    <span className="text-sm">{item.label}</span>
                    <span className={cn("text-xs font-medium flex items-center gap-1.5", item.ok ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400")}>
                      {item.ok ? <CheckCircle className="h-3.5 w-3.5" /> : "⚠"}
                      {item.valor}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Contexto gerado para IA</h3>
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed">
{`Empresa: Advocacia Jonas & Associados
Nicho: Direito Trabalhista e Previdenciário
Tom: Profissional, acessível e empático
Valores: Transparência, Humanização, Resultados
Documentos: 4 arquivos indexados
Scripts: 4 falas prontas
Público: Trabalhadores CLT, 25-55 anos`}
                </pre>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
