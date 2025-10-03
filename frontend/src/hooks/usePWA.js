import { useState, useEffect, useCallback } from 'react';

export const usePWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [hasHapticSupport, setHasHapticSupport] = useState(false);
  const [networkStatus, setNetworkStatus] = useState('online');

  // Detectar capacidades do dispositivo
  useEffect(() => {
    const checkDeviceCapabilities = () => {
      // Detectar iOS
      const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
      setIsIOS(ios);
      
      // Detectar modo standalone
      const standalone = window.matchMedia('(display-mode: standalone)').matches;
      const iosStandalone = window.navigator.standalone === true;
      const installed = standalone || iosStandalone;
      setIsInstalled(installed);
      setIsStandalone(installed);
      
      // Detectar suporte a haptic feedback
      const hasHaptic = 'vibrate' in navigator || 'HapticFeedback' in window;
      setHasHapticSupport(hasHaptic);
      
      return { ios, installed, hasHaptic };
    };

    // Verificar status da rede
    const updateNetworkStatus = () => {
      setNetworkStatus(navigator.onLine ? 'online' : 'offline');
    };

    // Verificar se o PWA pode ser instalado
    const checkInstallability = () => {
      if (isInstalled) {
        setShowInstallBanner(false);
        return;
      }

      // Para iOS, mostrar banner personalizado
      if (isIOS) {
        const lastShown = localStorage.getItem('pwa-banner-last-shown');
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        
        if (!lastShown || (now - parseInt(lastShown)) > oneDay) {
          // Delay para melhor UX
          setTimeout(() => setShowInstallBanner(true), 2000);
        }
        return;
      }

      // Para outros dispositivos, usar beforeinstallprompt
      if ('serviceWorker' in navigator) {
        window.addEventListener('beforeinstallprompt', (e) => {
          e.preventDefault();
          setDeferredPrompt(e);
          setTimeout(() => setShowInstallBanner(true), 2000);
        });
      }
    };

    // Event listeners
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    window.addEventListener('focus', checkDeviceCapabilities);
    window.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        checkDeviceCapabilities();
      }
    });

    // Verificação inicial
    const capabilities = checkDeviceCapabilities();
    checkInstallability();
    updateNetworkStatus();

    // Cleanup
    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
      window.removeEventListener('focus', checkDeviceCapabilities);
      window.removeEventListener('visibilitychange', checkDeviceCapabilities);
    };
  }, [isInstalled, isIOS]);

  // Haptic Feedback
  const triggerHaptic = useCallback((type = 'light') => {
    if (!hasHapticSupport) return;

    try {
      if ('vibrate' in navigator) {
        const patterns = {
          light: [10],
          medium: [20],
          heavy: [30],
          success: [10, 50, 10],
          error: [50, 100, 50],
          warning: [20, 100, 20]
        };
        navigator.vibrate(patterns[type] || patterns.light);
      }
    } catch (error) {
      // Haptic feedback não suportado - silencioso
    }
  }, [hasHapticSupport]);

  // Instalar PWA
  const installPWA = useCallback(async () => {
    try {
      triggerHaptic('medium');
      
      if (deferredPrompt) {
        // Para Android/Chrome
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
          triggerHaptic('success');
          setDeferredPrompt(null);
          setShowInstallBanner(false);
          setIsInstalled(true);
          
          // Mostrar confirmação
          showInstallSuccess();
        }
      } else if (isIOS) {
        // Para iOS, mostrar instruções
        showIOSInstallInstructions();
      }
    } catch (error) {
      triggerHaptic('error');
    }
  }, [deferredPrompt, isIOS, triggerHaptic]);

  // Mostrar instruções para iOS
  const showIOSInstallInstructions = useCallback(() => {
    triggerHaptic('light');
    
    const modal = document.createElement('div');
    modal.className = 'ios-modal-overlay';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    `;
    
    modal.innerHTML = `
      <div class="ios-modal">
        <button class="ios-modal-close" style="
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #86868B;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        ">×</button>
        
        <div style="margin-bottom: 24px;">
          <div style="
            width: 60px;
            height: 60px;
            background: var(--ios-primary);
            border-radius: 50%;
            margin: 0 auto 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: white;
          ">📱</div>
          <h3 style="margin: 0 0 8px 0; color: #1D1D1F; font-size: 20px; font-weight: 600;">
            Instalar no iOS
          </h3>
          <p style="margin: 0; color: #86868B; font-size: 15px; line-height: 1.4;">
            Adicione o Blinda Phone à sua tela inicial
          </p>
        </div>
        
        <div style="margin-bottom: 24px;">
          <div style="
            background: #F2F2F7;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 16px;
          ">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
              <div style="
                width: 32px;
                height: 32px;
                background: var(--ios-primary);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 16px;
              ">1</div>
              <span style="font-weight: 500; color: #1D1D1F;">Toque no botão Compartilhar</span>
            </div>
            <div style="
              width: 100%;
              height: 44px;
              background: #007AFF;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: 600;
              font-size: 16px;
            ">Compartilhar</div>
          </div>
          
          <div style="
            background: #F2F2F7;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 16px;
          ">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
              <div style="
                width: 32px;
                height: 32px;
                background: var(--ios-primary);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 16px;
              ">2</div>
              <span style="font-weight: 500; color: #1D1D1F;">Selecione "Adicionar à Tela Inicial"</span>
            </div>
            <div style="
              width: 100%;
              height: 44px;
              background: white;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #1D1D1F;
              font-weight: 500;
              font-size: 16px;
              border: 1px solid #E5E5EA;
            ">Adicionar à Tela Inicial</div>
          </div>
          
          <div style="
            background: #F2F2F7;
            border-radius: 12px;
            padding: 16px;
          ">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
              <div style="
                width: 32px;
                height: 32px;
                background: var(--ios-primary);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 16px;
              ">3</div>
              <span style="font-weight: 500; color: #1D1D1F;">Toque em "Adicionar"</span>
            </div>
            <div style="
              width: 100%;
              height: 44px;
              background: var(--ios-primary);
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: 600;
              font-size: 16px;
            ">Adicionar</div>
          </div>
        </div>
        
        <button class="ios-button" style="width: 100%;">
          Entendi!
        </button>
      </div>
    `;
    
    // Event listeners
    const closeBtn = modal.querySelector('.ios-modal-close');
    const confirmBtn = modal.querySelector('.ios-button');
    
    const closeModal = () => {
      modal.remove();
      localStorage.setItem('pwa-banner-last-shown', Date.now().toString());
      setShowInstallBanner(false);
    };
    
    closeBtn.addEventListener('click', closeModal);
    confirmBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    
    document.body.appendChild(modal);
    
    // Adicionar estilos dinâmicos
    const style = document.createElement('style');
    style.textContent = `
      .ios-modal-close:hover {
        background: rgba(0, 0, 0, 0.1);
      }
      .ios-modal-close:active {
        background: rgba(0, 0, 0, 0.2);
      }
    `;
    document.head.appendChild(style);
  }, [triggerHaptic]);

  // Mostrar sucesso da instalação
  const showInstallSuccess = useCallback(() => {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--ios-success);
      color: white;
      padding: 16px 20px;
      border-radius: 12px;
      box-shadow: var(--ios-shadow);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 20px;">✅</span>
        <div>
          <div style="font-weight: 600; margin-bottom: 2px;">Instalado com sucesso!</div>
          <div style="font-size: 14px; opacity: 0.9;">Blinda Phone foi adicionado à sua tela inicial</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 4 segundos
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }, []);

  // Descartar banner
  const dismissInstallBanner = useCallback(() => {
    triggerHaptic('light');
    setShowInstallBanner(false);
    localStorage.setItem('pwa-banner-last-shown', Date.now().toString());
  }, [triggerHaptic]);

  // Verificar atualizações
  const checkForUpdates = useCallback(async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          await registration.update();
          triggerHaptic('success');
        }
      } catch (error) {
        triggerHaptic('error');
      }
    }
  }, [triggerHaptic]);

  // Sincronizar dados offline
  const syncOfflineData = useCallback(async () => {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register('background-sync');
        triggerHaptic('medium');
      } catch (error) {
        triggerHaptic('error');
      }
    }
  }, [triggerHaptic]);

  // Solicitar permissão de notificação
  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          triggerHaptic('success');
        }
        return permission;
      } catch (error) {
        triggerHaptic('error');
      }
    }
    return Notification.permission;
  }, [triggerHaptic]);

  return {
    showInstallBanner,
    isInstalled,
    isIOS,
    isStandalone,
    hasHapticSupport,
    networkStatus,
    installPWA,
    dismissInstallBanner,
    checkForUpdates,
    syncOfflineData,
    requestNotificationPermission,
    triggerHaptic
  };
};
