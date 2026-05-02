import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Globe } from 'lucide-react';

const HashtagGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const output = input
    ? input
        .split(/[,\n]/)
        .map((word) => word.trim().replace(/[^a-zA-Z0-9 ]/g, ''))
        .filter(Boolean)
        .map((word) => `#${word.replace(/\s+/g, '')}`)
        .join(' ')
    : 'Awaiting input to generate...';

  return (
    <ToolLayout title="Hashtag Generator" description="Social media hashtag generator" icon={<Globe size={24} />}> 
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative">
          <label className="text-sm font-semibold text-primary-600 mb-2 uppercase tracking-wide">Configuration / Input</label>
          <textarea className="flex-1 w-full bg-white border border-primary-100 rounded-xl p-4 font-mono text-sm focus:ring-2 focus:ring-primary-400/20 focus:border-primary-400 transition-all resize-none shadow-sm" placeholder="Enter required input here..." value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative group">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Output View</label>
          <div className="flex-1 w-full bg-primary-50/50 rounded-xl border border-primary-100 p-4 font-mono text-sm text-primary-900 overflow-auto shadow-inner">
            {output}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default HashtagGenerator;