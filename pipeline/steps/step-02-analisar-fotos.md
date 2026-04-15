---
type: auto
execution: inline
model_tier: fast
inputFile: squads/pydiario/output/pauta.md
outputFile: squads/pydiario/output/foto-selecionada.md
---

# Step 02: Marco Visual — Análise e Seleção de Foto

Ativar o agente Marco Visual (ler `agents/marco-visual.agent.md`).

## Processo

1. Ler `pauta.md` para entender o tema e a categoria
2. Acessar a URL_FONTE da pauta e extrair TODAS as fotos da matéria
3. Buscar a mesma pauta em 1-2 veículos adicionais (ABC, Última Hora, La Nación) para mais opções de foto
4. Baixar/visualizar cada foto candidata (mín. 3 opções)
5. Aplicar os 5 critérios do Marco Visual a cada candidata
6. Selecionar a foto com maior SCORE (mín. 27/45)
7. Se nenhuma atingir 27: buscar fotos alternativas via WebSearch com termos visuais da pauta

## Output (foto-selecionada.md)

```
## Análise de Fotos — [tema da pauta]

### Candidatas analisadas:

FOTO 1: [url]
- Impacto: [nota] — [justificativa]
- Conexão: [nota] — [justificativa]
- Enquadramento: [nota] — [justificativa]
- Qualidade: [nota] — [justificativa]
- Pessoa: [nota] — [justificativa]
- SCORE: [total]/45
- bg-position: [valor]

[... mais fotos ...]

### Decisão:
SELECIONADA: FOTO [N]
URL: [url em alta resolução]
BG_POSITION: [valor]
MOTIVO: [1 frase]
```

## Regras

- Nunca aceitar foto genérica de reunião quando há alternativa mais impactante
- Fotos com símbolos visuais da pauta (ex: símbolo nuclear, bandeira, estádio) sempre pontam mais alto
- Se a foto é horizontal e o sujeito é pequeno/lateral, penalizar em enquadramento
- Priorizar fotos que parariam o scroll no Instagram
