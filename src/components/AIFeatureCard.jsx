// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Brain, Sparkles, ChevronRight } from 'lucide-react';

export function AIFeatureCard({
  onClick
}) {
  return <button onClick={onClick} className="relative w-full bg-gradient-to-r from-[#5D8A66] via-[#6B9B76] to-[#7AAB86] rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:shadow-xl active:scale-98">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
        <svg viewBox="0 0 160 160" className="w-full h-full">
          <circle cx="120" cy="40" r="60" fill="#fff" />
          <circle cx="80" cy="80" r="40" fill="none" stroke="#fff" strokeWidth="2" />
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10">
        <svg viewBox="0 0 128 128" className="w-full h-full">
          <path d="M10 100 Q64 20 118 80" stroke="#fff" strokeWidth="3" fill="none" />
        </svg>
      </div>

      {/* 内容 */}
      <div className="relative z-10 flex items-center gap-4">
        {/* AI 图标 */}
        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
          <Brain className="w-8 h-8 text-white" />
        </div>

        {/* 文字内容 */}
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-serif text-white">AI 智能体质检测</h3>
            <Sparkles className="w-4 h-4 text-[#C4A77D]" />
          </div>
          <p className="text-sm text-white/80 mb-2">
            基于中医体质分类，为您定制专属养生方案
          </p>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <span className="bg-white/20 px-2 py-1 rounded-full">3分钟完成</span>
            <span className="bg-white/20 px-2 py-1 rounded-full">免费体验</span>
          </div>
        </div>

        {/* 箭头 */}
        <ChevronRight className="w-6 h-6 text-white/60 flex-shrink-0" />
      </div>

      {/* 底部装饰线 */}
      <div className="absolute bottom-0 left-5 right-5 h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full w-1/3 bg-white/50 rounded-full animate-pulse" />
      </div>
    </button>;
}