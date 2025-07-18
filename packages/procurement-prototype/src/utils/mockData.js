// Mock data for the procurement prototype

export const SUPPLIERS = [
  { value: 'microsoft', label: 'Microsoft Corporation' },
  { value: 'adobe', label: 'Adobe Inc.' },
  { value: 'zoom', label: 'Zoom Video Communications' },
  { value: 'slack', label: 'Slack Technologies' },
  { value: 'atlassian', label: 'Atlassian Corporation' },
  { value: 'salesforce', label: 'Salesforce Inc.' },
  { value: 'amazon', label: 'Amazon Web Services' },
  { value: 'google', label: 'Google Cloud Platform' },
  { value: 'starbucks', label: 'Starbucks Coffee Company' },
  { value: 'staples', label: 'Staples Inc.' },
  { value: 'dell', label: 'Dell Technologies' },
  { value: 'hp', label: 'HP Inc.' },
  { value: 'apple', label: 'Apple Inc.' },
  { value: 'cisco', label: 'Cisco Systems' },
  { value: 'oracle', label: 'Oracle Corporation' },
  { value: 'the_matrix', label: 'The Matrix' },
  { value: 'owl_ai', label: 'Owl AI Enterprises LTD' }
];

export const PURCHASE_TYPES = [
  { value: 'software', label: 'Software Licenses' },
  { value: 'services', label: 'Professional Services' },
  { value: 'hardware', label: 'Hardware & Equipment' },
  { value: 'office', label: 'Office Supplies' },
  { value: 'marketing', label: 'Marketing & Advertising' },
  { value: 'travel', label: 'Travel & Accommodation' },
  { value: 'training', label: 'Training & Development' },
  { value: 'consulting', label: 'Consulting Services' },
  { value: 'maintenance', label: 'Maintenance & Support' },
  { value: 'other', label: 'Other' }
];

export const SUBSIDIARIES = [
  { value: 'us_main', label: 'US Main Company' },
  { value: 'us_west', label: 'US West Coast Branch' },
  { value: 'us_east', label: 'US East Coast Branch' },
  { value: 'uk_london', label: 'UK London Office' },
  { value: 'de_berlin', label: 'Germany Berlin Office' },
  { value: 'fr_paris', label: 'France Paris Office' },
  { value: 'ca_toronto', label: 'Canada Toronto Office' },
  { value: 'au_sydney', label: 'Australia Sydney Office' }
];

export const CURRENCIES = [
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'GBP', label: 'GBP - British Pound' },
  { value: 'CAD', label: 'CAD - Canadian Dollar' },
  { value: 'AUD', label: 'AUD - Australian Dollar' }
];

// AI Sample Responses for different types of requests
export const AI_SAMPLE_RESPONSES = {
  'software licenses': {
    title: 'Zoom Premium Licenses for Sales Team',
    supplier: 'zoom',
    purchaseType: 'software',
    subsidiary: 'us_main',
    lineItems: [
      {
        currency: 'USD',
        amount: '14.99',
        quantity: '25',
        desc: 'Zoom Pro licenses for sales team members'
      }
    ],
    description: 'Need premium Zoom licenses for the sales team to conduct customer meetings with extended duration and recording capabilities.'
  },
  'office supplies': {
    title: 'Office Supplies for New Office',
    supplier: 'staples',
    purchaseType: 'office',
    subsidiary: 'us_west',
    lineItems: [
      {
        currency: 'USD',
        amount: '150.00',
        quantity: '1',
        desc: 'Office furniture set for new employee'
      },
      {
        currency: 'USD',
        amount: '25.00',
        quantity: '10',
        desc: 'Desk organizers and storage solutions'
      }
    ],
    description: 'Setting up a new office space and need basic office supplies and furniture for the new team members.'
  },
  'professional services': {
    title: 'Marketing Agency Services',
    supplier: 'new_vendor',
    purchaseType: 'services',
    subsidiary: 'us_main',
    lineItems: [
      {
        currency: 'USD',
        amount: '5000.00',
        quantity: '1',
        desc: 'Brand redesign and marketing materials'
      }
    ],
    description: 'Hiring a new marketing agency to redesign our brand identity and create new marketing materials for the upcoming product launch.'
  },
  'hardware equipment': {
    title: 'Development Team Laptops',
    supplier: 'dell',
    purchaseType: 'hardware',
    subsidiary: 'us_main',
    lineItems: [
      {
        currency: 'USD',
        amount: '1200.00',
        quantity: '8',
        desc: 'Dell XPS 15 laptops for development team'
      }
    ],
    description: 'Need new high-performance laptops for the development team to handle resource-intensive development work.'
  }
};

// Function to generate AI response based on user input
export const generateAIResponse = (userInput) => {
  const input = userInput.toLowerCase();

  if (input.includes('beer bazaar')) {
    return {
      title: 'Beer Purchase for Office Event',
      supplier: 'Beer Bazaar',
      purchaseType: 'Food and Beverages',
      subsidiary: 'us_main',
      lineItems: [
        { currency: 'USD', amount: '5', quantity: '1', desc: 'Beer Type 1' },
        { currency: 'USD', amount: '10', quantity: '1', desc: 'Beer Type 2' },
        { currency: 'USD', amount: '15', quantity: '1', desc: 'Beer Type 3' }
      ],
      description: 'Purchase of three types of beer bottles from Beer Bazaar for an office event.'
    };
  } else if (input.includes('amazon')) {
    return {
      title: 'Book Purchase: Stormlight Archive',
      supplier: 'Amazon',
      purchaseType: 'Books',
      subsidiary: 'us_main',
      lineItems: [
        { currency: 'USD', amount: '30', quantity: '1', desc: 'Stormlight Archive book' }
      ],
      description: 'Purchase of "Stormlight Archive" book from Amazon.'
    };
  } else if (input.includes('football')) {
    return {
      title: 'Mystery Football Jersey Subscription',
      supplier: 'Mystery Football Jerseys',
      purchaseType: 'Sports Merchandise',
      subsidiary: 'uk_london',
      lineItems: [
        { currency: 'GBP', amount: '30', quantity: '1', desc: "This month's shirt" }
      ],
      description: 'Subscription for this month\'s mystery football shirt.'
    };
  } else {
    return {
      title: 'AI Licenses for the Product team',
      supplier: 'Statement AI',
      purchaseType: 'Software Licenses',
      subsidiary: 'us_main',
      lineItems: [
        { currency: 'USD', amount: '100', quantity: '1', desc: 'AI License' }
      ],
      description: 'Purchase of AI licenses for the Product team from Statement AI.'
    };
  }
};

