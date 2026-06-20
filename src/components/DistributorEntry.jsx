// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Store, Users, ChevronRight, ToggleLeft, ToggleRight } from 'lucide-react';

export function DistributorEntry({
  userType,
  onToggle,
  onClick
}) {
  const isB = userType === 'B';
  return <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      {/* 顶部标签栏 */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#5C4033] to-[#7A5C48]">
        <div className="flex items-center gap-2">
          <Store className="w-4 h-4 text-white" />
          <span className="text-sm font-medium text-white">经销商采购通道</span>
        </div>
        
        {/* C/B端切换 */}
        <button onClick={onToggle} className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full transition-colors hover:bg-white/30">
          <span className={`text-xs ${isB ? 'text-white/60' : 'text-white font-medium'}`}>C端</span>
          {isB ? <ToggleRight className="w-5 h-5 text-white" /> : <ToggleLeft className="w-5 h-5 text-white/60" />}
          <span className={`text-xs ${isB ? 'text-white font-medium' : 'text-white/60'}`}>B端</span>
        </button>
      </div>

      {/* 内容区 */}
      <button onClick={onClick} className="w-full p-4 flex items-center gap-4 transition-colors hover:bg-[#FAF6F0] active:bg-[#F0EBE4]">
        {/* 图标 */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isB ? 'bg-[#5D8A66]/10' : 'bg-[#C4A77D]/15'}`}>
          {isB ? <Store className="w-6 h-6 text-[#5D8A66]" /> : <Users className="w-6 h-6 text-[#C4A77D]" />}
        </div>

        {/* 文字信息 */}
        <div className="flex-1 text-left">
          <h3 className="text-sm font-medium text-[#5C4033] mb-1">
            {isB ? 'B端采购专区' : 'C端体验入口'}
          </h3>
          <p className="text-xs text-[#8B7355]">
            {isB ? '专属价格 · 批量采购 · 业绩查询' : '了解更多 · 成为经销商'}
          </p>
        </div>

        {/* 箭头 */}
        <ChevronRight className="w-5 h-5 text-[#8B7355]" />
      </button>

      {/* 底部提示 */}
      <div className="px-4 py-2 bg-[#FAF6F0] border-t border-[#E8E0D5]">
        <p className={`text-xs text-center ${isB ? 'text-[#5D8A66]' : 'text-[#8B7355]'}`}>
          {isB ? '✓ 已登录为认证经销商，可享受专属采购价' : '点击了解更多成为经销商的专属权益'}
        </p>
      </div>
    </div>;
}