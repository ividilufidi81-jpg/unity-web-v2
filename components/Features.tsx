
import React from 'react';

const Features: React.FC = () => {
  return (
    <section id="features" className="relative py-32 px-6 bg-[#0a0a0a] overflow-hidden">
      {/* Background Decor: Unity-style Grid */}
      <div className="absolute inset-0 unity-grid opacity-10 pointer-events-none"></div>
      
      {/* Radial Gradient Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-white leading-tight">
            这不是外挂，<br />这是未来的开发方式
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            重新定义游戏开发：告别死记硬背，让 AI 成为你的代码引擎。
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card A: Coding (Green) - Span 2 */}
          <div className="md:col-span-2 group relative p-[1px] rounded-[2.5rem] bg-white/5 overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(74,222,128,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative h-full glass rounded-[2.5rem] p-10 flex flex-col md:flex-row gap-8 items-center border border-white/10 group-hover:border-green-500/30 transition-colors">
              <div className="flex-1">
                <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 text-green-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-white mb-4">你说中文，它写 C#</h3>
                <p className="text-slate-400 leading-relaxed text-lg">
                  深度集成 Cursor 与 Claude 3.5。忘掉枯燥的语法手册，直接用自然语言描述逻辑，AI 实时生成无 Bug 脚本并自动优化性能。
                </p>
              </div>
              <div className="w-full md:w-1/3 aspect-video md:aspect-square bg-black/40 rounded-3xl border border-white/5 p-4 font-mono text-xs flex flex-col justify-center overflow-hidden">
                <div className="text-green-500/50 mb-2">// AI Generated</div>
                <div className="text-green-400/90 animate-pulse">void Update() {'{'}</div>
                <div className="pl-4 text-slate-300">if (Input.GetKeyDown(Space))</div>
                <div className="pl-8 text-indigo-400">Jump();</div>
                <div className="text-green-400/90 animate-pulse">{'}'}</div>
              </div>
            </div>
          </div>

          {/* Card B: Assets (Purple) - Span 1 */}
          <div className="md:col-span-1 group relative p-[1px] rounded-[2.5rem] bg-white/5 overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(192,132,252,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative h-full glass rounded-[2.5rem] p-10 border border-white/10 group-hover:border-purple-500/30 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-4">一人抵过美术团队</h3>
              <p className="text-slate-400 leading-relaxed">
                利用 Generative AI 一键生成无缝贴图、UI 图标和 3D 模型，你的创意即刻落地，彻底解决开发素材荒。
              </p>
            </div>
          </div>

          {/* Card C: Agents (Blue) - Span 1 */}
          <div className="md:col-span-1 group relative p-[1px] rounded-[2.5rem] bg-white/5 overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(99,102,241,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative h-full glass rounded-[2.5rem] p-10 border border-white/10 group-hover:border-blue-500/30 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-4">赋予 NPC 真实灵魂</h3>
              <p className="text-slate-400 leading-relaxed">
                构建基于 LLM 的 Agentic AI 敌人。NPC 不再是简单的数值循环，而是拥有思考能力的高智商游戏生命。
              </p>
            </div>
          </div>

          {/* Card D: Mentor (Orange) - Span 2 */}
          <div className="md:col-span-2 group relative p-[1px] rounded-[2.5rem] bg-white/5 overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(249,115,22,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative h-full glass rounded-[2.5rem] p-10 flex flex-col md:flex-row-reverse gap-8 items-center border border-white/10 group-hover:border-orange-500/30 transition-colors">
              <div className="flex-1">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 text-orange-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-white mb-4">指哪打哪的屏幕私教</h3>
                <p className="text-slate-400 leading-relaxed text-lg">
                  Unity 界面太复杂? 直接在编辑器界面提问，AI 帮你高亮圈出目标按钮，并手把手教你配置参数，就像老师坐在你身后。
                </p>
              </div>
              <div className="w-full md:w-2/5 aspect-video bg-slate-900 rounded-3xl relative overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 unity-grid opacity-20"></div>
                 <div className="w-12 h-12 rounded-full border-2 border-orange-500 animate-ping absolute"></div>
                 <div className="w-12 h-12 rounded-full border-4 border-orange-500 flex items-center justify-center bg-orange-500/20 text-white font-bold z-10">!</div>
                 <div className="absolute bottom-4 left-4 right-4 bg-orange-500 text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase text-center">
                    Inspector Panel Highlighted
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;
