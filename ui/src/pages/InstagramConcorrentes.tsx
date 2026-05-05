import { useState } from "react";
import { Search, Instagram, TrendingUp, Heart, MessageCircle, Share2, Eye, Clock, ChevronDown, ChevronUp, History, RefreshCw, BarChart2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "../lib/utils";

const MOCK_CONCORRENTES = [
  {
    id: "1",
    nome: "Advocacia Silva & Associados",
    perfil: "@silvaadvocacia",
    avatar: "SA",
    seguidores: "12.4K",
    seguindo: 890,
    publicacoes: 342,
    bio: "Especialistas em Direito Trabalhista e Previdenciário. 15 anos de experiência. Consulta gratuita.",
    engajamento: "4.2%",
    frequencia: "5x/semana",
    vertentes: [
      { tipo: "Educacional", percentual: 45, cor: "bg-blue-500" },
      { tipo: "Cases de Sucesso", percentual: 25, cor: "bg-green-500" },
      { tipo: "Dicas Jurídicas", percentual: 20, cor: "bg-purple-500" },
      { tipo: "Institucional", percentual: 10, cor: "bg-orange-500" },
    ],
    topPosts: [
      { tipo: "Carrossel", descricao: "5 direitos trabalhistas que você não sabia que tinha", likes: 1240, comentarios: 87, compartilhamentos: 312 },
      { tipo: "Reels", descricao: "Como funciona a rescisão indireta?", likes: 3800, comentarios: 214, compartilhamentos: 890 },
      { tipo: "Feed", descricao: "Case: cliente recuperou R$45k em horas extras", likes: 980, comentarios: 56, compartilhamentos: 145 },
    ],
    hashtags: ["#direitotrabalhista", "#advogado", "#trabalhista", "#direitos", "#advocacia"],
    horariosPico: ["18h-20h", "12h-13h"],
    ultimaAnalise: "Hoje, 14:32",
  },
  {
    id: "2",
    nome: "Dr. Marcos Ferreira Advogados",
    perfil: "@drmarcos.adv",
    avatar: "MF",
    seguidores: "8.7K",
    seguindo: 1200,
    publicacoes: 198,
    bio: "Direito de Família e Sucessões. Divórcio, inventário e guarda de filhos. Atendimento humanizado.",
    engajamento: "6.1%",
    frequencia: "3x/semana",
    vertentes: [
      { tipo: "Educacional", percentual: 35, cor: "bg-blue-500" },
      { tipo: "Depoimentos", percentual: 30, cor: "bg-yellow-500" },
      { tipo: "Dicas Jurídicas", percentual: 25, cor: "bg-purple-500" },
      { tipo: "Bastidores", percentual: 10, cor: "bg-pink-500" },
    ],
    topPosts: [
      { tipo: "Reels", descricao: "Divórcio consensual: passo a passo em 60 segundos", likes: 5200, comentarios: 341, compartilhamentos: 1200 },
      { tipo: "Carrossel", descricao: "Guarda compartilhada: o que a lei diz", likes: 2100, comentarios: 178, compartilhamentos: 430 },
      { tipo: "Feed", descricao: "Depoimento: cliente resolveu inventário em 3 meses", likes: 890, comentarios: 62, compartilhamentos: 98 },
    ],
    hashtags: ["#direitofamilia", "#divorcio", "#inventario", "#guarda", "#advogadodefamilia"],
    horariosPico: ["19h-21h", "07h-09h"],
    ultimaAnalise: "Hoje, 14:32",
  },
  {
    id: "3",
    nome: "Legaltech Consultoria Jurídica",
    perfil: "@legaltech.jur",
    avatar: "LT",
    seguidores: "21.3K",
    seguindo: 450,
    publicacoes: 567,
    bio: "Advocacia digital. Direito do Consumidor, Bancário e Previdenciário. Atendemos todo o Brasil.",
    engajamento: "3.8%",
    frequencia: "7x/semana",
    vertentes: [
      { tipo: "Educacional", percentual: 50, cor: "bg-blue-500" },
      { tipo: "Notícias Jurídicas", percentual: 20, cor: "bg-red-500" },
      { tipo: "Cases de Sucesso", percentual: 20, cor: "bg-green-500" },
      { tipo: "Institucional", percentual: 10, cor: "bg-orange-500" },
    ],
    topPosts: [
      { tipo: "Reels", descricao: "Banco cobrou taxa indevida? Veja como pedir devolução", likes: 8900, comentarios: 567, compartilhamentos: 2300 },
      { tipo: "Carrossel", descricao: "10 direitos do consumidor que as empresas escondem", likes: 6700, comentarios: 423, compartilhamentos: 1890 },
      { tipo: "Feed", descricao: "STJ decide: seguro de vida não pode ser cancelado", likes: 3200, comentarios: 198, compartilhamentos: 780 },
    ],
    hashtags: ["#direitoconsumidor", "#bancario", "#previdenciario", "#advogadodigital", "#direitobancario"],
    horariosPico: ["20h-22h", "12h-14h"],
    ultimaAnalise: "Hoje, 14:32",
  },
];

const HISTORICO_MOCK = [
  { data: "28/04/2026", concorrentes: 3, status: "Concluído" },
  { data: "21/04/2026", concorrentes: 2, status: "Concluído" },
  { data: "14/04/2026", concorrentes: 4, status: "Concluído" },
  { data: "07/04/2026", concorrentes: 3, status: "Concluído" },
];

function AvatarCircle({ initials, color }: { initials: string; color: string }) {
  return (
    <div className={cn("h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0", color)}>
      {initials}
    </div>
  );
}

const AVATAR_COLORS = ["bg-blue-600", "bg-purple-600", "bg-emerald-600"];

export function InstagramConcorrentes() {
  const [busca, setBusca] = useState("");
  const [expandido, setExpandido] = useState<string | null>("1");
  const [abaAtiva, setAbaAtiva] = useState<"analise" | "historico">("analise");
  const [analisando, setAnalisando] = useState(false);

  function handleAnalisar() {
    setAnalisando(true);
    setTimeout(() => setAnalisando(false), 2500);
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="border-b border-border px-6 py-4 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold flex items-center gap-2">
              <Instagram className="h-5 w-5 text-pink-500" />
              Pesquisa de Concorrentes
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Analise perfis do Instagram e descubra as estratégias dos concorrentes
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={abaAtiva === "analise" ? "default" : "outline"}
              size="sm"
              onClick={() => setAbaAtiva("analise")}
            >
              <BarChart2 className="h-4 w-4 mr-1.5" />
              Análise
            </Button>
            <Button
              variant={abaAtiva === "historico" ? "default" : "outline"}
              size="sm"
              onClick={() => setAbaAtiva("historico")}
            >
              <History className="h-4 w-4 mr-1.5" />
              Histórico
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-5">
        {abaAtiva === "historico" ? (
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Análises Anteriores</h2>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Data</th>
                    <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Concorrentes</th>
                    <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-2.5" />
                  </tr>
                </thead>
                <tbody>
                  {HISTORICO_MOCK.map((h, i) => (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">{h.data}</td>
                      <td className="px-4 py-3 text-muted-foreground">{h.concorrentes} perfis</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 text-xs font-medium">
                          {h.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm" className="h-7 text-xs">Ver relatório</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <>
            {/* Barra de busca + botão */}
            <div className="flex gap-3 mb-6 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cole o @ do concorrente ou URL do perfil..."
                  className="pl-9"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>
              <Button onClick={handleAnalisar} disabled={analisando}>
                {analisando ? (
                  <><RefreshCw className="h-4 w-4 mr-1.5 animate-spin" />Analisando...</>
                ) : (
                  <><Search className="h-4 w-4 mr-1.5" />Analisar</>
                )}
              </Button>
            </div>

            {/* Cards de concorrentes */}
            <div className="flex flex-col gap-4">
              {MOCK_CONCORRENTES.map((c, idx) => (
                <div key={c.id} className="rounded-lg border border-border bg-card overflow-hidden">
                  {/* Header do card */}
                  <div
                    className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => setExpandido(expandido === c.id ? null : c.id)}
                  >
                    <AvatarCircle initials={c.avatar} color={AVATAR_COLORS[idx % AVATAR_COLORS.length]} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{c.nome}</span>
                        <span className="text-xs text-muted-foreground">{c.perfil}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{c.bio}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-6 shrink-0">
                      <div className="text-center">
                        <div className="text-sm font-semibold">{c.seguidores}</div>
                        <div className="text-[10px] text-muted-foreground">Seguidores</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold">{c.engajamento}</div>
                        <div className="text-[10px] text-muted-foreground">Engajamento</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold">{c.frequencia}</div>
                        <div className="text-[10px] text-muted-foreground">Frequência</div>
                      </div>
                    </div>
                    <div className="ml-2 text-muted-foreground">
                      {expandido === c.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </div>

                  {/* Conteúdo expandido */}
                  {expandido === c.id && (
                    <div className="border-t border-border px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Vertentes de publicação */}
                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Vertentes de Publicação</h3>
                        <div className="flex flex-col gap-2">
                          {c.vertentes.map((v) => (
                            <div key={v.tipo}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="font-medium">{v.tipo}</span>
                                <span className="text-muted-foreground">{v.percentual}%</span>
                              </div>
                              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                                <div className={cn("h-full rounded-full", v.cor)} style={{ width: `${v.percentual}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>

                        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-4 mb-2">Hashtags Principais</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {c.hashtags.map((h) => (
                            <span key={h} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{h}</span>
                          ))}
                        </div>

                        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-4 mb-2">Horários de Pico</h3>
                        <div className="flex gap-2">
                          {c.horariosPico.map((h) => (
                            <span key={h} className="flex items-center gap-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2.5 py-0.5 text-xs font-medium">
                              <Clock className="h-3 w-3" />{h}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Top Posts */}
                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Top Publicações</h3>
                        <div className="flex flex-col gap-3">
                          {c.topPosts.map((p, i) => (
                            <div key={i} className="rounded-md border border-border p-3">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{p.tipo}</span>
                              </div>
                              <p className="text-xs font-medium mb-2">{p.descricao}</p>
                              <div className="flex gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1"><Heart className="h-3 w-3 text-red-400" />{p.likes.toLocaleString()}</span>
                                <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3 text-blue-400" />{p.comentarios}</span>
                                <span className="flex items-center gap-1"><Share2 className="h-3 w-3 text-green-400" />{p.compartilhamentos}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-3 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Última análise: {c.ultimaAnalise}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
