import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useResumeStore } from '../store';
import { Layout, ExternalLink, RefreshCw, Save, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Portfolio: React.FC = () => {
  const { user } = useAuthStore();
  const { resumeData } = useResumeStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [portfolio, setPortfolio] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  const createPortfolio = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5001/api/portfolio/create', {
        resumeData,
        theme: 'modern-purple'
      }, {
        withCredentials: true
      });
      setPortfolio(response.data);
      toast.success('Portfolio updated successfully!');
    } catch (error) {
      toast.error('Failed to update portfolio');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">Portfolio Dashboard</h1>
          <p className="text-gray-500">Manage your public resume page.</p>
        </div>
        <button 
          onClick={createPortfolio}
          disabled={loading}
          className="btn-primary flex items-center space-x-2"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Sync Resume to Portfolio</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card space-y-6">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
            <Layout className="text-primary-600 w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Public URL</h3>
            <p className="text-gray-500 mb-4 text-sm">Your portfolio is live at:</p>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center justify-between">
              <code className="text-primary-700 font-mono text-sm">/ {user.username}</code>
              <a 
                href={`/${user.username}`} 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-400 hover:text-primary-600"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-50">
            <div className="flex items-center space-x-2 text-green-500 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Visible to everyone</span>
            </div>
          </div>
        </div>

        <div className="card p-8 bg-primary-900 text-white flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Resume Status</h3>
            <p className="text-white/60 text-sm mb-6">Last synced: {portfolio ? new Date(portfolio.updated_at).toLocaleDateString() : 'Never'}</p>
            
            <div className="space-y-4">
               <div className="flex justify-between items-center text-sm">
                 <span className="text-white/70">Form data complete</span>
                 <CheckCircle2 className="w-4 h-4 text-primary-400" />
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="text-white/70">Contact info linked</span>
                 <CheckCircle2 className="w-4 h-4 text-primary-400" />
               </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/builder')}
            className="mt-8 py-3 w-full bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 text-center font-bold transition-all"
          >
            Edit Resume Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
