"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/database");
const User_1 = __importDefault(require("./models/User"));
const Team_1 = __importDefault(require("./models/Team"));
const Activity_1 = __importDefault(require("./models/Activity"));
const LeaderboardEntry_1 = __importDefault(require("./models/LeaderboardEntry"));
const Workout_1 = __importDefault(require("./models/Workout"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.json({
        message: 'Octofit Tracker API is running',
        apiUrl,
        status: 'ok'
    });
});
app.get('/api/users/', async (_req, res) => {
    try {
        const users = await User_1.default.find().lean();
        res.json({ apiUrl, data: users });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
});
app.get('/api/teams/', async (_req, res) => {
    try {
        const teams = await Team_1.default.find().lean();
        res.json({ apiUrl, data: teams });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch teams', error });
    }
});
app.get('/api/activities/', async (_req, res) => {
    try {
        const activities = await Activity_1.default.find().lean();
        res.json({ apiUrl, data: activities });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch activities', error });
    }
});
app.get('/api/leaderboard/', async (_req, res) => {
    try {
        const leaderboard = await LeaderboardEntry_1.default.find().sort({ rank: 1 }).populate('userId', 'name').lean();
        res.json({ apiUrl, data: leaderboard });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch leaderboard', error });
    }
});
app.get('/api/workouts/', async (_req, res) => {
    try {
        const workouts = await Workout_1.default.find().lean();
        res.json({ apiUrl, data: workouts });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch workouts', error });
    }
});
app.listen(port, () => {
    console.log(`Octofit Tracker API listening on port ${port}`);
    console.log(`API URL: ${apiUrl}`);
});
