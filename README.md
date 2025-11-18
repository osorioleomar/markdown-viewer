# Markdown Preview Application

A Next.js application for previewing Markdown and exporting it as a professional PDF.

## Features

- **Split-pane Interface**: Edit markdown on the left, see live preview on the right
- **Full Markdown Support**: Tables, code blocks, lists, headings, and more via GitHub Flavored Markdown
- **Syntax Highlighting**: Code blocks with syntax highlighting
- **PDF Export**: Export your markdown preview as a professional PDF file
- **Dark Theme**: Modern dark gray theme with flat design

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

1. Push your code to a Git repository
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and deploy

## Technology Stack

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **react-markdown** - Markdown rendering
- **remark-gfm** - GitHub Flavored Markdown support
- **react-syntax-highlighter** - Code syntax highlighting
- **jsPDF** - PDF generation
- **html2canvas** - HTML to canvas conversion

## Usage

1. Type or paste your markdown in the left editor pane
2. View the rendered preview in the right pane
3. Click "Save as PDF" to download the preview as a PDF file

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main application page
│   └── globals.css         # Global styles
├── components/
│   ├── MarkdownEditor.tsx  # Left pane editor
│   ├── MarkdownPreview.tsx # Right pane preview
│   └── PDFExportButton.tsx # PDF export functionality
└── package.json
```

