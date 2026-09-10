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

interface StoredUser extends User {
  passwordHash: string;
  passwordSalt: string;
}

const USERS_KEY = 'juniorpath_users';
const PBKDF2_ITERATIONS = 100_000;

function toBase64(bytes: Uint8Array): string {
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

function fromBase64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function hashPassword(password: string, salt: Uint8Array): Promise<string> {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  // Copy into a fresh ArrayBuffer so salt satisfies BufferSource under TS 5.7+
  const saltBuffer = salt.buffer.slice(salt.byteOffset, salt.byteOffset + salt.byteLength) as ArrayBuffer;
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    256
  );
  return toBase64(new Uint8Array(bits));
}

function loadUsers(): StoredUser[] {
  const stored = localStorage.getItem(USERS_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function toPublicUser(user: StoredUser): User {
  const { passwordHash: _h, passwordSalt: _s, ...publicUser } = user;
  return publicUser;
}

function syncUserRecord(userId: string, patch: Partial<User>) {
  const users = loadUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx < 0) return;
  users[idx] = { ...users[idx], ...patch };
  saveUsers(users);
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
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

      login: async (email: string, password: string) => {
        const normalizedEmail = email.trim().toLowerCase();
        const users = loadUsers();
        const found = users.find((u) => u.email.toLowerCase() === normalizedEmail);
        if (!found?.passwordHash || !found?.passwordSalt) {
          return false;
        }

        const salt = fromBase64(found.passwordSalt);
        const hash = await hashPassword(password, salt);
        if (hash !== found.passwordHash) {
          return false;
        }

        // Drop legacy plaintext password field if present
        if ('password' in found) {
          const { password: _legacy, ...rest } = found as StoredUser & { password?: string };
          const cleaned: StoredUser = rest;
          const idx = users.findIndex((u) => u.id === found.id);
          if (idx >= 0) {
            users[idx] = cleaned;
            saveUsers(users);
          }
          set({ user: toPublicUser(cleaned), isAuthenticated: true });
          return true;
        }

        set({ user: toPublicUser(found), isAuthenticated: true });
        return true;
      },

      signup: async (email: string, password: string, name: string) => {
        const normalizedEmail = email.trim().toLowerCase();
        const users = loadUsers();

        if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
          return false;
        }

        const salt = crypto.getRandomValues(new Uint8Array(16));
        const passwordHash = await hashPassword(password, salt);

        const newUser: StoredUser = {
          id: crypto.randomUUID(),
          email: normalizedEmail,
          name: name.trim(),
          points: 50,
          selectedStack: null,
          completedProjects: [],
          readFlashcards: [],
          projectGithubLinks: {},
          createdAt: new Date().toISOString(),
          passwordHash,
          passwordSalt: toBase64(salt),
        };

        users.push(newUser);
        saveUsers(users);
        set({ user: toPublicUser(newUser), isAuthenticated: true });
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
        syncUserRecord(user.id, { selectedStack: stack });
      },

      completeProject: (projectId: string, githubLink?: string) => {
        const user = get().user;
        if (!user) return;
        if (user.completedProjects.includes(projectId)) return;

        const updated: User = {
          ...user,
          points: user.points + 100,
          completedProjects: [...user.completedProjects, projectId],
          projectGithubLinks: githubLink
            ? { ...user.projectGithubLinks, [projectId]: githubLink }
            : user.projectGithubLinks,
        };
        set({ user: updated });
        syncUserRecord(user.id, updated);
      },

      markFlashcardRead: (cardId: string) => {
        const user = get().user;
        if (!user) return;
        if (user.readFlashcards.includes(cardId)) return;

        const updated: User = {
          ...user,
          points: user.points + 10,
          readFlashcards: [...user.readFlashcards, cardId],
        };
        set({ user: updated });
        syncUserRecord(user.id, updated);
      },

      setGithubLink: (projectId: string, link: string) => {
        const user = get().user;
        if (!user) return;
        const updated: User = {
          ...user,
          projectGithubLinks: { ...user.projectGithubLinks, [projectId]: link },
        };
        set({ user: updated });
        syncUserRecord(user.id, {
          projectGithubLinks: updated.projectGithubLinks,
        });
      },
    }),
    {
      name: 'juniorpath-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
