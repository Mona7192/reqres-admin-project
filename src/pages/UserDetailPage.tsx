import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/reqres';
import type { ApiUser } from '../types';

const UserDetailPage: React.FC = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/users/${id}`);
        setUser(res.data.data as ApiUser);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!user) return <div className="p-4">User not found</div>;

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => nav(-1)} className="mb-4 px-3 py-1 border rounded">Back</button>
      <div className="bg-white p-6 rounded-xl shadow flex gap-6 items-center">
        <img src={user.avatar} alt="avatar" className="w-24 h-24 rounded-full" />
        <div>
          <h2 className="text-xl font-semibold">{user.first_name} {user.last_name}</h2>
          <div className="text-sm text-gray-600">{user.email}</div>
          <div className="mt-3 text-sm text-gray-500">(This information is taken from the /api/users/:id endpoint.)</div>
        </div>
      </div>
    </div>
  )
}

export default UserDetailPage;
