import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/useLanguage';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };
type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
};
type FloatingText = {
  x: number;
  y: number;
  text: string;
  life: number;
  color: string;
};

const GRID_SIZE = 24;
const CELL_SIZE = 24;
const INITIAL_SPEED = 150;
const MIN_SPEED = 70;
const SPEED_STEP = 8;
const LEVEL_SCORE = 50;
const BONUS_POINTS = 50;

export default function SnakeGame() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [bonusFood, setBonusFood] = useState<Position | null>(null);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [pulse, setPulse] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const directionRef = useRef<Direction>('RIGHT');
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);
  const musicTimeoutRef = useRef<number | null>(null);
  const bonusTimeoutRef = useRef<number | null>(null);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem('juniorpath_snake_highscore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  // Animation ticker: drives food glow, star rotation and particles
  useEffect(() => {
    if (!isPlaying || isPaused || gameOver) return;
    const id = window.setInterval(() => {
      setPulse(p => p + 1);
      setParticles(prev =>
        prev
          .map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, vy: p.vy + 0.06, life: p.life - 1 }))
          .filter(p => p.life > 0),
      );
      setFloatingTexts(prev =>
        prev.map(f => ({ ...f, y: f.y - 0.7, life: f.life - 1 })).filter(f => f.life > 0),
      );
    }, 60);
    return () => window.clearInterval(id);
  }, [isPlaying, isPaused, gameOver]);

  // Bonus food disappears after a few seconds
  useEffect(() => {
    if (!bonusFood) return;
    bonusTimeoutRef.current = window.setTimeout(() => setBonusFood(null), 7000);
    return () => {
      if (bonusTimeoutRef.current) window.clearTimeout(bonusTimeoutRef.current);
    };
  }, [bonusFood]);

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
        if (ctx.state === 'closed') return;
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

        // Schedule next loop (track the timeout so it can be cancelled)
        musicTimeoutRef.current = window.setTimeout(
          scheduleLoop,
          chords.length * 4 * beatDuration * 1000 - 100
        );
      };

      scheduleLoop();
      setMusicPlaying(true);
    } catch (e) {
      console.log('Audio not supported');
    }
  }, []);

  const stopMusic = useCallback(() => {
    if (musicTimeoutRef.current) {
      clearTimeout(musicTimeoutRef.current);
      musicTimeoutRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setMusicPlaying(false);
  }, []);

  // Clean up audio scheduling when the component unmounts
  useEffect(() => {
    return () => {
      if (musicTimeoutRef.current) clearTimeout(musicTimeoutRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
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

  // Particle + floating-text helpers
  const spawnBurst = useCallback(
    (x: number, y: number, colors: string[], count = 12) => {
      const parts: Particle[] = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 2.5;
        return {
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          life: 24,
          maxLife: 24,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 1.5 + Math.random() * 2.5,
        };
      });
      setParticles(prev => [...prev, ...parts]);
    },
    [],
  );

  const spawnText = useCallback((x: number, y: number, text: string, color: string) => {
    setFloatingTexts(prev => [...prev, { x, y, text, life: 30, color }]);
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
      const cx = head.x * CELL_SIZE + CELL_SIZE / 2;
      const cy = head.y * CELL_SIZE + CELL_SIZE / 2;

      // Golden bonus food (+50)
      if (bonusFood && head.x === bonusFood.x && head.y === bonusFood.y) {
        setBonusFood(null);
        setScore(prev => {
          const newScore = prev + BONUS_POINTS;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('juniorpath_snake_highscore', newScore.toString());
          }
          return newScore;
        });
        spawnBurst(cx, cy, ['#FBBF24', '#FDE68A', '#FFF7ED', '#F59E0B'], 20);
        spawnText(cx, cy - CELL_SIZE, `+${BONUS_POINTS}`, '#FBBF24');
      }
      // Regular food (+10)
      else if (head.x === food.x && head.y === food.y) {
        setScore(prev => {
          const newScore = prev + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('juniorpath_snake_highscore', newScore.toString());
          }
          return newScore;
        });
        const nextFood = generateFood(newSnake);
        setFood(nextFood);
        spawnBurst(cx, cy, ['#f87171', '#fca5a5', '#fbbf24', '#ffffff'], 14);
        spawnText(cx, cy - CELL_SIZE, '+10', '#fca5a5');

        // 30% chance to drop a golden bonus food
        if (!bonusFood) {
          const free: Position[] = [];
          for (let x = 0; x < GRID_SIZE; x++) {
            for (let y = 0; y < GRID_SIZE; y++) {
              const occupied =
                newSnake.some(s => s.x === x && s.y === y) ||
                (nextFood.x === x && nextFood.y === y);
              if (!occupied) free.push({ x, y });
            }
          }
          if (free.length && Math.random() < 0.3) {
            setBonusFood(free[Math.floor(Math.random() * free.length)]);
          }
        }
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, bonusFood, generateFood, highScore, spawnBurst, spawnText]);

  // Level & speed scale with score (faster as you grow)
  const level = Math.floor(score / LEVEL_SCORE) + 1;
  const speed = Math.max(MIN_SPEED, INITIAL_SPEED - (level - 1) * SPEED_STEP);

  // Start/stop game loop
  useEffect(() => {
    if (isPlaying && !isPaused && !gameOver) {
      intervalRef.current = window.setInterval(gameLoop, speed);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, isPaused, gameOver, gameLoop, speed]);

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

    const W = canvas.width;
    const H = canvas.height;

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#0d0d13');
    bg.addColorStop(1, '#050608');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Subtle checkerboard
    ctx.fillStyle = 'rgba(255, 255, 255, 0.018)';
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if ((x + y) % 2 === 0) {
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }
    }

    // Golden bonus food: rotating + pulsing star
    if (bonusFood) {
      const bx = bonusFood.x * CELL_SIZE + CELL_SIZE / 2;
      const by = bonusFood.y * CELL_SIZE + CELL_SIZE / 2;
      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(pulse * 0.08);
      ctx.shadowColor = '#FBBF24';
      ctx.shadowBlur = 16 + Math.sin(pulse * 0.15) * 6;
      ctx.fillStyle = '#FBBF24';
      ctx.beginPath();
      const outer = CELL_SIZE * 0.42;
      const inner = outer * 0.45;
      for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? outer : inner;
        const a = (Math.PI / 5) * i - Math.PI / 2;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Red berry food with pulsing glow + leaf
    const fx = food.x * CELL_SIZE + CELL_SIZE / 2;
    const fy = food.y * CELL_SIZE + CELL_SIZE / 2;
    ctx.save();
    ctx.shadowColor = '#EF4444';
    ctx.shadowBlur = 14 + Math.sin(pulse * 0.15) * 5;
    const berryGrad = ctx.createRadialGradient(fx - 2, fy - 2, 2, fx, fy, CELL_SIZE * 0.42);
    berryGrad.addColorStop(0, '#fca5a5');
    berryGrad.addColorStop(0.35, '#ef4444');
    berryGrad.addColorStop(1, '#991b1b');
    ctx.fillStyle = berryGrad;
    ctx.beginPath();
    ctx.arc(fx, fy, CELL_SIZE * 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.ellipse(fx + 1, fy - CELL_SIZE * 0.4, CELL_SIZE * 0.06, CELL_SIZE * 0.12, -0.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Snake body: gradient from purple head to green tail
    const HEAD: [number, number, number] = [168, 85, 247];
    const TAIL: [number, number, number] = [34, 197, 94];
    for (let i = snake.length - 1; i >= 0; i--) {
      const seg = snake[i];
      const cx = seg.x * CELL_SIZE + CELL_SIZE / 2;
      const cy = seg.y * CELL_SIZE + CELL_SIZE / 2;
      const isHead = i === 0;
      const frac = snake.length > 1 ? i / (snake.length - 1) : 0;
      const r = Math.round(HEAD[0] + (TAIL[0] - HEAD[0]) * frac);
      const g = Math.round(HEAD[1] + (TAIL[1] - HEAD[1]) * frac);
      const b = Math.round(HEAD[2] + (TAIL[2] - HEAD[2]) * frac);
      const radius = isHead ? CELL_SIZE * 0.48 : CELL_SIZE * 0.42;

      if (isHead) {
        ctx.save();
        ctx.shadowColor = 'rgba(168, 85, 247, 0.85)';
        ctx.shadowBlur = 18;
      }
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      if (isHead) {
        ctx.restore();
      } else {
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.stroke();
      }
    }

    // Head face: eyes that follow the direction + cute tongue
    const head = snake[0];
    if (head) {
      const cx = head.x * CELL_SIZE + CELL_SIZE / 2;
      const cy = head.y * CELL_SIZE + CELL_SIZE / 2;
      const fwd = direction;
      let dx = 0, dy = 0, pxv = 0, pyv = 0;
      if (fwd === 'RIGHT') { dx = 1; pyv = 1; }
      else if (fwd === 'LEFT') { dx = -1; pyv = 1; }
      else if (fwd === 'UP') { dy = -1; pxv = 1; }
      else if (fwd === 'DOWN') { dy = 1; pxv = 1; }

      const eyeD = CELL_SIZE * 0.15;
      const fwdD = CELL_SIZE * 0.12;
      for (const s of [-1, 1]) {
        const ex = cx + pxv * eyeD * s + dx * fwdD;
        const eyy = cy + pyv * eyeD * s + dy * fwdD;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(ex, eyy, 3.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0f0f13';
        ctx.beginPath();
        ctx.arc(ex + dx * 1.6, eyy + dy * 1.6, 1.7, 0, Math.PI * 2);
        ctx.fill();
      }
      // tongue
      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(cx + dx * CELL_SIZE * 0.3, cy + dy * CELL_SIZE * 0.3);
      ctx.lineTo(cx + dx * CELL_SIZE * 0.48, cy + dy * CELL_SIZE * 0.48);
      ctx.moveTo(cx + dx * CELL_SIZE * 0.48, cy + dy * CELL_SIZE * 0.48);
      ctx.lineTo(cx + dx * CELL_SIZE * 0.42 - dy * 2, cy + dy * CELL_SIZE * 0.42 + dx * 2);
      ctx.moveTo(cx + dx * CELL_SIZE * 0.48, cy + dy * CELL_SIZE * 0.48);
      ctx.lineTo(cx + dx * CELL_SIZE * 0.42 + dy * 2, cy + dy * CELL_SIZE * 0.42 - dx * 2);
      ctx.stroke();
    }

    // Particles
    particles.forEach(p => {
      const alpha = Math.max(0, p.life / p.maxLife);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (0.4 + alpha * 0.6), 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Floating score texts
    floatingTexts.forEach(ft => {
      ctx.globalAlpha = Math.max(0, ft.life / 30);
      ctx.fillStyle = ft.color;
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(ft.text, ft.x, ft.y);
    });
    ctx.globalAlpha = 1;

    // Soft darkening behind the game-over overlay
    if (gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.fillRect(0, 0, W, H);
    }
  }, [snake, food, bonusFood, gameOver, score, pulse, particles, floatingTexts, direction]);

  const startGame = () => {
    setBonusFood(null);
    setParticles([]);
    setFloatingTexts([]);
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
            <span className="text-sm">{t('snake.backToDashboard')}</span>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">🐍 {t('snake.title')}</h1>
              <p className="text-sm text-gray-400">{t('snake.subtitle')}</p>
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
          <div className="flex items-center gap-3 flex-wrap">
            <div className="px-4 py-2 rounded-xl bg-[#161616] border border-white/5">
              <span className="text-xs text-gray-500">{t('snake.score')}</span>
              <div className="text-xl font-bold text-white">{score}</div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-[#161616] border border-white/5">
              <span className="text-xs text-gray-500">{t('snake.highScore')}</span>
              <div className="text-xl font-bold text-purple-400">{highScore}</div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-xs text-emerald-400/80">{t('snake.level')}</span>
              <div className="text-xl font-bold text-emerald-400">{level}</div>
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
          style={{ width: GRID_SIZE * CELL_SIZE, maxWidth: '100%', aspectRatio: '1 / 1' }}
        >
          <canvas
            ref={canvasRef}
            width={GRID_SIZE * CELL_SIZE}
            height={GRID_SIZE * CELL_SIZE}
            className="w-full h-auto snake-canvas"
          />

          {/* Start overlay */}
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <button
                onClick={startGame}
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold flex items-center gap-2 transition-colors"
              >
                <Play size={18} />
                {t('snake.start')}
              </button>
            </div>
          )}

          {/* Paused overlay */}
          {isPaused && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="text-center">
                <p className="text-xl font-bold text-white mb-2">{t('snake.paused')}</p>
                <button
                  onClick={togglePause}
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium"
                >
                  {t('snake.resume')}
                </button>
              </div>
            </div>
          )}

          {/* Game over overlay */}
          {gameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            >
              <div className="text-center px-6">
                <div className="text-4xl mb-3">💀</div>
                <h2 className="text-2xl font-bold text-white mb-2">{t('snake.gameOver')}</h2>
                <p className="text-gray-300 mb-1">
                  {t('snake.score')}: <span className="font-semibold text-white">{score}</span>
                </p>
                {score > 0 && score >= highScore && (
                  <p className="text-amber-400 text-sm mb-4">🏆 {t('snake.newHighScore')}</p>
                )}
                <button
                  onClick={startGame}
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold flex items-center gap-2 mx-auto transition-colors"
                >
                  <RotateCcw size={18} />
                  {t('snake.playAgain')}
                </button>
              </div>
            </motion.div>
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
          <p className="text-xs text-gray-600 mt-1">{t('snake.musicHint')}</p>
          <p className="text-xs text-amber-500/70 mt-2">{t('snake.bonusHint')}</p>
        </motion.div>
      </div>
    </div>
  );
}
