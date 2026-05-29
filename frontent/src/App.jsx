import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MenuProvider } from './context/MenuContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import NotFound from './pages/NotFound';
import './App.css';

function AppContent() {
  return (
    <>
      {/* Sticky Navigation Header */}
      <Header />

      {/* Main content body with padding for sticky header */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MenuProvider>
        <Router>
          <AppContent />
        </Router>
      </MenuProvider>
    </ThemeProvider>
  );
}
