import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PhotoRainPageProps {
  onComplete: () => void;
}

export default function PhotoRainPage({ onComplete }: PhotoRainPageProps) {
  const [rainItems, setRainItems] = useState<{ id: number; left: string; duration: string; content: string; type: 'emoji' | 'image' }[]>([]);
  const [showCenter, setShowCenter] = useState(false);
  const rainEmojis = ["✨", "💫", "⭐", "🌟", "❤️", "💜", "🎉", "🎂", "🎁"];
  const rainImages = [
    '/images/carousel_photo1_page4.jpeg',
    '/images/carousel_photo2_page4.jpeg',
    '/images/carousel_photo3_page4.jpeg',
    '/images/carousel_photo4_page4.jpeg',
    '/images/carousel_photo5_page4.jpeg',
    '/images/carousel_photo6_page4.jpeg',
    '/images/carousel_photo7_page4.jpeg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const isImage = Math.random() > 0.5;
      setRainItems(prev => [
        ...prev.slice(-40),
        {
          id: Date.now() + Math.random(),
          left: `${Math.random() * 100}%`,
          duration: `${4 + Math.random() * 3}s`,
          content: isImage 
            ? rainImages[Math.floor(Math.random() * rainImages.length)]
            : rainEmojis[Math.floor(Math.random() * rainEmojis.length)],
          type: isImage ? 'image' : 'emoji'
        }
      ]);
    }, 150);

    const timer = setTimeout(() => setShowCenter(true), 1000);
    const completeTimer = setTimeout(onComplete, 30000); // Hold for 30 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-linear-to-br from-[#667eea] via-[#764ba2] to-[#f0f4ff]">
      <style>
        {`
          @keyframes shine {
            0% { transform: translateX(-100%) rotate(45deg); }
            100% { transform: translateX(100%) rotate(45deg); }
          }
          .shine-effect::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              to right,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.3) 50%,
              rgba(255, 255, 255, 0) 100%
            );
            animation: shine 3s infinite;
          }
        `}
      </style>
      <div className="pointer-events-none absolute inset-0">
        <AnimatePresence>
          {rainItems.map(item => (
            <motion.div
              key={item.id}
              initial={{ y: -150, opacity: 0, rotate: Math.random() * 360 }}
              animate={{ y: '110vh', opacity: 1, rotate: Math.random() * 360 }}
              exit={{ opacity: 0 }}
              transition={{ duration: parseFloat(item.duration), ease: 'linear' }}
              className="absolute drop-shadow-lg"
              style={{ left: item.left }}
            >
              {item.type === 'image' ? (
                <div className="h-24 w-24 overflow-hidden rounded-2xl border-2 border-white/50 shadow-xl">
                  <img 
                    src={item.content} 
                    className="h-full w-full object-cover" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).parentElement!.innerHTML = "📸";
                    }}
                  />
                </div>
              ) : (
                <span className="text-5xl">{item.content}</span>
              )}
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
              className="shine-effect relative z-10 flex h-64 w-64 items-center justify-center overflow-hidden rounded-3xl bg-black/10 shadow-2xl md:h-80 md:w-80"
            >
              {/* Blurred background to fill space */}
              <img 
                src="/images/rain_photo_page7.jpeg" 
                className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-50"
                referrerPolicy="no-referrer"
              />
              <img 
                src="/images/rain_photo_page7.jpeg" 
                alt="Favorite Memory"
                referrerPolicy="no-referrer"
                className="relative z-10 max-h-full max-w-full object-contain"
                onError={(e) => {
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
