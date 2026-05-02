import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Key } from 'lucide-react';

const RandomTokenGenerator: React.FC = () => {
  const [length, setLength] = useState(32);
  const [token, setToken] = useState('');
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

  const generateToken = () => {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    const next = Array.from(bytes, (b) => charset[b % charset.length]).join('');
    setToken(next);
  };

  return (
    <ToolLayout title="Random Token Gen" description="Generate strong random tokens" icon={<Key size={24} />}>
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col gap-3 bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative">
          <label className="text-sm font-semibold text-primary-600 mb-2 uppercase tracking-wide">Token Length</label>
          <input type="range" min={8} max={128} value={length} onChange={(e) => setLength(Number(e.target.value))} />
          <p className="text-sm text-gray-600">{length} characters</p>
          <button onClick={generateToken} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">Generate Token</button>
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative group">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Output</label>
          <div className="flex-1 w-full bg-primary-50/50 rounded-xl border border-primary-100 p-4 font-mono text-sm text-primary-900 overflow-auto shadow-inner break-all">
            {token || 'Awaiting input to generate...'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default RandomTokenGenerator;