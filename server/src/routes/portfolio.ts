import express, { Request, Response } from 'express';
import { supabase } from '../services/supabaseService';
import { protect, AuthRequest } from '../middleware/auth';

const router = express.Router();

// @route   POST /api/portfolio/create
// @desc    Create or update portfolio
router.post('/create', protect, async (req: AuthRequest, res: Response) => {
  const { resumeData, theme } = req.body;
  const userId = req.user.id;

  try {
    // 1. Get profile for username
    const { data: profile } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', userId)
      .single();

    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    // 2. Save/Update Resume
    const { data: resume, error: resumeError } = await supabase
      .from('resumes')
      .upsert({
        user_id: userId,
        personal_info: resumeData.personalInfo,
        about: resumeData.about,
        experience: resumeData.experience,
        education: resumeData.education,
        skills: resumeData.skills,
        projects: resumeData.projects,
        achievements: resumeData.achievements,
        updated_at: new Date()
      }, { onConflict: 'user_id' }) // Simple logic for demo
      .select()
      .single();

    if (resumeError) throw resumeError;

    // 3. Save/Update Portfolio
    const { data: portfolio, error: portfolioError } = await supabase
      .from('portfolios')
      .upsert({
        user_id: userId,
        resume_id: resume.id,
        username: profile.username,
        theme: theme || 'modern-purple',
        updated_at: new Date()
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (portfolioError) throw portfolioError;

    res.status(201).json(portfolio);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/portfolio/:username
// @desc    Get public portfolio
router.get('/:username', async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const { data: portfolio, error } = await supabase
      .from('portfolios')
      .select(`
        *,
        userId:user_id,
        resumeId:resumes (*)
      `)
      .eq('username', username)
      .single();

    if (error || !portfolio) return res.status(404).json({ message: 'Portfolio not found' });

    res.json(portfolio);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
