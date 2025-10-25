import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Play, Flame, Clock } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { FloatingMomentCard } from "./FloatingMomentCard";
import { ModernPackCard } from "./ModernPackCard";
import { useGetMoments } from "@/shared/hooks/api/moments/useGetMoments";
import { useNavigate } from "react-router";

interface OptimizedLandingPageProps {
  onBetaSignup?: (source?: string) => void;
  onPackClick?: (packId: string) => void;
  onExplainerClick?: () => void;
  onMomentClick?: () => void;
  onNavigateToShop?: () => void;
  onNavigateToUniverse?: (universeSlug: string) => void;
  onMomentCardClick?: (moment: unknown) => void;
}

export function OptimizedLandingPage({
  onBetaSignup,
  onPackClick,
  onExplainerClick,
  onMomentClick,
  onNavigateToShop,
  onNavigateToUniverse,
}: OptimizedLandingPageProps) {
  const navigate = useNavigate();

  // Use real API data instead of mock data
  const { data: moments } = useGetMoments({
    page: 1,
    limit: 8,
    sortBy: "most_sold",
    sortOrder: "DESC",
  });

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
    if (onNavigateToShop) {
      onNavigateToShop();
    } else {
      navigate("/marketplace");
    }
  };

  const handleExploreClick = () => {
    if (onMomentClick) {
      onMomentClick();
    } else {
      navigate("/marketplace");
    }
  };

  const handleWatchClick = () => {
    if (onExplainerClick) {
      onExplainerClick();
    } else {
      // Default behavior - scroll to packs section
      document
        .getElementById("packs-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Create mock packs from moments data for the packs section
  const mockPacks =
    moments?.slice(0, 8).map((moment) => ({
      id: `pack-${moment.moment_id}`,
      tier: moment.tier as "founders" | "legendary" | "rare" | "common",
      title: `${moment.movie?.title || moment.title || 'Movie'} Collection`,
      tierLabel: moment.tier?.toUpperCase() || 'COMMON',
      tagline: `Collect moments from ${moment.movie?.title || moment.title || 'this movie'}`,
      currentBid: "Starting at $9.99",
      description: `Iconic moments from ${moment.movie?.title || moment.title || 'cinema'}`,
      characterName: moment.characters?.[0]?.name || "Featured Character",
      subtitle: `${moment.movie?.release_year || moment.date_of_moment || '2024'}`,
      image: moment.poster_url || moment.movie?.poster_url || "",
      momentCount: 5,
      guaranteedLegendary: moment.tier === "legendary",
      founderBadge: moment.tier === "founders",
      limitedSupply: 1000,
      soldCount: Math.floor(Math.random() * 500) + 100,
    })) || [];

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
            {/* Dynamic Hook based on real moments */}
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
              {moments?.[0]?.movie?.title || moments?.[0]?.title || "Horror Classics"} Collection
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
                handleBetaClick(e as React.MouseEvent<HTMLButtonElement>);
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

          {/* 5. VISUAL PROOF - 3D Demo Card (Hero Product Shot) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 1.0,
              type: "spring",
              stiffness: 80,
            }}
            className="mb-6 sm:mb-10 px-4 flex justify-center relative z-10"
          >
            <div className="w-full max-w-[340px] sm:max-w-md">
              <FloatingMomentCard />
            </div>
          </motion.div>

          {/* 6. SECONDARY CTAs - Subtle, Non-Intrusive */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex items-center justify-center gap-4 sm:gap-6 px-4 relative z-10"
          >
            <button
              onClick={handleExploreClick}
              type="button"
              className="group flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 active:scale-95 cursor-pointer min-h-[44px] px-3 py-2 touch-manipulation"
            >
              <Zap
                className="w-4 h-4 group-hover:scale-110 transition-transform pointer-events-none"
                fill="currentColor"
              />
              <span
                className="font-['Sofia_Sans',sans-serif] font-black uppercase tracking-wider pointer-events-none"
                style={{ fontSize: "clamp(11px, 3vw, 14px)" }}
              >
                Explore
              </span>
            </button>

            <div className="w-px h-4 bg-white/20 pointer-events-none" />

            <button
              onClick={handleWatchClick}
              type="button"
              className="group flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 active:scale-95 cursor-pointer min-h-[44px] px-3 py-2 touch-manipulation"
            >
              <Play
                className="w-4 h-4 group-hover:scale-110 transition-transform pointer-events-none"
                fill="currentColor"
              />
              <span
                className="font-['Sofia_Sans',sans-serif] font-black uppercase tracking-wider pointer-events-none"
                style={{ fontSize: "clamp(11px, 3vw, 14px)" }}
              >
                Watch
              </span>
            </button>

            <div className="w-px h-4 bg-white/20 pointer-events-none" />

            <button
              onClick={handleShopClick}
              type="button"
              className="group flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 active:scale-95 cursor-pointer min-h-[44px] px-3 py-2 touch-manipulation"
            >
              <Zap
                className="w-4 h-4 group-hover:scale-110 transition-transform pointer-events-none"
                fill="currentColor"
              />
              <span
                className="font-['Sofia_Sans',sans-serif] font-black uppercase tracking-wider pointer-events-none"
                style={{ fontSize: "clamp(11px, 3vw, 14px)" }}
              >
                Shop Packs
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* HORROR CLASSICS COMMUNITY SECTION */}
      <section className="relative py-20 overflow-hidden bg-black">
        {/* Background gradient glow */}
        <div className="absolute inset-0 bg-gradient-radial from-[#ff4a3c]/10 via-transparent to-transparent opacity-60 pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[rgba(255,74,60,0.15)] border border-[rgba(255,74,60,0.4)] rounded-full px-5 py-2 mb-6">
              <Flame className="w-4 h-4 text-[#ff4a3c] animate-pulse" />
              <span className="font-['Outfit',sans-serif] text-xs text-[#ffcbcd] uppercase tracking-wider">
                Season 1 Featured
              </span>
              <Flame className="w-4 h-4 text-[#ff4a3c] animate-pulse" />
            </div>

            <h2 className="font-['Sofia_Sans',sans-serif] font-black text-5xl lg:text-7xl uppercase mb-4 text-white tracking-tight">
              Horror Classics
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto font-['Outfit',sans-serif] text-lg mb-8">
              The most iconic moments from horror cinema history. From Nosferatu
              to The Exorcist, collect the scenes that defined fear itself.
            </p>

            {/* Sign Up Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button
                onClick={() =>
                  onBetaSignup?.("horror_classics_section") ||
                  navigate("/signup")
                }
                className="bg-gradient-to-r from-[#ff4a3c] to-[#EF870A] text-white font-['Sofia_Sans',sans-serif] font-black text-lg uppercase tracking-wider h-16 px-10 rounded-full shadow-[0_8px_32px_rgba(255,74,60,0.4)] hover:shadow-[0_12px_48px_rgba(255,74,60,0.6)] hover:scale-105 transition-all group"
              >
                <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                <span>Sign Up & Get 3 Free Moments</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PACKS SECTION */}
      <section
        id="packs-section"
        className="relative py-20 overflow-hidden bg-black"
      >
        {/* Background gradient glow */}
        <div className="absolute inset-0 bg-gradient-radial from-[#ff4a3c]/10 via-transparent to-transparent opacity-60 pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[rgba(255,74,60,0.15)] border border-[rgba(255,74,60,0.4)] rounded-full px-5 py-2 mb-6">
              <Flame className="w-4 h-4 text-[#ff4a3c] animate-pulse" />
              <span className="font-['Outfit',sans-serif] text-xs text-[#ffcbcd] uppercase tracking-wider">
                Season 1 Packs
              </span>
              <Flame className="w-4 h-4 text-[#ff4a3c] animate-pulse" />
            </div>

            <h2 className="font-['Sofia_Sans',sans-serif] font-black text-5xl lg:text-7xl uppercase mb-4 text-white tracking-tight">
              Collectible Packs
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto font-['Outfit',sans-serif] text-lg">
              Discover curated packs of your favorite horror moments. Each pack
              is a collection of iconic scenes, perfect for any horror fan.
            </p>
          </motion.div>

          {/* Featured Packs Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-12"
          >
            {mockPacks.map((pack, idx) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <ModernPackCard
                  pack={pack}
                  onClick={() =>
                    onPackClick?.(pack.id) || navigate("/marketplace")
                  }
                />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA to Explore Full Collection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Button
              onClick={() =>
                onNavigateToUniverse?.("horror-classics") ||
                navigate("/marketplace")
              }
              className="bg-gradient-to-r from-[#ff4a3c] to-[#EF870A] text-white font-['Sofia_Sans',sans-serif] font-black text-lg uppercase tracking-wider h-16 px-10 rounded-full shadow-[0_8px_32px_rgba(255,74,60,0.4)] hover:shadow-[0_12px_48px_rgba(255,74,60,0.6)] hover:scale-105 transition-all group"
            >
              <span>Explore Full Collection</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Stats below button */}
            <div className="flex items-center justify-center gap-8 mt-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#ff4a3c]/20 flex items-center justify-center border border-[#ff4a3c]/40">
                  <span className="font-['Sofia_Sans',sans-serif] font-black text-[#ff4a3c]">
                    {mockPacks.length}
                  </span>
                </div>
                <span className="text-white/60 font-['Outfit',sans-serif]">
                  Packs
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#2aa2fd]/20 flex items-center justify-center border border-[#2aa2fd]/40">
                  <Clock className="w-5 h-5 text-[#2aa2fd]" />
                </div>
                <span className="text-white/60 font-['Outfit',sans-serif]">
                  New Packs Every Week
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default OptimizedLandingPage;
