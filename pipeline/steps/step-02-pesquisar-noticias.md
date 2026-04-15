---
type: auto
agent: carlos-cazador
execution: subagent
model_tier: fast
inputFile: squads/pydiario/output/run-context.md
outputFile: squads/pydiario/output/news-ranking.md
---

# Step 02: Pesquisar Notícias

Carlos Cazador pesquisa as fontes paraguaias para a categoria selecionada e entrega um ranking das top 3 pautas com maior potencial de engajamento para o @pydiario.

## Instruções

1. Ler `run-context.md` para identificar a categoria selecionada
2. Consultar as fontes conforme `pipeline/data/fontes.md`:
   - Para todas as categorias: El Nacional, ABC Color, La Nación, Última Hora
   - Para NEGOCIOS: incluir Forbes Paraguay
3. Buscar as notícias mais relevantes das últimas 24h para a categoria
4. Selecionar top 3 com maior potencial de engajamento para o público paraguaio
5. Verificar que as pautas não foram publicadas nos dias anteriores (checar `_memory/runs.md`)
6. Salvar ranking em `news-ranking.md`

## Veto Conditions

- Reprovar se alguma pauta não tiver URL verificável
- Reprovar se alguma pauta tiver mais de 48h de publicação
- Reprovar se menos de 2 pautas forem encontradas
