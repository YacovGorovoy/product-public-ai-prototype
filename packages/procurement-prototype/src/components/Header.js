// Header bar for the procurement app
import React, { useState } from 'react';
import Typography from './Typography';

const placeholderAvatar = 'https://ui-avatars.com/api/?name=User&background=E0E7EF&color=374151&size=64';

/**
 * Header with search, notification, help, and user info
 * @param {string} userName - The user's name
 * @param {function} onSearch - Callback for search input
 */
export default function Header({ sectionTitle = 'Home', companyName = 'Company', userAvatar, userEmail = 'user@email.com' }) {
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  return (
    <header className="flex justify-between items-center p-4 pl-8 border-b bg-white w-full">
      {/* Section title left-aligned */}
      <Typography variant="h2" className="text-gray-900">{sectionTitle}</Typography>
      <div className="flex items-center space-x-4">
        {/* Sparkle icon */}
        <button className="text-gray-500" aria-label="Highlights">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.42 1.42M6.34 17.66l-1.42 1.42m12.02 0l-1.42-1.42M6.34 6.34L4.92 4.92" /></svg>
        </button>
        {/* Help icon */}
        <button className="text-gray-500" aria-label="Help">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 14v.01M12 10a4 4 0 10-4 4h.01M12 10a4 4 0 014 4h-.01M12 10v4" /></svg>
        </button>
        {/* Company name */}
        <span className="text-base font-semibold text-gray-800 mx-2">{companyName}</span>
        {/* Language selector */}
        <div className="relative">
          <button className="flex items-center text-gray-700 px-2 py-1 rounded hover:bg-gray-100" onClick={() => setLangOpen(v => !v)} aria-label="Language selector">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
            <span className="font-semibold mr-1">EN</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {langOpen && (
            <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow z-10">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">EN</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">FR</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">DE</button>
            </div>
          )}
        </div>
        {/* User avatar dropdown */}
        <div className="relative">
          <button className="flex items-center px-2 py-1 rounded hover:bg-gray-100" onClick={() => setUserOpen(v => !v)} aria-label="User menu">
            <img src={userAvatar || placeholderAvatar} alt="User avatar" className="w-8 h-8 rounded-full object-cover bg-gray-200" />
          </button>
          {userOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow z-10 p-4">
              <div className="mb-2 text-sm text-gray-700 font-semibold">{userEmail}</div>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 