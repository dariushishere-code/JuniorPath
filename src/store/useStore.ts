// ═══════════════════════════════════════════════════════════════════════════
// JuniorPath — Zustand store backed by Supabase Auth + PostgreSQL
//
// SETUP
//   1. Create a project at https://supabase.com and run `supabase/schema.sql`
//      in the Supabase SQL Editor (Dashboard → SQL Editor).
//   2. Copy `.env.example` → `.env` and set:
//        VITE_SUPABASE_URL     = your project URL (e.g. https://xxx.supabase.co)
//        VITE_SUPABASE_ANON_KEY = anon / publishable key (safe for browsers)
//   3. Netlify: add the same two variables under
//      Site configuration → Environment variables.
//   4. For local development you can disable "Confirm email" in
//      Authentication → Providers → Email so signups log in immediately.
//
// This module used to be an insecure localStorage + PBKDF2 auth layer. That
// code is gone: accounts, points, completed projects, read flashcards and
// reviewed interview questions now live in Supabase (PostgreSQL) behind Row
// Level Security. See SUPABASE.md for the full walkthrough.
// ═══════════════════════════════════════════════════════════════════════════

import { create } from 'zustand';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

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
  reviewedInterviewQuestions: string[];
  projectGithubLinks: Record<string, string>;
  createdAt: string;
}

export type AuthResult = {
  success: boolean;
  error?: string;
  /** true when Supabase requires email confirmation before the user can sign in. */
  needsEmailConfirmation?: boolean;
};

// ─── Client-side validation helpers (kept for the auth forms) ───

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_MIN_LENGTH = 8;
const MAX_NAME_LENGTH = 50;
const MAX_EMAIL_LENGTH = 120;
const MAX_PASSWORD_LENGTH = 128;

export type PasswordStrength = 'weak' | 'medium' | 'strong';

/** Normalize user-entered text: strip control chars, trim, collapse spaces, cap length. */
export function sanitizeName(raw: string): string {
  return raw
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, MAX_NAME_LENGTH);
}

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email) && email.length <= MAX_EMAIL_LENGTH;
}

export function getPasswordStrength(password: string): PasswordStrength {
  if (password.length < PASSWORD_MIN_LENGTH) return 'weak';
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);
  if (hasLetter && hasNumber && hasSymbol && password.length >= 12) return 'strong';
  if (hasLetter && hasNumber) return 'medium';
  return 'weak';
}

/** Returns a translation key describing the first violated rule, or null when valid. */
export function validatePassword(password: string): string | null {
  if (password.length < PASSWORD_MIN_LENGTH) return 'auth.passwordRules.length';
  if (password.length > MAX_PASSWORD_LENGTH) return 'auth.passwordRules.length';
  if (!/[a-zA-Z]/.test(password)) return 'auth.passwordRules.letter';
  if (!/[0-9]/.test(password)) return 'auth.passwordRules.number';
  return null;
}
// ─── Supabase row shapes (explicitly typed, no `any`) ───

interface ProfileRow {
  id: string;
  email: string | null;
  name: string | null;
  points: number | null;
  selected_stack: string | null;
  created_at: string | null;
}

interface UserProjectRow {
  project_id: string;
  github_link: string | null;
}

interface UserFlashcardRow {
  flashcard_id: string;
}

interface UserInterviewQuestionRow {
  question_id: string;
}

const STACK_VALUES: readonly Stack[] = ['frontend', 'backend', 'fullstack'];

function isStack(value: string | null | undefined): value is Stack {
  return STACK_VALUES.includes(value as Stack);
}

async function selectProfile(userId: string): Promise<ProfileRow | null> {
  const { data, error } = (await supabase
    .from('profiles')
    .select('id, email, name, points, selected_stack, created_at')
    .eq('id', userId)
    .single()) as { data: ProfileRow | null; error: { message: string } | null };
  if (error) return null;
  return data;
}

async function selectProjects(userId: string): Promise<UserProjectRow[]> {
  const { data, error } = (await supabase
    .from('user_projects')
    .select('project_id, github_link')
    .eq('user_id', userId)) as {
    data: UserProjectRow[] | null;
    error: { message: string } | null;
  };
  if (error) return [];
  return data ?? [];
}

async function selectFlashcards(userId: string): Promise<UserFlashcardRow[]> {
  const { data, error } = (await supabase
    .from('user_flashcards')
    .select('flashcard_id')
    .eq('user_id', userId)) as {
    data: UserFlashcardRow[] | null;
    error: { message: string } | null;
  };
  if (error) return [];
  return data ?? [];
}

async function selectInterviewQuestions(userId: string): Promise<UserInterviewQuestionRow[]> {
  const { data, error } = (await supabase
    .from('user_interview_questions')
    .select('question_id')
    .eq('user_id', userId)) as {
    data: UserInterviewQuestionRow[] | null;
    error: { message: string } | null;
  };
  if (error) return [];
  return data ?? [];
}

/** Insert a default profile row if the auth trigger did not create one yet (safe no-op otherwise). */
async function ensureProfile(session: Session): Promise<void> {
  const authUser = session.user;
  const metaName =
    typeof authUser.user_metadata?.name === 'string'
      ? authUser.user_metadata.name
      : (authUser.email?.split('@')[0] ?? null);
  await supabase.from('profiles').upsert(
    {
      id: authUser.id,
      email: authUser.email ?? null,
      name: metaName,
      points: 50,
    },
    { onConflict: 'id', ignoreDuplicates: true }
  );
}

