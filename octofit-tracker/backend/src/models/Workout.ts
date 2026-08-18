import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  equipment: string[];
  focus: string[];
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    durationMinutes: { type: Number, required: true },
    equipment: { type: [String], default: [] },
    focus: { type: [String], default: [] }
  },
  { timestamps: true }
);

const Workout = mongoose.models.Workout || mongoose.model<IWorkout>('Workout', workoutSchema);

export default Workout;
