import React from 'react';
import { useResumeStore } from '../../store';
import { Plus, Trash2, GripVertical } from 'lucide-react';

const ExperienceForm: React.FC = () => {
  const { resumeData, setResumeData } = useResumeStore();

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        { company: '', role: '', location: '', startDate: '', endDate: '', current: false, description: '' },
      ],
    });
  };

  const removeExperience = (index: number) => {
    const newExp = [...resumeData.experience];
    newExp.splice(index, 1);
    setResumeData({ ...resumeData, experience: newExp });
  };

  const handleChange = (index: number, field: string, value: any) => {
    const newExp = [...resumeData.experience];
    newExp[index] = { ...newExp[index], [field]: value };
    setResumeData({ ...resumeData, experience: newExp });
  };

  return (
    <div className="space-y-6">
      {resumeData.experience.map((exp: any, index: number) => (
        <div key={index} className="p-6 bg-gray-50 rounded-xl relative group border border-gray-100">
          <button 
            onClick={() => removeExperience(index)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 bg-white rounded-lg shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleChange(index, 'company', e.target.value)}
                placeholder="Google"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input
                type="text"
                value={exp.role}
                onChange={(e) => handleChange(index, 'role', e.target.value)}
                placeholder="Software Engineer"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="text"
                value={exp.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                placeholder="Jan 2021"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="text"
                value={exp.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                disabled={exp.current}
                placeholder={exp.current ? 'Present' : 'Dec 2022'}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none disabled:bg-gray-100"
              />
            </div>
          </div>
          <div className="mt-4 flex items-center mb-4">
            <input 
              type="checkbox" 
              id={`current-${index}`} 
              checked={exp.current}
              onChange={(e) => handleChange(index, 'current', e.target.checked)}
              className="mr-2 rounded text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor={`current-${index}`} className="text-sm text-gray-600">I currently work here</label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={exp.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              placeholder="Enhanced system performance by 30% using..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none min-h-[100px]"
            />
          </div>
        </div>
      ))}
      <button 
        onClick={addExperience}
        className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50 transition-all flex items-center justify-center font-medium"
      >
        <Plus className="w-5 h-5 mr-1" />
        Add Experience
      </button>
    </div>
  );
};

export default ExperienceForm;
