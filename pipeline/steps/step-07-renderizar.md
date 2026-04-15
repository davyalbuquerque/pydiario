---
type: auto
agent: diana-design
execution: inline
model_tier: fast
inputFile: squads/pydiario/output/post-image.html
outputFile: squads/pydiario/output/post-image.png
---

# Step 07: Renderizar Post

Renderizar o HTML como PNG 1080×1350px via Playwright.

## Instruções

1. Localizar `render.js` no output folder do run atual
2. Executar via Bash: `node render.js`
3. Verificar que `post-image.png` foi gerado com sucesso
4. Ler o PNG gerado e verificar visualmente:
   - [ ] Dimensões 1080×1350px
   - [ ] Logo visível no topo
   - [ ] Tag de categoria com cor correta
   - [ ] Título legível na parte inferior
   - [ ] Foto de fundo sem cortes ruins
   - [ ] Borda colorida visível
5. Se algum item falhar: corrigir o HTML e re-renderizar

## Veto Conditions

- Reprovar se o PNG não for gerado
- Reprovar se o logo não aparecer
- Reprovar se o título estiver cortado ou ilegível
