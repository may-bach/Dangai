import React, { useState, useEffect } from 'react';
import MainPage from './components/MainPage';
import ArcPage, { ChapterPartsPage } from './components/ArcPage';
import ReaderPage from './components/ReaderPage';
import type { Arc, Chapter, ChapterPart } from './types';
import { ARCS } from './constants';

type View = 'main' | 'arc' | 'chapterParts' | 'reader';

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>('main');
    const [selectedArc, setSelectedArc] = useState<Arc | null>(null);
    const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
    const [selectedPart, setSelectedPart] = useState<ChapterPart | null>(null);

    useEffect(() => {
        const handlePathChange = () => {
            const path = window.location.pathname.replace(/^\/|\/$/g, '').split('/');
            const [arcSlug, chapterSlug, partSlug] = path;

            if (!arcSlug || arcSlug === '') {
                setCurrentView('main');
                setSelectedArc(null);
                setSelectedChapter(null);
                setSelectedPart(null);
                return;
            }

            const arc = ARCS.find(a => a.slug === arcSlug);
            if (!arc) {
                history.pushState({}, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
                return;
            }
            
            if (!chapterSlug) {
                if (arc.id === 'prologue' && arc.chapters.length > 0) {
                    const firstChapter = arc.chapters[0];
                    setCurrentView('chapterParts');
                    setSelectedArc(arc);
                    setSelectedChapter(firstChapter);
                    setSelectedPart(null);
                } else {
                    setCurrentView('arc');
                    setSelectedArc(arc);
                    setSelectedChapter(null);
                    setSelectedPart(null);
                }
                return;
            }

            const chapter = arc.chapters.find(c => c.slug === chapterSlug);
            if (!chapter) {
                history.pushState({}, '', `/${arc.slug}`);
                window.dispatchEvent(new PopStateEvent('popstate'));
                return;
            }

            if (!partSlug) {
                setCurrentView(chapter.parts && chapter.parts.length > 0 ? 'chapterParts' : 'reader');
                setSelectedArc(arc);
                setSelectedChapter(chapter);
                setSelectedPart(null);
                return;
            }
            
            const part = chapter.parts?.find(p => p.slug === partSlug);
            if (!part) {
                history.pushState({}, '', `/${arc.slug}/${chapter.slug}`);
                window.dispatchEvent(new PopStateEvent('popstate'));
                return;
            }

            setCurrentView('reader');
            setSelectedArc(arc);
            setSelectedChapter(chapter);
            setSelectedPart(part);
        };

        handlePathChange();
        window.addEventListener('popstate', handlePathChange);

        return () => {
            window.removeEventListener('popstate', handlePathChange);
        };
    }, []);

    const navigate = (path: string) => {
        history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    const handleSelectArc = (arc: Arc) => {
        if (arc.id === 'prologue' && arc.chapters.length > 0) {
            navigate(`/${arc.slug}/${arc.chapters[0].slug}`);
        } else {
            navigate(`/${arc.slug}`);
        }
    };

    const handleSelectChapter = (arc: Arc, chapter: Chapter) => {
        navigate(`/${arc.slug}/${chapter.slug}`);
    };
    
    const handleSelectPart = (arc: Arc, chapter: Chapter, part: ChapterPart) => {
        navigate(`/${arc.slug}/${chapter.slug}/${part.slug}`);
    };

    const handleReaderNavigate = (arc: Arc, chapter: Chapter, part?: ChapterPart) => {
        if (part) {
            navigate(`/${arc.slug}/${chapter.slug}/${part.slug}`);
        } else {
            navigate(`/${arc.slug}/${chapter.slug}`);
        }
    };

    const handleNavigateUp = () => {
        if (currentView === 'reader') {
            if (selectedPart && selectedArc && selectedChapter) { // From a part, go to parts list
                navigate(`/${selectedArc.slug}/${selectedChapter.slug}`);
            } else if (selectedArc) { // From a chapter without parts, go to arc list
                 navigate(`/${selectedArc.slug}`);
            }
        } else if (currentView === 'chapterParts' && selectedArc) { // From parts list, go to arc list
            if (selectedArc.id === 'prologue') {
                navigate('/');
            } else {
                navigate(`/${selectedArc.slug}`);
            }
        } else if (currentView === 'arc') { // From arc list, go to main page
            navigate('/');
        }
    };

    const renderContent = () => {
        switch (currentView) {
            case 'reader':
                if (selectedArc && selectedChapter) {
                    return <ReaderPage arc={selectedArc} chapter={selectedChapter} part={selectedPart} onBack={handleNavigateUp} onNavigate={handleReaderNavigate} />;
                }
                return <MainPage onSelectArc={handleSelectArc} />;
            case 'chapterParts':
                if (selectedArc && selectedChapter) {
                    return <ChapterPartsPage arc={selectedArc} chapter={selectedChapter} onSelectPart={(part) => handleSelectPart(selectedArc, selectedChapter, part)} onBack={handleNavigateUp} />;
                }
                return <MainPage onSelectArc={handleSelectArc} />;
            case 'arc':
                if (selectedArc) {
                    return <ArcPage arc={selectedArc} onSelectChapter={(chapter) => handleSelectChapter(selectedArc, chapter)} onBack={handleNavigateUp} />;
                }
                return <MainPage onSelectArc={handleSelectArc} />;
            case 'main':
            default:
                return <MainPage onSelectArc={handleSelectArc} />;
        }
    };

    return (
        <div className="min-h-screen bg-black text-neutral-200">
            {renderContent()}
        </div>
    );
};

export default App;