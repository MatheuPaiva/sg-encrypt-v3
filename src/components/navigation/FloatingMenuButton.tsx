import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSidebar } from '../../contexts/SidebarContext';

const FloatingMenuButton = () => {
  const { isOpen, toggle } = useSidebar();

  return (
    <button
      onClick={toggle}
      className={`
        fixed z-50 p-1.5 rounded-full bg-white text-gray-600 shadow-md 
        hover:bg-gray-50 lg:hidden transition-all duration-300
        ${isOpen 
          ? 'left-64 top-7' // Adjusted position for wider sidebar
          : 'left-4 top-4'  // Left side when closed
        }
      `}
      aria-label="Toggle menu"
    >
      {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
    </button>
  );
};

export default FloatingMenuButton;