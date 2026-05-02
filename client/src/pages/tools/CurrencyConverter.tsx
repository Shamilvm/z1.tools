import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Globe } from 'lucide-react';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');

  const rates: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.5,
    AED: 3.67,
    JPY: 154.2,
  };

  const converted = ((Number(amount) || 0) / rates[from]) * rates[to];

  return (
    <ToolLayout title="Currency Converter" description="Local estimated currency conversion" icon={<Globe size={24} />}>
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col gap-3 bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative">
          <input value={amount} onChange={(e) => setAmount(e.target.value)} className="border rounded-xl p-3 text-sm" />
          <div className="grid grid-cols-2 gap-2">
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="border rounded-xl p-3 text-sm">{Object.keys(rates).map((code) => <option key={code}>{code}</option>)}</select>
            <select value={to} onChange={(e) => setTo(e.target.value)} className="border rounded-xl p-3 text-sm">{Object.keys(rates).map((code) => <option key={code}>{code}</option>)}</select>
          </div>
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative group">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Output</label>
          <div className="flex-1 w-full bg-primary-50/50 rounded-xl border border-primary-100 p-4 text-sm text-primary-900 overflow-auto shadow-inner">
            {Number(amount) || 0} {from} = {converted.toFixed(2)} {to}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default CurrencyConverter;