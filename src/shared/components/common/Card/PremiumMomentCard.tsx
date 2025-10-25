import { motion } from "framer-motion";
import type { Moment } from "@/api/moments/getMoments";
import { ImageWithFallback } from "../ImageWithFallback";

interface PremiumMomentCardProps {
  moment: Moment;
  onClick?: () => void;
}

const rarityConfig = {
  legendary: {
    color: "#8B5CF6",
    label: "LEGENDARY",
    glow: "rgba(139, 92, 246, 0.5)",
  },
  rare: {
    color: "#FF4A3C",
    label: "RARE",
    glow: "rgba(255, 74, 60, 0.5)",
  },
  epic: {
    color: "#FFA500",
    label: "EPIC",
    glow: "rgba(255, 165, 0, 0.5)",
  },
  common: {
    color: "#FFC03F",
    label: "COMMON",
    glow: "rgba(255, 192, 63, 0.5)",
  },
};

export function PremiumMomentCard({ moment, onClick }: PremiumMomentCardProps) {
  const config =
    rarityConfig[moment.tier as keyof typeof rarityConfig] ||
    rarityConfig.common;

  // Calculate values
  const lowestAskValue = moment.lowestAsk
    ? parseFloat(moment.lowestAsk)
    : undefined;
  const avgSaleValue = moment.avgSale ? parseFloat(moment.avgSale) : undefined;
  const serialNumber =
    moment.activeListings?.[0]?.edition?.serial_number || "#001";

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative w-full group cursor-pointer"
    >
      {/* Main Card Container */}
      <div className="relative bg-black rounded-lg overflow-hidden border border-white/10">
        {/* Corner Brackets - Animated on Hover */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          style={{ filter: `drop-shadow(0 0 8px ${config.glow})` }}
        >
          {/* Top Left */}
          <motion.path
            d="M 20 0 L 0 0 L 0 20"
            stroke={config.color}
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Top Right */}
          <motion.path
            d="M -20 0 L 0 0 L 0 20"
            stroke={config.color}
            strokeWidth="3"
            fill="none"
            transform="translate(100%, 0) scale(-1, 1)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          />

          {/* Bottom Left */}
          <motion.path
            d="M 20 0 L 0 0 L 0 -20"
            stroke={config.color}
            strokeWidth="3"
            fill="none"
            transform="translate(0, 100%)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          />

          {/* Bottom Right */}
          <motion.path
            d="M -20 0 L 0 0 L 0 -20"
            stroke={config.color}
            strokeWidth="3"
            fill="none"
            transform="translate(100%, 100%) scale(-1, 1)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          />
        </svg>

        {/* Serial Number Stripe - Top Left */}
        <div className="absolute top-0 left-0 z-30">
          <div
            className="relative px-3 py-1.5 text-black font-['Outfit',sans-serif] text-xs tracking-wider"
            style={{
              background: config.color,
              clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
              minWidth: "80px",
            }}
          >
            {serialNumber}
          </div>
        </div>

        {/* Rarity Badge - Top Left Below Serial */}
        <div className="absolute top-10 left-0 z-30">
          <div
            className="px-3 py-1 text-white font-['Outfit',sans-serif] text-[10px] uppercase tracking-widest"
            style={{ backgroundColor: config.color }}
          >
            {config.label}
          </div>
        </div>

        {/* Moment Image */}
        <div className="relative aspect-square overflow-hidden bg-zinc-900">
          <ImageWithFallback
            src={moment.poster_url || ""}
            alt={moment.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Moment Label Overlay - On Image */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded border border-white/20">
              <p className="font-['Outfit',sans-serif] text-white text-xs uppercase tracking-widest">
                {config.label} MOMENT
              </p>
            </div>
          </div>

          {/* Hover Glow */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at center, ${config.glow} 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* Info Section */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <div>
            <h3 className="font-['Outfit',sans-serif] text-white text-lg tracking-tight line-clamp-1">
              {moment.title}
            </h3>
            <p className="font-['Outfit',sans-serif] text-white/60 text-xs uppercase tracking-wider mt-1">
              {moment.movie?.title || moment.title}
            </p>
          </div>

          {/* Pricing */}
          <div className="space-y-2">
            {lowestAskValue && (
              <div className="flex items-baseline justify-between">
                <span className="font-['Outfit',sans-serif] text-white/60 text-[10px] uppercase tracking-wider">
                  Lowest Ask
                </span>
                <span className="font-['Outfit',sans-serif] text-white">
                  ${lowestAskValue.toFixed(0)}
                  <span className="text-white/60 text-sm">.00 USD</span>
                </span>
              </div>
            )}

            {avgSaleValue && (
              <div className="flex items-baseline justify-between">
                <span className="font-['Outfit',sans-serif] text-white/60 text-[10px] uppercase tracking-wider">
                  Avg Sale
                </span>
                <span className="font-['Outfit',sans-serif] text-white">
                  ${avgSaleValue.toFixed(0)}
                  <span className="text-white/60 text-sm">.00 USD</span>
                </span>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-2 pt-2">
            {moment.soldCount !== undefined && (
              <div className="flex-1 bg-white/5 rounded px-3 py-2 text-center border border-white/10">
                <div className="font-['Outfit',sans-serif] text-white/60 text-[10px] uppercase tracking-wider">
                  Sold
                </div>
                <div className="font-['Outfit',sans-serif] text-white mt-0.5">
                  {moment.soldCount}
                </div>
              </div>
            )}

            <div className="flex-1 bg-white/5 rounded px-3 py-2 text-center border border-white/10">
              <div className="font-['Outfit',sans-serif] text-white/60 text-[10px] uppercase tracking-wider">
                Total
              </div>
              <div className="font-['Outfit',sans-serif] text-white mt-0.5">
                {moment.max_supply || moment.totalItems || "—"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Outer Glow on Hover */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-lg blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
        style={{ backgroundColor: config.color }}
      />
    </motion.div>
  );
}
