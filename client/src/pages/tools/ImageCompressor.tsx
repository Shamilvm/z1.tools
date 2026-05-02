import React, { useMemo, useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Download, Image } from 'lucide-react';

const ImageCompressor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(70);
  const [outputUrl, setOutputUrl] = useState('');
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputName, setOutputName] = useState('');
  const [error, setError] = useState('');

  const inputUrl = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file]);

  const handleCompress = async () => {
    if (!file) {
      setError('Please select an image first.');
      return;
    }

    setError('');
    const image = new window.Image();
    image.src = inputUrl;

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error('Failed to load image.'));
    });

    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d');
    if (!context) {
      setError('Canvas is not supported in this browser.');
      return;
    }

    context.drawImage(image, 0, 0);
    const targetType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, targetType, quality / 100)
    );

    if (!blob) {
      setError('Compression failed. Please try another image.');
      return;
    }

    const url = URL.createObjectURL(blob);
    setOutputBlob(blob);
    setOutputUrl(url);
    setOutputName(`compressed-${file.name.replace(/\.[^.]+$/, '')}.${targetType === 'image/png' ? 'png' : 'jpg'}`);
  };

  const handleDownload = () => {
    if (!outputBlob || !outputUrl) return;
    const link = document.createElement('a');
    link.href = outputUrl;
    link.download = outputName;
    link.click();
  };

  return (
    <ToolLayout title="Image Compressor" description="Local image compression in your browser" icon={<Image size={24} />}>
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px] p-6">
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative gap-4">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Input Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="text-sm"
          />
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">
            Quality: {quality}%
          </label>
          <input
            type="range"
            min={10}
            max={95}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
          />
          <button
            onClick={handleCompress}
            className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
          >
            Compress
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {file && <p className="text-sm text-gray-600">Original size: {(file.size / 1024).toFixed(1)} KB</p>}
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative gap-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Compressed Output</label>
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
            {!outputBlob ? (
              <p>Awaiting input to generate...</p>
            ) : (
              <div className="space-y-3">
                <img src={outputUrl} alt="Compressed preview" className="max-h-56 rounded-lg border border-primary-100" />
                <p>Compressed size: {(outputBlob.size / 1024).toFixed(1)} KB</p>
                {file && (
                  <p>
                    Saved {(Math.max(0, file.size - outputBlob.size) / 1024).toFixed(1)} KB
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ImageCompressor;