import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "./auth.types";
import * as service from "./auth.service";
import { ApiError } from "../../services/api";
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const reload = useCallback(async () => {
    setError("");
    try { setUser(await service.getSession()); }
    catch (e) { setUser(null); if (!(e instanceof ApiError && e.status === 401)) setError("Não foi possível verificar sua sessão. Confira o backend e tente novamente."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => {
    let active = true;
    service.getSession().then(u => { if (active) setUser(u); }).catch(e => {
      if (active && !(e instanceof ApiError && e.status === 401)) setError("Não foi possível verificar sua sessão. Confira o backend e tente novamente.");
    }).finally(() => { if (active) setLoading(false); });
    const expire = () => { setUser(null); };
    window.addEventListener("auth:expired", expire);
    return () => { active = false; window.removeEventListener("auth:expired", expire); };
  }, []);
  const signIn = async (email: string, password: string) => { const u = await service.login(email, password); setUser(u); setError(""); return u; };
  const signOut = async () => { await service.logout(); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, error, reload, signIn, signOut }}>{children}</AuthContext.Provider>;
}
