import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Check, Code, Copy } from 'lucide-react';

const BaseEncoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleProcess = () => {
    if (!input.trim()) {
      setError('Please enter text first.');
      setOutput('');
      return;
    }

    try {
      const result =
        mode === 'encode' ? btoa(unescape(encodeURIComponent(input))) : decodeURIComponent(escape(atob(input)));
      setOutput(result);
      setError('');
    } catch {
      setError(mode === 'decode' ? 'Invalid Base64 input.' : 'Unable to encode this text.');
      setOutput('');
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout
      title="Base Encoder"
      description="Encode or decode Base64 text with quick copy support."
      icon={<Code size={24} />}
    >
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm p-4 relative">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Input</label>
            <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => setMode('encode')}
                className={`px-3 py-1 text-xs font-semibold ${
                  mode === 'encode' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'
                }`}
              >
                Encode
              </button>
              <button
                onClick={() => setMode('decode')}
                className={`px-3 py-1 text-xs font-semibold ${
                  mode === 'decode' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'
                }`}
              >
                Decode
              </button>
            </div>
          </div>
          <textarea
            className="flex-1 w-full bg-gray-50 border border-gray-200 rounded-xl p-4 font-mono text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none"
            placeholder={mode === 'encode' ? 'Type text to convert into Base64...' : 'Paste Base64 to decode...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleProcess}
            className="mt-3 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition"
          >
            Run
          </button>
        </div>

        <div className="flex-1 flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm p-4 relative">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Output</label>
            <button
              onClick={handleCopy}
              disabled={!output}
              className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors inline-flex items-center gap-1 ${
                !output
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : copied
                  ? 'bg-green-100 text-green-700'
                  : 'text-primary-600 bg-primary-50 hover:bg-primary-100'
              }`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy Result'}
            </button>
          </div>
          <div
            className={`flex-1 w-full rounded-xl p-4 font-mono text-sm overflow-auto whitespace-pre-wrap break-all ${
              error ? 'bg-red-50 text-red-700' : 'bg-gray-900 text-gray-300'
            }`}
          >
            {error || output || 'Waiting for input...'}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default BaseEncoder;
