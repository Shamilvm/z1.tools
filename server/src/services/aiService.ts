import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
// Using gemini-flash-latest as gemini-1.5-flash was returning 404 in some regions/API versions
const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

export const analyzeResumeContent = async (resumeData: any) => {
  const prompt = `
    As an expert career coach and resume writer, analyze the following resume data and provide professional improvement suggestions.
    Return a JSON object where keys are section names (personalInfo, experience, education, skills, projects) and values are arrays of strings (suggestions).
    
    Resume Data:
    ${JSON.stringify(resumeData, null, 2)}
    
    Format example:
    {
      "experience": ["Use more action verbs like 'Spearheaded'", "Include metric-driven results"],
      "skills": ["Add modern frameworks like React Query"]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // Gemini sometimes wraps JSON in markdown blocks
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Gemini error:', error);
    return { error: 'Failed to analyze resume' };
  }
};

export const getAtsAnalysis = async (resumeText: string) => {
  const prompt = `
    Analyze this resume text for ATS (Applicant Tracking System) compatibility.
    Return a JSON object with:
    1. score: 0-100 (number)
    2. missingKeywords: Array of professional keywords usually expected for this role
    3. suggestions: Array of strings for structural or content improvements
    
    Resume Text:
    ${resumeText}
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Gemini error:', error);
    return { score: 0, missingKeywords: [], suggestions: ['Service temporarily unavailable'] };
  }
};
