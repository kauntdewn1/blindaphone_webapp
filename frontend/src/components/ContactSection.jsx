import React, { memo } from 'react';

const ContactSection = memo(() => {
  return (
    <section className="ios-section">
      <div className="ios-container">
        <div className="ios-contact-header">
          <h2 className="ios-section-title">Fale Conosco</h2>
          <p className="ios-section-subtitle">
            Estamos aqui para ajudar. Entre em contato conosco através 
            dos canais abaixo.
          </p>
        </div>

        <div className="ios-contact-content">
          <div className="ios-contact-info">
            <div className="ios-contact-item">
              <div className="ios-contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2136 21.3523 21.4019C21.1473 21.5901 20.9053 21.7335 20.6406 21.8227C20.3759 21.9119 20.0942 21.9452 19.81 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3146 6.72533 15.2661 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.19C2.09494 3.90547 2.12849 3.62363 2.21801 3.35871C2.30752 3.09379 2.45121 2.85162 2.64055 2.64656C2.82989 2.4415 3.06018 2.27795 3.31574 2.16649C3.5713 2.05503 3.84706 1.99821 4.125 2H7.125C7.59523 1.99522 8.06504 2.16708 8.43945 2.48353C8.81385 2.79999 9.07174 3.23945 9.17499 3.72C9.36066 4.68007 9.63191 5.62273 9.98499 6.54C10.0783 6.74792 10.1187 6.97996 10.1027 7.21249C10.0867 7.44502 10.0148 7.67191 9.89374 7.87499C9.77268 8.07807 9.60574 8.25088 9.40499 8.38L8.09499 9.69C9.38203 12.0868 11.3132 14.0179 13.71 15.31L15.02 14C15.1491 13.7992 15.3219 13.6323 15.525 13.5112C15.7281 13.3902 15.955 13.3183 16.1875 13.3023C16.42 13.2863 16.6521 13.3267 16.86 13.42C17.7773 13.7731 18.7199 14.0444 19.68 14.23C20.1606 14.3333 20.6001 14.5912 20.9165 14.9656C21.233 15.34 21.4049 15.8098 21.4 16.28L22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="ios-contact-details">
                <h4>Telefone</h4>
                <p>(11) 99999-9999</p>
              </div>
            </div>

            <div className="ios-contact-item">
              <div className="ios-contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="ios-contact-details">
                <h4>Email</h4>
                <p>contato@blindaphone.com</p>
              </div>
            </div>

            <div className="ios-contact-item">
              <div className="ios-contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="ios-contact-details">
                <h4>Endereço</h4>
                <p>São Paulo, SP - Brasil</p>
              </div>
            </div>
          </div>

          <div className="ios-contact-form">
            <h3>Envie sua mensagem</h3>
            <form className="ios-form">
              <div className="ios-form-group">
                <label htmlFor="contact-name">Nome</label>
                <input
                  type="text"
                  id="contact-name"
                  className="ios-input"
                  required
                />
              </div>

              <div className="ios-form-group">
                <label htmlFor="contact-email">Email</label>
                <input
                  type="email"
                  id="contact-email"
                  className="ios-input"
                  required
                />
              </div>

              <div className="ios-form-group">
                <label htmlFor="contact-message">Mensagem</label>
                <textarea
                  id="contact-message"
                  className="ios-textarea"
                  rows="4"
                  required
                ></textarea>
              </div>

              <button type="submit" className="ios-button ios-button-primary">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;
