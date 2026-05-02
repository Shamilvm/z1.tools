import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { FileText } from 'lucide-react';
import { jsPDF } from 'jspdf';
import mammoth from 'mammoth';

const WordToPdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Upload a .docx, .txt, or .md file to convert.');

  const readTextFile = (selectedFile: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Could not read file.'));
      reader.readAsText(selectedFile);
    });

  const convertToPdf = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !['docx', 'txt', 'md'].includes(extension)) {
      setMessage('Only .docx, .txt and .md are supported in this simple version.');
      return;
    }

    setLoading(true);
    setMessage('Converting...');

    try {
      let text = '';
      if (extension === 'docx') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else {
        text = await readTextFile(file);
      }

      const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const lines = pdf.splitTextToSize(text || '(Empty file)', pageWidth - 20);
      let y = 15;

      lines.forEach((line: string) => {
        if (y > 280) {
          pdf.addPage();
          y = 15;
        }
        pdf.text(line, 10, y);
        y += 6;
      });

      pdf.save(`${file.name.replace(/\.[^.]+$/, '')}.pdf`);
      setMessage('PDF created and downloaded.');
    } catch {
      setMessage('Conversion failed. Please try another file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout title="Word ↔ PDF" description="Convert Word and text files to PDF" icon={<FileText size={24} />}>
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px] p-6">
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative gap-3">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">File Input</label>
          <input
            type="file"
            accept=".docx,.txt,.md"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="text-sm"
          />
          <button
            onClick={convertToPdf}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              loading ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            {loading ? 'Converting...' : 'Convert to PDF'}
          </button>
          <p className="text-xs text-gray-500">Supported: .docx, .txt, .md</p>
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative group">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Status</label>
          </div>
          <div className="flex-1 w-full bg-primary-50/50 rounded-xl border border-primary-100 p-4 text-sm text-primary-900 overflow-auto shadow-inner">
            {message}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default WordToPdf;