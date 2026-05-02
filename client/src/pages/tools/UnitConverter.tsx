import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Activity } from 'lucide-react';

const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<'length' | 'weight' | 'temperature'>('length');
  const [value, setValue] = useState('1');
  const [from, setFrom] = useState('m');
  const [to, setTo] = useState('ft');

  const options = {
    length: ['m', 'km', 'cm', 'ft', 'in'],
    weight: ['kg', 'g', 'lb'],
    temperature: ['C', 'F', 'K'],
  } as const;

  const convert = () => {
    const v = Number(value) || 0;
    if (category === 'length') {
      const m = from === 'km' ? v * 1000 : from === 'cm' ? v / 100 : from === 'ft' ? v * 0.3048 : from === 'in' ? v * 0.0254 : v;
      return to === 'km' ? m / 1000 : to === 'cm' ? m * 100 : to === 'ft' ? m / 0.3048 : to === 'in' ? m / 0.0254 : m;
    }
    if (category === 'weight') {
      const kg = from === 'g' ? v / 1000 : from === 'lb' ? v * 0.45359237 : v;
      return to === 'g' ? kg * 1000 : to === 'lb' ? kg / 0.45359237 : kg;
    }
    const c = from === 'F' ? (v - 32) * (5 / 9) : from === 'K' ? v - 273.15 : v;
    return to === 'F' ? c * (9 / 5) + 32 : to === 'K' ? c + 273.15 : c;
  };

  return (
    <ToolLayout title="Unit Converter" description="Length, weight, temp, and more" icon={<Activity size={24} />}>
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col gap-3 bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Category</label>
          <select value={category} onChange={(e) => { const c = e.target.value as 'length' | 'weight' | 'temperature'; setCategory(c); setFrom(options[c][0]); setTo(options[c][1]); }} className="border rounded-xl p-3 text-sm">
            <option value="length">Length</option>
            <option value="weight">Weight</option>
            <option value="temperature">Temperature</option>
          </select>
          <input value={value} onChange={(e) => setValue(e.target.value)} className="border rounded-xl p-3 text-sm" />
          <div className="grid grid-cols-2 gap-2">
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="border rounded-xl p-3 text-sm">{options[category].map((unit) => <option key={unit}>{unit}</option>)}</select>
            <select value={to} onChange={(e) => setTo(e.target.value)} className="border rounded-xl p-3 text-sm">{options[category].map((unit) => <option key={unit}>{unit}</option>)}</select>
          </div>
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative group">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Output</label>
          <div className="flex-1 w-full bg-primary-50/50 rounded-xl border border-primary-100 p-4 text-sm text-primary-900 overflow-auto shadow-inner">
            {value} {from} = {convert().toFixed(4)} {to}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default UnitConverter;