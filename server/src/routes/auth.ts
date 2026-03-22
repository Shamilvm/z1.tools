import express, { Request, Response } from 'express';
import { supabase, adminSupabase } from '../services/supabaseService';
import { protect, AuthRequest } from '../middleware/auth';

const router = express.Router();

const validatePassword = (pass: string) => {
  return pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass);
};

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password, username } = req.body;

  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'Password does not meet requirements' });
  }

  // 1. Sign up user in Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, username }
    }
  });

  if (error) return res.status(400).json({ message: error.message });
  if (!data.user) return res.status(400).json({ message: 'Registration failed' });

  // 2. Create profile in our public.profiles table
  // Use adminSupabase to handle cases where Auth user was created but profile wasn't (bypasses RLS)
  const { error: profileError } = await adminSupabase
    .from('profiles')
    .upsert({ id: data.user.id, name, email, username }, { onConflict: 'id' });

  if (profileError) {
    console.error('Profile creation error:', profileError);
    // Even if profile fails, user is registered in Auth. 
    // We should probably inform the user but they are technically and account owner now.
  }

  // Set cookie for convenience
  if (data.session) {
    res.cookie('token', data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  res.status(201).json({
    id: data.user.id,
    name,
    email,
    username,
  });
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(401).json({ message: error.message });
  if (!data.user) return res.status(401).json({ message: 'Login failed' });

  // Get profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (data.session) {
    res.cookie('token', data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  res.json({
    id: data.user.id,
    name: profile?.name || data.user.user_metadata?.name || data.user.email,
    email: data.user.email,
    username: profile?.username || data.user.user_metadata?.username,
  });
});

// @route   POST /api/auth/sync-profile
// @desc    Sync profile for OAuth users
router.post('/sync-profile', protect, async (req: AuthRequest, res: Response) => {
  const user = req.user;
  
  // Extract info from metadata if available (for OAuth)
  const name = user.user_metadata?.name || user.email?.split('@')[0];
  const email = user.email;
  const username = user.user_metadata?.username || user.email?.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');

  const { data: profile, error: profileError } = await adminSupabase
    .from('profiles')
    .upsert({ 
      id: user.id, 
      name, 
      email, 
      username: username // Default username for OAuth
    }, { onConflict: 'id' })
    .select()
    .single();

  if (profileError) {
    return res.status(400).json({ message: profileError.message });
  }

  res.json(profile);
});

// @route   POST /api/auth/logout
router.post('/logout', async (req: Request, res: Response) => {
  await supabase.auth.signOut();
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

// @route   GET /api/auth/me
// @desc    Get current user profile
router.get('/me', protect, async (req: AuthRequest, res: Response) => {
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', req.user.id)
    .single();
    
  res.json({
    ...req.user,
    ...profile
  });
});

export default router;
