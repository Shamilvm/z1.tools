import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { supabase } from '../supabase'; // I'll check if this exists or create it

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

  const validatePassword = (pass: string) => {
    return pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'register' && !validatePassword(formData.password)) {
      toast.error('Password does not meet requirements');
      return;
    }

    setLoading(true);

    const url = `http://localhost:5001/api/auth/${type}`;
    
    try {
      const response = await axios.post(url, formData);
      setUser(response.data);
      toast.success(type === 'login' ? 'Welcome back!' : 'Account created!');
      navigate('/portfolio');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `http://localhost:5173/auth-callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || 'Google login failed');
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
            {type === 'register' && formData.password && (
              <div className="mt-2 space-y-1">
                <p className={`text-xs flex items-center ${formData.password.length >= 8 ? 'text-green-500' : 'text-gray-400'}`}>
                  <span className="mr-1">●</span> At least 8 characters
                </p>
                <p className={`text-xs flex items-center ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-gray-400'}`}>
                  <span className="mr-1">●</span> One uppercase letter
                </p>
                <p className={`text-xs flex items-center ${/[0-9]/.test(formData.password) ? 'text-green-500' : 'text-gray-400'}`}>
                  <span className="mr-1">●</span> One number
                </p>
              </div>
            )}
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

        <div className="mt-6">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center space-x-2 h-12 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="font-medium text-gray-700">Google</span>
          </button>
        </div>

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
