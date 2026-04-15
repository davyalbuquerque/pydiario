---
type: auto
execution: inline
model_tier: fast
inputFile: squads/pydiario/output/post-image.png
outputFile: squads/pydiario/output/revisao.md
---

# Step 04: Marco Visual — Revisão da Arte Final

Ativar o agente Marco Visual (ler `agents/marco-visual.agent.md`), seção "Revisão de Arte".

## Processo

1. Ler o PNG renderizado (`post-image.png`)
2. Ler `foto-selecionada.md` para conferir se a foto usada é a selecionada
3. Ler `reference.md` para verificar cor da categoria
4. Aplicar o checklist de revisão do Marco Visual:
   - Sujeito principal visível e não coberto pelo título?
   - Cores sincronizadas (logo = borda = tag)?
   - Título legível com contraste suficiente?
   - Composição equilibrada?
   - Impacto geral (1-5)
5. Se APROVADO → salvar revisão e prosseguir
6. Se AJUSTAR → corrigir bg-position ou título, re-renderizar, e revisar novamente (máx 2 tentativas)
7. Se REFAZER → voltar ao step-02 com instrução de buscar foto alternativa

## Output (revisao.md)

```
REVISÃO: [✅ APROVADO | ⚠️ AJUSTAR | ❌ REFAZER]
- Sujeito: [ok/problema]
- Cores: [ok/problema]
- Título: [ok/problema]
- Composição: [ok/problema]
- Impacto: [1-5]
- Nota: [comentário]
```
