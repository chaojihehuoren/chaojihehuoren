// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Crown, Shield, Gem, Store, ChevronRight, User } from 'lucide-react';

const memberConfig = {
  普通: {
    icon: User,
    color: '#9CA3AF',
    gradient: 'from-gray-400 to-gray-500',
    benefits: ['基础购物折扣', '积分回馈', '生日礼券']
  },
  银卡: {
    icon: Shield,
    color: '#9CA3AF',
    gradient: 'from-gray-300 to-gray-400',
    benefits: ['全场9折', '双倍积分', '专属客服', '每月专享券']
  },
  金卡: {
    icon: Crown,
    color: '#D4A574',
    gradient: 'from-amber-400 to-amber-500',
    benefits: ['全场8.5折', '3倍积分', '优先配送', '专属营养师', '年度体检']
  },
  经销商: {
    icon: Store,
    color: '#A85C4A',
    gradient: 'from-rose-500 to-rose-600',
    benefits: ['最低6折批发', '独立后台', '业绩返利', '专属培训', '线下门店']
  }
};
export function MemberHeader({
  memberInfo
}) {
  const level = memberInfo?.level || '银卡';
  const config = memberConfig[level] || memberConfig['银卡'];
  const IconComponent = config.icon;
  return <div className={`relative bg-gradient-to-br ${config.gradient} rounded-2xl p-6 text-white overflow-hidden`}>
      {/* 装饰元素 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative flex items-center gap-4">
        {/* 头像区域 */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30">
            <IconComponent className="w-10 h-10" />
          </div>
          {/* 等级徽章 */}
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full px-2 py-0.5 text-xs font-bold shadow-lg" style={{
          color: config.color
        }}>
            {level}
          </div>
        </div>

        {/* 用户信息 */}
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-1">{memberInfo?.nickname || '养生达人'}</h2>
          <p className="text-white/80 text-sm mb-2">{memberInfo?.phone || '138****8888'}</p>
          <div className="flex items-center gap-2">
            <IconComponent className="w-4 h-4" />
            <span className="text-sm font-medium">{level}会员</span>
          </div>
        </div>

        {/* 编辑入口 */}
        <ChevronRight className="w-6 h-6 text-white/60" />
      </div>

      {/* 会员权益标签 */}
      <div className="mt-4 flex flex-wrap gap-2">
        {config.benefits.slice(0, 3).map((benefit, index) => <span key={index} className="bg-white/20 rounded-full px-3 py-1 text-xs">
            {benefit}
          </span>)}
      </div>
    </div>;
}
export function MemberBenefitsPreview({
  level
}) {
  const config = memberConfig[level] || memberConfig['银卡'];
  return <div className="bg-gradient-to-r from-herb-green/5 to-herb-brown/5 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Gem className="w-5 h-5 text-herb-green" />
          <span className="font-semibold text-herb-dark">当前享受</span>
        </div>
        <button className="text-herb-green text-sm flex items-center gap-1">
          全部权益
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {config.benefits.map((benefit, index) => <div key={index} className="text-center p-2 bg-white rounded-lg shadow-sm">
            <p className="text-xs text-herb-dark">{benefit}</p>
          </div>)}
      </div>
    </div>;
}