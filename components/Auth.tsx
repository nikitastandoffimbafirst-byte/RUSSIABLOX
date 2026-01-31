
import React, { useState } from 'react';
import { AVATAR_URL } from '../constants';

interface AuthProps {
  onLogin: (username: string, email: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && email.trim()) {
      onLogin(username, email);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[url('https://picsum.photos/id/230/1920/1080')] bg-cover bg-center">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
      
      <div className="relative z-10 w-full max-w-md p-8 bg-slate-900/90 border border-slate-700 rounded-3xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <img src={AVATAR_URL} alt="Logo" className="w-24 h-24 rounded-2xl shadow-xl mb-4 border-2 border-blue-500" />
          <h1 className="text-4xl font-black tracking-tighter text-white">RUSSIA<span className="text-red-500">BLOX</span></h1>
          <p className="text-slate-400 mt-2">Добро пожаловать в мир приключений!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest mb-2">Имя пользователя</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ваш никнейм"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest mb-2">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.ru"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <p className="text-xs text-slate-500 mt-2 italic">Для доступа к админ-панели используйте спец. почту</p>
          </div>
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black py-4 rounded-xl shadow-lg transform active:scale-95 transition-all uppercase tracking-widest text-lg"
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};
