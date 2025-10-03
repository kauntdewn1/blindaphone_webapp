import React, { memo } from 'react';

const ProductsSection = memo(() => {
  const products = [
    {
      id: 'iron-force',
      name: 'IRON FORCE',
      description: 'Proteção máxima para seu dispositivo',
      features: ['Resistência extrema', 'Design premium', 'Compatibilidade total'],
      price: 'R$ 89,90',
      image: '/images/IRON.png'
    },
    {
      id: 'overcoat',
      name: 'OVERCOAT',
      description: 'Cobertura completa e elegante',
      features: ['Proteção 360°', 'Material premium', 'Fácil instalação'],
      price: 'R$ 79,90',
      image: '/images/OVERCOAT.png'
    }
  ];

  return (
    <section className="ios-section">
      <div className="ios-container">
        <div className="ios-products-header">
          <h2 className="ios-section-title">Nossos Produtos</h2>
          <p className="ios-section-subtitle">
            Soluções de proteção desenvolvidas com tecnologia de ponta 
            e materiais de alta qualidade.
          </p>
        </div>

        <div className="ios-products-grid">
          {products.map((product) => (
            <div key={product.id} className="ios-product-card">
              <div className="ios-product-image">
                <img src={product.image} alt={product.name} />
              </div>
              
              <div className="ios-product-content">
                <h3 className="ios-product-name">{product.name}</h3>
                <p className="ios-product-description">{product.description}</p>
                
                <ul className="ios-product-features">
                  {product.features.map((feature, index) => (
                    <li key={index}>
                      <span className="ios-feature-icon">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="ios-product-price">{product.price}</div>
                
                <button className="ios-button ios-button-secondary">
                  Saiba Mais
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="ios-products-cta">
          <h3>Interessado em nossos produtos?</h3>
          <p>Entre em contato conosco para mais informações</p>
          <button className="ios-button ios-button-primary">
            Falar com Especialista
          </button>
        </div>
      </div>
    </section>
  );
});

ProductsSection.displayName = 'ProductsSection';

export default ProductsSection;
