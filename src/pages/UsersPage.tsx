import React, { useEffect, useState } from 'react';
import api from '../api/reqres';
import type { ApiUser, UsersListResponse } from '../types';
import UserCard from '../components/UserCard';
import UserForm from '../components/UserForm';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UsersPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const nav = useNavigate();
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<ApiUser | null>(null);

  const fetchUsers = async (p = 1) => {
    setLoading(true);
    try {
      const res = await api.get<UsersListResponse>(`/users?page=${p}`);
      setUsers(res.data.data);
      setPage(res.data.page);
      setTotalPages(res.data.total_pages);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      nav('/login');
      return;
    }
    fetchUsers(1);
  }, [isAuthenticated, nav]);

const handleCreate = async (payload: { name: string; job: string }) => {
  try {
    const res = await api.post('/users', payload);
    console.log('API Response:', res.data);
    if (res.data && res.data.id) {
      const newUser: ApiUser = {
        id: res.data.id || Date.now(),
        email: `${payload.name.replace(/\s+/g, '').toLowerCase()}@local.test`,
        first_name: payload.name.split(' ')[0] || payload.name,
        last_name: payload.name.split(' ').slice(1).join(' ') || '',
        avatar: undefined,
      };
      setUsers(prev => [newUser, ...prev]);
      const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
      console.log('Before Save - localUsers:', localUsers);
      localStorage.setItem('localUsers', JSON.stringify([...localUsers, newUser]));
      console.log('After Save - localUsers:', JSON.parse(localStorage.getItem('localUsers') || '[]'));
      setShowForm(false);
      alert('User created locally. Data is not persistent due to API limitations.');
    } else {
      throw new Error('Invalid response from API');
    }
  } catch (err) {
    console.error('Failed to create user:', err);
    alert('Failed to create user. API may not support persistent data.');
  }
};

  const handleUpdate = async (id: number, payload: { name: string; job: string }) => {
    try {
      await api.put(`/users/${id}`, payload);
      alert('Update not supported in free API tier.');
    } catch (err) {
      console.error('Failed to update user:', err);
      alert('Update is not supported by the free API.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/users/${id}`);
        alert('Delete not supported in free API tier.');
      } catch (err) {
        console.error('Failed to delete user:', err);
        alert('Delete is not supported by the free API.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Users</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => { setEditingUser(null); setShowForm(true); }} className="px-3 py-1 rounded bg-green-500 text-white">Add User</button>
          
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {users.map(user => (
            <UserCard key={user.id} user={user} onEdit={() => { setEditingUser(user); setShowForm(true); }} onDelete={() => handleDelete(user.id)} />
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-between items-center">
        <button disabled={page <= 1} onClick={() => { const p = Math.max(1, page - 1); fetchUsers(p); setPage(p); }} className="px-3 py-1 rounded border">Prev</button>
        <div>Page {page} / {totalPages}</div>
        <button disabled={page >= totalPages} onClick={() => { const p = Math.min(totalPages, page + 1); fetchUsers(p); setPage(p); }} className="px-3 py-1 rounded border">Next</button>
      </div>

      {showForm && (
        <UserForm
          initial={editingUser}
          onClose={() => { setShowForm(false); setEditingUser(null); }}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default UsersPage;