// Enhanced request records with approval workflow data
export const SAMPLE_HOME_REQUESTS = [
  // To Submit (Draft) requests
  {
    id: 'req_001',
    type: 'request',
    vendor: 'Demo',
    title: 'Demo',
    amount: 'USD 0.00',
    date: 'Jul 09, 2025',
    requester: 'Luca.M',
    status: 'Draft',
    statusLabel: 'OPEN',
    badge: 'New vendor',
    badgeColor: 'green',
    isNewVendor: true,
    createdAt: '2025-07-09T10:00:00.000Z',
    updatedAt: '2025-07-09T10:00:00.000Z',
    // Enhanced data for approval screen
    requestNumber: '001',
    currency: 'USD',
    category: 'Other',
    purchaseType: 'other',
    subsidiary: 'us_main',
    description: 'Demo request for testing purposes',
    lineItems: [
      { currency: 'USD', amount: '0.00', quantity: '1', desc: 'Demo item' }
    ],
    approvalFlow: {
      steps: [
        { role: 'Requestor', approver: 'Luca.M', status: 'pending', tooltip: 'Pending' }
      ],
      reopenedSteps: []
    },
    purchaseDetails: {
      title: 'Demo',
      purchaseType: 'other',
      vendorName: 'Demo',
      description: 'Demo request for testing purposes',
      lineItems: [
        { currency: 'USD', amount: '0.00', quantity: '1', desc: 'Demo item' }
      ]
    },
    vendorInfo: {
      vendorName: 'Demo',
      vendorEmail: 'demo@example.com',
      vendorPhone: '+1-555-0000',
      vendorAddress: 'Demo Address'
    },
    security: {
      soc2File: null,
      securityReview: 'pending'
    },
    legal: {
      contract: null,
      contractPeriod: { startDate: null, endDate: null },
      autoRenewalClause: null,
      serviceStartDate: null,
      serviceEndDate: null,
      amortizationPeriod: null
    },
    finance: {
      budget: '0.00 USD',
      costCenter: 'General',
      glAccount: 'Other'
    },
    comments: []
  },
  {
    id: 'req_002',
    type: 'request',
    vendor: 'Beer Bazaar Ltd.',
    title: 'tst',
    amount: 'USD 100.00',
    date: 'Jul 01, 2025',
    requester: 'Luca.M',
    status: 'Draft',
    statusLabel: 'OPEN',
    badge: null,
    badgeColor: null,
    isNewVendor: false,
    createdAt: '2025-07-01T10:00:00.000Z',
    updatedAt: '2025-07-01T10:00:00.000Z',
    // Enhanced data for approval screen
    requestNumber: '002',
    currency: 'USD',
    category: 'Food and Beverages',
    purchaseType: 'other',
    subsidiary: 'us_main',
    description: 'Test request for beer purchase',
    lineItems: [
      { currency: 'USD', amount: '100.00', quantity: '1', desc: 'Beer selection' }
    ],
    approvalFlow: {
      steps: [
        { role: 'Requestor', approver: 'Luca.M', status: 'pending', tooltip: 'Pending' }
      ],
      reopenedSteps: []
    },
    purchaseDetails: {
      title: 'tst',
      purchaseType: 'other',
      vendorName: 'Beer Bazaar Ltd.',
      description: 'Test request for beer purchase',
      lineItems: [
        { currency: 'USD', amount: '100.00', quantity: '1', desc: 'Beer selection' }
      ]
    },
    vendorInfo: {
      vendorName: 'Beer Bazaar Ltd.',
      vendorEmail: 'contact@beerbazaar.com',
      vendorPhone: '+1-555-0123',
      vendorAddress: '123 Beer St, Brew City, BC 12345'
    },
    security: {
      soc2File: null,
      securityReview: 'pending'
    },
    legal: {
      contract: null,
      contractPeriod: { startDate: null, endDate: null },
      autoRenewalClause: null,
      serviceStartDate: null,
      serviceEndDate: null,
      amortizationPeriod: null
    },
    finance: {
      budget: '100.00 USD',
      costCenter: 'General',
      glAccount: 'Food and Beverages'
    },
    comments: []
  },
  {
    id: 'req_003',
    type: 'request',
    vendor: 'Beer Bazaar Ltd.',
    title: '$ of budget',
    amount: 'USD 150.00',
    date: 'Jun 24, 2025',
    requester: 'Luca.M',
    status: 'Draft',
    statusLabel: 'OPEN',
    badge: null,
    badgeColor: null,
    isNewVendor: false,
    createdAt: '2025-06-24T10:00:00.000Z',
    updatedAt: '2025-06-24T10:00:00.000Z',
    // Enhanced data for approval screen
    requestNumber: '003',
    currency: 'USD',
    category: 'Food and Beverages',
    purchaseType: 'other',
    subsidiary: 'us_main',
    description: 'Budget allocation request',
    lineItems: [
      { currency: 'USD', amount: '150.00', quantity: '1', desc: 'Budget item' }
    ],
    approvalFlow: {
      steps: [
        { role: 'Requestor', approver: 'Luca.M', status: 'pending', tooltip: 'Pending' }
      ],
      reopenedSteps: []
    },
    purchaseDetails: {
      title: '$ of budget',
      purchaseType: 'other',
      vendorName: 'Beer Bazaar Ltd.',
      description: 'Budget allocation request',
      lineItems: [
        { currency: 'USD', amount: '150.00', quantity: '1', desc: 'Budget item' }
      ]
    },
    vendorInfo: {
      vendorName: 'Beer Bazaar Ltd.',
      vendorEmail: 'contact@beerbazaar.com',
      vendorPhone: '+1-555-0123',
      vendorAddress: '123 Beer St, Brew City, BC 12345'
    },
    security: {
      soc2File: null,
      securityReview: 'pending'
    },
    legal: {
      contract: null,
      contractPeriod: { startDate: null, endDate: null },
      autoRenewalClause: null,
      serviceStartDate: null,
      serviceEndDate: null,
      amortizationPeriod: null
    },
    finance: {
      budget: '150.00 USD',
      costCenter: 'General',
      glAccount: 'Food and Beverages'
    },
    comments: []
  },
  
  // To Approve (Pending approval) requests
  {
    id: 'req_004',
    type: 'request',
    vendor: 'Beer Bazaar Ltd.',
    title: 'budget again and again',
    amount: 'USD 1,000.00',
    date: 'Jul 01, 2025',
    requester: 'Jacob.C',
    status: 'Pending approval',
    statusLabel: 'APPROVE',
    badge: null,
    badgeColor: null,
    isNewVendor: false,
    createdAt: '2025-07-01T09:00:00.000Z',
    updatedAt: '2025-07-01T09:00:00.000Z',
    // Enhanced data for approval screen
    requestNumber: '004',
    currency: 'USD',
    category: 'Food and Beverages',
    purchaseType: 'other',
    subsidiary: 'us_main',
    description: 'Recurring budget request for office supplies',
    lineItems: [
      { currency: 'USD', amount: '1000.00', quantity: '1', desc: 'Office supplies budget' }
    ],
    approvalFlow: {
      steps: [
        { role: 'Requestor', approver: 'Jacob.C', status: 'completed', completedAt: '2025-07-01T09:00:00Z', tooltip: 'Approved Jul 01, 2025' },
        { role: 'VP Engineering', approver: 'Gunnar Henderson', status: 'current', tooltip: 'Pending' },
        { role: 'Technical Manager', approver: '4 possible approvers', status: 'pending', tooltip: 'Pending' },
        { role: 'GM approval', approver: '4 possible approvers', status: 'pending', tooltip: 'Pending' }
      ],
      reopenedSteps: []
    },
    purchaseDetails: {
      title: 'budget again and again',
      purchaseType: 'other',
      vendorName: 'Beer Bazaar Ltd.',
      description: 'Recurring budget request for office supplies',
      lineItems: [
        { currency: 'USD', amount: '1000.00', quantity: '1', desc: 'Office supplies budget' }
      ]
    },
    vendorInfo: {
      vendorName: 'Beer Bazaar Ltd.',
      vendorEmail: 'contact@beerbazaar.com',
      vendorPhone: '+1-555-0123',
      vendorAddress: '123 Beer St, Brew City, BC 12345'
    },
    security: {
      soc2File: null,
      securityReview: 'pending'
    },
    legal: {
      contract: null,
      contractPeriod: { startDate: null, endDate: null },
      autoRenewalClause: null,
      serviceStartDate: null,
      serviceEndDate: null,
      amortizationPeriod: null
    },
    finance: {
      budget: '1,000.00 USD',
      costCenter: 'General',
      glAccount: 'Office Supplies'
    },
    comments: [
      {
        id: 'comment-1',
        user: { email: 'yacov.gorovoy+brandonhyde@tipalti.com' },
        timestamp: '2 days ago',
        message: 'Please review this budget request for approval.'
      }
    ]
  },
  {
    id: 'req_005',
    type: 'request',
    vendor: 'Beer Bazaar Ltd.',
    title: 'budgeting our life out',
    amount: 'USD 5,011.00',
    date: 'Jul 01, 2025',
    requester: 'Jacob.C',
    status: 'Pending approval',
    statusLabel: 'APPROVE',
    badge: null,
    badgeColor: null,
    isNewVendor: false,
    createdAt: '2025-07-01T08:00:00.000Z',
    updatedAt: '2025-07-01T08:00:00.000Z',
    // Enhanced data for approval screen
    requestNumber: '005',
    currency: 'USD',
    category: 'Food and Beverages',
    purchaseType: 'other',
    subsidiary: 'us_main',
    description: 'Large budget allocation for team events',
    lineItems: [
      { currency: 'USD', amount: '5000.00', quantity: '1', desc: 'Team event budget' },
      { currency: 'USD', amount: '11.00', quantity: '1', desc: 'Additional supplies' }
    ],
    approvalFlow: {
      steps: [
        { role: 'Requestor', approver: 'Jacob.C', status: 'completed', completedAt: '2025-07-01T08:00:00Z', tooltip: 'Approved Jul 01, 2025' },
        { role: 'VP Engineering', approver: 'Gunnar Henderson', status: 'completed', completedAt: '2025-07-01T10:00:00Z', tooltip: 'Approved Jul 01, 2025' },
        { role: 'Technical Manager', approver: 'Yacov Gorovoy', status: 'current', tooltip: 'Pending' },
        { role: 'GM approval', approver: '4 possible approvers', status: 'pending', tooltip: 'Pending' }
      ],
      reopenedSteps: []
    },
    purchaseDetails: {
      title: 'budgeting our life out',
      purchaseType: 'other',
      vendorName: 'Beer Bazaar Ltd.',
      description: 'Large budget allocation for team events',
      lineItems: [
        { currency: 'USD', amount: '5000.00', quantity: '1', desc: 'Team event budget' },
        { currency: 'USD', amount: '11.00', quantity: '1', desc: 'Additional supplies' }
      ]
    },
    vendorInfo: {
      vendorName: 'Beer Bazaar Ltd.',
      vendorEmail: 'contact@beerbazaar.com',
      vendorPhone: '+1-555-0123',
      vendorAddress: '123 Beer St, Brew City, BC 12345'
    },
    security: {
      soc2File: null,
      securityReview: 'pending'
    },
    legal: {
      contract: null,
      contractPeriod: { startDate: null, endDate: null },
      autoRenewalClause: null,
      serviceStartDate: null,
      serviceEndDate: null,
      amortizationPeriod: null
    },
    finance: {
      budget: '5,011.00 USD',
      costCenter: 'General',
      glAccount: 'Team Events'
    },
    comments: [
      {
        id: 'comment-1',
        user: { email: 'yacov.gorovoy+brandonhyde@tipalti.com' },
        timestamp: '1 day ago',
        message: 'This is a significant budget request. Please review carefully.'
      }
    ]
  },
  
  // Additional "All my items" requests
  {
    id: 'req_006',
    type: 'request',
    vendor: 'Slackk',
    title: 'Test',
    amount: 'USD 100.00',
    date: 'Jul 02, 2025',
    requester: 'Luca.M',
    status: 'Pending approval',
    statusLabel: 'APPROVE',
    badge: 'Pending approval',
    badgeColor: 'blue',
    isNewVendor: false,
    createdAt: '2025-07-02T10:00:00.000Z',
    updatedAt: '2025-07-02T10:00:00.000Z',
    // Enhanced data for approval screen
    requestNumber: '006',
    currency: 'USD',
    category: 'Software Licenses',
    purchaseType: 'software',
    subsidiary: 'us_main',
    description: 'Test request for Slack licenses',
    lineItems: [
      { currency: 'USD', amount: '100.00', quantity: '1', desc: 'Slack premium licenses' }
    ],
    approvalFlow: {
      steps: [
        { role: 'Requestor', approver: 'Luca.M', status: 'completed', completedAt: '2025-07-02T10:00:00Z', tooltip: 'Approved Jul 02, 2025' },
        { role: 'VP Engineering', approver: 'Gunnar Henderson', status: 'current', tooltip: 'Pending' },
        { role: 'Technical Manager', approver: '4 possible approvers', status: 'pending', tooltip: 'Pending' },
        { role: 'GM approval', approver: '4 possible approvers', status: 'pending', tooltip: 'Pending' }
      ],
      reopenedSteps: []
    },
    purchaseDetails: {
      title: 'Test',
      purchaseType: 'software',
      vendorName: 'Slackk',
      description: 'Test request for Slack licenses',
      lineItems: [
        { currency: 'USD', amount: '100.00', quantity: '1', desc: 'Slack premium licenses' }
      ]
    },
    vendorInfo: {
      vendorName: 'Slackk',
      vendorEmail: 'contact@slackk.com',
      vendorPhone: '+1-555-0124',
      vendorAddress: '456 Communication Ave, Tech City, TC 54321'
    },
    security: {
      soc2File: null,
      securityReview: 'pending'
    },
    legal: {
      contract: null,
      contractPeriod: { startDate: null, endDate: null },
      autoRenewalClause: null,
      serviceStartDate: null,
      serviceEndDate: null,
      amortizationPeriod: null
    },
    finance: {
      budget: '100.00 USD',
      costCenter: 'Engineering',
      glAccount: 'Software Licenses'
    },
    comments: []
  },
  {
    id: 'req_007',
    type: 'request',
    vendor: 'Sweet Tooth Ltd',
    title: 'Pastries for pride month',
    amount: 'USD 150.00',
    date: 'Jun 26, 2025',
    requester: 'Luca.M',
    status: 'Pending approval',
    statusLabel: 'APPROVE',
    badge: 'Pending approval',
    badgeColor: 'blue',
    isNewVendor: false,
    createdAt: '2025-06-26T10:00:00.000Z',
    updatedAt: '2025-06-26T10:00:00.000Z',
    // Enhanced data for approval screen
    requestNumber: '007',
    currency: 'USD',
    category: 'Food and Beverages',
    purchaseType: 'other',
    subsidiary: 'us_main',
    description: 'Pastries for pride month celebration',
    lineItems: [
      { currency: 'USD', amount: '150.00', quantity: '1', desc: 'Assorted pastries for pride month' }
    ],
    approvalFlow: {
      steps: [
        { role: 'Requestor', approver: 'Luca.M', status: 'completed', completedAt: '2025-06-26T10:00:00Z', tooltip: 'Approved Jun 26, 2025' },
        { role: 'VP Engineering', approver: 'Gunnar Henderson', status: 'completed', completedAt: '2025-06-26T14:00:00Z', tooltip: 'Approved Jun 26, 2025' },
        { role: 'Technical Manager', approver: 'Yacov Gorovoy', status: 'completed', completedAt: '2025-06-27T09:00:00Z', tooltip: 'Approved Jun 27, 2025' },
        { role: 'GM approval', approver: 'Jacob Clark', status: 'current', tooltip: 'Pending' }
      ],
      reopenedSteps: []
    },
    purchaseDetails: {
      title: 'Pastries for pride month',
      purchaseType: 'other',
      vendorName: 'Sweet Tooth Ltd',
      description: 'Pastries for pride month celebration',
      lineItems: [
        { currency: 'USD', amount: '150.00', quantity: '1', desc: 'Assorted pastries for pride month' }
      ]
    },
    vendorInfo: {
      vendorName: 'Sweet Tooth Ltd',
      vendorEmail: 'orders@sweettooth.com',
      vendorPhone: '+1-555-0125',
      vendorAddress: '789 Sweet St, Bakery City, BC 67890'
    },
    security: {
      soc2File: null,
      securityReview: 'pending'
    },
    legal: {
      contract: null,
      contractPeriod: { startDate: null, endDate: null },
      autoRenewalClause: null,
      serviceStartDate: null,
      serviceEndDate: null,
      amortizationPeriod: null
    },
    finance: {
      budget: '150.00 USD',
      costCenter: 'HR',
      glAccount: 'Team Events'
    },
    comments: [
      {
        id: 'comment-1',
        user: { email: 'yacov.gorovoy+brandonhyde@tipalti.com' },
        timestamp: '5 days ago',
        message: 'Great initiative for pride month!'
      }
    ]
  },
  {
    id: 'req_008',
    type: 'request',
    vendor: 'Customize the field',
    title: 'Test',
    amount: 'USD 112.00',
    date: 'Jul 08, 2025',
    requester: 'Luca.M',
    status: 'Completed',
    statusLabel: 'COMPLETED',
    badge: 'Completed',
    badgeColor: 'green',
    isNewVendor: false,
    createdAt: '2025-07-08T10:00:00.000Z',
    updatedAt: '2025-07-08T10:00:00.000Z',
    // Enhanced data for approval screen
    requestNumber: '008',
    currency: 'USD',
    category: 'Other',
    purchaseType: 'other',
    subsidiary: 'us_main',
    description: 'Test request for field customization',
    lineItems: [
      { currency: 'USD', amount: '112.00', quantity: '1', desc: 'Custom field testing' }
    ],
    approvalFlow: {
      steps: [
        { role: 'Requestor', approver: 'Luca.M', status: 'completed', completedAt: '2025-07-08T10:00:00Z', tooltip: 'Approved Jul 08, 2025' },
        { role: 'VP Engineering', approver: 'Gunnar Henderson', status: 'completed', completedAt: '2025-07-08T11:00:00Z', tooltip: 'Approved Jul 08, 2025' },
        { role: 'Technical Manager', approver: 'Yacov Gorovoy', status: 'completed', completedAt: '2025-07-08T12:00:00Z', tooltip: 'Approved Jul 08, 2025' },
        { role: 'GM approval', approver: 'Jacob Clark', status: 'completed', completedAt: '2025-07-08T13:00:00Z', tooltip: 'Approved Jul 08, 2025' }
      ],
      reopenedSteps: []
    },
    purchaseDetails: {
      title: 'Test',
      purchaseType: 'other',
      vendorName: 'Customize the field',
      description: 'Test request for field customization',
      lineItems: [
        { currency: 'USD', amount: '112.00', quantity: '1', desc: 'Custom field testing' }
      ]
    },
    vendorInfo: {
      vendorName: 'Customize the field',
      vendorEmail: 'contact@customize.com',
      vendorPhone: '+1-555-0126',
      vendorAddress: '321 Custom St, Field City, FC 13579'
    },
    security: {
      soc2File: null,
      securityReview: 'completed'
    },
    legal: {
      contract: null,
      contractPeriod: { startDate: null, endDate: null },
      autoRenewalClause: null,
      serviceStartDate: null,
      serviceEndDate: null,
      amortizationPeriod: null
    },
    finance: {
      budget: '112.00 USD',
      costCenter: 'Engineering',
      glAccount: 'Other'
    },
    comments: [
      {
        id: 'comment-1',
        user: { email: 'yacov.gorovoy+brandonhyde@tipalti.com' },
        timestamp: '1 day ago',
        message: 'Request completed successfully.'
      }
    ]
  },
  
  // Additional requests to reach proper counts
  {
    id: 'req_009',
    type: 'request',
    vendor: 'Tech Solutions Inc',
    title: 'Software licenses',
    amount: 'USD 2,500.00',
    date: 'Jul 03, 2025',
    requester: 'Mike.D',
    status: 'Pending approval',
    statusLabel: 'APPROVE',
    badge: null,
    badgeColor: null,
    isNewVendor: false,
    createdAt: '2025-07-03T10:00:00.000Z',
    updatedAt: '2025-07-03T10:00:00.000Z',
    // Enhanced data for approval screen
    requestNumber: '009',
    currency: 'USD',
    category: 'Software Licenses',
    purchaseType: 'software',
    subsidiary: 'us_main',
    description: 'Software licenses for development team',
    lineItems: [
      { currency: 'USD', amount: '2500.00', quantity: '1', desc: 'Development software licenses' }
    ],
    approvalFlow: {
      steps: [
        { role: 'Requestor', approver: 'Mike.D', status: 'completed', completedAt: '2025-07-03T10:00:00Z', tooltip: 'Approved Jul 03, 2025' },
        { role: 'VP Engineering', approver: 'Gunnar Henderson', status: 'current', tooltip: 'Pending' },
        { role: 'Technical Manager', approver: '4 possible approvers', status: 'pending', tooltip: 'Pending' },
        { role: 'GM approval', approver: '4 possible approvers', status: 'pending', tooltip: 'Pending' }
      ],
      reopenedSteps: []
    },
    purchaseDetails: {
      title: 'Software licenses',
      purchaseType: 'software',
      vendorName: 'Tech Solutions Inc',
      description: 'Software licenses for development team',
      lineItems: [
        { currency: 'USD', amount: '2500.00', quantity: '1', desc: 'Development software licenses' }
      ]
    },
    vendorInfo: {
      vendorName: 'Tech Solutions Inc',
      vendorEmail: 'sales@techsolutions.com',
      vendorPhone: '+1-555-0127',
      vendorAddress: '654 Tech Blvd, Solution City, SC 24680'
    },
    security: {
      soc2File: null,
      securityReview: 'pending'
    },
    legal: {
      contract: null,
      contractPeriod: { startDate: null, endDate: null },
      autoRenewalClause: null,
      serviceStartDate: null,
      serviceEndDate: null,
      amortizationPeriod: null
    },
    finance: {
      budget: '2,500.00 USD',
      costCenter: 'Engineering',
      glAccount: 'Software Licenses'
    },
    comments: []
  },
  {
    id: 'req_010',
    type: 'request',
    vendor: 'Office Supplies Corp',
    title: 'Monthly office supplies',
    amount: 'USD 750.00',
    date: 'Jun 28, 2025',
    requester: 'Sarah.J',
    status: 'Pending approval',
    statusLabel: 'APPROVE',
    badge: null,
    badgeColor: null,
    isNewVendor: false,
    createdAt: '2025-06-28T10:00:00.000Z',
    updatedAt: '2025-06-28T10:00:00.000Z',
    // Enhanced data for approval screen
    requestNumber: '010',
    currency: 'USD',
    category: 'Office Supplies',
    purchaseType: 'office',
    subsidiary: 'us_main',
    description: 'Monthly office supplies for all departments',
    lineItems: [
      { currency: 'USD', amount: '750.00', quantity: '1', desc: 'Monthly office supplies' }
    ],
    approvalFlow: {
      steps: [
        { role: 'Requestor', approver: 'Sarah.J', status: 'completed', completedAt: '2025-06-28T10:00:00Z', tooltip: 'Approved Jun 28, 2025' },
        { role: 'VP Engineering', approver: 'Gunnar Henderson', status: 'completed', completedAt: '2025-06-28T14:00:00Z', tooltip: 'Approved Jun 28, 2025' },
        { role: 'Technical Manager', approver: 'Yacov Gorovoy', status: 'current', tooltip: 'Pending' },
        { role: 'GM approval', approver: '4 possible approvers', status: 'pending', tooltip: 'Pending' }
      ],
      reopenedSteps: []
    },
    purchaseDetails: {
      title: 'Monthly office supplies',
      purchaseType: 'office',
      vendorName: 'Office Supplies Corp',
      description: 'Monthly office supplies for all departments',
      lineItems: [
        { currency: 'USD', amount: '750.00', quantity: '1', desc: 'Monthly office supplies' }
      ]
    },
    vendorInfo: {
      vendorName: 'Office Supplies Corp',
      vendorEmail: 'orders@officesupplies.com',
      vendorPhone: '+1-555-0128',
      vendorAddress: '987 Office Ave, Supply City, SC 97531'
    },
    security: {
      soc2File: null,
      securityReview: 'pending'
    },
    legal: {
      contract: null,
      contractPeriod: { startDate: null, endDate: null },
      autoRenewalClause: null,
      serviceStartDate: null,
      serviceEndDate: null,
      amortizationPeriod: null
    },
    finance: {
      budget: '750.00 USD',
      costCenter: 'Administration',
      glAccount: 'Office Supplies'
    },
    comments: []
  },
  
  // Special requests that match the screenshots
  {
    id: 'req_023',
    type: 'request',
    vendor: 'The Matrix',
    title: 'Video licenses',
    amount: 'USD 445.00',
    date: 'May 31, 2025',
    requester: 'Luca.M',
    status: 'Pending approval',
    statusLabel: 'APPROVE',
    badge: null,
    badgeColor: null,
    isNewVendor: false,
    createdAt: '2025-05-31T10:00:00.000Z',
    updatedAt: '2025-05-31T10:00:00.000Z',
    // Enhanced data for approval screen
    requestNumber: '23',
    currency: 'USD',
    category: 'Professional Services',
    purchaseType: 'services',
    subsidiary: 'us_main',
    description: 'Video licenses - May 2025',
    lineItems: [
      { currency: 'USD', amount: '100.00', quantity: '1', desc: 'Audio licenses', recurrence: 'Monthly', endDate: 'In 4 months' },
      { currency: 'USD', amount: '45.00', quantity: '1', desc: 'Support and warranty', recurrence: 'One-time' }
    ],
    approvalFlow: {
      steps: [
        { role: 'Requestor', approver: 'Adley Rutschman', status: 'completed', completedAt: '2025-05-30T10:00:00Z', tooltip: 'Approved May 30, 2025' },
        { role: 'VP Engineering', approver: 'Gunnar Henderson', status: 'completed', completedAt: '2025-05-30T14:00:00Z', tooltip: 'Approved May 30, 2025' },
        { role: 'Technical Manager', approver: '4 possible approvers', status: 'current', tooltip: 'Pending' },
        { role: 'GM approval', approver: '4 possible approvers', status: 'pending', tooltip: 'Pending' }
      ],
      reopenedSteps: []
    },
    purchaseDetails: {
      title: 'Video licenses',
      purchaseType: 'services',
      vendorName: 'The Matrix',
      description: 'Video licenses - May 2025',
      lineItems: [
        { currency: 'USD', amount: '100.00', quantity: '1', desc: 'Audio licenses', recurrence: 'Monthly', endDate: 'In 4 months' },
        { currency: 'USD', amount: '45.00', quantity: '1', desc: 'Support and warranty', recurrence: 'One-time' }
      ]
    },
    vendorInfo: {
      vendorName: 'The Matrix',
      vendorEmail: 'contact@thematrix.com',
      vendorPhone: '+1-555-0129',
      vendorAddress: '123 Matrix St, Cyber City, CC 12345'
    },
    security: {
      soc2File: null,
      securityReview: 'pending'
    },
    legal: {
      contract: null,
      contractPeriod: { startDate: null, endDate: null },
      autoRenewalClause: null,
      serviceStartDate: '2025-05-31',
      serviceEndDate: '2026-05-29',
      amortizationPeriod: 'May 30, 2025 - May 30, 2026'
    },
    finance: {
      budget: '445.00 USD',
      costCenter: 'Engineering',
      glAccount: 'Software Licenses'
    },
    comments: [
      {
        id: 'comment-1',
        user: { email: 'yacov.gorovoy+brandonhyde@tipalti.com' },
        timestamp: '5 days ago',
        message: '@yacov.gorovoy+jackflagerty@tipalti.com - Please review the financial details on this request.'
      },
      {
        id: 'comment-2',
        user: { email: 'yacov.gorovoy+brandonhyde@tipalti.com' },
        timestamp: 'a day ago',
        message: '@yacov.gorovoy+adahegerberg@tipalti.com - Please have a look'
      }
    ]
  },
  {
    id: 'req_005_po',
    type: 'request',
    vendor: 'Owl AI Enterprises LTD',
    title: 'test edit approved POs',
    amount: 'USD 10,328,953.00',
    date: 'May 30, 2025',
    requester: 'Adley Rutschman',
    status: 'Pending approval',
    statusLabel: 'APPROVE',
    badge: null,
    badgeColor: null,
    isNewVendor: false,
    createdAt: '2025-05-30T10:00:00.000Z',
    updatedAt: '2025-05-30T10:00:00.000Z',
    // Enhanced data for approval screen
    requestNumber: '5',
    currency: 'USD',
    category: 'Travel',
    purchaseType: 'travel',
    subsidiary: 'us_main',
    description: 'Test edit approved purchase orders',
    lineItems: [
      { currency: 'USD', amount: '10328953.00', quantity: '1', desc: 'Travel services' }
    ],
    approvalFlow: {
      steps: [
        { role: 'Requestor', approver: 'Adley Rutschman', status: 'completed', completedAt: '2025-05-30T10:00:00Z', tooltip: 'Approved May 30, 2025' },
        { role: 'VP Engineering', approver: 'Gunnar Henderson', status: 'completed', completedAt: '2025-05-30T14:00:00Z', tooltip: 'Approved May 30, 2025' },
        { role: 'Technical Manager', approver: 'Yacov Gorovoy', status: 'completed', completedAt: '2025-05-30T16:00:00Z', tooltip: 'Approved May 30, 2025' },
        { role: 'GM approval', approver: 'Yacov Gorovoy', status: 'completed', completedAt: '2025-05-30T18:00:00Z', tooltip: 'Approved May 30, 2025' }
      ],
      reopenedSteps: [
        { reopenedBy: 'Adley Rutschman', reopenedAt: '2025-06-01T09:00:00Z', reason: 'Request reopened for review' },
        { reopenedBy: 'Adley Rutschman', reopenedAt: '2025-06-02T10:00:00Z', reason: 'Request reopened for additional review' }
      ]
    },
    purchaseDetails: {
      title: 'test edit approved POs',
      purchaseType: 'travel',
      vendorName: 'Owl AI Enterprises LTD',
      description: 'Test edit approved purchase orders',
      lineItems: [
        { currency: 'USD', amount: '10328953.00', quantity: '1', desc: 'Travel services' }
      ]
    },
    vendorInfo: {
      vendorName: 'Owl AI Enterprises LTD',
      vendorEmail: 'contact@owlai.com',
      vendorPhone: '+1-555-0130',
      vendorAddress: '456 AI Blvd, Tech City, TC 54321'
    },
    security: {
      soc2File: null,
      securityReview: 'pending'
    },
    legal: {
      contract: null,
      contractPeriod: { startDate: null, endDate: null },
      autoRenewalClause: null,
      serviceStartDate: null,
      serviceEndDate: null,
      amortizationPeriod: null
    },
    finance: {
      budget: '10,328,953.00 USD',
      costCenter: 'Travel',
      glAccount: 'Travel Expenses'
    },
    comments: []
  }
];

