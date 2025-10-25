import { Button } from "@/shared/components/common/Button/Button";
import { useGetMomentById } from "@/shared/hooks/api/moments/useGetMomentById";
import { useAppSelector } from "@/shared/hooks/useRedux";
import { Radio, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import type { Listing } from "@/api/moments/getMoments";
import clsx from "clsx";
import { useGetPrice } from "@/shared/hooks/api/price/getPrice";
import { enqueueSnackbar } from "notistack";
import { createCheckoutSession } from "@/api/payments/createCheckout";

const Payment = () => {
  const navigate = useNavigate();
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
      enqueueSnackbar(
        error instanceof Error ? error.message : "Failed to process payment",
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        }
      );
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
    <div className="w-full flex mt-[50px] gap-[20px] flex-col items-center">
      <h1 className="text-white text-[52px] font-semibold">Purchase Options</h1>
      <div className="md:flex flex-col md:flex-row gap-5 justify-between w-full">
        <div className="flex flex-col md:p-[40px] p-[20px] bg-[#1A1A1A]/70 backdrop-blur-[35px] rounded-[30px] mb-[40px] w-full max-w-[893px]">
          <div className="flex flex-col gap-2 md:flex-row items-center justify-between">
            <h2 className="font-outfit font-semibold text-sm leading-[22px] text-white">
              {moment?.activeListings?.length || 0} AVAILABLE
            </h2>
            <Select
              radius={100}
              className="md:max-w-[240px] w-full"
              classNames={{
                input:
                  "bg-[#1A1A1A] border h-[40px] border-[#FFC03F]/40 text-[#FFDD99] placeholder:text-[#FFDD99] bg-[#FD4725]/5",
                dropdown:
                  "bg-[#1A1A1A]/10 backdrop-blur-sm border border-[#FFC03F]/40 text-[#FFDD99] rounded-[10px]",
                option: "hover:bg-[#1A1A1A]/60 hover:text-[#FFDD99]",
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
          <div className="w-full lg:max-w-3xl mx-auto mt-8">
            <div className="grid grid-cols-5 items-center text-xs text-gray-400 mb-2 px-8">
              <div className="col-span-2 lg:block hidden">STATUS</div>
              <div className="col-span-1">PRICE</div>
              <div className="col-span-1">USERNAME</div>
            </div>

            {moment?.activeListings?.map((listing) => (
              <div
                key={listing.listing_id}
                className={clsx(
                  "grid md:grid-cols-5 grid-cols-4 items-center py-3 px-8",
                  selectedSeller?.listing_id === listing.listing_id &&
                    "bg-[#442326]/70 backdrop-blur-[40px] rounded-[32px]",
                )}
              >
                <Radio
                  variant="outline"
                  size="md"
                  color="#EF3D37"
                  classNames={{
                    radio:
                      "bg-transparent border-white/20 checked:border-[#EF3D37]",
                  }}
                  checked={selectedSeller?.listing_id === listing.listing_id}
                  onChange={() => setSelectedSeller(listing)}
                />
                <div className="font-outfit font-medium text-[14px] lg:block hidden leading-[14px] tracking-[-0.01em] text-white">
                  {listing.status}
                </div>
                <div className="font-outfit font-medium text-[14px] leading-[14px] tracking-[-0.01em] text-white">
                  ${getUsdPrice(listing.price)}
                </div>
                <div className="col-span-2 flex items-center space-x-2">
                  <img
                    src="/images/userpick.png"
                    className="w-8 h-8 rounded-full ring-2 ring-[#C8FE36]"
                    alt="avatar"
                  />
                  <span className="font-outfit text-overflow-ellipsis overflow-hidden text-ellipsis font-medium text-[14px] leading-[14px] tracking-[-0.01em] text-white">
                    {listing.seller.username}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-full max-w-[427px] bg-[#1A1A1A]/70 backdrop-blur-[35px] rounded-[30px] p-5 text-black h-fit">
          <div className="flex flex-col p-[30px] bg-white rounded-3xl">
            <div className="flex gap-4">
              <div className="w-16 h-24 flex-shrink-0">
                <img
                  src={moment?.poster_url || "/images/paymentCardPlaceholder.png"}
                  alt="cover"
                  className="w-full h-full rounded-md object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-500 text-[10px] text-white font-medium px-2 py-0.5 rounded-full uppercase">
                    Moments
                  </span>
                </div>
                <h2 className="mt-2 text-lg font-semibold leading-tight">
                  {moment?.title || "Moment"}
                </h2>
                <p className="text-xs opacity-60 mt-1">
                  {moment?.characters?.[0]?.name || "Character"}
                </p>
              </div>
            </div>

            <div className="mt-4 border-t border-gray-700 pt-3">
              <div className="flex items-center justify-between">
                <p className="text-xs opacity-60">Total Amount</p>
                <div>
                  <p className="font-outfit font-bold text-3xl">
                    ${selectedSeller ? getUsdPrice(selectedSeller.price) : "0.00"}
                  </p>
                  {selectedSeller && oneFlowPrice && (
                    <p className="text-gray-400 uppercase text-xs ml-[5px]">
                      ({selectedSeller.price} FLOW)
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <Button
            h={60}
            className="mt-5 w-full transition font-medium rounded-full py-2 text-white"
            variant="filled"
            color="#2AA2FD"
            onClick={handlePayment}
            disabled={!selectedSeller || isProcessing}
            loading={isProcessing}
          >
            {isProcessing ? "Redirecting to Stripe..." : "Pay with Card"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;