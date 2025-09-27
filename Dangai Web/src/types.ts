export interface Chapter {
    id: number;
    title: string;
    description?: string;
    locked: boolean;
}

export interface Arc {
    id: string;
    slug: string;
    title: string;
    description: string;
    locked: boolean;
    chapters: Chapter[];
}