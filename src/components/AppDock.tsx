import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassDock, type GlassDockItem } from './ui/glass-dock';
import { useStore } from '../store/useStore';

export default function AppDock() {
  const { isAuthenticated, logout } = useStore();
  const navigate = useNavigate();

  const items: GlassDockItem[] = useMemo(() => {
    if (isAuthenticated) {
      return [
        { icon: 'home', title: 'Home', href: '/' },
        { icon: 'dashboard', title: 'Dashboard', href: '/dashboard' },
        { icon: 'roadmap', title: 'Roadmap', href: '/roadmap' },
        { icon: 'flashcards', title: 'Flashcards', href: '/flashcards' },
        { icon: 'suggest', title: 'Suggest', href: '/suggest' },
        { icon: 'snake', title: 'Relax', href: '/snake' },
        {
          icon: 'logout',
          title: 'Logout',
          href: '/',
          onClick: () => {
            logout();
            navigate('/');
          },
        },
      ];
    }

    return [
      { icon: 'home', title: 'Home', href: '/' },
      { icon: 'login', title: 'Login', href: '/login' },
      { icon: 'signup', title: 'Sign Up', href: '/signup' },
    ];
  }, [isAuthenticated, logout, navigate]);

  return <GlassDock items={items} />;
}
