---
name: segundo-cerebro
description: >
  Montagem do segundo cérebro com todos os documentos necessários usando o método
  PARA. Use quando precisar organizar conhecimento, criar notas estruturadas,
  sintetizar pesquisas, montar dossiês de clientes/projetos, ou consolidar
  informações de múltiplas fontes em um repositório de conhecimento navegável.
---

# Segundo Cérebro Skill

Organiza e consolida conhecimento usando o método PARA (Projects, Areas, Resources, Archive).
Integra com Claude para síntese e estruturação inteligente dos documentos.

## Estrutura PARA

```
$AGENT_HOME/life/
  projects/          # Trabalho ativo com prazo e objetivo claro
    <projeto>/
      summary.md     # Contexto rápido, carregue primeiro
      items.yaml     # Fatos atômicos, carregue sob demanda
  areas/             # Responsabilidades contínuas sem prazo
    <area>/
      summary.md
  resources/         # Referências e materiais de interesse
    competitors/     # Relatórios de inteligência competitiva
    icps/            # Perfis de cliente ideal
    swipe/           # Copy e criativos de referência
  archive/           # Projetos e recursos inativos
```

## Workflow: Montar Dossiê Completo

### 1. Coletar documentos fonte

Reúna todos os inputs disponíveis:
- Relatórios de concorrentes (skill `competitor-intel`)
- Perfil ICP (skill `icp-research`)
- Transcrições de calls de vendas
- Feedbacks de clientes
- Dados de campanhas
- Pesquisas de mercado

### 2. Sintetizar com Claude

```bash
# Enviar documentos para Claude sintetizar
curl -sS "https://api.anthropic.com/v1/messages" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d "{
    \"model\": \"claude-sonnet-4-6\",
    \"max_tokens\": 4096,
    \"messages\": [{
      \"role\": \"user\",
      \"content\": \"Sintetize os seguintes documentos em um segundo cérebro estruturado para o projeto $PROJECT_NAME. Organize por: contexto do mercado, cliente ideal, concorrentes, oportunidades, estratégia recomendada. Documentos: $DOCUMENTS_JSON\"
    }]
  }"
```

### 3. Criar estrutura de arquivos

```bash
PROJECT_SLUG=$(echo "$PROJECT_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
mkdir -p "$AGENT_HOME/life/projects/$PROJECT_SLUG"

# summary.md — visão geral navegável
cat > "$AGENT_HOME/life/projects/$PROJECT_SLUG/summary.md" << 'MD'
# {{project_name}}
Atualizado: {{date}}

## Contexto
## Objetivo
## Cliente Ideal (ICP)
## Concorrentes Principais
## Oportunidades Identificadas
## Próximos Passos
MD

# items.yaml — fatos atômicos
cat > "$AGENT_HOME/life/projects/$PROJECT_SLUG/items.yaml" << 'YAML'
project: {{project_name}}
updated: {{date}}
facts: []
YAML
```

### 4. Indexar no MEMORY.md

Adicione entrada no índice de memória do agente:
```markdown
- [{{project_name}}](life/projects/{{slug}}/summary.md) — {{one-line description}}
```

## Tipos de documento suportados

| Tipo | Destino PARA | Skill de origem |
|------|-------------|-----------------|
| Relatório de concorrente | `resources/competitors/` | `competitor-intel` |
| Perfil ICP | `resources/icps/` | `icp-research` |
| Dossiê de projeto | `projects/<nome>/` | Esta skill |
| Swipe file de copy | `resources/swipe/` | Manual ou `competitor-intel` |
| Campanha encerrada | `archive/campaigns/` | Manual |

## Variáveis de ambiente necessárias

```json
{
  "ANTHROPIC_API_KEY": "sua-chave-anthropic",
  "PROJECT_NAME": "Nome do projeto",
  "AGENT_HOME": "caminho base do agente"
}
```

## Notas

- Sempre carregue `summary.md` primeiro — é o ponto de entrada rápido
- `items.yaml` contém fatos atômicos para consulta pontual
- Use `archive/` para projetos concluídos — nunca delete, apenas arquive
- Combine com `competitor-intel` e `icp-research` para dossiês completos
