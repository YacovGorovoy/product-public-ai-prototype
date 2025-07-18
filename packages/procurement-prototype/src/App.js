import React, { useState } from 'react';
import Home from './pages/Home';
import AIPromptScreen from './pages/AIPromptScreen';
import RequestForm from './pages/RequestForm';
import RequestApprovalScreen from './pages/RequestApprovalScreen';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageData, setPageData] = useState({});

  const navigate = (page, data = {}) => {
    setCurrentPage(page);
    setPageData(data);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigate} />;
      case 'ai-prompt':
        return <AIPromptScreen onNavigate={navigate} />;
      case 'request-form':
        return <RequestForm onNavigate={navigate} draftId={pageData.draftId} aiData={pageData.aiData} />;
      case 'request-approval':
        return <RequestApprovalScreen onNavigate={navigate} requestId={pageData.requestId} />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App; 