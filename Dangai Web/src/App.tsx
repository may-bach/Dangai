import React, { useState } from 'react';
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

    const handleSelectArc = (arc: Arc) => {
        if (arc.id === 'prologue' && arc.chapters.length > 0) {
            const firstChapter = arc.chapters[0];
            setSelectedArc(arc);
            setSelectedChapter(firstChapter);
            setSelectedPart(null);
            setCurrentView('chapterParts');
        } else {
            setCurrentView('arc');
            setSelectedArc(arc);
            setSelectedChapter(null);
            setSelectedPart(null);
        }
    };

    const handleSelectChapter = (arc: Arc, chapter: Chapter) => {
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
        setSelectedArc(arc);
        setSelectedChapter(chapter);
        setSelectedPart(part);
        setCurrentView('reader');
    };

    const handleReaderNavigate = (arc: Arc, chapter: Chapter, part?: ChapterPart) => {
        setSelectedArc(arc);
        setSelectedChapter(chapter);
        setSelectedPart(part || null);
        setCurrentView('reader');
    };

    const handleNavigateUp = () => {
        if (currentView === 'reader') {
            if (selectedPart && selectedArc && selectedChapter) { // From a part, go to parts list
                setCurrentView('chapterParts');
                setSelectedPart(null);
            } else if (selectedArc) { // From a chapter, go to arc list
                setCurrentView('arc');
                setSelectedChapter(null);
                setSelectedPart(null);
            }
        } else if (currentView === 'chapterParts' && selectedArc) { // From parts list, go to arc list
            if (selectedArc.id === 'prologue') {
                setCurrentView('main');
                setSelectedArc(null);
                setSelectedChapter(null);
            } else {
                setCurrentView('arc');
                setSelectedChapter(null);
            }
        } else if (currentView === 'arc') { // From arc list, go to main page
            setCurrentView('main');
            setSelectedArc(null);
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
