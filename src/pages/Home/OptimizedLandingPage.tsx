import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router";

interface OptimizedLandingPageProps {
  onBetaSignup?: (source?: string) => void;
}

export function OptimizedLandingPage({
  onBetaSignup,
}: OptimizedLandingPageProps) {
  const navigate = useNavigate();

  const handleBetaClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBetaSignup) {
      onBetaSignup("landing_page_hero");
    } else {
      // Default behavior - navigate to signup
      navigate("/signup");
    }
  };

  const handleShopClick = () => {
    navigate("/marketplace");
  };

  return (
    <div className="min-h-screen">
      {/* HERO SECTION - MOBILE-FIRST OPTIMIZED - FULL VIEWPORT HEIGHT */}
      <section className="relative min-h-[100dvh] sm:min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Ambient glow effects - decorative only */}
        <div
          className="absolute top-[15%] left-[10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(42,162,253,0.4) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] opacity-25 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,74,60,0.4) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="container mx-auto relative z-30 px-4 sm:px-6 md:px-8 max-w-7xl w-full py-16 sm:py-20">
          {/* OPTIMIZED LAYOUT: Title-First for Maximum Clarity */}

          {/* 1. EYEBROW TEXT - Context First */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-3 sm:mb-5"
          >
            <div
              className="inline-flex items-center gap-2 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full backdrop-blur-sm"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,74,60,0.2), rgba(42,162,253,0.2))",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow:
                  "0 4px 20px rgba(255,74,60,0.3), 0 0 40px rgba(42,162,253,0.2), inset 0 1px 0 rgba(255,255,253,0.1)",
              }}
            >
              <span className="font-['Sofia_Sans',sans-serif] font-black uppercase tracking-wider text-[10px] sm:text-sm text-white">
                Season 1 • Nightmare Reels
              </span>
            </div>
          </motion.div>

          {/* 2. GIANT TITLE - Value Proposition */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-['Sofia_Sans',sans-serif] font-black uppercase text-center mb-3 sm:mb-5 px-2"
            style={{
              fontSize: "clamp(36px, 10vw, 96px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
            }}
          >
            <span
              className="block"
              style={{
                background:
                  "linear-gradient(135deg, #FFFFFF 0%, #CBF6FF 50%, #2AA2FD 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 80px rgba(42,162,253,0.3)",
                filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.4))",
              }}
            >
              Own Your Fandom
            </span>
            <span
              className="block"
              style={{
                background:
                  "linear-gradient(135deg, #FF4A3C 0%, #FFCBCD 50%, #FFFFFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 80px rgba(255,74,60,0.3)",
                filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.4))",
              }}
            >
              Forever
            </span>
          </motion.h1>

          {/* 3. SUBTITLE - Dynamic based on real data */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-5 sm:mb-10 max-w-xl mx-auto px-4"
          >
            <p
              className="font-['Sofia_Sans',sans-serif] font-black uppercase tracking-wide mb-2 sm:mb-3"
              style={{
                fontSize: "clamp(14px, 4vw, 20px)",
                lineHeight: "1.3",
                background: "linear-gradient(135deg, #FFFFFF 0%, #FFCBCD 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Horror Classics Collection
            </p>

            {/* Call to Action */}
            <p
              className="text-gray-400 leading-relaxed"
              style={{
                fontSize: "clamp(12px, 3.5vw, 16px)",
              }}
            >
              Collect iconic moments from cinema's greatest legends
            </p>
          </motion.div>

          {/* 4. PRIMARY CTA - IMPOSSIBLE TO MISS! */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.8,
              type: "spring",
              stiffness: 100,
            }}
            className="mb-6 sm:mb-12 flex justify-center px-4 relative z-30"
            onClick={(e) => {
              // Fallback click handler if button doesn't work
              if (e.target === e.currentTarget) {
                handleBetaClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
              }
            }}
          >
            <Button
              onClick={handleBetaClick}
              type="button"
              size="lg"
              className="relative group w-full max-w-sm h-auto min-h-[56px] sm:min-h-[64px] px-8 py-4 sm:px-10 sm:py-5 text-white rounded-2xl transition-all duration-300 overflow-hidden border-0 touch-manipulation active:scale-95 cursor-pointer isolate"
              style={{
                background:
                  "linear-gradient(135deg, #FF4A3C 0%, #FF6B5E 25%, #2AA2FD 75%, #CBF6FF 100%)",
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.2),
                  0 0 60px rgba(255,74,60,0.6),
                  0 0 100px rgba(42,162,253,0.5),
                  0 20px 80px rgba(255,74,60,0.5),
                  inset 0 1px 0 rgba(255,255,253,0.3)
                `,
                pointerEvents: "auto",
                zIndex: 100,
              }}
            >
              {/* Animated glow pulse */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, #FF2600 0%, #FF4A3C 35%, #2AA2FD 70%, #00D9FF 100%)",
                  filter: "blur(30px)",
                }}
              />

              {/* Button content - pointer-events-none so parent button gets all clicks */}
              <div className="relative flex items-center justify-center gap-3 pointer-events-none">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_0_12px_rgba(255,255,253,0.9)] group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 pointer-events-none" />

                <span
                  className="font-['Sofia_Sans',sans-serif] font-black uppercase tracking-wider pointer-events-none"
                  style={{
                    fontSize: "clamp(14px, 4vw, 18px)",
                    textShadow:
                      "0 2px 20px rgba(0,0,0,0.6), 0 0 30px rgba(255,255,253,0.4)",
                  }}
                >
                  Get Beta Access + Free Pack
                </span>

                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(255,255,253,0.9)] pointer-events-none" />
              </div>

              {/* Bottom shimmer effect */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px] opacity-80 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #FFFFFF 50%, transparent)",
                  filter: "blur(2px)",
                  animation: "shimmer 3s infinite",
                }}
              />
            </Button>
          </motion.div>

          {/* Secondary CTA - Enter Marketplace */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mb-8 flex justify-center px-4 relative z-30"
          >
            <Button
              onClick={handleShopClick}
              variant="outline"
              size="lg"
              className="w-full max-w-sm h-auto min-h-[56px] px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-2xl hover:bg-white/10 hover:border-[#2AA2FD] transition-all duration-300"
            >
              <span className="font-bold uppercase tracking-wider text-base sm:text-lg">
                Browse Marketplace
              </span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default OptimizedLandingPage;
