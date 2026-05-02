import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Activity } from 'lucide-react';

const ApiTester: React.FC = () => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState('');
  const [output, setOutput] = useState('Awaiting input to generate...');

  const sendRequest = async () => {
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: method === 'GET' ? undefined : body || undefined,
      });
      const text = await response.text();
      setOutput(`Status: ${response.status}\n\n${text}`);
    } catch (error) {
      setOutput(`Request failed: ${(error as Error).message}`);
    }
  };

  return (
    <ToolLayout title="API Request Tester" description="Mini Postman right in your browser" icon={<Activity size={24} />}> 
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative">
          <input className="w-full bg-white border border-primary-100 rounded-xl p-3 text-sm mb-2" placeholder="https://api.example.com" value={url} onChange={(e) => setUrl(e.target.value)} />
          <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full border border-primary-100 rounded-xl p-3 text-sm mb-2">
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
          <textarea className="flex-1 w-full bg-white border border-primary-100 rounded-xl p-4 font-mono text-sm focus:ring-2 focus:ring-primary-400/20 focus:border-primary-400 transition-all resize-none shadow-sm" placeholder='{"key":"value"}' value={body} onChange={(e) => setBody(e.target.value)} />
          <button onClick={sendRequest} className="mt-3 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">Send</button>
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative group">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Output View</label>
          <div className="flex-1 w-full bg-primary-50/50 rounded-xl border border-primary-100 p-4 font-mono text-sm text-primary-900 overflow-auto shadow-inner">
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ApiTester;