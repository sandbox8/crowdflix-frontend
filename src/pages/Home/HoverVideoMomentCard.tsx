import { motion } from "framer-motion";
import { useState } from "react";

interface HoverVideoMomentCardProps {
  moment?: any;
  onClick?: () => void;
}

export function HoverVideoMomentCard({
  moment,
  onClick,
}: HoverVideoMomentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-full aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.1), 0 20px 60px rgba(0,0,0,0.8)",
      }}
    >
      {/* CARD CONTENT */}
      <div className="relative z-10 p-4 h-full flex flex-col justify-between">
        {/* TOP SECTION */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff4a3c] to-[#ff6b5e] flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {moment?.movie?.title?.charAt(0) || "M"}
              </span>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">
                {moment?.movie?.title || "Movie Moment"}
              </h3>
              <p className="text-gray-400 text-xs">
                {moment?.movie?.release_year || "2024"}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#ff4a3c] to-[#ff6b5e] text-white px-2 py-1 rounded-full text-xs font-bold">
            {moment?.tier?.toUpperCase() || "COMMON"}
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-[#2aa2fd] to-[#00d9ff] flex items-center justify-center">
              <span className="text-white text-xl">🎬</span>
            </div>
            <p className="text-white font-semibold text-sm">Iconic Moment</p>
            <p className="text-gray-400 text-xs">Click to view</p>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-xs">Current Price</p>
            <p className="text-white font-bold text-sm">
              ${moment?.price || "9.99"}
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#2aa2fd] to-[#00d9ff] text-white px-3 py-1 rounded-full text-xs font-bold">
            Collect
          </div>
        </div>
      </div>

      {/* HOVER EFFECT */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
        />
      )}
    </motion.div>
  );
}
