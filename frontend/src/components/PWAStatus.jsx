import React, { useState } from 'react';
import { usePWA } from '../hooks/usePWA';

const PWAStatus = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    isInstalled,
    isIOS,
    isStandalone,
    hasHapticSupport,
    networkStatus,
    checkForUpdates,
    syncOfflineData,
    requestNotificationPermission,
    triggerHaptic
  } = usePWA();

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    triggerHaptic('light');
  };

  const handleUpdateCheck = async () => {
    await checkForUpdates();
  };

  const handleSync = async () => {
    await syncOfflineData();
  };

  const handleNotificationPermission = async () => {
    await requestNotificationPermission();
  };

  return (
    <div className="kiosk-card" style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      zIndex: 1000,
      maxWidth: '320px',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      background: 'var(--kiosk-gradient-card)',
      border: '2px solid var(--kiosk-border)',
      boxShadow: 'var(--kiosk-glow)'
    }}>
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

      {/* Header com estilo de quiosque */}
      <div 
        onClick={toggleExpanded}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          padding: '8px 0'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: isInstalled ? 'var(--kiosk-accent)' : 'var(--kiosk-gradient-primary)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '16px',
            boxShadow: isInstalled ? '0 0 15px rgba(255, 215, 0, 0.6)' : 'var(--kiosk-glow)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {isInstalled ? '✅' : '📱'}
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
            <span style={{ 
              fontWeight: '700', 
              fontSize: '16px',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              PWA STATUS
            </span>
            <div style={{
              fontSize: '10px',
              color: 'var(--kiosk-secondary)',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginTop: '2px'
            }}>
              QUISQUE PREMIUM
            </div>
          </div>
        </div>
        
        <div style={{
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          fontSize: '18px',
          color: 'var(--kiosk-secondary)',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 212, 255, 0.1)',
          borderRadius: '50%',
          border: '1px solid rgba(0, 212, 255, 0.3)'
        }}>
          ▼
        </div>
      </div>

      {/* Status básico com estilo de quiosque */}
      <div style={{
        marginTop: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        fontSize: '13px',
        color: 'rgba(255, 255, 255, 0.8)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          padding: '8px 12px',
          background: 'rgba(0, 102, 255, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(0, 102, 255, 0.2)'
        }}>
          <span>Instalado:</span>
          <span style={{ 
            color: isInstalled ? 'var(--kiosk-accent)' : 'var(--kiosk-secondary)',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {isInstalled ? 'SIM' : 'NÃO'}
          </span>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          padding: '8px 12px',
          background: 'rgba(0, 102, 255, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(0, 102, 255, 0.2)'
        }}>
          <span>Modo:</span>
          <span style={{ 
            color: isStandalone ? 'var(--kiosk-accent)' : 'rgba(255, 255, 255, 0.7)',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {isStandalone ? 'STANDALONE' : 'BROWSER'}
          </span>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          padding: '8px 12px',
          background: 'rgba(0, 102, 255, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(0, 102, 255, 0.2)'
        }}>
          <span>Rede:</span>
          <span style={{ 
            color: networkStatus === 'online' ? 'var(--kiosk-accent)' : 'var(--kiosk-secondary)',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {networkStatus === 'online' ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          padding: '8px 12px',
          background: 'rgba(0, 102, 255, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(0, 102, 255, 0.2)'
        }}>
          <span>Haptic:</span>
          <span style={{ 
            color: hasHapticSupport ? 'var(--kiosk-accent)' : 'rgba(255, 255, 255, 0.7)',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {hasHapticSupport ? 'SIM' : 'NÃO'}
          </span>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          padding: '8px 12px',
          background: 'rgba(0, 102, 255, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(0, 102, 255, 0.2)'
        }}>
          <span>Plataforma:</span>
          <span style={{ 
            fontWeight: '700',
            color: 'var(--kiosk-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {isIOS ? 'iOS' : 'ANDROID/WEB'}
          </span>
        </div>
      </div>

      {/* Controles expandidos com estilo de quiosque */}
      {isExpanded && (
        <div style={{
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '2px solid var(--kiosk-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <button
            onClick={handleUpdateCheck}
            className="kiosk-button"
            style={{ 
              fontSize: '12px', 
              padding: '12px 20px',
              minHeight: '48px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            🔄 VERIFICAR ATUALIZAÇÕES
          </button>
          
          <button
            onClick={handleSync}
            className="kiosk-button"
            style={{ 
              fontSize: '12px', 
              padding: '12px 20px',
              minHeight: '48px',
              background: 'var(--kiosk-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            🔄 SINCRONIZAR OFFLINE
          </button>
          
          <button
            onClick={handleNotificationPermission}
            className="kiosk-button"
            style={{ 
              fontSize: '12px', 
              padding: '12px 20px',
              minHeight: '48px',
              background: 'var(--kiosk-accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            🔔 NOTIFICAÇÕES
          </button>
          
          {/* Informações técnicas com estilo de quiosque */}
          <div style={{
            padding: '16px',
            background: 'rgba(0, 102, 255, 0.1)',
            borderRadius: '12px',
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: '1.4',
            border: '1px solid rgba(0, 102, 255, 0.2)'
          }}>
            <div style={{ 
              fontWeight: '700', 
              marginBottom: '8px',
              color: 'var(--kiosk-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontSize: '12px'
            }}>
              🔧 INFO TÉCNICA:
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              fontSize: '10px'
            }}>
              <div style={{
                padding: '4px 8px',
                background: 'rgba(0, 102, 255, 0.2)',
                borderRadius: '6px',
                border: '1px solid rgba(0, 102, 255, 0.3)'
              }}>
                Service Worker: {('serviceWorker' in navigator) ? '✅' : '❌'}
              </div>
              <div style={{
                padding: '4px 8px',
                background: 'rgba(0, 102, 255, 0.2)',
                borderRadius: '6px',
                border: '1px solid rgba(0, 102, 255, 0.3)'
              }}>
                Cache API: {('caches' in window) ? '✅' : '❌'}
              </div>
              <div style={{
                padding: '4px 8px',
                background: 'rgba(0, 102, 255, 0.2)',
                borderRadius: '6px',
                border: '1px solid rgba(0, 102, 255, 0.3)'
              }}>
                Push API: {('PushManager' in window) ? '✅' : '❌'}
              </div>
              <div style={{
                padding: '4px 8px',
                background: 'rgba(0, 102, 255, 0.2)',
                borderRadius: '6px',
                border: '1px solid rgba(0, 102, 255, 0.3)'
              }}>
                Sync API: {('sync' in window.ServiceWorkerRegistration?.prototype) ? '✅' : '❌'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PWAStatus;
