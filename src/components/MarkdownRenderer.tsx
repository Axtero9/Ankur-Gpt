import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { sound } from '../services/sound';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const parts = parseMarkdown(content);

  return (
    <div className="chatgpt-prose space-y-3 leading-relaxed text-[15px] text-[#ececec]">
      {parts.map((part, index) => (
        <React.Fragment key={index}>{renderPart(part, index)}</React.Fragment>
      ))}
    </div>
  );
};

// Part Types
type Part =
  | { type: 'h1' | 'h2' | 'h3'; text: string }
  | { type: 'code'; language: string; code: string }
  | { type: 'blockquote'; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'hr' }
  | { type: 'paragraph'; text: string };

function parseMarkdown(text: string): Part[] {
  const lines = text.split('\n');
  const parts: Part[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced Code Block
    if (line.trim().startsWith('```')) {
      const language = line.trim().replace(/^```/, '').trim() || 'plaintext';
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      parts.push({
        type: 'code',
        language,
        code: codeLines.join('\n')
      });
      i++;
      continue;
    }

    // Horizontal Rule
    if (/^(\*\*\*|---|___)$/.test(line.trim())) {
      parts.push({ type: 'hr' });
      i++;
      continue;
    }

    // Headers
    if (line.startsWith('# ')) {
      parts.push({ type: 'h1', text: line.replace(/^#\s+/, '') });
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      parts.push({ type: 'h2', text: line.replace(/^##\s+/, '') });
      i++;
      continue;
    }
    if (line.startsWith('### ')) {
      parts.push({ type: 'h3', text: line.replace(/^###\s+/, '') });
      i++;
      continue;
    }

    // Blockquote
    if (line.trim().startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      parts.push({ type: 'blockquote', text: quoteLines.join(' ') });
      continue;
    }

    // Markdown Table
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      if (tableLines.length >= 2) {
        const rawHeaders = tableLines[0].split('|').slice(1, -1).map(h => h.trim());
        const dataLines = tableLines.filter((_, idx) => idx !== 1);
        const rows = dataLines.slice(1).map(l => l.split('|').slice(1, -1).map(c => c.trim()));
        parts.push({ type: 'table', headers: rawHeaders, rows });
        continue;
      }
    }

    // Bullet List
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ''));
        i++;
      }
      parts.push({ type: 'ul', items });
      continue;
    }

    // Numbered List
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ''));
        i++;
      }
      parts.push({ type: 'ol', items });
      continue;
    }

    // Regular line or empty
    if (line.trim().length === 0) {
      i++;
      continue;
    }

    // Gather continuous paragraph lines
    const paragraphLines: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim().length > 0 &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('>') &&
      !lines[i].trim().startsWith('|') &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i])
    ) {
      paragraphLines.push(lines[i]);
      i++;
    }

    parts.push({
      type: 'paragraph',
      text: paragraphLines.join(' ')
    });
  }

  return parts;
}

function renderPart(part: Part, index: number) {
  switch (part.type) {
    case 'h1':
      return (
        <h1 className="text-xl md:text-2xl font-semibold text-white mt-4 mb-2">
          {renderInline(part.text)}
        </h1>
      );
    case 'h2':
      return (
        <h2 className="text-lg md:text-xl font-semibold text-white mt-3.5 mb-1.5">
          {renderInline(part.text)}
        </h2>
      );
    case 'h3':
      return (
        <h3 className="text-base font-semibold text-white mt-3 mb-1">
          {renderInline(part.text)}
        </h3>
      );
    case 'code':
      return <CodeBlock key={index} code={part.code} language={part.language} />;
    case 'blockquote':
      return (
        <blockquote className="border-l-2 border-[#555] pl-4 py-1 italic text-[#b4b4b4] my-3">
          {renderInline(part.text)}
        </blockquote>
      );
    case 'table':
      return (
        <div className="overflow-x-auto my-4 rounded-lg border border-[#383838] bg-[#1a1a1a]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#242424] border-b border-[#383838] text-xs text-[#b4b4b4] uppercase">
              <tr>
                {part.headers.map((h, i) => (
                  <th key={i} className="px-4 py-2.5 font-medium">
                    {renderInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2a]">
              {part.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-[#222222] transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-2.5 text-[#ececec]">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'ul':
      return (
        <ul className="space-y-1.5 my-2 pl-5 list-disc text-[#ececec]">
          {part.items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="space-y-1.5 my-2 pl-5 list-decimal text-[#ececec]">
          {part.items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ol>
      );
    case 'hr':
      return <hr className="border-[#333333] my-4" />;
    case 'paragraph':
      return <p className="text-[#ececec] leading-relaxed mb-3">{renderInline(part.text)}</p>;
  }
}

// Inline renderer for **bold**, *italic*, `code`, and [link](url)
function renderInline(text: string): React.ReactNode {
  const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g);

  return tokens.map((token, i) => {
    if (token.startsWith('`') && token.endsWith('`')) {
      return (
        <code
          key={i}
          className="font-mono text-[13px] bg-[#2a2a2a] text-[#ececec] px-1.5 py-0.5 rounded"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    if (token.startsWith('**') && token.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-white">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith('*') && token.endsWith('*')) {
      return (
        <em key={i} className="italic text-[#ececec]">
          {token.slice(1, -1)}
        </em>
      );
    }
    const linkMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline underline-offset-4 hover:text-blue-300 transition-colors"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return token;
  });
}

// Code Block with Copy Feedback
const CodeBlock: React.FC<{ code: string; language: string }> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    sound.playClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 rounded-lg overflow-hidden border border-[#2f2f2f] bg-[#0d0d0d]">
      <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-[#2f2f2f]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#b4b4b4]" />
          <span className="font-mono text-xs text-[#b4b4b4] lowercase">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-[#b4b4b4] hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>

      <pre className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed text-[#ececec]">
        <code>{code}</code>
      </pre>
    </div>
  );
};
