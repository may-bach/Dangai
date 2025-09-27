import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainPage from './components/MainPage';
import ArcPage from './components/ArcPage';
import ReaderPage from './components/ReaderPage';

const App: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Delay to allow styles and fonts to load, preventing FOUC
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`min-h-screen bg-black text-neutral-200 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
             <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/:arcSlug" element={<ArcPage />} />
                    <Route path="/:arcSlug/:chapterSlug" element={<ReaderPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;