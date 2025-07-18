import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import BackLink from '../components/BackLink';
import RequestSummaryHeader from '../components/RequestSummaryHeader';
import ProcessFlow from '../components/ProcessFlow';
import Tabs from '../components/Tabs';
import Typography from '../components/Typography';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import FormTextarea from '../components/FormTextarea';
import DatePicker from '../components/DatePicker';
import FileUploadInput from '../components/FileUploadInput';
import LineItemsTable from '../components/LineItemsTable';
import CommentsSection from '../components/CommentsSection';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { localDB, forceRefreshData } from '../utils/localDB';
import { PURCHASE_TYPES, SUBSIDIARIES } from '../utils/mockData';

export default function RequestApprovalScreen({ onNavigate, requestId }) {
  const [request, setRequest] = useState(null);
  const [activeTab, setActiveTab] = useState('purchase');
  const [loading, setLoading] = useState(true);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalAction, setApprovalAction] = useState(null);

  // Load request data
  useEffect(() => {
    // Force refresh data to ensure we have the latest structure
    forceRefreshData();
    
    if (requestId) {
      const requestData = localDB.getById(requestId);
      if (requestData) {
        setRequest(requestData);
      }
      setLoading(false);
    }
  }, [requestId]);

  // Handle field updates
  const handleFieldUpdate = (field, value) => {
    if (!request) return;
    
    const updatedRequest = { ...request };
    
    // Update based on field path
    if (field.startsWith('purchaseDetails.')) {
      const subField = field.replace('purchaseDetails.', '');
      updatedRequest.purchaseDetails = {
        ...updatedRequest.purchaseDetails,
        [subField]: value
      };
    } else if (field.startsWith('vendorInfo.')) {
      const subField = field.replace('vendorInfo.', '');
      updatedRequest.vendorInfo = {
        ...updatedRequest.vendorInfo,
        [subField]: value
      };
    } else if (field.startsWith('security.')) {
      const subField = field.replace('security.', '');
      updatedRequest.security = {
        ...updatedRequest.security,
        [subField]: value
      };
    } else if (field.startsWith('legal.')) {
      const subField = field.replace('legal.', '');
      updatedRequest.legal = {
        ...updatedRequest.legal,
        [subField]: value
      };
    } else if (field.startsWith('finance.')) {
      const subField = field.replace('finance.', '');
      updatedRequest.finance = {
        ...updatedRequest.finance,
        [subField]: value
      };
    } else {
      updatedRequest[field] = value;
    }
    
    setRequest(updatedRequest);
    localDB.update(requestId, updatedRequest);
  };

  // Handle line items update
  const handleLineItemsUpdate = (lineItems) => {
    if (!request) return;
    
    const updatedRequest = { ...request };
    updatedRequest.purchaseDetails.lineItems = lineItems;
    updatedRequest.lineItems = lineItems;
    
    setRequest(updatedRequest);
    localDB.update(requestId, updatedRequest);
  };

  // Handle comments
  const handleAddComment = (comment) => {
    if (!request) return;
    
    const newComment = {
      id: `comment-${Date.now()}`,
      user: { email: 'yacov.gorovoy+brandonhyde@tipalti.com' },
      timestamp: 'Just now',
      message: comment
    };
    
    const updatedRequest = {
      ...request,
      comments: [...(request.comments || []), newComment]
    };
    
    setRequest(updatedRequest);
    localDB.update(requestId, updatedRequest);
  };

  // Handle approval/rejection
  const handleApprovalAction = (action) => {
    setApprovalAction(action);
    setShowApprovalModal(true);
  };

  const confirmApprovalAction = () => {
    if (!request || !approvalAction) return;
    
    const updatedRequest = { ...request };
    
    if (approvalAction === 'approve') {
      // Update approval flow
      if (updatedRequest.approvalFlow?.steps) {
        const currentStepIndex = updatedRequest.approvalFlow.steps.findIndex(step => step.status === 'current');
        if (currentStepIndex !== -1) {
          updatedRequest.approvalFlow.steps[currentStepIndex].status = 'completed';
          updatedRequest.approvalFlow.steps[currentStepIndex].completedAt = new Date().toISOString();
          updatedRequest.approvalFlow.steps[currentStepIndex].tooltip = `Approved ${new Date().toLocaleDateString()}`;
          
          // Move to next step or complete
          if (currentStepIndex + 1 < updatedRequest.approvalFlow.steps.length) {
            updatedRequest.approvalFlow.steps[currentStepIndex + 1].status = 'current';
          } else {
            updatedRequest.status = 'Completed';
            updatedRequest.statusLabel = 'COMPLETED';
          }
        }
      }
    } else if (approvalAction === 'reject') {
      updatedRequest.status = 'Rejected';
      updatedRequest.statusLabel = 'REJECTED';
    }
    
    setRequest(updatedRequest);
    localDB.update(requestId, updatedRequest);
    setShowApprovalModal(false);
    setApprovalAction(null);
  };

  // Get tab counts for pending items
  const getTabCounts = () => {
    if (!request) return {};
    
    const counts = {};
    
    // Security tab count
    if (!request.security?.soc2File) {
      counts.security = 1;
    }
    
    // Legal tab count
    let legalCount = 0;
    if (!request.legal?.contract) legalCount++;
    if (!request.legal?.contractPeriod?.startDate) legalCount++;
    counts.legal = legalCount;
    
    return counts;
  };

  // Get mentionable users for comments
  const getMentionableUsers = () => {
    if (!request) return [];
    
    const users = [];
    
    // Add approvers from approval flow
    if (request.approvalFlow?.steps) {
      request.approvalFlow.steps.forEach(step => {
        if (step.approver && step.approver !== '4 possible approvers') {
          users.push({
            email: `${step.approver.toLowerCase().replace(' ', '.')}@tipalti.com`,
            name: step.approver
          });
        }
      });
    }
    
    // Add existing commenters
    if (request.comments) {
      request.comments.forEach(comment => {
        if (comment.user?.email) {
          const existingUser = users.find(u => u.email === comment.user.email);
          if (!existingUser) {
            users.push({
              email: comment.user.email,
              name: comment.user.email.split('@')[0].replace(/\./g, ' ')
            });
          }
        }
      });
    }
    
    return users;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading request...</div>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Request not found</div>
        </div>
      </div>
    );
  }

  const tabCounts = getTabCounts();
  const mentionableUsers = getMentionableUsers();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar active="home" onNavClick={key => console.log('Nav:', key)} expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      
      <div className={`flex flex-col flex-1 transition-all duration-300 min-w-0 ${sidebarExpanded ? 'ml-48' : 'ml-16'}`}>
        {/* Header */}
        <Header sectionTitle="Request Approval" companyName="Acme Corp" userAvatar={'https://ui-avatars.com/api/?name=User&background=E0E7EF&color=374151&size=64'} userEmail="yacov.gorovoy@acmecorp.com" />
        
        {/* Main Content */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Center Content */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden min-w-[800px]">
            {/* Back Link and Request Summary Header */}
            <div className="px-6 py-3">
              <div className="flex items-center gap-4 mb-3">
                <BackLink onClick={() => onNavigate('home')}>Back</BackLink>
                <RequestSummaryHeader
                  title={request.title || 'Untitled'}
                  requestNumber={request.requestNumber || 'N/A'}
                  status={request.status === 'Pending approval' ? 'Pending Approval' : request.status || 'Unknown'}
                  statusColor={request.status === 'Pending approval' ? 'blue' : request.status === 'Completed' ? 'green' : 'gray'}
                  amount={`${request.amount || '0.00'} ${request.currency || 'USD'}`}
                  vendor={request.vendor || 'Unknown'}
                  category={request.category || 'Other'}
                />
              </div>
            </div>
            
            {/* Approval Flow */}
            <div className="px-6 mt-3">
              <ProcessFlow steps={request.approvalFlow?.steps || []} />
              {request.approvalFlow?.reopenedSteps?.length > 0 && (
                <div className="mt-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Hide previous approvals
                  </button>
                </div>
              )}
            </div>
            
            {/* Tabs */}
            <div className="px-6 mt-3">
              <Tabs
                tabs={[
                  { label: 'Purchase details', key: 'purchase' },
                  { label: 'Vendor info', key: 'vendor' },
                  { label: 'Security', key: 'security', count: tabCounts.security || 0 },
                  { label: 'Legal', key: 'legal', count: tabCounts.legal || 0 },
                  { label: 'Finance', key: 'finance' }
                ]}
                activeTab={activeTab}
                onTabClick={setActiveTab}
                showCounts={true}
              />
            </div>
            
            {/* Tab Content */}
            <div className="flex-1 p-6 pt-3 overflow-y-auto min-h-0">
              {activeTab === 'purchase' && (
                <div className="space-y-4">
                  <Typography variant="h2">Purchase details</Typography>
                  
                  <FormInput
                    label="Title *"
                    value={request.purchaseDetails?.title || ''}
                    variant="inline"
                    readOnly={true}
                    onSave={(value) => handleFieldUpdate('purchaseDetails.title', value)}
                  />
                  
                  <FormSelect
                    label="Purchase type *"
                    value={request.purchaseDetails?.purchaseType || ''}
                    options={PURCHASE_TYPES}
                    variant="inline"
                    readOnly={true}
                    onSave={(value) => handleFieldUpdate('purchaseDetails.purchaseType', value)}
                  />
                  
                  <FormInput
                    label="Vendor name *"
                    value={request.purchaseDetails?.vendorName || ''}
                    variant="inline"
                    readOnly={true}
                    onSave={(value) => handleFieldUpdate('purchaseDetails.vendorName', value)}
                  />
                  
                  <FormTextarea
                    label="Description *"
                    value={request.purchaseDetails?.description || ''}
                    variant="inline"
                    readOnly={true}
                    onSave={(value) => handleFieldUpdate('purchaseDetails.description', value)}
                  />
                  
                  <div>
                    <Typography variant="h3" className="mb-3">Line items</Typography>
                    <LineItemsTable
                      items={request.purchaseDetails?.lineItems || []}
                      onItemChange={handleLineItemsUpdate}
                      variant="inline"
                      readOnly={true}
                      onEdit={() => {}}
                      onSave={(items) => handleLineItemsUpdate(items)}
                      onCancel={() => {}}
                    />
                  </div>
                </div>
              )}
              
              {activeTab === 'vendor' && (
                <div className="space-y-4">
                  <Typography variant="h2">Vendor info</Typography>
                  
                  <FormInput
                    label="Vendor name"
                    value={request.vendorInfo?.vendorName || ''}
                    variant="inline"
                    readOnly={true}
                    onSave={(value) => handleFieldUpdate('vendorInfo.vendorName', value)}
                  />
                  
                  <FormInput
                    label="Vendor email"
                    value={request.vendorInfo?.vendorEmail || ''}
                    variant="inline"
                    readOnly={true}
                    onSave={(value) => handleFieldUpdate('vendorInfo.vendorEmail', value)}
                  />
                  
                  <FormInput
                    label="Vendor phone"
                    value={request.vendorInfo?.vendorPhone || ''}
                    variant="inline"
                    readOnly={true}
                    onSave={(value) => handleFieldUpdate('vendorInfo.vendorPhone', value)}
                  />
                  
                  <FormTextarea
                    label="Vendor address"
                    value={request.vendorInfo?.vendorAddress || ''}
                    variant="inline"
                    readOnly={true}
                    onSave={(value) => handleFieldUpdate('vendorInfo.vendorAddress', value)}
                  />
                </div>
              )}
              
              {activeTab === 'security' && (
                <div className="space-y-4">
                  <Typography variant="h2">Security</Typography>
                  
                  <FileUploadInput
                    label="SOC2 file *"
                    onFileSelect={(file) => handleFieldUpdate('security.soc2File', file)}
                    acceptedTypes={['.pdf', '.doc', '.docx']}
                    maxSize={5 * 1024 * 1024}
                    placeholder="Upload file..."
                    required
                    variant="inline"
                    readOnly={true}
                    onSave={(file) => handleFieldUpdate('security.soc2File', file)}
                  />
                </div>
              )}
              
              {activeTab === 'legal' && (
                <div className="space-y-4">
                  <Typography variant="h2">Legal</Typography>
                  
                  <FileUploadInput
                    label="Contract"
                    onFileSelect={(file) => handleFieldUpdate('legal.contract', file)}
                    acceptedTypes={['.pdf', '.doc', '.docx']}
                    maxSize={10 * 1024 * 1024}
                    placeholder="Upload file..."
                    variant="inline"
                    readOnly={true}
                    onSave={(file) => handleFieldUpdate('legal.contract', file)}
                  />
                  
                  <DatePicker
                    variant="range"
                    startDate={request.legal?.contractPeriod?.startDate ? new Date(request.legal.contractPeriod.startDate) : null}
                    endDate={request.legal?.contractPeriod?.endDate ? new Date(request.legal.contractPeriod.endDate) : null}
                    onChange={(start, end) => {
                      handleFieldUpdate('legal.contractPeriod.startDate', start ? start.toISOString().split('T')[0] : null);
                      handleFieldUpdate('legal.contractPeriod.endDate', end ? end.toISOString().split('T')[0] : null);
                    }}
                    label="Contract period"
                    placeholder="Select Date"
                    inputVariant="inline"
                    readOnly={true}
                  />
                  
                  <FormSelect
                    label="Has auto-renewal clause? (Optional)"
                    value={request.legal?.autoRenewalClause || ''}
                    options={[
                      { label: 'Yes', value: 'yes' },
                      { label: 'No', value: 'no' },
                      { label: 'Not specified', value: 'not_specified' }
                    ]}
                    variant="inline"
                    readOnly={true}
                    onSave={(value) => handleFieldUpdate('legal.autoRenewalClause', value)}
                  />
                  
                  <FormInput
                    label="Service start date"
                    value={request.legal?.serviceStartDate || ''}
                    variant="inline"
                    readOnly={true}
                    onSave={(value) => handleFieldUpdate('legal.serviceStartDate', value)}
                  />
                  
                  <FormInput
                    label="Service end date *"
                    value={request.legal?.serviceEndDate || ''}
                    variant="inline"
                    readOnly={true}
                    onSave={(value) => handleFieldUpdate('legal.serviceEndDate', value)}
                  />
                  
                  <FormInput
                    label="Amortization Period *"
                    value={request.legal?.amortizationPeriod || ''}
                    variant="inline"
                    readOnly={true}
                    onSave={(value) => handleFieldUpdate('legal.amortizationPeriod', value)}
                  />
                </div>
              )}
              
              {activeTab === 'finance' && (
                <div className="space-y-4">
                  <Typography variant="h2">Finance</Typography>
                  
                  <FormInput
                    label="Budget"
                    value={request.finance?.budget || ''}
                    variant="inline"
                    readOnly={true}
                    onSave={(value) => handleFieldUpdate('finance.budget', value)}
                  />
                  
                  <FormInput
                    label="Cost Center"
                    value={request.finance?.costCenter || ''}
                    variant="inline"
                    readOnly={true}
                    onSave={(value) => handleFieldUpdate('finance.costCenter', value)}
                  />
                  
                  <FormInput
                    label="GL Account"
                    value={request.finance?.glAccount || ''}
                    variant="inline"
                    readOnly={true}
                    onSave={(value) => handleFieldUpdate('finance.glAccount', value)}
                  />
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="p-6 border-t bg-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <Button
                    variant="secondary"
                    onClick={() => handleApprovalAction('reject')}
                    className="flex items-center space-x-2"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    <span>Reject</span>
                  </Button>
                  
                  <Button
                    variant="primary"
                    onClick={() => handleApprovalAction('approve')}
                    className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7"/>
                    </svg>
                    <span>Approve</span>
                  </Button>
                </div>
                
                <div className="text-sm text-gray-500">
                  To approve, complete the form in Security, Legal
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Sidebar - Comments */}
          <div className="w-80 bg-white border-l flex-shrink-0 overflow-hidden min-w-[320px]">
            <CommentsSection
              comments={request.comments || []}
              mentionableUsers={mentionableUsers}
              onAddComment={handleAddComment}
              width="md"
            />
          </div>
        </div>
      </div>
      
      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <Typography variant="h3" className="capitalize">{approvalAction}</Typography>
              <button
                onClick={() => setShowApprovalModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              {approvalAction === 'approve' ? (
                <p>Please complete mandatory fields before approving.</p>
              ) : (
                <p>Are you sure you want to reject this request?</p>
              )}
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="primary"
                onClick={confirmApprovalAction}
                className="bg-yellow-500 hover:bg-yellow-600"
              >
                Ok
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 