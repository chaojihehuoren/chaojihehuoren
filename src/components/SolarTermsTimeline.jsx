// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ChevronLeft, ChevronRight, Sun, Leaf } from 'lucide-react';

// 二十四节气数据
const SOLAR_TERMS = [{
  name: '立春',
  date: '2月3-5日',
  season: '春',
  color: '#8FBC8F',
  emoji: '🌱'
}, {
  name: '雨水',
  date: '2月18-20日',
  season: '春',
  color: '#87CEEB',
  emoji: '💧'
}, {
  name: '惊蛰',
  date: '3月5-7日',
  season: '春',
  color: '#98FB98',
  emoji: '🐛'
}, {
  name: '春分',
  date: '3月20-22日',
  season: '春',
  color: '#90EE90',
  emoji: '🌸'
}, {
  name: '清明',
  date: '4月4-6日',
  season: '春',
  color: '#C8E6C9',
  emoji: '🍃'
}, {
  name: '谷雨',
  date: '4月19-21日',
  season: '春',
  color: '#A5D6A7',
  emoji: '🌧️'
}, {
  name: '立夏',
  date: '5月5-7日',
  season: '夏',
  color: '#FFB74D',
  emoji: '☀️'
}, {
  name: '小满',
  date: '5月20-22日',
  season: '夏',
  color: '#FFD54F',
  emoji: '🌾'
}, {
  name: '芒种',
  date: '6月5-7日',
  season: '夏',
  color: '#FFE082',
  emoji: '🌿'
}, {
  name: '夏至',
  date: '6月21-22日',
  season: '夏',
  color: '#E8B86D',
  emoji: '🌞'
}, {
  name: '小暑',
  date: '7月6-8日',
  season: '夏',
  color: '#FFA726',
  emoji: '🔥'
}, {
  name: '大暑',
  date: '7月22-24日',
  season: '夏',
  color: '#FF7043',
  emoji: '🌺'
}, {
  name: '立秋',
  date: '8月7-9日',
  season: '秋',
  color: '#A1887F',
  emoji: '🍂'
}, {
  name: '处暑',
  date: '8月22-24日',
  season: '秋',
  color: '#BCAAA4',
  emoji: '🍁'
}, {
  name: '白露',
  date: '9月7-9日',
  season: '秋',
  color: '#B0BEC5',
  emoji: '💧'
}, {
  name: '秋分',
  date: '9月22-24日',
  season: '秋',
  color: '#CE93D8',
  emoji: '🌕'
}, {
  name: '寒露',
  date: '10月8-9日',
  season: '秋',
  color: '#8D6E63',
  emoji: '🍁'
}, {
  name: '霜降',
  date: '10月23-24日',
  season: '秋',
  color: '#A1887F',
  emoji: '霜'
}, {
  name: '立冬',
  date: '11月7-8日',
  season: '冬',
  color: '#78909C',
  emoji: '❄️'
}, {
  name: '小雪',
  date: '11月22-23日',
  season: '冬',
  color: '#90A4AE',
  emoji: '❄️'
}, {
  name: '大雪',
  date: '12月6-8日',
  season: '冬',
  color: '#607D8B',
  emoji: '🌨️'
}, {
  name: '冬至',
  date: '12月21-23日',
  season: '冬',
  color: '#546E7A',
  emoji: '☀️'
}, {
  name: '小寒',
  date: '1月5-7日',
  season: '冬',
  color: '#455A64',
  emoji: '🌨️'
}, {
  name: '大寒',
  date: '1月20-21日',
  season: '冬',
  color: '#37474F',
  emoji: '🥶'
}];

