'use client'

import { useState, useEffect } from 'react';
import { Shield, Droplets, Clock, Sparkles, CheckCircle, Phone, Star, TrendingUp, Award, Zap, AlertCircle } from 'lucide-react';
import React from 'react';


const WHATSAPP_PHONE = '5562993737713'; // SUBSTITUA pelo número real

export default function BlindaphoneV2() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    role: 'cliente' as 'cliente' | 'aplicador',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // WhatsApp button delay
  useEffect(() => {
    const timer = setTimeout(() => setShowWhatsApp(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.length < 3) {
      newErrors.name = 'Nome completo é obrigatório';
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'Cidade é obrigatória';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const msg = [
      `Olá! Sou ${formData.role === 'aplicador' ? '*interessado em ser aplicador oficial*' : '*cliente interessado*'}.`,
      ``,
      `📋 *Dados:*`,
      `• Nome: ${formData.name}`,
      formData.email ? `• E-mail: ${formData.email}` : '',
      `• Cidade: ${formData.city}`,
      formData.message ? `\n💬 Mensagem: ${formData.message}` : '',
      ``,
      `Quero mais informações sobre *BLINDAPHONE*.`
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
    
    setTimeout(() => {
      window.open(url, '_blank');
      setIsSubmitting(false);
    }, 800);
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Olá! Quero saber mais sobre BLINDAPHONE.')}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="glass-card-dark sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-56 h-28 flex items-center justify-center">
                <img 
                  src="/assets/images/BLINDAPHONE-PERFIL.png" 
                  alt="BLINDAPHONE Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#solucao" className="text-bp-navy/80 hover:text-bp-navy transition font-medium">Solução</a>
              <a href="#aplicador" className="text-bp-navy/80 hover:text-bp-navy transition font-medium">Seja Aplicador</a>
              <a href="#depoimentos" className="text-bp-navy/80 hover:text-bp-navy transition font-medium">Resultados</a>
              <button 
                onClick={openWhatsApp}
                className="btn-primary px-5 py-2.5 text-sm font-semibold"
              >
                Fale Conosco
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Grid pattern background */}
      {/* Animated gradient orbs */}

    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(203,171,106,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(203,171,106,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
     
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Badge flutuante no topo */}
        <div className="flex justify-center mb-12 animate-bounce" style={{animationDuration: '3s'}}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-yellow-600/20 backdrop-blur-xl border border-amber-500/30 text-amber-400 px-6 py-3 rounded-full text-sm font-bold shadow-lg shadow-amber-500/20">
            <Sparkles className="w-5 h-5 animate-spin" style={{animationDuration: '4s'}} />
            Nanotecnologia Certificada • Revolução na Proteção
            <Sparkles className="w-5 h-5 animate-spin" style={{animationDuration: '4s', animationDirection: 'reverse'}} />
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* Coluna esquerda - Produto em destaque MAIOR */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="relative group">
              {/* Anel de luz rotativo */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-yellow-500/30 to-amber-500/30 rounded-full blur-2xl animate-spin" style={{animationDuration: '8s'}}></div>
              
              {/* Card do produto */}
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-2xl rounded-3xl p-12 border border-amber-500/20 shadow-2xl">
                {/* Imagem DOMINANTE */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-yellow-600/20 rounded-2xl blur-xl"></div>
                  <img 
                    src="/assets/images/IRON.png" 
                    alt="IRON FORCE" 
                    className="relative w-full h-auto object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                {/* Info rápida abaixo da imagem */}
                <div className="mt-8 flex items-center justify-center gap-6 text-amber-400/80 text-sm">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>100 aplicações</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-amber-400/50"></div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Cura em 30min</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-amber-400/50"></div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Nanotecnologia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna direita - Conteúdo compacto e poderoso */}
          <div className="lg:col-span-2 order-1 lg:order-2 text-white space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1]">
              Não é película.
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 animate-pulse">
                É IRON FORCE
              </span>
            </h1>
            
            <p className="text-lg text-slate-300 leading-relaxed">
              Proteção invisível que preserva o design original. Aplicação limpa, sem escorrer. Tecnologia que cura em 30 minutos.
            </p>

            {/* CTAs empilhados */}
            <div className="space-y-3 pt-4">
              <a 
                href="#contato" 
                className="block w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-900 px-8 py-5 rounded-2xl font-black text-xl text-center transition-all transform hover:scale-105 shadow-lg shadow-amber-500/50"
              >
                Comprar Agora • R$ 347
              </a>
              <a 
                href="#aplicador" 
                className="block w-full bg-slate-800/50 backdrop-blur-xl border-2 border-amber-500/30 hover:border-amber-500/60 text-amber-400 px-8 py-5 rounded-2xl font-bold text-lg text-center transition-all hover:bg-slate-800/70"
              >
                Quero Ser Aplicador
              </a>
            </div>

            {/* Features minimalistas */}
            <div className="grid grid-cols-2 gap-3 pt-6">
              {[
                { icon: Shield, text: 'Nanotecnologia' },
                { icon: Droplets, text: 'Sem escorrer' },
                { icon: CheckCircle, text: 'Invisível' },
                { icon: Zap, text: 'Alta duração' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-800/30 backdrop-blur-xl border border-amber-500/20 px-4 py-3 rounded-xl">
                  <item.icon className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-sm font-semibold text-slate-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust indicators no rodapé */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-amber-400" />
            <span>Certificado de qualidade</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-600"></div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <span>Garantia de proteção</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-600"></div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Tecnologia premium</span>
          </div>
        </div>
      </div>
    </section>

      {/* Como Funciona */}
      <section id="solucao" className="py-20 bg-gradient-to-b from-bp-white to-bp-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gradient-navy">Como funciona o protocolo</h2>
            <p className="text-xl text-bp-navy/80 max-w-3xl mx-auto">
              Método técnico comprovado: preparação do vidro, aplicação precisa e cura controlada
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Fórmula nanotecnológica',
                desc: 'Composição baseada em nanotecnologia para máxima aderência e durabilidade. Camada ultrafina e transparente.'
              },
              {
                step: '02',
                title: 'Aplicação limpa',
                desc: 'Método preciso que não escorre entre botões. Protocolo profissional para resultado uniforme e resistente.'
              },
              {
                step: '03',
                title: 'Cura em até 30 minutos',
                desc: 'Tempo de cura controlado em condições recomendadas. Proteção ativa após o processo completo.'
              }
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2 group">
                <div className="text-5xl font-black text-gradient mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-3 text-bp-navy group-hover:text-gradient-navy transition-colors">{item.title}</h3>
                <p className="text-bp-navy/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-20 bg-gradient-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gradient">Resultados reais de aplicadores</h2>
            <p className="text-xl text-bp-gold-light/90">Profissionais que transformaram suas carreiras</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Carlos Silva', city: 'São Paulo-SP', revenue: 'R$ 28.400', apps: '142 aplicações/mês', stars: 5 },
              { name: 'Marina Costa', city: 'Belo Horizonte-MG', revenue: 'R$ 31.200', apps: '156 aplicações/mês', stars: 5 },
              { name: 'Ricardo Alves', city: 'Curitiba-PR', revenue: 'R$ 26.800', apps: '134 aplicações/mês', stars: 5 }
            ].map((person, i) => (
              <div key={i} className="glass-card-dark p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex gap-1 mb-3">
                  {[...Array(person.stars)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-bp-gold text-bp-gold" />
                  ))}
                </div>
                <p className="text-bp-gold-light/90 mb-4 italic">
                  "Aplicador oficial BLINDAPHONE. Resultados consistentes com o método profissional."
                </p>
                <div className="border-t border-bp-gold/20 pt-4">
                  <p className="font-bold text-bp-gold">{person.name}</p>
                  <p className="text-sm text-bp-gold/70">{person.city}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="text-sm">
                      <div className="font-bold text-bp-gold-light">{person.revenue}</div>
                      <div className="text-xs text-bp-gold/70">{person.apps}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-center text-bp-gold/60 mt-8 max-w-3xl mx-auto">
            *Resultados individuais. Variam conforme preço praticado, volume de atendimento e execução correta do método de aplicação.
          </p>
        </div>
      </section>

      {/* Para Aplicadores */}
      <section id="aplicador" className="py-20 bg-gradient-to-b from-bp-gray-light to-bp-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 glass-card text-bp-navy px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <TrendingUp className="w-4 h-4 text-bp-gold" />
                Oportunidade Exclusiva
              </div>
              
              <h2 className="text-4xl font-bold mb-6 text-gradient-navy">Seja aplicador oficial na sua cidade</h2>
              <p className="text-xl text-bp-navy/80 mb-8">
                Modelo de renda: 3 aplicações/dia → projeção de até R$ 35.000/mês
              </p>

              <div className="space-y-4">
                {[
                  'Suporte técnico diário',
                  'Grupo exclusivo de aplicadores',
                  'Mentoria prática com especialistas',
                  'Exclusividade: 1 aplicador oficial por cidade',
                  'Material de divulgação profissional',
                  'Protocolo técnico completo'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-bp-gold flex-shrink-0" />
                    <span className="text-bp-navy/80">{item}</span>
                  </div>
                ))}
              </div>

              <a 
                href="#contato"
                className="mt-8 inline-block btn-primary"
              >
                Garantir Minha Exclusividade
              </a>
            </div>

            <div className="glass-card-dark p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-gradient">Projeção de renda</h3>
              
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/15 transition-all">
                  <div className="flex justify-between mb-2">
                    <span className="text-bp-gold-light/90 font-medium">Investimento inicial</span>
                    <span className="font-bold text-bp-gold text-lg">R$ 347</span>
                  </div>
                  <p className="text-xs text-bp-gold-light/70">Até 100 aplicações por frasco</p>
                </div>

                <div className="bg-bp-navy-light/30 backdrop-blur-sm border border-bp-gold/30 rounded-lg p-4 hover:bg-bp-navy-light/40 transition-all">
                  <div className="flex justify-between mb-2">
                    <span className="text-bp-gold-light/90 font-medium">Preço médio por aplicação</span>
                    <span className="font-bold text-bp-gold-hover text-lg">R$ 200</span>
                  </div>
                  <p className="text-xs text-bp-gold-light/70">Valor praticado pelos aplicadores</p>
                </div>

                <div className="bg-gradient-to-r from-bp-gold/30 via-bp-gold-hover/20 to-bp-gold-light/30 p-6 rounded-xl border-2 border-bp-gold/40 shadow-lg hover:shadow-xl transition-all animate-pulse-slow">
                  <div className="flex justify-between mb-2">
                    <span className="text-bp-navy font-semibold">3 aplicações/dia × 30 dias</span>
                    <span className="font-bold text-3xl text-bp-navy">R$ 18.000</span>
                  </div>
                  <p className="text-xs text-bp-navy/80 font-medium">Projeção conservadora mensal</p>
                </div>
              </div>

              <p className="text-xs text-bp-gold/60 mt-6">
                *Resultados variam conforme preço praticado, volume de atendimento e execução do método. Exclusividade sujeita à disponibilidade e aprovação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Oferta com Countdown */}
      <section className="py-20 bg-gradient-to-b from-bp-white via-bp-gray-light to-bp-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gradient-navy">Oferta oficial BLINDAPHONE</h2>
          <p className="text-xl text-bp-navy/80 mb-8">Investimento único com retorno multiplicado</p>

          {/* Countdown Timer */}
          <div className="bg-gradient-gold text-bp-navy p-4 rounded-xl mb-8 max-w-md mx-auto shadow-xl animate-glow">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5" />
              <span className="font-bold">Oferta expira em:</span>
            </div>
            <div className="flex justify-center gap-4 text-2xl font-bold">
              <div className="bg-bp-navy/20 px-3 py-2 rounded-lg">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
              <span>:</span>
              <div className="bg-bp-navy/20 px-3 py-2 rounded-lg">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <span>:</span>
              <div className="bg-bp-navy/20 px-3 py-2 rounded-lg">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
            </div>
          </div>

          <div className="bg-gradient-navy p-10 rounded-3xl shadow-2xl border-4 border-bp-gold max-w-md mx-auto">
            <div className="text-sm text-bp-gold-light/90 uppercase tracking-wide mb-2">Preço único</div>
            <div className="text-6xl font-black text-gradient mb-2">R$ 347</div>
            <div className="text-bp-gold-light font-semibold mb-6">Menos de R$ 3,50 por aplicação</div>
            
            <div className="bg-bp-navy-light/50 p-6 rounded-xl mb-6 border border-bp-gold/30">
              <div className="text-sm text-bp-gold-light mb-2 font-semibold">Inclui:</div>
              <ul className="text-left space-y-2 text-sm text-bp-gold-light">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-bp-gold flex-shrink-0 mt-0.5" />
                  <span>Frasco com até 100 aplicações</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-bp-gold flex-shrink-0 mt-0.5" />
                  <span>Protocolo técnico completo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-bp-gold flex-shrink-0 mt-0.5" />
                  <span>Suporte diário + mentoria</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-bp-gold flex-shrink-0 mt-0.5" />
                  <span>Grupo exclusivo de aplicadores</span>
                </li>
              </ul>
            </div>

            <a 
              href="#contato"
              className="block w-full btn-primary py-4 text-lg"
            >
              Garantir Agora
            </a>

            <p className="text-xs text-bp-gold-light/80 mt-6 leading-relaxed">
              Tempo de cura de até 30 minutos conforme condições de aplicação. Rendimento de até 100 aplicações no protocolo recomendado. Exclusividade de 1 aplicador por cidade sujeita à disponibilidade e aprovação.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-b from-bp-gray-light to-bp-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient-navy">Perguntas frequentes</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'Como funciona a nanotecnologia?',
                a: 'Fórmula baseada em partículas nanométricas que criam uma camada ultrafina, transparente e resistente sobre o vidro. Aderência molecular garante proteção duradoura.'
              },
              {
                q: 'Quanto tempo leva para curar?',
                a: 'Até 30 minutos em condições recomendadas de temperatura e umidade. O protocolo técnico especifica todas as condições ideais.'
              },
              {
                q: 'Quantas aplicações consigo fazer?',
                a: 'Até 100 aplicações por frasco seguindo o protocolo recomendado. Rendimento pode variar conforme técnica de aplicação.'
              },
              {
                q: 'Como funciona a exclusividade por cidade?',
                a: 'Apenas 1 aplicador oficial por cidade. Processo de aprovação garante qualidade e proteção do território comercial.'
              },
              {
                q: 'Qual o suporte oferecido?',
                a: 'Suporte técnico diário, grupo exclusivo de aplicadores, mentoria prática com especialistas e material de divulgação profissional.'
              }
            ].map((faq, i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden hover:shadow-xl transition-all group">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-bp-navy hover:bg-white/20 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-2xl text-bp-gold group-hover:text-bp-gold-hover transition-colors">{activeFaq === i ? '−' : '+'}</span>
                </button>
                {activeFaq === i && (
                  <div className="px-6 py-4 bg-white/10 text-bp-navy/90 border-t border-bp-gold/20">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário de Contato */}
      <section id="contato" className="py-20 bg-gradient-to-b from-bp-white to-bp-gray-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gradient-navy">Fale conosco via WhatsApp</h2>
            <p className="text-xl text-bp-navy/80">Resposta rápida direto no seu celular</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <form onSubmit={handleSubmit} className="lg:col-span-3 glass-card p-8 rounded-2xl shadow-lg">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-bp-navy mb-3">Você é:</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['cliente', 'aplicador'] as const).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setFormData({ ...formData, role })}
                      className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                        formData.role === role
                          ? 'bg-gradient-gold text-bp-navy shadow-lg'
                          : 'glass-card text-bp-navy hover:bg-white/20'
                      }`}
                    >
                      {role === 'cliente' ? '👤 Cliente' : '💼 Aplicador'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-bp-navy mb-2">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors glass-card text-bp-navy placeholder-bp-navy/50 ${
                      errors.name ? 'border-red-500' : 'border-bp-gold/20 focus:border-bp-gold'
                    } outline-none`}
                    placeholder="Seu nome completo"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-bp-navy mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors glass-card text-bp-navy placeholder-bp-navy/50 ${
                      errors.email ? 'border-red-500' : 'border-bp-gold/20 focus:border-bp-gold'
                    } outline-none`}
                    placeholder="seu@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-bp-navy mb-2">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors glass-card text-bp-navy placeholder-bp-navy/50 ${
                      errors.city ? 'border-red-500' : 'border-bp-gold/20 focus:border-bp-gold'
                    } outline-none`}
                    placeholder="Sua cidade - UF"
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-bp-navy mb-2">
                    Mensagem (opcional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border-2 border-bp-gold/20 focus:border-bp-gold outline-none transition-colors glass-card text-bp-navy placeholder-bp-navy/50"
                    placeholder="Conte-nos mais sobre seu interesse..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-bp-navy/30 border-t-bp-navy rounded-full animate-spin" />
                    Abrindo WhatsApp...
                  </>
                ) : (
                  <>
                    <Phone className="w-5 h-5" />
                    Enviar para WhatsApp
                  </>
                )}
              </button>

              <p className="text-xs text-bp-navy/60 mt-4 text-center">
                Você será redirecionado para o WhatsApp com uma mensagem pré-preenchida
              </p>
            </form>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gradient-gold p-8 rounded-2xl text-bp-navy shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Garantias e vantagens</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Suporte técnico diário durante toda operação</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Grupo exclusivo no WhatsApp com aplicadores</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Mentoria prática com especialistas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Material de divulgação profissional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Exclusividade territorial garantida</span>
                  </li>
                </ul>
              </div>

              <div className="glass-card p-6 rounded-2xl shadow-lg">
                <h4 className="font-bold text-bp-navy mb-3">Atendimento rápido</h4>
                <p className="text-sm text-bp-navy/80 mb-4">
                  Nossa equipe responde em até 2 horas durante horário comercial
                </p>
                <div className="flex items-center gap-3 text-sm text-bp-navy/90">
                  <Phone className="w-5 h-5 text-bp-gold" />
                  <span>Segunda a Sexta: 8h às 18h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-navy text-bp-gold py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/assets/images/BLINDAPHONE-PERFIL.png" 
                  alt="BLINDAPHONE Logo" 
                  className="w-10 h-10 object-contain"
                />
                <span className="text-xl font-bold">BLINDAPHONE</span>
              </div>
              <p className="text-bp-gold-light/80 text-sm leading-relaxed">
                Nanotecnologia profissional para proteção de smartphones. Ecossistema técnico e lucrativo com suporte completo.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-3 text-gradient">Links rápidos</h4>
              <ul className="space-y-2 text-sm text-bp-gold-light/80">
                <li><a href="#solucao" className="hover:text-bp-gold-light transition">Como funciona</a></li>
                <li><a href="#aplicador" className="hover:text-bp-gold-light transition">Seja aplicador</a></li>
                <li><a href="#depoimentos" className="hover:text-bp-gold-light transition">Depoimentos</a></li>
                <li><a href="#contato" className="hover:text-bp-gold-light transition">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3 text-gradient">Contato</h4>
              <ul className="space-y-2 text-sm text-bp-gold-light/80">
                <li>comercial@blindaphone.com</li>
                <li>Suporte via WhatsApp</li>
                <li>Seg-Sex: 8h às 18h</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-bp-gold-light/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-bp-gold-light/70">
            <p>© {new Date().getFullYear()} BLINDAPHONE. Todos os direitos reservados.</p>
            <p className="text-xs text-center md:text-right max-w-2xl">
              Resultados variam conforme execução do método. Tempo de cura de até 30 minutos em condições recomendadas. 
              Rendimento de até 100 aplicações no protocolo padrão. Exclusividade sujeita à disponibilidade.
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Flutuante */}
      {showWhatsApp && (
        <button
          onClick={openWhatsApp}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-gold rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-50 animate-bounce"
          style={{ animationDuration: '2s' }}
        >
          <Phone className="w-8 h-8 text-bp-navy" />
        </button>
      )}
    </div>
  );
}
