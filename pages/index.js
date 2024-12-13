import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';  // Import the CSS module for styling

export default function Home() {
  const { isAuthenticated, login, logout } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // useRouter hook for navigation

  const handleLogin = () => {
    // Dummy check for username and password
    if (username === 'admin' && password === 'admin123') {
      login();
      router.push('/home'); // Navigate to the home page after login
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/'); // Redirect back to login page
  };

  const handleGoHome = () => {
    router.push('/home'); // Navigate to the home page
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Login</h1>
        {isAuthenticated ? (
          <div className={styles.welcomeMessage}>
            <p>Welcome! You are logged in.</p>
            <button onClick={handleLogout} className={styles.button}>Logout</button>
            <button onClick={handleGoHome} className={styles.button}>Go to Home</button>
          </div>
        ) : (
          <div className={styles.loginForm}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            <button onClick={handleLogin} className={styles.button}>Login</button>
            {error && <p className={styles.error}>{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
