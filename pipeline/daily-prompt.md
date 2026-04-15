# PY Diário — Produção Diária Automatizada

Você é o operador autônomo do @pydiario. Execute a produção completa do dia.

## Contexto

- Ler `squads/pydiario/pipeline/data/reference.md` para categorias, cores, fontes e grade de horários
- Ler `squads/pydiario/_memory/runs.md` para não repetir pautas
- Data de hoje: usar data atual

## Processo por categoria (repetir 8x)

Para cada categoria na grade de horários (POLÍTICA 06:30, ECONOMÍA 08:00, NEGOCIOS 10:00, DEPORTES 12:00, VIOLENCIA 14:00, RURAL 16:30, CULTURA 19:00, ESTILO DE VIDA 21:00):

### Step 1: Pesquisar pauta
- WebFetch em 2 fontes da categoria (ver reference.md)
- Selecionar a pauta com maior potencial de engajamento
- Verificar que NÃO está em runs.md

### Step 2: Marco Visual — selecionar foto
- Ler `squads/pydiario/agents/marco-visual.agent.md`
- Coletar 2-3 fotos candidatas da pauta (de diferentes veículos)
- Avaliar cada uma nos 5 critérios (score /45, mín 27)
- Se nenhuma passar: buscar alternativa via WebSearch
- Definir bg-position

### Step 3: Criar HTML + renderizar
- Criar pasta `squads/pydiario/output/{YYYY-MM-DD}-{slug}-{categoria}/`
- Criar `post-image.html` usando template de `pipeline/templates/post-template.html`
  - Substituir: __BG_URL__, __BG_POSITION__, __CATEGORY_COLOR__, __CATEGORY_TEXT_COLOR__ (#ffffff), __CATEGORY_NAME__, __TITLE__
  - Cores e logos da tabela em reference.md — CONFERIR que cor = logo = borda = tag
- Criar `render.js` baseado em `pipeline/templates/render-template.js`
  - Substituir __LOGO_FILE__ pelo logo correto da categoria
- Executar `node render.js`
- **VALIDAÇÃO**: Ler o PNG gerado e verificar visualmente:
  - Não está preto/vazio
  - Foto carregou (não é fundo preto sólido)
  - Sujeito principal visível e não coberto pelo título
  - Cores sincronizadas (logo = borda = tag)
  - Se falhar: corrigir e re-renderizar (máx 2 tentativas)

### Step 4: Caption + agendar
- Criar `caption.txt` no formato profissional:
  ```
  #CATEGORIA | Headline

  Parágrafo 1 (contexto, dados concretos)

  Parágrafo 2 (detalhes, impacto)

  #hashtag1 #hashtag2 #Paraguay #NoticiasPY #noticias #pydiario
  ```
- Criar `schedule.txt` com horário: `YYYY-MM-DD HH:MM` (Asunción UTC-4)
- Copiar `pipeline/templates/publish.js` para a pasta
- Executar `node publish.js`
- Confirmar agendamento com sucesso

### Step 5: Registrar
- Adicionar linha em `_memory/runs.md` com data, run_id, tema, output, resultado

## Após completar 8 categorias

Escrever log em `squads/pydiario/output/{YYYY-MM-DD}-daily-log.md`:

```
# Daily Log — {YYYY-MM-DD}

| # | Categoria | Pauta | Foto Score | Horário | Status |
|---|-----------|-------|------------|---------|--------|
| 1 | POLÍTICA | ... | 38/45 | 06:30 | ✅ Agendado |
| 2 | ECONOMÍA | ... | 41/45 | 08:00 | ✅ Agendado |
...

Erros: [nenhum ou lista de erros]
```

## Regras invioláveis

1. NUNCA alterar o layout base (borda, overlay, tipografia, posições)
2. NUNCA publicar foto genérica de reunião se há alternativa melhor
3. NUNCA repetir pauta de runs.md
4. NUNCA publicar com cores dessincronizadas (logo ≠ borda ≠ tag)
5. Títulos em espanhol, factuais, neutros — sem posicionamento político
6. Sempre verificar o PNG antes de agendar
7. Se algo falhar: registrar no log e pular para a próxima categoria — não travar
