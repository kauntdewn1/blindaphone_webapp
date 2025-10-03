import raw from './copy-blindaphone.json';

export const copy = raw;

// Helper to check text length against a numeric limit
export function checkLength(text = '', limit) {
  if (!text || !limit || typeof limit !== 'number') return { ok: true, length: text?.length || 0 };
  const length = text.length;
  return { ok: length <= limit, length };
}

// Dev-only validator for ad limits (best effort; logs warnings in development)
export function devValidateAds() {
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') return;
  try {
    const meta = copy.ads?.meta;
    const google = copy.ads?.google;
    if (!meta || !google) return;
    const limits = {
      meta: { primary: 125, headline: 40, description: 30 },
      google: { headline: 30, description: 90 }
    };
    // No concrete strings here to validate, but if added later use the helper.
    // This function stays as a central place to validate ad blocks when present.
  } catch (e) {
    // noop
  }
}

export default copy;

