// Local database utility for managing procurement records
import { ALL_SAMPLE_REQUESTS } from './mockData';

const DB_KEY = 'procurement_records';

// Initialize database with sample requests
const initializeDB = () => {
  const existingData = localStorage.getItem(DB_KEY);
  if (!existingData) {
    const sampleData = ALL_SAMPLE_REQUESTS;
    localStorage.setItem(DB_KEY, JSON.stringify(sampleData));
    return sampleData;
  }
  
  // Check if existing data has the new structure
  const parsedData = JSON.parse(existingData);
  const hasNewStructure = parsedData.length > 0 && parsedData[0].approvalFlow && parsedData[0].requestNumber;
  
  if (!hasNewStructure) {
    // Force refresh with new structure
    const sampleData = ALL_SAMPLE_REQUESTS;
    localStorage.setItem(DB_KEY, JSON.stringify(sampleData));
    return sampleData;
  }
  
  return parsedData;
};

// Force refresh function to clear and reinitialize data
export const forceRefreshData = () => {
  localStorage.removeItem(DB_KEY);
  return initializeDB();
};

// CRUD Operations
export const localDB = {
  // Get all records
  getAll: () => {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : initializeDB();
  },
  
  // Get record by ID
  getById: (id) => {
    const records = localDB.getAll();
    return records.find(record => record.id === id);
  },
  
  // Get counts for each tab and filter
  getCounts: () => {
    const records = localDB.getAll();
    
    // Count for "To do" tab
    const toDoRecords = records.filter(record => 
      record.status === 'Draft' || record.status === 'Pending approval'
    );
    
    const toSubmitCount = records.filter(record => record.status === 'Draft').length;
    const toApproveCount = records.filter(record => record.status === 'Pending approval').length;
    
    // Count for "All my items" tab
    const allItemsCount = records.length;
    
    return {
      toDo: {
        total: toDoRecords.length,
        toSubmit: toSubmitCount,
        toApprove: toApproveCount
      },
      allItems: {
        total: allItemsCount,
        myItems: records.filter(record => record.requester === 'Luca.M').length,
        activeOnly: records.filter(record => 
          record.status !== 'Completed' && record.status !== 'Cancelled'
        ).length
      }
    };
  },
  
  // Get records with filters
  getFiltered: ({
    tab = 'toDo', // 'toDo' or 'allMyItems'
    filter = 'all', // 'toSubmit', 'toApprove', 'myItems', 'activeOnly'
    search = '',
    type = 'all', // 'all', 'requests', 'bills', 'expenses'
    status = 'all',
    page = 1,
    limit = 20
  } = {}) => {
    let records = localDB.getAll();
    
    // Tab filtering
    if (tab === 'toDo') {
      records = records.filter(record => 
        record.status === 'Draft' || record.status === 'Pending approval'
      );
    }
    
    // Sub-filter filtering
    if (filter === 'toSubmit') {
      records = records.filter(record => record.status === 'Draft');
    } else if (filter === 'toApprove') {
      records = records.filter(record => record.status === 'Pending approval');
    } else if (filter === 'myItems') {
      records = records.filter(record => record.requester === 'Luca.M');
    } else if (filter === 'activeOnly') {
      records = records.filter(record => 
        record.status !== 'Completed' && record.status !== 'Cancelled'
      );
    }
    
    // Search filtering
    if (search) {
      const searchLower = search.toLowerCase();
      records = records.filter(record =>
        (record.title && record.title.toLowerCase().includes(searchLower)) ||
        (record.vendor && record.vendor.toLowerCase().includes(searchLower)) ||
        (record.requester && record.requester.toLowerCase().includes(searchLower))
      );
    }
    
    // Type filtering (focus on requests for this prototype)
    if (type !== 'all') {
      const typeMap = {
        'requests': 'request',
        'bills': 'bill',
        'expenses': 'expense'
      };
      records = records.filter(record => record.type === typeMap[type]);
    }
    
    // Status filtering
    if (status !== 'all') {
      records = records.filter(record => record.status === status);
    }
    
    // Sort by date (newest first)
    records.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedRecords = records.slice(startIndex, endIndex);
    
    return {
      records: paginatedRecords,
      totalCount: records.length,
      hasMore: endIndex < records.length,
      page,
      limit
    };
  },
  
  // Search for grouped results (for search dropdown)
  search: (query) => {
    if (!query) return { requests: [], bills: [], expenses: [], vendors: [], employees: [] };
    
    const records = localDB.getAll();
    const queryLower = query.toLowerCase();
    
    const requests = records
      .filter(record => record.type === 'request' && 
        ((record.title && record.title.toLowerCase().includes(queryLower)) || 
         (record.vendor && record.vendor.toLowerCase().includes(queryLower))))
      .slice(0, 5);
    
    const bills = records
      .filter(record => record.type === 'bill' && 
        ((record.title && record.title.toLowerCase().includes(queryLower)) || 
         (record.vendor && record.vendor.toLowerCase().includes(queryLower))))
      .slice(0, 5);
    
    const expenses = records
      .filter(record => record.type === 'expense' && 
        ((record.title && record.title.toLowerCase().includes(queryLower)) || 
         (record.vendor && record.vendor.toLowerCase().includes(queryLower))))
      .slice(0, 5);
    
    // Extract unique vendors
    const vendors = [...new Set(records.map(r => r.vendor))]
      .filter(vendor => vendor && vendor.toLowerCase().includes(queryLower))
      .slice(0, 5)
      .map(name => ({ id: name, name }));
    
    // Extract unique employees (from requesters)
    const employees = [...new Set(records.map(r => r.requester))]
      .filter(employee => employee && employee.toLowerCase().includes(queryLower))
      .slice(0, 5)
      .map(name => ({ id: name, name }));
    
    return {
      requests,
      bills,
      expenses,
      vendors,
      employees
    };
  },
  
  // Update record
  update: (id, updates) => {
    const records = localDB.getAll();
    const index = records.findIndex(record => record.id === id);
    
    if (index !== -1) {
      records[index] = { ...records[index], ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem(DB_KEY, JSON.stringify(records));
      return records[index];
    }
    
    return null;
  },
  
  // Bulk update records
  bulkUpdate: (ids, updates) => {
    const records = localDB.getAll();
    let updateCount = 0;
    
    ids.forEach(id => {
      const index = records.findIndex(record => record.id === id);
      if (index !== -1) {
        records[index] = { ...records[index], ...updates, updatedAt: new Date().toISOString() };
        updateCount++;
      }
    });
    
    if (updateCount > 0) {
      localStorage.setItem(DB_KEY, JSON.stringify(records));
    }
    
    return updateCount;
  },
  
  // Add new record
  add: (record) => {
    const records = localDB.getAll();
    const newRecord = {
      ...record,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    records.unshift(newRecord);
    localStorage.setItem(DB_KEY, JSON.stringify(records));
    return newRecord;
  },
  
  // Delete record
  delete: (id) => {
    const records = localDB.getAll();
    const filteredRecords = records.filter(record => record.id !== id);
    
    if (filteredRecords.length !== records.length) {
      localStorage.setItem(DB_KEY, JSON.stringify(filteredRecords));
      return true;
    }
    
    return false;
  },
  
  // Reset database (for testing)
  reset: () => {
    localStorage.removeItem(DB_KEY);
    return initializeDB();
  }
}; 