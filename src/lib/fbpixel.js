// lib/fbpixel.js
// Not strictly needed anymore since tracking is inline,
// but keep for future custom events

export const PIXEL_ID = '1437557770682144';

export const pageview = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};