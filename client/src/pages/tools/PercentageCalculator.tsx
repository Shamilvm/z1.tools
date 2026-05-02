import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Calculator } from 'lucide-react';

const PercentageCalculator: React.FC = () => {
  const [value, setValue] = useState('25');
  const [total, setTotal] = useState('200');
  const [percent, setPercent] = useState('15');

  return (
    <ToolLayout title="Percentage Calc" description="Standard percentage calculations" icon={<Calculator size={24} />}>
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col gap-3 bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Value</label>
          <input value={value} onChange={(e) => setValue(e.target.value)} className="border rounded-xl p-3 text-sm" />
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Total</label>
          <input value={total} onChange={(e) => setTotal(e.target.value)} className="border rounded-xl p-3 text-sm" />
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Percent</label>
          <input value={percent} onChange={(e) => setPercent(e.target.value)} className="border rounded-xl p-3 text-sm" />
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative group">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Output</label>
          <div className="flex-1 w-full bg-primary-50/50 rounded-xl border border-primary-100 p-4 text-sm text-primary-900 overflow-auto shadow-inner space-y-2">
            <p>{value}% of {total} = {((Number(value) || 0) / 100 * (Number(total) || 0)).toFixed(2)}</p>
            <p>{value} is what % of {total} = {((Number(value) || 0) / (Number(total) || 1) * 100).toFixed(2)}%</p>
            <p>{percent}% increase on {total} = {((Number(total) || 0) * (1 + (Number(percent) || 0) / 100)).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default PercentageCalculator;