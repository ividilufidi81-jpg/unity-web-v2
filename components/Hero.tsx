
import React, { useRef, useState, useEffect } from 'react';

interface HeroProps {
  onStart?: () => void;
  isLoggedIn?: boolean;
}

type DemoMode = 'physics' | 'eye' | 'vfx' | 'idle';

const demos: { mode: DemoMode; prompt: string; status: string }[] = [
  {
    mode: 'physics',
    prompt: "// 模拟物理刚体。生成 5 个受重力影响的小球，设置 0.8 弹力系数。",
    status: "Physics.Gravity simulation active."
  },
  {
    mode: 'eye',
    prompt: "// 编写视觉脚本。实现眼球跟随鼠标移动 (LookAt)，靠近时变红示警。",
    status: "Mouse-tracking state-machine running."
  },
  {
    mode: 'vfx',
    prompt: "// 实现受击反馈。点击目标触发粒子爆炸与屏幕震动 (Juice Effect)。",
    status: "VFX System & Screen Shake initialized."
  }
];

const Hero: React.FC<HeroProps> = ({ onStart, isLoggedIn }) => {
  const [currentDemoIdx, setCurrentDemoIdx] = useState<number>(-1);
  const [displayText, setDisplayText] = useState("// 系统已就绪。等待指令输入...");
  const [demoState, setDemoState] = useState<'ready' | 'typing' | 'generating' | 'success'>('ready');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isShaking, setIsShaking] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let typingTimeout: number;
    if (demoState === 'typing' && currentDemoIdx >= 0) {
      const targetPrompt = demos[currentDemoIdx].prompt;
      if (displayText.length < targetPrompt.length) {
        typingTimeout = window.setTimeout(() => {
          setDisplayText(targetPrompt.slice(0, displayText.length + 1));
        }, 20);
      } else {
        setDemoState('generating');
      }
    }
    return () => clearTimeout(typingTimeout);
  }, [displayText, demoState, currentDemoIdx]);

  useEffect(() => {
    let genTimeout: number;
    if (demoState === 'generating') {
      genTimeout = window.setTimeout(() => {
        setDemoState('success');
      }, 600);
    }
    return () => clearTimeout(genTimeout);
  }, [demoState]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (stageRef.current) {
      const rect = stageRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleClick = () => {
    if (currentDemoIdx >= 0 && demos[currentDemoIdx].mode === 'vfx' && demoState === 'success') {
      setIsShaking(true);
      const newParticles = Array.from({ length: 12 }).map((_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 60 - 30,
        y: Math.random() * 60 - 30
      }));
      setParticles(newParticles);
      setTimeout(() => setIsShaking(false), 300);
      setTimeout(() => setParticles([]), 600);
    }
  };

  const handleTriggerNext = () => {
    const nextIdx = (currentDemoIdx + 1) % demos.length;
    setCurrentDemoIdx(nextIdx);
    setDisplayText("");
    setDemoState('typing');
    setParticles([]);
    setIsShaking(false);
  };

  const getEyeCenter = () => {
    if (stageRef.current) {
        return { x: stageRef.current.clientWidth / 2, y: stageRef.current.clientHeight / 2 };
    }
    return { x: 150, y: 150 };
  };
  
  const center = getEyeCenter();
  const dx = mousePos.x - center.x;
  const dy = mousePos.y - center.y;
  const angle = Math.atan2(dy, dx);
  const distance = Math.sqrt(dx * dx + dy * dy);
  const pupilX = Math.cos(angle) * Math.min(distance / 5, 20);
  const pupilY = Math.sin(angle) * Math.min(distance / 5, 20);
  const isTooClose = distance < 100;

  return (
    <div className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="relative z-10 text-left max-w-xl text-animate">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-indigo-400">
            <span className="w-1 h-1 rounded-full bg-indigo-400 animate-pulse"></span>
            Unity + Cursor + AI 实战工作流
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-10 leading-[1.1]">
            【TestUNIT网站】<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-500 text-4xl md:text-5xl lg:text-6xl">
              AI 驱动开发革命
            </span>
          </h1>

          <p className="text-xl text-slate-300 mb-12 leading-relaxed font-bold border-l-4 border-indigo-500 pl-6">
            【无需编程基础，用 AI 帮你写代码，7天做出一款属于你的游戏】
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button 
              onClick={onStart}
              className="magnetic-btn w-full sm:w-auto px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl transition-all hover:bg-indigo-500 shadow-[0_20px_50px_rgba(79,70,229,0.4)] overflow-hidden relative group"
            >
              <span className="relative z-10 flex items-center gap-3">
                {isLoggedIn ? '继续实战 (¥90) ->' : '立即开启实战 (¥90) ->'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>
            <button 
              onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-10 py-5 glass border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3 group"
            >
              查看课程大纲
            </button>
          </div>
        </div>

        <div 
          className="relative lg:h-[600px] flex items-center justify-center transition-all duration-1000"
          style={{ transform: 'perspective(1200px) rotateY(-8deg) rotateX(4deg)' }}
        >
          <div className="absolute -inset-10 bg-indigo-600/10 blur-[100px] rounded-full opacity-40 animate-pulse"></div>
          
          <div className={`relative w-full aspect-[4/5] sm:aspect-square lg:h-full bg-slate-900 rounded-[3.5rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden ${isShaking ? 'animate-shake' : ''}`}>
            <div className="absolute inset-0 flex flex-col sm:flex-row">
              <div className="flex-1 border-b sm:border-b-0 sm:border-r border-white/5 flex flex-col bg-black">
                <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40"></span>
                  </div>
                  <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Prompt Editor</div>
                </div>
                
                <div className="flex-1 p-10 flex flex-col items-center justify-center text-center font-mono">
                  <div className="max-w-[280px] sm:max-w-none">
                    <p className="text-lg md:text-xl font-bold text-green-400 leading-relaxed mb-8 text-left">
                      <span className="text-indigo-500 mr-2 opacity-50">>></span>
                      {displayText}
                      {demoState === 'typing' && <span className="inline-block w-2.5 h-5 ml-1 bg-indigo-500 animate-pulse align-middle"></span>}
                    </p>
                    <div className="h-10 flex flex-col items-center justify-center">
                      {demoState === 'generating' && (
                        <div className="text-cyan-400 text-[10px] animate-pulse uppercase tracking-[0.3em] font-black">AI Analyzing...</div>
                      )}
                      {demoState === 'success' && (
                        <div className="text-green-500 text-[11px] uppercase tracking-[0.25em] font-black flex items-center gap-2 animate-fade-in">
                          <span className="w-4 h-4 rounded-full bg-green-500/10 flex items-center justify-center text-[8px]">✓</span> 
                          SCRIPT GENERATED & ATTACHED
                        </div>
                      )}
                      {demoState === 'ready' && (
                         <div className="text-slate-700 text-[10px] uppercase tracking-[0.3em] font-black">Waiting for input...</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div 
                ref={stageRef}
                onMouseMove={handleMouseMove}
                onClick={handleClick}
                className={`flex-1 flex flex-col bg-slate-950 unity-grid relative cursor-crosshair overflow-hidden`}
              >
                <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between relative z-20">
                  <div className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">Scene Preview</div>
                </div>
                
                <div className="flex-1 flex items-center justify-center relative">
                  {demoState === 'ready' && (
                    <div className="relative group flex flex-col items-center">
                      <div className="w-20 h-20 bg-indigo-500/20 border border-indigo-500/40 rounded-2xl animate-rotate shadow-[0_0_30px_rgba(79,70,229,0.2)] flex items-center justify-center">
                         <div className="w-8 h-8 bg-indigo-500/40 rounded-lg"></div>
                      </div>
                      <div className="mt-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] animate-pulse">点击下方按钮开始演示</div>
                    </div>
                  )}

                  {(demoState === 'typing' || demoState === 'generating') && (
                    <div className="flex flex-col items-center gap-6 animate-fade-in">
                       <div className="relative">
                          <div className="w-14 h-14 border-2 border-white/5 border-t-indigo-500 rounded-full animate-spin"></div>
                       </div>
                    </div>
                  )}

                  {demoState === 'success' && currentDemoIdx === 0 && (
                    <div className="absolute inset-0 flex items-start justify-center pt-20">
                      <div className="relative w-full h-[300px] flex items-end justify-center gap-4 px-10">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <div 
                            key={i} 
                            className="w-12 h-12 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.6)] opacity-0 animate-physics-drop" 
                            style={{ 
                              backgroundColor: ['#ef4444', '#6366f1', '#22d3ee', '#f59e0b', '#ec4899'][i], 
                              animationDelay: `${i * 0.15}s`,
                              animationFillMode: 'forwards'
                            }} 
                          />
                        ))}
                        <div className="absolute bottom-0 left-6 right-6 h-[4px] bg-indigo-500/30 rounded-full blur-[1px]"></div>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Simulation Floor</div>
                      </div>
                    </div>
                  )}

                  {demoState === 'success' && currentDemoIdx === 1 && (
                    <div className="relative w-40 h-40 rounded-full border-4 border-white/10 flex items-center justify-center bg-slate-900 shadow-inner">
                       <div className={`w-32 h-32 rounded-full bg-white flex items-center justify-center relative shadow-2xl ${isTooClose ? 'bg-red-100' : ''}`}>
                          <div className="w-14 h-14 bg-slate-950 rounded-full flex items-center justify-center" style={{ transform: `translate(${pupilX}px, ${pupilY}px)` }}>
                             <div className="w-4 h-4 bg-white/30 rounded-full translate-x-2 -translate-y-2"></div>
                          </div>
                       </div>
                    </div>
                  )}

                  {demoState === 'success' && currentDemoIdx === 2 && (
                    <div className="relative group flex flex-col items-center">
                      <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] shadow-[0_0_60px_rgba(99,102,241,0.5)] animate-floating border border-indigo-400/30 flex items-center justify-center">
                        <div className="w-10 h-10 bg-white/20 rounded-full animate-pulse blur-sm"></div>
                      </div>
                      <div className="mt-8 text-[10px] font-black text-indigo-400 uppercase tracking-widest">点击上方方块触发特效</div>
                      {particles.map(p => (
                        <div key={p.id} className="absolute left-1/2 top-1/2 w-4 h-4 bg-indigo-400 rounded-full animate-vfx-particle" style={{ '--tx': `${p.x * 6}px`, '--ty': `${p.y * 6}px` } as React.CSSProperties} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black via-black/95 to-transparent flex flex-col items-center pointer-events-none">
              <button 
                onClick={handleTriggerNext}
                disabled={demoState === 'typing' || demoState === 'generating'}
                className="pointer-events-auto px-12 py-5 bg-indigo-600 rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-[0_20px_50px_rgba(79,70,229,0.4)] mb-4 hover:bg-indigo-500 hover:scale-105 transition-all disabled:opacity-30"
              >
                {currentDemoIdx === -1 ? '⚡️ 开启 AI 演示' : '⚡️ 生成新玩法 (Next Gen Gameplay)'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes physics-drop {
          0% { transform: translateY(-400px) scaleY(1.3); opacity: 0; }
          15% { opacity: 1; transform: translateY(0) scaleY(0.7); animation-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67); }
          30% { transform: translateY(-120px) scaleY(1.15); animation-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67); }
          45% { transform: translateY(0) scaleY(0.75); animation-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67); }
          60% { transform: translateY(-50px) scaleY(1.05); animation-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67); }
          75% { transform: translateY(0) scaleY(0.85); animation-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67); }
          85% { transform: translateY(-15px) scaleY(1.02); animation-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67); }
          100% { transform: translateY(0) scaleY(1); opacity: 1; }
        }
        .animate-physics-drop { animation: physics-drop 2.2s forwards; }
        
        @keyframes floating {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-floating { animation: floating 4s ease-in-out infinite; }
        
        @keyframes rotate-idle {
           from { transform: perspective(500px) rotateX(20deg) rotateY(0deg); }
           to { transform: perspective(500px) rotateX(20deg) rotateY(360deg); }
        }
        .animate-rotate { animation: rotate-idle 8s linear infinite; }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-5px); }
        }
        .animate-shake { animation: shake 0.4s both; }
        
        @keyframes vfx-particle {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        .animate-vfx-particle { animation: vfx-particle 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Hero;
