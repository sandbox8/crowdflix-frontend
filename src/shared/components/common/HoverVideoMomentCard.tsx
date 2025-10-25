import { motion } from "framer-motion";
import { useState } from "react";
import { ImageWithFallback } from "./ImageWithFallback";
import type { Moment } from "@/api/moments/getMoments";

interface HoverVideoMomentCardProps {
  moment: Moment;
  onClick?: () => void;
  className?: string;
}

const rarityColors = {
  legendary: {
    border: "#ba55d3",
    glow: "rgba(186, 85, 211, 0.6)",
    gradient: "from-purple-600 to-pink-600",
  },
  rare: {
    border: "#ff6b35",
    glow: "rgba(255, 107, 53, 0.6)",
    gradient: "from-orange-600 to-red-600",
  },
  epic: {
    border: "#2aa2fd",
    glow: "rgba(42, 162, 253, 0.6)",
    gradient: "from-blue-600 to-cyan-600",
  },
  common: {
    border: "#FFC03F",
    glow: "rgba(255, 192, 63, 0.6)",
    gradient: "from-yellow-600 to-amber-600",
  },
};

export function HoverVideoMomentCard({
  moment,
  onClick,
  className = "",
}: HoverVideoMomentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const colors =
    rarityColors[moment.tier as keyof typeof rarityColors] ||
    rarityColors.common;

  const lowestAsk = moment.lowestAsk ? parseFloat(moment.lowestAsk) : undefined;

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative cursor-pointer group ${className}`}
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-2 rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${colors.glow}, transparent)`,
        }}
      />

      {/* Card */}
      <div
        className="relative bg-gradient-to-br from-gray-900 to-black border-2 rounded-2xl overflow-hidden aspect-[3/4]"
        style={{
          borderColor: colors.border,
          boxShadow: `0 0 20px ${colors.glow}`,
        }}
      >
        {/* Image/Video */}
        <div className="absolute inset-0">
          {isHovered && moment.video_url ? (
            <motion.video
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={moment.video_url}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageWithFallback
              src={moment.poster_url || ""}
              alt={moment.title}
              className="w-full h-full object-cover"
            />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          {/* Top: Rarity badge */}
          <div className="flex justify-between items-start">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${colors.gradient} text-white shadow-lg`}
            >
              {moment.tier}
            </span>
          </div>

          {/* Bottom: Info */}
          <div className="space-y-2">
            <h3 className="font-['Outfit',sans-serif] font-bold text-white text-lg line-clamp-2">
              {moment.title}
            </h3>
            <p className="text-white/60 text-xs uppercase font-['Outfit',sans-serif]">
              {moment.movie?.title || moment.title}
            </p>

            {lowestAsk && (
              <div className="flex items-baseline gap-1">
                <span className="text-green-400 font-bold text-xl">
                  ${lowestAsk.toFixed(0)}
                </span>
                <span className="text-white/40 text-xs uppercase">USD</span>
              </div>
            )}
          </div>
        </div>

        {/* Hover play indicator */}
        {moment.video_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black/80 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/40"
          >
            <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[10px] border-y-transparent ml-1" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
