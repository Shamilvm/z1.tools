import express, { Request, Response } from 'express';
import { analyzeResumeContent } from '../services/aiService';
import { generateResumePdf } from '../services/pdfService';

const router = express.Router();

// @route   POST /api/resume/analyze
// @desc    Analyze form data to get AI suggestions
router.post('/analyze', async (req: Request, res: Response) => {
  const suggestions = await analyzeResumeContent(req.body);
  res.json(suggestions);
});

// @route   POST /api/resume/generate
// @desc    Generate PDF from form data
router.post('/generate', async (req: Request, res: Response) => {
  try {
    const pdfBuffer = await generateResumePdf(req.body);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=resume.pdf',
      'Content-Length': pdfBuffer.length.toString(),
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF Generation Route Error:', error);
    res.status(500).json({ message: 'Failed to generate PDF' });
  }
});

export default router;
