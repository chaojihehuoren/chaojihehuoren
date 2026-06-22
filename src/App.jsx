// @ts-ignore;
import React, { useState, useEffect } from 'react';

import HomePage from './pages/home.jsx';
import ProductPage from './pages/product.jsx';
import AIQuestionPage from './pages/aiquestion.jsx';
import MemberPage from './pages/member.jsx';
import WholesalePage from './pages/wholesale.jsx';
import SeasonalPage from './pages/seasonal.jsx';
import CategoryPage from './pages/category.jsx';
import CartPage from './pages/cart.jsx';
import ProfilePage from './pages/profile.jsx';
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState({});

  // 模拟路由
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(2) || 'home';
      const [page, queryString] = hash.split('?');
      setCurrentPage(page || 'home');
      if (queryString) {
        const params = new URLSearchParams(queryString);
        const paramsObj = {};
        params.forEach((value, key) => {
          paramsObj[key] = value;
        });
        setPageParams(paramsObj);
      } else {
        setPageParams({});
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 路由配置
  const $w = {
    auth: {
      currentUser: {
        type: 'user',
        userId: 'user_001',
        name: '张三',
        nickName: '养生日记',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
      }
    },
    utils: {
      navigateTo: ({
        pageId,
        params
      }) => {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
        window.location.hash = `#/${pageId}${queryString}`;
      },
      redirectTo: ({
        pageId,
        params
      }) => {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
        window.location.href = `#/${pageId}${queryString}`;
      },
      navigateBack: () => {
        window.history.back();
      }
    },
    page: {
      dataset: {
        params: pageParams
      }
    },
    cloud: {
      callFunction: async ({
        name,
        data
      }) => {
        console.log('调用云函数:', name, data);
        return {
          success: true
        };
      },
      getCloudInstance: async () => null
    }
  };

  // 页面映射
  const pages = {
    home: <HomePage $w={$w} />,
    product: <ProductPage $w={$w} />,
    aiquestion: <AIQuestionPage $w={$w} />,
    member: <MemberPage $w={$w} />,
    wholesale: <WholesalePage $w={$w} />,
    seasonal: <SeasonalPage $w={$w} />,
    category: <CategoryPage $w={$w} />,
    cart: <CartPage $w={$w} />,
    profile: <ProfilePage $w={$w} />
  };
  return <div className="app">
      {pages[currentPage] || pages.home}
    </div>;
}
export default App;