import { useState } from 'react'
import './App.css'
import PWAUpdatePrompt from './components/PWAUpdatePrompt'
import BottomTabBar from './components/BottomTabBar'
import HomeSection from './components/HomeSection'
import AboutSection from './components/AboutSection'
import ApplySection from './components/ApplySection'
import ProductsSection from './components/ProductsSection'
import ContactSection from './components/ContactSection'

/**
 * Componente principal da aplicação BlindaPhone
 * Gerencia o estado global e renderização das seções
 * 
 * @component
 * @returns {JSX.Element} Aplicação principal
 */
function App() {
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [formData, setFormData] = useState({
    nome: '',
    cidade: '',
    whatsapp: '',
    email: ''
  })

  /**
   * Envia dados do formulário para API Vercel
   * @param {Event} e - Evento do formulário
   * @async
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // TODO: Migrar para API Vercel
      const response = await fetch('/api/aplicador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        alert('Cadastro realizado com sucesso! Entraremos em contato em breve.')
        setFormData({ nome: '', cidade: '', whatsapp: '', email: '' })
        setShowForm(false)
      }
    } catch {
      alert('Erro ao cadastrar. Tente novamente.')
    }
  }

  /**
   * Muda a aba ativa e executa ações específicas
   * @param {string} tabId - ID da aba a ser ativada
   */
  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    
    // Scroll para o topo quando mudar de aba
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Se for a aba de aplicador, mostrar o formulário
    if (tabId === 'apply') {
      setShowForm(true)
    }
  }

  /**
   * Renderiza o conteúdo baseado na aba ativa
   * @returns {JSX.Element} Componente da seção ativa
   */
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeSection />
      case 'about':
        return <AboutSection />
      case 'apply':
        return (
          <ApplySection 
            showForm={showForm}
            setShowForm={setShowForm}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
          />
        )
      case 'products':
        return <ProductsSection />
      case 'contact':
        return <ContactSection />
      default:
        return <HomeSection />
    }
  }

  return (
    <div className="ios-app">
      {/* PWA Update Prompt */}
      <PWAUpdatePrompt />
      
      {/* Conteúdo Principal */}
      <main className="ios-main">
        {renderContent()}
      </main>
      
      {/* Bottom Tab Bar */}
      <BottomTabBar 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
    </div>
  )
}

export default App
