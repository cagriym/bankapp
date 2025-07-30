"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect } from "react";

function decodeJwtPayload(token: string): any {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

interface JwtPayload {
  musteri_id?: number;
  id?: number;
  email?: string;
  [key: string]: any;
}

interface AuthState {
  user: JwtPayload | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: JwtPayload, token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user, token) => {
        if (token) localStorage.setItem("token", token);
        const isAuthenticated = Boolean(user && token && (user.musteri_id || user.id || user.email));
        set((state) => {
          if (
            JSON.stringify(state.user) === JSON.stringify(user) &&
            state.token === token &&
            state.isAuthenticated === isAuthenticated
          ) {
            return state;
          }
          console.log("[Zustand setUser]", { user, token, isAuthenticated });
          return { user, token, isAuthenticated };
        });
      },
      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null, isAuthenticated: false });
        console.log("[Zustand logout]", { user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage"
    }
  )
);

export function useAutoLogin() {
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    console.log("[AutoLogin] token in localStorage:", token);
    if (token) {
      const user: JwtPayload = decodeJwtPayload(token);
      console.log("[AutoLogin] decoded user:", user);
      if (user && (user.musteri_id || user.id || user.email)) {
        useAuthStore.getState().setUser(user, token);
        console.log("[AutoLogin] setUser called", user, token);
      }
    }
  }, []);
}
