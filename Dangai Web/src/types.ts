export interface ChapterPart {
    id: number;
    slug: string;
    title: string;
    locked: boolean;
}

export interface Chapter {
    id: number;
    slug: string;
    title: string;
    description?: string;
    locked: boolean;
    parts?: ChapterPart[];
}

export interface Arc {
    id: string;
    slug: string;
    title: string;
    description: string;
    locked: boolean;
    chapters: Chapter[];
}
