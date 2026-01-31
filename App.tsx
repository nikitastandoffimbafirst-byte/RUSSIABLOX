
import React, { useState, useEffect } from 'react';
import { Auth } from './components/Auth';
import { Menu } from './components/Menu';
import { Game } from './components/Game';
import { AdminPanel } from './components/AdminPanel';
import { User, GameState, Level } from './types';
import { ADMIN_EMAIL } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('AUTH');
  const [user, setUser] = useState<User | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);

  const handleLogin = (username: string, email: string) => {
    const isAdmin = email === ADMIN_EMAIL;
    const newUser: User = {
      username,
      email,
      isAdmin,
      avatar: 'https://input.fyi/images/v1/4f242551e18820c754687d7b30903328.jpg'
    };
    setUser(newUser);
    setGameState('MENU');
  };

  const handleStartGame = (level: Level) => {
    setSelectedLevel(level);
    setGameState('GAME');
  };

  const handleBackToMenu = () => {
    setGameState('MENU');
    setSelectedLevel(null);
  };

  const handleOpenAdmin = () => {
    if (user?.isAdmin) {
      setGameState('ADMIN');
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-slate-900 select-none">
      {gameState === 'AUTH' && <Auth onLogin={handleLogin} />}
      
      {gameState === 'MENU' && user && (
        <Menu 
          user={user} 
          onStartGame={handleStartGame} 
          onOpenAdmin={handleOpenAdmin} 
        />
      )}

      {gameState === 'GAME' && selectedLevel && user && (
        <Game 
          level={selectedLevel} 
          onExit={handleBackToMenu} 
          userAvatar={user.avatar}
        />
      )}

      {gameState === 'ADMIN' && user?.isAdmin && (
        <AdminPanel user={user} onBack={handleBackToMenu} />
      )}
    </div>
  );
};

export default App;
