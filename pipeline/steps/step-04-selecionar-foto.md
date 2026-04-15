---
type: auto
agent: felix-foto
execution: subagent
model_tier: powerful
inputFile: squads/pydiario/output/pauta-selecionada.md
outputFile: squads/pydiario/output/foto-selecionada.md
---

# Step 04: Selecionar Foto

Felix Foto identifica a melhor foto para a pauta seguindo a metodologia editorial do @pydiario.

## Instruções

1. Ler `pauta-selecionada.md` para entender o tema e categoria
2. Ler `pipeline/data/regras-editoriais.md` para as regras de seleção de foto
3. Acessar 2–3 dos principais veículos paraguaios que cobrem essa pauta:
   - ABC Color (abc.com.py), Última Hora (ultimahora.com), La Nación (lanacion.com.py)
4. Identificar qual foto editorial principal esses veículos estão usando
5. Tentar primeiro foto com UMA pessoa em destaque — se não disponível ou se a pauta não permitir, aceitar grupo ou imagem institucional
6. Buscar a mesma foto na maior resolução disponível (modificar parâmetros width/quality em URLs de resize)
7. Verificar que o sujeito principal da foto ficará na área superior (acima dos últimos 400px) no formato 1080×1350
8. Recomendar o `background-position` CSS ideal para o enquadramento (ex: `center 30%`, `center top`, `center 20%`)
9. Salvar resultado em `foto-selecionada.md`

## Output de foto-selecionada.md

```
## Foto Selecionada

**URL:** [url da foto em alta resolução]
**Fonte:** [veículo que usou a foto]
**Descrição:** [breve descrição do que aparece na foto]
**Sujeito principal:** [onde está o sujeito na foto — ex: "pessoa centralizada no terço superior"]
**background-position recomendado:** [ex: center 30%]
**Justificativa:** [por que esta foto foi escolhida]
```

## Veto Conditions

- Reprovar se a foto não tiver URL direta acessível
- Reprovar se a foto for de baixa resolução (menor que 800px de largura)
- Reprovar se o sujeito principal da foto ficar coberto pelo bloco de título (última área de 400px)
