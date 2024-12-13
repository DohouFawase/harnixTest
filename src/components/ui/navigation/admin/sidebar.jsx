import React, { useState } from 'react';
import { NavLink } from 'react-router'; // Assurez-vous d'importer depuis 'react-router-dom'

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState('/dashboard');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="flex flex-col w-64  bg-white border-r-2 ">
      <div className="flex-shrink-0 p-4">
        <h1 className="text-3xl font-bold text-gray-800">Harnix</h1>
      </div>
      <div className="flex-grow overflow-y-auto">
        <nav className="space-y-2">
          <NavLink
            to="/dashboard"
            onClick={() => handleLinkClick('/dashboard')}
            className={`block px-3 py-2 rounded-md transition duration-200 ${
              activeLink === '/dashboard' ? 'bg-blue-500 text-white' : 'hover:bg-blue-300 text-gray-900'
            }`}
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard/feedback"
            onClick={() => handleLinkClick('/dashboard/feedback')}
            className={`block px-3 py-2 rounded-md transition duration-200 ${
              activeLink === '/dashboard/feedback' ? 'bg-blue-500 text-white' : 'hover:bg-blue-300 text-gray-900'
            }`}
          >
            Feedback
          </NavLink>

    
        </nav>
      </div>
    </div>
  );
}
