# Skills de Inteligência e Criação

Quatro skills integradas para o ciclo completo de pesquisa, inteligência e produção de conteúdo.

## Fluxo recomendado

```
competitor-intel  ──┐
                    ├──► segundo-cerebro ──► content-creation
icp-research      ──┘
```

1. **`competitor-intel`** — Espiona concorrentes via Manus API
2. **`icp-research`** — Pesquisa o público ideal via Perplexity + sintetiza com Claude
3. **`segundo-cerebro`** — Consolida todos os documentos em base de conhecimento PARA
4. **`content-creation`** — Gera imagens com DALL-E 3 (ChatGPT) e Nano

## Configuração rápida

Preencha as chaves no `.env` do projeto:

| Variável | Skill | Onde obter |
|----------|-------|------------|
| `MANUS_API_KEY` | competitor-intel | manus.im |
| `PERPLEXITY_API_KEY` | icp-research | perplexity.ai/api |
| `ANTHROPIC_API_KEY` | icp-research, segundo-cerebro | console.anthropic.com |
| `OPENAI_API_KEY` | content-creation | platform.openai.com |
| `NANO_API_KEY` | content-creation | nano-gpt.com |

## Instalar skills em um agente

```bash
# Via API do Paperclip
curl -sS "$PAPERCLIP_API_URL/api/agents/$AGENT_ID/skills/sync" \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "skills": [
      "competitor-intel",
      "icp-research",
      "segundo-cerebro",
      "content-creation"
    ]
  }'
```

## Exemplo de uso em sequência

```
1. Tarefa: "Analise os 3 principais concorrentes do nicho X"
   → Agente usa skill competitor-intel

2. Tarefa: "Monte o ICP completo para empreendedores digitais"
   → Agente usa skill icp-research

3. Tarefa: "Consolide tudo em nosso segundo cérebro"
   → Agente usa skill segundo-cerebro

4. Tarefa: "Crie 9 criativos para Meta Ads baseados no ICP"
   → Agente usa skill content-creation
```
