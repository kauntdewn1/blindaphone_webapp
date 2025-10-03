import React, { memo } from 'react';

const PWAStatusCard = memo(({ 
  isInstalled, 
  isIOS, 
  isStandalone, 
  hasHapticSupport, 
  networkStatus,
  isExpanded,
  onToggleExpanded 
}) => {
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
              position: 'absolute',
              width: '4px',
              height: '4px',
              background: 'var(--kiosk-accent)',
              borderRadius: '50%',
              animation: `kioskFloat ${2 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
              opacity: 0.6
            }}
          />
        ))}
      </div>

      {/* Header do card */}
      <div 
        className="kiosk-card-header"
        onClick={onToggleExpanded}
        style={{
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--kiosk-gradient-header)',
          borderRadius: '12px 12px 0 0',
          borderBottom: '1px solid var(--kiosk-border)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="kiosk-icon" style={{
            width: '32px',
            height: '32px',
            background: 'var(--kiosk-gradient-icon)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px'
          }}>
            📱
          </div>
          <div>
            <h3 style={{ 
              margin: 0, 
              fontSize: '14px', 
              fontWeight: '600',
              color: 'var(--kiosk-text-primary)'
            }}>
              PWA Status
            </h3>
            <p style={{ 
              margin: 0, 
              fontSize: '12px', 
              color: 'var(--kiosk-text-secondary)'
            }}>
              {isInstalled ? 'Instalado' : 'Não instalado'}
            </p>
          </div>
        </div>
        
        <div className="kiosk-toggle" style={{
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Status básico */}
      <div style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: isInstalled ? 'var(--kiosk-success)' : 'var(--kiosk-warning)'
          }} />
          <span style={{ fontSize: '12px', color: 'var(--kiosk-text-secondary)' }}>
            {isInstalled ? 'Aplicativo instalado' : 'Aplicativo não instalado'}
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: networkStatus === 'online' ? 'var(--kiosk-success)' : 'var(--kiosk-error)'
          }} />
          <span style={{ fontSize: '12px', color: 'var(--kiosk-text-secondary)' }}>
            {networkStatus === 'online' ? 'Conectado' : 'Offline'}
          </span>
        </div>
      </div>
    </div>
  );
});

PWAStatusCard.displayName = 'PWAStatusCard';

export default PWAStatusCard;
