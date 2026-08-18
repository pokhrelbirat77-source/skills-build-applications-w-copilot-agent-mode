import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: mongoose.Types.ObjectId;
  rank: number;
  score: number;
  totalDistanceKm: number;
  streakDays: number;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rank: { type: Number, required: true },
    score: { type: Number, required: true },
    totalDistanceKm: { type: Number, default: 0 },
    streakDays: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const LeaderboardEntry = mongoose.models.LeaderboardEntry || mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);

export default LeaderboardEntry;
