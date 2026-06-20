// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Store, TrendingUp, FileText, MapPin, DollarSign, BarChart3, ChevronRight, Users, Calculator } from 'lucide-react';

const b2bFeatures = [{
  id: 'price',
  icon: Calculator,
  label: '阶梯批发价',
  desc: '10件起8折',
  color: 'bg-emerald-100 text-emerald-600'
}, {
  id: 'orders',
  icon: FileText,
  label: '批量采购清单',
  desc: '高效管理',
  color: 'bg-blue-100 text-blue-600'
}, {
  id: 'invoice',
  icon: FileText,
  label: '电子发票',
  desc: '在线申请',
  color: 'bg-amber-100 text-amber-600'
}, {
  id: 'pickup',
  icon: MapPin,
  label: '门店自提',
  desc: '就近核销',
  color: 'bg-purple-100 text-purple-600'
}, {
  id: 'rebate',
  icon: DollarSign,
  label: '渠道返利',
  desc: '月度对账',
  color: 'bg-rose-100 text-rose-600'
}, {
  id: 'stats',
  icon: BarChart3,
  label: '分销业绩',
  desc: '实时看板',
  color: 'bg-cyan-100 text-cyan-600'
}];
export function DistributorAccess({
  userType,
  onNavigate
}) {
  const isDistributor = userType === '经销商';
  return <div className="bg-white rounded-xl shadow-sm border border-herb-brown/10 overflow-hidden">
      <div className="px-4 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5" />
            <h3 className="font-semibold">B端经销商采购专区</h3>
          </div>
          <span className="text-xs bg-white/20 px-2 py-1 rounded">企业采购</span>
        </div>
      </div>

      {isDistributor ? <>
          {/* 经销商面板 */}
          <div className="p-4 bg-herb-brown/5">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-sm text-herb-brown">本月采购额</p>
                <p className="text-xl font-bold text-herb-dark">¥12,680</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-sm text-herb-brown">待结算佣金</p>
                <p className="text-xl font-bold text-rose-500">¥1,280</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 p-3">
            {b2bFeatures.map(feature => {
          const IconComponent = feature.icon;
          return <button key={feature.id} onClick={() => onNavigate?.(`distributor-${feature.id}`)} className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-herb-brown/5 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${feature.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-herb-dark font-medium">{feature.label}</span>
                </button>;
        })}
          </div>
        </> : (/* 普通用户升级入口 */
    <div className="p-4">
          <div className="text-center mb-4">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-herb-dark mb-1">成为经销商</h4>
            <p className="text-sm text-herb-brown">享受最低6折批发价 + 业绩返利</p>
          </div>
          <button onClick={() => onNavigate?.('upgrade-distributor')} className="w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl py-3 font-semibold">
            申请入驻
          </button>
          <div className="mt-4 flex justify-center gap-4 text-xs text-herb-brown">
            <span>✓ 独立后台</span>
            <span>✓ 批量采购</span>
            <span>✓ 业绩返利</span>
          </div>
        </div>)}
    </div>;
}