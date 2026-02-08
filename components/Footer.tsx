
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black italic text-white shadow-lg">U</div>
              <span className="text-2xl font-black tracking-tighter">UnityAI <span className="text-indigo-400">Revolution</span></span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed mb-8 text-lg font-medium">
              让创意不再被技术卡脖子。回归游戏开发的本初：你的想象力。
            </p>
            <div className="flex gap-6">
              <a href="#" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-all text-sm font-bold">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.813 4.653h-.854l.945-1.326a.735.735 0 00-.193-1.017.736.736 0 00-1.01-.193L14.73 4.653H9.27L7.3 2.117a.733.733 0 00-1.011-.193.735.735 0 00-.194 1.017l.945 1.326h-.854c-1.137 0-2.06.922-2.06 2.06v9.704c0 1.138.923 2.06 2.06 2.06h11.527c1.137 0 2.06-.922 2.06-2.06V6.713c0-1.138-.923-2.06-2.06-2.06zm-10.83 8.34c-.66 0-1.196-.535-1.196-1.196s.536-1.196 1.196-1.196 1.196.535 1.196 1.196-.536 1.196-1.196 1.196zm7.034 0c-.66 0-1.196-.535-1.196-1.196s.536-1.196 1.196-1.196 1.196.535 1.196 1.196-.536 1.196-1.196 1.196z"/></svg>
                </div>
                观看免费教程
              </a>
              <a href="#" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-all text-sm font-bold">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037 19.736 19.736 0 00-4.885 1.515.069.069 0 00-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
                </div>
                加入开发者社区
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-black mb-8 text-slate-100 uppercase tracking-widest text-xs">产品生态</h4>
            <ul className="space-y-5 text-slate-400 text-sm font-bold">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">核心实战课程</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Cursor AI 外挂</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">3D 资产生成中心</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">VIP 会员权益</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-8 text-slate-100 uppercase tracking-widest text-xs">开发者资源</h4>
            <ul className="space-y-5 text-slate-400 text-sm font-bold">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">API 文档指南</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Prompt 指令库</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Unity 6 适配手册</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">源码下载中心</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-900 flex flex-col items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6">
            <p className="text-slate-500 text-xs font-bold">
              © 2026 UnityAI Revolution. Powered by Unity & AI.
            </p>
            <div className="flex gap-10 text-[10px] text-slate-500 font-black uppercase tracking-widest">
              <a href="#" className="hover:text-indigo-400">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-400">Terms of Service</a>
              <a href="#" className="hover:text-indigo-400">Cookie Settings</a>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-[10px] text-slate-600 max-w-4xl leading-relaxed">
              Disclaimer: UnitAI is an independent educational project and is not affiliated with, endorsed by, or sponsored by Unity Technologies or its affiliates. 'Unity' is a registered trademark of Unity Technologies.<br/>
              (本站为独立教育项目，与 Unity Technologies 无关。本课程仅作技术分享，不代表 Unity 官方立场。)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
