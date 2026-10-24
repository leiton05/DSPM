import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./authContextValue";
import { signIn, register as registerUser, signOutUser } from "../firebase/auth";
import { getAuthErrorMessage } from "../firebase/authErrors";
import { getFirebaseAuth, isFirebaseConfigured } from "../firebase/firebase";

interface AuthProviderProp {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProp) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(isFirebaseConfigured);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      return;
    }

    return onAuthStateChanged(
      getFirebaseAuth(),
      (user) => {
        setUserEmail(user?.email ?? null);
        setAuthError(null);
        setIsLoading(false);
      },
      (error) => {
        setAuthError(getAuthErrorMessage(error));
        setIsLoading(false);
      },
    );
  }, []);

  const login = async (email: string, password: string) => {
    setAuthError(null);
    const user = await signIn(email, password);
    setUserEmail(user.email);
  };

  const register = async (email: string, password: string) => {
    setAuthError(null);
    const user = await registerUser(email, password);
    setUserEmail(user.email);
  };

  const logout = async () => {
    setAuthError(null);
    await signOutUser();
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userEmail,
        isLoggedIn: userEmail !== null,
        login,
        register,
        logout,
        isLoading,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
