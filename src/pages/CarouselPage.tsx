import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppConfig } from '../types';

interface CarouselPageProps {
  config: AppConfig;
}

export default function CarouselPage({ config }: CarouselPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const photos = [
    { id: 1, url: '/images/carousel_photo1_page4.jpeg', emoji: "📸" },
    { id: 2, url: '/images/carousel_photo2_page4.jpeg', emoji: "📷" },
    { id: 3, url: '/images/carousel_photo3_page4.jpeg', emoji: "🖼️" },
    { id: 4, url: '/images/carousel_photo4_page4.jpeg', emoji: "✨" },
    { id: 5, url: '/images/carousel_photo5_page4.jpeg', emoji: "💫" },
    { id: 6, url: '/images/carousel_photo6_page4.jpeg', emoji: "⭐" },
    { id: 7, url: '/images/carousel_photo7_page4.jpeg', emoji: "🌟" }
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] p-4 text-center">
      <div className="mb-8 text-lg font-bold text-white/80">
        ← Swipe or use arrows →
      </div>

      <div className="perspective-1000 relative h-[400px] w-full max-w-[400px] md:h-[500px] md:max-w-[500px]">
        <AnimatePresence mode="popLayout">
            <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100, rotateZ: 10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, rotateZ: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, rotateZ: -10, scale: 0.8 }}
            transition={{ duration: 0.5, type: 'spring', damping: 20 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 50) handlePrev();
              else if (info.offset.x < -50) handleNext();
            }}
            className="absolute inset-0 flex cursor-grab items-center justify-center overflow-hidden rounded-3xl bg-black/10 shadow-2xl active:cursor-grabbing"
          >
            {/* Blurred background to fill space */}
            <img 
              src={photos[currentIndex].url} 
              className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-50"
              referrerPolicy="no-referrer"
            />
            <img 
              src={photos[currentIndex].url} 
              alt={`Memory ${currentIndex + 1}`}
              referrerPolicy="no-referrer"
              className="relative z-10 max-h-full max-w-full object-contain"
              onError={(e) => {
                // Fallback if image doesn't exist yet
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.innerHTML = `<div class="text-9xl drop-shadow-2xl">${photos[currentIndex].emoji}</div>`;
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12 flex gap-3">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-3 w-3 rounded-full transition-all ${
              currentIndex === i ? 'w-8 bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>

      <AnimatePresence>
        {currentIndex === photos.length - 1 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="mt-12 w-full max-w-lg rounded-2xl bg-white/95 p-8 shadow-2xl backdrop-blur-sm"
          >
            <h3 className="mb-4 text-xl font-black text-[#667eea]">💜 These 7 Moments</h3>
            <p className="text-lg font-medium leading-relaxed text-gray-800">
              {config.photo_message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
