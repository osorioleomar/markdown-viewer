"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import remarkEmoji from "remark-emoji";
import remarkFootnotes from "remark-footnotes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownPreviewProps {
  content: string;
}

export default function MarkdownPreview({ content }: MarkdownPreviewProps) {
  return (
    <div className="w-full h-full overflow-auto p-6 bg-white text-gray-900">
      <div className="prose max-w-none" id="markdown-preview">
        <ReactMarkdown
          remarkPlugins={[
            remarkGfm,
            remarkSmartypants,
            remarkEmoji,
            remarkFootnotes,
          ]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneLight}
                  language={match[1]}
                  PreTag="div"
                  className="bg-gray-50 p-4 my-4 border border-gray-200"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code
                  className="bg-gray-100 px-1.5 py-0.5 text-gray-900 border border-gray-200"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            h1: ({ node, ...props }) => (
              <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 border-b border-gray-300 pb-2" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-900 border-b border-gray-300 pb-2" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-xl font-bold mt-4 mb-2 text-gray-900" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="mb-4 text-gray-900 leading-relaxed" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc mb-4 text-gray-900 space-y-1 ml-6" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal mb-4 text-gray-900 space-y-1 ml-6" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="text-gray-900" {...props} />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="border-l-4 border-gray-400 pl-4 my-4 italic text-gray-700 bg-gray-50 py-2"
                {...props}
              />
            ),
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full border-collapse border border-gray-300" {...props} />
              </div>
            ),
            thead: ({ node, ...props }) => (
              <thead className="bg-gray-100" {...props} />
            ),
            tbody: ({ node, ...props }) => (
              <tbody {...props} />
            ),
            tr: ({ node, ...props }) => (
              <tr className="border-b border-gray-300" {...props} />
            ),
            th: ({ node, ...props }) => (
              <th className="border border-gray-300 px-4 py-2 text-left font-bold text-gray-900" {...props} />
            ),
            td: ({ node, ...props }) => (
              <td className="border border-gray-300 px-4 py-2 text-gray-900" {...props} />
            ),
            a: ({ node, ...props }) => (
              <a className="text-blue-600 hover:text-blue-800 underline" {...props} />
            ),
            hr: ({ node, ...props }) => (
              <hr className="border-t border-gray-300 my-6" {...props} />
            ),
            strong: ({ node, ...props }) => (
              <strong className="font-bold text-gray-900" {...props} />
            ),
            em: ({ node, ...props }) => (
              <em className="italic text-gray-900" {...props} />
            ),
            del: ({ node, ...props }) => (
              <del className="line-through text-gray-500" {...props} />
            ),
            // Support for images
            img: ({ node, ...props }) => (
              <img className="max-w-full h-auto my-4 rounded" {...props} />
            ),
            // Support for footnotes
            section: ({ node, ...props }: any) => {
              if (props.className === "footnotes") {
                return (
                  <section className="mt-8 pt-4 border-t border-gray-300 text-sm text-gray-600" {...props} />
                );
              }
              return <section {...props} />;
            },
          }}
        >
          {content || "Your markdown preview will appear here..."}
        </ReactMarkdown>
      </div>
    </div>
  );
}

