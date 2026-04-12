import React from 'react';
import Navbar from '../components/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50/30 flex flex-col items-center">
      <Navbar />
      {/* Page Content */}
      <main className="w-full pt-28 pb-12 px-4 lg:px-8 flex-1 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
