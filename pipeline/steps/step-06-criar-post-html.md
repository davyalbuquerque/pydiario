---
type: auto
agent: diana-design
execution: subagent
model_tier: powerful
inputFile: squads/pydiario/output/foto-aprovada.md
outputFile: squads/pydiario/output/post-image.html
---

# Step 06: Criar Post HTML

Diana Design cria o HTML do post e o render.js para renderização via Playwright.

## Instruções

1. Ler `foto-aprovada.md` para obter: URL da foto, background-position, categoria, título
2. Ler `pauta-selecionada.md` para o título final do post
3. Ler `pipeline/data/visual-identity.md` para as cores e design system da categoria
4. Ler `pipeline/templates/post-template.html` como base do HTML
5. Criar `post-image.html` substituindo todas as variáveis do template:
   - `__BG_URL__` → URL da foto
   - `__BG_POSITION__` → valor de background-position (ex: `center 30%`)
   - `__CATEGORY_COLOR__` → cor da categoria (ex: `#c4170c`)
   - `__CATEGORY_TEXT_COLOR__` → cor do texto da categoria (sempre `#ffffff`)
   - `__LOGO_SRC__` → placeholder (será substituído pelo render.js)
   - `__CATEGORY_NAME__` → nome da categoria em uppercase (ex: `POLÍTICA`)
   - `__TITLE__` → título do post com `<br>` para quebras de linha (máx 4 linhas de ~18 chars cada)
6. Criar `render.js` baseado em `pipeline/templates/render-template.js`, ajustando:
   - `LOGO_FILE` → nome do arquivo de logo da categoria (ex: `logo-politica-ready.png`)
   - `BG_URL` → URL da foto (já embutida no HTML, mas confirmar)
7. Salvar ambos os arquivos no output folder do run

## Regras de título

- Máximo 4 linhas
- Cada linha ~16-20 caracteres
- Usar `<br>` para quebras
- Texto em espanhol, neutro e factual (sem posicionamento político)
- Tom informativo, não sensacionalista

## Veto Conditions

- Reprovar se o HTML não contiver a cor correta da categoria
- Reprovar se o título tiver mais de 4 linhas
- Reprovar se faltar o render.js
