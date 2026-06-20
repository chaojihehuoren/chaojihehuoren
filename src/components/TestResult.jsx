// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Heart, Leaf, Utensils, Calendar, Save, ArrowRight } from 'lucide-react';

import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
const CONSTITUTION_DATA = {
  平和质: {
    color: '#22C55E',
    bg: 'bg-green-100',
    text: 'text-green-700',
    icon: '☯️',
    desc: '恭喜！您的体质较为平衡，是理想健康状态。'
  },
  气虚质: {
    color: '#EAB308',
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    icon: '💨',
    desc: '您容易疲劳、气短乏力，建议补气养脾。'
  },
  阳虚质: {
    color: '#3B82F6',
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    icon: '❄️',
    desc: '您畏寒怕冷、手脚冰凉，建议温补肾阳。'
  },
  阴虚质: {
    color: '#EF4444',
    bg: 'bg-red-100',
    text: 'text-red-700',
    icon: '🔥',
    desc: '您容易上火、口干舌燥，建议滋阴润燥。'
  },
  痰湿质: {
    color: '#8B5CF6',
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    icon: '💧',
    desc: '您体形偏胖、容易困倦，建议化痰祛湿。'
  },
  湿热质: {
    color: '#F97316',
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    icon: '🌡️',
    desc: '您面油长痘、口苦尿黄，建议清热利湿。'
  },
  血瘀质: {
    color: '#EC4899',
    bg: 'bg-pink-100',
    text: 'text-pink-700',
    icon: '🩸',
    desc: '您容易疼痛、面色晦暗，建议活血化瘀。'
  },
  气郁质: {
    color: '#6366F1',
    bg: 'bg-indigo-100',
    text: 'text-indigo-700',
    icon: '😔',
    desc: '您情绪低落、胸胁胀闷，建议疏肝解郁。'
  },
  特禀质: {
    color: '#78716C',
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    icon: '🤧',
    desc: '您容易过敏，需注意避免过敏原。'
  }
};
export function TestResult({
  result,
  onSaveArchive,
  onGetPlan
}) {
  const {
    mainType,
    scores,
    recommendations
  } = result;
  const mainInfo = CONSTITUTION_DATA[mainType] || CONSTITUTION_DATA['平和质'];

  // 转换为雷达图数据
  const radarData = Object.entries(scores).map(([name, value]) => ({
    category: name,
    value: Math.round(value),
    fullMark: 100
  }));
  return <div className="min-h-screen bg-[#FAF6F0]">
      {/* 头部结果展示 */}
      <div className="bg-gradient-to-br from-[#5D8A66] to-[#7AAF86] px-4 py-8 text-white result-header-animate">
        <div className="text-center">
          <div className="text-6xl mb-3 animate-bounce-in">{mainInfo.icon}</div>
          <h1 className="text-2xl font-bold mb-2" style={{
          fontFamily: 'Noto Serif SC, serif'
        }}>
            您的体质结果
          </h1>
          <div className={`inline-block px-6 py-2 rounded-full bg-white/20 backdrop-blur`}>
            <span className="text-2xl font-bold">{mainType}</span>
          </div>
          <p className="mt-4 text-white/90 text-base px-4">
            {mainInfo.desc}
          </p>
        </div>
      </div>

      {/* 雷达图分析 */}
      <div className="px-4 -mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#C4A77D]/20">
          <h3 className="text-lg font-semibold text-[#5C4033] mb-4 text-center flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-[#5D8A66]" />
            体质雷达图分析
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E8E0D5" />
                <PolarAngleAxis dataKey="category" tick={{
                fontSize: 11,
                fill: '#5C4033'
              }} />
                <Radar name="体质得分" dataKey="value" stroke={mainInfo.color} fill={mainInfo.color} fillOpacity={0.3} strokeWidth={2} />
                <Tooltip contentStyle={{
                backgroundColor: '#FAF6F0',
                border: '1px solid #C4A77D',
                borderRadius: '8px'
              }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 体质解读 */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#C4A77D]/20">
          <h3 className="text-lg font-semibold text-[#5C4033] mb-4 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-[#5D8A66]" />
            体质解读
          </h3>
          <div className="space-y-3">
            {Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([type, score], idx) => {
            const info = CONSTITUTION_DATA[type];
            return <div key={type} className={`flex items-center gap-3 p-3 rounded-xl ${idx === 0 ? 'bg-[#5D8A66]/10 border border-[#5D8A66]/30' : 'bg-gray-50'}`}>
                    <span className="text-2xl">{info.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-[#5C4033]">{type}</div>
                      <div className={`text-sm ${info.text}`}>{info.desc}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold" style={{
                  color: info.color
                }}>
                        {Math.round(score)}分
                      </div>
                      <div className="text-xs text-[#8B7355]">
                        {score >= 40 ? '主要特征' : score >= 20 ? '倾向' : '不明显'}
                      </div>
                    </div>
                  </div>;
          })}
          </div>
        </div>
      </div>

      {/* 养生建议 */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#C4A77D]/20">
          <h3 className="text-lg font-semibold text-[#5C4033] mb-4 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-[#5D8A66]" />
            养生建议
          </h3>
          <div className="space-y-3">
            {recommendations.map((rec, idx) => <div key={idx} className="flex items-start gap-3 p-3 bg-[#FAF6F0] rounded-xl">
                <div className="w-6 h-6 rounded-full bg-[#5D8A66] text-white text-sm flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </div>
                <p className="text-[#5C4033] text-sm leading-relaxed">{rec}</p>
              </div>)}
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="px-4 py-6 space-y-3">
        <button onClick={onGetPlan} className="w-full bg-[#5D8A66] text-white py-4 rounded-2xl text-lg font-bold shadow-lg flex items-center justify-center gap-2">
          <Calendar className="w-5 h-5" />
          获取30天定制食疗方案
          <ArrowRight className="w-5 h-5" />
        </button>
        <button onClick={onSaveArchive} className="w-full bg-white text-[#5D8A66] py-4 rounded-2xl text-lg font-bold border-2 border-[#5D8A66] flex items-center justify-center gap-2">
          <Save className="w-5 h-5" />
          保存至健康档案
        </button>
      </div>

      {/* 底部装饰 */}
      <div className="px-4 pb-8 text-center text-sm text-[#8B7355]">
        <p>测试结果仅供参考</p>
        <p>如有不适请咨询专业医师</p>
      </div>

      <style>{`
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-bounce-in {
          animation: bounceIn 0.6s ease-out;
        }
        .result-header-animate {
          animation: slideDown 0.5s ease-out;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>;
}
export default TestResult;