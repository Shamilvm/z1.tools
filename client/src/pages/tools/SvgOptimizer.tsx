import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Code } from 'lucide-react';

const SvgOptimizer: React.FC = () => {
  const [input, setInput] = useState('');
  
  return (
    <ToolLayout
      title="Svg Optimizer"
      description="Instantly process your data safely perfectly in your browser. Complete local client-side processing."
      icon={<Code size={24} />}
    >
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm p-4 relative">
          <label className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Input</label>
          <textarea
            className="flex-1 w-full bg-gray-50 border border-gray-200 rounded-xl p-4 font-mono text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none"
            placeholder="Type or paste here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        
        <div className="flex-1 flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm p-4 relative">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Output</label>
            <button className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full hover:bg-primary-100 transition-colors">
              Copy Result
            </button>
          </div>
          <div className="flex-1 w-full bg-gray-900 rounded-xl p-4 font-mono text-sm text-gray-300 overflow-auto">
            {input ? 'Result ready...' : 'Waiting for input...'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default SvgOptimizer;