// Generate additional draft requests to reach count of 21
const generateAdditionalDrafts = () => {
  const additionalDrafts = [];
  const vendors = ['Microsoft Corp', 'Adobe Inc', 'Zoom Technologies', 'Salesforce Inc', 'AWS Services', 'Google Cloud', 'Oracle Corp', 'IBM Solutions', 'Cisco Systems', 'Apple Inc', 'Dell Technologies'];
  const titles = ['Software renewal', 'License upgrade', 'Service contract', 'Hardware purchase', 'Training materials', 'Consulting services', 'Cloud storage', 'Development tools', 'Security software', 'Maintenance contract'];
  
  for (let i = 11; i <= 21; i++) {
    const vendor = vendors[Math.floor(Math.random() * vendors.length)];
    const title = titles[Math.floor(Math.random() * titles.length)];
    const amount = Math.floor(Math.random() * 3000) + 200;
    const dayOffset = Math.floor(Math.random() * 30) + 1;
    const date = new Date(Date.now() - dayOffset * 24 * 60 * 60 * 1000);
    const requestNumber = i.toString().padStart(3, '0');
    
    additionalDrafts.push({
      id: `req_${requestNumber}`,
      type: 'request',
      vendor,
      title,
      amount: `USD ${amount.toLocaleString()}.00`,
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      requester: 'Luca.M',
      status: 'Draft',
      statusLabel: 'OPEN',
      badge: null,
      badgeColor: null,
      isNewVendor: false,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
      // Enhanced data for approval screen
      requestNumber,
      currency: 'USD',
      category: 'Software Licenses',
      purchaseType: 'software',
      subsidiary: 'us_main',
      description: `${title} for ${vendor}`,
      lineItems: [
        { currency: 'USD', amount: amount.toString(), quantity: '1', desc: title }
      ],
      approvalFlow: {
        steps: [
          { role: 'Requestor', approver: 'Luca.M', status: 'pending', tooltip: 'Pending' }
        ],
        reopenedSteps: []
      },
      purchaseDetails: {
        title,
        purchaseType: 'software',
        vendorName: vendor,
        description: `${title} for ${vendor}`,
        lineItems: [
          { currency: 'USD', amount: amount.toString(), quantity: '1', desc: title }
        ]
      },
      vendorInfo: {
        vendorName: vendor,
        vendorEmail: `contact@${vendor.toLowerCase().replace(/\s+/g, '')}.com`,
        vendorPhone: `+1-555-${Math.floor(Math.random() * 9000) + 1000}`,
        vendorAddress: `${Math.floor(Math.random() * 9999) + 1} ${vendor} St, City, ST ${Math.floor(Math.random() * 90000) + 10000}`
      },
      security: {
        soc2File: null,
        securityReview: 'pending'
      },
      legal: {
        contract: null,
        contractPeriod: { startDate: null, endDate: null },
        autoRenewalClause: null,
        serviceStartDate: null,
        serviceEndDate: null,
        amortizationPeriod: null
      },
      finance: {
        budget: `${amount.toLocaleString()}.00 USD`,
        costCenter: 'General',
        glAccount: 'Software Licenses'
      },
      comments: []
    });
  }
  
  return additionalDrafts;
};

