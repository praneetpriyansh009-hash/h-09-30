import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/lib/store/auth-store';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isInitializing } = useAuthStore();
  
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030303]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-pink"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
