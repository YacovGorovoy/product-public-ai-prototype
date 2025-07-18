// ComponentIndex.js: Showcase of all custom components
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Tabs from '../components/Tabs';
import Button from '../components/Button';
import DropdownMenu from '../components/DropdownMenu';
import SearchInput from '../components/SearchInput';
import RequestCard from '../components/RequestCard';
import Checkbox from '../components/Checkbox';
import Typography from '../components/Typography';
import BackLink from '../components/BackLink';
import Stepper from '../components/Stepper';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import FormTextarea from '../components/FormTextarea';
import LineItemsTable from '../components/LineItemsTable';
import AddIcon from '../components/AddIcon';
import DeleteIcon from '../components/DeleteIcon';
import ButtonLink from '../components/ButtonLink';
import Badge from '../components/Badge';
import BulkActionsBar from '../components/BulkActionsBar';
import CustomCheckbox from '../components/CustomCheckbox';
import Search from '../components/Search';
import Filter from '../components/Filter';
import SkeletonLoader, { SkeletonCard, SkeletonList, SkeletonText, SkeletonAvatar, SkeletonButton } from '../components/SkeletonLoader';
import LinkButton from '../components/LinkButton';
import InfoIcon from '../components/InfoIcon';
import AISpinner from '../components/AISpinner';
import SystemMessage from '../components/SystemMessage';
import AIIcon from '../components/AIIcon';
import AIStarsAnimation from '../components/AIStarsAnimation';
import RequestSummaryHeader from '../components/RequestSummaryHeader';
import ProcessFlow from '../components/ProcessFlow';
import { FaCheck } from 'react-icons/fa';
import Tooltip from '../components/Tooltip';
// New components
import CommentsSection from '../components/CommentsSection';
import Comment from '../components/Comment';
import Tag from '../components/Tag';

import FileUploadInput from '../components/FileUploadInput';
import DatePicker from '../components/DatePicker';

