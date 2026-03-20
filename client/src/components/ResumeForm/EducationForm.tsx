import React from 'react';
import { useResumeStore } from '../../store';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm: React.FC = () => {
  const { resumeData, setResumeData } = useResumeStore();

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        { school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' },
      ],
    });
  };

  const removeEducation = (index: number) => {
    const newEdu = [...resumeData.education];
    newEdu.splice(index, 1);
    setResumeData({ ...resumeData, education: newEdu });
  };

  const handleChange = (index: number, field: string, value: string) => {
    const newEdu = [...resumeData.education];
    newEdu[index] = { ...newEdu[index], [field]: value };
    setResumeData({ ...resumeData, education: newEdu });
  };

  return (
    <div className="space-y-6">
      {resumeData.education.map((edu: any, index: number) => (
        <div key={index} className="p-6 bg-gray-50 rounded-xl relative border border-gray-100">
          <button 
            onClick={() => removeEducation(index)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 bg-white rounded-lg shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">School / University</label>
              <input
                type="text"
                value={edu.school}
                onChange={(e) => handleChange(index, 'school', e.target.value)}
                placeholder="Massachusetts Institute of Technology"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleChange(index, 'degree', e.target.value)}
                placeholder="Bachelor of Science"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
              <input
                type="text"
                value={edu.fieldOfStudy}
                onChange={(e) => handleChange(index, 'fieldOfStudy', e.target.value)}
                placeholder="Computer Science"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
              <input
                type="text"
                value={edu.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                placeholder="2018"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Year (or Expected)</label>
              <input
                type="text"
                value={edu.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                placeholder="2022"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
          </div>
        </div>
      ))}
      <button 
        onClick={addEducation}
        className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50 transition-all flex items-center justify-center font-medium"
      >
        <Plus className="w-5 h-5 mr-1" />
        Add Education
      </button>
    </div>
  );
};

export default EducationForm;
