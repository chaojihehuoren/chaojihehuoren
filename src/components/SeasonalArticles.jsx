// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Calendar, Clock, ArrowRight, Heart } from 'lucide-react';

// 夏至养生文章数据
const ARTICLES = [{
  id: 1,
  title: '夏至养生：清热祛湿的六大黄金食材',
  excerpt: '夏至时节气温升高，湿热交织。本篇为您详解六大清热祛湿食材，助您安然度夏...',
  date: '2026-06-21',
  readTime: '5分钟',
  tags: ['清热', '祛湿', '食疗'],
  isHot: true,
  image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop'
}, {
  id: 2,
  title: '夏至阳气最旺，养生重在养心',
  excerpt: '《黄帝内经》记载"春夏养阳"，夏至是阳气最旺盛的时节，如何顺应时节养护心脏？',
  date: '2026-06-20',
  readTime: '4分钟',
  tags: ['养心', '阳气', '中医'],
  isHot: false,
  image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=250&fit=crop'
}, {
  id: 3,
  title: '夏至药膳食谱：荷叶茯苓粥的做法',
  excerpt: '荷叶清香、茯苓健脾，这款粥品清热解暑、宁心安神，是夏至养生的绝佳选择。',
  date: '2026-06-19',
  readTime: '3分钟',
  tags: ['药膳', '食谱', '茯苓'],
  isHot: false,
  image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop'
}, {
  id: 4,
  title: '夏至艾灸：把握黄金艾灸时机',
  excerpt: '夏至是一年之中艾灸效果最佳的时期，教您如何选择穴位、掌握艾灸技巧。',
  date: '2026-06-18',
  readTime: '6分钟',
  tags: ['艾灸', '穴位', '养生'],
  isHot: false,
  image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=250&fit=crop'
}];
export function SeasonalArticles() {
  return <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-serif font-bold text-stone-800 flex items-center gap-2">
          <span className="text-2xl">📖</span>
          夏至养生指南
        </h3>
        <button className="text-sm text-stone-500 flex items-center gap-1 hover:text-stone-700">
          查看更多 <ArrowRight size={14} />
        </button>
      </div>

      {/* 热门文章卡片 */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm">
        <img src={ARTICLES[0].image} alt={ARTICLES[0].title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent" />
        {ARTICLES[0].isHot && <span className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs rounded-full flex items-center gap-1">
            <span className="animate-pulse">🔥</span> 热门
          </span>}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex gap-2 mb-2">
            {ARTICLES[0].tags.map(tag => <span key={tag} className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                {tag}
              </span>)}
          </div>
          <h4 className="text-white font-serif font-bold text-lg leading-tight">
            {ARTICLES[0].title}
          </h4>
          <p className="text-white/80 text-sm mt-2 line-clamp-2">
            {ARTICLES[0].excerpt}
          </p>
        </div>
      </div>

      {/* 文章列表 */}
      <div className="space-y-3">
        {ARTICLES.slice(1).map(article => <div key={article.id} className="flex gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow transition-shadow">
            <img src={article.image} alt={article.title} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-stone-800 text-sm line-clamp-2 leading-snug">
                {article.title}
              </h4>
              <p className="text-stone-500 text-xs mt-1 line-clamp-1">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-stone-400">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {article.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
}