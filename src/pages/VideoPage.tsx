import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';

interface VideoPageProps {
  onComplete: () => void;
}

export default function VideoPage({ onComplete }: VideoPageProps) {
  const [count, setCount] = useState(3);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowVideo(true);
      const timer = setTimeout(onComplete, 5000); // Simulate video completion
      return () => clearTimeout(timer);
    }
  }, [count, onComplete]);

  return (
    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] p-4">
      <div className="relative aspect-video w-full max-w-2xl overflow-hidden rounded-3xl shadow-2xl">
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full w-full"
            >
              {showVideo ? (
                <div className="flex h-full w-full flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-4 text-9xl"
                  >
                    🎬
                  </motion.div>
                  <p className="text-2xl font-black text-white">Playing your special video...</p>
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-black/30">
                  <Play className="h-24 w-24 text-white opacity-50" />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
