// Meta Pixel Configuration
// Replace YOUR_PIXEL_ID with your actual Facebook Pixel ID

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || 'YOUR_PIXEL_ID';

// Track page views
export const pageview = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// Track events
export const event = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
  }
};

// Track custom events
export const trackCustomEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, parameters);
  }
};

// Declare fbq function
declare global {
  interface Window {
    fbq: (
      command: 'init' | 'track' | 'trackCustom',
      targetId?: string,
      config?: Record<string, any>
    ) => void;
  }
}
