import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      nav('/'); // Redirect after login
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
        {error && <div className="text-red-600 mb-3">Error: {error}</div>}

        <label className="block mb-2 text-sm">Email</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        <label className="block mb-2 text-sm">Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          className="w-full p-2 border rounded mb-4"
        />

        <button
          disabled={loading}
          className="w-full py-2 rounded bg-indigo-600 text-white"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="mt-3 text-xs text-gray-500">
         Test: Use <strong>eve.holt@reqres.in</strong> and <strong>cityslicka</strong>.
        </p>
      </form>
    </div>
  );
};

export default LoginPage;