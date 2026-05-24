import { AuthProvider, useAuth } from './context/AuthContext';
import CTAHome from './pages/CTAHome';
import Dashboard from './pages/Dashboard';

function AppContent() {
  const { user, loading } = useAuth();

  // Premium loading screen using Tailwind classes
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-[#0a0b10]">
        <div className="w-10 h-10 border-4 border-white/10 border-t-brand-purple rounded-full animate-spin"></div>
        <p className="text-xs font-bold text-gray-500 tracking-widest uppercase font-sans">
          Securely Verifying User Session...
        </p>
      </div>
    );
  }

  // Session routing: if logged in show Dashboard, else show CTA Landing Page
  return user ? <Dashboard /> : <CTAHome />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
