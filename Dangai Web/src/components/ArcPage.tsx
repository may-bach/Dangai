import React, { useState, useEffect } from 'react';
import type { Chapter, Arc, ChapterPart } from '../types';
import DecorativeLine from './DecorativeLine';
import { getBookmarkedChaptersForArc, getBookmarkedPartsForChapter } from '../services/bookmarkService';

interface ChapterCardProps {
    chapter: Chapter;
    onSelect: (chapter: Chapter) => void;
    isBookmarked: boolean;
}

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, onSelect, isBookmarked }) => {
    const cardClasses = `
        relative bg-white/5 border border-white/15 rounded-xl p-3 text-center transition-all duration-300
        ${chapter.locked 
            ? 'opacity-40 cursor-not-allowed' 
            : 'cursor-pointer hover:bg-white/10 hover:border-white/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40'
        }
    `;

    return (
        <div className={cardClasses} onClick={() => !chapter.locked && onSelect(chapter)}>
            {isBookmarked && (
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-2.5 right-2.5 h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-label="Bookmarked">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-3.125L5 18V4z" />
                </svg>
            )}
            <div className="font-lora text-sm font-light text-white mb-1 tracking-[0.08em] [text-shadow:0_0_10px_rgba(255,255,255,0.4)]">Chapter {chapter.id}: {chapter.title}</div>
            {chapter.description && (
                 <div className="text-xs text-neutral-400 italic">{chapter.description}</div>
            )}
        </div>
    );
};

interface ArcPageProps {
    arc: Arc;
    onSelectChapter: (chapter: Chapter) => void;
    onBack: () => void;
}

const ArcPage: React.FC<ArcPageProps> = ({ arc, onSelectChapter, onBack }) => {
    const [bookmarkedChapters, setBookmarkedChapters] = useState<Set<number>>(new Set());
    
    useEffect(() => {
        if (arc) {
            document.title = `${arc.title}: ${arc.description} - Dangai`;
            setBookmarkedChapters(getBookmarkedChaptersForArc(arc.id));
        }
    }, [arc]);

    if (!arc) {
        return <div className="text-center p-10">Arc not found.</div>;
    }

    return (
        <div className="container mx-auto max-w-4xl px-6 py-8 md:py-12 animate-fadeIn">
             <button onClick={onBack} className="inline-block bg-gradient-to-br from-neutral-500 to-neutral-700 border border-neutral-400 text-white py-1 px-4 text-sm rounded-lg hover:from-neutral-400 hover:to-neutral-600 transition-transform duration-300 hover:-translate-y-0.5 shadow-lg">
                &larr; Back to Arcs
            </button>

            <section className="text-center mt-12">
                <h2 className="font-playfair text-xl md:text-2xl font-normal text-white mb-4 tracking-[0.1em] [text-shadow:0_0_30px_rgba(255,255,255,0.4),0_0_50px_rgba(255,255,255,0.2)]">
                    {arc.title}: {arc.description}
                </h2>

                <DecorativeLine variant="arc" />

                <div className="grid grid-cols-1 gap-5 max-w-lg mx-auto">
                    {arc.chapters.map(chapter => (
                        <ChapterCard 
                            key={chapter.id} 
                            chapter={chapter} 
                            onSelect={onSelectChapter} 
                            isBookmarked={bookmarkedChapters.has(chapter.id)}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ArcPage;


// New Component for Chapter Parts

interface PartCardProps {
    part: ChapterPart;
    onSelect: (part: ChapterPart) => void;
    isBookmarked: boolean;
}

const PartCard: React.FC<PartCardProps> = ({ part, onSelect, isBookmarked }) => {
    const cardClasses = `
        relative bg-white/5 border border-white/15 rounded-xl p-3 text-center transition-all duration-300
        ${part.locked 
            ? 'opacity-40 cursor-not-allowed' 
            : 'cursor-pointer hover:bg-white/10 hover:border-white/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40'
        }
    `;

    return (
        <div className={cardClasses} onClick={() => !part.locked && onSelect(part)}>
            {isBookmarked && (
                 <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-2.5 right-2.5 h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-label="Bookmarked">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-3.125L5 18V4z" />
                </svg>
            )}
            <div className="font-lora text-sm font-light text-white tracking-[0.08em] [text-shadow:0_0_10px_rgba(255,255,255,0.4)]">{part.title}</div>
        </div>
    );
};

interface ChapterPartsPageProps {
    arc: Arc;
    chapter: Chapter;
    onSelectPart: (part: ChapterPart) => void;
    onBack: () => void;
}

export const ChapterPartsPage: React.FC<ChapterPartsPageProps> = ({ arc, chapter, onSelectPart, onBack }) => {
    const [bookmarkedParts, setBookmarkedParts] = useState<Set<number>>(new Set());

    useEffect(() => {
        if (arc && chapter) {
            document.title = `Chapter ${chapter.id}: ${chapter.title} - Dangai`;
            setBookmarkedParts(getBookmarkedPartsForChapter(arc.id, chapter.id));
        }
    }, [arc, chapter]);

    if (!chapter || !chapter.parts) {
        return <div className="text-center p-10">Chapter parts not found.</div>;
    }

    return (
        <div className="container mx-auto max-w-4xl px-6 py-8 md:py-12 animate-fadeIn">
            <button onClick={onBack} className="inline-block bg-gradient-to-br from-neutral-500 to-neutral-700 border border-neutral-400 text-white py-1 px-4 text-sm rounded-lg hover:from-neutral-400 hover:to-neutral-600 transition-transform duration-300 hover:-translate-y-0.5 shadow-lg">
                &larr; Back to Chapters
            </button>

            <section className="text-center mt-12">
                <h2 className="font-playfair text-xl md:text-2xl font-normal text-white mb-4 tracking-[0.1em] [text-shadow:0_0_30px_rgba(255,255,255,0.4),0_0_50px_rgba(255,255,255,0.2)]">
                    Chapter {chapter.id}: {chapter.title}
                </h2>

                <DecorativeLine variant="arc" />

                <div className="grid grid-cols-1 gap-5 max-w-lg mx-auto">
                    {chapter.parts.map(part => (
                        <PartCard 
                            key={part.id} 
                            part={part} 
                            onSelect={onSelectPart} 
                            isBookmarked={bookmarkedParts.has(part.id)}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};
