const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;
const API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

import { useEffect, useState } from 'react';
import { buildApiUrl } from '../lib/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        const payload = await res.json();
        const records = Array.isArray(payload) ? payload : payload.data || payload.results || [];
        setActivities(records);
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="container py-4">Loading activities...</div>;
  if (error) return <div className="container py-4 text-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h2>Activities</h2>
      <div className="list-group">
        {activities.map((activity) => (
          <div key={activity._id || activity.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <strong>{activity.type}</strong>
              <span className="badge bg-primary rounded-pill">{activity.durationMinutes || activity.duration || 0} min</span>
            </div>
            <div className="small text-muted mt-2">
              {new Date(activity.date).toLocaleDateString()} · {activity.caloriesBurned || 0} kcal
            </div>
            <div className="small mt-1">{activity.notes || 'No notes provided'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
