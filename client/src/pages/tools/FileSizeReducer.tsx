import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Activity, Download } from 'lucide-react';

const FileSizeReducer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(70);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputName, setOutputName] = useState('');
  const [message, setMessage] = useState('Upload a file to reduce size.');

  const imageToBlob = (selectedFile: File) =>
    new Promise<Blob | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new window.Image();
        image.src = reader.result as string;
        image.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;
          const context = canvas.getContext('2d');
          if (!context) {
            reject(new Error('Canvas not available'));
            return;
          }
          context.drawImage(image, 0, 0);
          canvas.toBlob(resolve, 'image/jpeg', quality / 100);
        };
        image.onerror = () => reject(new Error('Invalid image'));
      };
      reader.onerror = () => reject(new Error('Cannot read file'));
      reader.readAsDataURL(selectedFile);
    });

  const handleReduce = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    try {
      let reduced: Blob;
      let name = file.name;

      if (file.type.startsWith('image/')) {
        const blob = await imageToBlob(file);
        if (!blob) throw new Error('Image compression failed');
        reduced = blob;
        name = `${file.name.replace(/\.[^.]+$/, '')}-reduced.jpg`;
      } else {
        const text = await file.text();
        if (file.name.endsWith('.json')) {
          reduced = new Blob([JSON.stringify(JSON.parse(text))], { type: 'application/json' });
        } else if ('CompressionStream' in window) {
          const stream = new Blob([text]).stream().pipeThrough(new CompressionStream('gzip'));
          reduced = await new Response(stream).blob();
          name = `${file.name}.gz`;
        } else {
          reduced = new Blob([text.replace(/\s+/g, ' ').trim()], { type: 'text/plain' });
        }
      }

      setOutputBlob(reduced);
      setOutputName(name);
      const percent = Math.max(0, ((file.size - reduced.size) / file.size) * 100);
      setMessage(
        `Original: ${(file.size / 1024).toFixed(1)} KB, Reduced: ${(reduced.size / 1024).toFixed(1)} KB (${percent.toFixed(1)}% saved)`
      );
    } catch {
      setMessage('Could not reduce this file type.');
    }
  };

  const handleDownload = () => {
    if (!outputBlob) return;
    const url = URL.createObjectURL(outputBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = outputName || 'reduced-file';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout title="File Size Reducer" description="Instantly reduce common file sizes securely" icon={<Activity size={24} />}>
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px] p-6">
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative gap-3">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Configuration / Input</label>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="text-sm" />
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Image Quality: {quality}%</label>
          <input type="range" min={10} max={95} value={quality} onChange={(e) => setQuality(Number(e.target.value))} />
          <button
            onClick={handleReduce}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors"
          >
            Reduce File
          </button>
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative group">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Output View</label>
            <button
              onClick={handleDownload}
              disabled={!outputBlob}
              className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all inline-flex items-center gap-1 ${
                outputBlob ? 'text-white bg-primary-600 hover:bg-primary-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Download size={14} />
              Download
            </button>
          </div>
          <div className="flex-1 w-full bg-primary-50/50 rounded-xl border border-primary-100 p-4 text-sm text-primary-900 overflow-auto shadow-inner">
            {message}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default FileSizeReducer;