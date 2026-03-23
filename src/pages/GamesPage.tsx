import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function GamesPage() {
  return (
    <div className="flex h-full w-full flex-col items-center overflow-y-auto bg-linear-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] px-4 py-16">
      <div className="w-full max-w-2xl space-y-12">
        <div className="text-center text-white">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-2 text-4xl font-black"
          >
            🎮 Let's Play!
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg opacity-90"
          >
            How well do you know me?
          </motion.p>
        </div>

        <QuizGame 
          title="Question 1" 
          question="Who is more likely to fall asleep ? 😴" 
          options={["You 👉", "Me 🫣"]}
          correctIndex={0}
        />

        <QuizGame 
          title="Question 2" 
          question="Who eats more? 🍕" 
          options={["You", "Me", "We finish everything together"]}
        />

        <HeartClickerGame />

        <ScratchGame />
      </div>
    </div>
  );
}

function QuizGame({ title, question, options, correctIndex }: { title: string; question: string; options: string[]; correctIndex?: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSelect = (index: number) => {
    setSelected(index);
    if (correctIndex !== undefined) {
      if (index === correctIndex) {
        setShowSuccess(true);
        setShowError(false);
      } else {
        setShowError(true);
        setShowSuccess(false);
      }
    } else {
      setShowSuccess(true);
    }
    setTimeout(() => {
      setShowSuccess(false);
      setShowError(false);
    }, 3000);
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="rounded-3xl bg-white/95 p-8 shadow-2xl"
    >
      <h3 className="mb-4 text-xl font-black text-[#667eea]">{title}</h3>
      <p className="mb-6 text-lg font-medium text-gray-800">{question}</p>
      <div className="flex flex-col gap-3">
        {options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={`cursor-pointer rounded-xl border-2 p-4 text-left font-medium transition-all hover:translate-x-2 ${
              selected === i 
                ? (correctIndex !== undefined && i !== correctIndex ? 'border-red-500 bg-red-500 text-white' : 'border-[#667eea] bg-[#667eea] text-white')
                : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-[#667eea] hover:bg-[#667eea] hover:text-white'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {showSuccess && (
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-4 rounded-xl border-2 border-green-500 bg-green-50 p-4 text-center font-bold text-green-800"
        >
          {correctIndex !== undefined ? "Correct! You know it! ❤️" : "See? You know me so well ❤️"}
        </motion.div>
      )}
      {showError && (
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-4 rounded-xl border-2 border-red-500 bg-red-50 p-4 text-center font-bold text-red-800"
        >
          Wrong! Try again 🫣
        </motion.div>
      )}
    </motion.div>
  );
}

function HeartClickerGame() {
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState<number[]>(Array.from({ length: 9 }).map((_, i) => i));
  const [timeLeft, setTimeLeft] = useState(15);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGameStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsGameOver(true);
      setIsGameStarted(false);
    }
    return () => clearInterval(timer);
  }, [isGameStarted, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(15);
    setIsGameStarted(true);
    setIsGameOver(false);
  };

  const handleClick = (id: number) => {
    if (!isGameStarted) return;
    setScore(s => s + 1);
    setHearts(prev => prev.filter(h => h !== id));
    setTimeout(() => setHearts(prev => [...prev, id]), 1000);
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="rounded-3xl bg-white/95 p-8 text-center shadow-2xl"
    >
      <h3 className="mb-4 text-xl font-black text-[#667eea]">❤️ Heart Clicker</h3>
      {!isGameStarted && !isGameOver && (
        <button 
          onClick={startGame}
          className="mb-6 rounded-xl bg-[#667eea] px-8 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
        >
          Start Game (15s)
        </button>
      )}
      
      {isGameStarted && (
        <div className="mb-4 text-xl font-bold text-red-500">
          Time Left: {timeLeft}s
        </div>
      )}

      {isGameOver && (
        <div className="mb-6">
          <p className="text-2xl font-black text-[#667eea]">Game Over!</p>
          <p className="text-lg font-bold text-gray-600">Final Score: {score}</p>
          <button 
            onClick={startGame}
            className="mt-4 rounded-xl bg-[#667eea] px-8 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
          >
            Play Again
          </button>
        </div>
      )}

      <div className={`flex flex-wrap justify-center gap-4 ${!isGameStarted ? 'opacity-50 pointer-events-none' : ''}`}>
        {hearts.map(id => (
          <motion.div
            key={id}
            whileTap={{ scale: 1.5 }}
            onClick={() => handleClick(id)}
            className="cursor-pointer text-5xl select-none"
          >
            ❤️
          </motion.div>
        ))}
      </div>
      <div className="mt-6 text-2xl font-black text-red-600">
        Score: {score}
      </div>
    </motion.div>
  );
}

function ScratchGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill with purple
    ctx.fillStyle = '#667eea';
    ctx.fillRect(0, 0, 300, 300);

    // Add text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = 'bold 24px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('← Scratch here →', 150, 150);
  }, []);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.fill();

    // Check percentage
    const imageData = ctx.getImageData(0, 0, 300, 300);
    const data = imageData.data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] === 0) cleared++;
    }
    const percentage = (cleared / (data.length / 4)) * 100;
    if (percentage > 50) {
      setIsRevealed(true);
    }
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="rounded-3xl bg-white/95 p-8 shadow-2xl"
    >
      <h3 className="mb-4 text-xl font-black text-[#667eea]">🎁 Scratch to Reveal</h3>
      <p className="mb-6 text-lg font-medium text-gray-800">Scratch the purple area to reveal your surprise!</p>
      
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-[300px] w-[300px] overflow-hidden rounded-2xl border-4 border-dashed border-[#667eea] bg-gray-100">
          {/* Image is ALWAYS behind the canvas */}
          <div className="absolute inset-0 h-full w-full">
            <img 
              src="/images/scratch_reveal.jpeg" 
              alt="Surprise"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.innerHTML = "<div class='flex h-full w-full items-center justify-center text-8xl'>🎉</div>";
              }}
            />
          </div>

          {/* Canvas is on top */}
          <motion.canvas
            ref={canvasRef}
            width={300}
            height={300}
            animate={isRevealed ? { opacity: 0, scale: 1.2, filter: 'blur(20px)' } : { opacity: 1 }}
            transition={{ duration: 0.8 }}
            onMouseDown={() => setIsDrawing(true)}
            onMouseMove={handleMove}
            onMouseUp={() => setIsDrawing(false)}
            onMouseUpCapture={() => setIsDrawing(false)}
            onMouseOut={() => setIsDrawing(false)}
            onTouchStart={() => setIsDrawing(true)}
            onTouchMove={handleMove}
            onTouchEnd={() => setIsDrawing(false)}
            className={`absolute inset-0 z-10 cursor-crosshair touch-none ${isRevealed ? 'pointer-events-none' : ''}`}
          />
        </div>
        
        {isRevealed && (
          <motion.div 
            initial={{ y: 20, opacity: 0, scale: 0.8 }}
            animate={{ 
              y: [0, -10, 0], 
              opacity: 1, 
              scale: 1,
            }}
            transition={{
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-full rounded-xl border-2 border-green-500 bg-green-50 p-4 text-center font-bold text-green-800"
          >
            <motion.span
              animate={{ 
                scale: [1, 1.5, 1],
                rotate: [0, 10, -10, 0],
                filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block"
            >
              💨
            </motion.span>
            {" "}Wow! You revealed the surprise! 🎊
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
