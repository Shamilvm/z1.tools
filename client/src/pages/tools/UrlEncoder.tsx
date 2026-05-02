import React, { useMemo, useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Check, Copy, Globe } from 'lucide-react';

const UrlEncoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const { output, error } = useMemo(() => {
    if (!input) return { output: '', error: '' };

    try {
      const result = mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input);
      return { output: result, error: '' };
    } catch {
      return { output: '', error: 'Invalid URL encoded text. Please check your input.' };
    }
  }, [input, mode]);

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout title="URL Encoder/Decoder" description="Encode or decode URLs securely" icon={<Globe size={24} />}>
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Input</label>
            <div className="inline-flex rounded-lg border border-primary-100 overflow-hidden">
              <button
                onClick={() => setMode('encode')}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                  mode === 'encode' ? 'bg-primary-600 text-white' : 'bg-white text-primary-700 hover:bg-primary-50'
                }`}
              >
                Encode
              </button>
              <button
                onClick={() => setMode('decode')}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                  mode === 'decode' ? 'bg-primary-600 text-white' : 'bg-white text-primary-700 hover:bg-primary-50'
                }`}
              >
                Decode
              </button>
            </div>
          </div>
          <textarea
            className="flex-1 w-full bg-white border border-primary-100 rounded-xl p-4 font-mono text-sm focus:ring-2 focus:ring-primary-400/20 focus:border-primary-400 transition-all resize-none shadow-sm"
            placeholder={mode === 'encode' ? 'Enter text or URL to encode...' : 'Enter encoded URL text to decode...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative group">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Output View</label>
            <button
              onClick={handleCopy}
              disabled={!output}
              className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all inline-flex items-center gap-1 ${
                !output
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : copied
                  ? 'bg-green-100 text-green-700'
                  : 'text-white bg-primary-600 hover:bg-primary-700 hover:shadow-lg shadow-primary-600/30'
              }`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy Result'}
            </button>
          </div>
          <div className="flex-1 w-full bg-primary-50/50 rounded-xl border border-primary-100 p-4 font-mono text-sm text-primary-900 overflow-auto shadow-inner whitespace-pre-wrap break-all">
            {error || output || 'Awaiting input to generate...'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default UrlEncoder;