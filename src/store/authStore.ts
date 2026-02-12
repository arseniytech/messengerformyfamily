import { create } from 'zustand';

type User = {
  id: number;
  phone: string;
  displayName: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  setAuth: (payload: { user: User; token: string }) => void;
  logout: () => void;
};

const STORAGE_KEY = 'family-messenger-auth';

function loadFromStorage(): { user: User | null; token: string | null } {
  if (typeof window === 'undefined') return { user: null, token: null };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, token: null };
    return JSON.parse(raw);
  } catch {
    return { user: null, token: null };
  }
}

export const useAuthStore = create<AuthState>((set) => {
  const initial = loadFromStorage();

  return {
    user: initial.user,
    token: initial.token,

    setAuth: ({ user, token }) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
      }
      set({ user, token });
    },

    logout: () => {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      set({ user: null, token: null });
    },
  };
});

