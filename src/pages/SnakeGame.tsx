import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const directionRef = useRef<Direction>('RIGHT');
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem('juniorpath_snake_highscore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  // Generate smooth jazz-like ambient music using Web Audio API
  const startMusic = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = ctx;
      
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.08;
      masterGain.connect(ctx.destination);
      gainRef.current = masterGain;

      // Create a smooth jazz-like ambient sound
      const playNote = (freq: number, startTime: number, duration: number) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        noteGain.gain.setValueAtTime(0, startTime);
        noteGain.gain.linearRampToValueAtTime(0.3, startTime + 0.1);
        noteGain.gain.linearRampToValueAtTime(0.1, startTime + duration * 0.7);
        noteGain.gain.linearRampToValueAtTime(0, startTime + duration);
        
        osc.connect(noteGain);
        noteGain.connect(masterGain);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      // Jazz chord progression (Cmaj7, Am7, Dm7, G7)
      const chords = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [196.00, 246.94, 293.66, 349.23], // Dm7
        [196.00, 246.94, 329.63, 392.00], // G7
      ];

      const scheduleLoop = () => {
        const now = ctx.currentTime;
        const beatDuration = 0.8;

        chords.forEach((chord, chordIdx) => {
          chord.forEach((freq, noteIdx) => {
            const startTime = now + (chordIdx * 4 * beatDuration) + (noteIdx * 0.05);
            playNote(freq, startTime, beatDuration * 3.5);
          });
        });

        // Add a walking bass line
        const bassNotes = [130.81, 110.00, 98.00, 98.00]; // C2, A1, G1, G1
        bassNotes.forEach((freq, i) => {
          const startTime = now + (i * 4 * beatDuration);
          playNote(freq, startTime, beatDuration * 3);
          playNote(freq * 1.5, startTime + beatDuration * 2, beatDuration);
        });

        // Schedule next loop
        setTimeout(scheduleLoop, chords.length * 4 * beatDuration * 1000 - 100);
      };

      scheduleLoop();
      setMusicPlaying(true);
    } catch (e) {
      console.log('Audio not supported');
    }
  }, []);

  const stopMusic = useCallback(() => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setMusicPlaying(false);
  }, []);

  const toggleMusic = () => {
    if (musicPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  // Generate random food position
  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some(seg => seg.x === newFood.x && seg.y === newFood.y));
    return newFood;
  }, []);

  // Game loop
  const gameLoop = useCallback(() => {
    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };
      const dir = directionRef.current;

      switch (dir) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      // Check self collision
      if (prevSnake.some(seg => seg.x === head.x && seg.y === head.y)) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => {
          const newScore = prev + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('juniorpath_snake_highscore', newScore.toString());
          }
          return newScore;
        });
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, generateFood, highScore]);

  // Start/stop game loop
  useEffect(() => {
    if (isPlaying && !isPaused && !gameOver) {
      intervalRef.current = window.setInterval(gameLoop, INITIAL_SPEED);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, isPaused, gameOver, gameLoop]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || isPaused) return;

      const dir = directionRef.current;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (dir !== 'DOWN') { directionRef.current = 'UP'; setDirection('UP'); }
          break;
        case 'ArrowDown':
        case 's':
          if (dir !== 'UP') { directionRef.current = 'DOWN'; setDirection('DOWN'); }
          break;
        case 'ArrowLeft':
        case 'a':
          if (dir !== 'RIGHT') { directionRef.current = 'LEFT'; setDirection('LEFT'); }
          break;
        case 'ArrowRight':
        case 'd':
          if (dir !== 'LEFT') { directionRef.current = 'RIGHT'; setDirection('RIGHT'); }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isPaused]);

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid (subtle)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw food
    ctx.fillStyle = '#EF4444';
    ctx.shadowColor = '#EF4444';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw snake
    snake.forEach((segment, index) => {
      const isHead = index === 0;
      const progress = index / snake.length;
      
      if (isHead) {
        ctx.fillStyle = '#A855F7';
        ctx.shadowColor = '#A855F7';
        ctx.shadowBlur = 8;
      } else {
        const alpha = 1 - progress * 0.5;
        ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
        ctx.shadowBlur = 0;
      }

      const padding = isHead ? 1 : 2;
      const x = segment.x * CELL_SIZE + padding;
      const y = segment.y * CELL_SIZE + padding;
      const w = CELL_SIZE - padding * 2;
      const h = CELL_SIZE - padding * 2;
      const r = isHead ? 5 : 3;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();
    });
    ctx.shadowBlur = 0;

    // Draw game over overlay
    if (gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 10);
      ctx.font = '14px Inter';
      ctx.fillStyle = '#9CA3AF';
      ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
    }
  }, [snake, food, gameOver, score]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood([{ x: 10, y: 10 }]));
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Mobile controls
  const handleDirection = (dir: Direction) => {
    const current = directionRef.current;
    if (
      (dir === 'UP' && current !== 'DOWN') ||
      (dir === 'DOWN' && current !== 'UP') ||
      (dir === 'LEFT' && current !== 'RIGHT') ||
      (dir === 'RIGHT' && current !== 'LEFT')
    ) {
      directionRef.current = dir;
      setDirection(dir);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft size={16} />
            <span className="text-sm">Back to Dashboard</span>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">🐍 Snake Game</h1>
              <p className="text-sm text-gray-400">Take a break from learning and have some fun!</p>
            </div>
            <button
              onClick={toggleMusic}
              className={`p-2 rounded-lg transition-colors ${
                musicPlaying ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-gray-400'
              }`}
              title={musicPlaying ? 'Mute music' : 'Play smooth jazz'}
            >
              {musicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>
        </motion.div>

        {/* Score */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-xl bg-[#161616] border border-white/5">
              <span className="text-xs text-gray-500">Score</span>
              <div className="text-xl font-bold text-white">{score}</div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-[#161616] border border-white/5">
              <span className="text-xs text-gray-500">High Score</span>
              <div className="text-xl font-bold text-purple-400">{highScore}</div>
            </div>
          </div>
          <div className="flex gap-2">
            {isPlaying && (
              <button onClick={togglePause} className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors">
                {isPaused ? <Play size={18} /> : <Pause size={18} />}
              </button>
            )}
            <button onClick={startGame} className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors">
              <RotateCcw size={18} />
            </button>
          </div>
        </motion.div>

        {/* Game Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0A] mx-auto"
          style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE, maxWidth: '100%' }}
        >
          <canvas
            ref={canvasRef}
            width={GRID_SIZE * CELL_SIZE}
            height={GRID_SIZE * CELL_SIZE}
            className="snake-canvas"
          />

          {/* Start overlay */}
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <button
                onClick={startGame}
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold flex items-center gap-2 transition-colors"
              >
                <Play size={18} />
                Start Game
              </button>
            </div>
          )}

          {/* Paused overlay */}
          {isPaused && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="text-center">
                <p className="text-xl font-bold text-white mb-2">Paused</p>
                <button
                  onClick={togglePause}
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium"
                >
                  Resume
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Mobile Controls */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-6 md:hidden">
          <div className="grid grid-cols-3 gap-2 max-w-[180px] mx-auto">
            <div />
            <button onClick={() => handleDirection('UP')} className="p-3 rounded-xl bg-[#161616] border border-white/10 text-white active:bg-purple-500/20 transition-colors">
              ↑
            </button>
            <div />
            <button onClick={() => handleDirection('LEFT')} className="p-3 rounded-xl bg-[#161616] border border-white/10 text-white active:bg-purple-500/20 transition-colors">
              ←
            </button>
            <button onClick={() => handleDirection('DOWN')} className="p-3 rounded-xl bg-[#161616] border border-white/10 text-white active:bg-purple-500/20 transition-colors">
              ↓
            </button>
            <button onClick={() => handleDirection('RIGHT')} className="p-3 rounded-xl bg-[#161616] border border-white/10 text-white active:bg-purple-500/20 transition-colors">
              →
            </button>
          </div>
        </motion.div>

        {/* Controls info */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Use <span className="text-gray-300">Arrow Keys</span> or <span className="text-gray-300">WASD</span> to move
          </p>
          <p className="text-xs text-gray-600 mt-1">
            🎵 Click the music icon for smooth jazz vibes
          </p>
        </motion.div>
      </div>
    </div>
  );
}
