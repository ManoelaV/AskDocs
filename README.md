# AskDocs

Assistente inteligente de documentos usando RAG (Retrieval-Augmented Generation).

## 📋 Sobre o Projeto

O AskDocs é um sistema que permite fazer perguntas em linguagem natural sobre seus documentos (PDFs e TXT). Ele usa inteligência artificial para buscar as informações mais relevantes e gerar respostas precisas.

## 🏗️ Arquitetura

O projeto está dividido em duas partes principais:

### Backend (`askdocs-backend/`)

- **NestJS** - API REST
- **Pinecone** - Banco de dados vetorial
- **Ollama** - Embeddings e LLM (Llama2)
- **Axios** - Cliente HTTP para comunicação com Ollama

### Frontend (em desenvolvimento)

- **React** - Interface do usuário
- **Axios** - Comunicação com a API

## 🚀 Como Começar

### 1. Clone o repositório

```bash
git clone https://github.com/ManoelaV/AskDocs.git
cd AskDocs
```

### 2. Instale o Ollama (Gratuito)

Baixe e instale o Ollama

Depois, baixe os modelos:

```bash
ollama pull nomic-embed-text
ollama pull llama2
```

### 3. Configure o Backend

```bash
cd askdocs-backend
npm install
cp .env.example .env
# Edite o arquivo .env com suas credenciais
```

**Importante**: Adicione sua API key do Pinecone no `.env`:

```env
PINECONE_API_KEY=sua-chave-pinecone-aqui
```

### 4. Inicie o projeto

**Terminal 1** - Inicie o Ollama:

```bash
ollama serve
```

**Terminal 2** - Inicie o AskDocs:

```bash
cd askdocs-backend
npm run start:dev
```

### 5. Teste a API

**Opção 1 - Script automatizado (Windows):**

```powershell
cd askdocs-backend
.\teste.ps1
```

**Opção 2 - Manual:**

```bash
# Upload
curl -X POST http://localhost:3000/documents/upload -F "file=@teste.txt"

# Pergunta
curl -X POST http://localhost:3000/chat -H "Content-Type: application/json" -d '{"question": "O que é o AskDocs?"}'
```

## 📚 Documentação

| Arquivo | Descrição |
|---------|-----------|
| `askdocs-backend/README.md` | Documentação técnica do backend |

## 🎯 Funcionalidades

- Upload de documentos (PDF/TXT)
- Extração automática de texto
- Busca semântica inteligente
- Respostas baseadas no contexto do documento
- Integração com n8n (automação)

## 🛠️ Tecnologias

- **Backend**: NestJS, TypeScript
- **IA**: Ollama (Llama2)
- **Embeddings**: Ollama (nomic-embed-text)
- **Vetorial**: Pinecone
- **Frontend**: React (em desenvolvimento)
- **Automação**: n8n (em desenvolvimento)

## 📝 Próximos Passos

- [x] Sistema RAG completo funcional
- [x] Ollama integrado
- [ ] Frontend React com chat interface
- [ ] Histórico de conversas (SQLite)
- [ ] Autenticação JWT
- [ ] Integração com n8n para ingestão automática
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

### Erro no chat

- Verifique se o Ollama está respondendo
- Reinicie o servidor: `Ctrl+C` e `npm run start:dev`

## 📄 Licença

Este projeto está sob a licença UNLICENSED.

## 👨‍💻 Autor

Desenvolvido como projeto de estudo de RAG e busca semântica.

---

**Status**: RAG funcional com Ollama.
