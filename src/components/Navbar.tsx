import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, LogOut, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useStore();
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-green-500 flex items-center justify-center">
              <Code2 size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Junior<span className="text-purple-400">Path</span>
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
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
              <div className="flex items-center gap-3">
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
      </div>
    </motion.nav>
  );
}
