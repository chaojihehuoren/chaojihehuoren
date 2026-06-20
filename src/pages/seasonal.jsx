// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ChevronLeft, Bell, Share2, Home } from 'lucide-react';

import { SolarTermsTimeline } from '@/components/SolarTermsTimeline';
import { SeasonalArticles } from '@/components/SeasonalArticles';
import { SeasonalDiscounts } from '@/components/SeasonalDiscounts';
import { PointsDoubleSection } from '@/components/PointsDoubleSection';
import { RecipeTools } from '@/components/RecipeTools';
export default function Seasonal() {
  const {
    toast
  } = useToast();
  const [currentSolarTerm, setCurrentSolarTerm] = useState({
    name: '夏至',
    date: '6月21-22日',
    season: '夏'
  });

  // 根据季节获取主题色
  const getSeasonTheme = season => {
    const themes = {
      '春': {
        gradient: 'from-green-500 to-emerald-500',
        bg: 'bg-green-50',
        accent: 'text-green-600'
      },
      '夏': {
        gradient: 'from-amber-500 to-orange-500',
        bg: 'bg-amber-50',
        accent: 'text-amber-600'
      },
      '秋': {
        gradient: 'from-orange-500 to-red-500',
        bg: 'bg-orange-50',
        accent: 'text-orange-600'
      },
      '冬': {
        gradient: 'from-slate-500 to-gray-500',
        bg: 'bg-slate-50',
        accent: 'text-slate-600'
      }
    };
    return themes[season] || themes['夏'];
  };
  const theme = getSeasonTheme(currentSolarTerm.season);
  const handleSolarTermChange = term => {
    setCurrentSolarTerm(term);
  };
  const handleAddToCart = product => {
    toast({
      title: '已加入购物车',
      description: `${product.name} x${product.quantity}，已享积分翻倍！`,
      duration: 2000
    });
  };
  return <div className="min-h-screen bg-stone-100 pb-20">
      {/* 顶部导航 */}
      <header className={`bg-gradient-to-r ${theme.gradient} text-white px-4 py-3 sticky top-0 z-50 shadow-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => window.history.back()} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="font-serif font-bold text-lg leading-tight">节气养生</h1>
              <p className="text-xs text-white/80">顺应时节，颐养天年</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
              <Bell size={18} />
            </button>
            <button className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* 当前节气 Banner */}
      <div className={`${theme.bg} px-4 py-6`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-stone-500 mb-1">当前节气</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif font-bold text-stone-800">
                {currentSolarTerm.name}
              </span>
              <span className="text-lg text-stone-500">{currentSolarTerm.date}</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className={`px-2 py-0.5 ${theme.accent} bg-white rounded-full text-xs`}>
                {currentSolarTerm.season}季养生
              </span>
              <span className="text-xs text-stone-500">养心清热·祛湿健脾</span>
            </div>
          </div>
          <div className="text-6xl">
            {currentSolarTerm.season === '夏' ? '☀️' : currentSolarTerm.season === '春' ? '🌸' : currentSolarTerm.season === '秋' ? '🍂' : '❄️'}
          </div>
        </div>
      </div>

      {/* 二十四节气时间轴 */}
      <div className="px-4 py-4">
        <SolarTermsTimeline onSelect={handleSolarTermChange} />
      </div>

      {/* 积分翻倍活动 */}
      <div className="px-4 py-4">
        <PointsDoubleSection />
      </div>

      {/* 限时折扣商品 */}
      <div className="px-4 py-4">
        <SeasonalDiscounts onAddToCart={handleAddToCart} />
      </div>

      {/* 节气养生文章 */}
      <div className="px-4 py-4">
        <SeasonalArticles />
      </div>

      {/* 药膳食谱工具 */}
      <div className="px-4 py-4">
        <RecipeTools />
      </div>

      {/* 底部悬浮按钮 */}
      <div className="fixed bottom-6 left-4 right-4 flex justify-between items-center pointer-events-none z-40">
        <button onClick={() => toast({
        title: '已返回首页',
        description: '即将跳转...'
      })} className="pointer-events-auto w-14 h-14 bg-emerald-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
          <Home size={24} />
        </button>
        <button onClick={() => toast({
        title: '客服热线',
        description: '400-888-8888'
      })} className="pointer-events-auto w-14 h-14 bg-amber-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-amber-600 transition-colors">
          <span className="text-xl">📞</span>
        </button>
      </div>
    </div>;
}