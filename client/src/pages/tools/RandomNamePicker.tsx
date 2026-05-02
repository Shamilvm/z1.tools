import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Fingerprint } from 'lucide-react';

const RandomNamePicker: React.FC = () => {
  const [input, setInput] = useState('');
  const [picked, setPicked] = useState('');

  const pickRandom = () => {
    const names = input.split('\n').map((name) => name.trim()).filter(Boolean);
    if (names.length === 0) {
      setPicked('Please enter at least one name.');
      return;
    }
    const selected = names[Math.floor(Math.random() * names.length)];
    setPicked(selected);
  };

  return (
    <ToolLayout title="Random Name Picker" description="Fair random name spinner" icon={<Fingerprint size={24} />}>
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative">
          <label className="text-sm font-semibold text-primary-600 mb-2 uppercase tracking-wide">Names (one per line)</label>
          <textarea className="flex-1 w-full bg-white border border-primary-100 rounded-xl p-4 font-mono text-sm focus:ring-2 focus:ring-primary-400/20 focus:border-primary-400 transition-all resize-none shadow-sm" placeholder="Enter required input here..." value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={pickRandom} className="mt-3 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">Pick Random Name</button>
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative group">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Picked Name</label>
          <div className="flex-1 w-full bg-primary-50/50 rounded-xl border border-primary-100 p-4 font-mono text-sm text-primary-900 overflow-auto shadow-inner">
            {picked || 'Awaiting input to generate...'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default RandomNamePicker;