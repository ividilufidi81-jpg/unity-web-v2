import React, { useState } from 'react';
import { ArrowRight, Star, Zap } from 'lucide-react';

// 1. 初始 4 个作品 (精选了稳定的 Unsplash 图片 ID)
const INITIAL_PROJECTS = [
  {
    id: 1,
    title: "赛博霓虹：极速追猎",
    category: "FPS",
    tech: "AI Pathfinding",
    author: "Li Wei",
    // 赛博朋克城市
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=800",
    color: "from-pink-500 to-rose-500"
  },
  {
    id: 2,
    title: "深海迷航：失落遗迹",
    category: "RPG",
    tech: "Procedural World",
    author: "Sarah J.",
    // 神秘古堡/遗迹
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "方块方舟：无限生存",
    category: "Sandbox",
    tech: "Inventory System",
    author: "Old Wang",
    // 积木/像素风格
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=800",
    color: "from-emerald-500 to-green-500"
  },
  {
    id: 4,
    title: "猫咪大冒险",
    category: "Platformer",
    tech: "Cute Art",
    author: "Little M",
    // 可爱风格/手柄
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    color: "from-orange-500 to-yellow-500"
  }
];

// 2. 加载更多出来的 4 个作品 (确保图片不重复)
const MORE_PROJECTS = [
  {
    id: 5,
    title: "星际贸易大亨",
    category: "Strategy",
    tech: "Economy AI",
    author: "Alex Chen",
    // 太空/科幻
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    color: "from-violet-600 to-purple-600"
  },
  {
    id: 6,
    title: "暗影塔防：尸潮",
    category: "Tower Defense",
    tech: "Swarm Logic",
    author: "K.T.",
    // 黑暗/战斗氛围
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
    color: "from-red-600 to-rose-600"
  },
  {
    id: 7,
    title: "魔法学院模拟器",
    category: "Simulation",
    tech: "NPC Interaction",
    author: "Magic Girl",
    // 魔法/书籍/光效
    image: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&q=80&w=800",
    color: "from-indigo-500 to-blue-600"
  },
  {
    id: 8,
    title: "像素赛车手",
    category: "Racing",
    tech: "Physics Engine",
    author: "Speedy",
    // 赛车/速度感
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
    color: "from-amber-500 to-yellow-500"
  }
];

export default function Showcase() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [hasLoadedMore, setHasLoadedMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    // 延迟 0.6 秒加载，体验更丝滑
    setTimeout(() => {
      setProjects([...projects, ...MORE_PROJECTS]);
      setHasLoadedMore(true);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
          学员实战作品展示
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          从零基础到独立开发，这些都是 UnitAI 学员在 2 周内完成的真实项目。
          <br />你的作品，也可以出现在这里。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <div 
            key={project.id}
            className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* 图片容器 */}
            <div className="aspect-[4/3] overflow-hidden relative bg-slate-800">
              {/* 渐变遮罩，让文字更清晰 */}
              <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 opacity-60`} />
              
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                // 如果图片加载失败，显示备用色块，防止裂图
                onError={(e) => {
                   (e.target as HTMLImageElement).style.display = 'none';
                   (e.target as HTMLImageElement).parentElement!.style.backgroundColor = '#1e293b';
                }}
              />
              
              <div className="absolute top-3 left-3 z-20 flex gap-2">
                <span className={`px-2 py-1 rounded text-[10px] font-bold bg-gradient-to-r ${project.color} text-white shadow-lg`}>
                  {project.category}
                </span>
                <span className="px-2 py-1 rounded text-[10px] font-bold bg-slate-900/80 text-blue-300 backdrop-blur-sm border border-blue-500/30">
                  {project.tech}
                </span>
              </div>
            </div>

            <div className="p-5 relative z-20">
              <h3 className="font-bold text-lg text-white mb-2 group-hover:text-indigo-400 transition-colors">
                {project.title}
              </h3>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${project.color} flex items-center justify-center text-[10px] font-bold text-white`}>
                    {project.author.charAt(0)}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{project.author}</span>
                </div>
                <div className="flex text-yellow-500 gap-0.5">
                   <Star className="w-3 h-3 fill-current" />
                   <Star className="w-3 h-3 fill-current" />
                   <Star className="w-3 h-3 fill-current" />
                   <Star className="w-3 h-3 fill-current" />
                   <Star className="w-3 h-3 fill-current" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        {!hasLoadedMore ? (
          <button 
            onClick={handleLoadMore}
            disabled={isLoading}
            className="group relative px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-full font-medium transition-all border border-slate-700 hover:border-indigo-500/50"
          >
            <div className="flex items-center gap-2">
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>正在加载更多...</span>
                </>
              ) : (
                <>
                  <span>查看更多学员作品库</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
          </button>
        ) : (
          <div className="inline-flex flex-col items-center gap-3 animate-fade-in">
             <p className="text-slate-500 text-sm">已加载全部精选作品 (8/8)</p>
             <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1 transition-colors">
               <Zap className="w-4 h-4" />
               我也要提交作品
             </button>
          </div>
        )}
      </div>
    </div>
  );
}