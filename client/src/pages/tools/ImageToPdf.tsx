import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Download, FileText } from 'lucide-react';
import { jsPDF } from 'jspdf';

const ImageToPdf: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Select image files to create a PDF.');

  const toDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Unable to read file.'));
      reader.readAsDataURL(file);
    });

  const handleGeneratePdf = async () => {
    if (files.length === 0) {
      setMessage('Please select at least one image.');
      return;
    }

    setLoading(true);
    setMessage('Generating PDF...');

    try {
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      for (let index = 0; index < files.length; index += 1) {
        const dataUrl = await toDataUrl(files[index]);
        const image = new window.Image();
        image.src = dataUrl;
        await new Promise<void>((resolve, reject) => {
          image.onload = () => resolve();
          image.onerror = () => reject(new Error('Invalid image file.'));
        });

        const ratio = Math.min(pageWidth / image.width, pageHeight / image.height);
        const imgWidth = image.width * ratio;
        const imgHeight = image.height * ratio;
        const x = (pageWidth - imgWidth) / 2;
        const y = (pageHeight - imgHeight) / 2;

        if (index > 0) pdf.addPage();
        pdf.addImage(dataUrl, 'JPEG', x, y, imgWidth, imgHeight, undefined, 'FAST');
      }

      pdf.save('images-to-pdf.pdf');
      setMessage(`PDF downloaded with ${files.length} image(s).`);
    } catch {
      setMessage('Failed to create PDF. Please try different image files.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout title="Image to PDF" description="Convert images to PDF locally" icon={<FileText size={24} />}>
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px] p-6">
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative gap-3">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Input Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
            className="text-sm"
          />
          <button
            onClick={handleGeneratePdf}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              loading ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            {loading ? 'Working...' : 'Generate PDF'}
          </button>
          <p className="text-xs text-gray-500">Files selected: {files.length}</p>
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative group">
          <div className="flex items-center gap-2 mb-2 text-primary-600">
            <Download size={16} />
            <label className="text-sm font-semibold uppercase tracking-wide">Status</label>
          </div>
          <div className="flex-1 w-full bg-primary-50/50 rounded-xl border border-primary-100 p-4 text-sm text-primary-900 overflow-auto shadow-inner">
            {message}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ImageToPdf;