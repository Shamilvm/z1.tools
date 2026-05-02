import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Code } from 'lucide-react';

const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [input, setInput] = useState('');

  const result = (() => {
    if (!pattern) return 'Enter a regex pattern.';
    try {
      const regex = new RegExp(pattern, flags);
      const matches = Array.from(input.matchAll(regex)).map((match) => ({
        value: match[0],
        index: match.index ?? 0,
      }));
      return matches.length ? JSON.stringify(matches, null, 2) : 'No matches found.';
    } catch (error) {
      return `Regex error: ${(error as Error).message}`;
    }
  })();

  return (
    <ToolLayout title="Regex Tester" description="Test regular expressions" icon={<Code size={24} />}> 
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative">
          <label className="text-sm font-semibold text-primary-600 mb-2 uppercase tracking-wide">Pattern</label>
          <input value={pattern} onChange={(e) => setPattern(e.target.value)} className="w-full border border-primary-100 rounded-xl p-3 text-sm mb-2" placeholder="e.g. \\b\\w{4}\\b" />
          <input value={flags} onChange={(e) => setFlags(e.target.value)} className="w-full border border-primary-100 rounded-xl p-3 text-sm mb-2" placeholder="Flags e.g. gi" />
          <label className="text-sm font-semibold text-primary-600 mb-2 uppercase tracking-wide">Input Text</label>
          <textarea className="flex-1 w-full bg-white border border-primary-100 rounded-xl p-4 font-mono text-sm focus:ring-2 focus:ring-primary-400/20 focus:border-primary-400 transition-all resize-none shadow-sm" placeholder="Enter required input here..." value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative group">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Output View</label>
          <div className="flex-1 w-full bg-primary-50/50 rounded-xl border border-primary-100 p-4 font-mono text-sm text-primary-900 overflow-auto shadow-inner">
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default RegexTester;