import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-blue-700 cursor-pointer"
          onClick={() => navigate('/')}
        >
          Skill<span className="text-blue-900">Swap</span>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li className="hover:text-blue-700 cursor-pointer" onClick={() => navigate('/')}>Home</li>
          <li className="hover:text-blue-700 cursor-pointer">Browse Skills</li>
          <li className="hover:text-blue-700 cursor-pointer">How It Works</li>
          <li className="hover:text-blue-700 cursor-pointer">Community</li>
        </ul>

        {/* User Icon */}
        <div className="flex items-center space-x-4">
          {/* User Symbol */}
          <div
            className="text-2xl cursor-pointer hover:text-blue-700 transition"
            title="User Profile"
            onClick={() => navigate('/user')}
          >
            👤
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;