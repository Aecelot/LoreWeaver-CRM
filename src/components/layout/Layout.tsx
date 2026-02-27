import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const Layout: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <TopBar onSearch={setSearchTerm} />
        
        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet context={{ searchTerm }} />
        </main>
      </div>
    </div>
  );
};