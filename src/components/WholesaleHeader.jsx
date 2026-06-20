// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Badge } from '@/components/ui';
// @ts-ignore;
import { Shield, ChevronRight, User } from 'lucide-react';

export function WholesaleHeader({
  onSwitchMode
}) {
  return <div className="bg-gradient-to-r from-[#5C4033] to-[#8B6914] px-4 py-5 pb-16">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#D4A574] flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white text-lg font-bold">经销商采购专区</h1>
            <p className="text-[#D4A574] text-sm">专属渠道 · 批发采购</p>
          </div>
        </div>
        <button onClick={() => onSwitchMode('C')} className="px-3 py-1.5 bg-white/20 rounded-full text-white text-sm flex items-center gap-1">
          切换C端
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 经销商信息 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#FAF6F0] flex items-center justify-center overflow-hidden">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="经销商头像" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white font-bold text-lg">济南本草堂大药房</span>
              <Badge className="bg-[#D4A574] text-white text-xs border-0">金牌经销商</Badge>
            </div>
            <p className="text-[#D4A574] text-sm">经销商编号：SD-JN-2024-0588</p>
            <p className="text-[#D4A574] text-sm">合作有效期：2026.01.01 - 2027.01.01</p>
          </div>
        </div>
      </div>

      {/* 快捷数据 */}
      <div className="grid grid-cols-4 gap-3 mt-4">
        <div className="bg-white/10 rounded-xl p-3 text-center">
          <p className="text-white/70 text-xs mb-1">本月采购额</p>
          <p className="text-white font-bold text-lg">¥128,580</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3 text-center">
          <p className="text-white/70 text-xs mb-1">可用额度</p>
          <p className="text-white font-bold text-lg">¥50,000</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3 text-center">
          <p className="text-white/70 text-xs mb-1">本月返利</p>
          <p className="text-[#D4A574] font-bold text-lg">¥3,857</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3 text-center">
          <p className="text-white/70 text-xs mb-1">待核销</p>
          <p className="text-white font-bold text-lg">12笔</p>
        </div>
      </div>
    </div>;
}