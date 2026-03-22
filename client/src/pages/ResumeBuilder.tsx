import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResumeStore } from '../store';
import { 
  User, Briefcase, GraduationCap, Code, 
  Trophy, Sparkles, ChevronRight, ChevronLeft, 
  Download, Eye, Loader2 
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Sub-components (I'll define them in this file for simplicity as it's a small app)
import PersonalForm from '../components/ResumeForm/PersonalForm';
import ExperienceForm from '../components/ResumeForm/ExperienceForm';
import EducationForm from '../components/ResumeForm/EducationForm';
import SkillsForm from '../components/ResumeForm/SkillsForm';
import ProjectsForm from '../components/ResumeForm/ProjectsForm';
import AiSuggestions from '../components/AiSuggestions';

const ResumeBuilder: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isPreview, setIsPreview] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<any>(null);
  const { resumeData, setResumeData } = useResumeStore();

  const steps = [
    { title: 'Personal', icon: <User className="w-4 h-4" /> },
    { title: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
    { title: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { title: 'Skills', icon: <Code className="w-4 h-4" /> },
    { title: 'Projects', icon: <Trophy className="w-4 h-4" /> },
  ];

  const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const analyzeWithAi = async () => {
    setAnalyzing(true);
    try {
      const response = await axios.post('http://localhost:5001/api/resume/analyze', resumeData);
      setSuggestions(response.data);
      toast.success('AI Analysis Complete!');
    } catch (error) {
      toast.error('AI Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  };

  const downloadPdf = async () => {
    toast.loading('Generating PDF...', { id: 'pdf' });
    try {
      const response = await axios.post('http://localhost:5001/api/resume/generate', resumeData, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      toast.success('Downloaded!', { id: 'pdf' });
    } catch (error) {
      toast.error('Failed to generate PDF', { id: 'pdf' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8">
      {/* Form Section */}
      <div className={`flex-1 ${isPreview ? 'hidden lg:block' : ''}`}>
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Resume Builder</h1>
          <div className="flex space-x-2">
            <button 
              onClick={analyzeWithAi} 
              disabled={analyzing}
              className="btn-secondary h-10 px-4 border-primary-200 text-primary-700 flex items-center bg-primary-50 hover:bg-primary-100"
            >
              {analyzing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
              AI Analyze
            </button>
            <button 
              onClick={() => setIsPreview(!isPreview)} 
              className="lg:hidden btn-secondary h-10 px-4 flex items-center"
            >
              <Eye className="w-4 h-4 mr-2" />
              {isPreview ? 'Back to Edit' : 'Preview'}
            </button>
          </div>
        </div>

        {/* Multi-step indicator */}
        <div className="flex items-center space-x-4 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {steps.map((s, i) => (
            <div 
              key={s.title} 
              className={`flex items-center space-x-2 shrink-0 ${i === step ? 'text-primary-600' : 'text-gray-400'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                i === step ? 'bg-primary-600 text-white' : i < step ? 'bg-primary-100 text-primary-600' : 'bg-gray-100'
              }`}>
                {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className="font-medium">{s.title}</span>
              {i < steps.length - 1 && <div className="w-4 h-px bg-gray-200" />}
            </div>
          ))}
        </div>

        <div className="card min-h-[500px] flex flex-col">
          <div className="flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                {step === 0 && <PersonalForm />}
                {step === 1 && <ExperienceForm />}
                {step === 2 && <EducationForm />}
                {step === 3 && <SkillsForm />}
                {step === 4 && <ProjectsForm />}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 pt-8 border-t flex justify-between">
            <button 
              onClick={handleBack} 
              disabled={step === 0}
              className="btn-secondary px-8 flex items-center disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            {step === steps.length - 1 ? (
              <button onClick={downloadPdf} className="btn-primary space-x-2 flex items-center">
                <Download className="w-4 h-4" />
                <span>Finish & Download</span>
              </button>
            ) : (
              <button onClick={handleNext} className="btn-primary space-x-2 flex items-center">
                <span>Next Section</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Preview / Suggestions Sidebar */}
      <div className={`lg:w-[450px] space-y-8 ${!isPreview ? 'hidden lg:block' : 'w-full'}`}>
        {suggestions && (
          <AiSuggestions 
            data={suggestions} 
            onClose={() => setSuggestions(null)} 
          />
        )}
        
        <div className="card sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg flex items-center">
              <Eye className="w-5 h-5 mr-2 text-primary-600" />
              Real-time Preview
            </h3>
            <button onClick={downloadPdf} className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center">
              <Download className="w-4 h-4 mr-1" />
              PDF
            </button>
          </div>
          
          <div className="bg-gray-100 rounded-xl p-4 aspect-[1/1.414] overflow-y-auto text-[8px] sm:text-[10px] space-y-4 shadow-inner">
             {/* Mock Resume Rendering */}
             <div className="bg-white p-6 shadow-sm min-h-full">
                <h1 className="text-lg font-bold text-primary-700">{resumeData.personalInfo.name || 'Your Name'}</h1>
                <p className="text-gray-500 mb-4">{resumeData.personalInfo.role || 'Professional Title'}</p>
                
                <div className="border-b border-primary-100 pb-1 mb-2 font-bold uppercase text-primary-700">About</div>
                <p className="text-gray-600 leading-tight mb-4">{resumeData.about || 'Brief summary about yourself...'}</p>

                <div className="border-b border-primary-100 pb-1 mb-2 font-bold uppercase text-primary-700">Experience</div>
                {resumeData.experience.length > 0 ? resumeData.experience.map((exp: any, i: number) => (
                  <div key={i} className="mb-2">
                    <div className="font-bold flex justify-between">
                      <span>{exp.company}</span>
                      <span className="text-gray-400">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <p className="text-primary-600">{exp.role}</p>
                    <p className="text-gray-600 line-clamp-2">{exp.description}</p>
                  </div>
                )) : <p className="text-gray-400 italic">No experience added yet</p>}

                <div className="border-b border-primary-100 pb-1 mb-2 font-bold uppercase text-primary-700">Skills</div>
                <div className="flex flex-wrap gap-1">
                  {resumeData.skills.map((s: string) => (
                    <span key={s} className="px-1.5 py-0.5 bg-primary-50 text-primary-700 rounded-sm">{s}</span>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder check icon
const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
);

export default ResumeBuilder;
