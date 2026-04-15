---
type: auto
execution: inline
model_tier: fast
inputFile: squads/pydiario/output/post-image.png
---

# Step 03: Publicar no Instagram

1. Ler `pauta.md` — extrair CATEGORIA, TITULO, RESUMO, URL_FONTE
2. Escrever `caption.txt` no output folder com formato profissional:

```
#CATEGORIA | Título da notícia

Parágrafo 1: contextualização do fato principal (2-3 frases, tom jornalístico profissional, dados concretos)

Parágrafo 2: detalhes relevantes, impacto, declarações (2-3 frases)

#hashtag1 #hashtag2 #Paraguay #noticias #pydiario
```

3. Copiar `pipeline/templates/publish.js` para output folder
4. Executar `node publish.js` (lê caption.txt automaticamente)

## Regras da caption

- Tom jornalístico profissional — como um portal de notícias sério
- Factual e neutro — sem posicionamento político
- Dados concretos quando disponíveis (%, valores, nomes)
- Primeira linha: #CATEGORIA | headline
- 2 parágrafos de contexto (não resumo raso — dar valor informativo real)
- Hashtags no final: 3-5 relevantes + #Paraguay #noticias #pydiario
- Texto em espanhol correto (acentos: á, é, í, ó, ú, ñ)
- Salvar caption.txt com encoding UTF-8
