import React from 'react';
import type { ApiUser } from '../types';
import { Link } from 'react-router-dom';

const UserCard: React.FC<{ user: ApiUser; onEdit: () => void; onDelete: () => void }> = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
      <div className="flex items-center gap-3">
        <img src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.first_name + ' ' + user.last_name)}`} alt="avatar" className="w-12 h-12 rounded-full" />
        <div>
          <div className="font-medium">{user.first_name} {user.last_name}</div>
          <div className="text-xs text-gray-500">{user.email}</div>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <Link to={`/users/${user.id}`} className="text-sm px-2 py-1 border rounded">View</Link>
        <button onClick={onEdit} className="text-sm px-2 py-1 border rounded">Edit</button>
        <button onClick={onDelete} className="text-sm px-2 py-1 border rounded text-red-600">Delete</button>
      </div>
    </div>
  )
}

export default UserCard;
