import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeResumeContent = async (formData: any) => {
  const prompt = `
    You are an expert career coach and ATS (Applicant Tracking System) specialist.
    Analyze the following resume form data and provide tailored suggestions to improve its ATS compatibility and overall impact.
    Return the response in a JSON format with suggestions for each section: "about", "skills", "experience", "projects".
    For each section, provide specific rewrites and missing keywords.

    Resume Data:
    ${JSON.stringify(formData, null, 2)}
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('AI Analysis Error:', error);
    throw new Error('Failed to analyze resume with AI');
  }
};

export const getAtsSuggestionsFromText = async (text: string) => {
  const prompt = `
    Analyze the following text extracted from a resume PDF and provide:
    1. An ATS score (0-100) based on section presence, formatting, and standard industry keywords.
    2. A list of missing essential keywords for a typical "${text.substring(0, 100)}..." role.
    3. Three specific structural or content recommendations.

    Return as JSON: { "score": number, "missingKeywords": string[], "recommendations": string[] }

    Resume Text:
    ${text}
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('AI ATS Error:', error);
    throw new Error('Failed to get ATS suggestions');
  }
};
