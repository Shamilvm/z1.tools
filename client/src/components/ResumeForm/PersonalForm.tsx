import React from 'react';
import { useResumeStore } from '../../store';

const PersonalForm: React.FC = () => {
  const { resumeData, setResumeData } = useResumeStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      personalInfo: { ...resumeData.personalInfo, [name]: value },
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={resumeData.personalInfo.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={resumeData.personalInfo.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={resumeData.personalInfo.phone}
            onChange={handleChange}
            placeholder="+1 234 567 890"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={resumeData.personalInfo.location}
            onChange={handleChange}
            placeholder="New York, USA"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Role</label>
          <input
            type="text"
            name="role"
            value={resumeData.personalInfo.role}
            onChange={handleChange}
            placeholder="Senior Software Engineer"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary (About)</label>
        <textarea
          name="about"
          value={resumeData.about}
          onChange={(e) => setResumeData({ ...resumeData, about: e.target.value })}
          placeholder="Briefly describe your professional background and key strengths..."
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all min-h-[120px]"
        />
      </div>
    </div>
  );
};

export default PersonalForm;
