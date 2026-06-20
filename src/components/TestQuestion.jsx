// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function TestQuestion({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelect,
  onPrev,
  onNext,
  onSubmit
}) {
  const [animationKey, setAnimationKey] = useState(0);
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [currentIndex]);
  const isLast = currentIndex === totalQuestions - 1;
  const hasSelected = selectedAnswer !== null;
  return <div className="min-h-screen bg-[#FAF6F0] flex flex-col">
      {/* 题目内容 */}
      <div className="flex-1 px-4 py-6">
        <div key={animationKey} className="animate-fade-in">
          {/* 题目标题 */}
          <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm border border-[#C4A77D]/20">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#5D8A66]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-[#5D8A66]">
                  {currentIndex + 1}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-lg font-medium text-[#5C4033] leading-relaxed">
                  {question.text}
                </p>
              </div>
            </div>
          </div>

          {/* 选项列表 */}
          <div className="space-y-3">
            {question.options.map((option, idx) => <button key={idx} onClick={() => onSelect(option.value)} className={`w-full p-4 rounded-xl text-left transition-all ${selectedAnswer === option.value ? 'bg-[#5D8A66] text-white shadow-md scale-[1.02]' : 'bg-white text-[#5C4033] border border-[#E8E0D5] hover:border-[#5D8A66]/50 hover:bg-[#5D8A66]/5'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAnswer === option.value ? 'border-white bg-white' : 'border-[#C4A77D]'}`}>
                    {selectedAnswer === option.value && <div className="w-3 h-3 rounded-full bg-[#5D8A66]" />}
                  </div>
                  <span className="text-base font-medium">{option.label}</span>
                </div>
              </button>)}
          </div>

          {/* 选项说明（如果存在） */}
          {question.tip && <div className="mt-4 bg-blue-50 rounded-xl p-3 border border-blue-200">
              <p className="text-sm text-blue-700">
                💡 {question.tip}
              </p>
            </div>}
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="bg-white px-4 py-4 border-t border-[#C4A77D]/20 safe-area-bottom">
        <div className="flex gap-3">
          {currentIndex > 0 && <button onClick={onPrev} className="flex-1 py-4 rounded-xl border-2 border-[#C4A77D] text-[#5C4033] font-bold text-lg flex items-center justify-center gap-2">
              <ChevronLeft className="w-5 h-5" />
              上一题
            </button>}
          <button onClick={isLast ? onSubmit : onNext} disabled={!hasSelected} className={`flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${hasSelected ? 'bg-[#5D8A66] text-white shadow-lg hover:bg-[#4A7355]' : 'bg-[#E8E0D5] text-[#8B7355] cursor-not-allowed'}`}>
            {isLast ? '查看结果' : '下一题'}
            {!isLast && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>;
}
export default TestQuestion;