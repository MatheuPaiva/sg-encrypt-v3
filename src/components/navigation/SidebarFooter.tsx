import React from 'react';
import { Link } from 'react-router-dom';

const SidebarFooter = () => (
  <div className="p-4 border-t text-xs text-gray-500">
    <div className="text-center">
      SAD © 2025 | v3.0.1
    </div>
    <div className="flex justify-center gap-1 mt-1">
      <Link to="/privacy" className="hover:text-gray-700">Política de Privacidade</Link>
      <span>•</span>
      <Link to="/terms" className="hover:text-gray-700">Termos de Uso</Link>
    </div>
  </div>
);

export default SidebarFooter;