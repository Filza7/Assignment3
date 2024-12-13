import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // Assuming this is the correct path

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '10px 20px',
        backgroundColor: theme === 'dark' ? '#444' : '#ccc',
        color: theme === 'dark' ? 'white' : 'black',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
      }}
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;
