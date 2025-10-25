import { Button } from "@/shared/components/ui/button";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { useGetMomentById } from "@/shared/hooks/api/moments/useGetMomentById";
import { Loader, Input } from "@mantine/core";
import { useAppSelector } from "@/shared/hooks/useRedux";
import { useEffect, useMemo, useState } from "react";
import { useGetPrice } from "@/shared/hooks/api/price/getPrice";
import {
  sendPrepareUserTransactionForSell,
  sendTransactionForCancelListing,
  sendTransactionForEditListingPrice,
  sendTransactionForSellNFT,
} from "../Payment/transactions";
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Wallet,
  Info,
  ChevronLeft,
  ChevronRight,
  Tag as TagIcon,
} from "lucide-react";
import { MomentVideoPlayer } from "@/shared/components/common/MomentVideoPlayer";
import { ImageWithFallback } from "@/shared/components/common/ImageWithFallback";

export const SpecificMoment = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const flow_token_id = searchParams.get("flow_token_id");
  const edition_id = searchParams.get("edition_id");
  const { data: moment, isLoading } = useGetMomentById(id || "");
  const [price, setPrice] = useState<string>("");
  const { user } = useAppSelector((state) => state.user);
  const { data: oneFlowPrice } = useGetPrice();
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const isListed = useMemo(() => {
    return moment?.activeListings?.some(
      (listing) => listing.edition.edition_id === edition_id,
    );
  }, [moment, edition_id]);

  useEffect(() => {
    if (isListed) {
      const edition = moment?.activeListings?.find(
        (listing) => listing.edition.edition_id === edition_id,
      );
      setPrice(Number(edition?.price).toFixed(2) || "");
    }
  }, [isListed, moment, edition_id]);

  if (isLoading || !moment) {
    return (
      <div className="min-h-screen bg-black flex w-full justify-center items-center">
        <Loader size="xl" color="#2AA2FD" />
      </div>
    );
  }

  // Three-sided collectible: The Moment, The Movie, The Universe
  const mediaItems = [
    {
      type: "moment" as const,
      url: moment.video_url || moment.poster_url || "",
      thumbnail: moment.poster_url || "",
      label: "The Moment",
    },
    {
      type: "poster" as const,
      url: moment.movie?.poster_url || moment.poster_url || "",
      thumbnail: moment.movie?.poster_url || moment.poster_url || "",
      label: "The Movie",
    },
    {
      type: "universe" as const,
      url: moment.movie?.universe?.logo_url || moment.poster_url || "",
      thumbnail: moment.movie?.universe?.logo_url || moment.poster_url || "",
      label: "The Universe",
    },
  ];

  const nextMedia = () => {
    setActiveMediaIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevMedia = () => {
    setActiveMediaIndex(
      (prev) => (prev - 1 + mediaItems.length) % mediaItems.length,
    );
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
  };

  const handleSellMoment = async () => {
    if (user?.is_ready_to_sell) {
      await sendTransactionForSellNFT(
        flow_token_id || "",
        edition_id || "",
        price || "",
      );
    } else {
      await sendPrepareUserTransactionForSell();
    }
  };

  const handleCancelListing = async () => {
    const currentListing = moment?.activeListings?.find(
      (listing) => listing.edition.edition_id === edition_id,
    );
    await sendTransactionForCancelListing(
      currentListing?.listing_id || "",
      flow_token_id || "",
    );
  };

  const handleEditListingPrice = async () => {
    const currentListing = moment?.activeListings?.find(
      (listing) => listing.edition.edition_id === edition_id,
    );
    await sendTransactionForEditListingPrice(
      currentListing?.listing_id || "",
      flow_token_id || "",
      price || "",
    );
  };

  const getRarityColor = (rarity: string) => {
    const colors = {
      legendary: {
        bg: "from-purple-600 to-pink-600",
        text: "text-purple-400",
      },
      rare: { bg: "from-orange-600 to-red-600", text: "text-orange-400" },
      epic: { bg: "from-blue-600 to-cyan-600", text: "text-cyan-400" },
      common: { bg: "from-gray-600 to-gray-700", text: "text-gray-400" },
    };
    return colors[rarity as keyof typeof colors] || colors.rare;
  };

  const rarityColors = getRarityColor(moment.tier);

  const avgSale = moment.activeListings?.length
    ? moment.activeListings.reduce(
        (sum, current) => Number(sum) + Number(current.price),
        0,
      ) / moment.activeListings.length
    : undefined;

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-wide">Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT: Three-Sided Collectible Viewer */}
          <div className="space-y-4 max-w-xl mx-auto lg:mx-0 w-full">
            {/* Main Viewer */}
            <div className="relative aspect-square bg-black rounded-2xl overflow-hidden border border-white/10">
              {mediaItems[activeMediaIndex].type === "moment" &&
              moment.video_url ? (
                <MomentVideoPlayer
                  videoUrl={mediaItems[activeMediaIndex].url}
                  posterUrl={moment.poster_url || ""}
                  title={moment.characters?.[0]?.name || moment.title}
                  autoPlay
                  loop
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-4">
                  <ImageWithFallback
                    src={mediaItems[activeMediaIndex].url}
                    alt={mediaItems[activeMediaIndex].label}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}

              {/* Navigation Arrows */}
              <button
                onClick={prevMedia}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/80 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextMedia}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/80 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Current View Label */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 z-30">
                <span className="text-xs uppercase tracking-wider font-bold">
                  {mediaItems[activeMediaIndex].label}
                </span>
              </div>

              {/* Universe Tag */}
              {moment.movie?.universe && (
                <div className="absolute bottom-4 right-4 z-30">
                  <div className="bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
                    <TagIcon className="w-3 h-3 text-orange-400" />
                    <span className="text-[10px] uppercase tracking-wider font-bold text-orange-400">
                      {moment.movie?.universe.name}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {mediaItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    activeMediaIndex === idx
                      ? "border-white scale-105 shadow-lg shadow-[#2aa2fd]/50"
                      : "border-white/20 hover:border-white/40 opacity-60 hover:opacity-100"
                  }`}
                >
                  <ImageWithFallback
                    src={item.thumbnail}
                    alt={item.label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold">
                      {item.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Info & Sell Actions */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`inline-flex items-center justify-center rounded-md px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${rarityColors.bg} text-white shadow-lg`}
                >
                  {moment.tier} Moment
                </span>
                <button
                  onClick={handleBookmark}
                  className="w-10 h-10 rounded-lg border border-white/20 hover:bg-white/10 flex items-center justify-center transition-all"
                >
                  <Bookmark
                    className={`w-5 h-5 ${isBookmarked ? "fill-white" : ""}`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="w-10 h-10 rounded-lg border border-white/20 hover:bg-white/10 flex items-center justify-center transition-all"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <h1 className="font-black text-5xl lg:text-6xl uppercase leading-none mb-3 bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
                {moment.title}
              </h1>

              <div className="flex items-center gap-2 text-white/60 mb-4">
                <span>{moment.movie?.title || moment.title}</span>
                <span>•</span>
                <span>{moment.movie?.release_year || moment.date_of_moment}</span>
              </div>

              <p className="text-white/80 leading-relaxed mb-6">
                {moment.summary || `${moment.title} - ${moment.scene_category}`}
              </p>
            </div>

            {/* Sell Moment Section */}
            <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm uppercase tracking-wider text-white/60 font-bold mb-4 flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Sell Your Moment
              </h3>

              {/* Price Input */}
              <div className="mb-6">
                <div className="text-sm text-white/60 mb-2">Set Price (FLOW)</div>
                <Input
                  size="lg"
                  value={price || ""}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  classNames={{
                    input: "bg-white/5 border-white/20 text-white placeholder:text-white/40 text-2xl font-bold",
                  }}
                  leftSection={
                    <span className="text-white/40 uppercase text-sm font-bold">F</span>
                  }
                />
                {oneFlowPrice && price && (
                  <div className="text-white/40 text-sm mt-2">
                    ≈ ${(Number(price) * oneFlowPrice).toFixed(2)} USD
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-xs text-white/60 mb-1">For Sale</div>
                  <div className="font-black text-xl">
                    {moment.activeListings?.length || 0}
                  </div>
                </div>
                {avgSale && (
                  <div className="bg-white/5 rounded-xl p-3">
                    <div className="text-xs text-white/60 mb-1">Avg Sale</div>
                    <div className="font-black text-xl">
                      {avgSale.toFixed(2)} F
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    if (isListed) {
                      handleEditListingPrice();
                    } else {
                      handleSellMoment();
                    }
                  }}
                  className="w-full h-14 bg-gradient-to-r from-[#2aa2fd] to-[#1e90ff] hover:from-[#1e90ff] hover:to-[#2aa2fd] text-white font-black text-lg uppercase tracking-wider shadow-lg transition-all hover:scale-[1.02]"
                >
                  <Wallet className="w-5 h-5 mr-2" />
                  {isListed ? "Update Price" : "List for Sale"}
                </Button>

                {isListed && (
                  <Button
                    onClick={handleCancelListing}
                    variant="outline"
                    className="w-full h-12 border-2 border-red-500/50 hover:bg-red-500/20 text-red-400 font-black uppercase tracking-wider transition-all"
                  >
                    Cancel Listing
                  </Button>
                )}
              </div>
            </div>

            {/* Collection Info */}
            <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm uppercase tracking-wider text-white/60 font-black mb-4">
                Collection Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Edition</span>
                  <span className="font-black text-xl">
                    #{edition_id?.slice(0, 8) || "N/A"}
                  </span>
                </div>
                {moment.max_supply && (
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Total Minted</span>
                    <span className="font-black">{moment.max_supply}</span>
                  </div>
                )}
                {moment.soldCount !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Sold</span>
                    <span className="font-black">{moment.soldCount}</span>
                  </div>
                )}
                {moment.set && (
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Set</span>
                    <span className="font-black uppercase">
                      {moment.set.title}
                    </span>
                  </div>
                )}
                {moment.movie?.universe && (
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Universe</span>
                    <span className="font-black uppercase text-orange-400">
                      {moment.movie?.universe.name}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Tier</span>
                  <span className={`font-black uppercase ${rarityColors.text}`}>
                    {moment.tier}
                  </span>
                </div>
              </div>
            </div>

            {/* Movie Details Card */}
            <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm uppercase tracking-wider text-white/60 font-black mb-4">
                Movie Details
              </h3>

              {/* Crew Information */}
              <div className="space-y-3 mb-6">
                {moment.movie?.directorOrCreator && (
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-white/40">
                      Director
                    </span>
                    <p className="font-medium text-sm text-white mt-1">
                      {moment.movie?.directorOrCreator}
                    </p>
                  </div>
                )}
                {moment.characters?.[0] && (
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-white/40">
                      Character
                    </span>
                    <p className="font-medium text-sm text-white mt-1">
                      {moment.characters[0].name}
                      {moment.characters[0].actor &&
                        ` (${moment.characters[0].actor.name})`}
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/40">
                    Scene Category
                  </span>
                  <p className="font-medium text-sm text-white mt-1">
                    {moment.scene_category}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/40">
                    Release Year
                  </span>
                  <p className="font-medium text-sm text-white mt-1">
                    {moment.movie?.release_year || moment.date_of_moment}
                  </p>
                </div>
              </div>

              {/* Moment Description */}
              {moment.summary && (
                <div className="border-t border-white/10 pt-4">
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block mb-2">
                    About This Moment
                  </span>
                  <p className="font-normal text-[12px] leading-[18px] text-white/80">
                    {moment.summary}
                  </p>
                </div>
              )}
            </div>

            {/* Info Banner */}
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-4">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-white/80">
                  <p className="font-black uppercase text-orange-400 mb-1">
                    Three-Sided Collectible
                  </p>
                  <p className="text-white/60">
                    Navigate between the three views: The Moment (video), The
                    Movie (poster), and The Universe (
                    {moment.movie?.universe?.name || "collection"} artwork).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificMoment;
