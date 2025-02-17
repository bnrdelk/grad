import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './navbar/Navbar';
import HomePage from './home/HomePage';
import StudioPage from './studio/StudioPage';
import FeedPage from './feed/FeedPage';
import Footer from './footer/Footer';

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ["/grad"]; // Navbar'ın gizlenmesi gereken sayfalar
  const isNavbarVisible = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/grad" element={<HomePage />} />
        <Route path="/grad/feed" element={<FeedPage />} />
        <Route path="/grad/studio" element={<StudioPage />} />
      </Routes>
      <Footer/>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
