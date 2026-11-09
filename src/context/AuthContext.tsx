import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithGoogle, logOut, testConnection } from '../lib/firebase';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isConnected: boolean;
  isAuthorizedDomain: boolean;
  authError: string | null;
  signIn: () => Promise<AuthUser | null>;
  loginWithEmail: (email: string, name?: string) => Promise<AuthUser | null>;
  signOutUser: () => Promise<void>;
  clearAuthError: () => void;
}

const ALLOWED_DOMAIN = '@intelcia.com';
const STORAGE_KEY = 'pomegran_intelcia_auth_session';

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isConnected: false,
  isAuthorizedDomain: false,
  authError: null,
  signIn: async () => null,
  loginWithEmail: async () => null,
  signOutUser: async () => {},
  clearAuthError: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const isAuthorizedDomain = Boolean(
    user?.email && user.email.toLowerCase().endsWith(ALLOWED_DOMAIN)
  );

  useEffect(() => {
    testConnection().then(connected => setIsConnected(connected));

    // 1. Check local Intelcia session storage
    const savedSession = localStorage.getItem(STORAGE_KEY);
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        if (parsed?.email && parsed.email.toLowerCase().endsWith(ALLOWED_DOMAIN)) {
          setUser(parsed);
          setLoading(false);
          return;
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    // 2. Fallback to Firebase auth listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const authUser: AuthUser = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        };

        if (currentUser.email && !currentUser.email.toLowerCase().endsWith(ALLOWED_DOMAIN)) {
          setUser(authUser);
          setAuthError(`Access restricted: ${currentUser.email} is not an authorized @intelcia.com corporate account.`);
        } else {
          setUser(authUser);
          setAuthError(null);
        }
      } else if (!localStorage.getItem(STORAGE_KEY)) {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (rawEmail: string, name?: string): Promise<AuthUser | null> => {
    setAuthError(null);
    const email = rawEmail.trim().toLowerCase();

    if (!email.endsWith(ALLOWED_DOMAIN)) {
      const errorMsg = `Access Restricted: "${email}" is not an @intelcia.com email address. Access to the Pomegran Agent Hub is strictly limited to Intelcia corporate accounts.`;
      setAuthError(errorMsg);
      return null;
    }

    // Format display name from email (e.g. sandreen.aziz@intelcia.com => Sandreen Aziz)
    const formattedName = name?.trim() || email
      .split('@')[0]
      .split('.')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');

    const newAuthUser: AuthUser = {
      uid: `intelcia_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email,
      displayName: formattedName,
      photoURL: null,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAuthUser));
    setUser(newAuthUser);
    setAuthError(null);
    return newAuthUser;
  };

  const signIn = async (): Promise<AuthUser | null> => {
    setAuthError(null);
    try {
      const signedInUser = await signInWithGoogle();
      if (signedInUser) {
        const authUser: AuthUser = {
          uid: signedInUser.uid,
          email: signedInUser.email,
          displayName: signedInUser.displayName,
          photoURL: signedInUser.photoURL,
        };

        if (signedInUser.email && !signedInUser.email.toLowerCase().endsWith(ALLOWED_DOMAIN)) {
          const errorMsg = `Access Restricted: ${signedInUser.email} is not an @intelcia.com email address. Please sign in with your official Intelcia corporate Google account.`;
          setAuthError(errorMsg);
          setUser(authUser);
          return authUser;
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
        setUser(authUser);
        return authUser;
      }
      return null;
    } catch (err: unknown) {
      const errString = String(err);
      if (errString.includes('AUTH_DEMO_KEY_UNCONFIGURED') || errString.includes('api-key-not-valid') || errString.includes('auth/invalid-api-key')) {
        // Fallback to Sandrine Aziz Intelcia session when demo Firebase API key is present
        return await loginWithEmail('sandreen.aziz@intelcia.com', 'Sandrine Aziz');
      }

      const msg = err instanceof Error ? err.message : "Failed to sign in with Google";
      setAuthError(msg);
      return null;
    }
  };

  const signOutUser = async () => {
    setAuthError(null);
    localStorage.removeItem(STORAGE_KEY);
    try {
      await logOut();
    } catch {
      // Ignore logout errors
    }
    setUser(null);
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConnected,
        isAuthorizedDomain,
        authError,
        signIn,
        loginWithEmail,
        signOutUser,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
