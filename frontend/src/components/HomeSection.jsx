import React, { memo } from 'react';

const HomeSection = memo(() => {
  return (
    <section className="ios-section">
      {/* Hero Section */}
      <div className="ios-hero">
        <div className="ios-hero-content">
          <div className="ios-hero-logo">
            <img 
              src="/logo_hero.png" 
              alt="BlindaPhone Logo" 
              className="ios-hero-logo-img"
            />
          </div>
          <p className="ios-hero-subtitle">Blindagem para celulares com resultados reais.</p>
          <p className="ios-hero-description">
            Uma boa oportunidade de renda.<br />
            com investimento baixo.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="ios-features">
        <div className="ios-feature-card">
          <div className="ios-feature-icon ios-icon-purple">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22S2 16 2 10V5L12 2L22 5V10C22 16 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>Proteção Total</h3>
          <p>Produto, grupo + mentoria.</p>
        </div>

        <div className="ios-feature-card">
          <div className="ios-feature-icon ios-icon-green">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>Design Premium</h3>
          <p>Estética sofisticada que combina com seu estilo</p>
        </div>

        <div className="ios-feature-card">
          <div className="ios-feature-icon ios-icon-blue">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>Performance</h3>
          <p>Máxima eficiência sem comprometer a usabilidade</p>
        </div>
      </div>
    </section>
  );
});

HomeSection.displayName = 'HomeSection';

export default HomeSection;
