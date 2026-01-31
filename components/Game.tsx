
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Level } from '../types';

interface GameProps {
  level: Level;
  onExit: () => void;
  userAvatar: string;
}

export const Game: React.FC<GameProps> = ({ level, onExit, userAvatar }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(level.id === 'moscow-winter' ? 0xccddff : level.id === 'cyber-russia' ? 0x050510 : 0xaa4444);
    
    // FOG
    // Cast background to THREE.Color to safely access getHex()
    scene.fog = new THREE.FogExp2((scene.background as THREE.Color).getHex(), 0.02);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(50, 50, 50);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // PLAYER (Simple cube with face)
    const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
    const playerMaterial = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
    const player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.y = 2;
    player.castShadow = true;
    scene.add(player);

    // PLAYER AVATAR FACE (Just a sprite floating on top)
    const textureLoader = new THREE.TextureLoader();
    const avatarTexture = textureLoader.load(userAvatar);
    const avatarMaterial = new THREE.SpriteMaterial({ map: avatarTexture });
    const avatarSprite = new THREE.Sprite(avatarMaterial);
    avatarSprite.scale.set(1.2, 1.2, 1.2);
    avatarSprite.position.y = 1.2;
    player.add(avatarSprite);

    // WORLD GENERATION (Parkour Platforms)
    const platforms: THREE.Mesh[] = [];
    // Fix: Explicitly type color as THREE.ColorRepresentation to accept both hex numbers and string color codes
    const createPlatform = (x: number, y: number, z: number, w = 3, d = 3, color: THREE.ColorRepresentation = 0xffffff) => {
        const geo = new THREE.BoxGeometry(w, 0.5, d);
        const mat = new THREE.MeshStandardMaterial({ color });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, y, z);
        mesh.receiveShadow = true;
        scene.add(mesh);
        platforms.push(mesh);
    };

    // Spawn point
    createPlatform(0, 0, 0, 5, 5, 0x333333);

    // Generate path
    let lastPos = { x: 0, y: 0, z: 0 };
    for (let i = 0; i < 40; i++) {
        const dx = (Math.random() - 0.5) * 6;
        const dy = (Math.random() - 0.2) * 2;
        const dz = -4 - Math.random() * 4;
        
        lastPos.x += dx;
        lastPos.y += dy;
        lastPos.z += dz;
        
        createPlatform(lastPos.x, lastPos.y, lastPos.z, 2.5, 2.5, level.color);
    }

    // CONTROLS
    const keys: { [key: string]: boolean } = {};
    const onKeyDown = (e: KeyboardEvent) => keys[e.code] = true;
    const onKeyUp = (e: KeyboardEvent) => keys[e.code] = false;
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // PHYSICS-ISH
    let playerVelocity = new THREE.Vector3();
    let canJump = false;
    const gravity = -0.015;
    const jumpForce = 0.35;
    const moveSpeed = 0.12;

    const animate = () => {
      const frameId = requestAnimationFrame(animate);

      // Movement
      if (keys['KeyW']) playerVelocity.z = -moveSpeed;
      else if (keys['KeyS']) playerVelocity.z = moveSpeed;
      else playerVelocity.z *= 0.8;

      if (keys['KeyA']) playerVelocity.x = -moveSpeed;
      else if (keys['KeyD']) playerVelocity.x = moveSpeed;
      else playerVelocity.x *= 0.8;

      if (keys['Space'] && canJump) {
        playerVelocity.y = jumpForce;
        canJump = false;
      }

      playerVelocity.y += gravity;
      player.position.add(playerVelocity);

      // Simple collision with platforms
      canJump = false;
      platforms.forEach(p => {
        const dx = Math.abs(player.position.x - p.position.x);
        const dz = Math.abs(player.position.z - p.position.z);
        const platformWidth = (p.geometry as THREE.BoxGeometry).parameters.width / 2;
        const platformDepth = (p.geometry as THREE.BoxGeometry).parameters.depth / 2;

        if (dx < platformWidth + 0.5 && dz < platformDepth + 0.5) {
          const dy = player.position.y - p.position.y;
          if (dy > 0 && dy < 1.0 && playerVelocity.y <= 0) {
            player.position.y = p.position.y + 0.75;
            playerVelocity.y = 0;
            canJump = true;
          }
        }
      });

      // Death check
      if (player.position.y < -20) {
        player.position.set(0, 2, 0);
        playerVelocity.set(0, 0, 0);
      }

      // Camera follow
      const targetPos = player.position.clone();
      camera.position.lerp(new THREE.Vector3(targetPos.x, targetPos.y + 6, targetPos.z + 12), 0.1);
      camera.lookAt(targetPos);

      renderer.render(scene, camera);
    };

    const timerInterval = setInterval(() => {
        setGameTime(prev => prev + 1);
        setScore(Math.floor(Math.abs(player.position.z) / 2));
    }, 1000);

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('resize', handleResize);
      clearInterval(timerInterval);
      renderer.dispose();
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [level, userAvatar]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      
      {/* Game UI */}
      <div className="absolute top-6 left-6 flex flex-col gap-2">
        <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Дистанция</p>
          <p className="text-2xl font-black text-white">{score} <span className="text-sm font-normal text-slate-500">м</span></p>
        </div>
        <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Время</p>
          <p className="text-2xl font-black text-white">{Math.floor(gameTime / 60)}:{String(gameTime % 60).padStart(2, '0')}</p>
        </div>
      </div>

      <div className="absolute top-6 right-6 flex items-center gap-4">
        <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-400 uppercase">Локация</p>
            <p className="text-sm font-bold text-white">{level.name}</p>
          </div>
          <div className={`w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,0,0,0.5)]`} style={{ backgroundColor: level.color }}></div>
        </div>
        <button 
          onClick={onExit}
          className="bg-red-500 hover:bg-red-600 text-white font-black px-6 py-3 rounded-2xl transition-all shadow-xl active:scale-95"
        >
          ВЫЙТИ
        </button>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-12 pointer-events-none">
          <div className="flex flex-col items-center gap-2">
              <div className="flex gap-2">
                  <kbd className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2 rounded-lg text-white font-bold">W</kbd>
              </div>
              <div className="flex gap-2">
                  <kbd className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2 rounded-lg text-white font-bold">A</kbd>
                  <kbd className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2 rounded-lg text-white font-bold">S</kbd>
                  <kbd className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2 rounded-lg text-white font-bold">D</kbd>
              </div>
              <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold mt-1">Движение</p>
          </div>
          <div className="flex flex-col items-center gap-2">
              <kbd className="bg-white/10 backdrop-blur-md border border-white/20 px-12 py-2 rounded-lg text-white font-bold uppercase text-xs">Пробел</kbd>
              <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold mt-1">Прыжок</p>
          </div>
      </div>
    </div>
  );
};
