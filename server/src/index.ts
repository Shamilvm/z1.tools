import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import 'express-async-errors';

import authRoutes from './routes/auth';
import atsRoutes from './routes/ats';
import resumeRoutes from './routes/resume';
import portfolioRoutes from './routes/portfolio';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ats', atsRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
