#!/bin/bash

# BLINDAPHONE V2.0 - Script de Instalação
echo "🚀 Instalando BLINDAPHONE V2.0..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale Node.js 18+ primeiro."
    exit 1
fi

# Verificar versão do Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js versão 18+ é necessária. Versão atual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) encontrado"

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependências instaladas com sucesso"
else
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

# Copiar arquivo de ambiente
if [ ! -f .env.local ]; then
    echo "📝 Criando arquivo de configuração..."
    cp .env.example .env.local
    echo "✅ Arquivo .env.local criado"
    echo "⚠️  Configure as variáveis no arquivo .env.local antes de executar"
else
    echo "✅ Arquivo .env.local já existe"
fi

# Verificar se as imagens existem
if [ ! -d "public/assets/images" ]; then
    echo "📁 Criando diretório de imagens..."
    mkdir -p public/assets/images
    echo "✅ Diretório de imagens criado"
fi

echo ""
echo "🎉 Instalação concluída!"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure as variáveis no arquivo .env.local"
echo "2. Execute: npm run dev"
echo "3. Acesse: http://localhost:3000"
echo ""
echo "📚 Documentação completa: README.md"
echo "🆘 Suporte: dev@blindaphone.com"
echo ""
echo "🚀 BLINDAPHONE V2.0 - Landing Page Profissional!"
