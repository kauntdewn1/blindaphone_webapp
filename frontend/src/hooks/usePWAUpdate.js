import { useState, useEffect } from 'react';

/**
 * Hook customizado para gerenciar atualizações do PWA
 * @returns {Object} Estado e funções para controle de atualizações
 */
export const usePWAUpdate = () => {
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

  /**
   * Executa a atualização do PWA
   */
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
        
        // Aguardar um pouco e finalizar
        setTimeout(() => {
          setUpdateProgress(100);
          clearInterval(progressInterval);
          
          // Recarregar a página após um breve delay
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }, 2000);
        
      } catch (error) {
        console.error('Erro ao atualizar:', error);
        setUpdateProgress(0);
      }
    }
  };

  /**
   * Dispensa o prompt de atualização
   */
  const handleDismiss = () => {
    setShowUpdatePrompt(false);
    setUpdateProgress(0);
  };

  return {
    showUpdatePrompt,
    updateProgress,
    handleUpdate,
    handleDismiss
  };
};
