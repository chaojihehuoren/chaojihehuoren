// @ts-ignore;
import React, { useState } from 'react';

import { TabBar } from '@/components/TabBar.jsx';
import { CategoryNav } from '@/components/CategoryNav.jsx';
import { HotProducts } from '@/components/HotProducts.jsx';
import { AIFeatureCard } from '@/components/AIFeatureCard.jsx';
import { MemberCard } from '@/components/MemberCard.jsx';
import { DistributorEntry } from '@/components/DistributorEntry.jsx';
import { FloatingButtons } from '@/components/FloatingButtons.jsx';
import { Banner } from '@/components/Banner.jsx';
export default function HomePage(props) {
  const [userType, setUserType] = useState('C'); // C端/B端用户标识

  // 获取当前用户信息
  const currentUser = props.$w?.auth?.currentUser;
  const isLoggedIn = !!currentUser;

  // 模拟用户数据
  const memberInfo = {
    name: currentUser?.nickName || currentUser?.name || '访客',
    points: 2880,
    level: '银卡会员',
    avatar: currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  };
  const categories = [{
    id: 1,
    name: '体质调理',
    icon: 'YinYang',
    desc: '个性化养生方案'
  }, {
    id: 2,
    name: '节气养生',
    icon: 'Calendar',
    desc: '顺应四时调养'
  }, {
    id: 3,
    name: '药膳食材',
    icon: 'Leaf',
    desc: '道地药材食材'
  }, {
    id: 4,
    name: '慢病养护',
    icon: 'Heart',
    desc: '专业健康指导'
  }];
  const hotProducts = [{
    id: 1,
    name: '野生黄芪片',
    subtitle: '甘肃岷县·道地药材',
    price: 128,
    originalPrice: 168,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=300&fit=crop',
    sales: 2580
  }, {
    id: 2,
    name: '枸杞原浆',
    subtitle: '宁夏中宁·有机认证',
    price: 89,
    originalPrice: 108,
    image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=300&h=300&fit=crop',
    sales: 3260
  }, {
    id: 3,
    name: '西洋参切片',
    subtitle: '长白山·六年根',
    price: 268,
    originalPrice: 328,
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=300&h=300&fit=crop',
    sales: 1890
  }, {
    id: 4,
    name: '红豆薏米茶',
    subtitle: '祛湿排毒·药食同源',
    price: 58,
    originalPrice: 78,
    image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7c1f?w=300&h=300&fit=crop',
    sales: 4520
  }];
  const handleCategoryClick = category => {
    props.$w.utils.navigateTo({
      pageId: 'category',
      params: {
        id: category.id,
        name: category.name
      }
    });
  };
  const handleProductClick = product => {
    props.$w.utils.navigateTo({
      pageId: 'product',
      params: {
        id: product.id
      }
    });
  };

  // 不再需要本地的hotProducts数据，HotProducts组件会从数据模型获取
  const handleAIDetect = () => {
    props.$w.utils.navigateTo({
      pageId: 'ai-detect',
      params: {}
    });
  };
  const handleMemberClick = () => {
    props.$w.utils.navigateTo({
      pageId: 'member',
      params: {}
    });
  };
  const handleDistributorClick = () => {
    props.$w.utils.navigateTo({
      pageId: 'distributor',
      params: {
        type: userType
      }
    });
  };
  const toggleUserType = () => {
    setUserType(prev => prev === 'C' ? 'B' : 'C');
  };
  return <div className="min-h-screen bg-[#FAF6F0] pb-20">
      {/* 顶部品牌 Banner */}
      <Banner />

      {/* 会员积分入口 - 右上角悬浮 */}
      <div className="fixed top-20 right-4 z-20">
        <MemberCard memberInfo={memberInfo} onClick={handleMemberClick} isLoggedIn={isLoggedIn} />
      </div>

      {/* 商品分类导航 */}
      <section className="px-4 pt-6">
        <div className="mb-6">
          <h2 className="text-xl font-serif text-[#5C4033] mb-1">养生分类</h2>
          <p className="text-sm text-[#8B7355]">选择适合您的养生方案</p>
        </div>
        <CategoryNav categories={categories} onCategoryClick={handleCategoryClick} />
      </section>

      {/* AI体质检测入口 */}
      <section className="px-4 mt-8">
        <AIFeatureCard onClick={handleAIDetect} />
      </section>

      {/* 热销商品展示区 */}
      <section className="px-4 mt-8">
        <HotProducts onProductClick={handleProductClick} $w={props.$w} />
      </section>

      {/* 经销商采购入口 */}
      <section className="px-4 mt-8">
        <DistributorEntry userType={userType} onToggle={toggleUserType} onClick={handleDistributorClick} />
      </section>

      {/* 底部固定悬浮按钮 */}
      <FloatingButtons />

      {/* 底部导航栏 */}
      <TabBar activeTab="home" />
    </div>;
}