import { createContext } from "react";

export interface AuthContextValue {
  userId: string | null;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
  isLoading: boolean;
  authError: string | null;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
