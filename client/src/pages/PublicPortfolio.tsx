import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Mail, MapPin, Linkedin, Github, ExternalLink, Briefcase, GraduationCap, Code, Trophy } from 'lucide-react';
import axios from 'axios';

const PublicPortfolio: React.FC = () => {
  const { username } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/portfolio/${username}`);
        setData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Portfolio not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [username]);

  if (loading) return <div className="flex items-center justify-center h-screen"><RefreshCw className="w-8 h-8 animate-spin text-primary-600" /></div>;
  if (error) return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-500 mb-8">{error}</p>
      <Link to="/" className="btn-primary">Go Home</Link>
    </div>
  );

  const { resumeId: resume } = data;

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header / Intro */}
        <section className="card p-8 md:p-12 mb-8 bg-white border-none shadow-xl shadow-primary-500/5 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full blur-3xl -z-10 opacity-40 translate-x-1/2 -translate-y-1/2" />
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{resume.personalInfo.name}</h1>
              <p className="text-xl text-primary-600 font-bold">{resume.personalInfo.role}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span>{resume.personalInfo.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{resume.personalInfo.location}</span>
                </div>
                {resume.personalInfo.linkedin && (
                  <a href={resume.personalInfo.linkedin} className="flex items-center space-x-1 hover:text-primary-600">
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {resume.personalInfo.github && (
                  <a href={resume.personalInfo.github} className="flex items-center space-x-1 hover:text-primary-600">
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-100">
             <h2 className="text-lg font-bold mb-4 flex items-center">
               <User className="w-5 h-5 mr-2 text-primary-600" />
               About Me
             </h2>
             <p className="text-gray-600 leading-relaxed max-w-2xl">{resume.about}</p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Experience */}
            <section className="card p-8 bg-white shadow-xl shadow-primary-500/5">
              <h2 className="text-xl font-bold mb-8 flex items-center">
                <Briefcase className="w-5 h-5 mr-3 text-primary-600" />
                Experience
              </h2>
              <div className="space-y-10">
                {resume.experience.map((exp: any, i: number) => (
                  <div key={i} className="relative pl-8 border-l-2 border-gray-100 last:border-0 pb-2">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-sm" />
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                      <h3 className="font-bold text-gray-900">{exp.role}</h3>
                      <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full shrink-0">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-gray-500 font-medium text-sm mb-4">{exp.company}</div>
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>

             {/* Projects */}
             {resume.projects && resume.projects.length > 0 && (
               <section className="card p-8 bg-white shadow-xl shadow-primary-500/5">
                 <h2 className="text-xl font-bold mb-8 flex items-center">
                   <Trophy className="w-5 h-5 mr-3 text-primary-600" />
                   Key Projects
                 </h2>
                 <div className="grid grid-cols-1 gap-6">
                   {resume.projects.map((proj: any, i: number) => (
                     <div key={i} className="group p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary-200 hover:bg-white transition-all">
                       <div className="flex justify-between items-start mb-3">
                         <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{proj.name}</h3>
                         {proj.link && <ExternalLink className="w-4 h-4 text-gray-400" />}
                       </div>
                       <p className="text-gray-600 text-sm mb-4">{proj.description}</p>
                       <div className="flex flex-wrap gap-2">
                         {proj.technologies.map((t: string) => (
                           <span key={t} className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t}</span>
                         ))}
                       </div>
                     </div>
                   ))}
                 </div>
               </section>
             )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Skills */}
            <section className="card p-8 bg-white shadow-xl shadow-primary-500/5">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Code className="w-5 h-5 mr-3 text-primary-600" />
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill: string) => (
                  <span key={skill} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="card p-8 bg-white shadow-xl shadow-primary-500/5">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <GraduationCap className="w-5 h-5 mr-3 text-primary-600" />
                Education
              </h2>
              <div className="space-y-6">
                {resume.education.map((edu: any, i: number) => (
                  <div key={i}>
                    <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                    <p className="text-primary-600 text-xs font-medium mb-1">{edu.fieldOfStudy}</p>
                    <div className="text-gray-500 text-xs">{edu.school}</div>
                    <div className="text-gray-400 text-[10px] mt-1">{edu.startDate} - {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </section>

             {/* Achievements */}
             {resume.achievements && resume.achievements.length > 0 && (
               <section className="card p-8 bg-white shadow-xl shadow-primary-500/5">
                 <h2 className="text-xl font-bold mb-6 flex items-center">
                   <Trophy className="w-5 h-5 mr-3 text-primary-600" />
                   Achievements
                 </h2>
                 <ul className="space-y-3">
                   {resume.achievements.map((ach: string, i: number) => (
                     <li key={i} className="flex items-start space-x-2 text-sm text-gray-600">
                       <span className="text-primary-500 mt-1">•</span>
                       <span>{ach}</span>
                     </li>
                   ))}
                 </ul>
               </section>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

const User = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

const RefreshCw = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
);

export default PublicPortfolio;
