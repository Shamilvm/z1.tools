import React, { useMemo, useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Code } from 'lucide-react';

const JwtDecoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [showRaw, setShowRaw] = useState(false);

  const decoded = useMemo(() => {
    if (!input.trim()) {
      return { header: '', payload: '', signature: '', error: '' };
    }

    const parts = input.trim().split('.');
    if (parts.length < 2) {
      return { header: '', payload: '', signature: '', error: 'JWT must have at least header.payload' };
    }

    const decodePart = (value: string) => {
      const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
      const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
      return decodeURIComponent(
        Array.prototype.map
          .call(atob(padded), (char: string) => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`)
          .join('')
      );
    };

    try {
      const headerRaw = decodePart(parts[0]);
      const payloadRaw = decodePart(parts[1]);
      const header = JSON.stringify(JSON.parse(headerRaw), null, 2);
      const payload = JSON.stringify(JSON.parse(payloadRaw), null, 2);

      return {
        header: showRaw ? headerRaw : header,
        payload: showRaw ? payloadRaw : payload,
        signature: parts[2] ?? '(no signature part)',
        error: '',
      };
    } catch {
      return { header: '', payload: '', signature: '', error: 'Invalid JWT format or invalid Base64URL content.' };
    }
  }, [input, showRaw]);

  return (
    <ToolLayout
      title="Jwt Decoder"
      description="Decode JWT header and payload locally in your browser."
      icon={<Code size={24} />}
    >
      <div className="flex flex-col gap-6 h-full min-h-[400px]">
        <div className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm p-4 relative">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Input Token</label>
            <button
              onClick={() => setShowRaw((prev) => !prev)}
              className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full hover:bg-primary-100 transition-colors"
            >
              {showRaw ? 'Show JSON' : 'Show Raw'}
            </button>
          </div>
          <textarea
            className="flex-1 w-full bg-gray-50 border border-gray-200 rounded-xl p-4 font-mono text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none"
            placeholder="Paste JWT token here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
          />
        </div>

        {decoded.error ? (
          <div className="p-4 bg-red-50 text-red-700 border border-red-100 rounded-xl text-sm font-medium">{decoded.error}</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <label className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide block">Header</label>
              <pre className="bg-gray-900 text-gray-200 p-4 rounded-xl text-xs overflow-auto min-h-[180px]">{decoded.header || 'Waiting for input...'}</pre>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <label className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide block">Payload</label>
              <pre className="bg-gray-900 text-gray-200 p-4 rounded-xl text-xs overflow-auto min-h-[180px]">{decoded.payload || 'Waiting for input...'}</pre>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <label className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide block">Signature</label>
              <pre className="bg-gray-900 text-gray-200 p-4 rounded-xl text-xs overflow-auto min-h-[180px]">{decoded.signature || 'Waiting for input...'}</pre>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default JwtDecoder;
