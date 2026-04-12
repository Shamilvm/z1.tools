import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Layers, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store';

const Navbar: React.FC = () => {
  const { user } = useAuthStore();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-primary-50 shadow-sm' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
            <Layers className="text-primary-600 w-6 h-6 border-2 border-primary-600 rounded-lg p-0.5" />
          </motion.div>
          <span className="text-xl font-extrabold tracking-tight text-primary-600">
            Z1 Tools
          </span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/tools" className="text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors hidden sm:block">All Tools</Link>
          {user ? (
              <Link to="/tools" className="px-6 py-2 bg-primary-600 text-white rounded-full font-semibold text-sm hover:bg-primary-700 transition-colors shadow-sm">
                Dashboard
              </Link>
          ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors hidden sm:block">Log in</Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/register" className="px-5 py-2 bg-primary-600 text-white rounded-full font-semibold text-sm hover:shadow-lg shadow-primary-600/20 transition-all flex items-center">
                    Start Free <ArrowRight size={14} className="ml-1.5" />
                  </Link>
                </motion.div>
              </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
