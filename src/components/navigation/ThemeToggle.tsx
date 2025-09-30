import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-full p-4 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
    >
      {theme === 'light' ? (
        <>
          <Moon className="w-5 h-5 mr-2" />
          <span>Modo Escuro</span>
        </>
      ) : (
        <>
          <Sun className="w-5 h-5 mr-2" />
          <span>Modo Claro</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;