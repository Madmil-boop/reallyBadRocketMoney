
import React, { useContext, useState, createContext, useCallback } from 'react';

interface RecurringStream {
  stream_id: string;
  description: string;
  merchant_name?: string;
  average_amount: { amount: number };
  frequency: string;
  is_active: boolean;
  category?: string[];
}

interface RecurringData {
  inflow_streams: RecurringStream[];
  outflow_streams: RecurringStream[];
}

interface RecurringContextShape {
  recurringByUser: { [userId: number]: RecurringData };
  getRecurringByUser: (userId: number) => void;
}

const RecurringContext = createContext<RecurringContextShape>(
  {} as RecurringContextShape
);

export const RecurringProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [recurringByUser, setRecurringByUser] = useState<{
    [userId: number]: RecurringData;
  }>({});

  const getRecurringByUser = useCallback(async (userId: number) => {
    const response = await fetch(`/recurring-transactions/${userId}`);
    const data = await response.json();
    setRecurringByUser(prev => ({ ...prev, [userId]: data }));
}, []);

  return (
    <RecurringContext.Provider value={{ recurringByUser, getRecurringByUser }}>
      {children}
    </RecurringContext.Provider>
  );
};

export default function useRecurring() {
  const context = useContext(RecurringContext);
  if (!context) {
    throw new Error('useRecurring must be used within a RecurringProvider');
  }
  return context;
}