import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import type { Moment } from "@/api/moments/getMoments";
import { ImageWithFallback } from "./ImageWithFallback";

interface PackOpeningModalProps {
  isOpen: boolean;
  onClose: () => void;
  moments: Moment[];
  packTitle?: string;
  onViewCollection?: () => void;
}

export function PackOpeningModal({
  isOpen,
  onClose,
  moments,
  packTitle = "Pack",
  onViewCollection,
}: PackOpeningModalProps) {
  const [phase, setPhase] = useState<
    "sealed" | "opening" | "revealing" | "revealed"
  >("sealed");
  const [currentRevealIndex, setCurrentRevealIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setPhase("sealed");
      setCurrentRevealIndex(0);

      const sealedTimer = setTimeout(() => {
        setPhase("opening");
      }, 500);

      const openingTimer = setTimeout(() => {
        setPhase("revealing");
      }, 2500);

      return () => {
        clearTimeout(sealedTimer);
        clearTimeout(openingTimer);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (phase === "revealing" && currentRevealIndex < moments.length) {
      const timer = setTimeout(() => {
        setCurrentRevealIndex((prev) => prev + 1);
      }, 800);

      return () => clearTimeout(timer);
    } else if (phase === "revealing" && currentRevealIndex === moments.length) {
      const finalTimer = setTimeout(() => {
        setPhase("revealed");
      }, 1000);

      return () => clearTimeout(finalTimer);
    }
  }, [phase, currentRevealIndex, moments.length]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md overflow-y-auto p-4"
        onClick={onClose}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#2aa2fd]/20 via-[#ba55d3]/20 to-[#ff4a3c]/20 rounded-full blur-3xl"
          />
        </div>

        {/* Modal content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 hover:bg-white/10 flex items-center justify-center transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Phase: Sealed Pack */}
          {phase === "sealed" && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-8"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-12">
                <h2 className="font-black text-5xl uppercase mb-4 bg-gradient-to-r from-white via-[#2aa2fd] to-white bg-clip-text text-transparent">
                  {packTitle}
                </h2>
                <p className="text-white/60 text-lg">
                  Preparing your moments...
                </p>
              </div>
            </motion.div>
          )}

          {/* Phase: Opening Animation */}
          {phase === "opening" && (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2 }}
              className="text-center space-y-8"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-12 relative overflow-hidden">
                {/* Shimmer effect */}
                <motion.div
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />

                <Sparkles className="w-24 h-24 mx-auto mb-6 text-[#2aa2fd]" />
                <h2 className="font-black text-5xl uppercase bg-gradient-to-r from-white via-[#2aa2fd] to-white bg-clip-text text-transparent">
                  Opening...
                </h2>
              </div>
            </motion.div>
          )}

          {/* Phase: Revealing Moments */}
          {phase === "revealing" && (
            <div className="space-y-8">
              <h2 className="text-center font-black text-4xl uppercase text-white mb-8">
                Your Moments
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {moments.map((moment, index) => (
                  <motion.div
                    key={moment.moment_id}
                    initial={{ scale: 0, rotate: -180, opacity: 0 }}
                    animate={
                      index < currentRevealIndex
                        ? { scale: 1, rotate: 0, opacity: 1 }
                        : { scale: 0, rotate: -180, opacity: 0 }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden"
                  >
                    <div className="aspect-square relative">
                      <ImageWithFallback
                        src={moment.poster_url || ""}
                        alt={moment.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </div>

                    <div className="p-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#2aa2fd]">
                        {moment.tier}
                      </span>
                      <h3 className="font-bold text-white mt-1 line-clamp-1">
                        {moment.title}
                      </h3>
                      <p className="text-white/60 text-sm mt-1">
                        {moment.movie.title}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Phase: All Revealed */}
          {phase === "revealed" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  <Sparkles className="w-16 h-16 text-[#2aa2fd] mx-auto mb-4" />
                </motion.div>
                <h2 className="font-black text-5xl uppercase mb-4 bg-gradient-to-r from-white via-[#2aa2fd] to-white bg-clip-text text-transparent">
                  Congratulations!
                </h2>
                <p className="text-white/80 text-lg">
                  You received {moments.length} moments
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {moments.map((moment) => (
                  <div
                    key={moment.moment_id}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden hover:border-[#2aa2fd]/50 transition-colors"
                  >
                    <div className="aspect-square relative">
                      <ImageWithFallback
                        src={moment.poster_url || ""}
                        alt={moment.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#2aa2fd]">
                        {moment.tier}
                      </span>
                      <h3 className="font-bold text-white mt-1">
                        {moment.title}
                      </h3>
                      <p className="text-white/60 text-sm mt-1">
                        {moment.movie.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 justify-center pt-6">
                {onViewCollection && (
                  <Button
                    onClick={onViewCollection}
                    className="bg-gradient-to-r from-[#2aa2fd] to-[#1e90ff] hover:from-[#1e90ff] hover:to-[#2aa2fd] text-white font-bold px-8 py-6 text-lg"
                  >
                    <ArrowRight className="w-5 h-5 mr-2" />
                    View Collection
                  </Button>
                )}
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="border-2 border-white/20 hover:bg-white/10 text-white font-bold px-8 py-6 text-lg"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
