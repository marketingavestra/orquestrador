---
name: content-creation
description: >
  Criação de imagens e conteúdo visual usando ChatGPT (DALL-E 3) e Nano (modelos
  de imagem via API). Use quando precisar gerar criativos para anúncios, posts,
  thumbnails, banners, ou qualquer ativo visual. Recebe briefing do ICP e
  concorrentes e produz imagens prontas para uso.
---

# Content Creation Skill

Gera imagens e criativos visuais combinando ChatGPT/DALL-E 3 e Nano para
produção em escala de ativos de marketing.

## Pré-requisitos

- `OPENAI_API_KEY` configurado (para DALL-E 3 via ChatGPT)
- `NANO_API_KEY` configurado (para Nano image models)
- Briefing do ICP (skill `icp-research`) recomendado
- Ângulo de copy definido

## Workflow

### Fase 1: Montar briefing visual

Antes de gerar, defina:
- **Objetivo**: anúncio, post orgânico, thumbnail, banner
- **Plataforma**: Meta Ads, Instagram, YouTube, Google Display
- **Ângulo**: qual dor/desejo do ICP este criativo ataca
- **Estilo**: fotorrealista, ilustração, minimalista, bold/direto

### Fase 2: Gerar com DALL-E 3 (ChatGPT)

```bash
# Gerar imagem via DALL-E 3
RESPONSE=$(curl -sS "https://api.openai.com/v1/images/generations" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"model\": \"dall-e-3\",
    \"prompt\": \"$IMAGE_PROMPT\",
    \"n\": 1,
    \"size\": \"1024x1024\",
    \"quality\": \"hd\",
    \"style\": \"vivid\"
  }")

IMAGE_URL=$(echo $RESPONSE | jq -r '.data[0].url')
REVISED_PROMPT=$(echo $RESPONSE | jq -r '.data[0].revised_prompt')
echo "Imagem gerada: $IMAGE_URL"
echo "Prompt revisado: $REVISED_PROMPT"

# Baixar imagem
curl -sS "$IMAGE_URL" -o "output_dalle_$(date +%s).png"
```

#### Tamanhos disponíveis no DALL-E 3
- `1024x1024` — quadrado (feed Instagram, Facebook)
- `1792x1024` — landscape (YouTube thumbnail, banner)
- `1024x1792` — portrait (Stories, Reels cover, Pinterest)

### Fase 3: Gerar com Nano

```bash
# Gerar imagem via Nano
NANO_RESPONSE=$(curl -sS "https://api.nano-gpt.com/v1/images/generations" \
  -H "Authorization: Bearer $NANO_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"model\": \"$NANO_MODEL\",
    \"prompt\": \"$IMAGE_PROMPT\",
    \"n\": 4,
    \"size\": \"1024x1024\"
  }")

# Baixar todas as variações
echo $NANO_RESPONSE | jq -r '.data[].url' | while read url; do
  curl -sS "$url" -o "output_nano_$(date +%s%N).png"
done
echo "Variações Nano geradas"
```

#### Modelos Nano recomendados
- `flux-pro` — fotorrealista, alta qualidade
- `flux-schnell` — rápido, bom para iteração
- `stable-diffusion-3` — versátil, bom para ilustrações

### Fase 4: Construir prompts de alta conversão

Use este template para prompts de anúncio:

```
[ESTILO]: fotorrealista / ilustração / 3D render
[CENA]: descrição da cena principal
[SUJEITO]: pessoa/objeto central, expressão, postura
[EMOÇÃO]: sentimento que a imagem deve transmitir
[CONTEXTO]: ambiente, iluminação, cores dominantes
[TEXTO NA IMAGEM]: se houver headline ou CTA (DALL-E 3 suporta texto)
[FORMATO]: proporção e uso final
[QUALIDADE]: ultra-detailed, professional photography, 8k

Exemplo completo:
"Professional photography of a confident Brazilian entrepreneur, 35 years old,
smiling while looking at laptop showing growth charts, modern home office,
warm natural lighting, shallow depth of field. Text overlay: 'De 0 a 10k/mês'.
Ultra-detailed, 8k quality, suitable for Facebook ad."
```

### Fase 5: Variações A/B

Gere pelo menos 3 variações por criativo:
1. **Variação A**: foco na dor (problema atual)
2. **Variação B**: foco no desejo (resultado futuro)
3. **Variação C**: prova social (resultado de outros)

```bash
# Loop para gerar variações
for ANGLE in "pain" "desire" "social_proof"; do
  PROMPT=$(build_prompt_for_angle "$ANGLE" "$ICP_CONTEXT")
  generate_image_dalle3 "$PROMPT" "output_${ANGLE}.png"
  generate_image_nano "$PROMPT" "output_nano_${ANGLE}.png"
done
```

### Fase 6: Organizar outputs

```bash
OUTPUT_DIR="$AGENT_HOME/life/projects/$PROJECT_SLUG/creatives/$(date +%Y-%m-%d)"
mkdir -p "$OUTPUT_DIR"
mv output_*.png "$OUTPUT_DIR/"

# Criar índice de criativos
cat > "$OUTPUT_DIR/index.md" << 'MD'
# Criativos — {{date}}
Projeto: {{project_name}}
ICP: {{icp_name}}

| Arquivo | Ângulo | Plataforma | Modelo | Status |
|---------|--------|------------|--------|--------|
| output_pain.png | Dor | Meta Ads | DALL-E 3 | gerado |
| output_desire.png | Desejo | Instagram | DALL-E 3 | gerado |
| output_social_proof.png | Prova Social | Meta Ads | Nano/flux-pro | gerado |
MD
```

## Variáveis de ambiente necessárias

```json
{
  "OPENAI_API_KEY": "sua-chave-openai",
  "NANO_API_KEY": "sua-chave-nano",
  "NANO_MODEL": "flux-pro",
  "PROJECT_SLUG": "nome-do-projeto",
  "AGENT_HOME": "caminho base do agente"
}
```

## Integração com outras skills

1. Rode `icp-research` primeiro — use os ângulos de copy do ICP como base dos prompts
2. Rode `competitor-intel` — use os criativos dos concorrentes como referência de estilo
3. Salve outputs em `projects/<slug>/creatives/` para o `segundo-cerebro`

## Notas

- DALL-E 3 é melhor para imagens com texto embutido
- Nano/Flux-Pro é melhor para fotorrealismo e variações em escala
- Sempre gere pelo menos 3 variações por ângulo para teste A/B
- Revise o `revised_prompt` do DALL-E 3 — ele mostra o que foi realmente gerado
- Para anúncios Meta: prefira 1:1 (feed) e 9:16 (stories)
