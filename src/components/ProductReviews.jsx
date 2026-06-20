// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Star, ThumbsUp, ChevronDown } from 'lucide-react';

export function ProductReviews({
  reviews = [],
  rating = 4.8,
  totalCount = 128
}) {
  const [showAll, setShowAll] = useState(false);

  // 模拟评价数据
  const defaultReviews = [{
    id: 1,
    userName: '王阿姨',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=60&h=60&fit=crop',
    rating: 5,
    content: '收到货了，品质很好，黄芪片完整饱满，泡水味道浓郁。已经回购第三次了，养生效果看得见！',
    date: '2024-03-15',
    constitution: '气虚质',
    likes: 32
  }, {
    id: 2,
    userName: '李叔叔',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop',
    rating: 5,
    content: '给妈妈买的，她气血不足吃这个很好。包装精美，送礼也很体面。客服态度很好，有问必答。',
    date: '2024-03-12',
    constitution: '阳虚质',
    likes: 18
  }, {
    id: 3,
    userName: '张奶奶',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop',
    rating: 4,
    content: '东西不错，就是希望包装能再大一点，字能再大一些，方便我们老年人看。',
    date: '2024-03-10',
    constitution: '平和质',
    likes: 8
  }];
  const displayReviews = reviews.length > 0 ? reviews : defaultReviews;
  const shownReviews = showAll ? displayReviews : displayReviews.slice(0, 2);

  // 渲染星星
  const renderStars = rating => {
    return [...Array(5)].map((_, index) => <Star key={index} className={`w-4 h-4 ${index < rating ? 'fill-[#C4A77D] text-[#C4A77D]' : 'text-[#E8E0D5]'}`} />);
  };
  return <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E0D5]">
      {/* 评价头部 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="font-serif text-[#5C4033] text-base">用户评价</h3>
          <span className="text-[#8B7355] text-sm">（{totalCount}条）</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {renderStars(Math.floor(rating))}
          </div>
          <span className="text-[#C4A77D] font-medium">{rating}</span>
        </div>
      </div>
      
      {/* 评价列表 */}
      <div className="space-y-4">
        {shownReviews.map(review => <div key={review.id} className="pb-4 border-b border-[#E8E0D5] last:border-0">
            {/* 用户信息 */}
            <div className="flex items-center gap-3 mb-3">
              <img src={review.avatar} alt={review.userName} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#5C4033]">{review.userName}</span>
                  {review.constitution && <span className="px-2 py-0.5 bg-[#5D8A66]/10 text-[#5D8A66] text-xs rounded-full">
                      {review.constitution}
                    </span>}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-[#8B7355] text-xs">{review.date}</span>
                </div>
              </div>
            </div>
            
            {/* 评价内容 */}
            <p className="text-[#5C4033] text-sm leading-relaxed pl-13">
              {review.content}
            </p>
            
            {/* 点赞 */}
            <div className="flex items-center gap-4 mt-3 pl-13">
              <button className="flex items-center gap-1 text-[#8B7355] hover:text-[#5D8A66] transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-xs">{review.likes}</span>
              </button>
            </div>
          </div>)}
      </div>
      
      {/* 查看更多 */}
      {displayReviews.length > 2 && <button onClick={() => setShowAll(!showAll)} className="w-full mt-4 py-3 text-[#5D8A66] text-sm font-medium flex items-center justify-center gap-1 hover:bg-[#5D8A66]/5 rounded-xl transition-colors">
          <span>{showAll ? '收起评价' : '查看全部评价'}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
        </button>}
    </div>;
}