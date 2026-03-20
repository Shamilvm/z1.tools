import React from 'react';
import { useResumeStore } from '../../store';
import { Plus, Trash2, Link } from 'lucide-react';

const ProjectsForm: React.FC = () => {
  const { resumeData, setResumeData } = useResumeStore();

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        { name: '', description: '', link: '', technologies: [] },
      ],
    });
  };

  const removeProject = (index: number) => {
    const newProjs = [...resumeData.projects];
    newProjs.splice(index, 1);
    setResumeData({ ...resumeData, projects: newProjs });
  };

  const handleChange = (index: number, field: string, value: any) => {
    const newProjs = [...resumeData.projects];
    newProjs[index] = { ...newProjs[index], [field]: value };
    setResumeData({ ...resumeData, projects: newProjs });
  };

  return (
    <div className="space-y-6">
      {resumeData.projects.map((proj: any, index: number) => (
        <div key={index} className="p-6 bg-gray-50 rounded-xl relative border border-gray-100">
          <button 
            onClick={() => removeProject(index)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 bg-white rounded-lg shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  value={proj.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  placeholder="Task Manager AI"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Link (Optional)</label>
                <div className="relative">
                  <Link className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={proj.link}
                    onChange={(e) => handleChange(index, 'link', e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={proj.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                placeholder="A web application built using React and OpenAI API that..."
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none min-h-[80px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma separated)</label>
              <input
                type="text"
                value={proj.technologies.join(', ')}
                onChange={(e) => handleChange(index, 'technologies', e.target.value.split(',').map(s => s.trim()))}
                placeholder="React, Tailwind, Node.js"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
          </div>
        </div>
      ))}
      <button 
        onClick={addProject}
        className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50 transition-all flex items-center justify-center font-medium"
      >
        <Plus className="w-5 h-5 mr-1" />
        Add Project
      </button>
    </div>
  );
};

export default ProjectsForm;
