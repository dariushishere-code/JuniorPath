import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassDock, type GlassDockItem } from './ui/glass-dock';
import { useStore } from '../store/useStore';
import { useLanguage } from '../i18n/useLanguage';

export default function AppDock() {
  const { isAuthenticated, logout } = useStore();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const items: GlassDockItem[] = useMemo(() => {
    if (isAuthenticated) {
      return [
        { icon: 'home', title: t('dock.home'), href: '/' },
        { icon: 'dashboard', title: t('dock.dashboard'), href: '/dashboard' },
        { icon: 'roadmap', title: t('dock.roadmap'), href: '/roadmap' },
        { icon: 'flashcards', title: t('dock.flashcards'), href: '/flashcards' },
        { icon: 'interview', title: t('dock.interview'), href: '/interview-prep' },
        { icon: 'suggest', title: t('dock.suggest'), href: '/suggest' },
        { icon: 'snake', title: t('dock.relax'), href: '/snake' },
        {
          icon: 'logout',
          title: t('dock.logout'),
          href: '/',
          onClick: () => {
            logout();
            navigate('/');
          },
        },
      ];
    }

    return [
      { icon: 'home', title: t('dock.home'), href: '/' },
      { icon: 'login', title: t('dock.login'), href: '/login' },
      { icon: 'signup', title: t('dock.signup'), href: '/signup' },
    ];
  }, [isAuthenticated, logout, navigate, t]);

  return <GlassDock items={items} />;
}
