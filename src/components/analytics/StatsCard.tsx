import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <Icon className="w-5 h-5 text-blue-600" />
    </div>
    <p className="text-2xl font-bold mt-2">{value}</p>
    <p className="text-sm text-gray-500 mt-2">{trend}</p>
  </div>
);

export default StatsCard;