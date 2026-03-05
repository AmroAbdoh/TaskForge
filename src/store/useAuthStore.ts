import { create } from "zustand";
import type { User } from "../types/domain";
import { users } from "../utils/seed";


interface AuthState {
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const useAuthStore = create <AuthState> ( (set) => ({

    currentUser : null,

    login: (email, password) => {
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) return false;

    set({ currentUser: user });

    return true;
  },

  logout: () => set({ currentUser: null }),


}) )

export default useAuthStore;