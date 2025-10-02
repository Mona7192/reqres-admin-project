import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/reqres';
import type { ApiUser, UsersListResponse } from '../types';

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchUserDetail = async () => {
    try {
      const userId = Number(id);
      if (isNaN(userId)) {
        setUser(null);
        return;
      }
      const calculatedPage = Math.ceil(userId / 6);
      const res = await api.get<UsersListResponse>(`/users?page=${calculatedPage}`);
      const foundUser = res.data.data.find(u => u.id === userId);
      if (foundUser) {
        setUser(foundUser);
      } else {
        const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
        console.log('Local Users:', localUsers);
        const localUser = localUsers.find((u: ApiUser) => Number(u.id) === userId);
        if (localUser) {
          setUser(localUser);
        } else {
          setUser(null);
        }
      }
    } catch (err) {
      console.error('Error fetching user details:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  fetchUserDetail();
}, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!user) return <div className="p-4 text-red-500">User not found</div>;

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => nav(-1)} className="mb-4 px-3 py-1 border rounded">Back</button>
      <div className="bg-white p-6 rounded-xl shadow flex gap-6 items-center">
        <img src={user.avatar} alt="avatar" className="w-24 h-24 rounded-full" />
        <div>
          <h2 className="text-xl font-semibold">{user.first_name} {user.last_name || ''}</h2>
          <div className="text-sm text-gray-600">{user.email}</div>
          <div className="mt-3 text-sm text-gray-500">
            {(user.id > 12) ? '(Locally created user due to API limitation)' : '(Data from /users list)'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;