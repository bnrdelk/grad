import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './navbar/Navbar'
import HomePage from './home/HomePage'
import StudioPage from './studio/StudioPage';
function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/grad" element={<HomePage />} />
          <Route path="/studio" element={<StudioPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App
