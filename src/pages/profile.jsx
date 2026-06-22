// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { User, Settings, Package, Heart, MapPin, CreditCard, Gift, Bell, HelpCircle, LogOut, ChevronRight, ShoppingBag, Truck, CheckCircle, Clock } from 'lucide-react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';

export default function ProfilePage(props) {
  const {
    toast
  } = useToast();
  const [userInfo, setUserInfo] = useState({
    nickname: '李明华',
    phone: '138****8888',
    avatar: null,
    memberLevel: '银卡会员'
  });

  // 订单状态统计
  const orderStats = [{
    icon: Clock,
    label: '待付款',
    count: 2,
    color: 'text-[#A85C4A]'
  }, {
    icon: Package,
    label: '待发货',
    count: 1,
    color: 'text-[#4A7C9B]'
  }, {
    icon: Truck,
    label: '待收货',
    count: 3,
    color: 'text-[#5D8A66]'
  }, {
    icon: CheckCircle,
    label: '已完成',
    count: 12,
    color: 'text-[#8B7355]'
  }];

  // 功能菜单
  const menuSections = [{
    title: '我的服务',
    items: [{
      icon: Heart,
      label: '我的收藏',
      pageId: 'home'
    }, {
      icon: MapPin,
      label: '收货地址',
      pageId: 'home'
    }, {
      icon: CreditCard,
      label: '支付管理',
      pageId: 'home'
    }, {
      icon: Gift,
      label: '优惠券',
      pageId: 'member'
    }]
  }, {
    title: '更多功能',
    items: [{
      icon: Bell,
      label: '消息通知',
      pageId: 'home'
    }, {
      icon: HelpCircle,
      label: '帮助中心',
      pageId: 'home'
    }, {
      icon: Settings,
      label: '设置',
      pageId: 'home'
    }]
  }];
  const handleLogout = () => {
    toast({
      title: '退出登录',
      description: '退出功能开发中'
    });
  };
  const handleMenuClick = item => {
    if (item.pageId) {
      props.$w.utils.navigateTo({
        pageId: item.pageId
      });
    } else {
      toast({
        title: '功能开发中',
        description: `${item.label}功能即将上线`
      });
    }
  };
  return <div className="min-h-screen bg-[#FAF6F0] pb-20">
      {/* 顶部用户信息 */}
      <div className="bg-gradient-to-br from-[#5C4033] to-[#8B7355] px-4 pt-12 pb-8">
        <div className="flex items-center gap-4">
          {/* 头像 */}
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
            {userInfo.avatar ? <img src={userInfo.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" /> : <User className="w-8 h-8 text-white" />}
          </div>
          
          {/* 用户信息 */}
          <div className="flex-1">
            <h2 className="text-white font-bold text-lg">{userInfo.nickname}</h2>
            <p className="text-white/80 text-sm">{userInfo.phone}</p>
          </div>
          
          {/* 设置按钮 */}
          <button onClick={() => handleMenuClick({
          label: '设置'
        })} className="text-white/80 hover:text-white transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>
        
        {/* 会员等级 */}
        <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👑</span>
            <div>
              <p className="text-white font-bold text-sm">{userInfo.memberLevel}</p>
              <p className="text-white/70 text-xs">享受专属优惠</p>
            </div>
          </div>
          <button onClick={() => props.$w.utils.navigateTo({
          pageId: 'member'
        })} className="text-white/80 text-sm flex items-center gap-1">
            查看详情
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* 订单状态 */}
      <div className="mx-4 -mt-4 bg-white rounded-xl shadow-sm p-4 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-[#5C4033] text-sm">我的订单</h3>
          <button onClick={() => props.$w.utils.navigateTo({
          pageId: 'home'
        })} className="text-[#8B7355] text-xs flex items-center gap-1">
            全部订单
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {orderStats.map((stat, idx) => <button key={idx} onClick={() => props.$w.utils.navigateTo({
          pageId: 'home'
        })} className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#FAF6F0] transition-colors">
              <div className="relative">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                {stat.count > 0 && <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#A85C4A] text-white text-xs rounded-full flex items-center justify-center">
                    {stat.count}
                  </span>}
              </div>
              <span className="text-xs text-[#5C4033]">{stat.label}</span>
            </button>)}
        </div>
      </div>
      
      {/* 功能菜单 */}
      <div className="px-4 mt-4 space-y-3">
        {menuSections.map((section, sectionIdx) => <div key={sectionIdx} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-[#F5F0E8]">
              <h3 className="font-bold text-[#5C4033] text-sm">{section.title}</h3>
            </div>
            {section.items.map((item, itemIdx) => <button key={itemIdx} onClick={() => handleMenuClick(item)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-[#FAF6F0] transition-colors">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-[#8B7355]" />
                  <span className="text-sm text-[#5C4033]">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8B7355]" />
              </button>)}
          </div>)}
      </div>
      
      {/* 退出登录 */}
      <div className="px-4 mt-6 mb-8">
        <Button onClick={handleLogout} variant="outline" className="w-full h-12 border-[#E8E0D5] text-[#A85C4A] hover:bg-[#A85C4A]/5">
          <LogOut className="w-4 h-4 mr-2" />
          退出登录
        </Button>
      </div>
      
      {/* 底部导航栏（简化版） */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E0D5] px-6 py-2">
        <div className="flex justify-around">
          <button onClick={() => props.$w.utils.navigateTo({
          pageId: 'home'
        })} className="flex flex-col items-center gap-1 text-[#8B7355]">
            <ShoppingBag className="w-5 h-5" />
            <span className="text-xs">首页</span>
          </button>
          <button onClick={() => props.$w.utils.navigateTo({
          pageId: 'category'
        })} className="flex flex-col items-center gap-1 text-[#8B7355]">
            <Package className="w-5 h-5" />
            <span className="text-xs">分类</span>
          </button>
          <button onClick={() => props.$w.utils.navigateTo({
          pageId: 'cart'
        })} className="flex flex-col items-center gap-1 text-[#8B7355]">
            <ShoppingBag className="w-5 h-5" />
            <span className="text-xs">购物车</span>
          </button>
          <button onClick={() => props.$w.utils.navigateTo({
          pageId: 'profile'
        })} className="flex flex-col items-center gap-1 text-[#5D8A66]">
            <User className="w-5 h-5" />
            <span className="text-xs">我的</span>
          </button>
        </div>
      </div>
    </div>;
}