import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ARCS } from '../constants';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center p-16">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neutral-300"></div>
    </div>
);

const ReaderPage: React.FC = () => {
    const { arcSlug, chapterSlug } = useParams<{ arcSlug: string, chapterSlug: string }>();
    const navigate = useNavigate();

    const [content, setContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { arc, chapter, availableChapters, currentIndex } = useMemo(() => {
        const currentArc = ARCS.find(a => a.slug === arcSlug);
        if (!currentArc) return { arc: undefined, chapter: undefined, availableChapters: [], currentIndex: -1 };
        
        const chapterId = parseInt(chapterSlug?.split('-').pop() || '', 10);
        if (isNaN(chapterId)) return { arc: undefined, chapter: undefined, availableChapters: [], currentIndex: -1 };

        const currentChapter = currentArc.chapters.find(c => c.id === chapterId);
        const unlockedChapters = currentArc.chapters.filter(c => !c.locked);
        const currentChapterIndex = unlockedChapters.findIndex(c => c.id === chapterId);
        
        return {
            arc: currentArc,
            chapter: currentChapter,
            availableChapters: unlockedChapters,
            currentIndex: currentChapterIndex
        };
    }, [arcSlug, chapterSlug]);

    useEffect(() => {
        if (!chapter || !arc) {
            setContent("<p>Chapter not found.</p>");
            setIsLoading(false);
            return;
        }

        if (chapter.locked) {
            setContent("<p>This chapter is currently locked.</p>");
            setIsLoading(false);
            return;
        }

        const fetchContent = async () => {
            setIsLoading(true);
            document.title = `Loading... - Dangai`;
            try {
                const response = await fetch(`/chapters/${arc.id}/chapter_${chapter.id}.md`);
                if (!response.ok) {
                    throw new Error(`Chapter content not found at /chapters/${arc.id}/chapter_${chapter.id}.md`);
                }
                const markdownContent = await response.text();
                const parsedHtml = (window as any).marked.parse(markdownContent);
                setContent(parsedHtml);
            } catch (error) {
                console.error("Error fetching chapter content:", error);
                setContent("<p>Error: Could not load chapter content. Please try again later.</p>");
            } finally {
                setIsLoading(false);
                document.title = `Chapter ${chapter.id}: ${chapter.title} - Dangai`;
            }
        };

        fetchContent();
    }, [chapter, arc]);

    const handleDownload = async () => {
        if (!chapter || isLoading) return;

        const fullChapterTitle = `Chapter ${chapter.id}: ${chapter.title}`;

        const contentElement = document.createElement('div');
        contentElement.innerHTML = `
            <div style="font-family: 'Exo', sans-serif; color: #000; padding: 40px; max-width: 800px; margin: auto; line-height: 1.6;">
                <h2 style="text-align: center; font-size: 24px; margin-bottom: 20px;">${fullChapterTitle}</h2>
                ${content}
            </div>
        `;

        const opt = {
            margin: 10,
            filename: `Dangai_${fullChapterTitle.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        (window as any).html2pdf().set(opt).from(contentElement).save();
    };

    const prevChapter = currentIndex > 0 ? availableChapters[currentIndex - 1] : null;
    const nextChapter = currentIndex < availableChapters.length - 1 ? availableChapters[currentIndex + 1] : null;
    
    const buttonClasses = "inline-block bg-gradient-to-br from-neutral-500 to-neutral-700 border border-neutral-400 text-white py-2 px-6 rounded-lg hover:from-neutral-400 hover:to-neutral-600 transition-transform duration-300 hover:-translate-y-0.5 shadow-lg min-w-[160px] text-center";
    const backButtonClasses = "inline-block bg-gradient-to-br from-neutral-500 to-neutral-700 border border-neutral-400 text-white py-1.5 px-5 text-sm rounded-lg hover:from-neutral-400 hover:to-neutral-600 transition-transform duration-300 hover:-translate-y-0.5 shadow-lg";


    const NavButton: React.FC<{ to: string | null, children: React.ReactNode }> = ({ to, children }) => {
        if (!to) {
            return <span className={`${buttonClasses} opacity-50 cursor-not-allowed`}>{children}</span>
        }
        return <Link to={to} className={buttonClasses}>{children}</Link>;
    };

    return (
        <div className="w-full min-h-screen p-4 sm:p-6 md:p-8 animate-fadeIn">
            <div className="max-w-screen-2xl mx-auto mb-8 pt-4">
                <Link to={`/${arcSlug}`} className={backButtonClasses}>
                    &larr; Back to Chapters
                </Link>
            </div>

            <header className="text-center mb-12">
                <h1 className="font-exo font-extralight text-3xl md:text-4xl text-white [text-shadow:0_0_25px_rgba(255,255,255,0.3)] tracking-[0.1em]">
                    {chapter ? `Chapter ${chapter.id}: ${chapter.title}` : 'Chapter'}
                </h1>
            </header>

            <div id="chapterContent" className="font-exo font-light bg-[rgba(30,30,30,0.95)] text-neutral-200 rounded-xl p-6 md:p-10 lg:p-12 border border-white/10 shadow-2xl shadow-black/50 max-w-screen-2xl mx-auto max-h-[80vh] overflow-y-auto reader-content">
                {isLoading ? <LoadingSpinner /> : <div dangerouslySetInnerHTML={{ __html: content }} />}
            </div>
            
            <div className="flex justify-center items-center gap-4 md:gap-6 mt-8 flex-wrap">
                <NavButton to={prevChapter ? `/${arcSlug}/chapter-${prevChapter.id}` : null}>&larr; Previous</NavButton>
                <button onClick={handleDownload} className={buttonClasses}>
                    Download
                </button>
                <NavButton to={nextChapter ? `/${arcSlug}/chapter-${nextChapter.id}` : null}>Next &rarr;</NavButton>
            </div>
        </div>
    );
};

export default ReaderPage;