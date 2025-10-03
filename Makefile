# 🚀 BlindAphone WebApp - Makefile
# Comandos para facilitar o desenvolvimento e deploy

.PHONY: help install dev build deploy clean setup firebase-init clean-all clean-node

# 📋 Comando padrão - mostra ajuda
help:
	@echo "🔧 BlindAphone WebApp - Comandos Disponíveis:"
	@echo ""
	@echo "📦 Instalação:"
	@echo "  make install     - Instala todas as dependências"
	@echo "  make setup       - Configuração inicial do projeto"
	@echo ""
	@echo "🚀 Desenvolvimento:"
	@echo "  make dev         - Inicia servidor de desenvolvimento"
	@echo "  make dev-frontend- Inicia apenas o frontend"
	@echo "  make dev-functions- Inicia apenas as functions"
	@echo ""
	@echo "🏗️  Build:"
	@echo "  make build       - Build do frontend"
	@echo "  make build-all   - Build completo"
	@echo ""
	@echo "🚀 Deploy:"
	@echo "  make deploy      - Deploy via Netlify CLI"
	@echo ""
	@echo "🧹 Limpeza:"
	@echo "  make clean       - Remove arquivos temporários"
	@echo "  make clean-all   - Limpeza completa"
	@echo ""
	@echo "🔥 Firebase:"
	@echo "  make firebase-init- Inicializa projeto Firebase"
	@echo "  make firebase-login- Login no Firebase"
	@echo "  make firebase-emulators- Inicia emuladores"

# 📦 Instalação de dependências
install:
	@echo "📦 Instalando dependências..."
	cd frontend && npm install
	cd functions && npm install
	@echo "✅ Dependências instaladas!"

# 🚀 Configuração inicial
setup: install
	@echo "🚀 Configurando projeto..."
	@if [ ! -f .env ]; then \
		echo "📝 Criando arquivo .env..."; \
		cp env.example .env; \
		echo "⚠️  Configure as variáveis no arquivo .env"; \
	fi
	@echo "✅ Projeto configurado!"

# 🚀 Desenvolvimento
dev:
	@echo "🚀 Iniciando servidor de desenvolvimento..."
	cd frontend && npm run dev

dev-frontend:
	@echo "🚀 Iniciando frontend..."
	cd frontend && npm run dev

dev-functions:
	@echo "🚀 Iniciando Netlify Dev (funções + proxy) ..."
	netlify dev

# 🏗️ Build
build:
	@echo "🏗️  Build do frontend..."
	cd frontend && npm run build
	@echo "✅ Build concluído!"

build-all: build
	@echo "🏗️  Build das functions..."
	cd functions && npm run build
	@echo "✅ Build completo concluído!"

# 🚀 Deploy
deploy: build
	@echo "🚀 Fazendo deploy (Netlify)..."
	netlify deploy --prod
	@echo "✅ Deploy concluído!"

deploy-hosting:
	@echo "ℹ️  Hosting via Netlify — use target deploy"
	@echo "   netlify deploy --prod"

# 🧹 Limpeza

clean:
	@echo "🧹 Limpando arquivos temporários..."
	rm -rf frontend/dist
	rm -rf functions/lib
	rm -rf .firebase
	@echo "✅ Limpeza concluída!"

clean-all: clean
	@echo "🧹 Limpeza completa..."
	rm -rf frontend/node_modules
	rm -rf functions/node_modules
	rm -rf node_modules
	@echo "✅ Limpeza completa concluída!"

# 🔥 Firebase
firebase-init:
	@echo "🔥 Inicializando Firebase..."
	firebase init
	@echo "✅ Firebase inicializado!"

firebase-login:
	@echo "🔥 Login no Firebase..."
	firebase login
	@echo "✅ Login realizado!"

firebase-emulators:
	@echo "🔥 Iniciando emuladores Firebase..."
	firebase emulators:start
	@echo "✅ Emuladores iniciados!"

# 📊 Status do projeto
status:
	@echo "📊 Status do projeto BlindAphone:"
	@echo ""
	@echo "📁 Estrutura:"
	@ls -la
	@echo ""
	@echo "📦 Frontend:"
	@cd frontend && npm list --depth=0 2>/dev/null | head -5 || echo "❌ Frontend não configurado"
	@echo ""
	@echo "🔧 Functions:"
	@cd functions && npm list --depth=0 2>/dev/null | head -5 || echo "❌ Functions não configurado"
	@echo ""
	@echo "🔥 Firebase:"
	@firebase projects:list 2>/dev/null || echo "❌ Firebase não configurado"

# 🧪 Testes
test:
	@echo "🧪 Executando testes..."
	cd frontend && npm test
	@echo "✅ Testes concluídos!"

# 📝 Linting
lint:
	@echo "📝 Executando linting..."
	cd frontend && npm run lint
	cd functions && npm run lint
	@echo "✅ Linting concluído!"

# 🔄 Reset completo
reset: clean-all install
	@echo "🔄 Reset completo realizado!" 

# 🔧 Corrigir Tailwind CSS
fix-tailwind:
	@echo "🔧 Corrigindo configuração do Tailwind CSS..."
	cd frontend && npm uninstall tailwindcss postcss autoprefixer
	cd frontend && npm install -D tailwindcss@^3.3.6 postcss@^8.4.32 autoprefixer@^10.4.16
	@echo "✅ Tailwind CSS corrigido!"

# 🚀 Desenvolvimento com correção
dev-fixed: fix-tailwind dev
	@echo "🚀 Desenvolvimento iniciado com Tailwind corrigido!"

# 🏗️ Build com correção
build-fixed: fix-tailwind build
	@echo "🏗️ Build concluído com Tailwind corrigido!" 
