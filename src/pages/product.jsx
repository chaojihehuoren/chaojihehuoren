// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Toast, useToast } from '@/components/ui';

import { ProductDetailHeader } from '@/components/ProductDetailHeader.jsx';
import { ProductGallery } from '@/components/ProductGallery.jsx';
import { ConstitutionTags } from '@/components/ConstitutionTags.jsx';
import { ProductEffects } from '@/components/ProductEffects.jsx';
import { ProductReviews } from '@/components/ProductReviews.jsx';
import { BuySection } from '@/components/BuySection.jsx';
import { FontSizeToggle } from '@/components/FontSizeToggle.jsx';
export default function ProductPage(props) {
  const {
    toast
  } = useToast();
  const [userType, setUserType] = useState('C'); // C端/B端用户标识
  const [largeFontMode, setLargeFontMode] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 获取页面参数
  const productId = props.$w?.page?.dataset?.params?.id || '1';
  const currentUser = props.$w?.auth?.currentUser;

  // 模拟商品数据
  const mockProduct = {
    id: productId,
    name: '野生黄芪片',
    subtitle: '甘肃岷县 · 六年根 · 道地药材',
    retailPrice: 128,
    originalPrice: 168,
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1563911302283-d2bc129e7c1f?w=600&h=600&fit=crop'],
    origin: '甘肃岷县 · 道地药材核心产区',
    rawMaterial: '野生六年根 · 人工精选 · 无硫熏制',
    suitedConstitutions: ['qixu', 'yangxu', 'yinxu'],
    effects: [{
      title: '补气固表',
      desc: '增强机体免疫力',
      icon: 'Leaf'
    }, {
      title: '利水消肿',
      desc: '促进身体代谢',
      icon: 'Heart'
    }, {
      title: '托毒排脓',
      desc: '促进伤口愈合',
      icon: 'Shield'
    }, {
      title: '延缓衰老',
      desc: '滋补养生驻颜',
      icon: 'Clock'
    }],
    rating: 4.8,
    reviewCount: 128,
    sales: 2580
  };

  // 加载商品数据
  useEffect(() => {
    // 模拟加载数据
    setTimeout(() => {
      setProduct(mockProduct);
      setLoading(false);
    }, 300);
  }, [productId]);

  // 返回上一页
  const handleBack = () => {
    if (props.$w?.utils?.navigateBack) {
      props.$w.utils.navigateBack();
    } else {
      window.history.back();
    }
  };

  // 加入购物车
  const handleAddToCart = () => {
    toast({
      title: '已加入购物车',
      description: userType === 'B' ? '已加入采购清单' : '已加入购物车',
      variant: 'success'
    });
  };

  // 立即购买
  const handleBuyNow = () => {
    const pageId = userType === 'B' ? 'b2b-order' : 'order';
    if (props.$w?.utils?.navigateTo) {
      props.$w.utils.navigateTo({
        pageId: pageId,
        params: {
          productId: product?.id,
          quantity: 1,
          userType: userType
        }
      });
    } else {
      toast({
        title: '即将跳转到订单页面',
        description: `商品ID: ${product?.id}, 数量: 1`,
        variant: 'default'
      });
    }
  };

  // 切换用户类型
  const handleSwitchToB = () => setUserType('B');
  const handleSwitchToC = () => setUserType('C');

  // 切换字体大小
  const handleToggleFontSize = () => {
    setLargeFontMode(!largeFontMode);
    toast({
      title: !largeFontMode ? '已切换到大字体模式' : '已切换到标准字体',
      description: !largeFontMode ? '界面文字已放大，方便阅读' : '界面文字已恢复标准大小',
      variant: 'default'
    });
  };
  if (loading) {
    return <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#5D8A66] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#8B7355]">加载中...</p>
        </div>
      </div>;
  }
  return <div className={`min-h-screen bg-[#FAF6F0] ${largeFontMode ? 'text-lg' : 'text-sm'}`}>
      {/* 顶部导航栏 */}
      <ProductDetailHeader productName={product?.name} onBack={handleBack} />
      
      {/* 适老化字体切换 */}
      <FontSizeToggle isLarge={largeFontMode} onToggle={handleToggleFontSize} />
      
      {/* 主内容区域 */}
      <div className="pt-14 pb-28">
        {/* 商品主图展示区 */}
        <ProductGallery images={product?.images} productName={product?.name} />
        
        {/* 商品基础信息 */}
        <div className={`px-4 py-5 bg-white mx-4 rounded-2xl -mt-4 relative z-10 shadow-sm ${largeFontMode ? 'p-6 mt-[-16px]' : ''}`}>
          <h1 className={`font-serif text-[#5C4033] ${largeFontMode ? 'text-xl' : 'text-lg'} mb-2`}>
            {product?.name}
          </h1>
          <p className={`text-[#8B7355] ${largeFontMode ? 'text-sm' : 'text-xs'} mb-3`}>
            {product?.subtitle}
          </p>
          
          {/* 价格与销量 */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className={`font-bold text-[#A85C4A] ${largeFontMode ? 'text-2xl' : 'text-xl'}`}>
                ¥{product?.retailPrice}
              </span>
              <span className={`text-[#8B7355] line-through ${largeFontMode ? 'text-sm' : 'text-xs'}`}>
                ¥{product?.originalPrice}
              </span>
            </div>
            <div className={`text-[#8B7355] ${largeFontMode ? 'text-sm' : 'text-xs'}`}>
              已售 {product?.sales || 0}
            </div>
          </div>
          
          {/* 用户类型标签 */}
          <div className="flex gap-2 mt-3">
            {userType === 'B' ? <span className={`px-3 py-1 bg-[#5D8A66] text-white ${largeFontMode ? 'text-xs' : 'text-[10px]'} rounded-full`}>
                经销商采购价
              </span> : <span className={`px-3 py-1 bg-[#C4A77D]/20 text-[#C4A77D] ${largeFontMode ? 'text-xs' : 'text-[10px]'} rounded-full`}>
                会员专享价
              </span>}
            <span className={`px-3 py-1 bg-[#A85C4A]/10 text-[#A85C4A] ${largeFontMode ? 'text-xs' : 'text-[10px]'} rounded-full`}>
              药食同源
            </span>
          </div>
        </div>
        
        {/* 体质适配标签 */}
        <div className="px-4 mt-4">
          <ConstitutionTags suitedConstitutions={product?.suitedConstitutions || []} largeFontMode={largeFontMode} />
        </div>
        
        {/* 食材功效说明 */}
        <div className="px-4 mt-4">
          <ProductEffects effects={product?.effects} origin={product?.origin} rawMaterial={product?.rawMaterial} largeFontMode={largeFontMode} />
        </div>
        
        {/* 用户评价区 */}
        <div className="px-4 mt-4">
          <ProductReviews reviews={[]} rating={product?.rating} totalCount={product?.reviewCount} />
        </div>
        
        {/* 商品详情 */}
        <div className="px-4 mt-4 mb-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E0D5]">
            <h3 className={`font-serif text-[#5C4033] mb-4 ${largeFontMode ? 'text-lg' : 'text-base'}`}>
              商品详情
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className={`text-[#8B7355] ${largeFontMode ? 'text-sm' : 'text-xs'} w-16`}>品名</span>
                <span className={`text-[#5C4033] ${largeFontMode ? 'text-sm' : 'text-xs'}`}>{product?.name}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className={`text-[#8B7355] ${largeFontMode ? 'text-sm' : 'text-xs'} w-16`}>产地</span>
                <span className={`text-[#5C4033] ${largeFontMode ? 'text-sm' : 'text-xs'}`}>{product?.origin}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className={`text-[#8B7355] ${largeFontMode ? 'text-sm' : 'text-xs'} w-16`}>规格</span>
                <span className={`text-[#5C4033] ${largeFontMode ? 'text-sm' : 'text-xs'}`}>{product?.rawMaterial}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className={`text-[#8B7355] ${largeFontMode ? 'text-sm' : 'text-xs'} w-16`}>贮存</span>
                <span className={`text-[#5C4033] ${largeFontMode ? 'text-sm' : 'text-xs'}`}>阴凉干燥处保存</span>
              </div>
              <div className="flex items-start gap-3">
                <span className={`text-[#8B7355] ${largeFontMode ? 'text-sm' : 'text-xs'} w-16`}>保质期</span>
                <span className={`text-[#5C4033] ${largeFontMode ? 'text-sm' : 'text-xs'}`}>24个月</span>
              </div>
            </div>
            
            {/* 图文详情 */}
            <div className="mt-6 pt-4 border-t border-[#E8E0D5]">
              <img src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&fit=crop" alt="商品详情图1" className="w-full rounded-xl mb-3" />
              <p className={`text-[#5C4033] ${largeFontMode ? 'text-sm' : 'text-xs'} leading-relaxed mb-3`}>
                野生黄芪片选用甘肃岷县六年根野生黄芪，采用传统工艺切片，自然晾晒，无硫熏制，保留药材最纯粹的功效。
              </p>
              <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&fit=crop" alt="商品详情图2" className="w-full rounded-xl mb-3" />
              <p className={`text-[#5C4033] ${largeFontMode ? 'text-sm' : 'text-xs'} leading-relaxed text-center text-[#8B7355] py-4`}>
                食愈空间站 · 药食同源 · 顺时养生
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部购买区域 */}
      <BuySection product={product} userType={userType} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} onSwitchToB={handleSwitchToB} onSwitchToC={handleSwitchToC} largeFontMode={largeFontMode} />
    </div>;
}