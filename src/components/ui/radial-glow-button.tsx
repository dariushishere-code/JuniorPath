import {
  useEffect,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/utils';

export interface RadialGlowButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

const glowStyles = `
@property --rg-pos {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 50%;
}
@property --rg-spread {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 20%;
}
@property --rg-c1 {
  syntax: '<color>';
  inherits: false;
  initial-value: #14b8a6;
}
@property --rg-c2 {
  syntax: '<color>';
  inherits: false;
  initial-value: #a3e635;
}
@property --rg-stop {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 40%;
}
@property --rg-shine {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

@keyframes rg-shine-spin {
  to {
    --rg-shine: 360deg;
  }
}

.radial-glow-btn {
  --rg-pos: 50%;
  --rg-spread: 20%;
  --rg-c1: #14b8a6;
  --rg-c2: #a3e635;
  --rg-stop: 40%;
  --rg-shine: 0deg;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border: 1px solid transparent;
  background:
    linear-gradient(#0a0a0a, #0a0a0a) padding-box,
    conic-gradient(
      from var(--rg-shine),
      #14b8a6,
      #a3e635,
      #22d3ee,
      #14b8a6
    ) border-box;
  transition:
    --rg-pos 0.35s ease,
    --rg-spread 0.35s ease,
    --rg-stop 0.35s ease,
    --rg-c1 0.35s ease,
    --rg-c2 0.35s ease,
    transform 0.2s ease,
    box-shadow 0.35s ease;
}

.radial-glow-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(
    circle at var(--rg-pos) 50%,
    color-mix(in srgb, var(--rg-c1) 55%, transparent) 0%,
    color-mix(in srgb, var(--rg-c2) 35%, transparent) var(--rg-stop),
    transparent calc(var(--rg-stop) + var(--rg-spread))
  );
  opacity: 0.55;
  transition: opacity 0.35s ease;
}

.radial-glow-btn:hover {
  --rg-pos: 70%;
  --rg-spread: 35%;
  --rg-stop: 55%;
  --rg-c1: #2dd4bf;
  --rg-c2: #bef264;
  animation: rg-shine-spin 2.5s linear infinite;
  box-shadow:
    0 0 24px color-mix(in srgb, #14b8a6 35%, transparent),
    0 0 48px color-mix(in srgb, #a3e635 20%, transparent);
}

.radial-glow-btn:hover::before {
  opacity: 0.9;
}

.radial-glow-btn:active {
  transform: scale(0.98);
}

.radial-glow-btn:disabled {
  opacity: 0.5;
  pointer-events: none;
  animation: none;
}

@media (prefers-reduced-motion: reduce) {
  .radial-glow-btn,
  .radial-glow-btn:hover {
    animation: none;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
  }
}
`;

let glowStylesInjected = false;

function ensureGlowStyles() {
  if (glowStylesInjected || typeof document === 'undefined') return;
  if (document.getElementById('radial-glow-btn-styles')) {
    glowStylesInjected = true;
    return;
  }
  const el = document.createElement('style');
  el.id = 'radial-glow-btn-styles';
  el.textContent = glowStyles;
  document.head.appendChild(el);
  glowStylesInjected = true;
}

export function RadialGlowButton({
  children = 'Get Extension',
  className,
  style,
  type = 'button',
  ...props
}: RadialGlowButtonProps) {
  useEffect(() => {
    ensureGlowStyles();
  }, []);

  return (
    <button
      type={type}
      className={cn(
        'radial-glow-btn inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white',
        className,
      )}
      style={style as CSSProperties}
      {...props}
    >
      {children}
    </button>
  );
}

export default RadialGlowButton;
