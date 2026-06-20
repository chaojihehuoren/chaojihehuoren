// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Heart, Share2, HeadphonesIcon, Settings, FileHeart, Users, ChevronRight, Scale } from 'lucide-react';

const toolGroups = [{
  title: '健康服务',
  items: [{
    id: 'health',
    icon: FileHeart,
    label: '我的健康档案',
    badge: '已检测',
    color: 'text-rose-500 bg-rose-100'
  }, {
    id: 'test',
    icon: Heart,
    label: 'AI体质检测',
    badge: '重新测试',
    color: 'text-herb-green bg-herb-green/10'
  }]
}, {
  title: '推广分销',
  items: [{
    id: 'share',
    icon: Share2,
    label: '分销推广',
    badge: '赚佣金',
    color: 'text-amber-500 bg-amber-100'
  }, {
    id: 'team',
    icon: Users,
    label: '我的团队',
    badge: '5人',
    color: 'text-blue-500 bg-blue-100'
  }]
}, {
  title: '服务支持',
  items: [{
    id: 'customer',
    icon: HeadphonesIcon,
    label: '在线客服',
    badge: '9:00-21:00',
    color: 'text-purple-500 bg-purple-100'
  }, {
    id: 'setting',
    icon: Settings,
    label: '账户设置',
    badge: '',
    color: 'text-gray-500 bg-gray-100'
  }]
}];
export function MemberTools({
  onNavigate
}) {
  return <div className="space-y-4">
      {toolGroups.map(group => <div key={group.title} className="bg-white rounded-xl shadow-sm border border-herb-brown/10 overflow-hidden">
          <div className="px-4 py-3 border-b border-herb-brown/5">
            <h3 className="font-semibold text-herb-dark">{group.title}</h3>
          </div>
          <div className="divide-y divide-herb-brown/5">
            {group.items.map(item => {
          const IconComponent = item.icon;
          return <button key={item.id} onClick={() => onNavigate?.(item.id)} className="w-full px-4 py-4 flex items-center justify-between hover:bg-herb-brown/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-herb-dark">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && <span className="text-xs text-herb-brown bg-herb-brown/10 px-2 py-1 rounded">
                        {item.badge}
                      </span>}
                    <ChevronRight className="w-5 h-5 text-herb-brown/40" />
                  </div>
                </button>;
        })}
          </div>
        </div>)}
    </div>;
}