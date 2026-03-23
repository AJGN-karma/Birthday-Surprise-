import { motion, AnimatePresence } from 'motion/react';
import { Music } from 'lucide-react';

interface MusicPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSong: (song: string) => void;
  currentSong: string | null;
}

const songs = [
  { id: 'romantic', name: 'Romantic Vibes', icon: '💕', url: '/audio/song1_romantic.mp3' },
  { id: 'party', name: 'Party Time', icon: '🎉', url: '/audio/song2_party.mp3' },
  { id: 'funny', name: 'Funny Tune', icon: '😂', url: '/audio/song3_funny.mp3' }
];

export default function MusicPopup({ isOpen, onClose, onSelectSong, currentSong }: MusicPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-2xl"
          >
            <h2 className="mb-2 text-2xl font-black text-[#667eea]">🎵 Pick Your Vibe</h2>
            <p className="mb-8 text-lg font-medium text-gray-500">Choose a song to set the mood!</p>
            
            <div className="flex flex-col gap-3">
              {songs.map(song => (
                <button
                  key={song.id}
                  onClick={() => {
                    onSelectSong(song.id);
                    onClose();
                  }}
                  className={`flex cursor-pointer items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-[#667eea] to-[#764ba2] py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95 ${
                    currentSong === song.id ? 'ring-4 ring-[#667eea]/30' : ''
                  }`}
                >
                  <span>{song.icon}</span>
                  <span>{song.name}</span>
                </button>
              ))}
            </div>

            {currentSong && (
              <div className="mt-8 flex items-center justify-center gap-3 rounded-xl bg-gray-50 p-4 font-bold text-gray-800">
                <Music className="h-6 w-6 animate-bounce text-[#667eea]" />
                <span>Now playing: {songs.find(s => s.id === currentSong)?.name}</span>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