// Generate additional pending approval requests to reach count of 26
const generateAdditionalPendingApproval = () => {
  const additionalPending = [];
  const vendors = ['Marketing Solutions', 'HR Services Ltd', 'Facilities Management', 'Legal Services Inc', 'Accounting Corp', 'IT Support Group', 'Security Solutions', 'Training Academy', 'Catering Services', 'Cleaning Company', 'Transport Services', 'Insurance Group', 'Banking Services', 'Telecommunications', 'Energy Provider', 'Consulting Firm'];
  const titles = ['Monthly service', 'Annual contract', 'Project delivery', 'Support package', 'Maintenance agreement', 'Professional services', 'Equipment rental', 'Training program', 'Consulting project', 'Service upgrade'];
  const requesters = ['Jacob.C', 'Mike.D', 'Sarah.J', 'Lisa.R', 'Tom.W', 'Emma.K', 'David.P', 'Anna.S'];
  const categories = ['Software Licenses', 'Professional Services', 'Hardware & Equipment', 'Office Supplies', 'Marketing & Advertising', 'Travel & Accommodation', 'Training & Development', 'Consulting Services', 'Maintenance & Support', 'Other'];
  const purchaseTypes = ['software', 'services', 'hardware', 'office', 'marketing', 'travel', 'training', 'consulting', 'maintenance', 'other'];
  
  for (let i = 11; i <= 26; i++) {
    const vendor = vendors[Math.floor(Math.random() * vendors.length)];
    const title = titles[Math.floor(Math.random() * titles.length)];
    const requester = requesters[Math.floor(Math.random() * requesters.length)];
    const amount = Math.floor(Math.random() * 8000) + 500;
    const dayOffset = Math.floor(Math.random() * 20) + 1;
    const date = new Date(Date.now() - dayOffset * 24 * 60 * 60 * 1000);
    const categoryIndex = Math.floor(Math.random() * categories.length);
    const category = categories[categoryIndex];
    const purchaseType = purchaseTypes[categoryIndex];
    const requestNumber = (i + 100).toString().padStart(3, '0');
    
    // Generate approval flow steps
    const approvalSteps = [
      { role: 'Requestor', approver: requester, status: 'completed', completedAt: date.toISOString(), tooltip: `Approved ${date.toLocaleDateString()}` },
      { role: 'VP Engineering', approver: 'Gunnar Henderson', status: 'current', tooltip: 'Pending' },
      { role: 'Technical Manager', approver: '4 possible approvers', status: 'pending', tooltip: 'Pending' },
      { role: 'GM approval', approver: '4 possible approvers', status: 'pending', tooltip: 'Pending' }
    ];
    
    additionalPending.push({
      id: `req_${requestNumber}`,
      type: 'request',
      vendor,
      title,
      amount: `USD ${amount.toLocaleString()}.00`,
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      requester,
      status: 'Pending approval',
      statusLabel: 'APPROVE',
      badge: null,
      badgeColor: null,
      isNewVendor: false,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
      // Enhanced data for approval screen
      requestNumber,
      currency: 'USD',
      category,
      purchaseType,
      subsidiary: 'us_main',
      description: `${title} for ${vendor}`,
      lineItems: [
        { currency: 'USD', amount: amount.toString(), quantity: '1', desc: title }
      ],
      approvalFlow: {
        steps: approvalSteps,
        reopenedSteps: []
      },
      purchaseDetails: {
        title,
        purchaseType,
        vendorName: vendor,
        description: `${title} for ${vendor}`,
        lineItems: [
          { currency: 'USD', amount: amount.toString(), quantity: '1', desc: title }
        ]
      },
      vendorInfo: {
        vendorName: vendor,
        vendorEmail: `contact@${vendor.toLowerCase().replace(/\s+/g, '')}.com`,
        vendorPhone: `+1-555-${Math.floor(Math.random() * 9000) + 1000}`,
        vendorAddress: `${Math.floor(Math.random() * 9999) + 1} ${vendor} St, City, ST ${Math.floor(Math.random() * 90000) + 10000}`
      },
      security: {
        soc2File: null,
        securityReview: 'pending'
      },
      legal: {
        contract: null,
        contractPeriod: { startDate: null, endDate: null },
        autoRenewalClause: null,
        serviceStartDate: null,
        serviceEndDate: null,
        amortizationPeriod: null
      },
      finance: {
        budget: `${amount.toLocaleString()}.00 USD`,
        costCenter: 'General',
        glAccount: category
      },
      comments: []
    });
  }
  
  return additionalPending;
};

