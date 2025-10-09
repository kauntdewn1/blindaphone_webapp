// Type definitions for BLINDAPHONE

export interface FormData {
  name: string;
  email: string;
  city: string;
  role: 'cliente' | 'aplicador';
  message: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface Testimonial {
  name: string;
  city: string;
  revenue: string;
  apps: string;
  stars: number;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  delay?: number;
}

export interface ContactFormProps {
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
}

export interface CountdownTimerProps {
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
  onComplete?: () => void;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Analytics event types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Meta Pixel event types
export interface PixelEvent {
  eventName: string;
  parameters?: Record<string, any>;
}

// Form validation rules
export interface ValidationRules {
  [key: string]: (value: any) => string | null;
}

// Component props
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Navigation items
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// Feature items
export interface FeatureItem {
  icon: React.ComponentType<any>;
  text: string;
}

// Step items
export interface StepItem {
  step: string;
  title: string;
  desc: string;
}

// Pricing items
export interface PricingItem {
  title: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}
