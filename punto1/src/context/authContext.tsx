import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface AuthContextProp {
  userEmail: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isLoggedIn: boolean;
}

interface AuthProviderProp {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProp | null>(null);

export function AuthProvider({ children }: AuthProviderProp) {
  const [user, setUser] = useState<string | null>(null);
  /* Debido a que cuando reiniciaba la pagina aún teniendo sesión, se redirigía a login, 
  con ayuda de una IA colocamos este loading aquí */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
    /* Colocamos el loading como falso inicialmente */
    setLoading(false);
  }, []);

  /* Lo que pasa es que basicamente cuando react carga una pagina primero renderiza y luego busca el
  localStorage, por lo que antes de que isLoggedIn se coloque como true, inicia como false, y por eso es que
  se redirige a /login, entonces esto lo que hace es que evita que react renderice al inicio
  
  Entonces colocamos loading como true, y se cumple esta condición entonces React no renderiza. No es hasta que
  react ya proceso el useEffect que el loading pasa a ser false, y puede seguir procesando el codigo, y es ahí
  donde ya ha sacado que isLoggedIn es true, y no redirige a /login*/
  if (loading) {
    return null;
  }

  const login = (email: string, password: string): boolean => {
    if (email == "user@mail.com" && password == "123") {
      setUser(email);
      localStorage.setItem("user", email);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  return (
    <AuthContext.Provider
      value={{
        userEmail: user,
        isLoggedIn: user !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
