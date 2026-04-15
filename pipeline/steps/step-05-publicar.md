---
type: auto
execution: inline
model_tier: fast
inputFile: squads/pydiario/output/post-image.png
---

# Step 05: Publicar no Instagram

## Modo Normal (agendado)

1. Ler `pauta.md` — extrair CATEGORIA, TITULO, RESUMO
2. Consultar grade de horários em `reference.md` para definir horário da categoria
3. Escrever `caption.txt` no output folder (formato profissional)
4. Escrever `schedule.txt` com horário: `YYYY-MM-DD HH:MM` (Asunción UTC-4)
5. Copiar `pipeline/templates/publish.js` para output folder
6. Executar `node publish.js` — detecta schedule.txt e agenda automaticamente

## Modo Breaking News (imediato)

1. Mesmos passos 1-4, mas NÃO criar `schedule.txt`
2. Sem schedule.txt, o publish.js publica imediatamente

## Regras da caption

- Tom jornalístico profissional
- Primeira linha: #CATEGORIA | headline
- 2 parágrafos de contexto
- Hashtags no final: 2-3 específicas + #Paraguay #NoticiasPY #noticias #pydiario
- UTF-8 correto (acentos em espanhol)
