# 🎯 BLINDA PHONE – Branding & Design Guide

> _"Blindamos celulares, mas quem aplica o Iron Force blinda o próprio futuro."_

---

## 🪓 IDENTIDADE PRINCIPAL

- **Nome da marca:** BLINDA PHONE
- **Produtos:**  
  - **IRON FORCE** – blindagem base  
  - **OVERCOAT** – finalizador protetor
- **Tom de voz:** confiante, direto, de rua com base técnica
- **Público:** aplicadores, revendedores, técnicos, jovens buscando renda extra

---

## 🎨 PALETA DE CORES

| Cor | Código | Uso |
|-----|--------|-----|
| Marinho | `#001b42` | Fundo principal, contraste |
| Cinza Chumbo | `#1F1F1F` | Blocos, seções secundárias |
| Amarelo Blindado | `#FFD400` | Destaques, botões, CTA |
| Branco Técnico | `#F5F5F5` | Textos sobre fundo escuro |
| Azul Noturno | `#141C2A` | Base para OVERCOAT |

> Usar **cores sólidas e contrastantes**, evitar gradientes ou sombras suaves. Brutalismo visual e clareza são prioridade.

---

## 🖋️ TIPOGRAFIA

- **Fonte Primária:** `Montserrat` ou `Urbanist` (Google Fonts)  
- **Fonte Alternativa:** `Chivo Mono` para códigos / destaque técnico  
- **Estilo:**  
  - Títulos: Bold / Uppercase  
  - Textos: Medium ou Regular  
  - CTA: uppercase + negrito

---

## 🧩 COMPONENTES UI

### BOTÕES

```html
<!-- CTA Principal -->
<button class="bg-[#FFD400] text-black font-bold px-6 py-3 rounded-md shadow hover:bg-yellow-400 transition">QUERO SER APLICADOR OFICIAL</button>

<!-- CTA Secundário -->
<button class="bg-[#1F1F1F] text-[#F5F5F5] font-bold px-6 py-3 rounded-md border-2 border-[#FFD400] hover:bg-[#FFD400] hover:text-black transition">ENTRAR NA LISTA</button>

<!-- Botão de Ação -->
<button class="bg-[#0D0D0D] text-[#FFD400] font-bold px-4 py-2 rounded-md border border-[#FFD400] hover:bg-[#FFD400] hover:text-black transition">COMPRAR KIT</button>
```

### CARDS E SEÇÕES

```html
<!-- Card Principal -->
<div class="bg-[#1F1F1F] border-l-4 border-[#FFD400] p-6 rounded-md shadow-lg">
  <h3 class="text-[#FFD400] font-bold text-xl mb-3">TÍTULO DO CARD</h3>
  <p class="text-[#F5F5F5]">Conteúdo do card com texto técnico e direto.</p>
</div>

<!-- Seção de Destaque -->
<section class="bg-[#0D0D0D] border-t-4 border-[#FFD400] py-12">
  <div class="container mx-auto px-4">
    <h2 class="text-[#FFD400] text-3xl font-bold text-center mb-8">SEÇÃO DE DESTAQUE</h2>
  </div>
</section>
```

### FORMULÁRIOS

```html
<!-- Input de Formulário -->
<input 
  type="text" 
  class="w-full bg-[#1F1F1F] border-2 border-[#FFD400] text-[#F5F5F5] px-4 py-3 rounded-md focus:outline-none focus:border-[#FFD400] focus:ring-2 focus:ring-[#FFD400] focus:ring-opacity-50"
  placeholder="Digite seu nome"
/>

<!-- Label de Formulário -->
<label class="block text-[#FFD400] font-bold text-sm mb-2 uppercase tracking-wide">
  NOME COMPLETO
</label>
```

---

## 🎭 ELEMENTOS VISUAIS

### ÍCONES E SÍMBOLOS

- **Escudo Blindado** – símbolo principal da marca
- **Chave Inglesa** – representando técnica e profissionalismo
- **Círculo com Check** – garantia e confiabilidade
- **Setas Direcionais** – movimento e progresso

