import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import './DarkModeToggle.css';

export default function DarkModeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className={`icon-container ${isDark ? 'dark' : 'light'}`}>
        {isDark ? <FiSun className="theme-icon sun" /> : <FiMoon className="theme-icon moon" />}
      </div>
    </button>
  );
}
