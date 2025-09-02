# BlindAphone WebApp

Aplicação web completa para gerenciamento de aplicadores de testes de visão.

## 📁 Estrutura do Projeto

```
blindaphone_webapp/
├── frontend/             # React + Tailwind app
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── index.html
│   └── package.json
│
├── functions/            # Firebase Cloud Functions com Express.js
│   ├── index.js
│   ├── package.json
│   └── .eslintrc.js
│
├── admin/                # HTML + JS puro com Firebase Auth
│   ├── index.html
│   ├── login.html
│   ├── app.js
│   └── style.css
│
├── firebase.json
├── .firebaserc
└── README.md
```

## 🚀 Tecnologias Utilizadas

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Firebase Cloud Functions + Express.js
- **Banco de Dados**: Firestore
- **Autenticação**: Firebase Auth
- **Deploy**: Firebase Hosting

## 📋 Funcionalidades

- Cadastro de aplicadores
- Busca por cidade
- Painel administrativo
- Autenticação segura

## 🔧 Instalação e Configuração

### 1. Frontend
```bash
cd frontend
npm install
npm run dev
```

### 2. Functions
```bash
cd functions
npm install
firebase deploy --only functions
```

### 3. Admin
```bash
cd admin
# Abrir login.html no navegador
```

## 📝 Licença

MIT License 