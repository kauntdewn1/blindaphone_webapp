import React, { memo } from 'react';
import copy from '../content';

const BottomTabBar = memo(({ activeTab, onTabChange }) => {
  const ctas = copy?.ctas || [];
  const tabs = [
    {
      id: 'home',
      label: 'Início',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: 'Principal'
    },
    {
      id: 'about',
      label: 'Quem Somos',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: 'História'
    },
    {
      id: 'apply',
      label: 'Aplicador',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M9 7H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M9 11H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M9 15H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      description: ctas[2] || 'Seja Oficial'
    },
    {
      id: 'products',
      label: 'Produtos',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7564 5.72718 21.351 5.12075 20.84 4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: 'IRON FORCE'
    },
    {
      id: 'contact',
      label: 'Contato',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2136 21.3523 21.4019C21.1473 21.5901 20.9053 21.7335 20.6406 21.8227C20.3759 21.9119 20.0942 21.9452 19.81 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3146 6.72533 15.2661 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.19C2.09494 3.90547 2.12849 3.62363 2.21801 3.35871C2.30752 3.09379 2.45121 2.85162 2.64055 2.64656C2.82989 2.4415 3.06018 2.27795 3.31574 2.16649C3.5713 2.05503 3.84706 1.99821 4.125 2H7.125C7.59523 1.99522 8.06504 2.16708 8.43945 2.48353C8.81385 2.79999 9.07174 3.23945 9.17499 3.72C9.36066 4.68007 9.63191 5.62273 9.98499 6.54C10.0783 6.74792 10.1187 6.97996 10.1027 7.21249C10.0867 7.44502 10.0148 7.67191 9.89374 7.87499C9.77268 8.07807 9.60574 8.25088 9.40499 8.38L8.09499 9.69C9.38203 12.0868 11.3132 14.0179 13.71 15.31L15.02 14C15.1491 13.7992 15.3219 13.6323 15.525 13.5112C15.7281 13.3902 15.955 13.3183 16.1875 13.3023C16.42 13.2863 16.6521 13.3267 16.86 13.42C17.7773 13.7731 18.7199 14.0444 19.68 14.23C20.1606 14.3333 20.6001 14.5912 20.9165 14.9656C21.233 15.34 21.4049 15.8098 21.4 16.28L22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: 'Fale Conosco'
    }
  ];

  return (
    <div className="ios-bottom-tab-bar">
      {/* Borda superior sutil */}
      <div className="ios-tab-border" />

      {/* Conteúdo do tab bar */}
      <div className="ios-tab-content">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`ios-tab-item ${activeTab === tab.id ? 'active' : ''}`}
          >
            {/* Container do ícone */}
            <div className="ios-tab-icon-container">
              {tab.icon}
            </div>

            {/* Apenas o subtítulo/descrição */}
            <span className="ios-tab-description">
              {tab.description}
            </span>

            {/* Indicador de ativo */}
            {activeTab === tab.id && (
              <div className="ios-tab-indicator" />
            )}
          </button>
        ))}
      </div>

      {/* Safe area para dispositivos com notch */}
      <div className="ios-safe-area" />
    </div>
  );
});

BottomTabBar.displayName = 'BottomTabBar';

export default BottomTabBar;
