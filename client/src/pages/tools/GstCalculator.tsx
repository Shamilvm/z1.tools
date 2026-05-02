import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Calculator } from 'lucide-react';

const GstCalculator: React.FC = () => {
  const [amount, setAmount] = useState('1000');
  const [rate, setRate] = useState('18');
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive');

  const base = Number(amount) || 0;
  const gstRate = Number(rate) || 0;
  const gst = mode === 'exclusive' ? (base * gstRate) / 100 : (base * gstRate) / (100 + gstRate);
  const total = mode === 'exclusive' ? base + gst : base;
  const beforeTax = mode === 'exclusive' ? base : base - gst;

  return (
    <ToolLayout title="GST / VAT Calc" description="Lightning fast GST/VAT calculation 🇦🇪" icon={<Calculator size={24} />}>
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col gap-3 bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Amount</label>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} className="border rounded-xl p-3 text-sm" />
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">GST Rate %</label>
          <input value={rate} onChange={(e) => setRate(e.target.value)} className="border rounded-xl p-3 text-sm" />
          <div className="inline-flex rounded-lg border overflow-hidden w-fit">
            <button onClick={() => setMode('exclusive')} className={`px-3 py-1 text-xs ${mode === 'exclusive' ? 'bg-primary-600 text-white' : 'bg-white'}`}>Add GST</button>
            <button onClick={() => setMode('inclusive')} className={`px-3 py-1 text-xs ${mode === 'inclusive' ? 'bg-primary-600 text-white' : 'bg-white'}`}>GST Included</button>
          </div>
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative group">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Output</label>
          <div className="flex-1 w-full bg-primary-50/50 rounded-xl border border-primary-100 p-4 text-sm text-primary-900 overflow-auto shadow-inner space-y-2">
            <p>Taxable Amount: {beforeTax.toFixed(2)}</p>
            <p>GST: {gst.toFixed(2)}</p>
            <p>Total: {total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default GstCalculator;