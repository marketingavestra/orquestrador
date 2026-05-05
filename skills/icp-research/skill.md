---
name: icp-research
description: >
  Pesquisa e montagem do ICP (Ideal Customer Profile) usando Perplexity para
  busca de mercado e Claude para síntese e estruturação do perfil de público ideal.
  Use quando precisar definir ou refinar o cliente ideal, entender dores profundas,
  mapear jornada de compra, ou criar avatares de cliente para campanhas.
---

# ICP Research Skill

Combina Perplexity (busca de mercado em tempo real) com Claude (síntese e estruturação)
para montar um perfil completo e acionável do cliente ideal.

## Pré-requisitos

- `PERPLEXITY_API_KEY` configurado
- `ANTHROPIC_API_KEY` configurado
- Nicho ou segmento de mercado definido

## Workflow

### Fase 1: Pesquisa de mercado com Perplexity

```bash
# Busca 1: Dores e frustrações do público
PAIN_RESEARCH=$(curl -sS "https://api.perplexity.ai/chat/completions" \
  -H "Authorization: Bearer $PERPLEXITY_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"model\": \"sonar-pro\",
    \"messages\": [{
      \"role\": \"user\",
      \"content\": \"Quais são as principais dores, frustrações e problemas de $TARGET_MARKET? Inclua dados de fóruns, Reddit, grupos do Facebook, reviews de produtos concorrentes, e pesquisas de mercado recentes. Seja específico com exemplos reais.\"
    }]
  }")

# Busca 2: Desejos e aspirações
DESIRE_RESEARCH=$(curl -sS "https://api.perplexity.ai/chat/completions" \
  -H "Authorization: Bearer $PERPLEXITY_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"model\": \"sonar-pro\",
    \"messages\": [{
      \"role\": \"user\",
      \"content\": \"Quais são os desejos, sonhos e aspirações de $TARGET_MARKET? O que eles querem alcançar? Que transformação buscam? Inclua dados de comunidades online, pesquisas e tendências recentes.\"
    }]
  }")

# Busca 3: Comportamento de compra
BUYING_RESEARCH=$(curl -sS "https://api.perplexity.ai/chat/completions" \
  -H "Authorization: Bearer $PERPLEXITY_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"model\": \"sonar-pro\",
    \"messages\": [{
      \"role\": \"user\",
      \"content\": \"Como $TARGET_MARKET toma decisões de compra? Quais objeções têm? Onde pesquisam antes de comprar? Quais influenciadores seguem? Qual ticket médio aceitam pagar?\"
    }]
  }")
```

### Fase 2: Síntese e montagem do ICP com Claude

```bash
curl -sS "https://api.anthropic.com/v1/messages" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d "{
    \"model\": \"claude-sonnet-4-6\",
    \"max_tokens\": 8192,
    \"system\": \"Você é um especialista em marketing direto e psicologia do consumidor. Monte um ICP completo e acionável baseado nas pesquisas fornecidas. Seja específico, use linguagem do próprio público, e foque em insights que gerem copy e criativos de alta conversão.\",
    \"messages\": [{
      \"role\": \"user\",
      \"content\": \"Monte o ICP completo para $TARGET_MARKET com base nestas pesquisas:\\n\\nDORES: $PAIN_RESEARCH\\n\\nDESEJOS: $DESIRE_RESEARCH\\n\\nCOMPORTAMENTO: $BUYING_RESEARCH\"
    }]
  }"
```

### Fase 3: Estrutura do ICP entregue

Claude deve produzir o perfil neste formato:

```markdown
# ICP: {{target_market}}
Data: {{date}}

## Perfil Demográfico
- Idade, gênero, localização
- Renda e situação profissional
- Nível de escolaridade

## Perfil Psicográfico
- Valores e crenças centrais
- Estilo de vida
- Identidade e como se vê

## Dores Profundas (na linguagem deles)
1. Dor principal — citação real do público
2. Dor secundária
3. Dor terciária

## Desejos e Aspirações
1. O que querem alcançar
2. Transformação desejada
3. Como querem se sentir

## Objeções de Compra
1. Objeção principal + como quebrar
2. Objeção secundária + como quebrar

## Jornada de Compra
- Onde pesquisa: fóruns, YouTube, Instagram...
- Gatilhos de decisão
- Ticket médio aceito
- Tempo médio de decisão

## Linguagem e Vocabulário
- Palavras que usam para descrever o problema
- Palavras que usam para descrever a solução ideal
- Frases e expressões características

## Ângulos de Copy de Alta Conversão
1. Ângulo 1: {{descrição}}
2. Ângulo 2: {{descrição}}
3. Ângulo 3: {{descrição}}

## Avatar Principal
Nome fictício, história de 2 parágrafos que encapsula o ICP.
```

### Fase 4: Salvar no segundo cérebro

```bash
ICP_SLUG=$(echo "$TARGET_MARKET" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
mkdir -p "$AGENT_HOME/life/resources/icps/$ICP_SLUG"
# Salvar resultado em summary.md
```

## Variáveis de ambiente necessárias

```json
{
  "PERPLEXITY_API_KEY": "sua-chave-perplexity",
  "ANTHROPIC_API_KEY": "sua-chave-anthropic",
  "TARGET_MARKET": "ex: empreendedores digitais iniciantes no Brasil"
}
```

## Notas

- Use `sonar-pro` no Perplexity para resultados com fontes verificadas
- Faça pelo menos 3 buscas diferentes (dores, desejos, comportamento)
- Claude sintetiza melhor quando recebe as 3 pesquisas juntas
- Combine com `competitor-intel` para entender como concorrentes falam com este ICP
- Atualize o ICP a cada 3 meses ou após mudanças significativas de mercado
