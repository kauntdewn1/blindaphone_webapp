// Constants for BLINDAPHONE

export const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '5562993737713';

export const SITE_CONFIG = {
  name: 'BLINDAPHONE',
  description: 'Proteja seu smartphone com nanotecnologia invisível',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://blindaphone.com.br',
  email: 'comercial@blindaphone.com',
  phone: WHATSAPP_PHONE,
};

export const PRICING = {
  price: 347,
  currency: 'BRL',
  applications: 100,
  pricePerApplication: 3.47,
};

export const FEATURES = [
  {
    icon: 'Shield',
    text: 'Nanotecnologia',
  },
  {
    icon: 'Clock',
    text: 'Cura em 30min',
  },
  {
    icon: 'Droplets',
    text: '100 aplicações',
  },
  {
    icon: 'CheckCircle',
    text: 'Limpo e preciso',
  },
];

export const STEPS = [
  {
    step: '01',
    title: 'Fórmula nanotecnológica',
    desc: 'Composição baseada em nanotecnologia para máxima aderência e durabilidade. Camada ultrafina e transparente.',
  },
  {
    step: '02',
    title: 'Aplicação limpa',
    desc: 'Método preciso que não escorre entre botões. Protocolo profissional para resultado uniforme e resistente.',
  },
  {
    step: '03',
    title: 'Cura em até 30 minutos',
    desc: 'Tempo de cura controlado em condições recomendadas. Proteção ativa após o processo completo.',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Carlos Silva',
    city: 'São Paulo-SP',
    revenue: 'R$ 28.400',
    apps: '142 aplicações/mês',
    stars: 5,
  },
  {
    name: 'Marina Costa',
    city: 'Belo Horizonte-MG',
    revenue: 'R$ 31.200',
    apps: '156 aplicações/mês',
    stars: 5,
  },
  {
    name: 'Ricardo Alves',
    city: 'Curitiba-PR',
    revenue: 'R$ 26.800',
    apps: '134 aplicações/mês',
    stars: 5,
  },
];

export const FAQ_ITEMS = [
  {
    q: 'Como funciona a nanotecnologia?',
    a: 'Fórmula baseada em partículas nanométricas que criam uma camada ultrafina, transparente e resistente sobre o vidro. Aderência molecular garante proteção duradoura.',
  },
  {
    q: 'Quanto tempo leva para curar?',
    a: 'Até 30 minutos em condições recomendadas de temperatura e umidade. O protocolo técnico especifica todas as condições ideais.',
  },
  {
    q: 'Quantas aplicações consigo fazer?',
    a: 'Até 100 aplicações por frasco seguindo o protocolo recomendado. Rendimento pode variar conforme técnica de aplicação.',
  },
  {
    q: 'Como funciona a exclusividade por cidade?',
    a: 'Apenas 1 aplicador oficial por cidade. Processo de aprovação garante qualidade e proteção do território comercial.',
  },
  {
    q: 'Qual o suporte oferecido?',
    a: 'Suporte técnico diário, grupo exclusivo de aplicadores, mentoria prática com especialistas e material de divulgação profissional.',
  },
];

export const BENEFITS = [
  'Suporte técnico diário',
  'Grupo exclusivo de aplicadores',
  'Mentoria prática com especialistas',
  'Exclusividade: 1 aplicador oficial por cidade',
  'Material de divulgação profissional',
  'Protocolo técnico completo',
];

export const NAV_ITEMS = [
  { label: 'Solução', href: '#solucao' },
  { label: 'Seja Aplicador', href: '#aplicador' },
  { label: 'Resultados', href: '#depoimentos' },
];

export const SOCIAL_LINKS = {
  whatsapp: `https://wa.me/${WHATSAPP_PHONE}`,
  email: 'comercial@blindaphone.com',
  phone: WHATSAPP_PHONE,
};

export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'page_view',
  FORM_SUBMIT: 'form_submit',
  WHATSAPP_CLICK: 'whatsapp_click',
  CTA_CLICK: 'cta_click',
  FAQ_OPEN: 'faq_open',
  SCROLL_DEPTH: 'scroll_depth',
};

export const FORM_VALIDATION_RULES = {
  name: (value: string) => {
    if (!value.trim() || value.length < 3) {
      return 'Nome completo é obrigatório';
    }
    return null;
  },
  email: (value: string) => {
    if (value && !/\S+@\S+\.\S+/.test(value)) {
      return 'E-mail inválido';
    }
    return null;
  },
  city: (value: string) => {
    if (!value.trim()) {
      return 'Cidade é obrigatória';
    }
    return null;
  },
};

export const COUNTDOWN_CONFIG = {
  initialHours: 23,
  initialMinutes: 59,
  initialSeconds: 59,
};

export const ANIMATION_DELAYS = {
  hero: 0,
  features: 200,
  steps: 400,
  testimonials: 600,
  pricing: 800,
  faq: 1000,
  contact: 1200,
};
