import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/shared/components/common/Button/Button';
import { MintingStatus } from '@/shared/components/payment/MintingStatus';
import { useGetOrderStatus } from '@/shared/hooks/api/orders/useGetOrderStatus';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const paymentIntentId = searchParams.get('payment_intent');
  const amount = searchParams.get('amount');
  const orderId = searchParams.get('order_id');
  
  const [pollingTimeout, setPollingTimeout] = useState(false);
  const [showMintingStatus, setShowMintingStatus] = useState(false);

  // Poll order status every 3 seconds for up to 30 seconds
  const { data: orderStatus, isLoading, refetch } = useGetOrderStatus(
    orderId || '',
    {
      enabled: !!orderId,
      refetchInterval: (query) => {
        // Stop polling if minted, failed, or timeout reached
        if (pollingTimeout) return false;
        const data = query.state.data as any;
        if (data?.nft_status === 'minted' || data?.nft_status === 'failed') {
          return false;
        }
        return 3000; // Poll every 3 seconds
      },
    }
  );

  // Set timeout after 30 seconds
  useEffect(() => {
    if (orderId) {
      setShowMintingStatus(true);
      const timeout = setTimeout(() => {
        setPollingTimeout(true);
      }, 30000); // 30 seconds

      return () => clearTimeout(timeout);
    }
  }, [orderId]);

  const handleViewCollection = () => {
    // Set session flag for profile to auto-refresh
    sessionStorage.setItem('payment_success', 'true');
    navigate('/profile');
  };

  const handleRetry = () => {
    setPollingTimeout(false);
    refetch();
  };

  // Show minting status if we have an order ID
  if (showMintingStatus && orderId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <MintingStatus
            status={
              isLoading ? 'unknown' :
              (orderStatus as any)?.nft_status === 'minted' ? 'minted' :
              (orderStatus as any)?.nft_status === 'failed' ? 'failed' :
              pollingTimeout ? 'failed' : 'pending'
            }
            errorMessage={(orderStatus as any)?.error_message}
            onRetry={handleRetry}
            onViewCollection={(orderStatus as any)?.nft_status === 'minted' ? handleViewCollection : undefined}
          />
          
          {/* Show payment details */}
          {(amount || paymentIntentId) && (
            <div className="mt-4 bg-[#1A1A1A]/70 backdrop-blur-[35px] rounded-[30px] p-4 border border-white/10">
              {amount && (
                <div className="bg-[#2AA2FD]/10 border border-[#2AA2FD]/30 rounded-lg p-3 mb-3">
                  <p className="text-white/80 text-sm">Amount Paid</p>
                  <p className="text-white font-semibold text-lg">${amount}</p>
                </div>
              )}
              
              {paymentIntentId && (
                <div className="bg-[#1A1A1A] border border-[#FFC03F]/20 rounded-lg p-3">
                  <p className="text-white/60 text-xs">Transaction ID</p>
                  <p className="text-white/80 text-sm font-mono break-all">
                    {paymentIntentId}
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* Fallback actions */}
          <div className="mt-4 space-y-2">
            <Link to="/marketplace" className="block">
              <Button 
                variant="outline" 
                className="w-full border-[#FFC03F]/40 text-[#FFDD99] hover:bg-[#FFC03F]/10 rounded-full"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Fallback: Original success page if no order ID
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1A1A1A]/70 backdrop-blur-[35px] rounded-[30px] p-8 text-center border border-[#2AA2FD]/20">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-[#2AA2FD] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Payment Successful!</h1>
          <p className="text-white/70">
            Your NFT has been purchased and will be minted shortly.
          </p>
        </div>

        {amount && (
          <div className="bg-[#2AA2FD]/10 border border-[#2AA2FD]/30 rounded-lg p-4 mb-6">
            <p className="text-white/80 text-sm">Amount Paid</p>
            <p className="text-white font-semibold text-xl">${amount}</p>
          </div>
        )}

        {paymentIntentId && (
          <div className="bg-[#1A1A1A] border border-[#FFC03F]/20 rounded-lg p-3 mb-6">
            <p className="text-white/60 text-xs">Transaction ID</p>
            <p className="text-white/80 text-sm font-mono break-all">
              {paymentIntentId}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Link to="/profile" className="block">
            <Button className="w-full bg-gradient-to-r from-[#2AA2FD] to-[#BA55D3] text-white font-semibold rounded-full">
              View My Collection
            </Button>
          </Link>
          
          <Link to="/marketplace" className="block">
            <Button 
              variant="outline" 
              className="w-full border-[#FFC03F]/40 text-[#FFDD99] hover:bg-[#FFC03F]/10 rounded-full"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-white/60 text-sm">
            You'll receive an email confirmation shortly. Your NFT will appear in your collection once minting is complete.
          </p>
        </div>
      </div>
    </div>
  );
};

const PaymentFailure: React.FC = () => {
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1A1A1A]/70 backdrop-blur-[35px] rounded-[30px] p-8 text-center border border-[#EF3D37]/20">
        <div className="mb-6">
          <XCircle className="w-16 h-16 text-[#EF3D37] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Payment Failed</h1>
          <p className="text-white/70">
            We couldn't process your payment. Please try again.
          </p>
        </div>

        {error && (
          <div className="bg-[#EF3D37]/10 border border-[#EF3D37]/30 rounded-lg p-4 mb-6">
            <p className="text-[#EF3D37] text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-3">
          <Link to="/marketplace" className="block">
            <Button className="w-full bg-gradient-to-r from-[#2AA2FD] to-[#BA55D3] text-white font-semibold rounded-full">
              Try Again
            </Button>
          </Link>
          
          <Link to="/" className="block">
            <Button 
              variant="outline" 
              className="w-full border-[#FFC03F]/40 text-[#FFDD99] hover:bg-[#FFC03F]/10 rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-white/60 text-sm">
            If you continue to experience issues, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

const PaymentCancel: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1A1A1A]/70 backdrop-blur-[35px] rounded-[30px] p-8 text-center border border-[#FFC03F]/20">
        <div className="mb-6">
          <XCircle className="w-16 h-16 text-[#FFC03F] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Payment Cancelled</h1>
          <p className="text-white/70">
            You cancelled the payment. No charges were made.
          </p>
        </div>

        {orderId && (
          <div className="bg-[#1A1A1A] border border-[#FFC03F]/20 rounded-lg p-3 mb-6">
            <p className="text-white/60 text-xs">Order ID</p>
            <p className="text-white/80 text-sm font-mono break-all">
              {orderId}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Link to="/marketplace" className="block">
            <Button className="w-full bg-gradient-to-r from-[#2AA2FD] to-[#BA55D3] text-white font-semibold rounded-full">
              Back to Marketplace
            </Button>
          </Link>
          
          <Link to="/" className="block">
            <Button 
              variant="outline" 
              className="w-full border-[#FFC03F]/40 text-[#FFDD99] hover:bg-[#FFC03F]/10 rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-white/60 text-sm">
            Your items are still available. You can try purchasing again whenever you're ready.
          </p>
        </div>
      </div>
    </div>
  );
};

export { PaymentSuccess, PaymentFailure, PaymentCancel };
