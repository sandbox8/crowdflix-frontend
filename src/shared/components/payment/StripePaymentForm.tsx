import React, { useState } from 'react';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { stripePromise } from '@/shared/config/stripe.config';
import { Button } from '@/shared/components/common/Button/Button';
import { enqueueSnackbar } from 'notistack';

interface StripePaymentFormProps {
  amount: number;
  currency?: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
  disabled?: boolean;
}

const PaymentForm: React.FC<StripePaymentFormProps> = ({
  amount,
  currency = 'usd',
  onSuccess,
  onError,
  disabled = false,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Create payment intent on backend
      const response = await fetch('/api/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add auth headers here
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to cents
          currency,
        }),
      });

      const { clientSecret } = await response.json();

      if (!clientSecret) {
        throw new Error('Failed to create payment intent');
      }

      // Confirm payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
        onError(stripeError.message || 'Payment failed');
      } else if (paymentIntent?.status === 'succeeded') {
        onSuccess(paymentIntent.id);
        enqueueSnackbar('Payment successful!', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed';
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-[#1A1A1A]/70 backdrop-blur-[35px] rounded-[20px] p-6 border border-[#FFC03F]/20">
        <h3 className="text-white text-lg font-semibold mb-4">Payment Details</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-white/80 mb-2">
            Card Information
          </label>
          <div className="bg-[#1A1A1A] border border-[#FFC03F]/40 rounded-lg p-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#FFFFFF',
                    '::placeholder': {
                      color: '#FFDD99',
                    },
                  },
                  invalid: {
                    color: '#EF3D37',
                  },
                },
              }}
            />
          </div>
        </div>

        {error && (
          <div className="bg-[#EF3D37]/20 border border-[#EF3D37]/40 rounded-lg p-3 mb-4">
            <p className="text-[#EF3D37] text-sm">{error}</p>
          </div>
        )}

        <div className="bg-[#2AA2FD]/10 border border-[#2AA2FD]/30 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-white/80 text-sm">Total Amount</span>
            <span className="text-white font-semibold text-lg">
              ${amount.toFixed(2)} {currency.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <Button
        disabled={!stripe || isProcessing || disabled}
        className="w-full h-12 bg-gradient-to-r from-[#2AA2FD] to-[#BA55D3] hover:from-[#1E8CE8] hover:to-[#A844C7] text-white font-semibold rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleSubmit}
      >
        {isProcessing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </Button>
    </form>
  );
};

const StripePaymentForm: React.FC<StripePaymentFormProps> = (props) => {
  return (
    <Elements stripe={stripePromise} options={{
      appearance: {
        theme: 'night' as const,
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
    }}>
      <PaymentForm {...props} />
    </Elements>
  );
};

export default StripePaymentForm;
