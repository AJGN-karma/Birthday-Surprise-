import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PhotoRainPageProps {
  onComplete: () => void;
}

export default function PhotoRainPage({ onComplete }: PhotoRainPageProps) {
  const [rainItems, setRainItems] = useState<{ id: number; left: string; duration: string; emoji: string }[]>([]);
  const [showCenter, setShowCenter] = useState(false);
  const rainEmojis = ["📸", "📷", "🖼️", "✨", "💫", "⭐", "🌟", "❤️", "💜", "🎉", "🎂", "🎁"];

  useEffect(() => {
    const interval = setInterval(() => {
      setRainItems(prev => [
        ...prev.slice(-30),
        {
          id: Date.now() + Math.random(),
          left: `${Math.random() * 100}%`,
          duration: `${3 + Math.random() * 2}s`,
          emoji: rainEmojis[Math.floor(Math.random() * rainEmojis.length)]
        }
      ]);
    }, 200);

    const timer = setTimeout(() => setShowCenter(true), 1000);
    const completeTimer = setTimeout(onComplete, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-linear-to-br from-[#667eea] via-[#764ba2] to-[#f0f4ff]">
      <div className="pointer-events-none absolute inset-0">
        <AnimatePresence>
          {rainItems.map(item => (
            <motion.div
              key={item.id}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: '110vh', opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: parseFloat(item.duration), ease: 'linear' }}
              className="absolute text-5xl drop-shadow-lg"
              style={{ left: item.left }}
            >
              {item.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showCenter && (
          <div className="flex h-full w-full items-center justify-center">
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 15, stiffness: 100 }}
              className="relative z-10 flex h-64 w-64 items-center justify-center overflow-hidden rounded-3xl bg-white text-9xl shadow-2xl md:h-80 md:w-80"
            >
              <img 
                src="/images/rain_photo_page7.jpg" 
                alt="Favorite Memory"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
                onError={(e) => {
                  // Fallback if image doesn't exist yet
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = "💝";
                }}
              />
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute -bottom-24 left-1/2 w-max -translate-x-1/2 text-center text-2xl font-black text-white drop-shadow-lg"
              >
                Out of all these memories... this one is my favorite ❤️
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
