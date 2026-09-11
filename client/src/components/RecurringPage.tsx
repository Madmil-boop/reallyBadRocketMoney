import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar.tsx';
import useRecurring from '../services/recurringTransactions.tsx';
import Banner from './Banner.tsx';

const RecurringPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { recurringByUser, getRecurringByUser } = useRecurring();

  useEffect(() => {
    if (userId) getRecurringByUser(Number(userId));
  }, [userId, getRecurringByUser]);

  const data = recurringByUser[Number(userId)];
  const outflows = data?.outflow_streams || [];

  const totalMonthly = outflows
    .filter(s => s.is_active && s.frequency === 'MONTHLY')
    .reduce((sum, s) => sum + s.average_amount.amount, 0);

  return (
    <div>
      <Banner />
      <NavBar />
      <h2>Recurring Transactions</h2>
      {!data && <p>Loading...</p>}

      {data && (
        <>
          <div className="box" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <strong>${totalMonthly.toFixed(2)} / month</strong> in recurring charges
          </div>

          <table className="transactions-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Frequency</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {outflows.map(stream => (
                <tr key={stream.stream_id}>
                  <td>{stream.merchant_name || stream.description}</td>
                  <td>${stream.average_amount.amount.toFixed(2)}</td>
                  <td>{stream.frequency}</td>
                  <td>{stream.is_active ? 'Active' : 'Inactive'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default RecurringPage;