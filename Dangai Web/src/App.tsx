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
        const syncStateFromPath = () => {
            const path = window.location.pathname;
            const pathParts = path.split('/').filter(p => p);

            const setMainView = () => {
                setCurrentView('main');
                setSelectedArc(null);
                setSelectedChapter(null);
                setSelectedPart(null);
            };

            if (pathParts.length === 0) {
                setMainView();
                return;
            }

            const arcSlug = pathParts[0];
            const arc = ARCS.find(a => a.slug === arcSlug);

            if (!arc) {
                setMainView();
                return;
            }

            const setArcView = () => {
                setCurrentView('arc');
                setSelectedArc(arc);
                setSelectedChapter(null);
                setSelectedPart(null);
            };

            if (pathParts.length === 1) {
                setArcView();
                return;
            }

            const chapterIdString = pathParts[1].startsWith('chapter-') ? pathParts[1].substring('chapter-'.length) : null;
            const chapterId = chapterIdString ? parseInt(chapterIdString, 10) : NaN;
            if (isNaN(chapterId)) {
                setArcView();
                return;
            }
            const chapter = arc.chapters.find(c => c.id === chapterId);

            if (!chapter) {
                setArcView();
                return;
            }
            
            const setChapterPartsView = () => {
                setCurrentView('chapterParts');
                setSelectedArc(arc);
                setSelectedChapter(chapter);
                setSelectedPart(null);
            };

            if (pathParts.length === 2) {
                if (chapter.parts && chapter.parts.length > 0) {
                    setChapterPartsView();
                } else {
                    setCurrentView('reader');
                    setSelectedArc(arc);
                    setSelectedChapter(chapter);
                    setSelectedPart(null);
                }
                return;
            }

            if (pathParts.length === 3) {
                const partIdString = pathParts[2].startsWith('part-') ? pathParts[2].substring('part-'.length) : null;
                const partId = partIdString ? parseInt(partIdString, 10) : NaN;
                if(isNaN(partId)) {
                    setChapterPartsView();
                    return;
                }

                const part = chapter.parts?.find(p => p.id === partId);
                if (part) {
                    setCurrentView('reader');
                    setSelectedArc(arc);
                    setSelectedChapter(chapter);
                    setSelectedPart(part);
                    return;
                }
            }

            setArcView();
        };

        syncStateFromPath();

        window.addEventListener('popstate', syncStateFromPath);
        return () => window.removeEventListener('popstate', syncStateFromPath);
    }, []);

    const handleSelectArc = (arc: Arc) => {
        const url = `/${arc.slug}`;
        window.history.pushState({}, '', url);
        setCurrentView('arc');
        setSelectedArc(arc);
        setSelectedChapter(null);
        setSelectedPart(null);
    };

    const handleSelectChapter = (arc: Arc, chapter: Chapter) => {
        const url = `/${arc.slug}/chapter-${chapter.id}`;
        window.history.pushState({}, '', url);
        setSelectedArc(arc);
        setSelectedChapter(chapter);
        setSelectedPart(null);
        if (chapter.parts && chapter.parts.length > 0) {
            setCurrentView('chapterParts');
        } else {
            setCurrentView('reader');
        }
    };
    
    const handleSelectPart = (arc: Arc, chapter: Chapter, part: ChapterPart) => {
        const url = `/${arc.slug}/chapter-${chapter.id}/part-${part.id}`;
        window.history.pushState({}, '', url);
        setSelectedArc(arc);
        setSelectedChapter(chapter);
        setSelectedPart(part);
        setCurrentView('reader');
    };

    const handleReaderNavigate = (arc: Arc, chapter: Chapter, part?: ChapterPart) => {
        const url = part
            ? `/${arc.slug}/chapter-${chapter.id}/part-${part.id}`
            : `/${arc.slug}/chapter-${chapter.id}`;
        window.history.replaceState({}, '', url);
        setSelectedArc(arc);
        setSelectedChapter(chapter);
        setSelectedPart(part || null);
        setCurrentView('reader');
    };

    const handleNavigateUp = () => {
        window.history.back();
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