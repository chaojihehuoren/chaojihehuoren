// @ts-ignore;
import React from 'react';

export function TestProgress({
  current,
  total
}) {
  const percentage = Math.round(current / total * 100);
  return <div className="bg-white px-4 py-3 border-b border-[#C4A77D]/20">
      {/* 顶部进度信息 */}
      <div className="flex items-center justify-between mb-2">
        <button onClick={() => window.history.back()} className="w-10 h-10 rounded-full bg-[#FAF6F0] flex items-center justify-center">
          <span className="text-[#5C4033] text-lg">←</span>
        </button>
        <div className="text-center">
          <div className="text-sm text-[#8B7355]">
            第 <span className="font-bold text-[#5D8A66]">{current}</span> / {total} 题
          </div>
        </div>
        <div className="text-sm text-[#8B7355] font-medium">
          {percentage}%
        </div>
      </div>

      {/* 进度条 */}
      <div className="h-3 bg-[#E8E0D5] rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#5D8A66] to-[#7AAF86] rounded-full transition-all duration-500 ease-out" style={{
        width: `${percentage}%`
      }} />
      </div>

      {/* 简化进度指示点 */}
      <div className="flex justify-center gap-1 mt-2">
        {[...Array(total)].map((_, idx) => <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx < current ? 'bg-[#5D8A66]' : idx === current ? 'bg-[#C4A77D] animate-pulse' : 'bg-[#E8E0D5]'}`} />)}
      </div>
    </div>;
}
export default TestProgress;