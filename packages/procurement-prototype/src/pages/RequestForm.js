import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Button from '../components/Button';
import BackLink from '../components/BackLink';
import Stepper from '../components/Stepper';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import FormTextarea from '../components/FormTextarea';
import LineItemsTable from '../components/LineItemsTable';
import Badge from '../components/Badge';
import SystemMessage from '../components/SystemMessage';
import { 
  SUPPLIERS, 
  PURCHASE_TYPES, 
  SUBSIDIARIES, 
  saveDraft, 
  getDraft, 
  generateDraftId,
  saveCurrentDraft,
  clearCurrentDraft,
  SAMPLE_HOME_REQUESTS
} from '../utils/mockData';
import { localDB } from '../utils/localDB';

export default function RequestForm({ onNavigate, draftId, aiData }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    id: draftId || generateDraftId(),
    title: '',
    supplier: '',
    purchaseType: '',
    subsidiary: '',
    description: '',
    lineItems: [{ currency: 'USD', amount: '', quantity: '1', desc: '' }],
    supplierInfo: {
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      address: '',
      taxId: ''
    },
    security: {
      riskLevel: '',
      complianceRequired: false,
      securityNotes: ''
    }
  });
  const [errors, setErrors] = useState({});
  const [isNewVendor, setIsNewVendor] = useState(false);
  const [newVendorName, setNewVendorName] = useState('');
  const [showAIFilling, setShowAIFilling] = useState(!!aiData);
  const [showAISuccess, setShowAISuccess] = useState(false);

  useEffect(() => {
    // Load existing draft if draftId provided
    if (draftId) {
      const existingDraft = localDB.getById(draftId);
      if (existingDraft) {
        // Synthesize lineItems if missing
        let lineItems = existingDraft.lineItems;
        if (!lineItems) {
          let amt = 0;
          if (existingDraft.amount) {
            const match = String(existingDraft.amount).match(/([\d,.]+)/);
            amt = match ? parseFloat(match[1].replace(/,/g, '')) : 0;
          }
          lineItems = [{ currency: 'USD', amount: amt, quantity: '1', desc: 'demo' }];
        }
        setFormData({ ...existingDraft, lineItems });
        setIsNewVendor(existingDraft.supplier === 'new_vendor');
        if (existingDraft.supplier === 'new_vendor') {
          // Set newVendorName from vendor field if present
          setNewVendorName(existingDraft.vendor || existingDraft.supplierInfo?.companyName || '');
          // Ensure supplierInfo.companyName is set
          if (!existingDraft.supplierInfo?.companyName && existingDraft.vendor) {
            setFormData(prev => ({
              ...prev,
              supplierInfo: { ...prev.supplierInfo, companyName: existingDraft.vendor }
            }));
          }
        }
      }
    }
    
    // Load AI data if provided
    if (aiData) {
      setFormData(prev => ({
        ...prev,
        title: aiData.title || '',
        supplier: aiData.supplier || '',
        purchaseType: aiData.purchaseType || '',
        subsidiary: aiData.subsidiary || '',
        description: aiData.description || '',
        lineItems: aiData.lineItems || [{ currency: 'USD', amount: '', quantity: '1', desc: '' }]
      }));
      setIsNewVendor(aiData.supplier === 'new_vendor');
    }
  }, [draftId, aiData]);

  useEffect(() => {
    // Save current draft to session storage
    saveCurrentDraft(formData);
  }, [formData]);

  useEffect(() => {
    if (aiData) {
      setShowAIFilling(true);
      setShowAISuccess(false);
      const timer = setTimeout(() => {
        setShowAIFilling(false);
        setShowAISuccess(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowAIFilling(false);
      setShowAISuccess(false);
    }
  }, [aiData]);

  const steps = [
    { label: 'Purchase details', active: currentStep === 0, completed: currentStep > 0 },
    { label: 'Supplier info', active: currentStep === 1, completed: currentStep > 1, required: isNewVendor },
    { label: 'Security', active: currentStep === 2, completed: currentStep > 2, required: isNewVendor },
    { label: 'Review & Submit', active: currentStep === 3, completed: false }
  ].filter(step => !step.required || step.required === isNewVendor);

  const validateCurrentStep = () => {
    const newErrors = {};
    
    if (currentStep === 0) {
      if (!formData.title.trim()) newErrors.title = 'Title is required';
      if (!formData.supplier) newErrors.supplier = 'Supplier is required';
      if (!formData.purchaseType) newErrors.purchaseType = 'Purchase type is required';
      if (!formData.subsidiary) newErrors.subsidiary = 'Subsidiary is required';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
      
      // Validate line items
      const lineItemErrors = formData.lineItems.map(item => {
        const itemErrors = {};
        if (!item.amount || parseFloat(item.amount) <= 0) itemErrors.amount = 'Valid amount is required';
        if (!item.desc.trim()) itemErrors.desc = 'Description is required';
        return itemErrors;
      });
      if (lineItemErrors.some(errors => Object.keys(errors).length > 0)) {
        newErrors.lineItems = lineItemErrors;
      }
    }
    
    if (currentStep === 1 && isNewVendor) {
      if (!formData.supplierInfo.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!formData.supplierInfo.contactName.trim()) newErrors.contactName = 'Contact name is required';
      if (!formData.supplierInfo.email.trim()) newErrors.email = 'Email is required';
    }
    
    if (currentStep === 2 && isNewVendor) {
      if (!formData.security.riskLevel) newErrors.riskLevel = 'Risk level is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    // Sync newVendorName to formData.supplierInfo.companyName if needed
    if (formData.supplier === 'new_vendor' && newVendorName && !formData.supplierInfo.companyName) {
      setFormData(prev => ({
        ...prev,
        supplierInfo: { ...prev.supplierInfo, companyName: newVendorName }
      }));
    }
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onNavigate('home');
    }
  };

  const handleSaveDraft = () => {
    // Determine vendor name
    let vendor = '';
    if (formData.supplier === 'new_vendor') {
      vendor = formData.supplierInfo.companyName || 'New Vendor';
    } else {
      const supplierObj = SUPPLIERS.find(s => s.value === formData.supplier);
      vendor = supplierObj ? supplierObj.label : formData.supplier;
    }
    const isNewVendorFlag = formData.supplier === 'new_vendor';
    // Save draft with vendor and isNewVendor fields
    const updatedDraft = {
      ...formData,
      vendor,
      isNewVendor: isNewVendorFlag,
    };
    // Update in localDB
    localDB.update(formData.id, updatedDraft);
    onNavigate('home');
  };

  const handleSubmit = () => {
    if (validateCurrentStep()) {
      // Save as submitted request (in real app, this would go to backend)
      const updatedDraft = {
        ...formData,
        status: 'Pending approval',
        updatedAt: new Date().toISOString(),
      };
      localDB.update(formData.id, updatedDraft);
      onNavigate('home');
    }
  };

  const handleSupplierChange = (value) => {
    setFormData(prev => ({ ...prev, supplier: value }));
    setIsNewVendor(value === 'new_vendor');
    if (value !== 'new_vendor') setNewVendorName('');
  };

  const handleLineItemsChange = (items) => {
    setFormData(prev => ({ ...prev, lineItems: items }));
  };

  // Merge all vendors from SUPPLIERS, SAMPLE_HOME_REQUESTS, and all requests in localDB
  const allVendorsSet = new Set([
    ...SUPPLIERS.map(s => s.label),
    ...SAMPLE_HOME_REQUESTS.map(r => r.vendor),
    ...localDB.getAll().map(r => r.vendor)
  ]);
  const allVendors = Array.from(allVendorsSet).filter(Boolean);
  const vendorOptions = allVendors.map(vendor => {
    const supplier = SUPPLIERS.find(s => s.label === vendor);
    return supplier
      ? { value: supplier.value, label: supplier.label }
      : { value: vendor, label: vendor };
  });
  vendorOptions.push({ value: 'new_vendor', label: 'Add new vendor...' });
  // Sort vendor options alphabetically (except 'Add new vendor...' stays last)
  const sortedVendorOptions = vendorOptions.slice(0, -1).sort((a, b) => a.label.localeCompare(b.label));
  sortedVendorOptions.push(vendorOptions[vendorOptions.length - 1]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <FormInput
              label="Request Title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Zoom Premium Licenses for Sales Team"
              required
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            
            <FormSelect
              label="Supplier"
              value={(() => {
                // Try to match supplier value, otherwise match by vendor label
                if (formData.supplier) return formData.supplier;
                const found = sortedVendorOptions.find(opt => opt.label === formData.vendor);
                return found ? found.value : '';
              })()}
              onChange={handleSupplierChange}
              options={sortedVendorOptions}
              placeholder="Select supplier"
              required
              searchPlaceholder="Search suppliers..."
              action={{ label: 'Add new vendor', onClick: () => handleSupplierChange('new_vendor') }}
              onActionWithSearch={
                (search) => {
                  setNewVendorName(search);
                  setFormData(prev => ({ ...prev, supplier: 'new_vendor' }));
                  setIsNewVendor(true);
                }
              }
              selectedDisplay={
                formData.supplier === 'new_vendor' && newVendorName
                  ? <span className="flex items-center gap-2">
                      {newVendorName}
                      <Badge text="New vendor" color="bg-green-100 text-green-800" />
                    </span>
                  : undefined
              }
            />
            {errors.supplier && <p className="text-red-500 text-sm">{errors.supplier}</p>}
            
            <FormSelect
              label="Purchase Type"
              value={formData.purchaseType}
              onChange={(value) => setFormData(prev => ({ ...prev, purchaseType: value }))}
              options={[...PURCHASE_TYPES].sort((a, b) => a.label.localeCompare(b.label))}
              placeholder="Select purchase type"
              required
            />
            {errors.purchaseType && <p className="text-red-500 text-sm">{errors.purchaseType}</p>}
            
            <FormSelect
              label="Subsidiary"
              value={formData.subsidiary}
              onChange={(value) => setFormData(prev => ({ ...prev, subsidiary: value }))}
              options={[...SUBSIDIARIES].sort((a, b) => a.label.localeCompare(b.label))}
              placeholder="Select subsidiary"
              required
            />
            {errors.subsidiary && <p className="text-red-500 text-sm">{errors.subsidiary}</p>}
            
            <FormTextarea
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the purpose and details of this purchase request"
              required
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            
            <div>
              <label className="block mb-2 font-medium text-gray-600">Line Items</label>
              <LineItemsTable
                items={formData.lineItems}
                onItemChange={handleLineItemsChange}
                maxItems={20}
              />
            </div>
          </div>
        );
        
      case 1:
        if (!isNewVendor) return null;
        return (
          <div className="space-y-6">
            <FormInput
              label="Company Name"
              value={formData.supplierInfo.companyName}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                supplierInfo: { ...prev.supplierInfo, companyName: e.target.value }
              }))}
              placeholder="Enter company name"
              required
            />
            {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
            
            <FormInput
              label="Contact Name"
              value={formData.supplierInfo.contactName}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                supplierInfo: { ...prev.supplierInfo, contactName: e.target.value }
              }))}
              placeholder="Enter contact person name"
              required
            />
            {errors.contactName && <p className="text-red-500 text-sm">{errors.contactName}</p>}
            
            <FormInput
              label="Email"
              type="email"
              value={formData.supplierInfo.email}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                supplierInfo: { ...prev.supplierInfo, email: e.target.value }
              }))}
              placeholder="Enter contact email"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            
            <FormInput
              label="Phone"
              value={formData.supplierInfo.phone}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                supplierInfo: { ...prev.supplierInfo, phone: e.target.value }
              }))}
              placeholder="Enter contact phone"
            />
            
            <FormTextarea
              label="Address"
              value={formData.supplierInfo.address}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                supplierInfo: { ...prev.supplierInfo, address: e.target.value }
              }))}
              placeholder="Enter company address"
            />
            
            <FormInput
              label="Tax ID"
              value={formData.supplierInfo.taxId}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                supplierInfo: { ...prev.supplierInfo, taxId: e.target.value }
              }))}
              placeholder="Enter tax identification number"
            />
          </div>
        );
        
      case 2:
        if (!isNewVendor) return null;
        return (
          <div className="space-y-6">
            <FormSelect
              label="Risk Level"
              value={formData.security.riskLevel}
              onChange={(value) => setFormData(prev => ({ 
                ...prev, 
                security: { ...prev.security, riskLevel: value }
              }))}
              options={[
                { value: 'low', label: 'Low Risk' },
                { value: 'medium', label: 'Medium Risk' },
                { value: 'high', label: 'High Risk' }
              ]}
              placeholder="Select risk level"
              required
            />
            {errors.riskLevel && <p className="text-red-500 text-sm">{errors.riskLevel}</p>}
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.security.complianceRequired}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    security: { ...prev.security, complianceRequired: e.target.checked }
                  }))}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Compliance review required</span>
              </label>
            </div>
            
            <FormTextarea
              label="Security Notes"
              value={formData.security.securityNotes}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                security: { ...prev.security, securityNotes: e.target.value }
              }))}
              placeholder="Any additional security considerations or notes"
            />
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-medium text-gray-800 mb-4">Request Summary</h3>
              <div className="space-y-3 text-sm">
                <div><span className="font-medium">Title:</span> {formData.title}</div>
                <div><span className="font-medium">Supplier:</span> {formData.supplier}</div>
                <div><span className="font-medium">Type:</span> {formData.purchaseType}</div>
                <div><span className="font-medium">Subsidiary:</span> {formData.subsidiary}</div>
                <div><span className="font-medium">Description:</span> {formData.description}</div>
                <div><span className="font-medium">Total Items:</span> {formData.lineItems.length}</div>
                <div><span className="font-medium">Total Amount:</span> USD {formData.lineItems.reduce((sum, item) => 
                  sum + (parseFloat(item.amount) || 0) * (parseInt(item.quantity) || 1), 0
                ).toFixed(2)}</div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-row min-h-screen">
      <Sidebar active="home" onNavClick={key => console.log('Nav:', key)} logo={process.env.PUBLIC_URL + '/logo192.png'} expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      <div className={`flex-1 flex flex-col min-h-screen ${sidebarExpanded ? 'ml-48' : 'ml-16'}`}> {/* dynamic margin */}
        {/* Header bar spanning full width */}
        <Header sectionTitle="Create purchase request" />
        {/* Main content: Stepper left, form right */}
        <div className="flex flex-1 w-full pl-8 pr-8 py-10">
          {/* Stepper on the left */}
          <div className="w-64 pr-8">
            <BackLink onClick={handleBack}>Back</BackLink>
            <Stepper steps={steps} onStepClick={setCurrentStep} />
          </div>
          {/* Form content on the right */}
          <div className="flex-1 flex flex-col">
            {/* AI System Messages */}
            {showAIFilling && (
              <div className="mb-4">
                <SystemMessage type="informative">
                  Tipalti AI is filling in your request
                </SystemMessage>
              </div>
            )}
            {showAISuccess && (
              <div className="mb-4">
                <SystemMessage type="positive">
                  Purchase request was generated with AI, please review before submitting.
                </SystemMessage>
              </div>
            )}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {steps[currentStep]?.label}
              </h1>
              <p className="text-gray-600">
                {currentStep === 0 && 'Enter the basic details of your purchase request'}
                {currentStep === 1 && 'Provide information about the new supplier'}
                {currentStep === 2 && 'Complete security assessment for the new vendor'}
                {currentStep === 3 && 'Review your request before submission'}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              {renderStepContent()}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <Button variant="secondary" onClick={handleSaveDraft}>
                  Save Draft
                </Button>
                <div className="flex space-x-4">
                  {currentStep > 0 && (
                    <Button variant="secondary" onClick={handleBack}>
                      Back
                    </Button>
                  )}
                  <Button 
                    variant="primary" 
                    onClick={handleNext}
                  >
                    {currentStep === steps.length - 1 ? 'Submit Request' : 'Next'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 