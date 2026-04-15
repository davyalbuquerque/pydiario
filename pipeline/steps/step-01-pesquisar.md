---
type: auto
execution: inline
model_tier: fast
outputFile: squads/pydiario/output/pauta.md
---

# Step 01: Pesquisar Pauta

Dado uma CATEGORIA, buscar a melhor pauta do dia.

## Processo

1. Ler `pipeline/data/reference.md` para regras e fontes
2. Ler `_memory/runs.md` para evitar repetição de pautas
3. WebFetch em 2 fontes da categoria — buscar manchetes das últimas 24h
4. Selecionar a pauta com maior potencial de engajamento
5. Buscar a mesma pauta em 2-3 veículos para coletar TODAS as fotos disponíveis

## Output (pauta.md)

```
CATEGORIA: {nome}
COR: {hex — da tabela em reference.md}
LOGO: {arquivo — da tabela em reference.md}
TITULO: {título em espanhol, factual, neutro, máx 4 linhas de ~18 chars com <br>}
FONTE: {veículo principal}
URL_FONTE: {url da matéria}
RESUMO: {1 frase do que aconteceu — para a caption}

FOTOS_CANDIDATAS:
1. [url foto 1] — [fonte] — [descrição breve]
2. [url foto 2] — [fonte] — [descrição breve]
3. [url foto 3] — [fonte] — [descrição breve]
```

## Regras

- Título em espanhol, factual, sem posicionamento político
- Coletar no MÍNIMO 3 fotos candidatas de fontes diferentes
- Usar parâmetro width=1200 nas URLs de resize para alta resolução
- Nunca repetir pauta de runs.md