/** Fetch the full profile + related rows and map them into the app's User shape. */
async function fetchUserProfile(session: Session): Promise<User | null> {
  const authUser = session.user;
  await ensureProfile(session);

  const profile = await selectProfile(authUser.id);
  if (!profile) return null;

  const [projects, flashcards, interviewQuestions] = await Promise.all([
    selectProjects(authUser.id),
    selectFlashcards(authUser.id),
    selectInterviewQuestions(authUser.id),
  ]);

  const metaName =
    typeof authUser.user_metadata?.name === 'string' ? authUser.user_metadata.name : null;

  const projectGithubLinks: Record<string, string> = {};
  for (const row of projects) {
    if (row.github_link) projectGithubLinks[row.project_id] = row.github_link;
  }

  return {
    id: authUser.id,
    email: authUser.email ?? profile.email ?? '',
    name: profile.name ?? metaName ?? authUser.email?.split('@')[0] ?? 'Junior',
    points: profile.points ?? 50,
    selectedStack: isStack(profile.selected_stack) ? profile.selected_stack : null,
    completedProjects: projects.map((row) => row.project_id),
    readFlashcards: flashcards.map((row) => row.flashcard_id),
    reviewedInterviewQuestions: interviewQuestions.map((row) => row.question_id),
    projectGithubLinks,
    createdAt: authUser.created_at ?? profile.created_at ?? new Date().toISOString(),
  };
}
// ─── Store ───

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (email: string, password: string, name: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  selectStack: (stack: Stack) => Promise<void>;
  completeProject: (projectId: string, githubLink?: string) => Promise<void>;
  markFlashcardRead: (cardId: string) => Promise<void>;
  toggleInterviewQuestionReviewed: (questionId: string) => Promise<void>;
  setGithubLink: (projectId: string, link: string) => Promise<void>;
}

let authListenerRegistered = false;

export const useStore = create<AppState>()((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  initialize: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      const user = await fetchUserProfile(session);
      set({ user, isAuthenticated: true });
    }
    set({ isLoading: false });

    if (!authListenerRegistered) {
      authListenerRegistered = true;
      supabase.auth.onAuthStateChange((_event, nextSession) => {
        if (nextSession?.user) {
          void fetchUserProfile(nextSession).then((user) => set({ user, isAuthenticated: true }));
        } else {
          set({ user: null, isAuthenticated: false });
        }
      });
    }
  },

  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    if (error) {
      return { success: false, error: error.message };
    }
    const session = data.session;
    if (session?.user) {
      const user = await fetchUserProfile(session);
      set({ user, isAuthenticated: true });
    }
    return { success: true };
  },

  signup: async (email, password, name) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: { data: { name } },
    });
    if (error) {
      return { success: false, error: error.message };
    }
    const session = data.session;
    if (session?.user) {
      const user = await fetchUserProfile(session);
      set({ user, isAuthenticated: true });
      return { success: true };
    }
    // Email confirmation is enabled → no session is issued until the email is confirmed.
    if (data.user) {
      return { success: true, needsEmailConfirmation: true };
    }
    return { success: false, error: 'Unexpected signup response' };
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false });
  },

  selectStack: async (stack) => {
    const user = get().user;
    if (!user) return;
    const { error } = await supabase
      .from('profiles')
      .update({ selected_stack: stack })
      .eq('id', user.id);
    if (error) return;
    set({ user: { ...user, selectedStack: stack } });
  },

  completeProject: async (projectId, githubLink) => {
    const user = get().user;
    if (!user || user.completedProjects.includes(projectId)) return;

    const { error } = await supabase.from('user_projects').upsert(
      { user_id: user.id, project_id: projectId, github_link: githubLink ?? null },
      { onConflict: 'user_id,project_id' }
    );
    if (error) return;

    await supabase.from('profiles').update({ points: user.points + 100 }).eq('id', user.id);

    set({
      user: {
        ...user,
        points: user.points + 100,
        completedProjects: [...user.completedProjects, projectId],
        projectGithubLinks: githubLink
          ? { ...user.projectGithubLinks, [projectId]: githubLink }
          : user.projectGithubLinks,
      },
    });
  },

  markFlashcardRead: async (cardId) => {
    const user = get().user;
    if (!user || user.readFlashcards.includes(cardId)) return;

    const { error } = await supabase.from('user_flashcards').upsert(
      { user_id: user.id, flashcard_id: cardId },
      { onConflict: 'user_id,flashcard_id' }
    );
    if (error) return;

    await supabase.from('profiles').update({ points: user.points + 10 }).eq('id', user.id);

    set({
      user: {
        ...user,
        points: user.points + 10,
        readFlashcards: [...user.readFlashcards, cardId],
      },
    });
  },

  toggleInterviewQuestionReviewed: async (questionId) => {
    const user = get().user;
    if (!user) return;

    const currentlyReviewed = user.reviewedInterviewQuestions.includes(questionId);

    if (currentlyReviewed) {
      await supabase
        .from('user_interview_questions')
        .delete()
        .eq('user_id', user.id)
        .eq('question_id', questionId);
      set({
        user: {
          ...user,
          reviewedInterviewQuestions: user.reviewedInterviewQuestions.filter(
            (id) => id !== questionId
          ),
        },
      });
      return;
    }

    const { error } = await supabase.from('user_interview_questions').upsert(
      { user_id: user.id, question_id: questionId },
      { onConflict: 'user_id,question_id' }
    );
    if (error) return;

    set({
      user: {
        ...user,
        reviewedInterviewQuestions: [...user.reviewedInterviewQuestions, questionId],
      },
    });
  },

  setGithubLink: async (projectId, link) => {
    const user = get().user;
    if (!user) return;
    await supabase.from('user_projects').upsert(
      { user_id: user.id, project_id: projectId, github_link: link },
      { onConflict: 'user_id,project_id' }
    );
    set({
      user: {
        ...user,
        projectGithubLinks: { ...user.projectGithubLinks, [projectId]: link },
      },
    });
  },
}));