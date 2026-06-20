// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Leaf, Heart, Shield, Clock } from 'lucide-react';

export function ProductEffects({
  effects = [],
  origin = '',
  rawMaterial = '',
  largeFontMode = false
}) {
  // 默认功效数据
  const defaultEffects = [{
    icon: Leaf,
    title: '补气养血',
    desc: '温和调理气血不足'
  }, {
    icon: Heart,
    title: '增强免疫',
    desc: '提升身体抵抗力'
  }, {
    icon: Shield,
    title: '延缓衰老',
    desc: '滋补养生驻容颜'
  }, {
    icon: Clock,
    title: '长期调养',
    desc: '适合日常养生'
  }];
  const displayEffects = effects.length > 0 ? effects : defaultEffects;
  return <div className={`bg-white rounded-2xl p-4 shadow-sm border border-[#E8E0D5] ${largeFontMode ? 'p-5' : ''}`}>
      {/* 标题 */}
      <h3 className={`font-serif text-[#5C4033] mb-4 ${largeFontMode ? 'text-lg' : 'text-base'}`}>
        食材功效
      </h3>
      
      {/* 功效列表 */}
      <div className="grid grid-cols-2 gap-3">
        {displayEffects.map((effect, index) => {
        const Icon = effect.icon;
        return <div key={index} className={`flex items-start gap-3 p-3 bg-[#F5EFE6] rounded-xl ${largeFontMode ? 'p-4' : ''}`}>
            <div className="w-10 h-10 bg-[#5D8A66]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-[#5D8A66]" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`font-medium text-[#5C4033] ${largeFontMode ? 'text-sm' : 'text-xs'}`}>
                {effect.title}
              </h4>
              <p className={`text-[#8B7355] ${largeFontMode ? 'text-xs' : 'text-[10px]'} mt-0.5`}>
                {effect.desc}
              </p>
            </div>
          </div>;
      })}
      </div>
      
      {/* 产地信息 */}
      <div className={`mt-4 pt-4 border-t border-[#E8E0D5] ${largeFontMode ? 'mt-5 pt-5' : ''}`}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-[#C4A77D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-lg">📍</span>
          </div>
          <div className="flex-1">
            <h4 className={`font-medium text-[#5C4033] ${largeFontMode ? 'text-sm' : 'text-xs'}`}>
              产地来源
            </h4>
            <p className={`text-[#8B7355] ${largeFontMode ? 'text-sm' : 'text-xs'} mt-1`}>
              {origin || '甘肃岷县 · 道地药材核心产区'}
            </p>
          </div>
        </div>
      </div>
      
      {/* 原材料说明 */}
      <div className={`mt-4 pt-4 border-t border-[#E8E0D5] ${largeFontMode ? 'mt-5 pt-5' : ''}`}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-[#A85C4A]/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-lg">🌾</span>
          </div>
          <div className="flex-1">
            <h4 className={`font-medium text-[#5C4033] ${largeFontMode ? 'text-sm' : 'text-xs'}`}>
              原材料规格
            </h4>
            <p className={`text-[#8B7355] ${largeFontMode ? 'text-sm' : 'text-xs'} mt-1`}>
              {rawMaterial || '野生六年根 · 人工精选 · 无硫熏制'}
            </p>
          </div>
        </div>
      </div>
    </div>;
}