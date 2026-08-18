import { useEffect, useState } from 'react';
import { buildApiUrl } from '../lib/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch(buildApiUrl('teams'));
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        const payload = await res.json();
        const records = Array.isArray(payload) ? payload : payload.data || payload.results || [];
        setTeams(records);
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="container py-4">Loading teams...</div>;
  if (error) return <div className="container py-4 text-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h2>Teams</h2>
      <div className="row row-cols-1 row-cols-md-2 g-3">
        {teams.map((team) => (
          <div key={team._id || team.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">{team.description || 'No description provided.'}</p>
                <p className="card-text mb-0"><strong>Members:</strong> {(team.members || []).length}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