// Combined sample requests with proper counts
export const ALL_SAMPLE_REQUESTS = [
  ...SAMPLE_HOME_REQUESTS,
  ...generateAdditionalDrafts(),
  ...generateAdditionalPendingApproval()
];

// Storage functions (re-exported from storage.js)
export const saveDraft = (draft) => {
  try {
    const drafts = getDrafts();
    const existingIndex = drafts.findIndex(d => d.id === draft.id);
    
    if (existingIndex >= 0) {
      drafts[existingIndex] = { ...draft, updatedAt: new Date().toISOString() };
    } else {
      drafts.push({ ...draft, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    
    localStorage.setItem('procurement_drafts', JSON.stringify(drafts));
    return true;
  } catch (error) {
    console.error('Error saving draft:', error);
    return false;
  }
};

export const getDrafts = () => {
  try {
    const drafts = localStorage.getItem('procurement_drafts');
    return drafts ? JSON.parse(drafts) : [];
  } catch (error) {
    console.error('Error getting drafts:', error);
    return [];
  }
};

export const getDraft = (id) => {
  const drafts = getDrafts();
  return drafts.find(d => d.id === id);
};

export const saveCurrentDraft = (draft) => {
  try {
    localStorage.setItem('procurement_current_draft', JSON.stringify(draft));
    return true;
  } catch (error) {
    console.error('Error saving current draft:', error);
    return false;
  }
};

export const clearCurrentDraft = () => {
  try {
    localStorage.removeItem('procurement_current_draft');
    return true;
  } catch (error) {
    console.error('Error clearing current draft:', error);
    return false;
  }
};

export const generateDraftId = () => {
  return `draft_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}; 