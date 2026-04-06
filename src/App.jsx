import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Azienda from './pages/Azienda';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Servizi from './pages/Servizi';
import Contattaci from './pages/Contattaci';
import './App.css';

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return null;
}

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/azienda" element={<Azienda />} />
                <Route path="/servizi" element={<Servizi />} />
                <Route path="/contattaci" element={<Contattaci />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
