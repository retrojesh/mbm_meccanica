import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="flex min-h-screen w-full flex-col">
                <Navbar />
                <main className="w-full flex-grow"></main>
            </div>
        </BrowserRouter>
    );
}

export default App;
