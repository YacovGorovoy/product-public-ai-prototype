import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import RequestCard from '../components/RequestCard';
import DropdownMenu from '../components/DropdownMenu';
import Search from '../components/Search';
import Tabs from '../components/Tabs';
import Filter from '../components/Filter';
import Typography from '../components/Typography';
import { SkeletonList } from '../components/SkeletonLoader';
import { localDB } from '../utils/localDB';

export default function Home({ onNavigate }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  // State management
  const [activeTab, setActiveTab] = useState('toDo');
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState({ requests: [], bills: [], expenses: [], vendors: [], employees: [] });
  const [records, setRecords] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [counts, setCounts] = useState({ 
    toDo: { total: 0, toSubmit: 0, toApprove: 0 }, 
    allItems: { total: 0, myItems: 0, activeOnly: 0 } 
  });

  // Load initial data and counts
  useEffect(() => {
    loadRecords();
    loadCounts();
  }, [activeTab, activeFilter, search]);

  // Search functionality
  useEffect(() => {
    if (search) {
      const results = localDB.search(search);
      setSearchResults(results);
    } else {
      setSearchResults({ requests: [], bills: [], expenses: [], vendors: [], employees: [] });
    }
  }, [search]);

  const loadCounts = () => {
    const newCounts = localDB.getCounts();
    setCounts(newCounts);
  };

  const loadRecords = useCallback((resetPage = true) => {
    setLoading(true);
    
    const currentPage = resetPage ? 1 : page;
    
    const result = localDB.getFiltered({
      tab: activeTab,
      filter: activeFilter,
      search: search,
      page: currentPage,
      limit: 20
    });
    
    if (resetPage) {
      setRecords(result.records);
      setPage(1);
    } else {
      setRecords(prev => [...prev, ...result.records]);
    }
    
    setHasMore(result.hasMore);
    setLoading(false);
  }, [activeTab, activeFilter, search, page]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
      loadRecords(false);
    }
  };

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
    setActiveFilter('all');
    setSelectedIds([]);
    setPage(1);
  };

  const handleFilterChange = (filterValue) => {
    setActiveFilter(filterValue);
    setSelectedIds([]);
    setPage(1);
  };

  const handleRecordSelect = (recordId) => {
    setSelectedIds(prev => 
      prev.includes(recordId) 
        ? prev.filter(id => id !== recordId)
        : [...prev, recordId]
    );
  };

  const handleBulkApprove = () => {
    const updatedCount = localDB.bulkUpdate(selectedIds, { status: 'Approved' });
    if (updatedCount > 0) {
      setSelectedIds([]);
      loadRecords();
      loadCounts();
    }
  };

  const handleRecordClick = (record) => {
    if (record.status === 'Draft') {
      onNavigate('request-form', { draftId: record.id });
    } else if (record.status === 'Pending approval' || record.status === 'Completed') {
      onNavigate('request-approval', { requestId: record.id });
    }
  };

  const handleSearchResultClick = (item, type) => {
    console.log('Search result clicked:', type, item);
    // Handle navigation based on type
  };

  const handleSeeAllClick = (query) => {
    console.log('See all results for:', query);
    // Handle see all results
  };

  const handleNewRequest = (type) => {
    if (type === 'purchase') {
      onNavigate('ai-prompt');
    } else if (type === 'expense') {
      onNavigate('expense-form');
    }
  };

  const handleStatusClick = (record) => {
    if (record.status === 'Draft') {
      onNavigate('request-form', { draftId: record.id });
    } else if (record.status === 'Pending approval') {
      // Handle approve action
      localDB.update(record.id, { status: 'Approved' });
      loadRecords();
      loadCounts();
    }
  };

  // Get filter options based on active tab
  const getFilterOptions = () => {
    if (activeTab === 'toDo') {
      return [
        { label: 'All', value: 'all' },
        { label: `To submit (${counts.toDo.toSubmit})`, value: 'toSubmit' },
        { label: `To approve (${counts.toDo.toApprove})`, value: 'toApprove' },
      ];
    } else {
      return [
        { label: 'All', value: 'all' },
        { label: `My items (${counts.allItems.myItems})`, value: 'myItems' },
        { label: `Active only (${counts.allItems.activeOnly})`, value: 'activeOnly' },
      ];
    }
  };

  // Get tab structure with counts
  const tabs = [
    {
      label: `To do (${counts.toDo.total})`,
      key: 'toDo',
      count: counts.toDo.total
    },
    {
      label: 'All my items',
      key: 'allMyItems',
      count: counts.allItems.total
    }
  ];

  // Check if bulk actions should be shown
  const showBulkActions = selectedIds.length > 0 && 
    records.some(record => selectedIds.includes(record.id) && record.status === 'Pending approval');

  // Logo fallback
  const logoSrc = '/logo192.png';
  const [logoError, setLogoError] = useState(false);

  const dropdownOptions = [
    {
      label: 'Create a purchase request',
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <rect x="5" y="3" width="14" height="18" rx="2" fill="#F7E6D7" />
          <rect x="8" y="7" width="8" height="2" rx="1" fill="#B97A56" />
          <rect x="8" y="11" width="5" height="2" rx="1" fill="#B97A56" />
        </svg>
      ),
      onClick: () => handleNewRequest('purchase')
    },
    {
      label: 'Submit an expense',
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="3" fill="#E6F0F8" />
          <rect x="7" y="9" width="10" height="2" rx="1" fill="#2D6B9F" />
          <rect x="7" y="13" width="6" height="2" rx="1" fill="#2D6B9F" />
        </svg>
      ),
      onClick: () => handleNewRequest('expense')
    }
  ];

  return (
    <div className="flex flex-row min-h-screen">
      <Sidebar active="home" onNavClick={key => console.log('Nav:', key)} expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      <div className={`flex flex-col flex-1 ${sidebarExpanded ? 'ml-48' : 'ml-16'}`}>
        <Header sectionTitle="Home" companyName="Acme Corp" userAvatar={'https://ui-avatars.com/api/?name=User&background=E0E7EF&color=374151&size=64'} userEmail="yacov.gorovoy@acmecorp.com" />
        
        <div className="p-8">
          {/* Header with Welcome title, Search, and New button */}
          <div className="flex justify-between items-center mb-6">
            <Typography variant="h1">Welcome</Typography>
            <div className="flex items-center space-x-4">
              <div className="max-w-md">
                <Search
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  results={searchResults}
                  onResultClick={handleSearchResultClick}
                  onSeeAllClick={handleSeeAllClick}
                  placeholder="Search items by name"
                />
              </div>
              <DropdownMenu
                buttonContent={<span>+ New</span>}
                open={dropdownOpen}
                setOpen={setDropdownOpen}
                options={dropdownOptions}
                maxWidth="max-w-3xl"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onTabClick={handleTabClick}
            />
          </div>

          {/* Filters - Show different filters based on active tab */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {activeTab === 'toDo' ? (
                <>
                  <Filter
                    label={`To submit ${counts.toDo.toSubmit}`}
                    active={activeFilter === 'toSubmit'}
                    onChange={() => handleFilterChange(activeFilter === 'toSubmit' ? 'all' : 'toSubmit')}
                  />
                  <Filter
                    label={`To approve ${counts.toDo.toApprove}`}
                    active={activeFilter === 'toApprove'}
                    onChange={() => handleFilterChange(activeFilter === 'toApprove' ? 'all' : 'toApprove')}
                  />
                </>
              ) : (
                <Filter
                  label="Filter"
                  dropdown
                  options={getFilterOptions()}
                  value={activeFilter}
                  onChange={handleFilterChange}
                />
              )}
            </div>
            <span className="text-sm text-gray-500">Sorted by date submitted</span>
          </div>

          {/* Bulk Actions */}
          {showBulkActions && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">
                  {selectedIds.length} item{selectedIds.length !== 1 ? 's' : ''} selected
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedIds([])}
                    className="px-3 py-1 text-sm text-blue-700 hover:bg-blue-100 rounded"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleBulkApprove}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Approve selected
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Records List */}
          <div className="space-y-4">
            {loading && records.length === 0 ? (
              <SkeletonList count={5} />
            ) : records.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No records found.</p>
              </div>
            ) : (
              <>
                {records.map(record => (
                  <RequestCard
                    key={record.id}
                    vendor={record.vendor}
                    isNewVendor={record.isNewVendor}
                    title={record.title}
                    date={record.date}
                    requester={record.requester}
                    amount={record.amount}
                    status={record.statusLabel}
                    onStatusClick={() => handleStatusClick(record)}
                    selected={selectedIds.includes(record.id)}
                    onSelect={() => handleRecordSelect(record.id)}
                    badge={record.badge}
                    badgeColor={record.badgeColor}
                    onCardClick={() => handleRecordClick(record)}
                  />
                ))}
                
                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center pt-8">
                    <button
                      onClick={loadMore}
                      disabled={loading}
                      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loading ? 'Loading...' : 'Load More'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 