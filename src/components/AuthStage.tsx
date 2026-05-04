import { useState } from 'react';
import { LogIn, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface AuthStageProps {
  onLogin: () => Promise<void>;
  onBack: () => void;
}

export function AuthStage({ onLogin, onBack }: AuthStageProps) {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await onLogin();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to sign in with Google.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative min-h-screen flex flex-col items-center justify-center selection:bg-indigo-500 selection:text-white dark:selection:bg-indigo-400 font-sans overflow-hidden ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>

      <div className={`absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className={`absolute bottom-0 left-0 right-0 top-0 ${isDark ? 'bg-[radial-gradient(circle_800px_at_100%_200px,#1f2937,transparent)]' : 'bg-[radial-gradient(circle_800px_at_100%_200px,#e5e7eb,transparent)]'}`}></div>
      </div>

      <div className={`w-full max-w-md p-8 border shadow-2xl rounded-3xl z-10 animate-in fade-in zoom-in duration-500 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>

        <div className="flex flex-col items-center text-center mb-8">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl ${isDark ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}>
            {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : <ShieldCheck className="w-8 h-8" />}
          </div>
          <h2 className="text-3xl font-black mb-2 tracking-tight">
            Authentication Required
          </h2>
          <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
            Please sign in with your Google account to access and save your hackathon projects.
          </p>
        </div>

        {error && (
          <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${isDark ? 'bg-red-950/40 border border-red-800 text-red-400' : 'bg-red-50 border border-red-100 text-red-600'}`}>
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:cursor-not-allowed ${isDark ? 'bg-white text-gray-900 hover:bg-gray-100 disabled:bg-gray-600 disabled:text-white' : 'bg-gray-900 hover:bg-black text-white disabled:bg-gray-400 shadow-gray-900/20'}`}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
            Continue with Google
          </button>
        </div>

        <button
          onClick={onBack}
          disabled={loading}
          className={`mt-8 text-sm font-bold transition-colors w-full disabled:opacity-50 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
        >
          ← Go Back to Landing Page
        </button>
      </div>

      <p className={`fixed bottom-8 text-xs font-bold tracking-[0.2em] uppercase ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
        Hackathon Copilot Security
      </p>
    </div>
  );
}