import React, { useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Clock } from 'lucide-react';

const CronGenerator: React.FC = () => {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [day, setDay] = useState('*');
  const [month, setMonth] = useState('*');
  const [weekday, setWeekday] = useState('*');
  const output = `${minute} ${hour} ${day} ${month} ${weekday}`;

  return (
    <ToolLayout title="Cron Job Generator" description="Generate cron schedules effortlessly" icon={<Clock size={24} />}> 
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        <div className="flex-1 flex flex-col gap-2 bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Minute</label><input value={minute} onChange={(e) => setMinute(e.target.value)} className="border rounded-xl p-2 text-sm" />
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Hour</label><input value={hour} onChange={(e) => setHour(e.target.value)} className="border rounded-xl p-2 text-sm" />
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Day of Month</label><input value={day} onChange={(e) => setDay(e.target.value)} className="border rounded-xl p-2 text-sm" />
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Month</label><input value={month} onChange={(e) => setMonth(e.target.value)} className="border rounded-xl p-2 text-sm" />
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Weekday</label><input value={weekday} onChange={(e) => setWeekday(e.target.value)} className="border rounded-xl p-2 text-sm" />
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-primary-50 shadow-sm p-6 relative group">
          <label className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Cron Expression</label>
          <div className="flex-1 w-full bg-primary-50/50 rounded-xl border border-primary-100 p-4 font-mono text-sm text-primary-900 overflow-auto shadow-inner">
            {output}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default CronGenerator;