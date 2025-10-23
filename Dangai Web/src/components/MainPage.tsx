import React from 'react';
import { ARCS, NOVEL_TITLE } from '../constants';
import type { Arc } from '../types';
import DecorativeLine from './DecorativeLine';

interface ArcCardProps {
    arc: Arc;
    onSelect: (arc: Arc) => void;
}

const ArcCard: React.FC<ArcCardProps> = ({ arc, onSelect }) => {
    const isPrologue = arc.id === 'prologue';

    const cardClasses = `
        bg-white/5 border border-white/15 rounded-2xl px-6 py-3 text-center transition-all duration-300 flex flex-col justify-center min-h-24
        ${arc.locked 
            ? 'opacity-40 cursor-not-allowed' 
            : 'cursor-pointer hover:bg-white/10 hover:border-white/25 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50'
        }
    `;

    return (
        <div className={cardClasses} onClick={() => !arc.locked && onSelect(arc)}>
            <div>
                <div className={`font-playfair text-lg md:text-xl font-medium text-white tracking-[0.2em] md:tracking-[0.25em] [text-shadow:0_0_15px_rgba(255,255,255,0.4)] ${!isPrologue ? 'mb-3' : ''}`}>
                    {arc.title}
                </div>
                {!isPrologue && (
                    <div className={`font-serif text-sm md:text-base italic ${arc.locked ? 'text-neutral-500' : 'text-neutral-300'} ${arc.id === 'first_arc' ? 'tracking-[0.2em]' : ''}`}>
                        {arc.description}
                    </div>
                )}
            </div>
        </div>
    );
};

interface MainPageProps {
    onSelectArc: (arc: Arc) => void;
}

const MainPage: React.FC<MainPageProps> = ({ onSelectArc }) => {
    React.useEffect(() => {
        document.title = 'Dangai';
    }, []);

    return (
        <div className="container mx-auto max-w-4xl lg:max-w-5xl xl:max-w-6xl px-6 py-4 md:py-8 animate-fadeIn">
            <header className="text-center mb-10 md:mb-12">
                <h1 className="font-cinzel font-normal text-white [text-shadow:0_0_60px_rgba(255,255,255,0.8),0_0_150px_rgba(255,255,255,0.7)] text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl tracking-[0.1em] sm:tracking-[0.15em] lg:tracking-[0.2em] mt-4 md:mt-6">
                    {NOVEL_TITLE}
                </h1>
            </header>
            
            <DecorativeLine variant="main" />

            <main className="text-center mt-8">
                <div className="grid grid-cols-1 gap-8 max-w-xl lg:max-w-2xl mx-auto">
                    {ARCS.map(arc => <ArcCard key={arc.id} arc={arc} onSelect={onSelectArc} />)}
                </div>
            </main>
        </div>
    );
};

export default MainPage;