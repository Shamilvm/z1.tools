import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Clock } from 'lucide-react';

const TimeZoneConverter: React.FC = () => {
  const [dateTime, setDateTime] = useState('');
  const [fromZone, setFromZone] = useState('UTC');
  const [toZone, setToZone] = useState('Asia/Kolkata');
  const zones = ['UTC', 'Asia/Kolkata', 'Europe/London', 'America/New_York', 'Asia/Dubai', 'Asia/Tokyo'];

  const output = (() => {
    if (!dateTime) return 'Select date/time to convert.';
    const sourceDate = new Date(dateTime);
    if (Number.isNaN(sourceDate.getTime())) return 'Invalid date/time.';
    const sourceText = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long', timeZone: fromZone }).format(sourceDate);
    const targetText = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long', timeZone: toZone }).format(sourceDate);
    return `From (${fromZone}): ${sourceText}\nTo (${toZone}): ${targetText}`;
  })();

  return (
    <ToolLayout title="Time Zone Converter" description="Convert and sync global timezones" icon={<Clock size={24} />}>
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col gap-3 bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative">
          <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} className="border rounded-xl p-3 text-sm" />
          <div className="grid grid-cols-2 gap-2">
            <select value={fromZone} onChange={(e) => setFromZone(e.target.value)} className="border rounded-xl p-3 text-sm">{zones.map((zone) => <option key={zone}>{zone}</option>)}</select>
            <select value={toZone} onChange={(e) => setToZone(e.target.value)} className="border rounded-xl p-3 text-sm">{zones.map((zone) => <option key={zone}>{zone}</option>)}</select>
          </div>
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative group">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Output</label>
          <div className="flex-1 w-full bg-primary-50/50 rounded-xl border border-primary-100 p-4 font-mono text-sm text-primary-900 overflow-auto shadow-inner whitespace-pre-wrap">
            {output}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default TimeZoneConverter;