import { useEffect, useState } from 'react';
import { buildApiUrl } from '../lib/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(buildApiUrl('users'));
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        const payload = await res.json();
        const records = Array.isArray(payload) ? payload : payload.data || payload.results || [];
        setUsers(records);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="container py-4">Loading users...</div>;
  if (error) return <div className="container py-4 text-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h2>Users</h2>
      <div className="row row-cols-1 row-cols-md-2 g-3">
        {users.map((user) => (
          <div key={user._id || user.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text mb-1"><strong>Email:</strong> {user.email}</p>
                <p className="card-text mb-1"><strong>Fitness:</strong> {user.fitnessLevel || 'N/A'}</p>
                <p className="card-text"><strong>Goals:</strong> {(user.goals || []).join(', ') || 'No goals set'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
