const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;
const API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

import { useEffect, useState } from 'react';
import { buildApiUrl } from '../lib/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        const payload = await res.json();
        const records = Array.isArray(payload) ? payload : payload.data || payload.results || [];
        setWorkouts(records);
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="container py-4">Loading workouts...</div>;
  if (error) return <div className="container py-4 text-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h2>Workouts</h2>
      <div className="row row-cols-1 row-cols-md-2 g-3">
        {workouts.map((workout) => (
          <div key={workout._id || workout.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <p className="card-text mb-1"><strong>Category:</strong> {workout.category}</p>
                <p className="card-text mb-1"><strong>Difficulty:</strong> {workout.difficulty}</p>
                <p className="card-text"><strong>Duration:</strong> {workout.durationMinutes || workout.duration || 0} min</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
