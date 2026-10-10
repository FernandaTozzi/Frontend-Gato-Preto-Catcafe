import { createContext } from "react";
import type { User } from "./auth.types";
export interface AuthState { user: User | null; loading: boolean; error: string; reload: () => Promise<void>; signIn: (email: string, password: string) => Promise<User>; signOut: () => Promise<void>; }
export const AuthContext = createContext<AuthState | null>(null);
