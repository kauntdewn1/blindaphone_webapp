import React, { memo } from 'react';

const AboutSection = memo(() => {
  return (
    <section className="ios-section">
      <div className="ios-container">
        <div className="ios-about-header">
          <h2 className="ios-section-title">Quem Somos</h2>
          <p className="ios-section-subtitle">
            A Blinda Phone nasceu da necessidade de proteger o que mais importa: 
            seu dispositivo e seus dados.
          </p>
        </div>

        <div className="ios-about-content">
          <div className="ios-about-text">
            <h3>Nossa Missão</h3>
            <p>
              Desenvolver soluções de proteção inteligentes que combinam 
              tecnologia avançada com design elegante, garantindo que seu 
              smartphone esteja sempre seguro e funcionando perfeitamente.
            </p>

            <h3>Nossa Visão</h3>
            <p>
              Ser a marca líder em proteção de dispositivos móveis, 
              reconhecida pela inovação, qualidade e compromisso com 
              a satisfação do cliente.
            </p>

            <h3>Nossos Valores</h3>
            <ul className="ios-values-list">
              <li>
                <span className="ios-value-icon">✓</span>
                <span>Inovação constante</span>
              </li>
              <li>
                <span className="ios-value-icon">✓</span>
                <span>Qualidade superior</span>
              </li>
              <li>
                <span className="ios-value-icon">✓</span>
                <span>Compromisso com o cliente</span>
              </li>
              <li>
                <span className="ios-value-icon">✓</span>
                <span>Sustentabilidade</span>
              </li>
            </ul>
          </div>

          <div className="ios-about-stats">
            <div className="ios-stat-item">
              <div className="ios-stat-number">10K+</div>
              <div className="ios-stat-label">Clientes Satisfeitos</div>
            </div>
            <div className="ios-stat-item">
              <div className="ios-stat-number">50+</div>
              <div className="ios-stat-label">Cidades Atendidas</div>
            </div>
            <div className="ios-stat-item">
              <div className="ios-stat-number">99%</div>
              <div className="ios-stat-label">Taxa de Satisfação</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
