import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ArrowRight, Code, Shield, Zap, FileJson, Lock, Palette } from 'lucide-react';
import Navbar from '../components/Navbar';

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const bentoItem = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any } }
};

const Landing: React.FC = () => {
  const [activeWord, setActiveWord] = useState(0);

  const dynamicWords = ["Developers.", "Designers.", "Creators.", "You."];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % dynamicWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden selection:bg-primary-100">
      
      {/* Ultra-minimal ambient animated background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex justify-center items-center opacity-30">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-primary-50 via-white to-transparent rounded-full blur-[120px]"
        />
      </div>

      {/* Modern Transparent Nav */}
      <Navbar />

      <main className="relative z-10 w-full pt-32 pb-20 md:pt-48 md:pb-32 px-4 selection:bg-primary-600 selection:text-white">
        
        {/* Minimal Hero */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-primary-100 text-sm font-medium text-primary-600 backdrop-blur-md shadow-sm">
             <span className="w-2 h-2 rounded-full bg-primary-600 mr-2 animate-pulse"></span>
             Introducing the ultimate modern toolkit
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-5xl md:text-8xl font-black tracking-tighter text-gray-900 leading-[1.05] mb-6">
            Everything you need. <br className="hidden md:block"/>
            <span className="flex items-center justify-center space-x-4 h-[1em] text-primary-200 font-extrabold tracking-tight mt-2">
              <span>Built for</span>
              <div className="relative w-[300px] text-left text-primary-600">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeWord}
                    initial={{ y: 40, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -40, opacity: 0, rotateX: 90 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className="absolute origin-center"
                  >
                    {dynamicWords[activeWord]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            Format JSON, generate UUIDs, process documents, and encrypt data—entirely in your browser. Zero backend. Zero latency.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex justify-center">
             <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
               <Link to="/tools" className="group px-8 py-4 bg-primary-600 text-white rounded-full font-bold text-lg flex items-center shadow-2xl shadow-primary-600/30 hover:shadow-primary-600/50 transition-all">
                 Explore the Toolkit
                 <ArrowRight size={20} className="ml-2 group-hover:block transition-transform duration-300 translate-x-0 group-hover:translate-x-1" />
               </Link>
             </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating Abstract App Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="mt-24 max-w-5xl mx-auto relative group"
        >
          {/* Subtle glow behind mockup */}
          <div className="absolute inset-0 bg-primary-100/50 blur-[100px] rounded-[3rem] group-hover:bg-primary-200/50 transition-colors duration-700"></div>
          
          <div className="relative bg-white/80 backdrop-blur-2xl border border-primary-100 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(61,59,243,0.1)] overflow-hidden">
             
             {/* Mockup Header */}
             <div className="h-12 border-b border-gray-100 flex items-center px-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gray-200 group-hover:bg-red-400 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-200 group-hover:bg-amber-400 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-200 group-hover:bg-green-400 transition-colors"></div>
                </div>
                <div className="mx-auto flex items-center space-x-2 bg-primary-50 px-3 py-1 rounded-full border border-primary-100">
                  <Lock size={10} className="text-primary-400" />
                  <span className="text-[10px] font-bold text-primary-600 tracking-wider">SECURE CLIENT-SIDE</span>
                </div>
             </div>

             {/* Mockup Body - JSONFormatter animation simulation */}
             <div className="p-8 grid md:grid-cols-2 gap-8 h-[400px]">
                <div className="space-y-4">
                  <div className="h-4 w-32 bg-primary-50 rounded animate-pulse"></div>
                  <div className="w-full h-full bg-white rounded-2xl border border-primary-50 p-6 font-mono text-sm text-primary-400 relative overflow-hidden shadow-sm">
                     <motion.div 
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                     >
                        {'{\n  "status": "success",\n  "tools": [\n    "Formatter",\n    "Generator"\n  ]\n}'}
                     </motion.div>
                     <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80"></div>
                  </div>
                </div>
                <div className="space-y-4 hidden md:block">
                  <div className="h-4 w-32 bg-gray-100 rounded"></div>
                   <div className="w-full h-full flex flex-col space-y-3">
                     <div className="h-16 bg-white shadow-sm rounded-2xl border border-primary-50 p-4 flex items-center space-x-4">
                       <div className="w-8 h-8 rounded-full bg-primary-100 shrink-0"></div>
                       <div className="h-3 w-1/2 bg-primary-50 rounded"></div>
                     </div>
                     <div className="h-16 bg-white shadow-sm rounded-2xl border border-primary-50 p-4 flex items-center space-x-4">
                       <div className="w-8 h-8 rounded-full bg-primary-100 shrink-0"></div>
                       <div className="h-3 w-3/4 bg-primary-50 rounded"></div>
                     </div>
                     <div className="h-16 bg-white shadow-sm rounded-2xl border border-primary-50 p-4 flex items-center space-x-4">
                       <div className="w-8 h-8 rounded-full bg-primary-100 shrink-0"></div>
                       <div className="h-3 w-1/3 bg-primary-50 rounded"></div>
                     </div>
                   </div>
                </div>
             </div>
          </div>
          
          {/* Floating UI Elements */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-10 top-20 bg-white border border-primary-100 p-4 rounded-2xl shadow-xl hidden lg:flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center text-primary-600"><Zap size={20} /></div>
            <div>
              <div className="text-xs text-gray-400 font-semibold mb-0.5">Execution Time</div>
              <div className="text-sm font-bold text-primary-600">0.02ms</div>
            </div>
          </motion.div>
        </motion.div>

      </main>

      {/* Modern Bento Grid Features */}
      <section className="py-24 relative z-10 px-4 max-w-6xl mx-auto bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-primary-600 tracking-tight mb-4">A hyper-focused ecosystem.</h2>
          <p className="text-xl text-gray-500 font-medium">Tools built for precision, speed, and privacy.</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]"
        >
          {/* Big Item 1 */}
          <motion.div variants={bentoItem} className="md:col-span-2 bg-primary-50/50 border border-primary-100 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group hover:bg-primary-50 transition-colors">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:opacity-[0.15] transition-all duration-500 text-primary-600">
               <Code size={120} />
             </div>
             <div className="relative z-10 h-full flex flex-col justify-end">
               <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-primary-100 flex items-center justify-center text-primary-600 mb-6">
                 <FileJson size={24} />
               </div>
               <h3 className="text-3xl font-bold text-primary-600 tracking-tight mb-3">Developer Utilities</h3>
               <p className="text-primary-600/70 text-lg font-medium max-w-md">Formatters, encoders, UUID generators, and text diffs processed at lightning speed.</p>
             </div>
          </motion.div>

          {/* Small Item 1 */}
          <motion.div variants={bentoItem} className="bg-primary-600 text-white rounded-[2.5rem] p-8 relative overflow-hidden group shadow-xl shadow-primary-600/20">
             <div className="absolute inset-0 bg-gradient-to-br from-primary-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="relative z-10 h-full flex flex-col justify-between">
               <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white border border-white/10 backdrop-blur-sm">
                 <Shield size={20} />
               </div>
               <div>
                 <h3 className="text-2xl font-bold tracking-tight mb-2">100% Private</h3>
                 <p className="text-primary-100 font-medium text-sm">Everything runs locally in your browser. Zero data leaves your machine.</p>
               </div>
             </div>
          </motion.div>

          {/* Small Item 2 */}
          <motion.div variants={bentoItem} className="bg-white border border-primary-100 shadow-sm rounded-[2.5rem] p-8 flex flex-col justify-between group hover:shadow-md transition-all hover:-translate-y-1">
             <div className="w-12 h-12 bg-primary-50 border border-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
               <Palette size={20} />
             </div>
             <div>
               <h3 className="text-xl font-bold text-primary-600 tracking-tight mb-2">Design Tools</h3>
               <p className="text-gray-500 font-medium text-sm">CSS Gradients, Shadow generators, and visual helpers.</p>
             </div>
          </motion.div>

          {/* Big Item 2 */}
          <motion.div variants={bentoItem} className="md:col-span-2 bg-white border border-primary-100 shadow-sm rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-center items-center text-center group hover:border-primary-200 transition-all">
             <h2 className="text-4xl text-primary-200 font-black tracking-tighter mb-4 group-hover:text-primary-600 transition-colors duration-500">More coming soon.</h2>
             <Link to="/tools" className="inline-flex items-center space-x-2 text-primary-600 font-bold hover:gap-4 transition-all">
               <span>View complete catalog</span> <ArrowRight size={18} />
             </Link>
          </motion.div>

        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary-50 bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm font-medium">
          <div className="flex items-center space-x-2 text-primary-600 mb-4 md:mb-0">
             <Layers size={20} /> <span className="font-extrabold tracking-tight">Z1 Tools</span>
          </div>
          <p className="text-primary-600/60">© {new Date().getFullYear()} Z1 Tools Platform. Modern workflow guaranteed.</p>
        </div>
      </footer>

    </div>
  );
};

export default Landing;
