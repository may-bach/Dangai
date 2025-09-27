import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ARCS } from '../constants';
import type { Chapter } from '../types';
import DecorativeLine from './DecorativeLine';

const ChapterCard: React.FC<{ chapter: Chapter; arcSlug: string }> = ({ chapter, arcSlug }) => {
    const cardClasses = `
        bg-white/5 border border-white/15 rounded-xl p-3 text-center transition-all duration-300
        ${chapter.locked 
            ? 'opacity-40 cursor-not-allowed' 
            : 'cursor-pointer hover:bg-white/10 hover:border-white/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40'
        }
    `;

    const content = (
        <div className={cardClasses}>
            <div className="font-lora text-sm font-light text-white mb-1 tracking-[0.08em] [text-shadow:0_0_10px_rgba(255,255,255,0.4)]">Chapter {chapter.id}: {chapter.title}</div>
            {chapter.description && (
                 <div className="text-xs text-neutral-400 italic">{chapter.description}</div>
            )}
        </div>
    );

    return chapter.locked ? content : <Link to={`/${arcSlug}/chapter-${chapter.id}`}>{content}</Link>;
};

const ArcPage: React.FC = () => {
    const { arcSlug } = useParams<{ arcSlug: string }>();
    const arc = ARCS.find(a => a.slug === arcSlug);

    React.useEffect(() => {
        if (arc) {
            document.title = `${arc.title}: ${arc.description} - Dangai`;
        }
    }, [arc]);

    if (!arc) {
        return <div className="text-center p-10">Arc not found.</div>;
    }

    return (
        <div className="container mx-auto max-w-4xl px-6 py-8 md:py-12 animate-fadeIn">
             <Link to="/" className="inline-block bg-gradient-to-br from-neutral-500 to-neutral-700 border border-neutral-400 text-white py-1 px-4 text-sm rounded-lg hover:from-neutral-400 hover:to-neutral-600 transition-transform duration-300 hover:-translate-y-0.5 shadow-lg">
                &larr; Back to Arcs
            </Link>

            <section className="text-center mt-12">
                <h2 className="font-playfair text-xl md:text-2xl font-normal text-white mb-4 tracking-[0.1em] [text-shadow:0_0_30px_rgba(255,255,255,0.4),0_0_50px_rgba(255,255,255,0.2)]">
                    {arc.title}: {arc.description}
                </h2>

                <DecorativeLine variant="arc" />

                <div className="grid grid-cols-1 gap-5 max-w-lg mx-auto">
                    {arc.chapters.map(chapter => (
                        <ChapterCard key={chapter.id} chapter={chapter} arcSlug={arcSlug!} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ArcPage;