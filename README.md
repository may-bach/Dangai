# Dangai Web Reader

A sophisticated single-page web application for reading serialized stories online. Features a sleek dark interface, smooth navigation between arcs and chapters, and dynamic markdown content loading.

## Features

- **Clean, Dark UI**: Professional dark theme with elegant typography
- **Arc & Chapter Navigation**: Organized story structure with smooth transitions  
- **Markdown Support**: Dynamic loading of story content from markdown files
- **PDF Export**: Download individual chapters as PDF files
- **Mobile Responsive**: Works seamlessly across desktop and mobile devices
- **URL-based Navigation**: Bookmarkable chapter links with browser back/forward support
- **Loading States**: Smooth content transitions with loading indicators

## Tech Stack

- Pure HTML5, CSS3, and vanilla JavaScript
- [Marked.js](https://marked.js.org/) for markdown parsing
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) for PDF generation
- Google Fonts (Crimson Text, Playfair Display, Exo)

## Project Structure
/
├── index.html          # Main application file
├── /chapters/          # Markdown story files
│   ├── chapter_1.md
│   ├── chapter_2.md
│   └── ...
└── README.md



## Setup

1. Clone this repository
2. Create a `/chapters` folder
3. Add your story content as markdown files (`chapter_1.md`, `chapter_2.md`, etc.)
4. Serve via any web server (no build process required)

## Customization

- **Styling**: Modify CSS variables for colors, fonts, and layout
- **Content**: Replace markdown files with your own story
- **Navigation**: Update chapter names in the `chapterNames` object
- **Branding**: Change the title and arc names in the HTML

## Demo

Visit the live demo: dangai-web.netlify.app

## Images

<img width="2559" height="1350" alt="image" src="https://github.com/user-attachments/assets/ddd282f6-c508-44e0-b46c-fafd96653f79" />

<img width="2559" height="1348" alt="image" src="https://github.com/user-attachments/assets/02468c75-04d1-48c9-b982-84379369a800" />

<img width="2559" height="1348" alt="image" src="https://github.com/user-attachments/assets/92bcc3f1-c9c4-40b8-8bb8-f4d37cc75eaf" />

## Contributing

Feel free to submit issues and pull requests for the code components. Story content contributions are not accepted.
