# AskDocs

Assistente inteligente de documentos usando RAG (Retrieval-Augmented Generation).

## 📋 Sobre o Projeto

O AskDocs é um sistema que permite fazer perguntas em linguagem natural sobre seus documentos (PDFs e TXT). Ele usa inteligência artificial para buscar as informações mais relevantes e gerar respostas precisas.

## 🏗️ Arquitetura

O projeto está dividido em duas partes principais:

### Backend (`askdocs-backend/`)
- **NestJS** - API REST
- **Pinecone** - Banco de dados vetorial
- **OpenAI** - Embeddings e GPT-3.5
- **LangChain** - Integração com OpenAI

### Frontend (em desenvolvimento)
- **React** - Interface do usuário
- **Axios** - Comunicação com a API

## 🚀 Como Começar

### 1. Clone o repositório
```bash
git clone https://github.com/ManoelaV/AskDocs.git
cd AskDocs
```

### 2. Configure o Backend
```bash
cd askdocs-backend
npm install
cp .env.example .env
# Edite o arquivo .env com suas credenciais
npm run start:dev
```

📖 **Guia completo**: Veja `askdocs-backend/SETUP.md`

### 3. Teste a API
```bash
# Em outro terminal
curl -X POST http://localhost:3000/documents/upload -F "file=@teste.txt"
curl -X POST http://localhost:3000/chat -H "Content-Type: application/json" -d "{\"question\": \"O que é o AskDocs?\"}"
```

📖 **Guia de teste**: Veja `askdocs-backend/TESTE_RAPIDO.md`

## 📚 Documentação

| Arquivo | Descrição |
|---------|-----------|
| `askdocs-backend/README.md` | Documentação técnica do backend |
| `askdocs-backend/SETUP.md` | Guia de configuração passo a passo |
| `askdocs-backend/TESTE_RAPIDO.md` | Guia de teste rápido |
| `askdocs-backend/COMECAR_AQUI.md` | Ponto de partida |

## 🎯 Funcionalidades

- ✅ Upload de documentos (PDF/TXT)
- ✅ Extração automática de texto
- ✅ Busca semântica inteligente
- ✅ Respostas baseadas no contexto do documento
- ✅ Integração com n8n (automação)

## 🛠️ Tecnologias

- **Backend**: NestJS, TypeScript
- **IA**: OpenAI GPT-3.5, text-embedding-3-small
- **Vetorial**: Pinecone
- **Frontend**: React (em desenvolvimento)
- **Automação**: n8n (em desenvolvimento)

## 📝 Próximos Passos

- [ ] Frontend React com chat interface
- [ ] Histórico de conversas (SQLite)
- [ ] Autenticação JWT
- [ ] Integração com n8n para ingestão automática
- [ ] Deploy em produção

## 🐛 Troubleshooting

### Erro ao conectar no Pinecone
- Verifique se a API key está correta no `.env`
- Confira se o índice `askdocs` existe no Pinecone

### Erro ao gerar embeddings
- Verifique se a API key da OpenAI está correta
- Confira se você tem créditos na conta OpenAI

## 📄 Licença

Este projeto está sob a licença UNLICENSED.

## 👨‍💻 Autor

Desenvolvido como projeto de estudo de RAG e busca semântica.

---

**Status**: Em desenvolvimento (Dias 1-3 concluídos) 🚧