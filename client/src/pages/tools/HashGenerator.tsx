import React, { useMemo, useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Fingerprint } from 'lucide-react';

const HashGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState<'SHA-1' | 'SHA-256' | 'SHA-512'>('SHA-256');
  const [result, setResult] = useState('');

  const encoder = useMemo(() => new TextEncoder(), []);

  const generateHash = async () => {
    if (!input) {
      setResult('Please provide text to hash.');
      return;
    }
    const buffer = await crypto.subtle.digest(algorithm, encoder.encode(input));
    const hash = Array.from(new Uint8Array(buffer)).map((value) => value.toString(16).padStart(2, '0')).join('');
    setResult(hash);
  };

  return (
    <ToolLayout title="Hash Generator" description="Generate SHA hashes instantly" icon={<Fingerprint size={24} />}>
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative">
          <label className="text-sm font-semibold text-primary-600 mb-2 uppercase tracking-wide">Configuration / Input</label>
          <textarea className="flex-1 w-full bg-white border border-primary-100 rounded-xl p-4 font-mono text-sm focus:ring-2 focus:ring-primary-400/20 focus:border-primary-400 transition-all resize-none shadow-sm" placeholder="Enter required input here..." value={input} onChange={(e) => setInput(e.target.value)} />
          <div className="flex items-center gap-2 mt-3">
            <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value as 'SHA-1' | 'SHA-256' | 'SHA-512')} className="border rounded-lg px-3 py-2 text-sm">
              <option>SHA-1</option>
              <option>SHA-256</option>
              <option>SHA-512</option>
            </select>
            <button onClick={generateHash} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">Generate</button>
          </div>
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative group">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Output View</label>
          <div className="flex-1 w-full bg-primary-50/50 rounded-xl border border-primary-100 p-4 font-mono text-sm text-primary-900 overflow-auto shadow-inner break-all">
            {result || 'Awaiting input to generate...'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default HashGenerator;