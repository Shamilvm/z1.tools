import mongoose, { Schema, Document } from 'mongoose';

export interface IResume extends Document {
  userId?: mongoose.Types.ObjectId;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    role: string;
    linkedin?: string;
    github?: string;
  };
  about: string;
  skills: string[];
  experience: Array<{
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
  }>;
  achievements: string[];
  projects: Array<{
    name: string;
    description: string;
    link?: string;
    technologies: string[];
  }>;
  createdAt: Date;
}

const ResumeSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  personalInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    role: { type: String, required: true },
    linkedin: String,
    github: String,
  },
  about: { type: String, required: true },
  skills: [String],
  experience: [{
    company: String,
    role: String,
    location: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    description: String,
  }],
  education: [{
    school: String,
    degree: String,
    fieldOfStudy: String,
    startDate: String,
    endDate: String,
  }],
  achievements: [String],
  projects: [{
    name: String,
    description: String,
    link: String,
    technologies: [String],
  }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IResume>('Resume', ResumeSchema);
