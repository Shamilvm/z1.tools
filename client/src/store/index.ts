import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: 'auth-storage' }
  )
);

interface ResumeState {
  resumeData: any;
  setResumeData: (data: any) => void;
  resetResume: () => void;
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resumeData: {
        personalInfo: { name: '', email: '', phone: '', location: '', role: '', linkedin: '', github: '' },
        about: '',
        skills: [],
        experience: [],
        education: [],
        achievements: [],
        projects: [],
      },
      setResumeData: (data) => set({ resumeData: data }),
      resetResume: () => set({
        resumeData: {
          personalInfo: { name: '', email: '', phone: '', location: '', role: '', linkedin: '', github: '' },
          about: '',
          skills: [],
          experience: [],
          education: [],
          achievements: [],
          projects: [],
        }
      }),
    }),
    { name: 'resume-storage' }
  )
);
