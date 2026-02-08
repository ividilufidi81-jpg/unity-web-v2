import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabase';
import Header from './components/Header';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import Features from './components/Features';
import Solutions from './components/Solutions';
import Curriculum from './components/Curriculum';
import Showcase from './components/Showcase';
import Footer from './components/Footer';
import ChatDemo from './components/ChatDemo';
import AuthModal from './components/AuthModal';
import ChatAssistant from './components/ChatAssistant';
import AdminDashboard from './components/AdminDashboard';

interface User {
  id?: string;
  name: string;
  email?: string;
  isLoggedIn: boolean;
}

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authMessage, setAuthMessage] = useState<string | undefined>(undefined);
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);
  
  // 核心状态
  const [isVipUnlocked, setIsVipUnlocked] = useState(false);
  const [user, setUser] = useState<User>({ name: '', isLoggedIn: false });
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // 🔥 核心功能：强制从数据库同步最新状态
  const syncUserStatus = async () => {
    // 1. 获取当前登录的用户
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      console.log("正在同步用户数据:", session.user.email);
      
      // 2. 先设置基本信息 (让界面立刻显示登录态)
      setUser({
        id: session.user.id,
        name: session.user.user_metadata?.username || session.user.email?.split('@')[0] || '学员',
        email: session.user.email,
        isLoggedIn: true
      });

      // 3. 去数据库查最新的 VIP 状态 (这是唯一的真理)
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('is_vip')
        .eq('id', session.user.id)
        .single();

      if (profile?.is_vip) {
        console.log("✅ 检测到 VIP 身份，已解锁！");
        setIsVipUnlocked(true);
      } else {
        console.log("🔒 当前为普通用户状态");
        setIsVipUnlocked(false);
      }
    } else {
      // 没登录就重置
      setUser({ name: '', isLoggedIn: false });
      setIsVipUnlocked(false);
    }
  };

  useEffect(() => {
    // 1. 初始化时同步一次
    syncUserStatus();

    // 2. 监听 Auth 变化 (登录/退出时自动同步)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      syncUserStatus();
    });

    // 3. 监听 URL 变化
    const handleLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    
    // 4. 滚动与鼠标效果
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { clientX, clientY } = e;
        containerRef.current.style.setProperty('--mouse-x', `${clientX}px`);
        containerRef.current.style.setProperty('--mouse-y', `${clientY}px`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser({ name: '', isLoggedIn: false });
    setIsVipUnlocked(false);
    if (currentPath === '/admin-dashboard') {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
    }
  };

  const openAuth = (mode: 'login' | 'register', message?: string) => {
    setAuthMode(mode);
    setAuthMessage(message);
    setIsAuthModalOpen(true);
  };

  // 登录成功后的回调
  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    syncUserStatus(); // 登录成功后立刻同步一次
  };

  // 路由: 管理员后台
  if (currentPath === '/admin-dashboard' && user.email === '2733945210@qq.com') {
    return (
      <AdminDashboard 
        user={user} 
        onBack={() => {
          window.history.pushState({}, '', '/');
          setCurrentPath('/');
        }} 
      />
    );
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#020617] text-slate-50 selection:bg-indigo-500/30 overflow-x-hidden relative"
      style={{ '--mouse-x': '50%', '--mouse-y': '50%' } as React.CSSProperties}
    >
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 cyber-grid opacity-30"></div>
        <div 
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            background: `
              radial-gradient(1000px circle at var(--mouse-x) var(--mouse-y), rgba(99, 102, 241, 0.1), transparent 70%),
              radial-gradient(1400px circle at 90% 10%, rgba(34, 211, 238, 0.05), transparent 70%)
            `
          }}
        />
      </div>

      <Header 
        isScrolled={isScrolled} 
        onLogin={() => openAuth('login')} 
        onSignup={() => openAuth('register')}
        selectedLessonTitle={selectedLesson?.title}
        onBack={() => setSelectedLesson(null)}
        user={user}
        onLogout={handleLogout}
        isVip={isVipUnlocked}
      />
      
      <main className="relative z-10">
        {!selectedLesson ? (
          <>
            <Hero 
              onStart={user.isLoggedIn ? () => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' }) : () => openAuth('register')} 
              isLoggedIn={user.isLoggedIn}
            />
            
            <section id="problem" className="py-32 relative">
              <PainPoints />
            </section>

            <section id="features" className="relative bg-indigo-500/[0.02]">
              <Features />
              <Solutions />
              <div className="max-w-7xl mx-auto px-4 mt-24">
                 <ChatDemo />
              </div>
            </section>

            <section id="curriculum" className="py-32">
              <Curriculum 
                onSelectLesson={setSelectedLesson} 
                activeLesson={selectedLesson} 
                isVipUnlocked={isVipUnlocked}
                onVipUnlock={() => {
                  // 前端立刻响应
                  setIsVipUnlocked(true);
                  // 触发一次后台同步，确保数据一致
                  syncUserStatus();
                }}
                isLoggedIn={user.isLoggedIn}
                onOpenAuth={(msg) => openAuth('login', msg)}
              />
            </section>

            <section id="showcase" className="py-32 bg-slate-950/40">
              <Showcase />
            </section>
          </>
        ) : (
          <div className="pt-24 min-h-screen">
            <Curriculum 
              onSelectLesson={setSelectedLesson} 
              activeLesson={selectedLesson} 
              isVipUnlocked={isVipUnlocked}
              onVipUnlock={() => {
                 setIsVipUnlocked(true);
                 syncUserStatus();
              }}
              isLoggedIn={user.isLoggedIn}
              onOpenAuth={(msg) => openAuth('login', msg)}
            />
          </div>
        )}
      </main>

      {!selectedLesson && <Footer />}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        mode={authMode} 
        message={authMessage}
        onClose={() => setIsAuthModalOpen(false)} 
        onAuthSuccess={handleAuthSuccess}
      />
      
      <ChatAssistant />
    </div>
  );
};

export default App;