import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

const NavBar = () => {
  const { userId } = useParams<{ userId: string }>();

  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    padding: '0.75rem 1rem',
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    borderBottom: isActive ? '2px solid #2a9d8f' : '2px solid transparent',
    color: isActive ? '#2a9d8f' : '#333',
  });

  return (
    <nav
      style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '1px solid #e5e5e5',
        marginBottom: '2rem',
      }}
    >
      <NavLink to={`/user/${userId}`} end style={linkStyle}>
        Dashboard
      </NavLink>
      <NavLink to={`/user/${userId}/transactions`} style={linkStyle}>
        All Transactions
      </NavLink>
      <NavLink to={`/user/${userId}/recurring`} style={linkStyle}>
        Recurring
      </NavLink>
      <NavLink to={`/user/${userId}/income`} style={linkStyle}>
        Income
      </NavLink>
    </nav>
  );
};

export default NavBar;