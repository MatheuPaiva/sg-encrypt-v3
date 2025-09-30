import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './navigation/Sidebar';
import FloatingMenuButton from './navigation/FloatingMenuButton';
import { SidebarProvider, useSidebar } from '../contexts/SidebarContext';
import { useClickOutside } from '../hooks/useClickOutside';

const LayoutContent = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { isOpen, toggle } = useSidebar();
  
  useClickOutside(sidebarRef, () => {
    if (isOpen) toggle();
  }, isOpen);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div ref={sidebarRef}>
        <Sidebar />
      </div>
      <main className="flex-1 overflow-x-hidden">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
      <FloatingMenuButton />
    </div>
  );
};

const Layout = () => (
  <SidebarProvider>
    <LayoutContent />
  </SidebarProvider>
);

export default Layout;