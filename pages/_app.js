import { AuthProvider } from '../context/AuthContext';
import '../styles/globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import ThemeToggle from '../Components/ThemeToggle';
import { useState } from 'react';
import Layout from '../Components/Layout';


function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false); 
    };

  return (
    <AuthProvider>
      <ThemeProvider>
            <ThemeToggle /> 
            <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout}>
                <Component {...pageProps} onLogin={handleLogin} />
            </Layout>
        </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
