
import React from 'react';
import { User } from '../types';

interface AdminPanelProps {
  user: User;
  onBack: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ user, onBack }) => {
  return (
    <div className="h-full bg-slate-950 p-6 md:p-12 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black text-white flex items-center gap-4">
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-md uppercase">Root</span>
              АДМИН-ПАНЕЛЬ
            </h1>
            <p className="text-slate-500 mt-2 italic">Доступ разрешен для: {user.email}</p>
          </div>
          <button 
            onClick={onBack}
            className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            Назад в меню
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-2">Активные игроки</p>
                <p className="text-5xl font-black text-white">1,248</p>
                <div className="mt-4 h-1 bg-blue-500 w-2/3 rounded-full"></div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-2">Серверная нагрузка</p>
                <p className="text-5xl font-black text-white">24%</p>
                <div className="mt-4 h-1 bg-green-500 w-1/4 rounded-full"></div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-2">Ошибки (24ч)</p>
                <p className="text-5xl font-black text-white">0</p>
                <div className="mt-4 h-1 bg-slate-700 w-full rounded-full"></div>
            </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
                <h3 className="font-black text-white uppercase">Список пользователей</h3>
                <input 
                    type="text" 
                    placeholder="Поиск..." 
                    className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg text-white text-sm focus:outline-none"
                />
            </div>
            <table className="w-full text-left">
                <thead className="text-slate-500 text-xs uppercase font-black bg-slate-950/50">
                    <tr>
                        <th className="px-6 py-4">ID</th>
                        <th className="px-6 py-4">Имя</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Статус</th>
                        <th className="px-6 py-4">Действия</th>
                    </tr>
                </thead>
                <tbody className="text-slate-300 divide-y divide-slate-800">
                    <tr>
                        <td className="px-6 py-4 font-mono text-xs">#99281</td>
                        <td className="px-6 py-4 font-bold">Nurib</td>
                        <td className="px-6 py-4">creator@russiablox.com</td>
                        <td className="px-6 py-4"><span className="bg-blue-500/10 text-blue-500 px-2 py-1 rounded-md text-[10px] font-bold uppercase">Разработчик</span></td>
                        <td className="px-6 py-4"><button className="text-slate-500 hover:text-white transition-colors">Изменить</button></td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 font-mono text-xs">#81232</td>
                        <td className="px-6 py-4 font-bold">{user.username}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4"><span className="bg-red-500/10 text-red-500 px-2 py-1 rounded-md text-[10px] font-bold uppercase">Админ</span></td>
                        <td className="px-6 py-4"><button className="text-slate-500 hover:text-white transition-colors">Изменить</button></td>
                    </tr>
                    {[1, 2, 3, 4, 5].map(i => (
                        <tr key={i}>
                            <td className="px-6 py-4 font-mono text-xs">#{Math.floor(Math.random() * 90000) + 10000}</td>
                            <td className="px-6 py-4 font-bold">Игрок_{i}</td>
                            <td className="px-6 py-4">player{i}@mail.ru</td>
                            <td className="px-6 py-4"><span className="bg-green-500/10 text-green-500 px-2 py-1 rounded-md text-[10px] font-bold uppercase">В игре</span></td>
                            <td className="px-6 py-4"><button className="text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Ban</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};
