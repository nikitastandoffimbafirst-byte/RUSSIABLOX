
import React from 'react';
import { User, Level } from '../types';
import { LEVELS, CREATOR_NAME, AVATAR_URL } from '../constants';

interface MenuProps {
  user: User;
  onStartGame: (level: Level) => void;
  onOpenAdmin: () => void;
}

export const Menu: React.FC<MenuProps> = ({ user, onStartGame, onOpenAdmin }) => {
  return (
    <div className="h-full overflow-y-auto bg-slate-900 pb-12">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={AVATAR_URL} alt="Logo" className="w-10 h-10 rounded-lg" />
          <h1 className="text-2xl font-black text-white">RUSSIA<span className="text-red-500">BLOX</span></h1>
        </div>
        
        <div className="flex-1 text-center hidden md:block">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full text-sm font-bold border border-slate-700">
            <span className="text-slate-400">Создатель:</span>
            <span className="text-blue-400">{CREATOR_NAME}</span>
            <svg className="w-4 h-4 text-blue-500 fill-current" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293l-4.5 4.5a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L8.5 11.086l3.793-3.793a1 1 0 111.414 1.414z" />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user.isAdmin && (
            <button 
              onClick={onOpenAdmin}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-lg border border-red-500/50 font-bold transition-all"
            >
              Админ
            </button>
          )}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white">{user.username}</p>
              <p className="text-xs text-slate-500">Игрок</p>
            </div>
            <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-slate-700" alt="avatar" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 mt-12">
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4">ПАРКУР ВЕРШИНЫ</h2>
              <p className="text-xl text-blue-100 max-w-xl mb-8">Прыгай, беги и ставь рекорды в самых атмосферных локациях необъятной.</p>
              <button 
                onClick={() => onStartGame(LEVELS[0])}
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-lg hover:bg-blue-50 transform hover:scale-105 transition-all shadow-xl"
              >
                ИГРАТЬ СЕЙЧАС
              </button>
            </div>
            <div className="absolute top-0 right-0 h-full w-1/2 opacity-30 select-none pointer-events-none">
                <img src="https://picsum.photos/id/233/800/800" className="object-cover h-full w-full rotate-12 translate-x-12 translate-y-12 rounded-3xl" alt="promo" />
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-white uppercase tracking-widest">Выбери свой мир</h3>
            <span className="text-slate-500 font-bold">{LEVELS.length} Мира доступно</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LEVELS.map((level) => (
              <div 
                key={level.id}
                className="group bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer shadow-lg hover:shadow-blue-500/10"
                onClick={() => onStartGame(level)}
              >
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={level.thumbnail} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    alt={level.name}
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/20">
                    {level.difficulty}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{level.name}</h4>
                  <p className="text-slate-400 text-sm mb-6">{level.description}</p>
                  <button className="w-full bg-slate-700 group-hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all">
                    Войти в мир
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-20 border-t border-slate-800 pt-12 text-center text-slate-600 px-6">
        <p className="mb-4">© 2024 RussiaBlox - Все права защищены</p>
        <p className="text-sm">Сделано с любовью для всех любителей паркура. Creator: {CREATOR_NAME} ✓</p>
      </footer>
    </div>
  );
};
