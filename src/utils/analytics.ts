import type { Report } from '../types/report';

export const groupReportsByDate = (reports: Report[]): { date: string; count: number }[] => {
  // Create a map to store counts by date
  const countsByDate = reports.reduce((acc, report) => {
    const date = new Date(report.date).toISOString().split('T')[0];
    acc.set(date, (acc.get(date) || 0) + 1);
    return acc;
  }, new Map<string, number>());

  // Convert map to array and sort by date
  return Array.from(countsByDate.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
};