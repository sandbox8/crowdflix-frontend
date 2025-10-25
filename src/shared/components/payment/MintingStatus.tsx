import React from 'react';
import { CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface MintingStatusProps {
  status: 'pending' | 'minted' | 'failed' | 'unknown';
  errorMessage?: string;
  onRetry?: () => void;
  onViewCollection?: () => void;
}

export const MintingStatus: React.FC<MintingStatusProps> = ({
  status,
  errorMessage,
  onRetry,
  onViewCollection,
}) => {
  const renderStatusContent = () => {
    switch (status) {
      case 'pending':
        return (
          <div className="text-center">
            <div className="mb-4">
              <Loader2 className="w-12 h-12 text-[#2AA2FD] mx-auto animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Minting Your NFT...
            </h3>
            <p className="text-white/70 text-sm">
              Please wait while we create your digital collectible. This usually takes 10-30 seconds.
            </p>
          </div>
        );

      case 'minted':
        return (
          <div className="text-center">
            <div className="mb-4">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              NFT Minted Successfully!
            </h3>
            <p className="text-white/70 text-sm mb-4">
              Your digital collectible is ready and has been added to your collection.
            </p>
            {onViewCollection && (
              <Button
                onClick={onViewCollection}
                className="bg-gradient-to-r from-[#2AA2FD] to-[#BA55D3] text-white font-semibold rounded-full px-6"
              >
                View My Collection
              </Button>
            )}
          </div>
        );

      case 'failed':
        return (
          <div className="text-center">
            <div className="mb-4">
              <XCircle className="w-12 h-12 text-[#EF3D37] mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Minting Failed
            </h3>
            <p className="text-white/70 text-sm mb-4">
              {errorMessage || 'There was an error creating your NFT. Your payment was processed successfully.'}
            </p>
            <div className="space-y-2">
              {onRetry && (
                <Button
                  onClick={onRetry}
                  variant="outline"
                  className="w-full border-[#FFC03F]/40 text-[#FFDD99] hover:bg-[#FFC03F]/10 rounded-full"
                >
                  Try Again
                </Button>
              )}
              <p className="text-white/60 text-xs">
                Order support at{' '}
                <a 
                  href="mailto:support@crowdflix.io" 
                  className="text-[#2AA2FD] hover:underline"
                >
                  support@crowdflix.io
                </a>
              </p>
            </div>
          </div>
        );

      case 'unknown':
      default:
        return (
          <div className="text-center">
            <div className="mb-4">
              <AlertCircle className="w-12 h-12 text-[#FFC03F] mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Checking Status...
            </h3>
            <p className="text-white/70 text-sm">
              We're verifying your NFT creation status.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="bg-[#1A1A1A]/70 backdrop-blur-[35px] rounded-[30px] p-6 border border-white/10">
      {renderStatusContent()}
    </div>
  );
};
