// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Shield, Gift, Truck, Heart, Headphones, Crown, ChevronRight } from 'lucide-react';

const benefitItems = [{
  icon: Shield,
  title: '专属折扣',
  desc: '会员专享全场折扣',
  color: 'bg-emerald-100 text-emerald-600',
  level: ['普通会员9.8折', '银卡会员9折', '金卡会员8.5折', '经销商6折起']
}, {
  icon: Gift,
  title: '积分回馈',
  desc: '购物返积分抵现',
  color: 'bg-amber-100 text-amber-600',
  level: ['普通1倍积分', '银卡2倍积分', '金卡3倍积分', '经销商5倍积分']
}, {
  icon: Truck,
  title: '物流服务',
  desc: '优先发货包邮',
  color: 'bg-blue-100 text-blue-600',
  level: ['普通7日达', '银卡5日达+包邮', '金卡3日达+包邮', '经销商次日达']
}, {
  icon: Heart,
  title: '健康服务',
  desc: '专属健康管理',
  color: 'bg-rose-100 text-rose-600',
  level: ['普通积分商城', '银卡月度体检', '金卡专属营养师', '经销商年度体检']
}, {
  icon: Headphones,
  title: '专属客服',
  desc: '优先响应服务',
  color: 'bg-purple-100 text-purple-600',
  level: ['普通客服', '银卡快速响应', '金卡1对1服务', '经销商专属顾问']
}, {
  icon: Crown,
  title: '会员活动',
  desc: '专享活动福利',
  color: 'bg-rose-100 text-rose-500',
  level: ['普通生日礼券', '银卡节日礼包', '金卡新品试用', '经销商新品首发']
}];
export function MemberBenefits() {
  return <div className="bg-white rounded-xl shadow-sm border border-herb-brown/10 overflow-hidden">
      <div className="p-4 border-b border-herb-brown/5 flex items-center justify-between">
        <h3 className="font-semibold text-herb-dark">会员权益说明</h3>
        <button className="flex items-center gap-1 text-sm text-herb-green">
          全部
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="divide-y divide-herb-brown/5">
        {benefitItems.map((item, index) => {
        const IconComponent = item.icon;
        return <div key={index} className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-herb-dark">{item.title}</p>
                  <p className="text-xs text-herb-brown">{item.desc}</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {item.level.map((level, i) => <div key={i} className="text-center p-2 bg-herb-brown/5 rounded-lg">
                    <p className="text-xs text-herb-brown">{level}</p>
                  </div>)}
              </div>
            </div>;
      })}
      </div>
    </div>;
}