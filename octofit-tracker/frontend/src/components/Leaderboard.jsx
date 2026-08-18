const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;
const API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

import { useEffect, useState } from 'react';
import { buildApiUrl } from '../lib/api';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        const payload = await res.json();
        const records = Array.isArray(payload) ? payload : payload.data || payload.results || [];
        setEntries(records);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="container py-4">Loading leaderboard...</div>;
  if (error) return <div className="container py-4 text-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h2>Leaderboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
            <th>Streak</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const userName = entry.user?.name || entry.userId?.name || 'Unknown User';
            return (
              <tr key={entry._id || entry.rank}>
                <td>#{entry.rank}</td>
                <td>{userName}</td>
                <td>{entry.score}</td>
                <td>{entry.streakDays || 0} days</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
