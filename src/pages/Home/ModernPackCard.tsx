import { motion } from "framer-motion";
import { useState } from "react";

interface Pack {
  id: string;
  tier: "founders" | "legendary" | "rare" | "common";
  title: string;
  tierLabel: string;
  tagline: string;
  currentBid: string;
  description: string;
  characterName: string;
  subtitle: string;
  image: string;
  momentCount: number;
  guaranteedLegendary: boolean;
  founderBadge: boolean;
  limitedSupply: number;
  soldCount: number;
}

interface ModernPackCardProps {
  pack: Pack;
  onClick?: () => void;
}

export function ModernPackCard({ pack, onClick }: ModernPackCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getTierColors = (tier: string) => {
    switch (tier) {
      case "founders":
        return {
          bg: "from-blue-600 to-blue-800",
          text: "text-blue-100",
          border: "border-blue-500",
          glow: "shadow-[0_0_20px_rgba(59,130,246,0.5)]",
        };
      case "legendary":
        return {
          bg: "from-purple-600 to-purple-800",
          text: "text-purple-100",
          border: "border-purple-500",
          glow: "shadow-[0_0_20px_rgba(147,51,234,0.5)]",
        };
      case "rare":
        return {
          bg: "from-orange-500 to-red-600",
          text: "text-orange-100",
          border: "border-orange-500",
          glow: "shadow-[0_0_20px_rgba(249,115,22,0.5)]",
        };
      default:
        return {
          bg: "from-yellow-500 to-yellow-600",
          text: "text-yellow-900",
          border: "border-yellow-500",
          glow: "shadow-[0_0_20px_rgba(234,179,8,0.5)]",
        };
    }
  };

  const colors = getTierColors(pack.tier);

  return (
    <motion.div
      className={`relative w-full aspect-[3/4] rounded-xl overflow-hidden cursor-pointer ${colors.glow}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* BACKGROUND GRADIENT */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg}`} />

      {/* CARD CONTENT */}
      <div className="relative z-10 p-4 h-full flex flex-col justify-between">
        {/* TOP SECTION */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <div
              className={`w-8 h-8 rounded-full bg-white/20 flex items-center justify-center ${colors.border} border`}
            >
              <span className={`${colors.text} font-bold text-sm`}>
                {pack.tier.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className={`${colors.text} font-bold text-sm`}>
                {pack.title}
              </h3>
              <p className={`${colors.text} text-xs opacity-80`}>
                {pack.subtitle}
              </p>
            </div>
          </div>

          <div
            className={`bg-white/20 ${colors.border} border px-2 py-1 rounded-full text-xs font-bold ${colors.text}`}
          >
            {pack.tierLabel}
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div
              className={`w-12 h-12 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center ${colors.border} border`}
            >
              <span className={`${colors.text} text-xl`}>📦</span>
            </div>
            <p className={`${colors.text} font-semibold text-sm`}>
              {pack.momentCount} Moments
            </p>
            <p className={`${colors.text} text-xs opacity-80`}>
              {pack.description}
            </p>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex justify-between items-center">
          <div>
            <p className={`${colors.text} text-xs opacity-80`}>Starting at</p>
            <p className={`${colors.text} font-bold text-sm`}>
              {pack.currentBid}
            </p>
          </div>
          <div
            className={`bg-white/20 ${colors.border} border px-3 py-1 rounded-full text-xs font-bold ${colors.text}`}
          >
            {pack.soldCount} sold
          </div>
        </div>
      </div>

      {/* HOVER EFFECT */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/20"
        />
      )}
    </motion.div>
  );
}
