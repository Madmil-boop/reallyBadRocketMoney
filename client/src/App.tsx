import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AllTransactionsPage from './components/AllTransactionsPage.tsx';
import RecurringPage from './components/RecurringPage.tsx';
import IncomePage from './components/IncomePage.tsx';
import Sockets from './components/Sockets.jsx';
import OAuthLink from './components/OAuthLink.tsx';
import Landing from './components/Landing.tsx';
import UserPage from './components/UserPage.tsx';
import UserList from './components/UserList.tsx';
import { AccountsProvider } from './services/accounts.tsx';
import { InstitutionsProvider } from './services/institutions.tsx';
import { ItemsProvider } from './services/items.tsx';
import { LinkProvider } from './services/link.tsx';
import { TransactionsProvider } from './services/transactions.tsx';
import { UsersProvider } from './services/users.tsx';
import { CurrentUserProvider } from './services/currentUser.tsx';
import { AssetsProvider } from './services/assets.tsx';
import { ErrorsProvider } from './services/errors.tsx';

import './App.scss';
import { RecurringProvider } from './services/recurringTransactions.tsx';

function App() {
  return (
    <div className="App">
      <ToastContainer
        autoClose={8000}
        draggable={false}
        toastClassName="box toast__background"
        hideProgressBar={true}
      />
      <InstitutionsProvider>
        <ItemsProvider>
          <LinkProvider>
            <AccountsProvider>
              <TransactionsProvider>
                <ErrorsProvider>
                  <UsersProvider>
                    <CurrentUserProvider>
                      <RecurringProvider>
                      <AssetsProvider>
                        <Sockets />
                        <Routes>
                          <Route path="/" element={<Landing />} />
                          <Route path="/user/:userId" element={<UserPage />} />
                          <Route path="/user/:userId/transactions" element={<AllTransactionsPage />} />
                          <Route path="/user/:userId/recurring" element={<RecurringPage />} />
                          <Route path="/user/:userId/income" element={<IncomePage />} />
                          <Route path="/oauth-link" element={<OAuthLink />} />
                          <Route path="/admin" element={<UserList />} />
                        </Routes>
                      </AssetsProvider>
                      </RecurringProvider>
                    </CurrentUserProvider>
                  </UsersProvider>
                </ErrorsProvider>
              </TransactionsProvider>
            </AccountsProvider>
          </LinkProvider>
        </ItemsProvider>
      </InstitutionsProvider>
    </div>
  );
}

export default App;
