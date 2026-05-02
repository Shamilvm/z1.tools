import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Calculator } from 'lucide-react';

const AgeCalculator: React.FC = () => {
  const [dob, setDob] = useState('');

  const result = (() => {
    if (!dob) return 'Select your date of birth.';
    const birth = new Date(dob);
    const today = new Date();
    if (birth > today) return 'Date of birth cannot be in the future.';

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      const prevMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days += prevMonthDays;
      months -= 1;
    }
    if (months < 0) {
      months += 12;
      years -= 1;
    }

    return `${years} years, ${months} months, ${days} days`;
  })();

  return (
    <ToolLayout title="Age Calculator" description="Precision age calculator" icon={<Calculator size={24} />}>
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative">
          <label className="text-sm font-semibold text-primary-600 mb-2 uppercase tracking-wide">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full bg-white border border-primary-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-400/20 focus:border-primary-400 transition-all shadow-sm"
          />
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative group">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Output</label>
          <div className="flex-1 w-full bg-primary-50/50 rounded-xl border border-primary-100 p-4 font-mono text-sm text-primary-900 overflow-auto shadow-inner">
            {result}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default AgeCalculator;