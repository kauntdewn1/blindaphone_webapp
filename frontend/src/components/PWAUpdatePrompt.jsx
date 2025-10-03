import React, { memo } from 'react';
import { usePWAUpdate } from '../hooks/usePWAUpdate';
import PWAUpdateModal from './PWAUpdateModal';

const PWAUpdatePrompt = memo(() => {
  const {
    showUpdatePrompt,
    updateProgress,
    handleUpdate,
    handleDismiss
  } = usePWAUpdate();

  return (
    <PWAUpdateModal
      showUpdatePrompt={showUpdatePrompt}
      updateProgress={updateProgress}
      onUpdate={handleUpdate}
      onDismiss={handleDismiss}
    />
  );
});

PWAUpdatePrompt.displayName = 'PWAUpdatePrompt';

export default PWAUpdatePrompt;