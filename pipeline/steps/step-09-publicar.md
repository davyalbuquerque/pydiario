---
type: auto
execution: inline
model_tier: fast
inputFile: squads/pydiario/output/post-image.png
---

# Step 09: Publicar no Instagram

Publicar o post aprovado no Instagram via Meta Graph API.

## Instruções

1. Ler `pauta-selecionada.md` para extrair o título e a categoria da pauta
2. Montar a legenda (caption) do post no formato:
   ```
   📰 {título da notícia em espanhol}

   🏷️ #{categoria} #Paraguay #noticias #pydiario
   ```
3. Copiar `publish.js` do template para o output folder
4. Substituir `__CAPTION__` pela legenda montada
5. Executar `node publish.js`
6. Confirmar que o post foi publicado com sucesso

## Regras da Legenda

- Título factual e neutro (sem posicionamento político)
- Máximo 5 hashtags relevantes
- Sempre incluir: #Paraguay #noticias #pydiario
- Adicionar 1-2 hashtags específicas da pauta (ex: #FMI #economia)

## Veto Conditions

- Reprovar se o script retornar erro
- Reprovar se a imagem não for encontrada no output folder
