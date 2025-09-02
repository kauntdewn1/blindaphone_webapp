import { useState } from 'react'
import './App.css'
import PWAInstallBanner from './components/PWAInstallBanner'
import PWAUpdatePrompt from './components/PWAUpdatePrompt'
// import PWAStatus from './components/PWAStatus' // Comentado para não atrapalhar
import BottomTabBar from './components/BottomTabBar'

function App() {
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [formData, setFormData] = useState({
    nome: '',
    cidade: '',
    whatsapp: '',
    email: ''
  })

  // Função para enviar dados do formulário
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('https://us-central1-blindaphoneoficial.cloudfunctions.net/api/aplicador', {
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

  // Função para mudar de aba
  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    
    // Scroll para o topo quando mudar de aba
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Se for a aba de aplicador, mostrar o formulário
    if (tabId === 'apply') {
      setShowForm(true)
    }
  }

  // Renderizar conteúdo baseado na aba ativa
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            {/* 🚀 HERO SECTION - Design Futurista de Quiosque */}
            <section className="hero-section" style={{
              minHeight: '100vh',
              background: 'var(--kiosk-gradient-surface)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Efeito de partículas de fundo */}
              <div className="kiosk-particles" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="kiosk-particle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 10}s`,
                      animationDuration: `${10 + Math.random() * 20}s`
                    }}
                  />
                ))}
              </div>

              {/* Efeito de ondas flutuantes */}
              <div style={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                width: '200px',
                height: '200px',
                background: 'linear-gradient(45deg, rgba(0, 102, 255, 0.1), rgba(0, 212, 255, 0.1))',
                borderRadius: '50%',
                filter: 'blur(40px)',
                animation: 'float 6s ease-in-out infinite'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '20%',
                right: '10%',
                width: '300px',
                height: '300px',
                background: 'linear-gradient(45deg, rgba(255, 215, 0, 0.1), rgba(0, 102, 255, 0.1))',
                borderRadius: '50%',
                filter: 'blur(60px)',
                animation: 'float 8s ease-in-out infinite reverse'
              }} />

              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-7xl mx-auto text-center">
                  
                  {/* 🎯 Logo e Branding */}
                  <div className="mb-16">
                    {/* Logo principal da empresa */}
                    <div style={{
                      margin: '0 auto 24px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <img 
                        src="/BLINDAPHONE-PRETO.png" 
                        alt="BLINDA PHONE - Logo Oficial" 
                        style={{
                          height: '120px',
                          width: 'auto',
                          maxWidth: '400px',
                          objectFit: 'contain',
                          filter: 'drop-shadow(0 0 20px rgba(0, 102, 255, 0.3))',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.filter = 'drop-shadow(0 0 30px rgba(0, 102, 255, 0.6))'
                          e.target.style.transform = 'scale(1.05)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.filter = 'drop-shadow(0 0 20px rgba(0, 102, 255, 0.3))'
                          e.target.style.transform = 'scale(1)'
                        }}
                      />
                    </div>
                    
                    {/* Subtítulo com tagline */}
                    <p style={{
                      fontSize: 'clamp(1rem, 4vw, 1.5rem)',
                      color: 'var(--kiosk-secondary)',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '8px',
                      textAlign: 'center'
                    }}>
                      REVOLUÇÃO NA BLINDAGEM
                    </p>
                    
                    {/* Linha decorativa */}
                    <div style={{
                      width: '100px',
                      height: '3px',
                      background: 'var(--kiosk-gradient-primary)',
                      margin: '0 auto',
                      borderRadius: '2px',
                      boxShadow: 'var(--kiosk-glow)'
                    }} />
                  </div>

                  {/* 🎥 VSL Container Moderno */}
                  <div className="mb-16">
                    <div style={{
                      maxWidth: '600px',
                      margin: '0 auto',
                      background: 'var(--kiosk-gradient-card)',
                      backdropFilter: 'var(--kiosk-backdrop)',
                      borderRadius: '24px',
                      border: '2px solid var(--kiosk-border)',
                      padding: '40px',
                      boxShadow: 'var(--kiosk-shadow-hover)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {/* Borda LED superior */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'var(--kiosk-gradient-primary)',
                        boxShadow: 'var(--kiosk-neon)'
                      }} />
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '24px',
                        marginBottom: '24px'
                      }}>
                        <div style={{
                          width: '80px',
                          height: '80px',
                          background: 'var(--kiosk-gradient-primary)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '32px',
                          color: 'white',
                          boxShadow: 'var(--kiosk-glow)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}>
                          ▶
                        </div>
                        <div className="text-left">
                          <h3 style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: 'white',
                            marginBottom: '8px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                          }}>
                            VSL IRON FORCE
                          </h3>
                          <p style={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '16px'
                          }}>
                            Descubra como transformar seu tempo em dinheiro
                          </p>
                        </div>
                      </div>
                      
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '18px',
                        lineHeight: '1.6',
                        textAlign: 'center'
                      }}>
                        Assista ao vídeo e entenda por que o IRON FORCE é a escolha certa para sua nova jornada como aplicador oficial.
                      </p>
                    </div>
                  </div>

                  {/* 🧠 Headline Principal */}
                  <div className="mb-16">
                    <h2 style={{
                      fontSize: 'clamp(1.5rem, 6vw, 3rem)',
                      fontWeight: '800',
                      color: 'white',
                      lineHeight: '1.2',
                      marginBottom: '24px',
                      maxWidth: '800px',
                      margin: '0 auto 24px',
                      textShadow: '0 0 30px rgba(0, 102, 255, 0.5)'
                    }}>
                      Com um frasco você muda o mês.
                      <br />
                      <span style={{ color: 'var(--kiosk-accent)' }}>
                        Com uma aplicação, você muda sua rotina.
                      </span>
                    </h2>
                    
                    <p style={{
                      fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                      color: 'rgba(255, 255, 255, 0.9)',
                      lineHeight: '1.6',
                      maxWidth: '600px',
                      margin: '0 auto 32px'
                    }}>
                      Junte-se à primeira rede de blindagem com padrão técnico no Brasil. 
                      Fórmula exclusiva, 100 aplicações por frasco e suporte completo.
                    </p>
                  </div>

                  {/* 🚀 CTA Principal */}
                  <div className="mb-16">
                    <button 
                      onClick={() => setShowForm(true)}
                      style={{
                        background: 'var(--kiosk-gradient-primary)',
                        color: 'white',
                        border: 'none',
                        padding: '20px 40px',
                        borderRadius: '20px',
                        fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        cursor: 'pointer',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: 'var(--kiosk-glow)',
                        position: 'relative',
                        overflow: 'hidden',
                        minWidth: '300px'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-8px) scale(1.05)'
                        e.target.style.boxShadow = 'var(--kiosk-shadow-hover), var(--kiosk-neon)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0) scale(1)'
                        e.target.style.boxShadow = 'var(--kiosk-glow)'
                      }}
                    >
                      QUERO SER APLICADOR OFICIAL
                    </button>
                  </div>

                  {/* ✅ Garantias Premium */}
                  <div className="mb-16">
                    <h3 className="ios-text-title text-center mb-6">SUAS ESTATÍSTICAS</h3>
                    <div className="ios-grid-2">
                      {[
                        { icon: '📊', title: 'Total Aplicações', value: '100', desc: 'Por frasco garantido', status: 'success' },
                        { icon: '⚡', title: 'Tempo Secagem', value: '30min', desc: 'Muito mais rápido', status: 'info' }
                      ].map((item, index) => (
                        <div key={index} className="ios-compact-card text-center">
                          <div style={{
                            fontSize: '32px',
                            marginBottom: '12px'
                          }}>
                            {item.icon}
                          </div>
                          <h4 className="ios-text-large mb-2">{item.title}</h4>
                          <div className="ios-text-title mb-2">{item.value}</div>
                          <p className="ios-text-small mb-3">{item.desc}</p>
                          <div className={`ios-status-badge ios-status-${item.status}`}>
                            {item.status === 'success' && '✅'}
                            {item.status === 'warning' && '⚠️'}
                            {item.status === 'info' && 'ℹ️'}
                            <span>{item.status === 'success' ? 'GARANTIDO' : item.status === 'warning' ? 'ATENÇÃO' : 'INFO'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 🎯 Produto Principal */}
                  <div className="mb-16">
                    <div style={{
                      background: 'var(--kiosk-gradient-card)',
                      backdropFilter: 'var(--kiosk-backdrop)',
                      borderRadius: '24px',
                      border: '2px solid var(--kiosk-border)',
                      padding: '40px',
                      maxWidth: '600px',
                      margin: '0 auto',
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {/* Borda LED superior */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'var(--kiosk-gradient-primary)',
                        boxShadow: 'var(--kiosk-neon)'
                      }} />
                      
                      <h3 style={{
                        fontSize: '28px',
                        fontWeight: '800',
                        color: 'var(--kiosk-accent)',
                        marginBottom: '24px',
                        textTransform: 'uppercase',
                        letterSpacing: '2px'
                      }}>
                        IRON FORCE
                      </h3>
                      
                      <div style={{
                        width: '200px',
                        height: '200px',
                        margin: '0 auto 24px',
                        position: 'relative'
                      }}>
                        <img 
                          src="/images/IRON.png" 
                          alt="IRON FORCE - Blindagem de Celular" 
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            borderRadius: '16px',
                            boxShadow: 'var(--kiosk-shadow-hover)'
                          }}
                        />
                        {/* Efeito de brilho na imagem */}
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(45deg, transparent, rgba(0, 102, 255, 0.1), transparent)',
                          borderRadius: '16px',
                          animation: 'ledPulse 4s ease-in-out infinite'
                        }} />
                      </div>
                      
                      <p style={{
                        color: 'white',
                        fontSize: '18px',
                        marginBottom: '16px',
                        fontWeight: '600'
                      }}>
                        Fórmula exclusiva de blindagem base
                      </p>
                      
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '16px',
                        flexWrap: 'wrap'
                      }}>
                        <span style={{
                          background: 'rgba(0, 102, 255, 0.2)',
                          color: 'var(--kiosk-secondary)',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: '600',
                          border: '1px solid rgba(0, 102, 255, 0.3)'
                        }}>
                          ⚡ 30 min secagem
                        </span>
                        <span style={{
                          background: 'rgba(255, 215, 0, 0.2)',
                          color: 'var(--kiosk-accent)',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: '600',
                          border: '1px solid rgba(255, 215, 0, 0.3)'
                        }}>
                          💎 100 aplicações
                        </span>
                        <span style={{
                          background: 'rgba(0, 212, 255, 0.2)',
                          color: 'var(--kiosk-secondary)',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: '600',
                          border: '1px solid rgba(0, 212, 255, 0.3)'
                        }}>
                          🛡️ Não escorre
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CSS para animações */}
              <style jsx>{`
                @keyframes float {
                  0%, 100% { transform: translateY(0px) rotate(0deg); }
                  50% { transform: translateY(-20px) rotate(180deg); }
                }
              `}</style>
            </section>

            {/* 🧪 COMPARATIVO - Design Moderno */}
            <section className="section-light" style={{ background: 'var(--kiosk-dark)', paddingBottom: '120px' }}>
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <h2 className="ios-text-title text-center mb-8">
                    Por que o IRON FORCE é diferente?
                  </h2>

                  {/* 📊 Comparativo */}
                  <div className="ios-compact-card mb-8">
                    <div className="ios-grid-2">
                      <div>
                        <h3 className="ios-text-large mb-4" style={{ color: 'var(--kiosk-accent)' }}>CONCORRENTES</h3>
                        <div className="space-y-3">
                          {[
                            { label: 'Tempo de secagem', value: '1h+', status: 'warning' },
                            { label: 'Escorre nos botões?', value: 'Sim', status: 'warning' },
                            { label: 'Precisa proteção extra?', value: 'Sim', status: 'warning' },
                            { label: 'Suporte ao aplicador', value: '❌', status: 'warning' },
                            { label: 'Rendimento', value: '60-80 aplicações', status: 'warning' }
                          ].map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-3 rounded-lg" style={{ background: 'rgba(255, 59, 48, 0.1)' }}>
                              <span className="ios-text-small">{item.label}</span>
                              <span className="ios-text-medium" style={{ color: '#FF3B30' }}>{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="ios-text-large mb-4" style={{ color: 'var(--kiosk-secondary)' }}>IRON FORCE</h3>
                        <div className="space-y-3">
                          {[
                            { label: 'Tempo de secagem', value: '30 minutos', status: 'success' },
                            { label: 'Escorre nos botões?', value: 'Não', status: 'success' },
                            { label: 'Precisa proteção extra?', value: 'Não', status: 'success' },
                            { label: 'Suporte ao aplicador', value: 'Grupo exclusivo WhatsApp', status: 'success' },
                            { label: 'Rendimento', value: '100 aplicações reais', status: 'success' }
                          ].map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-3 rounded-lg" style={{ background: 'rgba(52, 199, 89, 0.1)' }}>
                              <span className="ios-text-small">{item.label}</span>
                              <span className="ios-text-medium" style={{ color: '#34C759' }}>{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ✨ Frase de impacto */}
                  <div className="text-center">
                    <p className="ios-text-large text-blindaphone-white font-medium italic">
                      "Não é só blindagem. É blindagem com ciência, suporte e margem."
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 🧠 3. BLOCO "COMO FUNCIONA O NEGÓCIO?" */}
            <section className="section-dark" style={{ background: 'var(--kiosk-surface)', paddingBottom: '120px' }}>
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto text-center">
                  <h2 className="ios-text-title mb-8">
                    Como funciona o negócio?
                  </h2>

                  {/* Etapas */}
                  <div className="ios-grid-3 mb-8">
                    <div className="ios-compact-card text-center">
                      <div className="ios-text-title mb-3" style={{ color: 'var(--kiosk-accent)' }}>1</div>
                      <p className="ios-text-medium">Compre seu frasco IRON FORCE (R$350)</p>
                    </div>
                    <div className="ios-compact-card text-center">
                      <div className="ios-text-title mb-3" style={{ color: 'var(--kiosk-accent)' }}>2</div>
                      <p className="ios-text-medium">Aplique com a técnica oficial (treinamento incluso)</p>
                    </div>
                    <div className="ios-compact-card text-center">
                      <div className="ios-text-title mb-3" style={{ color: 'var(--kiosk-accent)' }}>3</div>
                      <p className="ios-text-medium">Lucre até R$350 por dia com apenas 3 aplicações</p>
                    </div>
                    <div className="ios-compact-card text-center">
                      <div className="ios-text-title mb-3" style={{ color: 'var(--kiosk-accent)' }}>4</div>
                      <p className="ios-text-medium">Acesse o grupo exclusivo e receba atualizações + estratégias</p>
                    </div>
                  </div>

                  {/* 💬 Testemunho */}
                  <div className="ios-compact-card max-w-2xl mx-auto" style={{
                    border: '1px solid var(--kiosk-secondary)',
                    boxShadow: 'var(--kiosk-neon)'
                  }}>
                    <p className="ios-text-large text-blindaphone-white italic mb-4">
                      "Nunca tinha vendido nada, em 1 semana já recuperei meu investimento e ainda fechei parceria com uma assistência."
                    </p>
                    <p className="ios-text-medium" style={{ color: 'var(--kiosk-accent)' }}>— Amanda, aplicadora em Goiânia</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )

      case 'about':
        return (
          <section className="hero bg-blindaphone-black text-blindaphone-white py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-12 text-blindaphone-yellow">
                  QUEM SOMOS
                </h1>
                
                <div className="kiosk-card mb-12">
                  <h2 className="text-3xl font-bold mb-8 text-blindaphone-yellow">
                    A REVOLUÇÃO DA BLINDAGEM
                  </h2>
                  <p className="text-xl text-blindaphone-white leading-relaxed mb-8">
                    O BLINDA PHONE nasceu da necessidade de transformar o mercado de blindagem de celulares. 
                    Não somos apenas mais uma empresa - somos a primeira rede de blindagem com padrão técnico no Brasil.
                  </p>
                  <p className="text-lg text-blindaphone-white leading-relaxed">
                    Nossa missão é capacitar aplicadores para oferecer um serviço premium, 
                    usando tecnologia de ponta e suporte completo para garantir o sucesso de cada profissional.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <div className="kiosk-card text-center">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-xl font-bold text-blindaphone-yellow mb-3">Missão</h3>
                    <p className="text-blindaphone-white">
                      Democratizar a blindagem premium e capacitar aplicadores para o sucesso
                    </p>
                  </div>
                  <div className="kiosk-card text-center">
                    <div className="text-6xl mb-4">👁️</div>
                    <h3 className="text-xl font-bold text-blindaphone-yellow mb-3">Visão</h3>
                    <p className="text-blindaphone-white">
                      Ser a referência em blindagem de celulares no Brasil e América Latina
                    </p>
                  </div>
                  <div className="kiosk-card text-center">
                    <div className="text-6xl mb-4">💎</div>
                    <h3 className="text-xl font-bold text-blindaphone-yellow mb-3">Valores</h3>
                    <p className="text-blindaphone-white">
                      Qualidade, inovação, suporte e parceria com nossos aplicadores
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )

      case 'apply':
        return (
          <section className="hero bg-blindaphone-black text-blindaphone-white py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-12 text-blindaphone-yellow">
                  QUERO SER APLICADOR
                </h1>
                
                <div className="kiosk-card mb-12">
                  <h2 className="text-3xl font-bold mb-8 text-blindaphone-yellow">
                    TRANSFORME SEU TEMPO EM DINHEIRO
                  </h2>
                  <p className="text-xl text-blindaphone-white leading-relaxed mb-8">
                    Junte-se à rede de aplicadores oficiais BLINDA PHONE e tenha acesso a:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="text-left">
                      <ul className="space-y-3 text-blindaphone-white">
                        <li className="flex items-center">
                          <span className="text-blindaphone-yellow mr-3">✅</span>
                          Fórmula exclusiva IRON FORCE
                        </li>
                        <li className="flex items-center">
                          <span className="text-blindaphone-yellow mr-3">✅</span>
                          Treinamento completo
                        </li>
                        <li className="flex items-center">
                          <span className="text-blindaphone-yellow mr-3">✅</span>
                          Grupo exclusivo WhatsApp
                        </li>
                        <li className="flex items-center">
                          <span className="text-blindaphone-yellow mr-3">✅</span>
                          Suporte técnico 24/7
                        </li>
                      </ul>
                    </div>
                    <div className="text-left">
                      <ul className="space-y-3 text-blindaphone-white">
                        <li className="flex items-center">
                          <span className="text-blindaphone-yellow mr-3">✅</span>
                          Exclusividade por cidade
                        </li>
                        <li className="flex items-center">
                          <span className="text-blindaphone-yellow mr-3">✅</span>
                          Marketing e materiais
                        </li>
                        <li className="flex items-center">
                          <span className="text-blindaphone-yellow mr-3">✅</span>
                          Garantia de 30 dias
                        </li>
                        <li className="flex items-center">
                          <span className="text-blindaphone-yellow mr-3">✅</span>
                          Atualizações constantes
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Formulário de Cadastro */}
                {showForm && (
                  <div className="kiosk-card max-w-md mx-auto">
                    <h3 className="text-2xl font-bold text-blindaphone-yellow mb-6">CADASTRO DE APLICADOR</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-blindaphone-yellow font-bold text-sm mb-2 uppercase tracking-wide">
                          NOME COMPLETO
                        </label>
                        <input 
                          type="text" 
                          required
                          className="kiosk-input w-full"
                          placeholder="Digite seu nome completo"
                          value={formData.nome}
                          onChange={(e) => setFormData({...formData, nome: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-blindaphone-yellow font-bold text-sm mb-2 uppercase tracking-wide">
                          CIDADE
                        </label>
                        <input 
                          type="text" 
                          required
                          className="kiosk-input w-full"
                          placeholder="Sua cidade"
                          value={formData.cidade}
                          onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-blindaphone-yellow font-bold text-sm mb-2 uppercase tracking-wide">
                          WHATSAPP
                        </label>
                        <input 
                          type="tel" 
                          required
                          className="kiosk-input w-full"
                          placeholder="(11) 99999-9999"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-blindaphone-yellow font-bold text-sm mb-2 uppercase tracking-wide">
                          E-MAIL (OPCIONAL)
                        </label>
                        <input 
                          type="email" 
                          className="kiosk-input w-full"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <button type="submit" className="kiosk-button w-full text-lg">
                        QUERO ENTRAR NA LISTA
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </section>
        )

      case 'products':
        return (
          <>
            {/* 📦 5. O QUE VOCÊ RECEBE COM O KIT IRON FORCE? */}
            <section className="section-dark" style={{ background: 'var(--kiosk-surface)', paddingBottom: '120px' }}>
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto text-center">
                  <h2 className="ios-text-title mb-8">
                    O que você recebe com o kit IRON FORCE?
                  </h2>

                  {/* Produtos do Kit */}
                  <div className="ios-grid-2 mb-8">
                    {/* IRON FORCE */}
                    <div className="ios-compact-card text-center">
                      <div className="mb-4">
                        <img
                          src="/images/IRON.png"
                          alt="IRON FORCE - Blindagem Base"
                          className="w-32 h-auto mx-auto rounded-lg shadow-lg"
                          style={{ border: '2px solid var(--kiosk-primary)', boxShadow: 'var(--kiosk-glow)' }}
                        />
                      </div>
                      <h3 className="ios-text-title mb-3">IRON FORCE</h3>
                      <p className="ios-text-medium mb-3">Fórmula exclusiva de blindagem base</p>
                      <ul className="text-left text-blindaphone-white space-y-2 mb-4">
                        <li className="flex items-center">
                          <span className="ios-status-badge ios-status-success mr-2">✔️</span>
                          <span className="ios-text-small">100 aplicações por frasco</span>
                        </li>
                        <li className="flex items-center">
                          <span className="ios-status-badge ios-status-success mr-2">✔️</span>
                          <span className="ios-text-small">Secagem em 30 minutos</span>
                        </li>
                        <li className="flex items-center">
                          <span className="ios-status-badge ios-status-success mr-2">✔️</span>
                          <span className="ios-text-small">Não escorre, não precisa proteção extra</span>
                        </li>
                      </ul>
                      <div className="ios-text-large" style={{ color: 'var(--kiosk-accent)' }}>
                        R$ 350
                      </div>
                    </div>

                    {/* OVERCOAT */}
                    <div className="ios-compact-card text-center">
                      <div className="mb-4">
                        <img
                          src="/images/OVERCOAT.png"
                          alt="OVERCOAT - Camada Finalizadora"
                          className="w-32 h-auto mx-auto rounded-lg shadow-lg"
                          style={{ border: '2px solid var(--kiosk-primary)', boxShadow: 'var(--kiosk-glow)' }}
                        />
                      </div>
                      <h3 className="ios-text-title mb-3">OVERCOAT</h3>
                      <p className="ios-text-medium mb-3">Camada finalizadora protetora</p>
                      <ul className="text-left text-blindaphone-white space-y-2 mb-4">
                        <li className="flex items-center">
                          <span className="ios-status-badge ios-status-success mr-2">✔️</span>
                          <span className="ios-text-small">Proteção adicional</span>
                        </li>
                        <li className="flex items-center">
                          <span className="ios-status-badge ios-status-success mr-2">✔️</span>
                          <span className="ios-text-small">Acabamento profissional</span>
                        </li>
                        <li className="flex items-center">
                          <span className="ios-status-badge ios-status-success mr-2">✔️</span>
                          <span className="ios-text-small">Durabilidade estendida</span>
                        </li>
                      </ul>
                      <div className="ios-text-large" style={{ color: 'var(--kiosk-accent)' }}>
                        R$ 150
                      </div>
                    </div>
                  </div>

                  {/* Preço e Bônus */}
                  <div className="ios-compact-card max-w-2xl mx-auto">
                    <div className="text-center">
                      <p className="ios-text-medium mb-2" style={{ color: 'var(--kiosk-secondary)' }}>TUDO ISSO POR APENAS</p>
                      <p className="ios-text-title mb-3" style={{ color: 'var(--kiosk-accent)' }}>R$450</p>
                      <p className="ios-text-medium mb-4">Com rendimento de 100 aplicações</p>
                      <div className="ios-compact-card p-3" style={{ border: '1px solid var(--kiosk-accent)', boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)' }}>
                        <p className="ios-text-medium font-bold" style={{ color: 'var(--kiosk-accent)' }}>🎁 BÔNUS EXCLUSIVO:</p>
                        <p className="ios-text-small">Desconto especial no OVERCOAT para aplicadores oficiais</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )

      case 'contact':
        return (
          <section className="hero bg-blindaphone-black text-blindaphone-white py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-12 text-blindaphone-yellow">
                  CONTATO
                </h1>
                
                <div className="grid md:grid-cols-2 gap-12 mb-12">
                  <div className="kiosk-card text-center">
                    <div className="text-6xl mb-6">📱</div>
                    <h3 className="text-2xl font-bold text-blindaphone-yellow mb-4">WhatsApp Oficial</h3>
                    <p className="text-blindaphone-white mb-4">
                      Atendimento direto para aplicadores e clientes
                    </p>
                    <a 
                      href="https://wa.me/5511999999999" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="kiosk-button inline-block"
                    >
                      ABRIR WHATSAPP
                    </a>
                  </div>
                  
                  <div className="kiosk-card text-center">
                    <div className="text-6xl mb-6">📧</div>
                    <h3 className="text-2xl font-bold text-blindaphone-yellow mb-4">E-mail</h3>
                    <p className="text-blindaphone-white mb-4">
                      Para parcerias e informações comerciais
                    </p>
                    <a 
                      href="mailto:contato@blindaphone.com" 
                      className="kiosk-button inline-block"
                    >
                      ENVIAR E-MAIL
                    </a>
                  </div>
                </div>

                <div className="kiosk-card">
                  <h3 className="text-2xl font-bold text-blindaphone-yellow mb-6">HORÁRIO DE ATENDIMENTO</h3>
                  <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div>
                      <h4 className="text-xl font-bold text-blindaphone-yellow mb-4">Segunda a Sexta</h4>
                      <p className="text-blindaphone-white">8h às 18h</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-blindaphone-yellow mb-4">Sábados</h4>
                      <p className="text-blindaphone-white">8h às 12h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )

      default:
        return null
    }
  }

  return (
    <div className="iron-force-landing font-primary">
      {/* PWA Components */}
      {/* <PWAInstallBanner /> */}
      <PWAUpdatePrompt />
      {/* PWAStatus removido para não atrapalhar a visualização */}
      
      {/* Conteúdo principal baseado na aba ativa */}
      {renderContent()}
      
      {/* Menu inferior */}
      <BottomTabBar 
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      
      {/* 🚀 CTA FLUTUANTE - Apenas na aba home */}
      {/* {activeTab === 'home' && (
        <div
          className="fixed bottom-32 right-6 z-50"
          style={{
            background: 'var(--kiosk-gradient-primary)',
            borderRadius: '50%',
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--kiosk-neon)',
            transition: 'all 0.4s ease',
            animation: 'pulse 2s infinite ease-in-out'
          }}
          onClick={() => setShowForm(true)}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)'
            e.target.style.boxShadow = 'var(--kiosk-shadow-hover)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)'
            e.target.style.boxShadow = 'var(--kiosk-neon)'
          }}
        >
          <span style={{ fontSize: '32px', color: 'white' }}>📱</span>
        </div>
      )} */}
    </div>
  )
}

export default App
