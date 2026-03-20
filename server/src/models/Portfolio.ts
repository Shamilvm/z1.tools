import mongoose, { Schema, Document } from 'mongoose';

export interface IPortfolio extends Document {
  userId: mongoose.Types.ObjectId;
  username: string; // URL slug
  resumeId: mongoose.Types.ObjectId;
  theme: string;
  isPublic: boolean;
  createdAt: Date;
}

const PortfolioSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  username: { type: String, required: true, unique: true },
  resumeId: { type: Schema.Types.ObjectId, ref: 'Resume', required: true },
  theme: { type: String, default: 'modern-purple' },
  isPublic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);
