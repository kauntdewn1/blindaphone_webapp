import React, { useState, useEffect } from 'react';

const PWAUpdatePrompt = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [registration, setRegistration] = useState(null);
  const [updateProgress, setUpdateProgress] = useState(0);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        setRegistration(reg);
        
        // Verificar se há atualizações
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setShowUpdatePrompt(true);
            }
          });
          
          // Monitorar progresso da instalação
          newWorker.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'INSTALL_PROGRESS') {
              setUpdateProgress(event.data.progress);
            }
          });
        });
      });
    }
  }, []);

  const handleUpdate = async () => {
    if (registration && registration.waiting) {
      try {
        // Mostrar progresso
        setUpdateProgress(0);
        
        // Simular progresso
        const progressInterval = setInterval(() => {
          setUpdateProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 100);
        
        // Enviar mensagem para o service worker para atualizar
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        
        // Aguardar um pouco para mostrar o progresso
        setTimeout(() => {
          setUpdateProgress(100);
          setTimeout(() => {
            // Recarregar a página após a atualização
            window.location.reload();
          }, 500);
        }, 1000);
        
      } catch (error) {
        console.error('Erro ao atualizar:', error);
        setUpdateProgress(0);
      }
    }
  };

  const dismissUpdate = () => {
    setShowUpdatePrompt(false);
  };

  if (!showUpdatePrompt) {
    return null;
  }

  return (
    <div className="kiosk-modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="kiosk-modal">
        {/* Efeito de partículas */}
        <div className="kiosk-particles">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="kiosk-particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Ícone de atualização com efeito LED */}
        <div style={{
          width: '80px',
          height: '80px',
          background: 'var(--kiosk-gradient-primary)',
          borderRadius: '50%',
          margin: '0 auto 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          color: 'white',
          boxShadow: 'var(--kiosk-neon)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <span>🔄</span>
          {/* Efeito de rotação */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: '3px solid transparent',
            borderTop: '3px solid rgba(255, 255, 255, 0.6)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        </div>

        <h3 style={{
          margin: '0 0 12px 0',
          color: '#FFFFFF',
          fontSize: '24px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          textShadow: '0 0 20px rgba(0, 102, 255, 0.5)'
        }}>
          NOVA VERSÃO DISPONÍVEL!
        </h3>
        
        <p style={{
          margin: '0 0 32px 0',
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '16px',
          lineHeight: '1.6',
          maxWidth: '400px'
        }}>
          Uma nova versão do Blinda Phone está disponível com melhorias de quiosque e funcionalidades avançadas.
        </p>
        
        {/* Barra de progresso com estilo de quiosque */}
        {updateProgress > 0 && (
          <div style={{
            marginBottom: '32px',
            padding: '20px',
            background: 'rgba(0, 102, 255, 0.1)',
            borderRadius: '16px',
            border: '1px solid rgba(0, 102, 255, 0.3)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px',
              fontSize: '14px',
              color: 'var(--kiosk-secondary)',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              <span>🔄 ATUALIZANDO...</span>
              <span>{updateProgress}%</span>
            </div>
            <div style={{
              height: '8px',
              background: 'rgba(0, 102, 255, 0.2)',
              borderRadius: '4px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div 
                style={{
                  height: '100%',
                  background: 'var(--kiosk-gradient-primary)',
                  borderRadius: '4px',
                  width: `${updateProgress}%`,
                  transition: 'width 0.3s ease',
                  boxShadow: 'var(--kiosk-glow)'
                }}
              />
              {/* Efeito de brilho na barra */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                animation: 'ledPulse 2s ease-in-out infinite'
              }} />
            </div>
          </div>
        )}
        
        {/* Botões de ação com estilo de quiosque */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            onClick={handleUpdate}
            className="kiosk-button"
            style={{ flex: 1, minHeight: '56px' }}
            disabled={updateProgress > 0}
          >
            {updateProgress > 0 ? '🔄 ATUALIZANDO...' : '🚀 ATUALIZAR AGORA'}
          </button>
          
          {updateProgress === 0 && (
            <button
              onClick={dismissUpdate}
              className="pwa-dismiss-btn"
              style={{ flex: 1, minHeight: '56px' }}
            >
              DEPOIS
            </button>
          )}
        </div>
        
        {/* Informações adicionais com estilo de quiosque */}
        <div style={{
          marginTop: '24px',
          padding: '20px',
          background: 'rgba(0, 102, 255, 0.1)',
          borderRadius: '16px',
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.8)',
          lineHeight: '1.5',
          border: '1px solid rgba(0, 102, 255, 0.2)'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            marginBottom: '12px',
            color: 'var(--kiosk-accent)',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            <span>💡</span>
            <span>DICA PREMIUM:</span>
          </div>
          <p style={{ margin: 0, fontSize: '13px' }}>
            A atualização é rápida e mantém todos os seus dados. Recomendamos atualizar agora para a melhor experiência de quiosque.
          </p>
        </div>
      </div>

      {/* CSS para animação de rotação */}
      {/* <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style> */}
    </div>
  );
};

export default PWAUpdatePrompt;
