'use client'

import { useState } from 'react';
import { Phone, CheckCircle } from 'lucide-react';

interface ContactFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

export default function ContactForm({ onSubmit, isSubmitting }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    role: 'cliente' as 'cliente' | 'aplicador',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-lg">
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-3">Você é:</label>
        <div className="grid grid-cols-2 gap-3">
          {(['cliente', 'aplicador'] as const).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setFormData({ ...formData, role })}
              className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                formData.role === role
                  ? 'bg-gradient-to-r from-rose-600 to-orange-500 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {role === 'cliente' ? '👤 Cliente' : '💼 Aplicador'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Nome completo *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
              errors.name ? 'border-red-500' : 'border-slate-200 focus:border-rose-500'
            } outline-none`}
            placeholder="Seu nome completo"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            E-mail
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
              errors.email ? 'border-red-500' : 'border-slate-200 focus:border-rose-500'
            } outline-none`}
            placeholder="seu@email.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Cidade *
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
              errors.city ? 'border-red-500' : 'border-slate-200 focus:border-rose-500'
            } outline-none`}
            placeholder="Sua cidade - UF"
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Mensagem (opcional)
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-rose-500 outline-none transition-colors"
            placeholder="Conte-nos mais sobre seu interesse..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full bg-gradient-to-r from-rose-600 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Abrindo WhatsApp...
          </>
        ) : (
          <>
            <Phone className="w-5 h-5" />
            Enviar para WhatsApp
          </>
        )}
      </button>

      <p className="text-xs text-slate-500 mt-4 text-center">
        Você será redirecionado para o WhatsApp com uma mensagem pré-preenchida
      </p>
    </form>
  );
}
