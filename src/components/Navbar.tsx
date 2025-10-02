import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav('/login');
  }

  return (
    <nav className="bg-white shadow-sm rounded-b-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-semibold text-lg">Reqres Admin</Link>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <button onClick={handleLogout} className="px-3 py-1 rounded-md border text-sm">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-sm">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
