---
type: auto
execution: inline
model_tier: fast
inputFile: squads/pydiario/output/pauta.md
outputFile: squads/pydiario/output/post-image.png
---

# Step 02: Criar HTML + Renderizar PNG

Ler `pauta.md` e gerar a arte do post.

## Processo

1. Ler `pauta.md` — extrair: CATEGORIA, COR, LOGO, TITULO, FOTO_URL, FOTO_POSICAO
2. Copiar `pipeline/templates/post-template.html` para output folder como `post-image.html`
3. Substituir variáveis no HTML:
   - `__BG_URL__` → FOTO_URL
   - `__BG_POSITION__` → FOTO_POSICAO
   - `__CATEGORY_COLOR__` → COR
   - `__CATEGORY_TEXT_COLOR__` → #ffffff
   - `__CATEGORY_NAME__` → CATEGORIA
   - `__TITLE__` → TITULO (com `<br>` para quebras de linha)
   - `__LOGO_SRC__` → manter placeholder (render.js substitui)
4. Copiar `pipeline/templates/render-template.js` como `render.js`
5. Substituir `__LOGO_FILE__` → LOGO
6. Executar `node render.js`
7. Verificar que `post-image.png` foi gerado

## Regra de título no HTML

- Máximo 4 linhas separadas por `<br>`
- Cada linha ~16-20 caracteres
- Última linha pode ser menor
