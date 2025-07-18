import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Button from '../components/Button';
import BackLink from '../components/BackLink';
import AIIcon from '../components/AIIcon';
import AIStarsAnimation from '../components/AIStarsAnimation';

export default function AIPromptScreen({ onNavigate }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      const { generateAIResponse } = require('../utils/mockData');
      const response = generateAIResponse(prompt);
      onNavigate('request-form', { aiData: response });
    }, 2000);
  };

  const handleManualEntry = (e) => {
    e.preventDefault();
    onNavigate('request-form');
  };

  return (
    <div className="flex flex-row min-h-screen">
      <Sidebar active="home" onNavClick={key => console.log('Nav:', key)} expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      <div className={`flex-1 flex flex-col min-h-screen ${sidebarExpanded ? 'ml-48' : 'ml-16'}`}>
        <Header sectionTitle="Create a purchase request" />
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="absolute left-0 top-0 mt-8 ml-8">
            <BackLink onClick={() => onNavigate('home')}>Back</BackLink>
          </div>
          <form
            className="w-full flex flex-col items-center justify-center"
            style={{ minHeight: '60vh' }}
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">What do you want to purchase?</h1>
              <div className="flex items-center justify-center gap-2 text-gray-600 text-lg font-normal">
                <AIIcon size={22} className="text-blue-900" />
                <span>Detail your purchase and we’ll generate your request form.</span>
              </div>
            </div>
            <div className="w-full max-w-xl">
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  placeholder="E.g., 25 premium Zoom seats for new hires, $15 each."
                  disabled={isProcessing}
                  className="w-full h-28 rounded-2xl border border-blue-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 shadow-sm p-6 pr-16 text-lg transition disabled:bg-gray-50 disabled:text-gray-400 resize-none outline-none"
                  style={{ boxShadow: '0 2px 12px 0 rgba(80, 112, 255, 0.07)' }}
                  tabIndex={1}
                  aria-label="Describe your purchase request"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey && !isProcessing) {
                      handleSubmit(e);
                    }
                  }}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {isProcessing ? (
                    <AIStarsAnimation size={32} className="text-blue-900" />
                  ) : (
                    <button
                      type="submit"
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${prompt.trim() ? 'bg-yellow-400 hover:bg-yellow-500 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                      disabled={!prompt.trim() || isProcessing}
                      tabIndex={2}
                      aria-label="Submit purchase request prompt"
                    >
                      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              {isProcessing && (
                <div className="flex items-center justify-center gap-2 mt-4 text-blue-900 text-base font-medium animate-pulse">
                  <AIStarsAnimation size={20} className="text-blue-900" />
                  <span>Analyzing your request…</span>
                </div>
              )}
              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  className="text-blue-700 hover:underline text-base font-medium"
                  onClick={handleManualEntry}
                  tabIndex={3}
                >
                  Manually add purchase details
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 