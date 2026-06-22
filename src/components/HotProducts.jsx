// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { TrendingUp, ChevronRight, Star } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

export function HotProducts({
  products: propProducts,
  onProductClick,
  $w
}) {
  const [products, setProducts] = useState(propProducts || []);
  const [loading, setLoading] = useState(!propProducts);
  const {
    toast
  } = useToast();

  // 如果没有传入products，则从数据模型获取
  useEffect(() => {
    if (propProducts && propProducts.length > 0) {
      setProducts(propProducts);
      return;
    }
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // 从shiyu_product模型获取热销商品
        const result = await $w.cloud.callFunction({
          name: 'datasource',
          data: {
            collection: 'shiyu_product',
            action: 'getList',
            query: {
              is_active: true,
              is_hot: true
            },
            sort: {
              sales_count: -1
            },
            limit: 6
          }
        });
        if (result.code === 0 && result.data && result.data.list) {
          // 转换数据格式
          const formattedProducts = result.data.list.map(item => ({
            id: item._id,
            name: item.subtitle || item.name,
            subtitle: item.subtitle || item.name,
            price: item.retail_price || item.price || 0,
            originalPrice: item.original_price || Math.round(item.retail_price * 1.2) || 0,
            image: item.main_image || item.image || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=300&fit=crop',
            sales: item.sales_count || item.sales || 0
          }));
          setProducts(formattedProducts);
        } else {
          console.error('获取商品数据失败:', result);
          toast({
            title: '商品数据加载失败',
            description: result.message || '请稍后重试'
          });
        }
      } catch (error) {
        console.error('获取商品数据异常:', error);
        toast({
          title: '商品数据加载失败',
          description: error.message || '网络异常，请检查网络连接'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [propProducts]);
  return <div>
      {/* 标题区 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#A85C4A] to-[#C4A77D] rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-serif text-[#5C4033]">热销爆款</h2>
        </div>
        <button className="flex items-center gap-1 text-sm text-[#8B7355] hover:text-[#5D8A66] transition-colors">
          <span>查看更多</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 商品列表 - 非对称网格 */}
      {loading ? <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
              <div className="h-36 bg-gray-200"></div>
              <div className="p-3">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>)}
        </div> : <div className="grid grid-cols-2 gap-4">
          {products.map((product, index) => <button key={product.id} onClick={() => onProductClick(product)} className={`
              relative bg-white rounded-2xl overflow-hidden transition-all duration-300
              hover:shadow-lg active:scale-98
              ${index === 0 ? 'row-span-2' : ''}
            `} style={{
        boxShadow: '0 2px 12px rgba(92, 64, 51, 0.08)'
      }}>
              {/* 商品图片 */}
              <div className={`relative ${index === 0 ? 'h-52' : 'h-36'} overflow-hidden`}>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                
                {/* 销量标签 */}
                {product.sales > 0 && <div className="absolute top-2 left-2 bg-[#A85C4A]/90 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>已售 {product.sales}</span>
                  </div>}

                {/* 限时折扣 */}
                {product.originalPrice > product.price && <div className="absolute top-2 right-2 bg-[#5D8A66] text-white text-xs px-2 py-1 rounded-full">
                    特惠
                  </div>}
              </div>

              {/* 商品信息 */}
              <div className="p-3 text-left">
                <h3 className="text-sm font-medium text-[#5C4033] mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-[#8B7355] mb-2 line-clamp-1">
                  {product.subtitle}
                </p>
                
                {/* 价格信息 */}
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-semibold text-[#A85C4A]">
                    ¥{product.price}
                  </span>
                  {product.originalPrice > product.price && <span className="text-xs text-[#8B7355] line-through">
                      ¥{product.originalPrice}
                    </span>}
                </div>

                {/* 评分 */}
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-3 h-3 text-[#C4A77D] fill-[#C4A77D]" />
                  <span className="text-xs text-[#8B7355]">4.8</span>
                </div>
              </div>
            </button>)}
        </div>}
    </div>;
}