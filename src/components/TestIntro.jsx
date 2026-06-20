// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { Leaf, Heart, Clock, ShieldCheck } from 'lucide-react';

export function TestIntro({
  onStart
}) {
  const features = [{
    icon: Leaf,
    title: '智能分析',
    desc: 'AI辨证论治，精准识体'
  }, {
    icon: Heart,
    title: '通俗易懂',
    desc: '白话解读，无需中医基础'
  }, {
    icon: Clock,
    title: '快捷测试',
    desc: '仅需3分钟，完成自测'
  }, {
    icon: ShieldCheck,
    title: '隐私保护',
    desc: '健康数据安全加密'
  }];
  return <div className="min-h-screen bg-gradient-to-b from-[#FAF6F0] to-[#F5EDE3] px-4 py-8">
      {/* 顶部装饰 */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-[#5D8A66]/10 flex items-center justify-center border-2 border-[#5D8A66]/20">
          <span className="text-4xl">🌿</span>
        </div>
      </div>

      {/* 标题区 */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-[#5C4033] mb-2" style={{
        fontFamily: 'Noto Serif SC, serif'
      }}>
          AI九种体质辨证
        </h1>
        <p className="text-[#8B7355] text-base">
          了解自身体质，定制专属养生方案
        </p>
      </div>

      {/* 九种体质简介 */}
      <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-[#C4A77D]/20">
        <h3 className="text-lg font-semibold text-[#5C4033] mb-4 text-center">
          📋 九种体质分类
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {[{
          name: '平和质',
          color: 'bg-green-100 text-green-700',
          desc: '健康体质'
        }, {
          name: '气虚质',
          color: 'bg-yellow-100 text-yellow-700',
          desc: '容易疲劳'
        }, {
          name: '阳虚质',
          color: 'bg-blue-100 text-blue-700',
          desc: '畏寒怕冷'
        }, {
          name: '阴虚质',
          color: 'bg-red-100 text-red-700',
          desc: '容易上火'
        }, {
          name: '痰湿质',
          color: 'bg-purple-100 text-purple-700',
          desc: '体形偏胖'
        }, {
          name: '湿热质',
          color: 'bg-orange-100 text-orange-700',
          desc: '面油长痘'
        }, {
          name: '血瘀质',
          color: 'bg-pink-100 text-pink-700',
          desc: '容易疼痛'
        }, {
          name: '气郁质',
          color: 'bg-indigo-100 text-indigo-700',
          desc: '情绪低落'
        }, {
          name: '特禀质',
          color: 'bg-gray-100 text-gray-700',
          desc: '过敏体质'
        }].map((item, idx) => <div key={idx} className={`${item.color} rounded-xl p-2 text-center`}>
              <div className="text-sm font-medium">{item.name}</div>
              <div className="text-xs opacity-75">{item.desc}</div>
            </div>)}
        </div>
      </div>

      {/* 功能特点 */}
      <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-[#C4A77D]/20">
        <h3 className="text-lg font-semibold text-[#5C4033] mb-4 text-center">
          ✨ 测试特色
        </h3>
        <div className="space-y-4">
          {features.map((item, idx) => <div key={idx} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5D8A66]/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-[#5D8A66]" />
              </div>
              <div>
                <div className="font-medium text-[#5C4033]">{item.title}</div>
                <div className="text-sm text-[#8B7355]">{item.desc}</div>
              </div>
            </div>)}
        </div>
      </div>

      {/* 注意事项 */}
      <div className="bg-amber-50 rounded-xl p-4 mb-8 border border-amber-200">
        <div className="flex items-start gap-2">
          <span className="text-xl">💡</span>
          <div className="text-sm text-amber-800">
            <p className="font-medium mb-1">温馨提示：</p>
            <p>• 请根据您近<strong>三个月</strong>的真实感受作答</p>
            <p>• 不必纠结于个别题目，凭第一直觉选择即可</p>
            <p>• 测试结果仅供参考，不作为疾病诊断依据</p>
          </div>
        </div>
      </div>

      {/* 开始测试按钮 */}
      <button onClick={onStart} className="w-full bg-[#5D8A66] text-white py-4 rounded-2xl text-xl font-bold shadow-lg hover:bg-[#4A7355] active:scale-95 transition-all">
        开始测试
      </button>

      {/* 底部装饰 */}
      <div className="flex justify-center mt-8 opacity-50">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-[#C4A77D]" />)}
        </div>
      </div>
    </div>;
}
export default TestIntro;