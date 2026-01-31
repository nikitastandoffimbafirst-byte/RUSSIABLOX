
export interface User {
  username: string;
  email: string;
  isAdmin: boolean;
  avatar: string;
}

export interface Level {
  id: string;
  name: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  color: string;
  thumbnail: string;
}

export type GameState = 'AUTH' | 'MENU' | 'GAME' | 'ADMIN';

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}
