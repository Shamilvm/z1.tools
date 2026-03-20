import React, { useState } from 'react';
import { useResumeStore } from '../../store';
import { X, Plus } from 'lucide-react';

const SkillsForm: React.FC = () => {
  const [currentSkill, setCurrentSkill] = useState('');
  const { resumeData, setResumeData } = useResumeStore();

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSkill.trim() && !resumeData.skills.includes(currentSkill.trim())) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, currentSkill.trim()],
      });
      setCurrentSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((s: string) => s !== skill),
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Technical Skills</label>
        <form onSubmit={addSkill} className="flex space-x-2">
          <input
            type="text"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            placeholder="e.g. React, TypeScript, Node.js"
            className="flex-grow px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
          />
          <button type="submit" className="btn-primary py-2 px-4 flex items-center">
            <Plus className="w-4 h-4 mr-1" /> Add
          </button>
        </form>
      </div>

      <div className="flex flex-wrap gap-2">
        {resumeData.skills.map((skill: string) => (
          <span 
            key={skill} 
            className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium flex items-center group animate-in fade-in zoom-in duration-200"
          >
            {skill}
            <button 
              onClick={() => removeSkill(skill)}
              className="ml-2 p-0.5 hover:bg-primary-200 rounded-full transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        {resumeData.skills.length === 0 && (
          <p className="text-gray-400 italic text-sm">No skills added yet. Start typing above!</p>
        )}
      </div>
    </div>
  );
};

export default SkillsForm;
