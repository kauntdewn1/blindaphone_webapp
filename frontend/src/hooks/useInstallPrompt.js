import { useState, useEffect, useCallback } from 'react';

/**
 * Hook customizado para detectar e sugerir instalação do PWA
 * Gerencia o prompt de instalação e estado da aplicação
 * 
 * @returns {Object} Estado e funções para controle de instalação
 */
export const useInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [installPromptShown, setInstallPromptShown] = useState(false);

  /**
   * Verifica se o PWA já está instalado
   * @returns {boolean} True se estiver instalado
   */
  const checkIfInstalled = useCallback(() => {
    // Verifica se está em modo standalone
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone = window.navigator.standalone === true;
    const isInApp = window.matchMedia('(display-mode: minimal-ui)').matches;
    
    return isStandalone || isIOSStandalone || isInApp;
  }, []);

  /**
   * Verifica se o PWA pode ser instalado
   * @returns {boolean} True se for instalável
   */
  const checkIfInstallable = useCallback(() => {
    // Verifica se o browser suporta beforeinstallprompt
    return 'serviceWorker' in navigator && 'beforeinstallprompt' in window;
  }, []);

  /**
   * Verifica se deve mostrar o prompt de instalação
   * @returns {boolean} True se deve mostrar
   */
  const shouldShowPrompt = useCallback(() => {
    if (isInstalled || installPromptShown) return false;
    
    // Verifica se já foi mostrado recentemente
    const lastShown = localStorage.getItem('install-prompt-last-shown');
    const now = Date.now();
    const oneWeek = 7 * 24 * 60 * 60 * 1000; // 1 semana
    
    if (lastShown && (now - parseInt(lastShown)) < oneWeek) {
      return false;
    }
    
    return isInstallable;
  }, [isInstalled, installPromptShown, isInstallable]);

  /**
   * Instala o PWA
   * @returns {Promise<boolean>} True se instalado com sucesso
   */
  const installPWA = useCallback(async () => {
    if (!deferredPrompt) {
      console.warn('⚠️ useInstallPrompt: Nenhum prompt de instalação disponível');
      return false;
    }

    try {
      // Mostra o prompt de instalação
      deferredPrompt.prompt();
      
      // Aguarda a resposta do usuário
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('✅ useInstallPrompt: PWA instalado com sucesso');
        setIsInstalled(true);
        setShowInstallPrompt(false);
        setDeferredPrompt(null);
        
        // Salva que foi instalado
        localStorage.setItem('pwa-installed', 'true');
        localStorage.setItem('pwa-installed-date', Date.now().toString());
        
        return true;
      } else {
        console.log('❌ useInstallPrompt: Instalação cancelada pelo usuário');
        setInstallPromptShown(true);
        localStorage.setItem('install-prompt-last-shown', Date.now().toString());
        
        return false;
      }
    } catch (error) {
      console.error('❌ useInstallPrompt: Erro ao instalar PWA:', error);
      return false;
    }
  }, [deferredPrompt]);

  /**
   * Dispensa o prompt de instalação
   */
  const dismissPrompt = useCallback(() => {
    setShowInstallPrompt(false);
    setInstallPromptShown(true);
    localStorage.setItem('install-prompt-last-shown', Date.now().toString());
  }, []);

  /**
   * Força a exibição do prompt (para testes)
   */
  const forceShowPrompt = useCallback(() => {
    if (isInstallable && !isInstalled) {
      setShowInstallPrompt(true);
    }
  }, [isInstallable, isInstalled]);

  /**
   * Reseta o estado do prompt (para testes)
   */
  const resetPromptState = useCallback(() => {
    setInstallPromptShown(false);
    setShowInstallPrompt(false);
    localStorage.removeItem('install-prompt-last-shown');
    localStorage.removeItem('pwa-installed');
    localStorage.removeItem('pwa-installed-date');
  }, []);

  // Efeito para detectar mudanças no estado de instalação
  useEffect(() => {
    const checkInstallation = () => {
      const installed = checkIfInstalled();
      setIsInstalled(installed);
      
      if (installed) {
        setShowInstallPrompt(false);
      }
    };

    // Verifica inicialmente
    checkInstallation();

    // Verifica quando a visibilidade da página muda
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkInstallation();
      }
    };

    // Verifica quando a aplicação ganha foco
    const handleFocus = () => {
      checkInstallation();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [checkIfInstalled]);

  // Efeito para detectar capacidades de instalação
  useEffect(() => {
    const installable = checkIfInstallable();
    setIsInstallable(installable);

    if (installable) {
      // Verifica se deve mostrar o prompt
      const shouldShow = shouldShowPrompt();
      setShowInstallPrompt(shouldShow);
    }
  }, [checkIfInstallable, shouldShowPrompt]);

  // Efeito para capturar o evento beforeinstallprompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      console.log('🎯 useInstallPrompt: beforeinstallprompt capturado');
      
      // Previne o prompt padrão do browser
      e.preventDefault();
      
      // Salva o evento para usar depois
      setDeferredPrompt(e);
      
      // Mostra nosso prompt personalizado
      if (shouldShowPrompt()) {
        setShowInstallPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [shouldShowPrompt]);

  // Efeito para detectar quando o PWA é instalado
  useEffect(() => {
    const handleAppInstalled = () => {
      console.log('🎉 useInstallPrompt: PWA foi instalado');
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      
      // Salva que foi instalado
      localStorage.setItem('pwa-installed', 'true');
      localStorage.setItem('pwa-installed-date', Date.now().toString());
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  return {
    // Estado
    isInstalled,
    isInstallable,
    showInstallPrompt,
    installPromptShown,
    deferredPrompt,
    
    // Ações
    installPWA,
    dismissPrompt,
    forceShowPrompt,
    resetPromptState,
    
    // Utilitários
    checkIfInstalled,
    checkIfInstallable,
    shouldShowPrompt
  };
};
