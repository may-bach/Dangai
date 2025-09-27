import React from 'react';
import { Link } from 'react-router-dom';
import { ARCS, NOVEL_TITLE } from '../constants';
import type { Arc } from '../types';
import DecorativeLine from './DecorativeLine';

const ArcCard: React.FC<{ arc: Arc }> = ({ arc }) => {
    const cardClasses = `
        bg-white/5 border border-white/15 rounded-2xl p-6 text-center transition-all duration-300
        ${arc.locked 
            ? 'opacity-40 cursor-not-allowed' 
            : 'cursor-pointer hover:bg-white/10 hover:border-white/25 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50'
        }
    `;

    const content = (
        <div className={cardClasses}>
            <div className="font-playfair text-xl md:text-2xl font-semibold text-white mb-4 tracking-[0.2em] md:tracking-[0.25em] [text-shadow:0_0_15px_rgba(255,255,255,0.4)]">{arc.title}</div>
            <div className={`font-serif text-base md:text-lg italic ${arc.locked ? 'text-neutral-500' : 'text-neutral-300'} ${arc.id === 'first_arc' ? 'tracking-[0.15em]' : ''}`}>
                {arc.description}
            </div>
        </div>
    );

    return arc.locked ? content : <Link to={`/${arc.slug}`}>{content}</Link>;
};

const MainPage: React.FC = () => {
    React.useEffect(() => {
        document.title = 'Dangai';
    }, []);

    return (
        <div className="container mx-auto max-w-4xl px-6 py-8 md:py-12 animate-fadeIn">
            <header className="text-center mb-16 md:mb-20">
                <h1 className="font-cinzel font-normal text-white [text-shadow:0_0_60px_rgba(255,255,255,0.8),0_0_150px_rgba(255,255,255,0.7)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.1em] sm:tracking-[0.15em] lg:tracking-[0.2em] mt-8 md:mt-10">
                    {NOVEL_TITLE}
                </h1>
            </header>
            
            <DecorativeLine variant="main" />

            <main className="text-center mt-12">
                <div className="grid grid-cols-1 gap-8 max-w-lg mx-auto">
                    {ARCS.map(arc => <ArcCard key={arc.id} arc={arc} />)}
                </div>
            </main>
        </div>
    );
};

export default MainPage;