import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Globe } from 'lucide-react';

const MetaTagGenerator: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');

  const output = `<title>${title}</title>
<meta name="description" content="${description}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${image}" />`;

  return (
    <ToolLayout title="Meta Tag Generator" description="Generate SEO friendly HTML meta tags" icon={<Globe size={24} />}> 
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col gap-2 bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative">
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="border rounded-xl p-3 text-sm" placeholder="Title" />
          <input value={description} onChange={(e) => setDescription(e.target.value)} className="border rounded-xl p-3 text-sm" placeholder="Description" />
          <input value={url} onChange={(e) => setUrl(e.target.value)} className="border rounded-xl p-3 text-sm" placeholder="Page URL" />
          <input value={image} onChange={(e) => setImage(e.target.value)} className="border rounded-xl p-3 text-sm" placeholder="Image URL" />
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

export default MetaTagGenerator;