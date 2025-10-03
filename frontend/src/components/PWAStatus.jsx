import React, { useState, memo } from 'react';
import { usePWA } from '../hooks/usePWA';
import PWAStatusCard from './PWAStatusCard';
import PWAStatusDetails from './PWAStatusDetails';

const PWAStatus = memo(() => {
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
    <>
      <PWAStatusCard
        isInstalled={isInstalled}
        isIOS={isIOS}
        isStandalone={isStandalone}
        hasHapticSupport={hasHapticSupport}
        networkStatus={networkStatus}
        isExpanded={isExpanded}
        onToggleExpanded={toggleExpanded}
      />
      
      {isExpanded && (
        <PWAStatusDetails
          isInstalled={isInstalled}
          isIOS={isIOS}
          isStandalone={isStandalone}
          hasHapticSupport={hasHapticSupport}
          networkStatus={networkStatus}
          onUpdateCheck={handleUpdateCheck}
          onSync={handleSync}
          onNotificationPermission={handleNotificationPermission}
        />
      )}
    </>
  );
});

PWAStatus.displayName = 'PWAStatus';

export default PWAStatus;