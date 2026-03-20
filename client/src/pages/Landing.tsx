import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, BarChart3, Layout, ChevronRight, CheckCircle2 } from 'lucide-react';

const Landing: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-[100px]" />
        </div>

        <motion.div 
          className="max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
            </span>
            <span>New: AI-Powered ATS Analysis</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants} 
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6"
          >
            Build a Resume that <br/>
            <span className="gradient-text">Actually Gets Hired</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants} 
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Check your ATS score, get AI suggestions to improve your content, and generate a professional PDF or portfolio in seconds.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/builder" className="btn-primary flex items-center space-x-2 group h-12">
              <span>Create My Resume</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/ats" className="btn-secondary h-12 flex items-center">
              Check ATS Score
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50/50 border-y border-gray-100 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to succeed</h2>
            <p className="text-gray-600">Powerful tools designed for modern job seekers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card group">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="text-primary-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">ATS Score Check</h3>
              <p className="text-gray-600 leading-relaxed">
                Upload your existing resume and let our AI analyze it against 50+ ATS criteria to see where you stand.
              </p>
            </div>

            <div className="card group">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="text-primary-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Suggestions</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive instant content improvements for your experience and skills sections based on industry standards.
              </p>
            </div>

            <div className="card group">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layout className="text-primary-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Live Portfolio</h3>
              <p className="text-gray-600 leading-relaxed">
                Convert your resume into a stunning, linkable portfolio page that you can share with recruiters instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 italic text-gray-800">"Your resume is your first impression. Make it count."</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {['Developer', 'Designer', 'Accountant', 'Logistics', 'Manager'].map((role) => (
              <div key={role} className="flex items-center space-x-1 text-primary-600 font-semibold text-lg">
                <CheckCircle2 className="w-5 h-5" />
                <span>{role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
