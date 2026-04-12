import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Code } from 'lucide-react';

const RegexTester: React.FC = () => {
  const [input, setInput] = useState('');

  return (
    <ToolLayout title="Regex Tester" description="Test regular expressions" icon={<Code size={24} />}> 
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative">
          <label className="text-sm font-semibold text-primary-600 mb-2 uppercase tracking-wide">Configuration / Input</label>
          <textarea className="flex-1 w-full bg-white border border-primary-100 rounded-xl p-4 font-mono text-sm focus:ring-2 focus:ring-primary-400/20 focus:border-primary-400 transition-all resize-none shadow-sm" placeholder="Enter required input here..." value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative group">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Output View</label>
            <button className="text-xs font-semibold text-white bg-primary-600 px-4 py-1.5 rounded-full hover:bg-primary-700 hover:shadow-lg shadow-primary-600/30 transition-all">Copy Result</button>
          </div>
          <div className="flex-1 w-full bg-primary-50/50 rounded-xl border border-primary-100 p-4 font-mono text-sm text-primary-900 overflow-auto shadow-inner">
            {input ? 'Result will be generated here...' : 'Awaiting input to generate...'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default RegexTester;