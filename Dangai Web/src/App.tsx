
import React, { useState, useEffect, useCallback } from 'react';
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

    const navigate = useCallback((path: string) => {
        if (window.location.pathname !== path) {
            history.pushState({}, '', path);
            window.dispatchEvent(new PopStateEvent('popstate'));
        }
    }, []);

    useEffect(() => {
        const handlePathChange = () => {
            const path = window.location.pathname.replace(/^\/|\/$/g, '').split('/');
            const [arcSlug, secondSlug] = path;

            if (!arcSlug) {
                setCurrentView('main');
                setSelectedArc(null);
                setSelectedChapter(null);
                setSelectedPart(null);
                return;
            }

            const arc = ARCS.find(a => a.slug === arcSlug);
            if (!arc) {
                navigate('/');
                return;
            }

            if (!secondSlug) {
                if (arc.id === 'prologue') {
                    setCurrentView('chapterParts');
                    setSelectedArc(arc);
                    setSelectedChapter(arc.chapters[0]); // Prologue has one chapter wrapper
                    setSelectedPart(null);
                } else {
                    setCurrentView('arc');
                    setSelectedArc(arc);
                    setSelectedChapter(null);
                    setSelectedPart(null);
                }
                return;
            }

            if (arc.id === 'prologue') {
                if (secondSlug.startsWith('part-')) {
                    const partId = parseInt(secondSlug.replace('part-', ''), 10);
                    const chapter = arc.chapters[0];
                    const part = chapter.parts?.find(p => p.id === partId);

                    if (part) {
                        setCurrentView('reader');
                        setSelectedArc(arc);
                        setSelectedChapter(chapter);
                        setSelectedPart(part);
                    } else {
                        navigate(`/${arc.slug}`); // Invalid part, go to prologue parts list
                    }
                } else {
                    navigate(`/${arc.slug}`); // Invalid URL for prologue, go to parts list
                }
            } else { // Not prologue
                if (secondSlug.startsWith('chapter-')) {
                    const chapterId = parseInt(secondSlug.replace('chapter-', ''), 10);
                    const chapter = arc.chapters.find(c => c.id === chapterId);
                    
                    if (chapter) {
                        setCurrentView('reader');
                        setSelectedArc(arc);
                        setSelectedChapter(chapter);
                        setSelectedPart(null);
                    } else {
                        navigate(`/${arc.slug}`); // Invalid chapter, go to arc chapter list
                    }
                } else {
                    navigate(`/${arc.slug}`); // Invalid URL for this arc, go to chapter list
                }
            }
        };

        handlePathChange();
        window.addEventListener('popstate', handlePathChange);

        return () => {
            window.removeEventListener('popstate', handlePathChange);
        };
    }, [navigate]);

    const handleSelectArc = (arc: Arc) => {
        navigate(`/${arc.slug}`);
    };

    const handleSelectChapter = (arc: Arc, chapter: Chapter) => {
        navigate(`/${arc.slug}/chapter-${chapter.id}`);
    };
    
    const handleSelectPart = (arc: Arc, chapter: Chapter, part: ChapterPart) => {
        // This is only for the prologue arc
        navigate(`/${arc.slug}/part-${part.id}`);
    };

    const handleReaderNavigate = (arc: Arc, chapter: Chapter, part?: ChapterPart) => {
        if (arc.id === 'prologue' && part) {
            navigate(`/${arc.slug}/part-${part.id}`);
        } else {
            navigate(`/${arc.slug}/chapter-${chapter.id}`);
        }
    };

    const handleNavigateUp = () => {
        if (currentView === 'reader' && selectedArc) {
            navigate(`/${selectedArc.slug}`);
        } else if ((currentView === 'chapterParts' || currentView === 'arc')) {
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
        <div className="min-h-screen bg-black text-neutral-200 overflow-x-hidden">
            {renderContent()}
        </div>
    );
};

export default App;