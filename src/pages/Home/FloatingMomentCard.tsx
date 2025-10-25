import { motion } from "framer-motion";
import { useState } from "react";

export function FloatingMomentCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full flex justify-center items-center py-4 sm:py-12">
      {/* ENVIRONMENTAL GLOW */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(42,162,253,0.4) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* MAIN CARD */}
      <motion.div
        className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.1),
            0 20px 60px rgba(0,0,0,0.8),
            0 0 100px rgba(42,162,253,0.3)
          `,
        }}
      >
        {/* CARD CONTENT */}
        <div className="relative w-full h-full p-6 flex flex-col justify-between">
          {/* TOP SECTION */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#ff4a3c] to-[#ff6b5e] flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Nosferatu</h3>
                <p className="text-gray-400 text-sm">1922</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#ff4a3c] to-[#ff6b5e] text-white px-3 py-1 rounded-full text-xs font-bold">
              LEGENDARY
            </div>
          </div>

          {/* MIDDLE SECTION */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#2aa2fd] to-[#00d9ff] flex items-center justify-center">
                <span className="text-white text-2xl">🎬</span>
              </div>
              <p className="text-white font-semibold text-lg">Iconic Moment</p>
              <p className="text-gray-400 text-sm">The vampire's shadow</p>
            </div>
          </div>

          {/* BOTTOM SECTION */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-xs">Current Price</p>
              <p className="text-white font-bold">$49.99</p>
            </div>
            <div className="bg-gradient-to-r from-[#2aa2fd] to-[#00d9ff] text-white px-4 py-2 rounded-full text-sm font-bold">
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
    </div>
  );
}
