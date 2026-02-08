
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'register';
  onClose: () => void;
  onAuthSuccess: (user: any) => void;
  message?: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, mode: initialMode, onClose, onAuthSuccess, message }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError(null);
      setEmail('');
      setPassword('');
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (mode === 'register') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username }
          }
        });
        if (signUpError) throw signUpError;
        if (data.user) {
          setError('注册成功！请检查邮箱进行验证（若未开启验证可直接登录）。');
          setMode('login');
        }
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (signInError) throw signInError;
        if (data.user) onAuthSuccess(data.user);
      }
    } catch (err: any) {
      setError(err.message || '认证失败，请检查输入');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-md glass rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <div className="p-10 pt-16 text-center">
          <h2 className="text-3xl font-black text-white mb-2">{mode === 'login' ? '欢迎回来' : '注册账号'}</h2>
          <p className="text-slate-500 text-sm mb-10">{message || '开启你的 AI 游戏开发之旅'}</p>

          <form onSubmit={handleAuth} className="space-y-4 text-left">
            {mode === 'register' && (
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">用户名</label>
                <input required type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:border-indigo-500 transition-all outline-none" placeholder="输入您的昵称" />
              </div>
            )}
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">邮箱</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:border-indigo-500 transition-all outline-none" placeholder="name@example.com" />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">密码</label>
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:border-indigo-500 transition-all outline-none" placeholder="••••••••" />
            </div>

            {error && <p className="text-red-400 text-xs font-bold text-center">{error}</p>}

            <button disabled={isLoading} type="submit" className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-600/30 transition-all disabled:opacity-50">
              {isLoading ? '处理中...' : (mode === 'login' ? '立即登录' : '创建账号')}
            </button>
          </form>

          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="mt-8 text-xs font-black text-indigo-400 hover:text-white uppercase tracking-widest">
            {mode === 'login' ? '没有账号？点击注册' : '已有账号？点击登录'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
