import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';

interface VideoPageProps {
  onComplete: () => void;
}

export default function VideoPage({ onComplete }: VideoPageProps) {
  const [count, setCount] = useState(3);
  const [showVideo, setShowVideo] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowVideo(true);
    }
  }, [count]);

  const handleVideoEnd = () => {
    setIsExiting(true);
    setTimeout(onComplete, 1000);
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] p-4">
      <AnimatePresence mode="wait">
        {!isExiting ? (
          <motion.div 
            key="video-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
            transition={{ duration: 1 }}
            className="relative aspect-video w-full max-w-2xl overflow-hidden rounded-3xl shadow-2xl bg-black"
          >
            <AnimatePresence mode="wait">
              {count > 0 ? (
                <motion.div
                  key={count}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center text-9xl font-black text-white drop-shadow-2xl"
                >
                  {count}
                </motion.div>
              ) : (
                <motion.div
                  key="video-player"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full w-full"
                >
                  {showVideo && (
                    <video 
                      src="/SAnath.mp4" 
                      autoPlay 
                      onEnded={handleVideoEnd}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        console.error("Video error:", e);
                        // Fallback if video fails
                        setTimeout(handleVideoEnd, 3000);
                      }}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            key="vanishing-effect"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 2, filter: 'blur(40px)' }}
            className="fixed inset-0 z-50 bg-white"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
