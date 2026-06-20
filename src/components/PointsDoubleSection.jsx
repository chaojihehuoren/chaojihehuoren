// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Gift, Star, Clock, Users } from 'lucide-react';

export function PointsDoubleSection() {
  return <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-5 text-white relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      {/* 内容 */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <Gift className="text-yellow-200" size={24} />
          <h3 className="text-lg font-serif font-bold">夏至积分翻倍</h3>
          <span className="px-2 py-0.5 bg-yellow-400 text-emerald-800 text-xs rounded-full font-medium animate-pulse">
            限时
          </span>
        </div>
        
        <p className="text-white/90 text-sm mb-4">
          夏至期间（6月21日-23日）购物享双倍积分，积分可兑换养生好物！
        </p>
        
        {/* 积分规则 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Star className="text-yellow-200" size={16} />
              <span className="text-xs text-white/80">普通商品</span>
            </div>
            <div className="text-xl font-bold">2倍积分</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Star className="text-yellow-200" size={16} />
              <span className="text-xs text-white/80">特惠商品</span>
            </div>
            <div className="text-xl font-bold">4倍积分</div>
          </div>
        </div>
        
        {/* 活动信息 */}
        <div className="mt-4 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-white/80" />
            <span>6月21日-23日</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} className="text-white/80" />
            <span>已有3,286人参与</span>
          </div>
        </div>
        
        {/* 积分计算示例 */}
        <div className="mt-4 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
          <div className="text-xs text-white/80 mb-1">消费¥100可获得</div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-yellow-200">200</span>
            <span className="text-sm">积分</span>
            <span className="ml-auto text-xs bg-yellow-400 text-emerald-800 px-2 py-0.5 rounded-full">
              ≈ ¥2
            </span>
          </div>
        </div>
      </div>
    </div>;
}