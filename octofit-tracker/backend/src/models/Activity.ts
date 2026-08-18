import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true },
    notes: { type: String, default: '' }
  },
  { timestamps: true }
);

const Activity = mongoose.models.Activity || mongoose.model<IActivity>('Activity', activitySchema);

export default Activity;
