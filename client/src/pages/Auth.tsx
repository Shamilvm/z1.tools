import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface AuthProps {
  type: 'login' | 'register';
}

const Auth: React.FC<AuthProps> = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    username: '',
  });

  const { setUser, setToken } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = `http://localhost:5000/api/auth/${type}`;
    
    try {
      const response = await axios.post(url, formData);
      setUser(response.data);
      // In a real app, the token would be in a cookie (httpOnly), 
      // but we'll store it in state/localStorage for simplicity in this demo if needed.
      toast.success(type === 'login' ? 'Welcome back!' : 'Account created!');
      navigate('/portfolio');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <div className="card p-8 bg-white/80 backdrop-blur-xl border-primary-50">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">
            {type === 'login' ? 'Welcome Back' : 'Get Started'}
          </h1>
          <p className="text-gray-500">
            {type === 'login' ? 'Login to manage your portfolio' : 'Create an account to host your resume'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {type === 'register' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username (for portfolio URL)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400 font-medium">@</span>
                  <input
                    type="text"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="johndoe"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary h-12 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>{type === 'login' ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          {type === 'login' ? (
            <p>Don't have an account? <Link to="/register" className="text-primary-600 font-bold hover:underline">Sign Up</Link></p>
          ) : (
            <p>Already have an account? <Link to="/login" className="text-primary-600 font-bold hover:underline">Log In</Link></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
