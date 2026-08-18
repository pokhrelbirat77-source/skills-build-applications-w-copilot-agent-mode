import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  teamId: mongoose.Types.ObjectId | null;
  fitnessLevel: string;
  goals: string[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    fitnessLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    goals: { type: [String], default: [] }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
