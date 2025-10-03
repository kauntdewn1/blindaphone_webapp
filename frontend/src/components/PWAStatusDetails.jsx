import React, { memo } from 'react';

const PWAStatusDetails = memo(({ 
  isInstalled, 
  isIOS, 
  isStandalone, 
  hasHapticSupport, 
  networkStatus,
  onUpdateCheck,
  onSync,
  onNotificationPermission
}) => {
  return (
    <div className="kiosk-details" style={{
      padding: '16px',
      background: 'var(--kiosk-gradient-details)',
      borderRadius: '0 0 12px 12px',
      borderTop: '1px solid var(--kiosk-border)'
    }}>
      {/* Informações detalhadas */}
      <div className="kiosk-info-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '16px'
      }}>
        <div className="kiosk-info-item">
          <div style={{ fontSize: '11px', color: 'var(--kiosk-text-secondary)', marginBottom: '4px' }}>
            Plataforma
          </div>
          <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--kiosk-text-primary)' }}>
            {isIOS ? 'iOS' : 'Android/Web'}
          </div>
        </div>
        
        <div className="kiosk-info-item">
          <div style={{ fontSize: '11px', color: 'var(--kiosk-text-secondary)', marginBottom: '4px' }}>
            Modo
          </div>
          <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--kiosk-text-primary)' }}>
            {isStandalone ? 'Standalone' : 'Browser'}
          </div>
        </div>
        
        <div className="kiosk-info-item">
          <div style={{ fontSize: '11px', color: 'var(--kiosk-text-secondary)', marginBottom: '4px' }}>
            Haptic
          </div>
          <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--kiosk-text-primary)' }}>
            {hasHapticSupport ? 'Suportado' : 'Não suportado'}
          </div>
        </div>
        
        <div className="kiosk-info-item">
          <div style={{ fontSize: '11px', color: 'var(--kiosk-text-secondary)', marginBottom: '4px' }}>
            Rede
          </div>
          <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--kiosk-text-primary)' }}>
            {networkStatus === 'online' ? 'Online' : 'Offline'}
          </div>
        </div>
      </div>

      {/* Ações */}
      <div className="kiosk-actions" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <button
          onClick={onUpdateCheck}
          className="kiosk-button kiosk-button-primary"
          style={{
            width: '100%',
            padding: '8px 12px',
            fontSize: '12px',
            fontWeight: '500',
            background: 'var(--kiosk-gradient-button)',
            border: '1px solid var(--kiosk-border)',
            borderRadius: '6px',
            color: 'var(--kiosk-text-primary)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          🔄 Verificar Atualizações
        </button>
        
        <button
          onClick={onSync}
          className="kiosk-button kiosk-button-secondary"
          style={{
            width: '100%',
            padding: '8px 12px',
            fontSize: '12px',
            fontWeight: '500',
            background: 'var(--kiosk-gradient-button-secondary)',
            border: '1px solid var(--kiosk-border)',
            borderRadius: '6px',
            color: 'var(--kiosk-text-primary)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          🔄 Sincronizar Dados
        </button>
        
        <button
          onClick={onNotificationPermission}
          className="kiosk-button kiosk-button-tertiary"
          style={{
            width: '100%',
            padding: '8px 12px',
            fontSize: '12px',
            fontWeight: '500',
            background: 'var(--kiosk-gradient-button-tertiary)',
            border: '1px solid var(--kiosk-border)',
            borderRadius: '6px',
            color: 'var(--kiosk-text-primary)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          🔔 Notificações
        </button>
      </div>
    </div>
  );
});

PWAStatusDetails.displayName = 'PWAStatusDetails';

export default PWAStatusDetails;
