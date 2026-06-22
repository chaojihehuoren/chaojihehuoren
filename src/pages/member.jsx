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
// 真实会员数据将从 shop_member 和 shop_member_points 模型获取
export default function MemberCenter(props) {
  const {
    toast
  } = useToast();
  const [showBenefits, setShowBenefits] = useState(false);
  const [userType, setUserType] = useState('银卡');
  const [memberData, setMemberData] = useState(null);
  const [pointsData, setPointsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 页面加载时检查登录状态并获取会员数据
  useEffect(() => {
    // 使用 props.$w.auth.currentUser 获取真实用户信息
    if (!props.$w?.auth?.currentUser?.userId) {
      toast({
        title: '请先登录',
        description: '即将跳转到登录页'
      });
      setLoading(false);
      return;
    }

    // 获取会员数据和积分数据
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. 获取会员基础信息
        const memberResult = await props.$w.cloud.callFunction({
          name: 'datasource',
          data: {
            collection: 'shop_member',
            action: 'get',
            query: {
              _openid: props.$w.auth.currentUser.userId
            }
          }
        });
        if (memberResult.code === 0 && memberResult.data) {
          setMemberData(memberResult.data);
          setUserType(memberResult.data.member_level || '银卡');
        } else {
          // 如果没有会员数据，使用默认值
          setMemberData({
            member_level: '银卡',
            nickname: props.$w.auth.currentUser.nickName || '用户',
            phone: props.$w.auth.currentUser.name || '',
            avatar: props.$w.auth.currentUser.avatarUrl || null,
            total_points: 0,
            wallet_balance: 0
          });
        }

        // 2. 获取积分账户信息
        const pointsResult = await props.$w.cloud.callFunction({
          name: 'datasource',
          data: {
            collection: 'shop_member_points',
            action: 'get',
            query: {
              member_id: props.$w.auth.currentUser.userId
            }
          }
        });
        if (pointsResult.code === 0 && pointsResult.data) {
          setPointsData(pointsResult.data);
        } else {
          // 如果没有积分数据，使用默认值
          setPointsData({
            balance: 0,
            total_earned: 0,
            total_used: 0,
            frozen_points: 0
          });
        }
      } catch (error) {
        console.error('获取会员数据失败:', error);
        toast({
          title: '数据加载失败',
          description: error.message || '请稍后重试'
        });

        // 使用默认数据
        setMemberData({
          member_level: '银卡',
          nickname: props.$w.auth.currentUser.nickName || '用户',
          phone: props.$w.auth.currentUser.name || '',
          avatar: props.$w.auth.currentUser.avatarUrl || null,
          total_points: 0,
          wallet_balance: 0
        });
        setPointsData({
          balance: 0,
          total_earned: 0,
          total_used: 0,
          frozen_points: 0
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
        {loading ? <div className="bg-white/10 rounded-xl p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <p className="text-white/80 text-sm">加载中...</p>
          </div> : <MemberHeader memberInfo={memberData} />}
      </div>

      {/* 主要内容区 */}
      <div className="px-4 -mt-4 space-y-4">
        {/* 积分和储值卡片 */}
        <div className="grid grid-cols-2 gap-3">
          <PointsCard pointsInfo={{
          balance: pointsData?.balance || 0,
          expiryDate: pointsData?.expiry_date ? new Date(pointsData.expiry_date).toISOString() : null
        }} />
          <StorageCard storageInfo={{
          balance: memberData?.wallet_balance || 0
        }} />
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