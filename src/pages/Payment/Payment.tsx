import { Button } from "@/shared/components/common/Button/Button";
import { useGetMomentById } from "@/shared/hooks/api/moments/useGetMomentById";
import { useAppSelector } from "@/shared/hooks/useRedux";
import { Radio, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Listing } from "@/api/moments/getMoments";
import clsx from "clsx";
import { useGetPrice } from "@/shared/hooks/api/price/getPrice";
import { enqueueSnackbar } from "notistack";
import { createCheckoutSession } from "@/api/payments/createCheckout";

const Payment = () => {
  const { id } = useParams();
  const [, setSortBy] = useState<string>("");
  const { data: moment } = useGetMomentById(id || "");
  const { user } = useAppSelector((state) => state.user);
  const [selectedSeller, setSelectedSeller] = useState<Listing | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { data: oneFlowPrice } = useGetPrice();

  useEffect(() => {
    if (moment) {
      setSelectedSeller(moment.activeListings?.[0] || null);
    }
  }, [moment]);

  const handlePayment = async () => {
    if (!user) {
      enqueueSnackbar("Please sign in to make a purchase", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return;
    }

    if (!selectedSeller) {
      enqueueSnackbar("Please select a seller", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Get the first edition from the listing
      const editionId = selectedSeller.edition?.edition_id;
      
      if (!editionId) {
        throw new Error("No edition found for this listing");
      }

      // Create Stripe Checkout session
      const response = await createCheckoutSession({
        edition_id: editionId,
        listing_id: selectedSeller.listing_id,
        amount: getUsdPrice(selectedSeller.price),
        currency: "USD",
        payment_method: "stripe",
      });

      if (response.success && response.data.checkoutUrl) {
        // Redirect to Stripe Checkout
        window.location.href = response.data.checkoutUrl;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      
      // Enhanced error handling with specific messages
      let errorMessage = "Failed to process payment";
      
      if (error instanceof Error) {
        // Check for specific error types
        if (error.message.includes("No edition found")) {
          errorMessage = "This listing is no longer available. Please try another moment.";
        } else if (error.message.includes("insufficient")) {
          errorMessage = "Insufficient funds. Please check your payment method.";
        } else if (error.message.includes("network") || error.message.includes("timeout")) {
          errorMessage = "Network error. Please check your connection and try again.";
        } else if (error.message.includes("unauthorized") || error.message.includes("401")) {
          errorMessage = "Session expired. Please sign in again.";
        } else if (error.message.includes("forbidden") || error.message.includes("403")) {
          errorMessage = "You don't have permission to purchase this item.";
        } else if (error.message.includes("not found") || error.message.includes("404")) {
          errorMessage = "This moment is no longer available.";
        } else if (error.message.includes("server") || error.message.includes("500")) {
          errorMessage = "Server error. Please try again in a few moments.";
        } else {
          errorMessage = error.message;
        }
      }
      
      enqueueSnackbar(errorMessage, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        autoHideDuration: 6000, // Show longer for error messages
      });
      
      setIsProcessing(false);
    }
  };

  const getUsdPrice = (flowPrice: string) => {
    if (oneFlowPrice) {
      return (Number(flowPrice) * oneFlowPrice).toFixed(2);
    }
    return "0.00";
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-black text-5xl lg:text-6xl uppercase mb-3 bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
            Purchase Moment
          </h1>
          <p className="text-white/60">
            Select a listing and complete your purchase
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Available Listings */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-black text-xl uppercase text-white">
                  {moment?.activeListings?.length || 0} Available Listings
                </h2>
                <Select
                  radius={100}
                  className="w-[180px]"
                  classNames={{
                    input:
                      "bg-black/40 border h-[40px] border-[#2AA2FD]/40 text-white placeholder:text-white/50",
                    dropdown:
                      "bg-black backdrop-blur-xl border border-[#2AA2FD]/30 text-white rounded-xl",
                    option: "hover:bg-[#2AA2FD]/20 hover:text-white text-white",
                  }}
                  placeholder="Sort by"
                  onChange={(value) => {
                    if (value) {
                      setSortBy(value as "title" | "created_at" | "tier");
                    }
                  }}
                  data={[
                    { value: "title", label: "Title" },
                    { value: "created_at", label: "Newest" },
                    { value: "tier", label: "Tier" },
                  ]}
                />
              </div>

              <div className="space-y-3">
                {moment?.activeListings?.map((listing) => (
                  <div
                    key={listing.listing_id}
                    onClick={() => setSelectedSeller(listing)}
                    className={clsx(
                      "grid grid-cols-4 items-center p-4 rounded-2xl cursor-pointer transition-all border-2",
                      selectedSeller?.listing_id === listing.listing_id
                        ? "bg-gradient-to-r from-[#2AA2FD]/20 to-[#1e90ff]/20 border-[#2AA2FD]"
                        : "bg-white/5 border-white/10 hover:border-white/30",
                    )}
                  >
                    <Radio
                      variant="outline"
                      size="md"
                      color="#2AA2FD"
                      classNames={{
                        radio:
                          "bg-transparent border-white/20 checked:border-[#2AA2FD]",
                      }}
                      checked={selectedSeller?.listing_id === listing.listing_id}
                      onChange={() => setSelectedSeller(listing)}
                    />
                    <div className="font-bold text-lg text-white">
                      ${getUsdPrice(listing.price)}
                    </div>
                    <div className="col-span-2 flex items-center space-x-2">
                      <img
                        src="/images/userpick.png"
                        className="w-8 h-8 rounded-full ring-2 ring-[#2AA2FD]/40"
                        alt="avatar"
                      />
                      <span className="font-medium text-sm text-white truncate">
                        {listing.seller.username}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 sticky top-24">
              <h3 className="font-black text-lg uppercase mb-4 text-white">
                Order Summary
              </h3>

              <div className="flex gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="w-20 h-28 flex-shrink-0 rounded-xl overflow-hidden">
                  <img
                    src={moment?.poster_url || "/images/paymentCardPlaceholder.png"}
                    alt="cover"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#2AA2FD] text-[10px] text-white font-bold px-2 py-1 rounded-full uppercase">
                      {moment?.tier || "Moment"}
                    </span>
                  </div>
                  <h2 className="font-bold text-base text-white leading-tight mb-1">
                    {moment?.title || "Moment"}
                  </h2>
                  <p className="text-xs text-white/60">
                    {moment?.characters?.[0]?.name || "Character"}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">Price</span>
                  <span className="font-black text-2xl text-white">
                    ${selectedSeller ? getUsdPrice(selectedSeller.price) : "0.00"}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-sm font-bold text-white uppercase">Total</span>
                  <span className="font-black text-3xl text-white">
                    ${selectedSeller ? getUsdPrice(selectedSeller.price) : "0.00"}
                  </span>
                </div>
              </div>

              <Button
                h={60}
                className="w-full transition font-black uppercase tracking-wider rounded-2xl text-white bg-gradient-to-r from-[#2AA2FD] to-[#1e90ff] hover:from-[#1e90ff] hover:to-[#2AA2FD] hover:scale-[1.02]"
                onClick={handlePayment}
                disabled={!selectedSeller || isProcessing}
                loading={isProcessing}
              >
                {isProcessing ? "Processing..." : "Pay with Card"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;