import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronLeft, LogOut, User, Sparkles } from 'lucide-react';

interface HeaderProps {
  isScrolled: boolean;
  onLogin: () => void;
  onSignup: () => void;
  selectedLessonTitle?: string; // 如果在看课，显示课程标题
  onBack: () => void;           // 返回主页
  user: { name: string; isLoggedIn: boolean; email?: string };
  onLogout: () => void;
  isVip: boolean;
}

export default function Header({ 
  isScrolled, 
  onLogin, 
  onSignup, 
  selectedLessonTitle,
  onBack,
  user,
  onLogout,
  isVip
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 核心功能：平滑滚动到指定区域
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false); // 手机端点击后自动收起菜单
    
    // 如果正在看课（不在主页），先点一下返回
    if (selectedLessonTitle) {
      onBack();
      // 等返回动画结束后再滚动 (稍微延迟一点)
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // 如果在主页，直接滚动
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'bg-[#020617]/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* 左侧：Logo 或 返回按钮 */}
          <div className="flex items-center gap-8">
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => selectedLessonTitle ? onBack() : window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {selectedLessonTitle ? (
                <div className="flex items-center text-slate-300 hover:text-white transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                  <span className="font-medium">返回课程列表</span>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                    <span className="text-white font-bold text-xl">U</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-lg tracking-tight">UnitAI Revolution</span>
                    <span className="text-slate-400 text-[10px] tracking-wider uppercase">AI 游戏开发实战</span>
                  </div>
                </>
              )}
            </div>

            {/* 中间导航：只有在主页时才显示 */}
            {!selectedLessonTitle && (
              <nav className="hidden md:flex items-center gap-1">
                {/* 这里的 ID 必须对应 App.tsx 里的 section id */}
                <NavButton onClick={() => scrollToSection('features')}>功能展示</NavButton>
                <NavButton onClick={() => scrollToSection('curriculum')}>课程大纲</NavButton>
                <NavButton onClick={() => scrollToSection('showcase')}>学员作品</NavButton>
              </nav>
            )}
          </div>

          {/* 右侧：用户状态 */}
          <div className="hidden md:flex items-center gap-4">
            {user.isLoggedIn ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                  <div className="text-right hidden lg:block">
                    <div className="text-sm font-medium text-white flex items-center justify-end gap-2">
                      {user.name}
                      {isVip && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-gradient-to-r from-yellow-400 to-amber-600 text-black shadow-lg shadow-yellow-500/20">
                          VIP
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 cursor-pointer hover:text-red-400 transition-colors" onClick={onLogout}>
                      退出登录
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${isVip ? 'bg-slate-800 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.3)]' : 'bg-slate-800 border-slate-700'}`}>
                    <User className={`w-5 h-5 ${isVip ? 'text-yellow-400' : 'text-slate-400'}`} />
                  </div>
                </div>
                
                {/* 如果是 VIP，显示“继续学习”；不是 VIP，显示“升级” */}
                {selectedLessonTitle ? (
                   // 已经在学习页面，不显示按钮
                   null
                ) : (
                  <button 
                    onClick={() => scrollToSection('curriculum')}
                    className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2
                      ${isVip 
                        ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700' 
                        : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-lg hover:shadow-indigo-500/25 text-white'
                      }`}
                  >
                    {isVip ? '继续学习' : '开始免费学习'}
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button onClick={onLogin} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  登录
                </button>
                <button 
                  onClick={onSignup}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-sm transition-all shadow-lg shadow-indigo-500/25"
                >
                  开始免费学习
                </button>
              </div>
            )}
          </div>

          {/* 手机端菜单按钮 */}
          <button 
            className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* 手机端下拉菜单 */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#020617] border-b border-white/10 px-4 py-4 space-y-4 shadow-2xl">
          {!selectedLessonTitle && (
            <div className="flex flex-col space-y-2">
              <MobileNavButton onClick={() => scrollToSection('features')}>功能展示</MobileNavButton>
              <MobileNavButton onClick={() => scrollToSection('curriculum')}>课程大纲</MobileNavButton>
              <MobileNavButton onClick={() => scrollToSection('showcase')}>学员作品</MobileNavButton>
            </div>
          )}
          
          <div className="pt-4 border-t border-white/10">
            {user.isLoggedIn ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isVip ? 'bg-yellow-500/10 text-yellow-400' : 'bg-slate-800 text-slate-400'}`}>
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-white font-medium flex items-center gap-2">
                      {user.name}
                      {isVip && <span className="text-[10px] bg-yellow-500 text-black px-1 rounded font-bold">VIP</span>}
                    </div>
                    <div className="text-xs text-slate-500">{user.email}</div>
                  </div>
                </div>
                <button onClick={onLogout} className="w-full text-left text-red-400 text-sm py-2">退出登录</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => { onLogin(); setIsMobileMenuOpen(false); }} className="px-4 py-2 text-slate-300 border border-slate-700 rounded-lg">登录</button>
                <button onClick={() => { onSignup(); setIsMobileMenuOpen(false); }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">注册</button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

// 辅助组件：桌面端导航按钮
function NavButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
    >
      {children}
    </button>
  );
}

// 辅助组件：手机端导航按钮
function MobileNavButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="w-full text-left px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
    >
      {children}
    </button>
  );
}