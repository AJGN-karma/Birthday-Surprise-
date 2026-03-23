import { motion } from 'motion/react';

interface WelcomePageProps {
  onStart: () => void;
}

export default function WelcomePage({ onStart }: WelcomePageProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#667eea] via-[#764ba2] to-[#f0f4ff] p-4 text-center">
      <div className="relative z-10">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-2 text-5xl font-black text-white drop-shadow-lg md:text-7xl"
        >
          💜 HAPPY BIRTHDAY! 💜
        </motion.h1>
        <motion.p 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 text-xl font-bold text-yellow-400 drop-shadow-md md:text-2xl"
        >
          Full of love & special moments
        </motion.p>
        
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          className="relative mx-auto mb-12 h-48 w-48"
        >
          <div className="flex h-full w-full animate-bounce items-center justify-center text-9xl">
            🎂
          </div>
          {['🌹', '🌹', '🌹', '🌹'].map((rose, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: i * 0.3 
              }}
              className="absolute text-4xl"
              style={{
                top: i < 2 ? '10px' : 'auto',
                bottom: i >= 2 ? '10px' : 'auto',
                left: i % 2 === 0 ? '10px' : 'auto',
                right: i % 2 !== 0 ? '10px' : 'auto',
              }}
            >
              {rose}
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="cursor-pointer rounded-full border-4 border-white bg-linear-to-r from-[#00d4ff] to-[#0099ff] px-12 py-4 text-xl font-black tracking-widest text-white shadow-2xl transition-all"
        >
          ✨ Open Your Surprise ✨
        </motion.button>
      </div>

      {/* Love Emoji Rain */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, x: `${Math.random() * 100}%`, rotate: 0 }}
            animate={{ y: '110vh', rotate: 360 }}
            transition={{ 
              duration: 8 + Math.random() * 6, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: 'linear'
            }}
            className="absolute text-4xl opacity-60"
          >
            {['❤️', '💜', '😊', '😍', '🥰', '🌹'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
