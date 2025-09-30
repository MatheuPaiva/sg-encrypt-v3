import React, { useEffect, useState } from 'react';
import { LineChart as Chart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { groupReportsByDate } from '../utils/analytics';
import type { Report } from '../types/report';

const Analytics = () => {
  const [reportData, setReportData] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    const reports: Report[] = JSON.parse(localStorage.getItem('encryptedReports') || '[]');
    const groupedData = groupReportsByDate(reports);
    setReportData(groupedData);
  }, []);

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6">Reports Analytics</h2>
      
      <div className="h-[400px] mt-8">
        <ResponsiveContainer width="100%" height="100%">
          <Chart data={reportData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="#2563eb" 
              name="Reports Created"
              strokeWidth={2}
            />
          </Chart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Total Reports</p>
            <p className="text-2xl font-bold">{reportData.reduce((sum, item) => sum + item.count, 0)}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">Most Active Day</p>
            <p className="text-2xl font-bold">
              {reportData.reduce((max, item) => item.count > max.count ? item : max, { date: '-', count: 0 }).date}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600">Average Reports/Day</p>
            <p className="text-2xl font-bold">
              {(reportData.reduce((sum, item) => sum + item.count, 0) / (reportData.length || 1)).toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;