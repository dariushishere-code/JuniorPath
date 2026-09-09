import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Stack = 'frontend' | 'backend' | 'fullstack';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface User {
  id: string;
  email: string;
  name: string;
  points: number;
  selectedStack: Stack | null;
  completedProjects: string[];
  readFlashcards: string[];
  projectGithubLinks: Record<string, string>;
  createdAt: string;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string, name: string) => boolean;
  logout: () => void;
  selectStack: (stack: Stack) => void;
  completeProject: (projectId: string, githubLink?: string) => void;
  markFlashcardRead: (cardId: string) => void;
  setGithubLink: (projectId: string, link: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (email: string, _password: string) => {
        const stored = localStorage.getItem('juniorpath_users');
        const users = stored ? JSON.parse(stored) : [];
        const found = users.find((u: any) => u.email === email);
        if (found) {
          set({ user: found, isAuthenticated: true });
          return true;
        }
        return false;
      },

      signup: (email: string, _password: string, name: string) => {
        const stored = localStorage.getItem('juniorpath_users');
        const users = stored ? JSON.parse(stored) : [];
        
        if (users.find((u: any) => u.email === email)) {
          return false;
        }

        const newUser: User = {
          id: crypto.randomUUID(),
          email,
          name,
          points: 50,
          selectedStack: null,
          completedProjects: [],
          readFlashcards: [],
          projectGithubLinks: {},
          createdAt: new Date().toISOString(),
        };

        users.push({ ...newUser, password: _password });
        localStorage.setItem('juniorpath_users', JSON.stringify(users));
        set({ user: newUser, isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      selectStack: (stack: Stack) => {
        const user = get().user;
        if (!user) return;
        const updated = { ...user, selectedStack: stack };
        set({ user: updated });
        // Update in localStorage users array
        const stored = localStorage.getItem('juniorpath_users');
        if (stored) {
          const users = JSON.parse(stored);
          const idx = users.findIndex((u: any) => u.id === user.id);
          if (idx >= 0) {
            users[idx] = { ...users[idx], selectedStack: stack };
            localStorage.setItem('juniorpath_users', JSON.stringify(users));
          }
        }
      },

      completeProject: (projectId: string, githubLink?: string) => {
        const user = get().user;
        if (!user) return;
        if (user.completedProjects.includes(projectId)) return;

        const updated = {
          ...user,
          points: user.points + 100,
          completedProjects: [...user.completedProjects, projectId],
          projectGithubLinks: githubLink
            ? { ...user.projectGithubLinks, [projectId]: githubLink }
            : user.projectGithubLinks,
        };
        set({ user: updated });
        // Update in localStorage
        const stored = localStorage.getItem('juniorpath_users');
        if (stored) {
          const users = JSON.parse(stored);
          const idx = users.findIndex((u: any) => u.id === user.id);
          if (idx >= 0) {
            users[idx] = { ...users[idx], ...updated };
            if (githubLink) {
              users[idx].projectGithubLinks = { ...users[idx].projectGithubLinks, [projectId]: githubLink };
            }
            localStorage.setItem('juniorpath_users', JSON.stringify(users));
          }
        }
      },

      markFlashcardRead: (cardId: string) => {
        const user = get().user;
        if (!user) return;
        if (user.readFlashcards.includes(cardId)) return;

        const updated = {
          ...user,
          points: user.points + 10,
          readFlashcards: [...user.readFlashcards, cardId],
        };
        set({ user: updated });
        const stored = localStorage.getItem('juniorpath_users');
        if (stored) {
          const users = JSON.parse(stored);
          const idx = users.findIndex((u: any) => u.id === user.id);
          if (idx >= 0) {
            users[idx] = { ...users[idx], ...updated };
            localStorage.setItem('juniorpath_users', JSON.stringify(users));
          }
        }
      },

      setGithubLink: (projectId: string, link: string) => {
        const user = get().user;
        if (!user) return;
        const updated = {
          ...user,
          projectGithubLinks: { ...user.projectGithubLinks, [projectId]: link },
        };
        set({ user: updated });
        const stored = localStorage.getItem('juniorpath_users');
        if (stored) {
          const users = JSON.parse(stored);
          const idx = users.findIndex((u: any) => u.id === user.id);
          if (idx >= 0) {
            users[idx] = { ...users[idx], projectGithubLinks: { ...users[idx].projectGithubLinks, [projectId]: link } };
            localStorage.setItem('juniorpath_users', JSON.stringify(users));
          }
        }
      },
    }),
    {
      name: 'juniorpath-store',
    }
  )
);
