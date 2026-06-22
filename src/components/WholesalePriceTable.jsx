// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { ChevronDown, ChevronUp, Plus, Minus, ShoppingCart } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

// 从数据模型获取商品和价格阶梯数据
const WholesalePriceTable = ({
  onAddToCart
}) => {
  const {
    toast
  } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedProducts, setExpandedProducts] = useState({});
  const [quantities, setQuantities] = useState({});

  // 获取商品数据和价格阶梯
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. 获取商品数据
        const productRes = await $w.cloud.callFunction({
          name: 'datasourceQuery',
          data: {
            dataSourceName: 'shiyu_product',
            query: {
              is_yaoshi_tongyuan: true // 获取药食同源商品
            },
            pageSize: 50
          }
        });
        if (productRes.code === 0 && productRes.data) {
          const productList = productRes.data.list || [];

          // 2. 获取每个商品的价格阶梯
          const productsWithTiers = await Promise.all(productList.map(async product => {
            try {
              const tierRes = await $w.cloud.callFunction({
                name: 'datasourceQuery',
                data: {
                  dataSourceName: 'shop_wholesale_tier',
                  query: {
                    spu_id: product._id,
                    is_active: true
                  }
                }
              });
              const tiers = tierRes.code === 0 && tierRes.data ? (tierRes.data.list || []).map(tier => ({
                min: tier.min_quantity,
                max: tier.max_quantity,
                price: product.retail_price * (1 - tier.discount_rate / 100),
                discount: `${tier.discount_rate}折`
              })).sort((a, b) => a.min - b.min) : [];
              return {
                id: product._id,
                name: product.subtitle || `商品${product._id}`,
                spec: `${product.shelf_life || '12个月'}/罐`,
                origin: product.origin || '未知产地',
                retailPrice: product.retail_price || 0,
                image: `https://images.unsplash.com/photo-1611241893603-3c359704e0ee?w=200&h=200&fit=crop`,
                tiers: tiers.length > 0 ? tiers : [{
                  min: 10,
                  max: 49,
                  price: product.retail_price * 0.76,
                  discount: '7.6折'
                }, {
                  min: 50,
                  max: 99,
                  price: product.retail_price * 0.66,
                  discount: '6.6折'
                }, {
                  min: 100,
                  max: null,
                  price: product.retail_price * 0.56,
                  discount: '5.6折'
                }]
              };
            } catch (error) {
              console.error('获取价格阶梯失败:', error);
              return null;
            }
          }));
          setProducts(productsWithTiers.filter(p => p !== null));
        } else {
          toast({
            title: '获取数据失败',
            description: productRes.message || '无法获取商品数据',
            variant: 'destructive'
          });
        }
      } catch (error) {
        console.error('获取数据失败:', error);
        toast({
          title: '网络错误',
          description: '请检查网络连接',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const toggleExpand = productId => {
    setExpandedProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };
  const handleQtyChange = (productId, delta) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + delta)
    }));
  };
  const handleAddToCart = product => {
    const qty = quantities[product.id] || 0;
    if (qty === 0) {
      toast({
        title: '请输入数量',
        description: '请先调整采购数量',
        variant: 'destructive'
      });
      return;
    }
    onAddToCart({
      ...product,
      quantity: qty
    });
    toast({
      title: '已加入采购清单',
      description: `${product.name} × ${qty}`
    });
  };
  const getTierPrice = (product, qty) => {
    if (qty === 0) return product.retailPrice;
    const tier = product.tiers.find(t => qty >= t.min && (t.max === null || qty <= t.max));
    return tier ? tier.price : product.retailPrice;
  };
  if (loading) {
    return <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5D8A66] mx-auto"></div>
        <p className="text-[#8B7355] mt-2">加载中...</p>
      </div>;
  }
  if (products.length === 0) {
    return <div className="p-4 text-center">
        <p className="text-[#8B7355]">暂无批发商品数据</p>
      </div>;
  }
  return <div className="space-y-4 p-4">
      {products.map(product => {
      const qty = quantities[product.id] || 0;
      const currentPrice = getTierPrice(product, qty);
      const currentTier = product.tiers.find(t => qty >= t.min && (t.max === null || qty <= t.max));
      const isExpanded = expandedProducts[product.id];
      return <div key={product.id} className="bg-white rounded-xl border border-[#E8E0D5] overflow-hidden">
            {/* 商品信息 */}
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-16 h-16 rounded-lg bg-[#FAF6F0] overflow-hidden flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#5C4033] text-sm mb-1">{product.name}</h3>
                  <p className="text-[#8B7355] text-xs mb-1">{product.spec}</p>
                  <p className="text-[#8B7355] text-xs mb-2">产地：{product.origin}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[#A85C4A] font-bold">¥{currentPrice.toFixed(2)}</span>
                    <span className="text-[#8B7355] text-xs line-through">¥{product.retailPrice}</span>
                    {currentTier && <span className="text-xs bg-[#A85C4A] text-white px-1.5 py-0.5 rounded">
                        {currentTier.discount}
                      </span>}
                  </div>
                </div>
              </div>

              {/* 数量调整 */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E8E0D5]">
                <div className="flex items-center gap-2">
                  <button onClick={() => handleQtyChange(product.id, -10)} className="w-8 h-8 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#5C4033]">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-16 text-center font-bold text-[#5C4033]">
                    {qty}
                  </span>
                  <button onClick={() => handleQtyChange(product.id, 10)} className="w-8 h-8 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#5C4033]">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button onClick={() => handleAddToCart(product)} className="h-8 px-4 bg-[#5D8A66] text-white rounded-lg font-bold text-sm flex items-center gap-1">
                  <ShoppingCart className="w-4 h-4" />
                  加入清单
                </button>
              </div>
            </div>

            {/* 阶梯价格展开 */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#FAF6F0] cursor-pointer" onClick={() => toggleExpand(product.id)}>
              <span className="text-xs text-[#8B7355]">阶梯批发价</span>
              {isExpanded ? <ChevronUp className="w-4 h-4 text-[#8B7355]" /> : <ChevronDown className="w-4 h-4 text-[#8B7355]" />}
            </div>
            {isExpanded && <div className="border-t border-[#E8E0D5] p-3 bg-[#FAF6F0]">
                <p className="text-xs text-[#8B7355] mb-2">阶梯批发价</p>
                <div className="grid grid-cols-3 gap-2">
                  {product.tiers.map((tier, idx) => <div key={idx} className={`bg-white rounded-lg p-2 text-center ${qty >= tier.min && (tier.max === null || qty <= tier.max) ? 'ring-2 ring-[#5D8A66]' : ''}`}>
                      <p className="text-xs text-[#8B7355]">
                        {tier.min}件{tier.max ? `-${tier.max}件` : '以上'}
                      </p>
                      <p className="font-bold text-[#5D8A66]">¥{tier.price.toFixed(2)}</p>
                      <p className="text-xs text-[#A85C4A]">{tier.discount}</p>
                    </div>)}
                </div>
              </div>}
          </div>;
    })}
    </div>;
};
export default WholesalePriceTable;