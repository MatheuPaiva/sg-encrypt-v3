import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FileText, Eye, LayoutDashboard, LineChart, BookOpen } from 'lucide-react';

const Dashboard = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">SIGA</h1>
          </div>
        </div>
        <nav className="mt-6">
          <Link
            to="/"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              location.pathname === '/' ? 'bg-gray-100' : ''
            }`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Overview
          </Link>
          <Link
            to="/reports/create"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              location.pathname === '/reports/create' ? 'bg-gray-100' : ''
            }`}
          >
            <FileText className="w-5 h-5 mr-3" />
            Create Report
          </Link>
          <Link
            to="/reports/view"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              location.pathname === '/reports/view' ? 'bg-gray-100' : ''
            }`}
          >
            <Eye className="w-5 h-5 mr-3" />
            View Reports
          </Link>
          <Link
            to="/analytics"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              location.pathname === '/analytics' ? 'bg-gray-100' : ''
            }`}
          >
            <LineChart className="w-5 h-5 mr-3" />
            Analytics
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;