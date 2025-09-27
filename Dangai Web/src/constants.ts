import type { Arc } from './types';

export const ARCS: Arc[] = [
    {
        id: "first_arc",
        slug: "first-arc",
        title: "First Arc",
        description: "The Hollow Soul",
        locked: false,
        chapters: [
            { id: 1, title: "College Life", locked: true },
            { id: 2, title: "Shura", locked: false },
            { id: 3, title: "The Beginning", locked: false },
            { id: 4, title: "Where Nothing Exists", locked: false },
            { id: 5, title: "In Exchange For A Heart", locked: false },
            { id: 6, title: "The One Who Returned", locked: false },
            { id: 7, title: "Frosty Hero", locked: false },
            { id: 8, title: "Just Another Day", locked: false },
            { id: 9, title: "A Seat at the Table", locked: false },
            { id: 10, title: "The Unwilling Recruit", locked: false },
            { id: 11, title: "The Blade of Choice", locked: false },
            { id: 12, title: "Coming Soon", locked: true },
        ]
    },
    {
        id: "second_arc",
        slug: "second-arc",
        title: "Second Arc",
        description: "Coming Soon",
        locked: true,
        chapters: []
    },
    {
        id: "third_arc",
        slug: "third-arc",
        title: "Third Arc",
        description: "Coming Soon",
        locked: true,
        chapters: []
    }
];

export const NOVEL_TITLE = "D A N G A I";