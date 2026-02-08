
import React, { useRef } from 'react';

const features = [
  {
    id: 'f1',
    title: "你说中文，它写 C#",
    tagline: "智能编程",
    desc: "忘掉语法背诵。通过 Cursor 深度集成，你只需描述“让角色按空格键跳跃”，AI 自动生成无 Bug 的脚本并智能挂载。",
    icon: "⌨️",
    img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
    snippet: "// 按下空格键发射子弹\nif (Input.GetKeyDown(KeyCode.Space)) { Shoot(); }"
  },
  {
    id: 'f2',
    title: "不知道点哪里？AI 画圈告诉你",
    tagline: "实时导航",
    desc: "告别“切屏查百度”。直接语音提问，AI 会直接在你的 Unity 界面上高亮圈出目标按钮，手把手教你配置参数。",
    icon: "🎙️",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    hotspot: { x: '70%', y: '40%', label: '点击此处添加 Add Component' }
  },
  {
    id: 'f3',
    title: "红字报错？一键修复机会",
    tagline: "自动除错",
    desc: "遇到 NullReferenceException 别慌。AI 自动捕获错误，用大白话解释原因，并提供“一键修复”按钮。",
    icon: "🛠️",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    isComparison: true
  }
];

const Card: React.FC<{ f: typeof features[0] }> = ({ f }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--spotlight-x', `${x}px`);
    cardRef.current.style.setProperty('--spotlight-y', `${y}px`);
    
    const xPct = (x / rect.width - 0.5) * 6;
    const yPct = (y / rect.height - 0.5) * -6;
    cardRef.current.style.setProperty('--tilt-x', `${yPct}deg`);
    cardRef.current.style.setProperty('--tilt-y', `${xPct}deg`);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative p-[1px] rounded-[2.5rem] bg-white/5 overflow-hidden transition-all duration-300 ${f.isComparison ? 'lg:col-span-2' : ''}`}
      style={{ 
        transform: `perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))`,
      } as React.CSSProperties}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          background: `radial-gradient(500px circle at var(--spotlight-x) var(--spotlight-y), rgba(99, 102, 241, 0.25), transparent 85%)`
        }}
      />
      
      <div className="relative z-20 p-10 rounded-[2.5rem] bg-slate-950/80 backdrop-blur-3xl h-full flex flex-col border border-white/5">
        <div className="flex items-start gap-6 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-4xl shadow-2xl group-hover:bg-indigo-500/20 transition-all">
            {f.icon}
          </div>
          <div>
            <span className="text-indigo-400 font-black text-xs tracking-[0.3em] uppercase block mb-1">{f.tagline}</span>
            <h3 className="text-3xl font-black text-white">{f.title}</h3>
          </div>
        </div>
        
        <p className="text-slate-400 text-lg leading-relaxed mb-10">
          {f.desc}
        </p>

        <div className={`relative rounded-3xl overflow-hidden ${f.isComparison ? 'aspect-[21/9]' : 'aspect-video'} bg-slate-900 border border-white/10 group-hover:border-indigo-500/40 transition-all shadow-inner`}>
          <img 
            src={f.img} 
            alt={f.title} 
            className="w-full h-full object-cover opacity-20 group-hover:opacity-60 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
          
          {f.snippet && (
            <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="w-full bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 font-mono text-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-slate-500">// AI 自动生成：</span>
                    <div className="mt-2 text-indigo-300">{f.snippet}</div>
                </div>
            </div>
          )}

          {f.hotspot && (
            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ left: f.hotspot.x, top: f.hotspot.y }}>
                <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-cyan-400/20 border-2 border-cyan-400 animate-ping absolute inset-0"></div>
                    <div className="w-12 h-12 rounded-full bg-cyan-400/40 border-2 border-cyan-400 flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(34,211,238,0.6)]">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-cyan-500 text-black px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap shadow-2xl animate-bounce">
                        {f.hotspot.label}
                    </div>
                </div>
            </div>
          )}

          {f.isComparison && (
            <div className="absolute inset-0 flex items-center justify-around px-10">
                <div className="flex flex-col items-center gap-4 group-hover:-translate-x-4 transition-transform duration-700">
                    <div className="text-4xl">🤯</div>
                    <div className="px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-lg text-red-400 text-xs font-black">满屏红字报错</div>
                </div>
                <div className="w-px h-20 bg-white/10 group-hover:scale-y-150 transition-transform duration-700"></div>
                <div className="flex flex-col items-center gap-4 group-hover:translate-x-4 transition-transform duration-700">
                    <div className="text-4xl">✅</div>
                    <div className="px-4 py-2 bg-green-500/20 border border-green-500/40 rounded-lg text-green-400 text-xs font-black">运行流畅</div>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Solutions: React.FC = () => {
  return (
    <div id="solution" className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter">
          这不是网课，是你的 <span className="text-gradient">AI 外挂</span>
        </h2>
        <div className="flex items-center justify-center gap-4">
            <span className="h-px w-20 bg-slate-800"></span>
            <span className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px]">Real-time Assistance Engine</span>
            <span className="h-px w-20 bg-slate-800"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {features.map((f) => <Card key={f.id} f={f} />)}
      </div>
    </div>
  );
};

export default Solutions;
