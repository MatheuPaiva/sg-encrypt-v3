import React, { createContext, useContext, useState } from 'react';

interface NotificationsContextType {
  hasNewReport: boolean;
  setHasNewReport: (value: boolean) => void;
  clearNewReportNotification: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [hasNewReport, setHasNewReport] = useState(false);

  const clearNewReportNotification = () => setHasNewReport(false);

  return (
    <NotificationsContext.Provider value={{ hasNewReport, setHasNewReport, clearNewReportNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
}