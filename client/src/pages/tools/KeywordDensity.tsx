import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Activity } from 'lucide-react';

const KeywordDensity: React.FC = () => {
  const [input, setInput] = useState('');
  const words = input.toLowerCase().match(/\b[a-z0-9]+\b/g) ?? [];
  const total = words.length;
  const frequencies = words.reduce<Record<string, number>>((acc, word) => {
    acc[word] = (acc[word] ?? 0) + 1;
    return acc;
  }, {});
  const top = Object.entries(frequencies).sort((a, b) => b[1] - a[1]).slice(0, 10);

  return (
    <ToolLayout title="Keyword Density" description="Check keyword density instantly" icon={<Activity size={24} />}> 
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative">
          <label className="text-sm font-semibold text-primary-600 mb-2 uppercase tracking-wide">Configuration / Input</label>
          <textarea className="flex-1 w-full bg-white border border-primary-100 rounded-xl p-4 font-mono text-sm focus:ring-2 focus:ring-primary-400/20 focus:border-primary-400 transition-all resize-none shadow-sm" placeholder="Enter required input here..." value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative group">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Output View</label>
          <div className="flex-1 w-full bg-primary-50/50 rounded-xl border border-primary-100 p-4 font-mono text-sm text-primary-900 overflow-auto shadow-inner">
            {total === 0 ? (
              'Awaiting input to generate...'
            ) : (
              <div className="space-y-1">
                <p>Total words: {total}</p>
                {top.map(([word, count]) => (
                  <p key={word}>
                    {word}: {count} ({((count / total) * 100).toFixed(2)}%)
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default KeywordDensity;