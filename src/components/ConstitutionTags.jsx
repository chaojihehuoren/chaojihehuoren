// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Sparkles, CheckCircle } from 'lucide-react';

// 九种体质类型及其特征
const constitutions = [{
  id: 'pinghe',
  name: '平和质',
  color: '#5D8A66',
  desc: '阴阳气血调和',
  icon: '☯️'
}, {
  id: 'qixu',
  name: '气虚质',
  color: '#C4A77D',
  desc: '元气不足易疲劳',
  icon: '💨'
}, {
  id: 'yangxu',
  name: '阳虚质',
  color: '#6B8E9F',
  desc: '阳气不足畏寒凉',
  icon: '❄️'
}, {
  id: 'yinxu',
  name: '阴虚质',
  color: '#D4A574',
  desc: '阴液亏少口干燥',
  icon: '🔥'
}, {
  id: 'tanshi',
  name: '痰湿质',
  color: '#9B8B7A',
  desc: '痰湿凝聚体型胖',
  icon: '🌫️'
}, {
  id: 'shire',
  name: '湿热质',
  color: '#A85C4A',
  desc: '湿热内蕴面油光',
  icon: '🌿'
}, {
  id: 'xueyu',
  name: '血瘀质',
  color: '#8B4D6B',
  desc: '血行不畅肤色暗',
  icon: '🩸'
}, {
  id: 'qiyu',
  name: '气郁质',
  color: '#7B6B8D',
  desc: '气机郁结神情抑',
  icon: '😔'
}, {
  id: 'tebing',
  name: '特禀质',
  color: '#6B8B7A',
  desc: '先天失常易过敏',
  icon: '⚠️'
}];
export function ConstitutionTags({
  suitedConstitutions = [],
  largeFontMode = false
}) {
  // 获取适配的体质标签
  const suitedList = constitutions.filter(c => suitedConstitutions.includes(c.id));
  const isEmpty = suitedList.length === 0;
  return <div className={`bg-white rounded-2xl p-4 shadow-sm border border-[#E8E0D5] ${largeFontMode ? 'p-5' : ''}`}>
      {/* 标题 */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-[#5D8A66]/10 rounded-lg flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-[#5D8A66]" />
        </div>
        <div>
          <h3 className={`font-serif text-[#5C4033] ${largeFontMode ? 'text-lg' : 'text-base'}`}>
            体质适配说明
          </h3>
          <p className={`text-[#8B7355] ${largeFontMode ? 'text-sm' : 'text-xs'}`}>
            根据中医体质学推荐
          </p>
        </div>
      </div>
      
      {/* 体质标签网格 */}
      <div className="grid grid-cols-3 gap-2">
        {isEmpty ?
      // 默认推荐（适合多数体质）
      <>
            {constitutions.slice(0, 6).map(c => <div key={c.id} className={`flex flex-col items-center p-2 rounded-xl bg-[#F5EFE6] border border-[#E8E0D5] ${largeFontMode ? 'p-3' : ''}`}>
                <span className={`${largeFontMode ? 'text-xl' : 'text-lg'} mb-1`}>{c.icon}</span>
                <span className={`font-medium text-[#5C4033] ${largeFontMode ? 'text-sm' : 'text-xs'}`}>
                  {c.name}
                </span>
                <span className={`text-[#8B7355] ${largeFontMode ? 'text-xs' : 'text-[10px]'} mt-0.5 text-center`}>
                  {c.desc.slice(0, 4)}
                </span>
              </div>)}
          </> :
      // 指定适配体质
      <>
            {suitedList.map(c => <div key={c.id} className={`flex flex-col items-center p-2 rounded-xl bg-[${c.color}]/10 border-2 border-[${c.color}]/30 ${largeFontMode ? 'p-3' : ''}`} style={{
          backgroundColor: `${c.color}10`,
          borderColor: `${c.color}50`
        }}>
                <CheckCircle className={`w-4 h-4 mb-1`} style={{
            color: c.color
          }} />
                <span className={`font-medium ${largeFontMode ? 'text-sm' : 'text-xs'}`} style={{
            color: c.color
          }}>
                  {c.name}
                </span>
                <span className={`text-[#8B7355] ${largeFontMode ? 'text-xs' : 'text-[10px]'} mt-0.5 text-center`}>
                  {c.desc.slice(0, 4)}
                </span>
              </div>)}
          </>}
      </div>
      
      {/* 温馨提示 */}
      <div className={`mt-4 p-3 bg-[#FAF6F0] rounded-xl ${largeFontMode ? 'p-4' : ''}`}>
        <p className={`text-[#8B7355] ${largeFontMode ? 'text-sm' : 'text-xs'} leading-relaxed`}>
          💡温馨提示：本品为药食同源养生食材，体质检测可获得更精准的食疗建议
        </p>
      </div>
    </div>;
}