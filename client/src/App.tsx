import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';

// Lazy load pages
const Landing = React.lazy(() => import('./pages/Landing'));
const AtsChecker = React.lazy(() => import('./pages/AtsChecker'));
const ResumeBuilder = React.lazy(() => import('./pages/ResumeBuilder'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const PublicPortfolio = React.lazy(() => import('./pages/PublicPortfolio'));
const Auth = React.lazy(() => import('./pages/Auth'));
const AuthCallback = React.lazy(() => import('./pages/AuthCallback'));

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <React.Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/ats" element={<AtsChecker />} />
              <Route path="/builder" element={<ResumeBuilder />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/login" element={<Auth type="login" />} />
              <Route path="/register" element={<Auth type="register" />} />
              <Route path="/auth-callback" element={<AuthCallback />} />
              <Route path="/:username" element={<PublicPortfolio />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </React.Suspense>
        </main>
        <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-50">
          © {new Date().getFullYear()} Resume Maker. Built with Purple 💜
        </footer>
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
};

export default App;
