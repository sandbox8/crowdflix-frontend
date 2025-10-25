import { loadStripe } from '@stripe/stripe-js';

// Get Stripe publishable key from environment variables
const stripePublishableKey = (import.meta as any).env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  throw new Error('VITE_STRIPE_PUBLISHABLE_KEY is not defined in environment variables');
}

// Initialize Stripe
export const stripePromise = loadStripe(stripePublishableKey);

// Stripe configuration
export const stripeConfig = {
  publishableKey: stripePublishableKey,
  // Add any additional Stripe configuration here
  appearance: {
    theme: 'night',
    variables: {
      colorPrimary: '#2AA2FD',
      colorBackground: '#1A1A1A',
      colorText: '#FFFFFF',
      colorDanger: '#EF3D37',
      fontFamily: 'Inter, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  },
};
