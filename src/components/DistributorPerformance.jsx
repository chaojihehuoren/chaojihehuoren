// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { TrendingUp, Users, Package, DollarSign, Award, Target, ArrowUp, ArrowDown } from 'lucide-react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
const MONTHLY_TREND = [{
  month: '10月',
  amount: 98600,
  orders: 42
}, {
  month: '11月',
  amount: 115200,
  orders: 51
}, {
  month: '12月',
  amount: 142350,
  orders: 68
}, {
  month: '01月',
  amount: 128580,
  orders: 58
}, {
  month: '02月',
  amount: 98600,
  orders: 45
}, {
  month: '03月',
  amount: 128580,
  orders: 62
}];
const RANKING_DATA = [{
  rank: 1,
  name: '济南本草堂大药房',
  amount: 128580,
  level: '金牌'
}, {
  rank: 2,
  name: '青岛康源堂医药',
  amount: 115800,
  level: '金牌'
}, {
  rank: 3,
  name: '烟台养生堂连锁',
  amount: 98600,
  level: '银牌'
}, {
  rank: 4,
  name: '潍坊瑞和大药房',
  amount: 84200,
  level: '银牌'
}, {
  rank: 5,
  name: '淄博济民堂医药',
  amount: 75600,
  level: '银牌'
}];
export function DistributorPerformance() {
  const [chartType, setChartType] = useState('trend');
  const currentMonth = MONTHLY_TREND[MONTHLY_TREND.length - 1];
  const lastMonth = MONTHLY_TREND[MONTHLY_TREND.length - 2];
  const monthGrowth = ((currentMonth.amount - lastMonth.amount) / lastMonth.amount * 100).toFixed(1);
  const stats = [{
    label: '本月采购额',
    value: '¥128,580',
    change: '+30.7%',
    trend: 'up',
    icon: DollarSign,
    color: '#5D8A66'
  }, {
    label: '本月订单数',
    value: '62笔',
    change: '+37.8%',
    trend: 'up',
    icon: Package,
    color: '#4A7C9B'
  }, {
    label: '客户覆盖数',
    value: '1,286户',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: '#D4A574'
  }, {
    label: '返利收益',
    value: '¥3,857',
    change: '-8.3%',
    trend: 'down',
    icon: Award,
    color: '#A85C4A'
  }];
  return <div className="p-4">
      <h2 className="text-lg font-bold text-[#5C4033] mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-[#5D8A66] rounded-full"></span>
        分销业绩看板
      </h2>

      {/* 核心指标卡片 */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return <div key={idx} className="bg-white rounded-xl border border-[#E8E0D5] p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center`} style={{
              backgroundColor: `${stat.color}15`
            }}>
                <Icon className="w-5 h-5" style={{
                color: stat.color
              }} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-[#5D8A66]' : 'text-[#A85C4A]'}`}>
                {stat.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-xs text-[#8B7355] mb-1">{stat.label}</p>
            <p className="font-bold text-[#5C4033] text-lg">{stat.value}</p>
          </div>;
      })}
      </div>

      {/* 目标进度 */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-[#5C4033] flex items-center gap-2">
            <Target className="w-4 h-4 text-[#5D8A66]" />
            本月目标进度
          </h3>
          <span className="text-xs text-[#8B7355]">Q1季度</span>
        </div>
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-[#8B7355]">采购目标</span>
            <span className="font-bold text-[#5C4033]">¥100,000 / ¥150,000</span>
          </div>
          <div className="h-3 bg-[#FAF6F0] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#5D8A66] to-[#7AAA86] rounded-full transition-all" style={{
            width: '67%'
          }} />
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-[#5D8A66] font-bold">67%</span>
            <span className="text-[#8B7355]">剩余28天</span>
          </div>
        </div>
      </div>

      {/* 图表切换 */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[#5C4033] flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#5D8A66]" />
            业绩趋势
          </h3>
          <div className="flex gap-2">
            <button onClick={() => setChartType('trend')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${chartType === 'trend' ? 'bg-[#5D8A66] text-white' : 'bg-[#FAF6F0] text-[#8B7355]'}`}>
              趋势图
            </button>
            <button onClick={() => setChartType('compare')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${chartType === 'compare' ? 'bg-[#5D8A66] text-white' : 'bg-[#FAF6F0] text-[#8B7355]'}`}>
              对比图
            </button>
          </div>
        </div>
        <div className="h-48">
          {chartType === 'trend' ? <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D5" />
                <XAxis dataKey="month" tick={{
              fontSize: 10,
              fill: '#8B7355'
            }} />
                <YAxis tick={{
              fontSize: 10,
              fill: '#8B7355'
            }} />
                <Tooltip contentStyle={{
              backgroundColor: '#FAF6F0',
              border: '1px solid #E8E0D5',
              borderRadius: '8px'
            }} />
                <Line type="monotone" dataKey="amount" stroke="#5D8A66" strokeWidth={2} dot={{
              fill: '#5D8A66',
              strokeWidth: 0,
              r: 4
            }} activeDot={{
              r: 6,
              fill: '#5D8A66'
            }} />
              </LineChart>
            </ResponsiveContainer> : <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D5" />
                <XAxis dataKey="month" tick={{
              fontSize: 10,
              fill: '#8B7355'
            }} />
                <YAxis tick={{
              fontSize: 10,
              fill: '#8B7355'
            }} />
                <Tooltip contentStyle={{
              backgroundColor: '#FAF6F0',
              border: '1px solid #E8E0D5',
              borderRadius: '8px'
            }} />
                <Bar dataKey="amount" fill="#5D8A66" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>}
        </div>
      </div>

      {/* 区域排名 */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] p-4">
        <h3 className="font-bold text-[#5C4033] mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-[#D4A574]" />
          区域业绩排名
        </h3>
        <div className="space-y-2">
          {RANKING_DATA.map((item, idx) => <div key={idx} className={`flex items-center gap-3 p-2 rounded-lg ${idx === 0 ? 'bg-[#D4A574]/10' : ''}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? 'bg-[#D4A574] text-white' : idx === 1 ? 'bg-[#8B7355] text-white' : idx === 2 ? 'bg-[#B87C6D] text-white' : 'bg-[#FAF6F0] text-[#8B7355]'}`}>
                {item.rank}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#5C4033] text-sm truncate">{item.name}</p>
                <p className="text-xs text-[#8B7355]">{item.level}经销商</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#5D8A66] text-sm">
                  ¥{item.amount.toLocaleString()}
                </p>
                <p className="text-xs text-[#8B7355]">本月</p>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
}