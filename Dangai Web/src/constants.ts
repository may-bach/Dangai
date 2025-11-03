import type { Arc } from './types';

export const ARCS: Arc[] = [
    {
        id: "prologue",
        slug: "prologue",
        title: "Prologue",
        description: "The Day It All Began",
        locked: false,
        chapters: [
            { 
                id: 1, 
                slug: "the-day-it-all-began",
                title: "Prologue",
                locked: false,
                parts: [
                    { id: 1, slug: "part-1-a-normal-day", title: "Part 1: A Normal Day", locked: false },
                    { id: 2, slug: "part-2-the-test", title: "Part 2: The Fest", locked: false },
                    { id: 3, slug: "part-3-the-explosion", title: "Part 3: Assisstant", locked: false },
                    { id: 4, slug: "part-4-chaos", title: "Part 4: Chaos", locked: false },
                    { id: 5, slug: "part-5-a-demon", title: "Part 5: A Demon", locked: false },
                    { id: 6, slug: "part-6-laughter", title: "Part 6: Laughter", locked: false },
                    { id: 7, slug: "part-7-shura", title: "Part 7: Shura", locked: false },
                    { id: 8, slug: "part-8-to-be-continued", title: "Part 8: To Be Continued", locked: false },
                ]
            },
        ]
    },
    {
        id: "first_arc",
        slug: "first-arc",
        title: "First Arc",
        description: "The Hollow Soul",
        locked: true,
        chapters: [
            { id: 1, slug: "shura", title: "Shura", locked: false },
            { id: 2, slug: "the-beginning", title: "The Beginning", locked: false },
            { id: 3, slug: "where-nothing-exists", title: "Where Nothing Exists", locked: false },
            { id: 4, slug: "in-exchange-for-a-heart", title: "In Exchange For A Heart", locked: false },
            { id: 5, slug: "the-one-who-returned", title: "The One Who Returned", locked: false },
            { id: 6, slug: "frosty-hero", title: "Frosty Hero", locked: false },
            { id: 7, slug: "just-another-day", "title": "Just Another Day", locked: false },
            { id: 8, slug: "a-seat-at-the-table", title: "A Seat at the Table", locked: false },
            { id: 9, slug: "the-unwilling-recruit", title: "The Unwilling Recruit", locked: false },
            { id: 10, slug: "the-blade-of-choice", title: "The Blade of Choice", locked: false },
            { id: 11, slug: "coming-soon", title: "Coming Soon", locked: true },
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