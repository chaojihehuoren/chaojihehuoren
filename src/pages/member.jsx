// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

import { MemberHeader } from '@/components/MemberHeader.jsx';
import { MemberBenefitsPreview } from '@/components/MemberHeader.jsx';
import { PointsCard } from '@/components/PointsCard.jsx';
import { StorageCard } from '@/components/PointsCard.jsx';
import { OrderSection } from '@/components/OrderSection.jsx';
import { CouponSection } from '@/components/OrderSection.jsx';
import { MemberTools } from '@/components/MemberTools.jsx';
import { DistributorAccess } from '@/components/DistributorAccess.jsx';
import { CustomerService } from '@/components/CustomerService.jsx';
import { MemberBenefits } from '@/components/MemberBenefits.jsx';
import { TabBar } from '@/components/TabBar.jsx';
// 模拟会员数据
const mockMemberData = {
  level: '银卡',
  nickname: '李明华',
  phone: '138****8888',
  avatar: null,
  points: {
    balance: 2880,
    expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString() // 15天后到期
  },
  storage: {
    balance: 500
  }
};
export default function MemberCenter(props) {
  const {
    toast
  } = useToast();
  const [showBenefits, setShowBenefits] = useState(false);
  const [userType, setUserType] = useState('银卡');

  // 页面加载时检查登录状态
  useEffect(() => {
    // 使用 props.$w.auth.currentUser 获取真实用户信息
    if (!props.$w?.auth?.currentUser?.userId) {
      toast({
        title: '请先登录',
        description: '即将跳转到登录页'
      });
      // 可以在这里跳转登录页
    }
  }, []);
  const handleNavigate = page => {
    toast({
      title: '功能提示',
      description: `正在跳转：${page}`
    });
    // 实际项目中调用 props.$w.utils.navigateTo({ pageId: page, params: {} })
  };
  const handleShowBenefits = () => {
    setShowBenefits(!showBenefits);
  };
  return <div className="min-h-screen bg-gradient-to-b from-amber-50 to-herb-cream pb-24">
      {/* 顶部背景 */}
      <div className="bg-gradient-to-br from-herb-brown to-herb-brown/80 pt-12 pb-8 px-4">
        {/* 顶部导航 */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => props.$w?.utils?.navigateBack?.()} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">会员中心</h1>
          <button onClick={() => handleNavigate('settings')} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* 会员头部卡片 */}
        <MemberHeader memberInfo={mockMemberData} />
      </div>

      {/* 主要内容区 */}
      <div className="px-4 -mt-4 space-y-4">
        {/* 积分和储值卡片 */}
        <div className="grid grid-cols-2 gap-3">
          <PointsCard pointsInfo={mockMemberData.points} />
          <StorageCard storageInfo={mockMemberData.storage} />
        </div>

        {/* 会员权益预览 */}
        <button onClick={handleShowBenefits} className="w-full bg-white rounded-xl p-4 shadow-sm border border-herb-brown/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
              <ChevronRight className={`w-5 h-5 text-white transition-transform ${showBenefits ? 'rotate-90' : ''}`} />
            </div>
            <div className="text-left">
              <p className="font-semibold text-herb-dark">会员权益说明</p>
              <p className="text-xs text-herb-brown">了解各等级会员专属福利</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-herb-brown/40" />
        </button>

        {/* 会员权益详情展开 */}
        {showBenefits && <MemberBenefits />}

        {/* 优惠券入口 */}
        <CouponSection onNavigate={handleNavigate} />

        {/* 订单区域 */}
        <OrderSection onNavigate={handleNavigate} />

        {/* 经销商采购入口 */}
        <DistributorAccess userType={userType} onNavigate={handleNavigate} />

        {/* 健康服务与推广分销工具 */}
        <MemberTools onNavigate={handleNavigate} />

        {/* 客服入口 */}
        <CustomerService />
      </div>

      {/* 底部导航 */}
      <TabBar activeTab="member" />
    </div>;
}