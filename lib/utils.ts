// Utility functions for BLINDAPHONE

// Format phone number for WhatsApp
export const formatWhatsAppPhone = (phone: string): string => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Add country code if not present
  if (cleaned.length === 11 && cleaned.startsWith('11')) {
    return `55${cleaned}`;
  }
  
  if (cleaned.length === 10) {
    return `5511${cleaned}`;
  }
  
  return cleaned;
};

// Format currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

// Format date
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+55)?\s?\(?[1-9]{2}\)?\s?[0-9]{4,5}-?[0-9]{4}$/;
  return phoneRegex.test(phone);
};

// Generate WhatsApp message
export const generateWhatsAppMessage = (data: {
  name: string;
  email?: string;
  city: string;
  role: 'cliente' | 'aplicador';
  message?: string;
}): string => {
  const { name, email, city, role, message } = data;
  
  const roleText = role === 'aplicador' ? 'interessado em ser aplicador oficial' : 'cliente interessado';
  
  const msg = [
    `Olá! Sou *${roleText}*.`,
    ``,
    `📋 *Dados:*`,
    `• Nome: ${name}`,
    email ? `• E-mail: ${email}` : '',
    `• Cidade: ${city}`,
    message ? `\n💬 Mensagem: ${message}` : '',
    ``,
    `Quero mais informações sobre *BLINDAPHONE*.`
  ].filter(Boolean).join('\n');
  
  return msg;
};

// Scroll to element
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Copy to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};
