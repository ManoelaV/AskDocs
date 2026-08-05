# AskDocs Backend

API backend do AskDocs - Assistente inteligente de documentos usando RAG (Retrieval-Augmented Generation).

## 🚀 Tecnologias

- **NestJS** - Framework Node.js
- **Pinecone** - Banco de dados vetorial
- **Ollama** - Embeddings e LLM (Llama2)
- **Axios** - Cliente HTTP para comunicação com Ollama
- **SQLite** - Banco de dados local (opcional)

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- **Ollama** instalado
- Conta Pinecone

## 🔧 Instalação

1. Clone o repositório e entre na pasta do backend:

```bash
cd askdocs-backend
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

4. Configure as variáveis de ambiente no arquivo `.env`:

```env
# Ollama (Gratuito - roda localmente)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_EMBEDDING_MODEL=nomic-embed-text
OLLAMA_CHAT_MODEL=llama2

# Pinecone (banco vetorial)
PINECONE_API_KEY=sua-chave-pinecone-aqui
PINECONE_INDEX=askdocs

# Server
PORT=3000
```

5. Instale o Ollama e baixe os modelos:

```bash
# Instale o Ollama em: https://ollama.ai/

# Baixe os modelos
ollama pull nomic-embed-text
ollama pull llama2
```

## 🎯 Como rodar

1. Inicie o Ollama (em um terminal):

```bash
ollama serve
```

2. Inicie o AskDocs (em outro terminal):

```bash
npm run start:dev
```

A API estará disponível em: `http://localhost:3000`

## Testando a API

### Opção 1: Usando o script de teste (Windows)

Execute o script PowerShell:

```powershell
.\teste.ps1
```

Este script vai automaticamente:

- Fazer upload do arquivo `teste.txt`
- Fazer 3 perguntas de teste
- Mostrar os resultados

### Opção 2: Teste manual

#### 1. Upload de documento

**Windows (PowerShell):**

```powershell
curl.exe -X POST http://localhost:3000/documents/upload -F "file=@teste.txt"
```

**Linux/Mac:**

```bash
curl -X POST http://localhost:3000/documents/upload -F "file=@teste.txt"
```

#### 2. Fazer uma pergunta

**Windows (PowerShell):**

```powershell
curl.exe -X POST http://localhost:3000/chat -H "Content-Type: application/json" -d '{"question": "O que é o AskDocs?"}'
```

**Linux/Mac:**

```bash
curl -X POST http://localhost:3000/chat -H "Content-Type: application/json" -d '{"question": "O que é o AskDocs?"}'
```

### Opção 3: Usando Postman

1. Importe o arquivo `AskDocs_API_Test.postman_collection.json`
2. Execute as requisições da coleção

## 📚 Endpoints

### Documents

- `POST /documents/upload` - Upload de documento (PDF/TXT)
- `POST /documents/ingest-external` - Ingestão de dados externos (usado pelo n8n)

### Chat

- `POST /chat` - Fazer uma pergunta ao assistente

## 🏗️ Arquitetura

```
src/
├── modules/
│   ├── documents/          # Upload e processamento de documentos
│   │   ├── documents.controller.ts
│   │   ├── documents.service.ts
│   │   └── documents.module.ts
│   ├── chat/               # RAG - Busca semântica + Llama2
│   │   ├── chat.controller.ts
│   │   ├── chat.service.ts
│   │   └── chat.module.ts
│   └── vector-store/       # Integração com Pinecone + Ollama
│       ├── vector-store.service.ts
│       └── vector-store.module.ts
├── app.module.ts
└── main.ts
```

## 🔄 Fluxo de Dados

1. **Upload**: Usuário envia PDF/TXT → Backend extrai texto
2. **Chunking**: Texto dividido em pedaços de 500 caracteres
3. **Embedding**: Cada chunk vira um vetor (Ollama - nomic-embed-text)
4. **Armazenamento**: Vetores salvos no Pinecone
5. **Pergunta**: Usuário pergunta → Backend busca vetores similares
6. **Resposta**: Contexto + Pergunta → Llama2 gera resposta

## 🎓 O que você vai aprender?

Este projeto implementa **RAG (Retrieval-Augmented Generation)**:

1. **Upload** → Recebe arquivos PDF/TXT
2. **Extração** → Extrai texto dos arquivos
3. **Chunking** → Divide texto em pedaços pequenos
4. **Embedding** → Converte texto em vetores (Ollama)
5. **Armazenamento** → Salva vetores no Pinecone
6. **Busca** → Encontra trechos similares
7. **Geração** → Cria resposta com Llama2

## 📝 Próximos Passos

- [ ] Adicionar autenticação JWT
- [ ] Implementar histórico de conversas (SQLite)
- [ ] Criar frontend React
- [ ] Configurar n8n para ingestão automática
- [ ] Adicionar testes unitários
- [ ] Deploy em produção

## 🐛 Troubleshooting

### Erro ao conectar no Pinecone

- Verifique se a API key está correta no `.env`
- Confira se o índice `askdocs` existe no Pinecone
- Teste a API key

### Erro ao gerar embeddings

- Verifique se o Ollama está rodando: `ollama serve`
- Verifique se os modelos foram baixados: `ollama list`
- Teste o Ollama: `ollama run llama2 "teste"`

### Erro "Cannot find module"

- Execute `npm install` novamente
- Verifique se o Node.js está na versão 18+

### Erro de streaming no chat

- Verifique se o Ollama está respondendo corretamente
- Reinicie o servidor: `Ctrl+C` e `npm run start:dev`
