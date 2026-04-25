import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Azienda from './pages/Azienda';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Servizi from './pages/Servizi';
import ParcoMacchine from './pages/ParcoMacchine';
import Contattaci from './pages/Contattaci';
import PrivacyBanner from './components/PrivacyBanner';
import PrivacyPage from './pages/PrivacyPolicy.jsx';
import './App.css';

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
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
                <Route path="/parco-macchine" element={<ParcoMacchine />} />
                <Route path="/contattaci" element={<Contattaci />} />
                <Route path="/privacy" element={<PrivacyPage />} />
            </Routes>
            <PrivacyBanner />
        </BrowserRouter>
    );
}

export default App;
