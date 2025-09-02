import React from 'react';

const BottomTabBar = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'home',
      label: 'Início',
      icon: '🏠',
      description: 'Principal'
    },
    {
      id: 'about',
      label: 'Quem Somos',
      icon: '👥',
      description: 'História'
    },
    {
      id: 'apply',
      label: 'Aplicador',
      icon: '📱',
      description: 'Seja Oficial'
    },
    {
      id: 'products',
      label: 'Produtos',
      icon: '🛡️',
      description: 'IRON FORCE'
    },
    {
      id: 'contact',
      label: 'Contato',
      icon: '📞',
      description: 'Fale Conosco'
    }
  ];

  return (
    <div className="kiosk-bottom-tab-bar">
      {/* Borda LED superior */}
      <div className="tab-bar-led-border" />
      
      {/* Conteúdo do tab bar */}
      <div className="tab-bar-content">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 8px',
              borderRadius: '16px',
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              color: activeTab === tab.id ? 'white' : 'rgba(255, 255, 255, 0.7)',
              minWidth: '80px',
              transition: 'all 0.4s ease'
            }}
          >
            {/* Container do ícone */}
            <div 
              className="tab-icon-container"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: activeTab === tab.id 
                  ? 'var(--kiosk-gradient-primary)' 
                  : 'rgba(0, 102, 255, 0.1)',
                border: `1px solid ${activeTab === tab.id ? 'var(--kiosk-secondary)' : 'rgba(0, 102, 255, 0.2)'}`,
                boxShadow: activeTab === tab.id ? 'var(--kiosk-glow)' : 'none',
                transform: activeTab === tab.id ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.4s ease'
              }}
            >
              <span 
                className="tab-icon"
                style={{
                  fontSize: '24px',
                  zIndex: 2,
                  position: 'relative'
                }}
              >
                {tab.icon}
              </span>
              
              {/* Efeito de brilho quando ativo */}
              {activeTab === tab.id && (
                <div 
                  className="tab-icon-glow"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
                    borderRadius: '12px',
                    animation: 'iconGlow 2s ease-in-out infinite'
                  }}
                />
              )}
            </div>
            
            {/* Label */}
            <span 
              className="tab-label"
              style={{
                fontSize: '12px',
                fontWeight: activeTab === tab.id ? '700' : '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: activeTab === tab.id ? 'var(--kiosk-accent)' : 'inherit',
                textShadow: activeTab === tab.id ? '0 0 10px rgba(255, 215, 0, 0.5)' : 'none'
              }}
            >
              {tab.label}
            </span>
            
            {/* Descrição pequena */}
            <span 
              className="tab-description"
              style={{
                fontSize: '9px',
                color: activeTab === tab.id ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
                lineHeight: 1
              }}
            >
              {tab.description}
            </span>
            
            {/* Indicador de ativo */}
            {activeTab === tab.id && (
              <div 
                className="tab-indicator"
                style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '20px',
                  height: '3px',
                  background: 'var(--kiosk-gradient-primary)',
                  borderRadius: '2px',
                  boxShadow: 'var(--kiosk-neon)',
                  animation: 'indicatorPulse 2s ease-in-out infinite'
                }}
              />
            )}
          </button>
        ))}
      </div>
      
      {/* Efeito de onda na parte inferior */}
      <div 
        className="tab-bar-wave"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '60px',
          background: 'linear-gradient(180deg, transparent, rgba(0, 102, 255, 0.05))',
          clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 50%)',
          animation: 'tabWaveMove 4s ease-in-out infinite'
        }}
      />
      
      {/* CSS inline para as animações */}
      <style jsx>{`
        @keyframes iconGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes indicatorPulse {
          0%, 100% { opacity: 1; transform: translateX(-50%) scaleX(1); }
          50% { opacity: 0.7; transform: translateX(-50%) scaleX(1.2); }
        }
        
        @keyframes tabWaveMove {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-15px); }
        }
      `}</style>
    </div>
  );
};

export default BottomTabBar;
