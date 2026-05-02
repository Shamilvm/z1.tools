import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Globe } from 'lucide-react';

const IpLookup: React.FC = () => {
  const [ip, setIp] = useState('');
  const [output, setOutput] = useState('Awaiting input to generate...');

  const lookupIp = async () => {
    const target = ip.trim() || '8.8.8.8';
    try {
      const response = await fetch(`https://ipapi.co/${target}/json/`);
      const data = await response.json();
      setOutput(JSON.stringify(data, null, 2));
    } catch (error) {
      setOutput(`Lookup failed: ${(error as Error).message}`);
    }
  };

  return (
    <ToolLayout title="IP Lookup Tool" description="Discover fast geolocation IP data" icon={<Globe size={24} />}> 
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative">
          <label className="text-sm font-semibold text-primary-600 mb-2 uppercase tracking-wide">IP Address</label>
          <input className="w-full bg-white border border-primary-100 rounded-xl p-3 text-sm" placeholder="8.8.8.8" value={ip} onChange={(e) => setIp(e.target.value)} />
          <button onClick={lookupIp} className="mt-3 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">Lookup</button>
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

export default IpLookup;