### PATRÕES E TEXTURAS

- **Linhas Retas** – simplicidade e precisão
- **Bordas Angulares** – modernidade e tecnologia
- **Contraste Alto** – legibilidade e impacto
- **Espaçamento Generoso** – respiração visual

---

## 📱 RESPONSIVIDADE

### BREAKPOINTS

```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### COMPORTAMENTO MOBILE

- **Botões grandes** – mínimo 44px de altura
- **Texto legível** – mínimo 16px para body
- **Espaçamento adequado** – mínimo 16px entre elementos
- **Touch-friendly** – área de toque mínima

---

## 🚫 O QUE NÃO FAZER

- ❌ **Gradientes suaves** ou sombras complexas
- ❌ **Fontes decorativas** ou muito estilizadas
- ❌ **Cores pastéis** ou tons intermediários
- ❌ **Animações excessivas** ou distrativas
- ❌ **Layouts assimétricos** ou desbalanceados
- ❌ **Textos longos** sem quebras visuais

---

## ✅ O QUE SEMPRE FAZER

- ✅ **Contraste alto** para legibilidade
- ✅ **Hierarquia visual** clara e consistente
- ✅ **Espaçamento uniforme** entre elementos
- ✅ **Cores da marca** em destaque
- ✅ **Tipografia legível** e acessível
- ✅ **Layout limpo** e organizado

---

## 🎯 APLICAÇÕES ESPECÍFICAS

### LANDING PAGE IRON FORCE

- **Hero Section:** Fundo preto com amarelo em destaque
- **Comparativo:** Tabela com bordas amarelas
- **CTA:** Botões amarelos com texto preto
- **Formulário:** Inputs escuros com bordas amarelas

### ADMIN PANEL

- **Header:** Fundo preto com logo amarelo
- **Sidebar:** Fundo cinza chumbo
- **Tabelas:** Bordas amarelas e texto branco
- **Botões:** Amarelo para ações principais

---

## 🔧 IMPLEMENTAÇÃO TÉCNICA

### TAILWIND CSS

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'blindaphone': {
          'black': '#0D0D0D',
          'gray': '#1F1F1F',
          'yellow': '#FFD400',
          'white': '#F5F5F5',
          'blue': '#141C2A'
        }
      },
      fontFamily: {
        'primary': ['Montserrat', 'sans-serif'],
        'mono': ['Chivo Mono', 'monospace']
      }
    }
  }
}
```

### CSS CUSTOMIZADO

```css
/* Variáveis CSS */
:root {
  --blindaphone-black: #0D0D0D;
  --blindaphone-gray: #1F1F1F;
  --blindaphone-yellow: #FFD400;
  --blindaphone-white: #F5F5F5;
  --blindaphone-blue: #141C2A;
}

/* Classes utilitárias */
.btn-primary {
  background-color: var(--blindaphone-yellow);
  color: var(--blindaphone-black);
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #E6BF00;
  transform: translateY(-2px);
}
```

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

- [ ] **Cores da marca** aplicadas consistentemente
- [ ] **Tipografia** configurada e carregada
- [ ] **Componentes UI** padronizados
- [ ] **Responsividade** testada em todos os breakpoints
- [ ] **Contraste** verificado para acessibilidade
- [ ] **Performance** otimizada para carregamento
- [ ] **SEO** implementado com meta tags corretas
- [ ] **Analytics** configurado para tracking

---

## 🎨 INSPIRAÇÕES E REFERÊNCIAS

- **Estilo:** Brutalismo digital, minimalismo técnico
- **Referências:** Apple (simplicidade), Tesla (tecnologia), Nike (confiança)
- **Mood:** Profissional, confiável, inovador, direto
- **Sensação:** Segurança, tecnologia, oportunidade, crescimento

---

*Este guia deve ser seguido em todas as implementações visuais do BLINDA PHONE para manter consistência e fortalecer a identidade da marca.*
