import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Servizi from './pages/Servizi';
import Contattaci from './pages/Contattaci';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/servizi" element={<Servizi />} />
                <Route path="/contattaci" element={<Contattaci />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
