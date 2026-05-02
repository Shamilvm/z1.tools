import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { FileText } from 'lucide-react';

const RobotsGenerator: React.FC = () => {
  const [userAgent, setUserAgent] = useState('*');
  const [disallow, setDisallow] = useState('/admin');
  const [sitemap, setSitemap] = useState('https://example.com/sitemap.xml');
  const output = `User-agent: ${userAgent}\nDisallow: ${disallow}\nAllow: /\nSitemap: ${sitemap}`;

  return (
    <ToolLayout title="Robots.txt Generator" description="Quickly create robots.txt files" icon={<FileText size={24} />}> 
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col gap-2 bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative">
          <input value={userAgent} onChange={(e) => setUserAgent(e.target.value)} className="border rounded-xl p-3 text-sm" placeholder="User-agent" />
          <input value={disallow} onChange={(e) => setDisallow(e.target.value)} className="border rounded-xl p-3 text-sm" placeholder="Disallow path" />
          <input value={sitemap} onChange={(e) => setSitemap(e.target.value)} className="border rounded-xl p-3 text-sm" placeholder="Sitemap URL" />
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

export default RobotsGenerator;