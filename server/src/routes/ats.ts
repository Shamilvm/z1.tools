import express, { Request, Response } from 'express';
import multer from 'multer';
import { analyzePdfAts } from '../services/atsService';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// @route   POST /api/ats/check
// @desc    Check ATS score of uploaded PDF
router.post('/check', upload.single('resume'), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a PDF file' });
  }

  const report = await analyzePdfAts(req.file.buffer);
  res.json(report);
});

export default router;
