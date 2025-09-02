import React from 'react';
import { usePWA } from '../hooks/usePWA';

const PWAInstallBanner = () => {
  const {
    showInstallBanner,
    isInstalled,
    isIOS,
    isStandalone,
    hasHapticSupport,
    networkStatus,
    installPWA,
    dismissInstallBanner
  } = usePWA();

  if (!showInstallBanner || isInstalled || isStandalone) {
    return null;
  }

  return (
    <div className="pwa-install-banner">
      {/* Efeito de partículas flutuantes */}
      <div className="kiosk-particles">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="kiosk-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Efeito de onda na parte inferior */}
      <div className="kiosk-wave" />

      <div className="pwa-banner-content">
        <div className="pwa-banner-text">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'var(--kiosk-gradient-primary)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              boxShadow: 'var(--kiosk-neon)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <span>🚀</span>
              {/* Efeito de brilho interno */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                animation: 'ledPulse 3s ease-in-out infinite'
              }} />
            </div>
            <div>
              <strong>INSTALAR BLINDA PHONE</strong>
              <div style={{
                fontSize: '12px',
                color: 'var(--kiosk-secondary)',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginTop: '4px'
              }}>
                EXPERIÊNCIA PREMIUM
              </div>
            </div>
          </div>
          
          <span>
            {isIOS 
              ? 'Transforme seu dispositivo em um quiosque Blinda Phone com experiência nativa e funcionalidades avançadas' 
              : 'Instale o app para uma experiência de quiosque premium com funcionalidades offline e notificações'
            }
          </span>
          
          {/* Status da rede com estilo de quiosque */}
          {networkStatus === 'offline' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '12px',
              fontSize: '13px',
              color: 'var(--kiosk-accent)',
              fontWeight: '600',
              padding: '8px 16px',
              background: 'rgba(255, 215, 0, 0.1)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '20px',
              alignSelf: 'flex-start'
            }}>
              <span>⚡</span>
              <span>MODO OFFLINE ATIVO</span>
            </div>
          )}
        </div>
        
        <div className="pwa-banner-actions">
          <button 
            onClick={installPWA}
            className="pwa-install-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              minWidth: '200px',
              justifyContent: 'center'
            }}
          >
            {isIOS ? (
              <>
                <span style={{ fontSize: '18px' }}>📱</span>
                <span>COMO INSTALAR</span>
              </>
            ) : (
              <>
                <span style={{ fontSize: '18px' }}>⬇️</span>
                <span>INSTALAR AGORA</span>
              </>
            )}
          </button>
          
          <button 
            onClick={dismissInstallBanner}
            className="pwa-dismiss-btn"
            style={{ minWidth: '160px' }}
          >
            AGORA NÃO
          </button>
        </div>
      </div>
      
      {/* Indicadores de recursos com estilo de quiosque */}
      <div className="pwa-resource-indicators">
        <div className="pwa-resource-item">
          <span>⚡</span>
          <span>Offline</span>
        </div>
        <div className="pwa-resource-item">
          <span>🔔</span>
          <span>Notificações</span>
        </div>
        {hasHapticSupport && (
          <div className="pwa-resource-item">
            <span>📳</span>
            <span>Haptic</span>
          </div>
        )}
        <div className="pwa-resource-item">
          <span>🚀</span>
          <span>PWA</span>
        </div>
        <div className="pwa-resource-item">
          <span>💎</span>
          <span>Premium</span>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallBanner;
