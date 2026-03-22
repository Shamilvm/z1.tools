import pdf from 'pdf-parse';
import { getAtsAnalysis } from './aiService';

export const analyzePdfAts = async (buffer: Buffer) => {
  try {
    const data = await pdf(buffer);
    const text = data.text;

    // Basic heuristic + AI for better scoring
    const aiReport = await getAtsAnalysis(text);

    return {
      textLength: text.length,
      ...aiReport,
    };
  } catch (error) {
    console.error('PDF Parse Error:', error);
    throw new Error('Failed to parse resume PDF');
  }
};
