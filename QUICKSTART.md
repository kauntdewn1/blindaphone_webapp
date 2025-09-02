# 🚀 BlindAphone - Guia de Início Rápido

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Firebase CLI (`npm install -g firebase-tools`)

## ⚡ Configuração Rápida

### 1. Clone e instale
```bash
git clone <seu-repositorio>
cd blindaphone_webapp
make setup
```

### 2. Configure Firebase
```bash
make firebase-login
make firebase-init
```

### 3. Configure variáveis
```bash
cp env.example .env
# Edite o arquivo .env com suas configurações
```

### 4. Desenvolvimento
```bash
make dev          # Frontend + Functions
make dev-frontend # Apenas frontend
make dev-functions # Apenas functions
```

### 5. Deploy
```bash
make deploy       # Deploy completo
make deploy-hosting # Apenas hosting
make deploy-functions # Apenas functions
```

## 📁 Estrutura do Projeto

```
blindaphone_webapp/
├── frontend/          # React + Vite + Tailwind
├── functions/         # Firebase Cloud Functions
├── admin/            # Painel administrativo (HTML + JS)
├── public/           # Arquivos estáticos
├── Makefile          # Automação de tarefas
├── env.example       # Variáveis de ambiente
└── firebase.json     # Configuração Firebase
```

## 🔧 Comandos Úteis

```bash
make help           # Mostra todos os comandos
make status         # Status do projeto
make clean          # Limpeza básica
make clean-all      # Limpeza completa
make reset          # Reset completo
```

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Admin**: http://localhost:3000/admin
- **Functions**: http://localhost:5001
- **Emuladores**: http://localhost:4000

## 🔐 Configuração Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com)
2. Ative Firestore Database
3. Ative Authentication
4. Configure as regras de segurança
5. Atualize as configurações no `.env`

## 📝 Próximos Passos

1. Configure as variáveis no `.env`
2. Teste localmente com `make dev`
3. Faça deploy com `make deploy`
4. Configure domínio personalizado (opcional)

## 🆘 Suporte

- 📖 [Documentação Firebase](https://firebase.google.com/docs)
- 🐛 [Issues](https://github.com/seu-usuario/blindaphone/issues)
- 💬 [Discord/Slack](link-para-comunidade) 