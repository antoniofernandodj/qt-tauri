# 20 Aplicativos para Showcase com qt-tauri

## Por que o estilo visual importa

O Qt Fusion entrega uma estética compacta, sem ornamentos — bordas finas, fill estático, tipografia discreta. Em aplicativos de produtividade e ferramentas
de desenvolvedor, esse visual sinaliza confiabilidade e foco. O usuário não sente que está usando um site empacotado; sente que está usando uma ferramenta
real.

---

## As 20 Sugestões

  Ferramentas de Desenvolvedor

1. SQLite Browser
Inspetor visual para arquivos .db: visualização de tabelas, editor de queries com syntax highlight, exportação para CSV/JSON. O estilo Qt desktop é
exatamente o que DBAs esperam — denso e funcional como o DBeaver.

2. API Tester (alternativa ao Postman)
Coleções de requisições HTTP, variáveis de ambiente, visualizador de resposta com abas (Body / Headers / Cookies). O visual nativo reduz a sensação de "app
web empacotado" que plataformas Electron transmitem.

3. Visualizador de Logs
Abre arquivos de log grandes com filtragem em tempo real, colorização por nível (ERROR, WARN, INFO) e busca com regex. O estilo compacto permite mostrar
muito conteúdo sem desperdiçar espaço.

4. Editor de Variáveis de Ambiente
Gerenciador visual de arquivos .env por projeto/perfil. Edição inline, importação/exportação, máscara de valores sensíveis. Simples o suficiente para ser
construído em dias com os widgets existentes.

5. Gerenciador de Certificados TLS
Visualiza, importa e inspeciona certificados X.509 locais. Exibe thumbprint, validade, cadeia de confiança em TreeWidget. O visual desktop é essencial para
passar credibilidade em segurança.

6. Diff & Merge Visual
Compara dois arquivos ou diretórios lado a lado com highlight de diferenças. A natureza multi-painel do Qt é natural aqui — Splitter já existe no projeto.

---

## Ferramentas de Sistema

1. Monitor de Sistema
CPU, RAM, disco e rede em tempo real com gráficos. Substitui visual para htop / Activity Monitor. O aspecto nativo faz o app parecer integrado ao OS.

2. Gerenciador de Processos
Lista de processos com kill, prioridade e filtragem. TableView + QItemSelectionModel já prontos no projeto — é um fit arquitetural direto.

3. Ferramenta de Backup
Define jobs de backup com origem, destino, agendamento e exclusões. Exibe histórico de execuções com status. Qt remete ao visual de ferramentas como
Acronis, que inspira confiança em dados críticos.

4. Gerenciador de SSH / Conexões Remotas
Armazena perfis de conexão SSH com suporte a chaves. Abre sessões via terminal embutido. A densidade visual Qt é padrão em clientes SSH como MobaXterm.

---

## Produtividade

1. Gerenciador de Tarefas / GTD
Projetos, tarefas, prioridades e datas. Visualização em lista e kanban. O estilo nativo austero evita distrações e mantém foco — diferente de apps web
coloridos como Notion.

2. Aplicativo de Notas com Markdown
Editor de texto plano com preview Markdown, organização por cadernos e tags. O contraste com apps "modernos" é o selling point: parece um app de escritório
clássico.

3. Gerenciador de Senhas Local
Vault criptografado localmente (sem nuvem). Interface com TreeWidget para categorias e TableView para entradas. A estética séria e discreta reforça a
proposta de segurança.

4. Rastreador de Tempo / Time Tracker
Registra horas por projeto/cliente com timer integrado. Gera relatórios exportáveis. Visual denso e sem floreios transmite seriedade para uso
profissional/faturamento.

5. Leitor de RSS
Agrega feeds, organiza por pastas, marca lidos/favoritos. O estilo Qt desktop evoca leitores clássicos como Thunderbird, familiarizando usuários mais velhos
instantaneamente.

---

## Dados e Análise

1. Importador / Transformador de CSV
Abre arquivos CSV grandes, permite renomear colunas, aplicar transformações simples e exportar. O painel de pré-visualização com TableView é nativo para a
arquitetura do projeto.

2. Dashboard de Métricas de Negócio
Consome APIs REST e exibe KPIs em cards, tabelas e gráficos simples. Versão desktop de um painel BI para equipes pequenas que preferem app local a browser.

3. Explorador de JSON / XML
Carrega estruturas JSON ou XML e exibe em TreeView navegável com busca por path. Útil para desenvolvedores que inspecionam payloads de API.

---

## Nicho / Profissional

1. Configurador de Hardware Embarcado
Interface para configurar dispositivos via serial/USB (ex: microcontroladores, roteadores). O visual industrial Qt é padrão nesse ecossistema — Unity, KDE
Plasma, ferramentas de firmware.

2. CRM Offline para Pequenas Empresas
Cadastro de clientes, histórico de interações, funil de vendas simples. Totalmente local (SQLite), sem assinatura. O visual nativo sério posiciona o app
como ferramenta profissional, não toy web.

---

## Critérios de Seleção

Cada sugestão acima foi escolhida por atender a pelo menos dois destes critérios:

┌─────────────────────┬─────────────────────────────────────────────────────────────────────────────────┐
│      Critério       │                                    Descrição                                    │
├─────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤
│ Fit arquitetural    │ Usa widgets já implementados (TableView, TreeWidget, Splitter, FormLayout)      │
├─────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤
│ Visual congruente   │ O estilo nativo Qt reforça a proposta de valor do produto                       │
├─────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤
│ Gap de mercado      │ Existe uma versão web/Electron com overhead — a versão nativa seria competitiva │
├─────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤
│ Complexidade viável │ Pode ser construído em 1–4 semanas por um desenvolvedor solo                    │
└─────────────────────┴─────────────────────────────────────────────────────────────────────────────────┘

---
Os candidatos mais fortes para um showcase rápido são SQLite Browser, Visualizador de Logs e Gerenciador de Tarefas — os três têm fit direto com os widgets
já prontos e comunicam o estilo Qt de forma imediata a qualquer desenvolvedor que os abra.
