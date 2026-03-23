import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { AppConfig } from '../types';

interface LoginPageProps {
  config: AppConfig;
  onLogin: () => void;
}

export default function LoginPage({ config, onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      username.toLowerCase() === config.correct_username.toLowerCase() &&
      password === config.correct_password
    ) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#667eea', '#764ba2', '#f093fb']
      });
      setTimeout(onLogin, 1000);
    } else {
      setError("Hmm... are you even my best friend?");
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] p-4">
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md rounded-3xl bg-white/95 p-10 shadow-2xl backdrop-blur-sm"
      >
        <h1 className="mb-2 text-center text-3xl font-black text-[#667eea]">🎂 Secret Access</h1>
        <p className="mb-8 text-center text-sm font-medium text-gray-400">Only the best friend knows...</p>
        
        {error && (
          <motion.div 
            initial={{ x: -10 }}
            animate={{ x: [0, -10, 10, -10, 10, 0] }}
            className="mb-6 rounded-xl border-2 border-yellow-500 bg-yellow-50 p-4 text-center text-sm font-bold text-yellow-800"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-[#764ba2]">Username</label>
            <span className="block text-xs italic text-gray-400">{config.username_hint}</span>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full rounded-xl border-2 border-gray-100 px-4 py-3 text-lg text-gray-800 transition-all focus:border-[#667eea] focus:outline-hidden focus:ring-4 focus:ring-[#667eea]/10"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-[#764ba2]">Password</label>
            <span className="block text-xs italic text-gray-400">{config.password_hint}</span>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full rounded-xl border-2 border-gray-100 px-4 py-3 text-lg text-gray-800 transition-all focus:border-[#667eea] focus:outline-hidden focus:ring-4 focus:ring-[#667eea]/10"
            />
          </div>
          <button 
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-linear-to-r from-[#667eea] to-[#764ba2] py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Enter 🔓
          </button>
        </form>
      </motion.div>
    </div>
  );
}
