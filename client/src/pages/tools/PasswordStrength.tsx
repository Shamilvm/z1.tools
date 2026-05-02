import React, { useMemo, useState } from 'react';
import ToolLayout from '../../layouts/ToolLayout';
import { Code } from 'lucide-react';

const PasswordStrength: React.FC = () => {
  const [input, setInput] = useState('');
  const analysis = useMemo(() => {
    const password = input;
    if (!password) {
      return {
        score: 0,
        label: 'No password',
        color: 'text-gray-500',
        bar: 'bg-gray-200',
        checks: [],
      };
    }

    const checks = [
      { label: 'At least 8 characters', ok: password.length >= 8 },
      { label: 'Contains lowercase letter', ok: /[a-z]/.test(password) },
      { label: 'Contains uppercase letter', ok: /[A-Z]/.test(password) },
      { label: 'Contains number', ok: /[0-9]/.test(password) },
      { label: 'Contains symbol', ok: /[^A-Za-z0-9]/.test(password) },
    ];

    const score = checks.filter((check) => check.ok).length;
    if (score <= 2) return { score, label: 'Weak', color: 'text-red-600', bar: 'bg-red-500', checks };
    if (score <= 4) return { score, label: 'Medium', color: 'text-amber-600', bar: 'bg-amber-500', checks };
    return { score, label: 'Strong', color: 'text-green-600', bar: 'bg-green-500', checks };
  }, [input]);

  return (
    <ToolLayout
      title="Password Strength"
      description="Check password strength instantly using common security rules."
      icon={<Code size={24} />}
    >
      <div className="flex flex-col gap-6 h-full min-h-[400px]">
        <div className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm p-4 relative">
          <label className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Password</label>
          <input
            type="text"
            className="flex-1 w-full bg-gray-50 border border-gray-200 rounded-xl p-4 font-mono text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none"
            placeholder="Type password to evaluate..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Strength</label>
            <span className={`text-sm font-semibold ${analysis.color}`}>{analysis.label}</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${analysis.bar} transition-all duration-300`}
              style={{ width: `${(analysis.score / 5) * 100}%` }}
            />
          </div>
          <div className="mt-4 space-y-2">
            {analysis.checks.length === 0 ? (
              <p className="text-sm text-gray-500">Waiting for input...</p>
            ) : (
              analysis.checks.map((check) => (
                <p key={check.label} className={`text-sm ${check.ok ? 'text-green-700' : 'text-gray-500'}`}>
                  {check.ok ? 'PASS' : 'TODO'} {check.label}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default PasswordStrength;
