import express, { Request, Response } from 'express';
import Portfolio from '../models/Portfolio';
import Resume from '../models/Resume';
import { protect, AuthRequest } from '../middleware/auth';

const router = express.Router();

// @route   POST /api/portfolio/create
// @desc    Save resume data and create/update portfolio link
router.post('/create', protect, async (req: AuthRequest, res: Response) => {
  const resume = await Resume.create({
    userId: req.user!._id,
    ...req.body.resumeData,
  });

  const portfolio = await Portfolio.findOneAndUpdate(
    { userId: req.user!._id },
    {
      resumeId: resume._id,
      username: req.user!.username,
      theme: req.body.theme || 'modern-purple',
    },
    { upsert: true, new: true }
  );

  res.status(201).json(portfolio);
});

// @route   GET /api/portfolio/:username
// @desc    Get public portfolio data
router.get('/:username', async (req: Request, res: Response) => {
  const portfolio = await Portfolio.findOne({ username: req.params.username })
    .populate('resumeId')
    .populate('userId', 'name email username');

  if (!portfolio) {
    return res.status(404).json({ message: 'Portfolio not found' });
  }

  res.json(portfolio);
});

export default router;