export default function ComponentIndex() {
  const [activeNav, setActiveNav] = useState('home');
  const [activeTab, setActiveTab] = useState('toSubmit');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filterActive, setFilterActive] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [filterStatuses, setFilterStatuses] = useState(['pending', 'approved']);
  const [purchaseType, setPurchaseType] = useState('');
  
  // State for interactive RequestCard selection
  const [selectedCards, setSelectedCards] = useState(new Set());
  
  const handleCardSelect = (cardId) => {
    const newSelected = new Set(selectedCards);
    if (newSelected.has(cardId)) {
      newSelected.delete(cardId);
    } else {
      newSelected.add(cardId);
    }
    setSelectedCards(newSelected);
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar active={activeNav} onNavClick={setActiveNav} />
      <div className="flex-1 flex flex-col ml-48">
        {/* Show which nav is active for demo purposes */}
        <div className="p-4 bg-gray-100 border-b text-sm text-gray-700">Active nav: <span className="font-bold">{activeNav}</span></div>
        {/* Header */}
        <Header userName="YacovProcPayer" />
        <div className="p-8 space-y-8">
          {/* Typography */}
          <section>
            <Typography variant="h2" className="mb-2">Typography</Typography>
            <Typography variant="h3" className="mb-1">Variants:</Typography>
            <div className="space-y-1">
              <Typography variant="h1">h1 - Large Title</Typography>
              <Typography variant="h2">h2 - Section Title</Typography>
              <Typography variant="h3">h3 - Subsection</Typography>
              <Typography variant="label">label - Label Example</Typography>
              <Typography>p - Paragraph example</Typography>
            </div>
            <div className="mt-2 text-sm text-gray-500">Props: <code>variant</code>, <code>className</code>, <code>children</code></div>
          </section>

          {/* Basic Interactive Elements */}
          <section>
            <Typography variant="h2" className="mb-2">Basic Interactive Elements</Typography>
            
            <Typography variant="h3" className="mb-1">Button</Typography>
            <div className="space-x-4 mb-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="icon" aria-label="Add">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
              </Button>
            </div>
            <div className="mt-2 text-sm text-gray-500 mb-6">Props: <code>variant</code> (primary, secondary), <code>onClick</code>, <code>className</code>, <code>children</code></div>

            <Typography variant="h3" className="mb-1">LinkButton</Typography>
            <div className="space-x-4 mb-4">
              <LinkButton onClick={() => alert('Link clicked')}>Manually add request</LinkButton>
              <LinkButton onClick={() => alert('Disabled link')} disabled>Disabled link</LinkButton>
            </div>
            <div className="mt-2 text-sm text-gray-500 mb-6">Props: <code>onClick</code>, <code>disabled</code>, <code>className</code>, <code>children</code></div>

            <Typography variant="h3" className="mb-1">Checkbox</Typography>
            <div className="space-x-4 mb-4">
              <Checkbox checked={true} onChange={() => {}} />
              <Checkbox checked={false} onChange={() => {}} />
            </div>
            <div className="mt-2 text-sm text-gray-500 mb-6">Props: <code>checked</code>, <code>onChange</code>, <code>className</code></div>

            <Typography variant="h3" className="mb-1">CustomCheckbox</Typography>
            <div className="space-x-4 mb-4">
              <CustomCheckbox checked={true} onChange={() => {}} />
              <CustomCheckbox checked={false} onChange={() => {}} className="ml-4" />
            </div>
            <div className="mt-2 text-sm text-gray-500">Props: <code>checked</code>, <code>onChange</code>, <code>className</code></div>
          </section>

          {/* Navigation & Layout */}
          <section>
            <Typography variant="h2" className="mb-2">Navigation & Layout</Typography>
            
            <Typography variant="h3" className="mb-1">Tabs</Typography>
            <div className="space-y-4">
              <div>
                <Typography variant="h4" className="mb-1">With Counts</Typography>
                <Tabs
                  tabs={[
                    { label: 'To do', key: 'toDo', count: 47 },
                    { label: 'All my items', key: 'allMyItems', count: 0 },
                  ]}
                  activeTab={activeTab}
                  onTabClick={setActiveTab}
                  showCounts={true}
                />
              </div>
              <div>
                <Typography variant="h4" className="mb-1">Without Counts</Typography>
                <Tabs
                  tabs={[
                    { label: 'Purchase details', key: 'purchase' },
                    { label: 'Vendor info', key: 'vendor' },
                    { label: 'Security', key: 'security' },
                    { label: 'Legal', key: 'legal' },
                    { label: 'Finance', key: 'finance' },
                  ]}
                  activeTab="purchase"
                  onTabClick={(key) => alert(`Switched to ${key}`)}
                  showCounts={false}
                />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500 mb-6">Props: <code>tabs</code> (array of {'{ label, key, count? }'}), <code>activeTab</code>, <code>onTabClick</code>, <code>showCounts</code></div>

            <Typography variant="h3" className="mb-1">Stepper</Typography>
            <Stepper steps={['Step 1', 'Step 2', 'Step 3']} currentStep={1} />
            <div className="mt-2 text-sm text-gray-500 mb-6">Props: <code>steps</code>, <code>currentStep</code></div>

            <Typography variant="h3" className="mb-1">BackLink</Typography>
            <BackLink onClick={() => alert('Back clicked')}>Back to requests</BackLink>
            <div className="mt-2 text-sm text-gray-500">Props: <code>onClick</code>, <code>children</code></div>
          </section>

          {/* Dropdowns & Menus */}
          <section>
            <Typography variant="h2" className="mb-2">Dropdowns & Menus</Typography>
            
            <Typography variant="h3" className="mb-1">DropdownMenu</Typography>
            <div className="flex justify-center py-8">
              <DropdownMenu
                buttonContent={<span>+ New</span>}
                open={dropdownOpen}
                setOpen={setDropdownOpen}
                maxWidth="max-w-xs"
                options={[
                  {
                    label: 'Submit an expense',
                    icon: (
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <rect x="3" y="5" width="18" height="14" rx="3" fill="#E6F0F8" />
                        <rect x="7" y="9" width="10" height="2" rx="1" fill="#2D6B9F" />
                        <rect x="7" y="13" width="6" height="2" rx="1" fill="#2D6B9F" />
                      </svg>
                    ),
                    onClick: () => alert('Expense!'),
                  },
                  {
                    label: 'Create a purchase request',
                    icon: (
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <rect x="5" y="3" width="14" height="18" rx="2" fill="#F7E6D7" />
                        <rect x="8" y="7" width="8" height="2" rx="1" fill="#B97A56" />
                        <rect x="8" y="11" width="5" height="2" rx="1" fill="#B97A56" />
                      </svg>
                    ),
                    onClick: () => alert('Purchase!'),
                  },
                ]}
              />
            </div>
            <div className="mt-2 text-sm text-gray-500">Props: <code>buttonContent</code>, <code>options</code> (with <code>icon</code> as SVG), <code>open</code>, <code>setOpen</code>, <code>maxWidth</code></div>
          </section>

          {/* Search & Filter */}
          <section>
            <Typography variant="h2" className="mb-2">Search & Filter</Typography>
            
            <Typography variant="h3" className="mb-1">SearchInput</Typography>
            <SearchInput value={search} onChange={e => setSearch(e.target.value)} />
            <div className="mt-2 text-sm text-gray-500 mb-6">Props: <code>value</code>, <code>onChange</code>, <code>placeholder</code></div>

            <Typography variant="h3" className="mb-1">Search</Typography>
            <Search
              value={search}
              onChange={e => setSearch(e.target.value)}
              results={{
                requests: search ? [
                  {
                    id: 1,
                    vendor: 'ACME corp',
                    status: 'Pending approval',
                    amount: 'USD 2,000.00',
                    date: 'Jul 07, 2025',
                  },
                  {
                    id: 2,
                    vendor: 'ACME corp',
                    status: 'Pending approval',
                    amount: 'USD 1,000.00',
                    date: 'Jul 07, 2025',
                  },
                ] : [],
                vendors: search ? [
                  { id: 1, name: 'ACME corp' },
                  { id: 2, name: 'ACME Consulting' },
                ] : [],
              }}
              onResultClick={(item, type) => alert(`Clicked ${type}: ${item.vendor || item.name}`)}
              onSeeAllClick={val => alert(`See all results for '${val}'`)}
              placeholder="Search items by name"
            />
            <div className="mt-2 text-sm text-gray-500 mb-6">Props: <code>value</code>, <code>onChange</code>, <code>results</code>, <code>onResultClick</code>, <code>onSeeAllClick</code>, <code>placeholder</code></div>

            <Typography variant="h3" className="mb-1">Filter</Typography>
            <Typography variant="h4" className="mb-1">Button Filter</Typography>
            <Filter
              label="Active Only"
              active={filterActive}
              onChange={val => setFilterActive(val)}
            />
            <Typography variant="h4" className="mb-1 mt-6">Single-select Dropdown</Typography>
            <Filter
              label="Type"
              dropdown
              options={[
                { label: 'All', value: 'all' },
                { label: 'Requests', value: 'requests' },
                { label: 'Bills', value: 'bills' },
              ]}
              value={filterType}
              onChange={val => setFilterType(val)}
            />
            <Typography variant="h4" className="mb-1 mt-6">Multi-select Dropdown</Typography>
            <Filter
              label="Status"
              dropdown
              multiple
              options={[
                { label: 'Pending', value: 'pending' },
                { label: 'Approved', value: 'approved' },
                { label: 'Rejected', value: 'rejected' },
                { label: 'Draft', value: 'draft' },
              ]}
              value={filterStatuses}
              onChange={vals => setFilterStatuses(vals)}
            />
            <div className="mt-2 text-sm text-gray-500">Props: <code>label</code>, <code>options</code>, <code>multiple</code>, <code>dropdown</code>, <code>active</code>, <code>value</code>, <code>onChange</code></div>
          </section>

          {/* Form Components */}
          <section>
            <Typography variant="h2" className="mb-2">Form Components</Typography>
            
            <Typography variant="h3" className="mb-1">FormInput</Typography>
            <div className="space-y-6">
              <div>
                <Typography variant="h4" className="mb-2">Editable Mode</Typography>
                <FormInput 
                  label="Title *" 
                  value="Video licenses"
                  placeholder="E.g., Premium Zoom seats" 
                  required 
                />
              </div>
              <div>
                <Typography variant="h4" className="mb-2">Inline Editing - Hover to see pencil icon, click to edit</Typography>
                <FormInput
                  label="Title *"
                  value="Video licenses"
                  variant="inline"
                  readOnly={true}
                  onChange={(newValue) => alert(`Saved: ${newValue}`)}
                  onSave={(newValue) => alert(`Changes saved: ${newValue}`)}
                  onCancel={() => alert('Changes cancelled')}
                />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500 mb-6">Props: <code>label</code>, <code>value</code>, <code>onChange</code>, <code>placeholder</code>, <code>required</code>, <code>variant</code> ('editable'/'inline'), <code>readOnly</code>, <code>onSave</code>, <code>onCancel</code></div>

            <Typography variant="h3" className="mb-1">FormSelect</Typography>
            <div className="space-y-6">
              <div>
                <Typography variant="h4" className="mb-2">Editable Mode</Typography>
                <div className="max-w-md">
                  <FormSelect
                    label="Purchase type *"
                    value={purchaseType}
                    onChange={setPurchaseType}
                    options={[
                      { label: 'Software', value: 'software' },
                      { label: 'Services', value: 'services' },
                      { label: 'Office Supplies', value: 'office' },
                      { label: 'Hardware', value: 'hardware' },
                      { label: 'Other', value: 'other' },
                    ]}
                    placeholder="Select purchase type"
                    required
                  />
                </div>
              </div>
              <div>
                <Typography variant="h4" className="mb-2">Inline Editing - Hover to see pencil icon, click to edit</Typography>
                <div className="max-w-md">
                  <FormSelect
                    label="Purchase type *"
                    value="services"
                    options={[
                      { label: 'Software', value: 'software' },
                      { label: 'Services', value: 'services' },
                      { label: 'Office Supplies', value: 'office' },
                      { label: 'Hardware', value: 'hardware' },
                      { label: 'Other', value: 'other' },
                    ]}
                    variant="inline"
                    readOnly={true}
                    onChange={(newValue) => alert(`Saved: ${newValue}`)}
                    onSave={(newValue) => alert(`Changes saved: ${newValue}`)}
                    onCancel={() => alert('Changes cancelled')}
                  />
                </div>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500 mb-6">Props: <code>label</code>, <code>value</code>, <code>onChange</code>, <code>options</code>, <code>placeholder</code>, <code>required</code>, <code>variant</code> ('editable'/'inline'), <code>readOnly</code>, <code>onSave</code>, <code>onCancel</code></div>

            <Typography variant="h3" className="mb-1">FormTextarea</Typography>
            <div className="space-y-6">
              <div>
                <Typography variant="h4" className="mb-2">Editable Mode</Typography>
                <FormTextarea 
                  label="Description *" 
                  value="Video licenses for the product team"
                  placeholder="E.g., New hires need premium zoom seats for customer meetings." 
                  required 
                />
              </div>
              <div>
                <Typography variant="h4" className="mb-2">Inline Editing - Hover to see pencil icon, click to edit</Typography>
                <FormTextarea
                  label="Description *"
                  value="Video licenses for the product team"
                  variant="inline"
                  readOnly={true}
                  onChange={(newValue) => alert(`Saved: ${newValue}`)}
                  onSave={(newValue) => alert(`Changes saved: ${newValue}`)}
                  onCancel={() => alert('Changes cancelled')}
                />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500 mb-6">Props: <code>label</code>, <code>value</code>, <code>onChange</code>, <code>placeholder</code>, <code>required</code>, <code>variant</code> ('editable'/'inline'), <code>readOnly</code>, <code>onSave</code>, <code>onCancel</code></div>

            <Typography variant="h3" className="mb-1">FileUploadInput</Typography>
            <div className="space-y-6">
              <div>
                <Typography variant="h4" className="mb-2">Default Size</Typography>
                <FileUploadInput
                  label="Contract *"
                  onFileSelect={(file) => alert(`Selected: ${file.name}`)}
                  acceptedTypes={['.pdf', '.doc', '.docx']}
                  maxSize={5 * 1024 * 1024}
                  placeholder="Upload file..."
                  required
                />
              </div>
              <div>
                <Typography variant="h4" className="mb-2">Small Size</Typography>
                <FileUploadInput
                  label="Contract *"
                  onFileSelect={(file) => alert(`Selected: ${file.name}`)}
                  acceptedTypes={['.pdf', '.doc', '.docx']}
                  maxSize={5 * 1024 * 1024}
                  placeholder="Upload file..."
                  size="sm"
                  required
                />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500 mb-6">Props: <code>label</code>, <code>onFileSelect</code>, <code>acceptedTypes</code>, <code>maxSize</code>, <code>placeholder</code>, <code>size</code> ('sm', 'md', 'lg'), <code>required</code></div>

            <Typography variant="h3" className="mb-1">DatePicker</Typography>
            <div className="space-y-6">
              <div>
                <Typography variant="h4" className="mb-2">Single Date - Click to open pop-over</Typography>
                <DatePicker
                  variant="single"
                  value={new Date('2025-07-17')}
                  onChange={(date) => alert(`Selected date: ${date?.toDateString()}`)}
                  label="Service start date *"
                  placeholder="Select date"
                  required
                />
              </div>
              <div>
                <Typography variant="h4" className="mb-2">Date Range - Click to open pop-over with tabs</Typography>
                <DatePicker
                  variant="range"
                  startDate={new Date('2025-05-30')}
                  endDate={new Date('2025-05-31')}
                  onChange={(start, end) => alert(`Date range: ${start?.toDateString()} to ${end?.toDateString()}`)}
                  label="Contract period *"
                  placeholder="Select date range"
                  required
                />
              </div>
              <div>
                <Typography variant="h4" className="mb-2">Inline Editing - Hover to see pencil icon, click to edit</Typography>
                <DatePicker
                  variant="single"
                  value={new Date('2025-05-31')}
                  label="Service start date *"
                  inputVariant="inline"
                  readOnly={true}
                  onChange={(date) => alert(`Saved: ${date?.toDateString()}`)}
                />
              </div>
              <div>
                <Typography variant="h4" className="mb-2">Date Range - Inline Editing</Typography>
                <DatePicker
                  variant="range"
                  startDate={new Date('2025-05-30')}
                  endDate={new Date('2025-05-31')}
                  label="Contract period *"
                  inputVariant="inline"
                  readOnly={true}
                  onChange={(start, end) => alert(`Saved: ${start?.toDateString()} to ${end?.toDateString()}`)}
                />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500 mb-6">Props: <code>variant</code> ('single'/'range'), <code>value</code>/<code>startDate</code>/<code>endDate</code>, <code>onChange</code>, <code>label</code>, <code>placeholder</code>, <code>inputVariant</code> ('editable'/'inline'), <code>readOnly</code></div>



            <Typography variant="h3" className="mb-1">LineItemsTable</Typography>
            <div className="space-y-8">
              <div>
                <Typography variant="h4" className="mb-2">Editable Variant</Typography>
                <LineItemsTable
                  items={[
                    { currency: 'USD', amount: '14.00', quantity: '1', desc: 'Video licenses' },
                    { currency: 'USD', amount: '45.00', quantity: '1', desc: 'Support and warranty' },
                  ]}
                  onItemChange={(items) => alert(`Items updated: ${items.length} items`)}
                  maxItems={4}
                  variant="editable"
                />
              </div>

              <div>
                <Typography variant="h4" className="mb-2">Inline Editing Variant</Typography>
                <LineItemsTable
                  items={[
                    { currency: 'USD', amount: '100.00', quantity: '1', desc: 'Audio licenses' },
                    { currency: 'USD', amount: '45.00', quantity: '1', desc: 'Support and warranty' },
                  ]}
                  onItemChange={(items) => alert(`Items updated: ${items.length} items`)}
                  maxItems={4}
                  variant="inline"
                  onEdit={() => alert('Edit mode activated')}
                  onSave={(items) => alert(`Changes saved: ${items.length} items`)}
                  onCancel={() => alert('Changes cancelled')}
                />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500 mb-6">Props: <code>items</code>, <code>onItemChange</code>, <code>maxItems</code>, <code>variant</code> ('editable'/'inline'), <code>onEdit</code>, <code>onSave</code>, <code>onCancel</code></div>

            <Typography variant="h3" className="mb-1">Action Icons</Typography>
            <div className="space-y-6">
              <div>
                <Typography variant="h4" className="mb-2">Add and Delete Icons</Typography>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Add:</span>
                    <AddIcon onClick={() => alert('Add clicked')} size="md" />
                    <AddIcon onClick={() => alert('Add clicked')} size="sm" />
                    <AddIcon onClick={() => alert('Add clicked')} size="lg" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Delete:</span>
                    <DeleteIcon onClick={() => alert('Delete clicked')} size="md" />
                    <DeleteIcon onClick={() => alert('Delete clicked')} size="sm" />
                    <DeleteIcon onClick={() => alert('Delete clicked')} size="lg" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500 mb-6">Props: <code>onClick</code>, <code>size</code> ('sm'/'md'/'lg'), <code>color</code>, <code>className</code></div>

            <Typography variant="h3" className="mb-1">ButtonLink</Typography>
            <div className="space-y-6">
              <div>
                <Typography variant="h4" className="mb-2">ButtonLink Variants</Typography>
                <div className="flex space-x-4">
                  <ButtonLink onClick={() => alert('Primary clicked')} variant="primary">
                    Primary Link
                  </ButtonLink>
                  <ButtonLink onClick={() => alert('Secondary clicked')} variant="secondary">
                    Secondary Link
                  </ButtonLink>
                  <ButtonLink onClick={() => alert('Danger clicked')} variant="danger">
                    Danger Link
                  </ButtonLink>
                  <ButtonLink onClick={() => alert('Disabled clicked')} disabled>
                    Disabled Link
                  </ButtonLink>
                </div>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500 mb-6">Props: <code>onClick</code>, <code>variant</code> ('primary'/'secondary'/'danger'), <code>disabled</code>, <code>className</code></div>
          </section>

          {/* Data Display */}
          <section>
            <Typography variant="h2" className="mb-2">Data Display</Typography>
            
            <Typography variant="h3" className="mb-1">Badge</Typography>
            <Badge text="New vendor" />
            <Badge text="Draft" color="bg-gray-200 text-gray-700 ml-2" />
            <div className="mt-2 text-sm text-gray-500 mb-6">Props: <code>text</code>, <code>color</code>, <code>className</code></div>

            <Typography variant="h3" className="mb-1">RequestCard</Typography>
            <div className="space-y-4 mb-4">
              <Typography variant="h4" className="mb-2">Default State</Typography>
              <RequestCard
                vendor="ACME corp"
                title="AI Licences for the Product team"
                date="Jun 24, 2025"
                requester="Luca.M"
                amount="USD 150.00"
                status="OPEN"
                onStatusClick={() => alert('Open clicked')}
                onSelect={() => handleCardSelect('card1')}
                selected={selectedCards.has('card1')}
              />
              
              <Typography variant="h4" className="mb-2">New Vendor Badge</Typography>
              <RequestCard
                vendor="Innovation Labs"
                title="Design Software Licenses"
                date="Jun 26, 2025"
                requester="Mike.R"
                amount="USD 800.00"
                status="DRAFT"
                isNewVendor={true}
                onStatusClick={() => alert('Draft clicked')}
                onSelect={() => handleCardSelect('card3')}
                selected={selectedCards.has('card3')}
              />
              
              <Typography variant="h4" className="mb-2">High Amount Request</Typography>
              <RequestCard
                vendor="Enterprise Solutions"
                title="Annual Software Subscriptions"
                date="Jun 27, 2025"
                requester="Jennifer.L"
                amount="USD 15,000.00"
                status="PENDING"
                onStatusClick={() => alert('Pending clicked')}
                onSelect={() => handleCardSelect('card4')}
                selected={selectedCards.has('card4')}
              />
            </div>
            <div className="mt-2 text-sm text-gray-500 mb-6">Props: <code>vendor</code>, <code>title</code>, <code>date</code>, <code>requester</code>, <code>amount</code>, <code>status</code>, <code>onStatusClick</code>, <code>onSelect</code>, <code>selected</code>, <code>isNewVendor</code></div>

            <Typography variant="h3" className="mb-1">BulkActionsBar</Typography>
            <Typography variant="h4" className="mb-1">1. Approve/clear selection actions, Approve Selected bulk action</Typography>
            <BulkActionsBar
              selectedCount={3}
              selectionActions={[
                { label: 'Select all approvable', onClick: () => alert('Select all approvable'), show: true },
                { label: 'Clear', onClick: () => alert('Clear selection'), show: true },
              ]}
              bulkActions={[
                { label: 'Approve Selected', onClick: () => alert('Approve selected'), primary: true },
              ]}
            />
            <Typography variant="h4" className="mb-1 mt-6">2. Only Select all, Approve/Reject/Duplicate bulk actions</Typography>
            <BulkActionsBar
              selectedCount={5}
              selectionActions={[
                { label: 'Select all', onClick: () => alert('Select all'), show: true },
              ]}
              bulkActions={[
                { label: 'Approve all', onClick: () => alert('Approve all'), primary: true },
                { label: 'Reject all', onClick: () => alert('Reject all'), primary: false },
                { label: 'Duplicate', onClick: () => alert('Duplicate'), primary: false },
              ]}
            />
            <div className="mt-2 text-sm text-gray-500">Props: <code>selectedCount</code>, <code>selectionActions</code>, <code>bulkActions</code>, <code>className</code></div>
          </section>

          {/* AI & System Components */}
          <section>
            <Typography variant="h2" className="mb-2">AI & System Components</Typography>
            
            <Typography variant="h3" className="mb-1">InfoIcon</Typography>
            <div className="space-x-4 mb-4">
              <InfoIcon tooltip="This is a helpful tooltip" />
              <InfoIcon tooltip="Small info icon" size="sm" />
              <InfoIcon tooltip="Large info icon" size="lg" />
              <InfoIcon tooltip="Custom colored icon" color="text-blue-500" />
            </div>
            <div className="mt-2 text-sm text-gray-500 mb-6">Props: <code>tooltip</code>, <code>size</code> (sm, md, lg), <code>color</code>, <code>className</code></div>

            <Typography variant="h3" className="mb-1">AISpinner</Typography>
            <div className="space-y-4 mb-4">
              <AISpinner text="Generating purchase request..." />
              <AISpinner size="sm" text="Processing..." />
              <AISpinner size="lg" text="AI is thinking..." />
              <AISpinner />
            </div>
            <div className="mt-2 text-sm text-gray-500 mb-6">Props: <code>size</code> (sm, md, lg), <code>text</code>, <code>className</code></div>

            <Typography variant="h3" className="mb-1">SystemMessage</Typography>
            <div className="space-y-4 mb-4">
              <SystemMessage type="informative" message="Generating a Purchase request" />
              <SystemMessage type="positive" message="Request created successfully!" />
              <SystemMessage type="warning" message="Please review the vendor information before submitting." />
              <SystemMessage type="error" message="Failed to generate request. Please try again." />
            </div>
            <div className="mt-2 text-sm text-gray-500">Props: <code>type</code> (error, warning, positive, informative), <code>message</code>, <code>className</code>, <code>children</code></div>
          </section>

          {/* SkeletonLoader */}
          <section>
            <Typography variant="h2" className="mb-2">SkeletonLoader</Typography>
            <Typography variant="h3" className="mb-1">Basic Skeleton</Typography>
            <div className="space-y-2">
              <SkeletonLoader />
              <SkeletonLoader variant="circle" width="w-12" height="h-12" />
              <SkeletonLoader variant="rectangle" width="w-32" height="h-8" />
            </div>
            <Typography variant="h3" className="mb-1 mt-6">Skeleton Text</Typography>
            <SkeletonText lines={3} />
            <Typography variant="h3" className="mb-1 mt-6">Skeleton Card</Typography>
            <SkeletonCard />
            <Typography variant="h3" className="mb-1 mt-6">Skeleton List</Typography>
            <SkeletonList count={3} />
            <Typography variant="h3" className="mb-1 mt-6">Skeleton Avatar & Button</Typography>
            <div className="flex items-center space-x-4">
              <SkeletonAvatar size="lg" />
              <SkeletonButton size="md" />
            </div>
            <div className="mt-2 text-sm text-gray-500">Props: <code>variant</code>, <code>width</code>, <code>height</code>, <code>count</code>, <code>spacing</code>, <code>className</code></div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">AI Icon</h2>
            <div className="flex items-center space-x-6">
              <AIIcon size={32} />
              <span>Default (24px)</span>
              <AIIcon size={48} className="text-blue-500" />
              <span>Large (48px, blue)</span>
            </div>
          </section>
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">AI Stars Animation</h2>
            <div className="flex items-center space-x-6">
              <AIStarsAnimation size={32} />
              <span>Default (24px)</span>
              <AIStarsAnimation size={48} className="text-blue-500" />
              <span>Large (48px, blue)</span>
            </div>
          </section>

          {/* Tooltip */}
          <section>
            <Typography variant="h2" className="mb-2">Tooltip</Typography>
            <div className="flex gap-8 items-center mb-4">
              <Tooltip content="Tooltip on top (default)">
                <button className="px-4 py-2 bg-blue-600 text-white rounded">Hover me (top)</button>
              </Tooltip>
              <Tooltip content="Tooltip on bottom" placement="bottom">
                <button className="px-4 py-2 bg-green-600 text-white rounded">Hover me (bottom)</button>
              </Tooltip>
              <Tooltip content={<span>Custom <b>JSX</b> content</span>} placement="top">
                <span className="underline cursor-pointer">Hover text (custom)</span>
              </Tooltip>
            </div>
            <div className="mt-2 text-sm text-gray-500">Props: <code>children</code> (trigger), <code>content</code> (tooltip), <code>placement</code> ('top', 'bottom', 'left', 'right'), <code>className</code></div>
          </section>

          {/* RequestSummaryHeader */}
          <section>
            <Typography variant="h2" className="mb-2">RequestSummaryHeader</Typography>
            <RequestSummaryHeader
              title="Video licenses"
              requestNumber="23"
              status="Pending Approval"
              statusColor="blue"
              amount="445.00 USD"
              vendor="The Matrix"
              category="Subscriptions"
            />
            <div className="mt-2 text-sm text-gray-500">Props: <code>title</code>, <code>requestNumber</code>, <code>status</code>, <code>statusColor</code>, <code>amount</code>, <code>vendor</code>, <code>category</code>, <code>subtitle</code>, <code>children</code></div>
          </section>

          {/* ProcessFlow */}
          <section>
            <Typography variant="h2" className="mb-2">ProcessFlow</Typography>
            <ProcessFlow
              steps={[
                { label: 'Requestor', status: 'completed', icon: <FaCheck className="text-white w-3 h-3" />, names: 'Adley Rutschman', tooltip: 'Approved May 30, 2025' },
                { label: 'VP Engineering', status: 'completed', icon: <FaCheck className="text-white w-3 h-3" />, names: 'Gunnar Henderson', tooltip: 'Approved May 30, 2025' },
                { label: 'Technical m...', status: 'current', names: '4 possible approvers', tooltip: 'Pending' },
                { label: 'GM approval', status: 'pending', names: '4 possible approvers', tooltip: 'Pending' },
              ]}
            />
            <div className="mt-2 text-sm text-gray-500">Props: <code>steps</code> (array of steps or arrays for parallel steps, each with <code>label</code>, <code>status</code>, <code>icon</code>, <code>names</code>, <code>tooltip</code>, <code>subLabel</code>)</div>
            <Typography variant="h3" className="mt-6 mb-1">Parallel Approvals Example</Typography>
            <ProcessFlow
              steps={[
                { label: 'Procurement', status: 'completed', icon: <FaCheck className="text-white w-3 h-3" />, names: 'Bill Green', tooltip: 'Approved' },
                [
                  { label: 'IT', status: 'pending', names: 'Tony Fox', tooltip: 'Pending' },
                  { label: 'Infosec', status: 'pending', names: 'Shane Norman', tooltip: 'Pending' },
                  { label: 'Legal', status: 'pending', names: 'Sarah Price', tooltip: 'Pending' },
                ],
                { label: 'AP review', status: 'pending', names: 'Fay Kerans', tooltip: 'Pending' },
              ]}
            />
          </section>

          {/* New Components */}
          <section>

            <Typography variant="h3" className="mb-1">CommentsSection</Typography>
            <div className="flex h-96">
              <div className="flex-1 bg-gray-100 p-4">
                <p className="text-gray-600">Main content area</p>
              </div>
              <CommentsSection
                comments={[
                  {
                    user: { email: 'yacov.gorovoy+brandonhyde@tipalti.com' },
                    timestamp: '4 days ago',
                    message: '@yacov.gorovoy+jackflagerty@tipalti.com - Please review the financial details on this request. This is a longer comment to demonstrate how the text wraps in the medium width.'
                  },
                  {
                    user: { email: 'yacov.gorovoy+adahegerberg@tipalti.com' },
                    timestamp: '2 minutes ago',
                    message: '@yacov.gorovoy+adahegerberg@tipalti.com - Please have a look at this request and provide your feedback.'
                  }
                ]}
                mentionableUsers={[
                  { email: 'yacov.gorovoy+jackflagerty@tipalti.com', name: 'Jack Flagerty' },
                  { email: 'yacov.gorovoy+adahegerberg@tipalti.com', name: 'Ada Hegerberg' },
                  { email: 'yacov.gorovoy+brandonhyde@tipalti.com', name: 'Brandon Hyde' }
                ]}
                onAddComment={(comment) => alert(`New comment: ${comment}`)}
                maxLength={400}
              />
            </div>
            <div className="mt-2 text-sm text-gray-500 mb-6">Props: <code>comments</code>, <code>mentionableUsers</code>, <code>onAddComment</code>, <code>maxLength</code>, <code>width</code> ('sm', 'md', 'lg', 'xl')</div>

            <Typography variant="h3" className="mb-1">Comment</Typography>
            <div className="max-w-md space-y-4">
              <Comment
                user={{ email: 'yacov.gorovoy+brandonhyde@tipalti.com' }}
                timestamp="4 days ago"
                message="@yacov.gorovoy+jackflagerty@tipalti.com - Please review the financial details on this request."
                onTagClick={(email) => alert(`Clicked on ${email}`)}
              />
              <Comment
                user={{ email: 'yacov.gorovoy+adahegerberg@tipalti.com' }}
                timestamp="2 minutes ago"
                message="This is a regular comment without mentions."
              />
            </div>
            <div className="mt-2 text-sm text-gray-500 mb-6">Props: <code>user</code>, <code>timestamp</code>, <code>message</code>, <code>onTagClick</code></div>

            <Typography variant="h3" className="mb-1">Tag</Typography>
            <div className="space-x-4 mb-4">
              <Tag 
                text="@user@example.com" 
                email="user@example.com" 
                onClick={(email) => alert(`Clicked on ${email}`)}
              />
              <span>Regular text with a <Tag text="@mention" email="mention@example.com" /> in it.</span>
            </div>
            <div className="mt-2 text-sm text-gray-500 mb-6">Props: <code>text</code>, <code>email</code>, <code>onClick</code></div>






          </section>


        </div>
      </div>
    </div>
  );
} 