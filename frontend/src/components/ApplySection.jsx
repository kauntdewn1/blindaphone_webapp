import React, { memo, useState } from 'react';

const ApplySection = memo(({ showForm, setShowForm, formData, setFormData, handleSubmit }) => {
  return (
    <section className="ios-section">
      <div className="ios-container">
        <div className="ios-apply-header">
          <h2 className="ios-section-title">Seja um Aplicador Oficial</h2>
          <p className="ios-section-subtitle">
            Junte-se à nossa rede de aplicadores e faça parte da revolução 
            em proteção de dispositivos móveis.
          </p>
        </div>

        {!showForm ? (
          <div className="ios-apply-content">
            <div className="ios-apply-benefits">
              <h3>Por que ser um Aplicador Blinda Phone?</h3>
              <div className="ios-benefits-grid">
                <div className="ios-benefit-item">
                  <div className="ios-benefit-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4>Treinamento Completo</h4>
                  <p>Capacitação técnica e comercial para excelência no atendimento</p>
                </div>

                <div className="ios-benefit-item">
                  <div className="ios-benefit-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4>Suporte Técnico</h4>
                  <p>Assistência especializada para resolver qualquer dúvida</p>
                </div>

                <div className="ios-benefit-item">
                  <div className="ios-benefit-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4>Comissões Atraentes</h4>
                  <p>Remuneração competitiva e plano de carreira</p>
                </div>
              </div>
            </div>

            <div className="ios-apply-cta">
              <button 
                className="ios-button ios-button-primary"
                onClick={() => setShowForm(true)}
              >
                Quero Ser um Aplicador
              </button>
            </div>
          </div>
        ) : (
          <div className="ios-form-container">
            <form onSubmit={handleSubmit} className="ios-form">
              <div className="ios-form-header">
                <h3>Cadastro de Aplicador</h3>
                <button 
                  type="button" 
                  className="ios-form-close"
                  onClick={() => setShowForm(false)}
                >
                  ×
                </button>
              </div>

              <div className="ios-form-group">
                <label htmlFor="nome">Nome Completo</label>
                <input
                  type="text"
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  required
                  className="ios-input"
                />
              </div>

              <div className="ios-form-group">
                <label htmlFor="cidade">Cidade</label>
                <input
                  type="text"
                  id="cidade"
                  value={formData.cidade}
                  onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                  required
                  className="ios-input"
                />
              </div>

              <div className="ios-form-group">
                <label htmlFor="whatsapp">WhatsApp</label>
                <input
                  type="tel"
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  required
                  className="ios-input"
                />
              </div>

              <div className="ios-form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="ios-input"
                />
              </div>

              <button type="submit" className="ios-button ios-button-primary">
                Enviar Cadastro
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
});

ApplySection.displayName = 'ApplySection';

export default ApplySection;
