import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { Arc, Chapter, ChapterPart } from '../types';
import { getBookmark, setBookmark, removeBookmark } from '../services/bookmarkService';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center p-16">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neutral-300"></div>
    </div>
);

interface ReaderPageProps {
    arc: Arc;
    chapter: Chapter;
    part: ChapterPart | null;
    onBack: () => void;
    onNavigate: (arc: Arc, chapter: Chapter, part?: ChapterPart) => void;
}

const ReaderPage: React.FC<ReaderPageProps> = ({ arc, chapter, part, onBack, onNavigate }) => {
    const [content, setContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showBookmarkPrompt, setShowBookmarkPrompt] = useState<boolean>(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const throttleTimerRef = useRef<number | null>(null);

    const pageTitle = useMemo(() => {
        if (arc.id === 'prologue' && part) {
            return `${arc.title} - ${part.title} - Dangai`;
        }
        
        const chapterString = `Chapter ${chapter.id}: ${chapter.title}`;
        return `${arc.title} - ${chapterString} - Dangai`;
    }, [arc, chapter, part]);

    const headerTitle = useMemo(() => {
        const mainTitle = arc.id === 'prologue' ? arc.title : `Chapter ${chapter.id}: ${chapter.title}`;
        const subTitle = part ? part.title : null;
        return (
            <>
                {mainTitle}
                {subTitle && <span className="reader-subtitle block mt-2 opacity-70">{subTitle}</span>}
            </>
        )
    }, [arc, chapter, part]);

    useEffect(() => {
        const fetchContent = async () => {
            setIsLoading(true);
            setShowBookmarkPrompt(false);
            document.title = `Loading... - Dangai`;

            if (chapter.locked || (part && part.locked)) {
                setContent("<p>This content is currently locked.</p>");
                setIsLoading(false);
                return;
            }

            try {
                let finalContent: string;

                // Prologue content is loaded from individual part files
                if (arc.id === 'prologue' && part) {
                    const contentPath = `/chapters/prologue/part_${part.id}.md`;
                    const response = await fetch(contentPath);
                    if (!response.ok) {
                        throw new Error(`Content not found at ${contentPath}`);
                    }
                    finalContent = await response.text();
                } else {
                    // Other arcs load from a single chapter file
                    const contentPath = chapter.contentFile || `/chapters/${arc.id}/chapter_${chapter.id}.md`;
                    const response = await fetch(contentPath);
                    if (!response.ok) {
                        throw new Error(`Content not found at ${contentPath}`);
                    }
                    const markdownContent = await response.text();

                    // If it's a chapter with parts (but not prologue, which is handled above), extract the relevant part
                    if (part) {
                        const regex = new RegExp(`<!-- PART ${part.id} -->([\\s\\S]*?)(?:<!-- PART ${part.id + 1} -->|$)`, 'i');
                        const match = markdownContent.match(regex);
                        finalContent = match ? match[1].trim() : `<p>Content for Part ${part.id} not found.</p>`;
                    } else {
                        // It's a chapter without parts
                        finalContent = markdownContent;
                    }
                }
                
                const parsedHtml = (window as any).marked.parse(finalContent);
                setContent(parsedHtml);

                const bookmark = getBookmark(arc.id, chapter.id, part?.id);
                setShowBookmarkPrompt(bookmark !== null);

                setTimeout(() => {
                    if (contentRef.current) {
                        const { scrollHeight, clientHeight } = contentRef.current;
                        if (scrollHeight <= clientHeight) {
                            removeBookmark(arc.id, chapter.id, part?.id);
                        }
                    }
                }, 100);

            } catch (error) {
                console.error("Error fetching chapter content:", error);
                setContent("<p>Error: Could not load chapter content. Please try again later.</p>");
            } finally {
                setIsLoading(false);
                document.title = pageTitle;
            }
        };
        
        if(contentRef.current) {
            contentRef.current.scrollTop = 0;
        }

        fetchContent();
    }, [chapter, part, arc, pageTitle]);

    useEffect(() => {
        const contentEl = contentRef.current;
        if (!contentEl || isLoading) return;

        const handleProgressUpdate = () => {
             const { scrollTop, scrollHeight, clientHeight } = contentEl;
             const isAtBottom = scrollHeight - scrollTop - clientHeight < 10;
 
             if (isAtBottom && scrollHeight > clientHeight) {
                 removeBookmark(arc.id, chapter.id, part?.id);
             } else if (scrollTop > 0) {
                 setBookmark(arc.id, chapter.id, scrollTop, part?.id);
             }
        };

        const handleScroll = () => {
            if (throttleTimerRef.current) {
                window.clearTimeout(throttleTimerRef.current);
            }
            throttleTimerRef.current = window.setTimeout(handleProgressUpdate, 500);
        };

        contentEl.addEventListener('scroll', handleScroll);

        return () => {
            contentEl.removeEventListener('scroll', handleScroll);
            if (throttleTimerRef.current) window.clearTimeout(throttleTimerRef.current);
            handleProgressUpdate();
        };
    }, [isLoading, arc, chapter, part]);

    const { prevNav, nextNav } = useMemo(() => {
        let prevNav: { chapter: Chapter, part?: ChapterPart } | null = null;
        let nextNav: { chapter: Chapter, part?: ChapterPart } | null = null;
    
        const unlockedChapters = arc.chapters.filter(c => !c.locked);
        const currentChapterIndex = unlockedChapters.findIndex(c => c.id === chapter.id);

        const getNavigableChapter = (index: number, direction: 'prev' | 'next') => {
            let i = index;
            while(direction === 'prev' ? i >= 0 : i < unlockedChapters.length) {
                const chap = unlockedChapters[i];
                if (chap.parts && chap.parts.length > 0) {
                    const unlockedParts = chap.parts.filter(p => !p.locked);
                    if (unlockedParts.length > 0) return { chapter: chap, parts: unlockedParts };
                } else {
                    return { chapter: chap, parts: [] };
                }
                i += direction === 'prev' ? -1 : 1;
            }
            return null;
        }
    
        if (part && chapter.parts) { // Reading a part
            const unlockedParts = chapter.parts.filter(p => !p.locked);
            const currentPartIndex = unlockedParts.findIndex(p => p.id === part.id);
    
            if (currentPartIndex > 0) {
                prevNav = { chapter, part: unlockedParts[currentPartIndex - 1] };
            } else {
                const prevChapterInfo = getNavigableChapter(currentChapterIndex - 1, 'prev');
                if(prevChapterInfo) {
                    if (prevChapterInfo.parts.length > 0) {
                        prevNav = { chapter: prevChapterInfo.chapter, part: prevChapterInfo.parts[prevChapterInfo.parts.length - 1] };
                    } else {
                        prevNav = { chapter: prevChapterInfo.chapter };
                    }
                }
            }
    
            if (currentPartIndex < unlockedParts.length - 1) {
                nextNav = { chapter, part: unlockedParts[currentPartIndex + 1] };
            } else {
                const nextChapterInfo = getNavigableChapter(currentChapterIndex + 1, 'next');
                if(nextChapterInfo) {
                    if (nextChapterInfo.parts.length > 0) {
                        nextNav = { chapter: nextChapterInfo.chapter, part: nextChapterInfo.parts[0] };
                    } else {
                        nextNav = { chapter: nextChapterInfo.chapter };
                    }
                }
            }
        } else { // Reading a chapter without parts
            const prevChapterInfo = getNavigableChapter(currentChapterIndex - 1, 'prev');
            if(prevChapterInfo) {
                if (prevChapterInfo.parts.length > 0) {
                    prevNav = { chapter: prevChapterInfo.chapter, part: prevChapterInfo.parts[prevChapterInfo.parts.length - 1] };
                } else {
                    prevNav = { chapter: prevChapterInfo.chapter };
                }
            }
            const nextChapterInfo = getNavigableChapter(currentChapterIndex + 1, 'next');
            if(nextChapterInfo) {
                if (nextChapterInfo.parts.length > 0) {
                    nextNav = { chapter: nextChapterInfo.chapter, part: nextChapterInfo.parts[0] };
                } else {
                    nextNav = { chapter: nextChapterInfo.chapter };
                }
            }
        }
    
        return { prevNav, nextNav };
    }, [arc, chapter, part]);

    const handleDownload = async () => {
        if (isLoading) return;
        const fullChapterTitle = pageTitle.replace(' - Dangai', '');
        const contentElement = document.createElement('div');
        contentElement.innerHTML = `<div style="font-family: 'Exo', sans-serif; color: #000; padding: 40px; max-width: 800px; margin: auto; line-height: 1.6;"><h2 style="text-align: center; font-size: 24px; margin-bottom: 20px;">${fullChapterTitle}</h2>${content}</div>`;
        const opt = { margin: 10, filename: `Dangai_${fullChapterTitle.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };
        (window as any).html2pdf().set(opt).from(contentElement).save();
    };

    const handleJumpToBookmark = () => {
        const bookmark = getBookmark(arc.id, chapter.id, part?.id);
        if (contentRef.current && bookmark) {
            contentRef.current.scrollTop = bookmark.scrollPosition;
        }
        setShowBookmarkPrompt(false);
    };
    
    const buttonClasses = "inline-block bg-gradient-to-br from-neutral-500 to-neutral-700 border border-neutral-400 text-white py-2 px-6 rounded-lg hover:from-neutral-400 hover:to-neutral-600 transition-transform duration-300 hover:-translate-y-0.5 shadow-lg min-w-[160px] text-center";
    const backButtonClasses = "inline-block bg-gradient-to-br from-neutral-500 to-neutral-700 border border-neutral-400 text-white py-1.5 px-5 text-sm rounded-lg hover:from-neutral-400 hover:to-neutral-600 transition-transform duration-300 hover:-translate-y-0.5 shadow-lg";

    const NavButton: React.FC<{ nav: { chapter: Chapter, part?: ChapterPart } | null, children: React.ReactNode }> = ({ nav, children }) => {
        if (!nav) return <span className={`${buttonClasses} opacity-50 cursor-not-allowed`}>{children}</span>;
        return <button onClick={() => onNavigate(arc, nav.chapter, nav.part)} className={buttonClasses}>{children}</button>;
    };

    return (
        <div className="w-full min-h-screen px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 animate-fadeIn">
            <div className="reader-page-container mx-auto">
                <div className="w-full mb-8 pt-4">
                    <button onClick={onBack} className={backButtonClasses}>
                        &larr; {chapter.parts ? 'Back to Parts' : 'Back to Chapters'}
                    </button>
                </div>

                <header className="text-center mb-12">
                    <h1 className="reader-title font-exo font-extralight text-3xl md:text-4xl text-white [text-shadow:0_0_25px_rgba(255,255,255,0.3)] tracking-[0.1em]">
                        {headerTitle}
                    </h1>
                </header>

                <div ref={contentRef} id="chapterContent" className="relative font-exo font-light bg-[rgba(30,30,30,0.95)] text-neutral-200 rounded-xl p-6 md:p-10 lg:p-12 border border-white/10 shadow-2xl shadow-black/50 w-full max-h-[80vh] overflow-y-auto reader-content">
                    {showBookmarkPrompt && (
                        <div className="sticky top-0 z-10 bg-black/70 backdrop-blur-sm p-4 mb-4 flex flex-col sm:flex-row sm:justify-between items-center gap-3 animate-fadeIn rounded-lg border border-yellow-500/30 text-center sm:text-left">
                            <p className="text-lg text-yellow-300">Jump to your last reading position?</p>
                            <div className="flex-shrink-0">
                                <button onClick={handleJumpToBookmark} className="bg-yellow-500/80 text-black font-bold py-2 px-5 rounded-md mr-2 hover:bg-yellow-400 transition-colors text-base">Jump</button>
                                <button onClick={() => setShowBookmarkPrompt(false)} className="bg-neutral-600/80 text-white py-2 px-5 rounded-md hover:bg-neutral-500 transition-colors text-base">Dismiss</button>
                            </div>
                        </div>
                    )}
                    {isLoading ? <LoadingSpinner /> : <div dangerouslySetInnerHTML={{ __html: content }} />}
                </div>
                
                <div className="flex justify-center items-center gap-4 md:gap-6 mt-8 flex-wrap">
                    <NavButton nav={prevNav}>&larr; Previous</NavButton>
                    <button onClick={handleDownload} className={buttonClasses}>Download</button>
                    <NavButton nav={nextNav}>Next &rarr;</NavButton>
                </div>
            </div>
        </div>
    );
};

export default ReaderPage;