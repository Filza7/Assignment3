import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import SearchBar from './Search/SearchBar';
import styles from '../styles/Layout.module.css';

const Layout = ({ children, onSearch }) => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const showSearchBar = router.pathname !== '/'; // Do not display on login page

  return (
    <div>
      <header className={styles.header}>
        {showSearchBar && (
          <div className={styles.searchBarContainer}>
            <SearchBar onSearch={onSearch} />
          </div>
        )}
        {isAuthenticated && router.pathname !== '/' && (
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
