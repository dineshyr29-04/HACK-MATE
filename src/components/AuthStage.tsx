import { useState } from 'react';
import { LogIn, ShieldCheck, Mail, Lock, UserPlus } from 'lucide-react';

interface AuthStageProps {
  onLogin: () => void;
  onEmailLogin: (email: string, pass: string) => void;
  onEmailSignup: (email: string, pass: string) => void;
  onBack: () => void;
}

export function AuthStage({ onLogin, onEmailLogin, onEmailSignup, onBack }: AuthStageProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      onEmailLogin(email, password);
    } else {
      onEmailSignup(email, password);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 selection:bg-gray-900 selection:text-white font-sans overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#e5e7eb,transparent)]"></div>
      </div>

      <div className="w-full max-w-md p-8 bg-white border border-gray-100 shadow-2xl rounded-3xl z-10 animate-in fade-in zoom-in duration-500">
        
        {/* Mode Toggle */}
        <div className="flex p-1 bg-gray-100 rounded-2xl mb-8">
            <button 
                onClick={() => setMode('login')}
                className={`flex-1 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${mode === 'login' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
                Login
            </button>
            <button 
                onClick={() => setMode('signup')}
                className={`flex-1 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${mode === 'signup' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
                Sign Up
            </button>
        </div>

        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-gray-900/20">
            {mode === 'login' ? <ShieldCheck className="w-8 h-8" /> : <UserPlus className="w-8 h-8" />}
          </div>
          <h2 className="text-3xl font-black mb-2 tracking-tight">
            {mode === 'login' ? 'Welcome Back' : 'Join the Lab'}
          </h2>
          <p className="text-gray-500">
            {mode === 'login' ? 'Please sign in to access your hackathon projects.' : 'Create an account to start building your next winning demo.'}
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-lg shadow-gray-900/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {mode === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />} 
            {mode === 'login' ? 'Continue with Google' : 'Sign up with Google'}
          </button>
          
          <div className="relative flex items-center justify-center py-4">
            <div className="flex-1 border-t border-gray-100" />
            <span className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">or</span>
            <div className="flex-1 border-t border-gray-100" />
          </div>

          <form className="space-y-3" onSubmit={handleEmailSubmit}>
             <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  className="w-full pl-11 pr-4 py-4 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm font-medium focus:ring-2 focus:ring-gray-900/5 transition-all outline-none" 
                />
             </div>
             <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-11 pr-4 py-4 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm font-medium focus:ring-2 focus:ring-gray-900/5 transition-all outline-none" 
                />
             </div>
             <button 
                type="submit"
                className="w-full py-4 rounded-xl border border-gray-900 text-gray-900 font-bold hover:bg-gray-50 transition-all transform active:scale-[0.98]"
             >
               {mode === 'login' ? 'Login with Email' : 'Create Account'}
             </button>
          </form>
        </div>

        <div className="mt-6 text-center">
            <button 
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors"
            >
                {mode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
        </div>

        <button 
          onClick={onBack}
          className="mt-8 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors w-full"
        >
          ← Go Back to Landing Page
        </button>
      </div>
      
      <p className="fixed bottom-8 text-xs font-bold text-gray-400 tracking-[0.2em] uppercase">Hackathon Copilot Security</p>
    </div>
  );
}
