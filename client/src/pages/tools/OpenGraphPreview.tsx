import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Globe } from 'lucide-react';

const OpenGraphPreview: React.FC = () => {
  const [title, setTitle] = useState('Your article title');
  const [description, setDescription] = useState('Your article description goes here.');
  const [url, setUrl] = useState('https://example.com');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600');

  return (
    <ToolLayout title="Open Graph Preview" description="Preview open graph meta tags" icon={<Globe size={24} />}>
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col gap-2 bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative">
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="border rounded-xl p-3 text-sm" placeholder="Title" />
          <input value={description} onChange={(e) => setDescription(e.target.value)} className="border rounded-xl p-3 text-sm" placeholder="Description" />
          <input value={url} onChange={(e) => setUrl(e.target.value)} className="border rounded-xl p-3 text-sm" placeholder="URL" />
          <input value={image} onChange={(e) => setImage(e.target.value)} className="border rounded-xl p-3 text-sm" placeholder="Image URL" />
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative group">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Output View</label>
          <div className="flex-1 w-full bg-primary-50/50 rounded-xl border border-primary-100 p-4 text-sm text-primary-900 overflow-auto shadow-inner">
            <div className="max-w-md rounded-xl overflow-hidden border bg-white shadow-sm">
              <img src={image} alt="OG preview" className="w-full h-40 object-cover" />
              <div className="p-3">
                <p className="font-semibold text-gray-900">{title}</p>
                <p className="text-xs text-gray-600 mt-1">{description}</p>
                <p className="text-xs text-primary-600 mt-2">{url}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default OpenGraphPreview;