// 根据日期获取当前节气索引
const getCurrentSolarTermIndex = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  // 简化判断逻辑
  if (month >= 2 && month <= 6) {
    if (month === 6 && day >= 21) return 9; // 夏至
    if (month === 6) return 8; // 芒种
    if (month === 5) return 7; // 小满
    if (month === 4 && day >= 19) return 5; // 谷雨
    if (month === 4) return 4; // 清明
    if (month === 3 && day >= 20) return 3; // 春分
    if (month === 3) return 2; // 惊蛰
    if (month === 2 && day >= 18) return 1; // 雨水
    return 0; // 立春
  }
  return 9; // 默认夏至
};
export function SolarTermsTimeline({
  onSelect
}) {
  const [selectedIndex, setSelectedIndex] = useState(getCurrentSolarTermIndex());
  const currentSeason = SOLAR_TERMS[selectedIndex].season;
  const seasons = ['春', '夏', '秋', '冬'];
  const seasonColors = {
    '春': {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-300'
    },
    '夏': {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-300'
    },
    '秋': {
      bg: 'bg-orange-50',
      text: 'text-orange-700',
      border: 'border-orange-300'
    },
    '冬': {
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      border: 'border-slate-300'
    }
  };
  const handlePrev = () => {
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : SOLAR_TERMS.length - 1;
    setSelectedIndex(newIndex);
    onSelect?.(SOLAR_TERMS[newIndex]);
  };
  const handleNext = () => {
    const newIndex = selectedIndex < SOLAR_TERMS.length - 1 ? selectedIndex + 1 : 0;
    setSelectedIndex(newIndex);
    onSelect?.(SOLAR_TERMS[newIndex]);
  };
  const handleSelect = index => {
    setSelectedIndex(index);
    onSelect?.(SOLAR_TERMS[index]);
  };
  return <div className="bg-gradient-to-b from-stone-50 to-stone-100 rounded-2xl p-4 shadow-sm">
      {/* 季节标签 */}
      <div className="flex gap-2 mb-4">
        {seasons.map(season => <span key={season} className={`px-3 py-1 rounded-full text-sm font-medium ${currentSeason === season ? `${seasonColors[season].bg} ${seasonColors[season].text} border` : 'bg-stone-100 text-stone-500'}`}>
            {season}季
          </span>)}
      </div>

      {/* 当前节气展示 */}
      <div className={`relative rounded-xl p-4 mb-4 border-2 ${seasonColors[currentSeason].border} ${seasonColors[currentSeason].bg}`}>
        <div className="absolute -top-3 left-4 bg-white px-2 text-xs font-medium text-stone-500">
          当前节气
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handlePrev} className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-stone-600 hover:bg-stone-50">
            <ChevronLeft size={16} />
          </button>
          <div className="flex-1 text-center">
            <div className="text-3xl mb-1">{SOLAR_TERMS[selectedIndex].emoji}</div>
            <div className="text-2xl font-serif font-bold text-stone-800">
              {SOLAR_TERMS[selectedIndex].name}
            </div>
            <div className="text-sm text-stone-500 mt-1">
              {SOLAR_TERMS[selectedIndex].date}
            </div>
          </div>
          <button onClick={handleNext} className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-stone-600 hover:bg-stone-50">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* 节气时间轴 */}
      <div className="relative">
        {/* 时间轴线 */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-stone-200" />
        
        {/* 节气列表 */}
        <div className="space-y-1 pl-8">
          {SOLAR_TERMS.map((term, index) => <button key={term.name} onClick={() => handleSelect(index)} className={`relative w-full text-left py-2 px-3 rounded-lg transition-all ${selectedIndex === index ? `${seasonColors[term.season].bg} ${seasonColors[term.season].text} font-medium` : 'hover:bg-stone-50 text-stone-600'}`}>
              {/* 时间轴点 */}
              <span className={`absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${selectedIndex === index ? 'bg-stone-800 ring-2 ring-stone-300' : 'bg-stone-300'}`} />
              <span className="text-sm">{term.emoji}</span>
              <span className="ml-2 text-sm">{term.name}</span>
              <span className="ml-auto text-xs opacity-60">{term.date}</span>
            </button>)}
        </div>
      </div>
    </div>;
}