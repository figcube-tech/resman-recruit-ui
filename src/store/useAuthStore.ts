import { create } from "zustand";
import { User, AuthTokens } from "@/types";

interface AuthStore {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  setLoading: (loading: boolean) => void;
  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setTokens: (tokens) => set({ tokens }),
  setLoading: (isLoading) => set({ isLoading }),

  login: (user, tokens) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
    }
    set({ user, tokens, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    set({ user: null, tokens: null, isAuthenticated: false, isLoading: false });
  },

  initialize: () => {
    // Auth initialization disabled for development
    // if (typeof window !== 'undefined') {
    //   const accessToken = localStorage.getItem('accessToken');
    //   const refreshToken = localStorage.getItem('refreshToken');
    //   if (accessToken && refreshToken) {
    //     set({ tokens: { accessToken, refreshToken }, isAuthenticated: true, isLoading: false });
    //   } else {
    //     set({ isLoading: false });
    //   }
    // }
    set({ isLoading: false });
  },
}));
