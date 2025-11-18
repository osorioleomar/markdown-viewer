"use client";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const placeholder = `# Welcome to Markdown Preview

## Features

- **Bold text** and *italic text*
- Lists and tables
- Code blocks with syntax highlighting
- And much more!

### Example Table

| Feature | Status |
|---------|--------|
| Tables  | ✅     |
| Code    | ✅     |
| Lists   | ✅     |

### Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Task List

- [x] Completed task
- [ ] Pending task

> This is a blockquote

---

Start typing your markdown here...`;

  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-full p-6 bg-[#1a1a1a] text-[#e0e0e0] border-none outline-none resize-none font-mono text-sm leading-relaxed"
      style={{ fontFamily: 'monospace' }}
    />
  );
}

