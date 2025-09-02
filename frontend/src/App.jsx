import { useState } from 'react'
import './App.css'
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
              background: 'var(--kiosk-gradient-dark)',
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
                  <div className="mb-10">
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
                      <span style={{ color: 'white' }}>Blindagem para celulares com resultados reais.</span>
                      <br /><br />
                      Uma boa oportunidade de renda. <br />com investimento baixo.
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
                  <div className="mb-10">
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
                  <div className="mb-10">
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
                      3 aplicações/dia.<br /> Ticket R$ 150–550. 
                      <br /><br />
                      <span style={{ marginTop: '10px', color: 'var(--kiosk-accent)' }}>
                      Produto técnico + mentoria. 
                      </span>
                    </h2>
                    
                    <p style={{
                      fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                      color: 'rgba(255, 255, 255, 0.9)',
                      lineHeight: '1.6',
                      maxWidth: '600px',
                      margin: '0 auto 32px'
                    }}>
                      Vagas limitadas por cidade. 
                      Junte-se à primeira rede de blindagem com padrão técnico no Brasil. 
                    </p>
                  </div>

                  {/* 🚀 CTA Principal */}
                  <div className="mb-10">
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
                      Conhecer a tecnologia
                    </button>
                  </div>

                  {/* ✅ Garantias Premium */}
                  <div className="mb-10">

                    <div className="ios-grid-2">
                      {[
                        { icon: '⧖', title: 'Total Aplicações', value: '100', desc: 'Por frasco garantido', status: 'success' },
                        { icon: '◵', title: 'Tempo Secagem', value: '30min', desc: 'Muito mais rápido', status: 'warning' }
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
                    <div className="mb-10">
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
                        width: '150px',
                        height: '150px',
                        margin: '0 auto 24px',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '30px'
                      }}>
                        <img 
                          src="/images/IRON.png" 
                          alt="IRON FORCE - Blindagem de Celular" 
                          style={{
                            width: '120%',
                            height: '120%',
                            objectFit: 'contain',
                            borderRadius: '30px',
                            boxShadow: 'var(--kiosk-shadow-hover)',
                            transform: 'scale(1.5)',
                            transition: 'transform 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.3)'
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1.2)'
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
                        Nanotecnologia. <br />Até 100 aplicações.<br /> Margem alta.
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
              {/* <style jsx>{`
                @keyframes float {
                  0%, 100% { transform: translateY(0px) rotate(0deg); }
                  50% { transform: translateY(-20px) rotate(180deg); }
                }
              `}</style> */}
            </section>

            {/* 🧪 COMPARATIVO - Design Moderno */}
            <section className="section-light" style={{ background: 'var(--kiosk-dark)', paddingBottom: '120px' }}>
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <h2 className="color-white text-center mb-8">
                    Por que o IRON FORCE é diferente?
                  </h2>

                  {/* 📊 Comparativo */}
                  <div className="ios-compact-card mb-8">
                    <div className="ios-grid-2">
                      <div>
                        <h3 className="ios-text-large mb-4" style={{ color: 'white' }}>CONCORRENTES</h3>
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
                        <h3 className="ios-text-large mb-4" style={{ color: 'var(--kiosk-accent)' }}>IRON FORCE</h3>
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
                  <div className="ios-grid-3 mb-10">
                    <div className="ios-compact-card text-center">
                      <div className="ios-text-medium mb-3" style={{ color: 'var(--kiosk-accent)' }}>1</div>
                      <p className="ios-text-title">Peça seu frasco IRON FORCE</p>
                    </div>
                    <div className="ios-compact-card text-center">
                      <div className="ios-text-medium mb-3" style={{ color: 'var(--kiosk-accent)' }}>2</div>
                      <p className="ios-text-title">Aplique com a técnica oficial</p>
                    </div>
                    <div className="ios-compact-card text-center">
                      <div className="ios-text-medium mb-3" style={{ color: 'var(--kiosk-accent)' }}>3</div>
                      <p className="ios-text-title">Acesse o grupo exclusivo</p>
                    </div>
                    <div className="ios-compact-card text-center">
                      <div className="ios-text-medium mb-3" style={{ color: 'var(--kiosk-accent)' }}>4</div>
                      <p className="ios-text-title">Lucre até R$350 por dia</p>
                    </div>
                  </div>

                  {/* 💬 Testemunho */}
                    <p className="ios-text-medium text-blindaphone-white italic mb-30">
                      "Nunca tinha vendido nada, em 1 semana já recuperei meu investimento e ainda fechei parceria com uma assistência."
                    </p>
                    <p className="ios-text-medium" style={{ color: 'var(--kiosk-accent)' }}>Júnior | aplicador em Goiânia</p>
                </div>
              </div>
            </section>
          </>
        )

      case 'about':
        return (
          <section className="hero bg-blindaphone-black text-blindaphone-white py-20" style={{ background: 'var(--kiosk-dark)', paddingBottom: '120px' }}>
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-12 color-white">
                  QUEM SOMOS
                </h1>

                {/* 🎯 História Inspiradora */}
                <div className="kiosk-card mb-16" style={{
                  border: '2px solid var(--kiosk-accent)',
                  boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
                }}>
                  <h2 className="text-3xl font-bold mb-8 text-blindaphone-yellow" style={{ color: 'var(--kiosk-accent)' }}>
                    A HISTÓRIA POR TRÁS DA REVOLUÇÃO
                  </h2>
                  
                  <div className="text-center mb-8">
                    <div style={{
                      width: '120px',
                      height: '120px',
                      margin: '0 auto 20px',
                      background: 'var(--kiosk-gradient-primary)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '48px',
                      color: 'white',
                      boxShadow: 'var(--kiosk-neon)'
                    }}>
                      👨‍💼
                    </div>
                    <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--kiosk-secondary)' }}>
                      OLIVER - O VISIONÁRIO
                    </h3>
                    <p className="text-lg text-blindaphone-white mb-4" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      Fundador e CEO do BLINDAPHONE
                    </p>
                  </div>

                  <p className="text-xl text-blindaphone-white leading-relaxed mb-8">
                    <strong>Oliver não é apenas mais um empreendedor.</strong> Ele é alguém que <span style={{ color: 'var(--kiosk-accent)' }}>sentiu na pele</span> a necessidade de transformar o mercado de blindagem de celulares.
                  </p>
                  
                  <p className="text-lg text-blindaphone-white leading-relaxed mb-8">
                    Como muitos de vocês, ele começou do zero. Sem recursos, sem rede de contatos, mas com uma <span style={{ color: 'var(--kiosk-secondary)' }}>determinação inabalável</span> e a certeza de que existia uma forma melhor de fazer as coisas.
                  </p>

                  <div className="ios-compact-card max-w-3xl mx-auto mb-8" style={{
                    background: 'rgba(0, 102, 255, 0.1)',
                    border: '1px solid var(--kiosk-primary)'
                  }}>
                    <p className="text-lg text-blindaphone-white italic mb-4">
                      <span style={{ color: 'var(--kiosk-accent)' }}>"Eu mesmo tive que acreditar todos os dias, mesmo quando ninguém mais acreditava. Sei exatamente como é estar no seu lugar."</span>
                    </p>
                    <p className="text-md" style={{ color: 'var(--kiosk-secondary)' }}>
                      — Oliver, Fundador do BLINDAPHONE
                    </p>
                  </div>

                  <p className="text-lg text-blindaphone-white leading-relaxed">
                    Foi essa <span style={{ color: 'var(--kiosk-accent)' }}>experiência pessoal</span> que o levou a criar não apenas uma empresa, mas uma <span style={{ color: 'var(--kiosk-secondary)' }}>comunidade de sonhadores</span> que, como ele, querem transformar suas vidas através da blindagem.
                  </p>
                </div>

                {/* 🚀 Missão, Visão e Valores */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <div className="kiosk-card text-center">
                    <div className="text-6xl mb-4">⍟</div>
                    <h3 className="text-xl font-bold text-blindaphone-yellow mb-3" style={{ color: 'var(--kiosk-accent)' }}>Missão</h3>
                    <p className="text-blindaphone-white">
                      <strong>Democratizar a blindagem premium</strong> e capacitar aplicadores para o sucesso, criando uma rede de profissionais que <span style={{ color: 'var(--kiosk-secondary)' }}>acreditam no sonho</span> e transformam vidas.
                    </p>
                  </div>
                  <div className="kiosk-card text-center">
                    <div className="text-6xl mb-4">⧉</div>
                    <h3 className="text-xl font-bold text-blindaphone-yellow mb-3" style={{ color: 'var(--kiosk-accent)' }}>Visão</h3>
                    <p className="text-blindaphone-white">
                      Ser a <strong>referência absoluta</strong> em blindagem de celulares no Brasil, construindo a maior <span style={{ color: 'var(--kiosk-secondary)' }}>comunidade de aplicadores</span> do mundo.
                    </p>
                  </div>
                  <div className="kiosk-card text-center">
                    <div className="text-6xl mb-4">⟁</div>
                    <h3 className="text-xl font-bold text-blindaphone-yellow mb-3" style={{ color: 'var(--kiosk-accent)' }}>Valores</h3>
                    <p className="text-blindaphone-white">
                      <strong>Qualidade inquestionável</strong>, inovação constante, suporte incondicional e <span style={{ color: 'var(--kiosk-secondary)' }}>parceria real</span> com nossos aplicadores.
                    </p>
                  </div>
                </div>

                {/* 💪 Por que acreditar */}
                <div className="ios-compact-card max-w-4xl mx-auto" style={{
                  background: 'var(--kiosk-gradient-card)',
                  border: '2px solid var(--kiosk-accent)',
                  boxShadow: 'var(--kiosk-glow)'
                }}>
                  <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--kiosk-accent)' }}>
                    POR QUE VOCÊ DEVE ACREDITAR?
                  </h3>
                  
                  <div className="ios-grid-2 text-left">
                    <div>
                      <h4 className="ios-text-large mb-3" style={{ color: 'var(--kiosk-secondary)' }}>⟠  EU SEI O QUE É:</h4>
                      <ul className="space-y-2">
                        <li className="ios-text-small">• Começar do zero</li>
                        <li className="ios-text-small">• Não ter recursos</li>
                        <li className="ios-text-small">• Precisar acreditar</li>
                        <li className="ios-text-small">• Falhar e recomeçar</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="ios-text-large mb-3" style={{ color: 'var(--kiosk-accent)' }}>⟠ ME DEDICO:</h4>
                      <ul className="space-y-2">
                        <li className="ios-text-small">• Fórmula exclusiva IRON FORCE</li>
                        <li className="ios-text-small">• Comunidade ativa</li>
                        <li className="ios-text-small">• Suporte 24/7</li>
                        <li className="ios-text-small">• Resultados reais</li>
                      </ul>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <p className="ios-text-large text-blindaphone-white mb-4">
                      <strong>Se eu consegui, você também consegue.</strong>
                    </p>
                    <p className="ios-text-medium" style={{ color: 'var(--kiosk-secondary)' }}>
                      Junte-se à comunidade que <span style={{ color: 'var(--kiosk-accent)' }}>acredita no seu potencial</span> e te apoia todos os dias.
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
                  <h2 className="mb-8 color-white">
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
          <section className="py-16" style={{ 
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            paddingBottom: '120px'
          }}>
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                
                {/* Logo BLINDAPHONE */}
                <div className="text-center mb-12" style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%'
                }}>
                  <img 
                    src="/BLINDAPHONE-PRETO.png" 
                    alt="BLINDA PHONE - Logo Oficial" 
                    style={{
                      height: '80px',
                      width: 'auto',
                      maxWidth: '300px',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1)) brightness(0)',
                      transition: 'all 0.3s ease',
                      display: 'block',
                      margin: '0 auto'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.filter = 'drop-shadow(0 6px 20px rgba(0, 0, 0, 0.15)) brightness(0)'
                      e.target.style.transform = 'scale(1.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.filter = 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1)) brightness(0)'
                      e.target.style.transform = 'scale(1)'
                    }}
                  />
                </div>
                
                {/* Header iOS-like */}
                <div className="text-center mb-12">
                  <div style={{
                    width: '30px',
                    height: '30px',
                    margin: '0 auto 20px',
                    background: 'linear-gradient(135deg,rgb(255, 204, 0) 0%,rgb(255, 230, 129) 100%)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '36px',
                    color: 'white',
                    boxShadow: '0 8px 25px rgba(0, 122, 255, 0.3)'
                  }}>
                    📞
                  </div>
                  <h1 className="text-3xl font-bold mb-3" style={{ color: '#1d1d1f' }}>
                    Fale Conosco
                  </h1>
                  <p className="text-lg" style={{ color: '#86868b' }}>
                    Estamos aqui para te ajudar a transformar sua vida
                  </p>
                </div>

                {/* Cards de contato iOS-like */}
                <div className="space-y-6 mb-12">
                  
                  {/* WhatsApp */}
                  <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.08)'
                  }}>
                    <div style={{
                      width: '18px',
                      height: '58px',
                      background: 'rgb(255, 204, 0)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '34px',
                      color: 'white'
                    }}>
                      💬
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1" style={{ color: '#1d1d1f' }}>
                        WhatsApp Oficial
                      </h3>
                      <p className="text-sm" style={{ color: '#86868b' }}>
                        Resposta em até 2 horas
                      </p>
                    </div>
                    <div style={{
                      color: '#007AFF',
                      fontSize: '20px'
                    }}>
                      →
                    </div>
                  </div>

                  {/* Email */}
                  <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.08)'
                  }}>
                    <div style={{
                      width: '18px',
                      height: '58px',
                      background: 'linear-gradient(135deg,rgb(255, 204, 0) 0%,rgb(255, 230, 129) 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '34px',
                      color: 'white'
                    }}>
                      📧
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1" style={{ color: '#1d1d1f' }}>
                        Email
                      </h3>
                      <p className="text-sm" style={{ color: '#86868b' }}>
                        contato@blindaphone.com
                      </p>
                    </div>
                    <div style={{
                      color: '#007AFF ',
                      fontSize: '20px'
                    }}>
                      →
                    </div>
                  </div>

                  {/* Instagram */}
                  <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.08)'
                  }}>
                    <div style={{
                      width: '18px',
                      height: '58px',
                      background: 'linear-gradient(135deg,rgb(255, 204, 0) 0%,rgb(255, 230, 129) 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '44px',
                      color: 'white'
                    }}>
                      📱
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1" style={{ color: '#1d1d1f' }}>
                        Instagram
                      </h3>
                      <p className="text-sm" style={{ color: '#86868b' }}>
                        @blindaphone_oficial
                      </p>
                    </div>
                    <div style={{
                      color: '#007AFF',
                      fontSize: '20px'
                    }}>
                      →
                    </div>
                  </div>
                </div>

                {/* Informações adicionais */}
                <div style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '24px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  textAlign: 'center'
                }}>
                  <h3 className="font-semibold mb-4" style={{ color: '#1d1d1f' }}>
                    Horário de Atendimento
                  </h3>
                  <div className="ios-grid-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#86868b' }}>Segunda a Sexta</p>
                      <p className="text-lg font-semibold" style={{ color: '#1d1d1f' }}>8h às 18h</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#86868b' }}>Sábados</p>
                      <p className="text-lg font-semibold" style={{ color: '#1d1d1f' }}>9h às 14h</p>
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: '#86868b' }}>
                    <strong>WhatsApp:</strong> Resposta prioritária para aplicadores oficiais
                  </p>
                </div>

                {/* CTA final */}
                <div className="text-center mt-8">
                  <button 
                    className="px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                      boxShadow: '0 8px 25px rgba(0, 122, 255, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)'
                      e.target.style.boxShadow = '0 12px 35px rgba(0, 122, 255, 0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = '0 8px 25px rgba(0, 122, 255, 0.3)'
                    }}>
                  QUERO SER APLICADOR OFICIAL
                </button>
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
    <>
      <div className="iron-force-landing font-primary">
        {/* PWA Components */}
        {/* <PWAInstallBanner /> */}
        <PWAUpdatePrompt />
        {/* PWAStatus removido para não atrapalhar a visualização */}

        {/* Conteúdo principal baseado na aba ativa */}
        {renderContent()}
      </div>

      {/* 🎯 Bottom Tab Bar - SEMPRE FIXO NA TELA */}
      <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </>
  )
}

export default App
