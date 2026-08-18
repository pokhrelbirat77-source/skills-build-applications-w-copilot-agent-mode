import express, { Request, Response } from 'express';
import './config/database';
import User from './models/User';
import Team from './models/Team';
import Activity from './models/Activity';
import LeaderboardEntry from './models/LeaderboardEntry';
import Workout from './models/Workout';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Octofit Tracker API is running',
    apiUrl,
    status: 'ok'
  });
});

app.get('/api/users/', async (_req: Request, res: Response) => {
  try {
    const users = await User.find().lean();
    res.json({ apiUrl, data: users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

app.get('/api/teams/', async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find().lean();
    res.json({ apiUrl, data: teams });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

app.get('/api/activities/', async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find().lean();
    res.json({ apiUrl, data: activities });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 }).populate('userId', 'name').lean();
    res.json({ apiUrl, data: leaderboard });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

app.get('/api/workouts/', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().lean();
    res.json({ apiUrl, data: workouts });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

app.listen(port, () => {
  console.log(`Octofit Tracker API listening on port ${port}`);
  console.log(`API URL: ${apiUrl}`);
});
