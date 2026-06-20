// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { BookOpen, ChefHat, Search, Filter, Heart, Clock, Users } from 'lucide-react';

// 热门食谱数据
const POPULAR_RECIPES = [{
  id: 1,
  name: '冬瓜薏米老鸭汤',
  season: '夏',
  duration: '90分钟',
  servings: 4,
  difficulty: '中等',
  image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=300&h=200&fit=crop',
  tags: ['清热', '祛湿', '滋补'],
  likes: 2456
}, {
  id: 2,
  name: '荷叶茯苓粥',
  season: '夏',
  duration: '45分钟',
  servings: 2,
  difficulty: '简单',
  image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=300&h=200&fit=crop',
  tags: ['清热', '健脾', '安神'],
  likes: 1892
}, {
  id: 3,
  name: '百合莲子银耳羹',
  season: '夏',
  duration: '60分钟',
  servings: 3,
  difficulty: '简单',
  image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop',
  tags: ['润肺', '养心', '美容'],
  likes: 3201
}, {
  id: 4,
  name: '绿豆百合汤',
  season: '夏',
  duration: '30分钟',
  servings: 4,
  difficulty: '简单',
  image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=300&h=200&fit=crop',
  tags: ['清热', '解毒', '消暑'],
  likes: 4521
}];

// 热门食材
const HOT_INGREDIENTS = ['薏苡仁', '茯苓', '荷叶', '冬瓜', '绿豆', '百合'];
export function RecipeTools() {
  return <div className="space-y-4">
      {/* 标题 */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-serif font-bold text-stone-800 flex items-center gap-2">
          <span className="text-2xl">🍲</span>
          药膳食谱工具
        </h3>
        <button className="text-sm text-stone-500 flex items-center gap-1 hover:text-stone-700">
          全部食谱 <ChefHat size={14} />
        </button>
      </div>

      {/* 搜索栏 */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input type="text" placeholder="搜索药膳食谱..." className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-emerald-400" />
        </div>
        <button className="px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors">
          <Filter size={18} />
        </button>
      </div>

      {/* 热门食材标签 */}
      <div className="flex flex-wrap gap-2">
        {HOT_INGREDIENTS.map(ingredient => <button key={ingredient} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm rounded-full border border-emerald-200 hover:bg-emerald-100 transition-colors">
            {ingredient}
          </button>)}
      </div>

      {/* 热门食谱列表 */}
      <div className="space-y-3">
        {POPULAR_RECIPES.map(recipe => <div key={recipe.id} className="flex gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow transition-shadow">
            <img src={recipe.image} alt={recipe.name} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-stone-800 leading-snug">{recipe.name}</h4>
                <button className="text-red-400 hover:text-red-500">
                  <Heart size={16} />
                </button>
              </div>
              <div className="flex gap-1.5 mt-1">
                {recipe.tags.map(tag => <span key={tag} className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {tag}
                  </span>)}
              </div>
              <div className="flex items-center gap-3 mt-2 text-xs text-stone-400">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {recipe.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={12} />
                  {recipe.servings}人份
                </span>
                <span className={`px-1.5 py-0.5 rounded ${recipe.difficulty === '简单' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                  {recipe.difficulty}
                </span>
              </div>
            </div>
          </div>)}
      </div>

      {/* 功能入口 */}
      <div className="grid grid-cols-2 gap-3">
        <button className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100 text-left hover:shadow transition-shadow">
          <BookOpen className="text-amber-600 mb-2" size={24} />
          <div className="font-medium text-stone-800">食谱大全</div>
          <div className="text-xs text-stone-500 mt-0.5">200+药膳食谱</div>
        </button>
        <button className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 text-left hover:shadow transition-shadow">
          <ChefHat className="text-emerald-600 mb-2" size={24} />
          <div className="font-medium text-stone-800">体质食谱</div>
          <div className="text-xs text-stone-500 mt-0.5">按体质推荐</div>
        </button>
      </div>
    </div>;
}