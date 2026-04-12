import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Fingerprint, Copy, Check, RefreshCw } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const UuidGenerator: React.FC = () => {
  const [uuid, setUuid] = useState(uuidv4());
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const handleGenerate = () => {
    const newUuid = uuidv4();
    setHistory((prev) => [uuid, ...prev].slice(0, 10)); // Keep last 10
    setUuid(newUuid);
    setCopied(false);
  };

  const handleCopy = (text: string, isMain: boolean = false) => {
    navigator.clipboard.writeText(text);
    if (isMain) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <ToolLayout 
      title="UUID v4 Generator" 
      description="Generate random, secure Universally Unique Identifiers (UUIDs) instantly in your browser."
      icon={<Fingerprint />}
    >
      <div className="p-6 md:p-10 flex flex-col md:flex-row gap-8">
        
        {/* Main Generator Area */}
        <div className="flex-1 space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <p className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-widest">Your Generated UUID</p>
            <div className="font-mono text-2xl md:text-3xl font-bold tracking-tight text-gray-900 break-all select-all">
              {uuid}
            </div>
            
            <div className="flex items-center space-x-4 mt-8">
              <button 
                onClick={() => handleCopy(uuid, true)}
                className={`px-6 py-2.5 rounded-lg flex items-center font-medium transition-all ${
                  copied ? 'bg-green-100 text-green-700' : 'bg-white border shadow-sm text-gray-700 hover:bg-gray-50'
                }`}
              >
                {copied ? <Check size={18} className="mr-2" /> : <Copy size={18} className="mr-2" />}
                {copied ? 'Copied!' : 'Copy UUID'}
              </button>
              
              <button 
                onClick={handleGenerate}
                className="btn-primary flex items-center shadow-primary-500/20 shadow-lg"
              >
                <RefreshCw size={18} className="mr-2" /> Generate New
              </button>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100/50 text-sm text-blue-800 flex items-start">
            <span className="mr-2">💡</span>
            <p><strong>Pro Tip:</strong> v4 UUIDs are randomly generated and have an extremely low probability of collision. We generate them purely in your browser so they are 100% private.</p>
          </div>
        </div>

        {/* Sidebar / History Area */}
        <div className="w-full md:w-80 space-y-4">
          <h3 className="font-bold text-gray-900">Recent Generation History</h3>
          {history.length === 0 ? (
            <p className="text-gray-500 text-sm">Generate some UUIDs to see your history here.</p>
          ) : (
            <div className="space-y-2">
              {history.map((id, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 group">
                  <span className="font-mono text-xs text-gray-600 truncate mr-3">{id}</span>
                  <button 
                    onClick={() => handleCopy(id)}
                    className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-white rounded transition-colors"
                    title="Copy"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </ToolLayout>
  );
};

export default UuidGenerator;
