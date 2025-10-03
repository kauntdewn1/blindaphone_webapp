import React, { memo } from 'react';

const PWAUpdateModal = memo(({ 
  showUpdatePrompt, 
  updateProgress, 
  onUpdate, 
  onDismiss 
}) => {
  if (!showUpdatePrompt) return null;

  return (
    <div className="ios-modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(10px)'
    }}>
      <div className="ios-modal" style={{
        background: 'var(--ios-background)',
        borderRadius: '16px',
        padding: '24px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: 'var(--ios-shadow)',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'var(--ios-primary)',
            borderRadius: '50%',
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>
            🔄
          </div>
          <h3 style={{
            margin: '0 0 8px 0',
            color: 'var(--ios-text-primary)',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            Atualização Disponível
          </h3>
          <p style={{
            margin: 0,
            color: 'var(--ios-text-secondary)',
            fontSize: '15px',
            lineHeight: '1.4'
          }}>
            Uma nova versão do app está disponível. Deseja atualizar agora?
          </p>
        </div>

        {/* Progress Bar */}
        {updateProgress > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <span style={{
                fontSize: '14px',
                color: 'var(--ios-text-secondary)'
              }}>
                Atualizando...
              </span>
              <span style={{
                fontSize: '14px',
                color: 'var(--ios-text-primary)',
                fontWeight: '500'
              }}>
                {updateProgress}%
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '4px',
              background: 'var(--ios-border)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${updateProgress}%`,
                height: '100%',
                background: 'var(--ios-primary)',
                borderRadius: '2px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{
          display: 'flex',
          gap: '12px'
        }}>
          <button
            onClick={onDismiss}
            className="ios-button ios-button-secondary"
            style={{
              flex: 1,
              padding: '12px 16px',
              fontSize: '16px',
              fontWeight: '500',
              background: 'var(--ios-background-secondary)',
              border: '1px solid var(--ios-border)',
              borderRadius: '8px',
              color: 'var(--ios-text-primary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Depois
          </button>
          <button
            onClick={onUpdate}
            className="ios-button ios-button-primary"
            style={{
              flex: 1,
              padding: '12px 16px',
              fontSize: '16px',
              fontWeight: '500',
              background: 'var(--ios-primary)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Atualizar
          </button>
        </div>
      </div>
    </div>
  );
});

PWAUpdateModal.displayName = 'PWAUpdateModal';

export default PWAUpdateModal;
