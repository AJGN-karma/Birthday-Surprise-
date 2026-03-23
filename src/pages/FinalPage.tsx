import { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { AppConfig } from '../types';

interface FinalPageProps {
  config: AppConfig;
  onReplay: () => void;
}

export default function FinalPage({ config, onReplay }: FinalPageProps) {
  useEffect(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] p-4 text-center">
      <div className="relative z-10">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-4 text-5xl font-black text-white drop-shadow-2xl md:text-7xl"
        >
          Happy Birthday! 🎂
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 text-xl font-bold text-white/90 drop-shadow-lg md:text-2xl"
        >
          {config.final_message}
        </motion.p>
        
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReplay}
          className="cursor-pointer rounded-full bg-white px-12 py-4 text-lg font-black text-[#667eea] shadow-2xl transition-all"
        >
          🔁 Replay Memories
        </motion.button>
      </div>

      {/* Floating Hearts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '110vh', x: `${Math.random() * 100}%` }}
            animate={{ y: '-10vh' }}
            transition={{ 
              duration: 3 + Math.random() * 2, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: 'easeIn'
            }}
            className="absolute text-4xl opacity-40"
          >
            ❤️
          </motion.div>
        ))}
      </div>
    </div>
  );
}
