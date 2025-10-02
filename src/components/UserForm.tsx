import React, { useEffect, useState } from 'react';
import type { ApiUser } from '../types';

const UserForm: React.FC<{
  initial?: ApiUser | null;
  onClose: () => void;
  onCreate: (payload: { name: string; job: string }) => Promise<void>;
  onUpdate: (id: number, payload: { name: string; job: string }) => Promise<void>;
}> = ({ initial, onClose, onCreate, onUpdate }) => {
  const [name, setName] = useState(initial ? `${initial.first_name} ${initial.last_name}` : '');
  const [job, setJob] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initial) setName(`${initial.first_name} ${initial.last_name}`);
  }, [initial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initial) await onUpdate(initial.id, { name, job });
      else await onCreate({ name, job });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl w-full max-w-md shadow">
        <h3 className="text-lg font-semibold mb-3">{initial ? 'Edit User' : 'Create User'}</h3>
        <label className="block text-sm mb-1">Full name</label>
        <input value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded mb-3" />
        <label className="block text-sm mb-1">Job</label>
        <input value={job} onChange={e => setJob(e.target.value)} className="w-full p-2 border rounded mb-3" />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-1 rounded border">Cancel</button>
          <button disabled={loading} type="submit" className="px-3 py-1 rounded bg-indigo-600 text-white">{loading ? 'Saving...' : 'Save'}</button>
        </div>
      </form>
    </div>
  )
}

export default UserForm;
