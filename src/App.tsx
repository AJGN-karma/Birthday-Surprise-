import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DEFAULT_CONFIG, AppConfig, PageId } from './types';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import GamesPage from './pages/GamesPage';
import CarouselPage from './pages/CarouselPage';
import MessagePage from './pages/MessagePage';
import VideoPage from './pages/VideoPage';
import PhotoRainPage from './pages/PhotoRainPage';
import FinalPage from './pages/FinalPage';
import MusicPopup from './components/MusicPopup';
import Navigation from './components/Navigation';

export default function App() {
  const [config] = useState<AppConfig>(DEFAULT_CONFIG);
  const [currentPage, setCurrentPage] = useState<PageId>('welcome');
  const [isMusicPopupOpen, setIsMusicPopupOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const pages: PageId[] = [
    'welcome',
    'login',
    'games',
    'carousel',
    'message',
    'video',
    'photo-rain',
    'final'
  ];

  const currentIndex = pages.indexOf(currentPage);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }

    const audio = audioRef.current;

    // Page indices:
    // 0: welcome
    // 1: login
    // 2: games
    // 3: carousel
    // 4: message
    // 5: video
    // 6: photo-rain
    // 7: final

    if (currentIndex >= 2 && currentIndex <= 4) {
      if (currentSong) {
        const songMap: Record<string, string> = {
          romantic: '/audio/song1_romantic.mp3',
          party: '/audio/song2_party.mp3',
          funny: '/audio/song3_funny.mp3'
        };
        const songUrl = songMap[currentSong];

        if (songUrl && !audio.src.endsWith(songUrl)) {
          audio.src = songUrl;
          audio.play().catch(e => console.log("Audio play failed:", e));
        } else if (audio.paused && songUrl) {
          audio.play().catch(e => console.log("Audio play failed:", e));
        }
      }
    } 
    else if (currentIndex === 5) {
      audio.pause();
    }
    else if (currentIndex === 6) {
      const dedicatedUrl = '/audio/song4_dedicated.mp3';
      if (!audio.src.endsWith(dedicatedUrl)) {
        audio.src = dedicatedUrl;
        audio.play().catch(e => console.log("Audio play failed:", e));
      } else if (audio.paused) {
        audio.play().catch(e => console.log("Audio play failed:", e));
      }
    }
    else {
      audio.pause();
    }
  }, [currentIndex, currentSong]);

  const goToNextPage = useCallback(() => {
    if (currentIndex < pages.length - 1) {
      setCurrentPage(pages[currentIndex + 1]);
    }
  }, [currentIndex, pages]);

  const goToPrevPage = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentPage(pages[currentIndex - 1]);
    }
  }, [currentIndex, pages]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    goToNextPage();
  };

  useEffect(() => {
    if (currentPage === 'games') {
      setIsMusicPopupOpen(true);
    }
  }, [currentPage]);

  return (
    <div className="relative h-screen w-screen overflow-hidden font-sans">
      <FallingHearts />
      <CursorHearts />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full"
        >
          {currentPage === 'welcome' && (
            <WelcomePage onStart={() => setCurrentPage('login')} />
          )}
          {currentPage === 'login' && (
            <LoginPage config={config} onLogin={handleLogin} />
          )}
          {currentPage === 'games' && (
            <GamesPage />
          )}
          {currentPage === 'carousel' && (
            <CarouselPage config={config} />
          )}
          {currentPage === 'message' && (
            <MessagePage config={config} />
          )}
          {currentPage === 'video' && (
            <VideoPage onComplete={goToNextPage} />
          )}
          {currentPage === 'photo-rain' && (
            <PhotoRainPage onComplete={goToNextPage} />
          )}
          {currentPage === 'final' && (
            <FinalPage config={config} onReplay={() => setCurrentPage('welcome')} />
          )}
        </motion.div>
      </AnimatePresence>

      <Navigation 
        currentIndex={currentIndex} 
        total={pages.length} 
        onNext={goToNextPage} 
        onPrev={goToPrevPage}
        isLoggedIn={isLoggedIn}
      />

      <MusicPopup 
        isOpen={isMusicPopupOpen} 
        onClose={() => setIsMusicPopupOpen(false)}
        onSelectSong={setCurrentSong}
        currentSong={currentSong}
      />

      <div className="fixed bottom-0 left-0 h-1 bg-white/20 z-50 w-full">
        <motion.div 
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: `${(currentIndex / (pages.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}

function CursorHearts() {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; size: number; color: string }[]>([]);
  const heartId = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const id = heartId.current++;
      const colors = ['#ff4d4d', '#ff6666', '#ff8080', '#ff9999', '#ffb3b3'];
      const newHeart = {
        id,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 20 + 10,
        color: colors[Math.floor(Math.random() * colors.length)]
      };

      setHearts(prev => [...prev.slice(-20), newHeart]);

      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="cursor-heart"
          style={{
            left: heart.x,
            top: heart.y,
            fontSize: `${heart.size}px`,
            color: heart.color,
            '--tw-translate-x': `${(Math.random() - 0.5) * 100}px`
          } as any}
        >
          ❤️
        </div>
      ))}
    </>
  );
}

function FallingHearts() {
  const [hearts, setHearts] = useState<{ id: number; left: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${8 + Math.random() * 6}s`
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="falling-heart"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
}
