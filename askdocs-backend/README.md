# AskDocs Backend

API backend do AskDocs - Assistente inteligente de documentos usando RAG (Retrieval-Augmented Generation).

## 🚀 Tecnologias

- **NestJS** - Framework Node.js
- **Pinecone** - Banco de dados vetorial
- **OpenAI** - Embeddings e GPT-3.5
- **LangChain** - Integração com OpenAI
- **SQLite** - Banco de dados local (opcional)

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta OpenAI (https://platform.openai.com/)
- Conta Pinecone (https://www.pinecone.io/)

## 🔧 Instalação

1. Clone o repositório e entre na pasta do backend:
```bash
cd docwise-backend
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
OPENAI_API_KEY=sk-sua-chave-openai-aqui
PINECONE_API_KEY=sua-chave-pinecone-aqui
PINECONE_INDEX=askdocs
PORT=3000
```

## 🎯 Como rodar

```bash
# Modo desenvolvimento (com hot reload)
npm run start:dev

# Modo produção
npm run start:prod
```

A API estará disponível em: `http://localhost:3000`

## 📚 Endpoints

### Documents
- `POST /documents/upload` - Upload de documento (PDF/TXT)
- `POST /documents/ingest-external` - Ingestão de dados externos (usado pelo n8n)

### Chat
- `POST /chat` - Fazer uma pergunta ao assistente

## 🧪 Testando a API

### 1. Upload de documento
```bash
curl -X POST http://localhost:3000/documents/upload \
  -F "file=@/caminho/para/seu/arquivo.txt"
```

### 2. Fazer uma pergunta
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "Qual o tema principal do documento?"}'
```

## 🏗️ Arquitetura

```
src/
├── modules/
│   ├── documents/          # Upload e processamento de documentos
│   │   ├── documents.controller.ts
│   │   ├── documents.service.ts
│   │   └── documents.module.ts
│   ├── chat/               # RAG - Busca semântica + GPT
│   │   ├── chat.controller.ts
│   │   ├── chat.service.ts
│   │   └── chat.module.ts
│   └── vector-store/       # Integração com Pinecone
│       ├── pinecone.service.ts
│       └── vector-store.module.ts
├── app.module.ts
└── main.ts
```

## 🔄 Fluxo de Dados

1. **Upload**: Usuário envia PDF/TXT → Backend extrai texto
2. **Chunking**: Texto dividido em pedaços de 500 caracteres
3. **Embedding**: Cada chunk vira um vetor (OpenAI)
4. **Armazenamento**: Vetores salvos no Pinecone
5. **Pergunta**: Usuário pergunta → Backend busca vetores similares
6. **Resposta**: Contexto + Pergunta → GPT-3.5 gera resposta

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

### Erro ao gerar embeddings
- Verifique se a API key da OpenAI está correta
- Confira se você tem créditos na conta OpenAI

### Erro "Cannot find module"
- Execute `npm install` novamente
- Verifique se o Node.js está na versão 18+