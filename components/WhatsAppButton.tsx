'use client'

import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  delay?: number;
}

export default function WhatsAppButton({ 
  phoneNumber, 
  message = 'Olá! Quero saber mais sobre BLINDAPHONE.',
  delay = 3000 
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-50 animate-bounce"
      style={{ animationDuration: '2s' }}
      aria-label="Falar no WhatsApp"
    >
      <Phone className="w-8 h-8 text-white" />
    </button>
  );
}
