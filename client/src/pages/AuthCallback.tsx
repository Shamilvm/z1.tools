import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { useAuthStore } from '../store';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  useEffect(() => {
    const handleAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        toast.error('Authentication failed');
        navigate('/login');
        return;
      }

      if (session) {
        try {
          // Call our backend to sync/create profile for this user
          const response = await axios.post('http://localhost:5001/api/auth/sync-profile', {}, {
            headers: { Authorization: `Bearer ${session.access_token}` }
          });
          
          setUser(response.data);
          toast.success('Welcome!');
          navigate('/portfolio');
        } catch (err: any) {
          console.error('Profile sync error:', err);
          toast.error('Failed to sync profile');
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    handleAuth();
  }, [navigate, setUser]);

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
      <p className="text-gray-500 font-medium">Finalizing authentication...</p>
    </div>
  );
};

export default AuthCallback;
