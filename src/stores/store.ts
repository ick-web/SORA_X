import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@supabase/supabase-js"; // Supabase 유저 타입

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage", // localStorage에 저장될 키 이름
    }
  )
);
