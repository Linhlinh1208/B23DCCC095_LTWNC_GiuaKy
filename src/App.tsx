import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useAppDispatch } from './app/hooks';
import { loadBooks } from './features/books/booksSlice';
import { useTheme } from './context/ThemeContext';
import { Home } from './pages/Home';

const Stats = lazy(() => import('./pages/Stats'));

export const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme, toggleTheme } = useTheme();
  const [currentRoute, setCurrentRoute] = useState<'home' | 'stats'>('home');

  useEffect(() => {
    dispatch(loadBooks(false));
  }, [dispatch]);

  const appStyle: React.CSSProperties = {
    backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
    color: theme === 'light' ? '#000000' : '#ffffff',
    minHeight: '100vh',
    padding: '24px',
    fontFamily: 'sans-serif'
  };

  return (
    <div style={appStyle}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Mini Library</h1>
        <div>
          <button onClick={() => setCurrentRoute(currentRoute === 'home' ? 'stats' : 'home')} style={{ marginRight: '10px' }}>
            {currentRoute === 'home' ? 'Xem Thống Kê' : 'Về Trang Chủ'}
          </button>
          <button onClick={toggleTheme}>
            Đổi sang giao diện {theme === 'light' ? 'tối ' : 'sáng '}
          </button>
        </div>
      </header>

      {currentRoute === 'home' ? (
        <Home />
      ) : (
        <Suspense fallback={<div>Đang tải trang Thống kê...</div>}>
          <Stats />
        </Suspense>
      )}
    </div>
  );
};

export default AppContent;