import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppConfig } from '../types';

interface MessagePageProps {
  config: AppConfig;
}

export default function MessagePage({ config }: MessagePageProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-y-auto bg-linear-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] px-4 py-16">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-2xl space-y-12 rounded-3xl bg-white/95 p-12 shadow-2xl"
      >
        <MessageSection 
          title="How we met... 💫" 
          text={config.how_we_met} 
          delay={0}
        />
        <MessageSection 
          title="Why you matter to me... 💜" 
          text={config.why_you_matter} 
          delay={1000}
        />
        <MessageSection 
          title="Things I never say... 🤫" 
          text={config.things_never_said} 
          delay={2000}
        />
      </motion.div>
    </div>
  );
}

function MessageSection({ title, text, delay }: { title: string; text: string; delay: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTyping(true);
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.substring(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-black text-[#667eea]">{title}</h3>
      <div className="min-h-[60px] text-lg font-medium leading-relaxed text-gray-800">
        {displayedText}
        {isTyping && <span className="typing-cursor" />}
      </div>
    </div>
  );
}
