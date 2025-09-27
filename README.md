# Dangai Web Reader

A sophisticated single-page web application for reading serialized stories online, built with React and Vite. Features a sleek dark interface, dynamic content loading, and a fully organized project structure ready for deployment on Vercel.

## Features

-   **Clean, Dark UI**: A professional dark theme with elegant, readable typography.
-   **Arc & Chapter Navigation**: Organized story structure with smooth client-side routing using React Router.
-   **Markdown Support**: Dynamically loads and parses story content from markdown files.
-   **PDF Export**: Allows users to download individual chapters as well-formatted PDF files.
-   **Mobile Responsive**: Works seamlessly across desktop and mobile devices thanks to Tailwind CSS.
-   **URL-based Navigation**: Deep, bookmarkable links for every chapter with browser back/forward support.

## Tech Stack

-   **Framework**: React
-   **Language**: TypeScript
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS
-   **Routing**: React Router
-   **Deployment**: Vercel
-   **Markdown Parsing**: [Marked.js](https://marked.js.org/)
-   **PDF Generation**: [html2pdf.js](https://github.com/eKoopmans/html2pdf.js)

## Project Structure

The project uses a standard Vite + React structure to separate public assets from source code.

/
├── /public/
│   └── /chapters/
│       └── /first_arc/
│           ├── chapter_1.md
│           └── ...
├── /src/
│   ├── /components/
│   │   ├── ReaderPage.tsx
│   │   └── ...
│   ├── App.tsx
│   └── index.tsx
├── .gitignore
├── index.html
├── package.json
├── vercel.json
└── vite.config.ts

## Setup and Running Locally

1.  **Clone this repository:**
    ```bash
    git clone <your-repo-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd <your-project-folder>
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Adding Content

-   Story content is placed in arc-specific subfolders inside `/public/chapters/`.
-   You can use the included `create.bat` script to automatically generate new chapter files in the correct location with the correct naming convention.

## Deployment

This project is pre-configured for seamless deployment on **Vercel**. The `vercel.json` file is included to handle the necessary rewrites for a single-page application, ensuring that direct navigation to chapter URLs works correctly.

## Images

<img width="2559" height="1439" alt="image" src="https://github.com/user-attachments/assets/fdb2b225-f4fc-4d87-ac28-329e06852493" />

<img width="2559" height="1439" alt="image" src="https://github.com/user-attachments/assets/b18bfe59-d44d-4009-8723-ee7b17a2d5ef" />

<img width="2559" height="1439" alt="image" src="https://github.com/user-attachments/assets/9f4bec3e-2bee-4ea2-82d7-5653286fc9bc" />

## Contributing

Feel free to submit issues and pull requests for the code components. Story content contributions are not accepted.
