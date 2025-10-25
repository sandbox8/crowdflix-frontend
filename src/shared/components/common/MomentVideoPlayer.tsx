import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MomentVideoPlayerProps {
  videoUrl: string;
  posterUrl?: string;
  title?: string;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
}

export function MomentVideoPlayer({
  videoUrl,
  posterUrl,
  title = "Moment",
  autoPlay = true,
  loop = true,
  className = "",
}: MomentVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        playPromiseRef.current = videoRef.current.play();
        playPromiseRef.current?.catch((err) => {
          if (err.name !== "AbortError") {
            console.warn("Video playback error:", err);
          }
        });
      } else {
        if (playPromiseRef.current !== null) {
          playPromiseRef.current
            .then(() => {
              if (videoRef.current) {
                videoRef.current.pause();
              }
            })
            .catch(() => {
              // Already paused or failed to play
            });
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      }
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const percent =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percent);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = x / rect.width;
      videoRef.current.currentTime = percent * videoRef.current.duration;
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full bg-black rounded-2xl overflow-hidden group ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl}
        loop={loop}
        muted={isMuted}
        playsInline
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onClick={handlePlayPause}
      />

      {/* Persistent Sound Toggle */}
      <div className="absolute top-4 right-4 z-40">
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            handleToggleMute();
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full bg-black/80 backdrop-blur-md border-2 border-white/30 hover:border-white/50 flex items-center justify-center transition-all shadow-lg"
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-white/80" />
          ) : (
            <Volume2 className="w-6 h-6 text-cyan-400" />
          )}
        </motion.button>

        {/* Sound indicator */}
        {!isMuted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-cyan-500/20 border border-cyan-500/30 rounded-full px-3 py-1 whitespace-nowrap"
          >
            <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold">
              Sound On
            </span>
          </motion.div>
        )}
      </div>

      {/* Controls Overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-4 pr-20 pointer-events-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg uppercase tracking-wide text-white">
                    {title}
                  </h3>
                  <p className="text-xs text-white/60 uppercase">The Moment</p>
                </div>
                <button
                  onClick={handleFullscreen}
                  className="w-10 h-10 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20 hover:bg-white/10 flex items-center justify-center transition-all"
                >
                  <Maximize className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pointer-events-auto">
              {/* Progress Bar */}
              <div className="mb-4 cursor-pointer" onClick={handleSeek}>
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#2aa2fd] to-[#ba55d3]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlayPause}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 flex items-center justify-center transition-all hover:scale-110"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  )}
                </button>

                <div className="flex-1" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Play Button */}
      {!isPlaying && showControls && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
          <button
            onClick={handlePlayPause}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2aa2fd] to-[#ba55d3] border-4 border-white/40 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Play className="w-10 h-10 text-white ml-1" />
          </button>
        </div>
      )}

      {/* Glow Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(42, 162, 253, 0.3), transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}
