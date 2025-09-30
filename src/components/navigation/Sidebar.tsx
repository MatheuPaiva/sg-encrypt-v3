import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, Eye, LineChart, Map } from 'lucide-react';
import NavLink from './NavLink';
import SidebarFooter from './SidebarFooter';
import { useSidebar } from '../../contexts/SidebarContext';
import { useNotifications } from '../../contexts/NotificationsContext';
import Logo from '../assets/logosiga.png';

const Sidebar = () => {
  const location = useLocation();
  const { isOpen, toggle } = useSidebar();
  const { hasNewReport } = useNotifications();

  const navItems = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/reports/create', icon: FileText, label: 'Criar Relatório' },
    { path: '/reports/view', icon: Eye, label: 'Visualizar Relatórios', notification: hasNewReport },
    { path: '/analytics', icon: LineChart, label: 'Análises' },
    { path: '/map', icon: Map, label: 'Medir Área' },
    { path: '/classificacao', icon: LineChart, label: 'IA Classificacao de Doenças' }
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden z-[998]"
          onClick={toggle}
          aria-hidden="true"
        />
      )}
      
      <aside className={`
        fixed top-0 left-0 h-screen w-72 bg-white shadow-lg
        transition-transform duration-300 ease-in-out z-[999]
        lg:sticky lg:translate-x-0 flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header do Sidebar */}
          <div className="p-6 border-b">
            <Link to="/" className="flex items-center space-x-4">
              <img src={Logo} alt="Logo SIGA" className="w-16 h-16 rounded-full object-cover" />
              <h1 className="text-4xl font-bold text-green-600"> SIGA</h1>
            </Link>
          </div>

          {/* Menu de Navegação com Scroll */}
          <nav className="flex-1 overflow-y-auto py-6">
            {navItems.map(({ path, icon: Icon, label, notification }) => (
              <NavLink
                key={path}
                to={path}
                icon={<Icon className="w-5 h-5 mr-4" />}
                active={location.pathname === path}
                notification={notification}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Rodapé do Sidebar */}
        <SidebarFooter />
      </aside>
    </>
  );
};

export default Sidebar;
