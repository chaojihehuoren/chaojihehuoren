// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Package, ClipboardList, Receipt, TrendingUp } from 'lucide-react';

const TABS = [{
  id: 'purchase',
  label: '批发采购',
  icon: Package
}, {
  id: 'pickup',
  label: '门店核销',
  icon: ClipboardList
}, {
  id: 'statement',
  label: '对账单',
  icon: Receipt
}, {
  id: 'performance',
  label: '业绩看板',
  icon: TrendingUp
}];
export function WholesaleTabs({
  activeTab,
  onTabChange
}) {
  return <div className="bg-white border-b border-[#E8E0D5] px-4">
      <div className="flex">
        {TABS.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return <button key={tab.id} onClick={() => onTabChange(tab.id)} className={`flex-1 py-3 flex flex-col items-center gap-1 border-b-2 transition-colors ${isActive ? 'border-[#5D8A66] text-[#5D8A66]' : 'border-transparent text-[#8B7355]'}`}>
              <Icon className="w-5 h-5" />
              <span className={`text-xs ${isActive ? 'font-bold' : ''}`}>{tab.label}</span>
            </button>;
      })}
      </div>
    </div>;
}