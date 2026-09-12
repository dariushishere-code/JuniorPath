import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Code2,
  Gamepad2,
  Home,
  LayoutDashboard,
  Lightbulb,
  LogIn,
  LogOut,
  Map,
  MessagesSquare,
  Settings,
  Trophy,
  User,
  UserPlus,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface GlassDockItem {
  icon: string;
  title: string;
  href: string;
  onClick?: (e: ReactMouseEvent<HTMLAnchorElement>) => void;
}

export interface GlassDockProps {
  items: GlassDockItem[];
  className?: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
  home: Home,
  settings: Settings,
  roadmap: Map,
  dashboard: LayoutDashboard,
  flashcards: BookOpen,
  suggest: Lightbulb,
  interview: MessagesSquare,
  snake: Gamepad2,
  logout: LogOut,
  user: User,
  code: Code2,
  trophy: Trophy,
  zap: Zap,
  login: LogIn,
  signup: UserPlus,
};

const BASE_SIZE = 44;
const MAX_SIZE = 64;
const MAGNIFY_DISTANCE = 120;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

export function GlassDock({ items, className }: GlassDockProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [scales, setScales] = useState<number[]>(() => items.map(() => 1));
  const [hovered, setHovered] = useState<number | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    setScales(items.map(() => 1));
  }, [items]);

  const resetScales = useCallback(() => {
    setScales(items.map(() => 1));
  }, [items]);

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;

      const next = items.map((_, i) => {
        const el = itemRefs.current[i];
        if (!el) return 1;
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const distance = Math.abs(e.clientX - centerX);
        if (distance > MAGNIFY_DISTANCE) return 1;
        const t = 1 - distance / MAGNIFY_DISTANCE;
        return 1 + t * t * ((MAX_SIZE - BASE_SIZE) / BASE_SIZE);
      });
      setScales(next);
    },
    [items, reducedMotion],
  );

  const resolvedItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        Icon: ICON_MAP[item.icon.toLowerCase()] ?? Code2,
      })),
    [items],
  );

  return (
    <div
      ref={dockRef}
      role="toolbar"
      aria-label="Dock"
      className={cn(
        'fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-end gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 shadow-2xl backdrop-blur-xl',
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        resetScales();
        setHovered(null);
      }}
    >
      {resolvedItems.map((item, i) => {
        const scale = reducedMotion ? 1 : scales[i] ?? 1;
        const size = BASE_SIZE * scale;

        return (
          <div key={`${item.href}-${item.title}`} className="relative flex flex-col items-center">
            {hovered === i && (
              <span
                role="tooltip"
                className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-md border border-white/10 bg-[#161616]/95 px-2.5 py-1 text-xs font-medium text-white shadow-lg backdrop-blur-sm"
              >
                {item.title}
              </span>
            )}
            <Link
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              to={item.href}
              title={item.title}
              aria-label={item.title}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick(e);
                }
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              style={{
                width: size,
                height: size,
                transition: reducedMotion
                  ? undefined
                  : 'width 80ms ease-out, height 80ms ease-out',
              }}
            >
              <item.Icon
                size={Math.round(20 * (reducedMotion ? 1 : Math.min(scale, 1.3)))}
                strokeWidth={1.75}
                aria-hidden
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default GlassDock;
