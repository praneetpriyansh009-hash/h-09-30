import { create } from 'zustand';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

interface User {
  id: string;
  email: string;
  name: string;
  role?: 'USER' | 'PREMIUM' | 'VENDOR' | 'ADMIN';
  photoURL?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isInitializing: true,
  setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
  logout: async () => {
    await signOut(auth);
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

// Setup Firebase auth listener
onAuthStateChanged(auth, async (firebaseUser) => {
  if (firebaseUser) {
    const token = await firebaseUser.getIdToken();
    const user: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
      photoURL: firebaseUser.photoURL || undefined,
    };
    useAuthStore.setState({ user, token, isAuthenticated: true, isInitializing: false });
  } else {
    useAuthStore.setState({ user: null, token: null, isAuthenticated: false, isInitializing: false });
  }
});
