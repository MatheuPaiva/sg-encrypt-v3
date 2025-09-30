import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  active: boolean;
  children: React.ReactNode;
  notification?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, active, children, notification }) => (
  <Link
    to={to}
    className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 relative ${
      active ? 'bg-gray-100' : ''
    }`}
  >
    {icon}
    {children}
    {notification && (
      <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full" />
    )}
  </Link>
);

export default NavLink;