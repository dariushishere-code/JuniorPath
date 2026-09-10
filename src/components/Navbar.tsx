import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Code2, LogOut, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';
import { SpotlightNavbar, NavItem } from '../components/ui/spotlight-navbar';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  // Build nav items based on auth state
  const navItems: NavItem[] = isAuthenticated
    ? [
        { label: 'Home', href: '/' },
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Roadmap', href: '/roadmap' },
        { label: 'Flashcards', href: '/flashcards' },
      ]
    : [
        { label: 'Home', href: '/' },
        { label: 'Login', href: '/login' },
        { label: 'Sign Up', href: '/signup' },
      ];

  const handleNavClick = (item: NavItem) => {
    navigate(item.href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="relative flex items-center justify-center h-16 px-4 sm:px-6 lg:px-8">
        {/* Brand (absolute left) */}
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="absolute left-4 sm:left-8 flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-green-500 flex items-center justify-center">
            <Code2 size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold text-white">
            Junior<span className="text-purple-400">Path</span>
          </span>
        </Link>

        {/* Spotlight Navigation (centered) */}
        <div className="hidden md:flex">
          <SpotlightNavbar
            items={navItems}
            onItemClick={handleNavClick}
          />
        </div>

        {/* Auth Controls (absolute right) */}
        <div className="absolute right-4 sm:right-8 flex items-center gap-3 sm:gap-4 shrink-0">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                  <Zap size={14} className="text-purple-400" />
                  <span className="text-sm font-semibold text-purple-300">{user.points} pts</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-green-500 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{user.name[0]?.toUpperCase()}</span>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3 md:hidden">
                {location.pathname !== '/login' && (
                  <Link
                    to="/login"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                )}
                {location.pathname !== '/signup' && (
                  <Link
                    to="/signup"
                    className="text-sm px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
                  >
                    Sign Up
                  </Link>
                )}
              </div>
            )}
          </div>
      </div>
    </nav>
  );
}
