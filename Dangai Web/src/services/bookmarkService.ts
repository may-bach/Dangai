
export interface Bookmark {
    scrollPosition: number;
}

const BOOKMARKS_KEY = 'dangai-bookmarks';

const getBookmarks = (): Record<string, Bookmark> => {
    try {
        const bookmarks = localStorage.getItem(BOOKMARKS_KEY);
        return bookmarks ? JSON.parse(bookmarks) : {};
    } catch (error) {
        console.error("Error reading bookmarks from localStorage", error);
        return {};
    }
};

const saveBookmarks = (bookmarks: Record<string, Bookmark>) => {
    try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    } catch (error) {
        console.error("Error saving bookmarks to localStorage", error);
    }
};

const buildKey = (arcId: string, chapterId: number, partId?: number) => {
    return partId ? `${arcId}-${chapterId}-${partId}` : `${arcId}-${chapterId}`;
};

export const getBookmark = (arcId: string, chapterId: number, partId?: number): Bookmark | null => {
    const bookmarks = getBookmarks();
    const key = buildKey(arcId, chapterId, partId);
    return bookmarks[key] || null;
};

export const setBookmark = (arcId: string, chapterId: number, scrollPosition: number, partId?: number) => {
    const key = buildKey(arcId, chapterId, partId);
    // Create a new bookmark object that will overwrite any existing bookmarks.
    const newBookmark = { [key]: { scrollPosition } };
    saveBookmarks(newBookmark);
};

export const removeBookmark = (arcId: string, chapterId: number, partId?: number) => {
    const bookmarks = getBookmarks();
    const key = buildKey(arcId, chapterId, partId);
    delete bookmarks[key];
    saveBookmarks(bookmarks);
};

export const getBookmarkedChaptersForArc = (arcId: string): Set<number> => {
    const bookmarks = getBookmarks();
    const bookmarkedChapters = new Set<number>();
    for (const key in bookmarks) {
        if (key.startsWith(`${arcId}-`)) {
            const chapterIdString = key.split('-')[1];
            if (chapterIdString) {
                const chapterId = parseInt(chapterIdString, 10);
                if (!isNaN(chapterId)) {
                    bookmarkedChapters.add(chapterId);
                }
            }
        }
    }
    return bookmarkedChapters;
};

export const getBookmarkedPartsForChapter = (arcId: string, chapterId: number): Set<number> => {
    const bookmarks = getBookmarks();
    const bookmarkedParts = new Set<number>();
    const prefix = `${arcId}-${chapterId}-`;
    for (const key in bookmarks) {
        if (key.startsWith(prefix)) {
            const partId = parseInt(key.substring(prefix.length), 10);
            if (!isNaN(partId)) {
                bookmarkedParts.add(partId);
            }
        }
    }
    return bookmarkedParts;
};