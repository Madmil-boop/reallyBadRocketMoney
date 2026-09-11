import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar.tsx';
import useTransactions from '../services/transactions.tsx';
import TransactionsTable from './TransactionsTable.tsx';

import Banner from './Banner.tsx';

const AllTransactionsPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { transactionsByUser, getTransactionsByUser } = useTransactions();

  React.useEffect(() => {
    if (userId) getTransactionsByUser(Number(userId));
  }, [userId, getTransactionsByUser]);

  const transactions = transactionsByUser[Number(userId)] || [];

  return (  
    <div>
      <Banner />  
      <NavBar />
      <h2>All Transactions</h2>
      <div className="box">
        <TransactionsTable transactions={transactions} />
      </div>
    </div>
  );
};

export default AllTransactionsPage;