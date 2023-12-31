import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Pizza from "./components/Pizza.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new" element={<Pizza />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
