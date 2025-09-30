import { useState, useEffect } from 'react';
import type { Report } from '../types/report';

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedReports = JSON.parse(localStorage.getItem('encryptedReports') || '[]');
      setReports(storedReports);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const totalReports = reports.length;
  const recentReports = reports.filter(
    report => new Date(report.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

  return {
    reports,
    loading,
    totalReports,
    recentReports,
  };
};

export default useReports;