import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database';

const app = express();
const PORT = process.env.PORT || 8000;

// Configure Codespaces and localhost base URL
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json({ message: 'Users endpoint', apiUrl });
});

app.get('/api/activities', (req, res) => {
  res.json({ message: 'Activities endpoint', apiUrl });
});

app.listen(PORT, () => {
  console.log(`Octofit Tracker API listening on port ${PORT}`);
  console.log(`API URL: ${apiUrl}`);
});

export default app;