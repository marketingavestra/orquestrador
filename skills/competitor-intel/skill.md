---
name: competitor-intel
description: >
  Espionagem de concorrentes usando a API da Manus. Use quando precisar mapear
  concorrentes, analisar posicionamento, ofertas, preços, copy, anúncios e
  estratégias de marketing. Produz relatório estruturado com insights acionáveis.
---

# Competitor Intel Skill

Usa a API da Manus para coletar e analisar dados de concorrentes de forma sistemática.

## Pré-requisitos

- `MANUS_API_KEY` configurado no `.env` ou nas variáveis de ambiente do agente
- Nome ou domínio do concorrente a ser analisado

## Workflow

### 1. Verificar autenticação

```bash
echo "Manus key presente: ${MANUS_API_KEY:+sim}"
```

### 2. Criar task de pesquisa na Manus

```bash
RESPONSE=$(curl -sS "https://api.manus.im/v1/tasks" \
  -H "Authorization: Bearer $MANUS_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"prompt\": \"Analise o concorrente: $COMPETITOR_NAME. Inclua: site, ofertas, preços, copy, anúncios ativos (Meta/Google), redes sociais, posicionamento, público-alvo, pontos fortes e fracos.\",
    \"tools\": [\"browser\", \"search\"]
  }")
TASK_ID=$(echo $RESPONSE | jq -r '.id')
echo "Task criada: $TASK_ID"
```

### 3. Aguardar conclusão (poll a cada 15s)

```bash
while true; do
  STATUS=$(curl -sS "https://api.manus.im/v1/tasks/$TASK_ID" \
    -H "Authorization: Bearer $MANUS_API_KEY" | jq -r '.status')
  echo "Status: $STATUS"
  if [ "$STATUS" = "completed" ] || [ "$STATUS" = "failed" ]; then break; fi
  sleep 15
done
```

### 4. Recuperar e estruturar resultado

```bash
curl -sS "https://api.manus.im/v1/tasks/$TASK_ID/result" \
  -H "Authorization: Bearer $MANUS_API_KEY" | jq -r '.content'
```

Salve o relatório em `$AGENT_HOME/life/resources/competitors/<slug>/summary.md` com este formato:

```markdown
# Relatório de Inteligência: {{competitor_name}}
Data: {{date}}

## Posicionamento
- Proposta de valor principal
- Público-alvo declarado vs aparente
- Tom de voz

## Ofertas e Preços
- Produtos/serviços principais
- Estrutura de preços
- Garantias e bônus

## Copy e Mensagens
- Headline principal
- Principais argumentos de venda
- Gatilhos emocionais

## Canais e Anúncios
- Plataformas ativas
- Tipos de criativo
- Ângulos identificados

## Pontos Fortes
## Gaps de Oportunidade
## Insights Acionáveis (3-5 ações concretas)
```

## Variáveis de ambiente necessárias

Configure no `adapterConfig.env` do agente:
```json
{
  "MANUS_API_KEY": "sua-chave-manus-aqui",
  "COMPETITOR_NAME": "Nome ou domínio do concorrente"
}
```

## Notas

- Tasks da Manus são assíncronas — poll até `status: completed`
- Para múltiplos concorrentes, crie uma task por concorrente em paralelo
- Combine com a skill `icp-research` para cruzar dados com o ICP
