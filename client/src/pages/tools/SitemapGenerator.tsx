import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Globe } from 'lucide-react';

const SitemapGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const output = (() => {
    const urls = input.split('\n').map((line) => line.trim()).filter(Boolean);
    if (!urls.length) return 'Add one URL per line.';
    const body = urls.map((url) => `  <url>\n    <loc>${url}</loc>\n  </url>`).join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;
  })();

  return (
    <ToolLayout title="Sitemap Generator" description="Create dynamic XML sitemaps" icon={<Globe size={24} />}> 
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative">
          <label className="text-sm font-semibold text-primary-600 mb-2 uppercase tracking-wide">URLs (one per line)</label>
          <textarea className="flex-1 w-full bg-white border border-primary-100 rounded-xl p-4 font-mono text-sm focus:ring-2 focus:ring-primary-400/20 focus:border-primary-400 transition-all resize-none shadow-sm" placeholder="https://example.com/" value={input} onChange={(e) => setInput(e.target.value)} />
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

export default SitemapGenerator;