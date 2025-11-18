"use client";

import { useState } from "react";
import MarkdownEditor from "@/components/MarkdownEditor";
import MarkdownPreview from "@/components/MarkdownPreview";
import PDFExportButton from "@/components/PDFExportButton";

export default function Home() {
  const [markdown, setMarkdown] = useState("");

  return (
    <main className="h-screen flex flex-col bg-[#2a2a2a]">
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane - Editor */}
        <div className="w-1/2 border-r border-[#3a3a3a] flex flex-col">
          <div className="bg-[#1a1a1a] border-b border-[#3a3a3a] px-4 h-12 flex items-center">
            <h2 className="text-sm font-semibold text-[#e0e0e0]">Editor</h2>
          </div>
          <div className="flex-1 overflow-hidden">
            <MarkdownEditor value={markdown} onChange={setMarkdown} />
          </div>
        </div>

        {/* Right Pane - Preview */}
        <div className="w-1/2 flex flex-col relative">
          <div className="bg-[#1a1a1a] border-b border-[#3a3a3a] px-4 h-12 flex justify-between items-center">
            <h2 className="text-sm font-semibold text-[#e0e0e0]">Preview</h2>
            <PDFExportButton previewElementId="markdown-preview" />
          </div>
          <div className="flex-1 overflow-hidden">
            <MarkdownPreview content={markdown} />
          </div>
        </div>
      </div>
    </main>
  );
}

