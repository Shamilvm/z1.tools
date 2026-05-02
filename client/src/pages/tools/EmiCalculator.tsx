import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Calculator } from 'lucide-react';

const EmiCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('100000');
  const [annualRate, setAnnualRate] = useState('10');
  const [years, setYears] = useState('5');

  const p = Number(principal) || 0;
  const r = (Number(annualRate) || 0) / 12 / 100;
  const n = (Number(years) || 0) * 12;
  const emi = r > 0 && n > 0 ? (p * r * (1 + r) ** n) / ((1 + r) ** n - 1) : 0;
  const total = emi * n;
  const interest = total - p;

  return (
    <ToolLayout title="EMI / Loan Calc" description="Instant EMI and Loan Calculator" icon={<Calculator size={24} />}>
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col gap-3 bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Loan Amount</label>
          <input value={principal} onChange={(e) => setPrincipal(e.target.value)} className="border rounded-xl p-3 text-sm" />
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Annual Interest %</label>
          <input value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} className="border rounded-xl p-3 text-sm" />
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Tenure (Years)</label>
          <input value={years} onChange={(e) => setYears(e.target.value)} className="border rounded-xl p-3 text-sm" />
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative group">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Output</label>
          <div className="flex-1 w-full bg-primary-50/50 rounded-xl border border-primary-100 p-4 text-sm text-primary-900 overflow-auto shadow-inner space-y-2">
            <p>Monthly EMI: {emi.toFixed(2)}</p>
            <p>Total Payment: {total.toFixed(2)}</p>
            <p>Total Interest: {interest.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default EmiCalculator;