import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { protect, AuthRequest } from '../middleware/auth';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password, username } = req.body;

  if (await User.findOne({ email })) {
    return res.status(400).json({ message: 'User already exists' });
  }

  if (await User.findOne({ username })) {
    return res.status(400).json({ message: 'Username already taken' });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, passwordHash, username });

  const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET || 'secret', {
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || '7d',
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    username: user.username,
  });
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET || 'secret', {
      expiresIn: (process.env.JWT_EXPIRES_IN as any) || '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
router.get('/me', protect, (req: AuthRequest, res: Response) => {
  res.json(req.user);
});

export default router;
