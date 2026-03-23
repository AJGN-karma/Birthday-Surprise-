import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationProps {
  currentIndex: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
  isLoggedIn: boolean;
}

export default function Navigation({ currentIndex, total, onNext, onPrev, isLoggedIn }: NavigationProps) {
  // Hide navigation on welcome and login pages (unless logged in)
  if (currentIndex === 0 || (currentIndex === 1 && !isLoggedIn)) return null;

  return (
    <div className="fixed bottom-8 left-0 z-50 flex w-full justify-between px-8 md:px-12">
      <motion.button
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPrev}
        disabled={currentIndex === 0}
        className="flex cursor-pointer items-center gap-2 rounded-full border-2 border-white bg-white/20 px-6 py-3 text-sm font-black text-white backdrop-blur-md transition-all hover:bg-white/30 disabled:opacity-30"
      >
        <ChevronLeft className="h-5 w-5" />
        <span>Back</span>
      </motion.button>

      {currentIndex < total - 1 && (
        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="flex cursor-pointer items-center gap-2 rounded-full border-2 border-white bg-white/20 px-6 py-3 text-sm font-black text-white backdrop-blur-md transition-all hover:bg-white/30"
        >
          <span>Next</span>
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      )}
    </div>
  );
}
