import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { FileJson, Copy, Check, Play, Trash2 } from 'lucide-react';

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    if (!input.trim()) {
      setError('Please provide some JSON data to format.');
      setOutput('');
      return;
    }
    
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError(null);
    } catch (err: any) {
      setError(`Invalid JSON: ${err.message}`);
      setOutput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <ToolLayout 
      title="JSON Formatter & Validator" 
      description="Format, prettify, and validate your JSON data instantly. Processes purely in your browser for total security."
      icon={<FileJson />}
    >
      <div className="flex flex-col h-full min-h-[500px]">
        {/* Tool Actions Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 rounded-t-2xl">
          <div className="flex space-x-3">
            <button 
              onClick={handleFormat}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition shadow-sm flex items-center"
            >
              <Play size={16} className="mr-2" /> Format
            </button>
            <button 
              onClick={handleClear}
              className="px-4 py-2 bg-white border text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition flex items-center"
            >
              <Trash2 size={16} className="mr-2" /> Clear
            </button>
          </div>
          
          <button 
            disabled={!output}
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center ${
              !output ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400' :
              copied ? 'bg-green-100 text-green-700' : 'bg-white border text-gray-700 hover:bg-gray-50 shadow-sm'
            }`}
          >
            {copied ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
            {copied ? 'Copied!' : 'Copy Result'}
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-4 bg-red-50 text-red-700 text-sm font-medium rounded-lg border border-red-100 flex items-center">
            <span className="mr-2">❌</span> {error}
          </div>
        )}

        {/* Editor Area */}
        <div className="flex-1 flex flex-col lg:flex-row p-6 gap-6 h-full">
          {/* Input */}
          <div className="flex-1 flex flex-col h-[400px] lg:h-auto">
            <label className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Input JSON</label>
            <textarea
              className="flex-1 w-full bg-gray-50 border border-gray-200 rounded-xl p-4 font-mono text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none"
              placeholder='Paste your JSON here... e.g. {"name":"Z1 Tools", "awesome":true}'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </div>

          {/* Output */}
          <div className="flex-1 flex flex-col h-[400px] lg:h-auto">
            <label className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Output Format</label>
            <div className={`flex-1 w-full border rounded-xl overflow-hidden relative ${output ? 'border-primary-200 shadow-sm shadow-primary-500/5' : 'border-gray-200 bg-gray-50/50'}`}>
              <textarea
                className="w-full h-full bg-white p-4 font-mono text-sm resize-none focus:outline-none"
                readOnly
                value={output}
                placeholder="Formatted JSON will appear here..."
              />
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default JsonFormatter;
