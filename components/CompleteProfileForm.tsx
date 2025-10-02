
'use client';

import { useState } from 'react';
import Link from 'next/link';
import BranchManagement from './BranchManagement';

const categories = [
  'Agriculture', 'Apparel & Fashion', 'Automobile', 'Brass Hardware & Components', 'Business Services',
  'Chemicals', 'Computer Hardware & Software', 'Construction & Real Estate', 'Consumer Electronics',
  'Electronics & Electrical Supplies', 'Energy & Power', 'Environment & Pollution', 'Food & Beverage',
  'Furniture', 'Gifts & Crafts', 'Health & Beauty', 'Home Supplies', 'Home Textiles & Furnishings',
  'Hospital & Medical Supplies', 'Hotel Supplies & Equipment', 'Industrial Supplies', 'Jewelry & Gemstones',
  'Leather & Leather Products', 'Machinery', 'Mineral & Metals', 'Office & School Supplies', 'Oil and Gas',
  'Packaging & Paper', 'Pharmaceuticals', 'Pipes, Tubes & Fittings', 'Plastics & Products',
  'Printing & Publishing', 'Real Estate', 'Scientific & Laboratory Instruments', 'Security & Protection',
  'Sports & Entertainment', 'Telecommunications', 'Textiles & Fabrics', 'Toys', 'Transportation'
];

const businessTypes = ['Supplier', 'Store', 'Office', 'Individual'];

const targetCustomerOptions = ['Large Organizations', 'Small Businesses', 'Individuals'];

const serviceDistanceOptions = ['5 km', '10 km', '15 km', '25 km', '50 km', '100+ km'];

const serviceOptions = [
  'Wholesale', 'Retail', 'Repair Services', 'Consulting', 'Installation',
  'Maintenance', 'Custom Orders', 'Bulk Orders', 'Emergency Services', 'Delivery'
];

export default function CompleteProfileForm({ formData, setFormData, selectedLocation }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedTargetCustomers, setSelectedTargetCustomers] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [productKeywords, setProductKeywords] = useState('');
  const [keywordSuggestions, setKeywordSuggestions] = useState([]);
  const [showKeywordGuide, setShowKeywordGuide] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');
  const [crFile, setCrFile] = useState(null);
  const [crPreview, setCrPreview] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  
  // Additional phone numbers state
  const [additionalPhones, setAdditionalPhones] = useState([
    { id: 1, type: 'Sales Representative', number: '', name: '' }
  ]);
  
  // Branch management state
  const [branches, setBranches] = useState([]);
  const [showBranchManagement, setShowBranchManagement] = useState(false);

  // Keyword suggestions based on category
  const getCategorySuggestions = (categories) => {
    const suggestions = {
      'Agriculture': ['seeds', 'fertilizers', 'pesticides', 'farming equipment', 'irrigation systems', 'livestock feed', 'greenhouse supplies', 'tractors', 'harvesting tools', 'organic products'],
      'Apparel & Fashion': ['clothing', 'fashion accessories', 'footwear', 'handbags', 'jewelry', 'watches', 'sunglasses', 'belts', 'scarves', 'fashion design'],
      'Automobile': ['car parts', 'automotive accessories', 'tires', 'batteries', 'engine oil', 'brake pads', 'car electronics', 'vehicle maintenance', 'auto repair', 'car detailing'],
      'Brass Hardware & Components': ['brass fittings', 'hardware components', 'metal fabrication', 'brass valves', 'connectors', 'fasteners', 'brass pipes', 'industrial hardware', 'custom brass parts', 'marine hardware'],
      'Business Services': ['consulting', 'accounting', 'legal services', 'marketing services', 'HR services', 'business development', 'financial planning', 'project management', 'training', 'outsourcing'],
      'Chemicals': ['industrial chemicals', 'laboratory chemicals', 'cleaning chemicals', 'specialty chemicals', 'chemical raw materials', 'petrochemicals', 'pharmaceutical chemicals', 'agricultural chemicals', 'water treatment', 'adhesives'],
      'Computer Hardware & Software': ['computers', 'laptops', 'software', 'servers', 'networking equipment', 'storage devices', 'monitors', 'keyboards', 'IT support', 'system integration'],
      'Construction & Real Estate': ['building materials', 'construction equipment', 'real estate', 'property management', 'cement', 'steel', 'concrete', 'roofing materials', 'electrical supplies', 'plumbing'],
      'Consumer Electronics': ['smartphones', 'tablets', 'laptops', 'televisions', 'audio systems', 'cameras', 'gaming consoles', 'wearables', 'home appliances', 'electronic accessories'],
      'Electronics & Electrical Supplies': ['electrical components', 'wiring', 'switches', 'outlets', 'circuit breakers', 'electrical panels', 'transformers', 'cables', 'lighting', 'power supplies'],
      'Energy & Power': ['solar panels', 'generators', 'batteries', 'renewable energy', 'power systems', 'electrical equipment', 'energy storage', 'inverters', 'wind turbines', 'power distribution'],
      'Environment & Pollution': ['waste management', 'recycling', 'environmental consulting', 'pollution control', 'water treatment', 'air purification', 'environmental monitoring', 'sustainable solutions', 'green technology', 'hazardous waste'],
      'Food & Beverage': ['catering', 'fresh vegetables', 'bakery items', 'beverages', 'frozen food', 'spices', 'dairy products', 'meat', 'seafood', 'organic food'],
      'Furniture': ['office chairs', 'desks', 'sofas', 'beds', 'dining tables', 'wardrobes', 'kitchen cabinets', 'outdoor furniture', 'custom furniture', 'office furniture'],
      'Gifts & Crafts': ['handmade crafts', 'gift items', 'decorative items', 'art supplies', 'personalized gifts', 'party supplies', 'seasonal decorations', 'hobby materials', 'collectibles', 'souvenirs'],
      'Health & Beauty': ['cosmetics', 'skincare products', 'hair care', 'health supplements', 'medical devices', 'beauty equipment', 'spa services', 'wellness products', 'fitness equipment', 'personal care'],
      'Home Supplies': ['household items', 'cleaning supplies', 'home decor', 'kitchen utensils', 'storage solutions', 'garden supplies', 'home improvement', 'appliances', 'bedding', 'bathroom accessories'],
      'Home Textiles & Furnishings': ['curtains', 'bed sheets', 'towels', 'carpets', 'upholstery', 'table linens', 'cushions', 'blankets', 'rugs', 'home fabrics'],
      'Hospital & Medical Supplies': ['medical equipment', 'surgical instruments', 'hospital furniture', 'medical disposables', 'diagnostic equipment', 'patient care', 'laboratory supplies', 'medical devices', 'healthcare products', 'pharmaceuticals'],
      'Hotel Supplies & Equipment': ['hotel furniture', 'hospitality supplies', 'restaurant equipment', 'hotel linens', 'catering equipment', 'hotel amenities', 'commercial kitchen', 'housekeeping supplies', 'hotel technology', 'guest room supplies'],
      'Industrial Supplies': ['industrial equipment', 'safety equipment', 'tools', 'machinery parts', 'industrial chemicals', 'manufacturing supplies', 'maintenance supplies', 'protective gear', 'industrial automation', 'quality control'],
      'Jewelry & Gemstones': ['gold jewelry', 'silver jewelry', 'diamonds', 'gemstones', 'watches', 'custom jewelry', 'precious metals', 'jewelry repair', 'wedding rings', 'fashion jewelry'],
      'Leather & Leather Products': ['leather goods', 'handbags', 'wallets', 'belts', 'shoes', 'leather jackets', 'luggage', 'leather furniture', 'custom leather', 'leather accessories'],
      'Machinery': ['industrial machinery', 'manufacturing equipment', 'construction machinery', 'agricultural machinery', 'packaging machinery', 'printing machinery', 'textile machinery', 'food processing', 'automation equipment', 'heavy machinery'],
      'Mineral & Metals': ['steel', 'aluminum', 'copper', 'iron ore', 'precious metals', 'metal alloys', 'mining equipment', 'metal processing', 'scrap metal', 'industrial metals'],
      'Office & School Supplies': ['office supplies', 'stationery', 'paper', 'pens', 'notebooks', 'office furniture', 'school supplies', 'educational materials', 'printing supplies', 'office equipment'],
      'Oil and Gas': ['petroleum products', 'oil drilling', 'gas equipment', 'refinery supplies', 'pipeline equipment', 'petrochemicals', 'fuel', 'oil field services', 'gas processing', 'energy services'],
      'Packaging & Paper': ['packaging materials', 'paper products', 'boxes', 'labels', 'plastic packaging', 'printing paper', 'corrugated boxes', 'packaging design', 'industrial packaging', 'eco packaging'],
      'Pharmaceuticals': ['medicines', 'pharmaceutical raw materials', 'medical supplies', 'drug manufacturing', 'healthcare products', 'pharmaceutical equipment', 'clinical supplies', 'biotechnology', 'research chemicals', 'medical devices'],
      'Pipes, Tubes & Fittings': ['steel pipes', 'PVC pipes', 'pipe fittings', 'valves', 'plumbing supplies', 'industrial pipes', 'tube fittings', 'pipeline systems', 'hydraulic fittings', 'gas pipes'],
      'Plastics & Products': ['plastic products', 'plastic raw materials', 'injection molding', 'plastic packaging', 'plastic containers', 'PVC products', 'plastic sheets', 'custom plastics', 'recycled plastics', 'polymer products'],
      'Printing & Publishing': ['printing services', 'digital printing', 'offset printing', 'publishing', 'graphic design', 'promotional materials', 'business cards', 'brochures', 'books', 'magazines'],
      'Real Estate': ['property sales', 'property management', 'real estate development', 'commercial property', 'residential property', 'property investment', 'real estate consulting', 'property valuation', 'leasing', 'construction'],
      'Scientific & Laboratory Instruments': ['laboratory equipment', 'scientific instruments', 'research equipment', 'analytical instruments', 'microscopes', 'testing equipment', 'laboratory supplies', 'measuring instruments', 'lab furniture', 'calibration services'],
      'Security & Protection': ['security systems', 'surveillance cameras', 'access control', 'alarm systems', 'security services', 'protective equipment', 'fire safety', 'security guards', 'cybersecurity', 'safety equipment'],
      'Sports & Entertainment': ['sports equipment', 'fitness equipment', 'recreational facilities', 'entertainment systems', 'sports accessories', 'outdoor gear', 'exercise machines', 'sports apparel', 'gaming equipment', 'leisure products'],
      'Telecommunications': ['telecom equipment', 'networking solutions', 'communication systems', 'mobile accessories', 'internet services', 'telephone systems', 'wireless technology', 'data communication', 'telecom infrastructure', 'VoIP systems'],
      'Textiles & Fabrics': ['fabrics', 'textiles', 'yarns', 'clothing materials', 'industrial textiles', 'home textiles', 'textile machinery', 'fabric printing', 'textile chemicals', 'fiber products'],
      'Toys': ['children toys', 'educational toys', 'outdoor toys', 'electronic toys', 'board games', 'action figures', 'dolls', 'toy vehicles', 'learning toys', 'baby toys'],
      'Transportation': ['logistics', 'freight services', 'shipping', 'cargo handling', 'transportation equipment', 'fleet management', 'warehousing', 'delivery services', 'supply chain', 'vehicle rental']
    };
    
    // Combine suggestions from all selected categories
    let allSuggestions = [];
    categories.forEach(category => {
      if (suggestions[category]) {
        allSuggestions = [...allSuggestions, ...suggestions[category]];
      }
    });
    
    // Remove duplicates and return first 15
    return [...new Set(allSuggestions)].slice(0, 15);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleProductKeywordsChange = (value) => {
    setProductKeywords(value);
    setFormData(prev => ({
      ...prev,
      productKeywords: value
    }));
    
    // Clear error when user starts typing
    if (errors.productKeywords) {
      setErrors(prev => ({ ...prev, productKeywords: '' }));
    }
  };

  const addSuggestedKeyword = (keyword) => {
    const currentKeywords = productKeywords.trim();
    const separator = currentKeywords ? ', ' : '';
    const newValue = currentKeywords + separator + keyword;
    handleProductKeywordsChange(newValue);
  };

  const handleServiceToggle = (service) => {
    const newServices = selectedServices.includes(service)
      ? selectedServices.filter(s => s !== service)
      : [...selectedServices, service];
    
    setSelectedServices(newServices);
    setFormData(prev => ({
      ...prev,
      services: newServices
    }));
  };

  const handleTargetCustomerToggle = (customer) => {
    const newCustomers = selectedTargetCustomers.includes(customer)
      ? selectedTargetCustomers.filter(c => c !== customer)
      : [...selectedTargetCustomers, customer];
    
    setSelectedTargetCustomers(newCustomers);
    setFormData(prev => ({
      ...prev,
      targetCustomers: newCustomers
    }));
  };

  const handleWorkingHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          [field]: value
        }
      }
    }));
  };

  const handleCRFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, crFile: 'Please upload a valid file (JPG, PNG, or PDF)' }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, crFile: 'File size must be less than 5MB' }));
        return;
      }
      
      setCrFile(file);
      
      // Show preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setCrPreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        setCrPreview('');
      }
      
      // Clear error
      if (errors.crFile) {
        setErrors(prev => ({ ...prev, crFile: '' }));
      }
    }
  };

  const validateStep = (step) => {
    // For demo purposes, allow progression without validation
    // Remove all validation requirements to allow easy navigation
    return true;
    
    /* Original validation commented out for demo:
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.category) newErrors.category = 'Please select a category';
      if (!formData.businessType) newErrors.businessType = 'Please select a business type';
      if (!formData.description.trim()) newErrors.description = 'Business description is required';
      if (formData.description.length < 50) newErrors.description = 'Description must be at least 50 characters';
      if (!productKeywords.trim()) newErrors.productKeywords = 'Please add products/services keywords to help customers find you';
      if (productKeywords.trim().length < 20) newErrors.productKeywords = 'Add more keywords (minimum: 20 characters) to improve search visibility';
    }
    
    if (step === 2) {
      if (selectedTargetCustomers.length === 0) newErrors.targetCustomers = 'Please select at least one target customer type';
      if (!formData.serviceDistance) newErrors.serviceDistance = 'Please select service distance';
    }
    
    if (step === 3) {
      if (!formData.address.trim()) newErrors.address = 'Business address is required';
    }
    
    if (step === 4) {
      if (!crFile) newErrors.crFile = 'Commercial Registration document is required for verification';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    */
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // For demo, allow submission without validation
    setIsSubmitting(true);
    setSubmitStatus('Uploading documents and saving profile...');
    
    try {
      // Simulate API call for file upload and profile submission
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setSubmitStatus('Profile submitted successfully!');
      setShowVerificationModal(true);
      
    } catch (error) {
      setSubmitStatus('Failed to save profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getBusinessTypeIcon = (type) => {
    switch (type) {
      case 'Supplier': return 'ri-truck-line';
      case 'Store': return 'ri-store-line';
      case 'Office': return 'ri-building-line';
      case 'Individual': return 'ri-user-line';
      default: return 'ri-building-line';
    }
  };

  const getStepTitle = (step) => {
    switch (step) {
      case 1: return 'Business Information';
      case 2: return 'Target Market & Services';
      case 3: return 'Location & Contact';
      case 4: return 'Working Hours & Branches';
      case 5: return 'Document Verification';
      default: return '';
    }
  };

  const getKeywordCount = () => {
    if (!productKeywords.trim()) return 0;
    return productKeywords.split(',').filter(k => k.trim().length > 0).length;
  };

  const phoneTypes = [
    'Sales Representative',
    'Procurement Representative', 
    'Technical Support',
    'Customer Service',
    'Manager',
    'General Inquiry'
  ];

  const handleCategoryToggle = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    setFormData(prev => ({
      ...prev,
      categories: newCategories
    }));
    
    // Update keyword suggestions based on selected categories
    if (newCategories.length > 0) {
      setKeywordSuggestions(getCategorySuggestions(newCategories));
    } else {
      setKeywordSuggestions([]);
    }
  };

  const handleAddPhone = () => {
    if (additionalPhones.length < 4) {
      setAdditionalPhones(prev => prev.concat({
        id: Date.now(),
        type: phoneTypes.find(type => !prev.some(phone => phone.type === type)) || 'General Inquiry',
        number: '',
        name: ''
      }));
    }
  };

  const handleRemovePhone = (id) => {
    setAdditionalPhones(prev => prev.filter(phone => phone.id !== id));
  };

  const handlePhoneChange = (id, field, value) => {
    setAdditionalPhones(prev => prev.map(phone => 
      phone.id === id ? { ...phone, [field]: value } : phone
    ));
    
    // Update form data
    const updatedPhones = additionalPhones.map(phone => 
      phone.id === id ? { ...phone, [field]: value } : phone
    );
    setFormData(prev => ({
      ...prev,
      additionalPhones: updatedPhones
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Complete Your Profile</h2>
          <span className="text-sm text-gray-500">Step {currentStep} of 5</span>
        </div>
        
        <div className="flex space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                step <= currentStep ? 'bg-yellow-400' : 'bg-gray-200'
              }`}
            ></div>
          ))}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{getStepTitle(currentStep)}</h3>
        <div className="w-full bg-gray-100 rounded-full h-1">
          <div 
            className="bg-yellow-400 h-1 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Pre-filled Account Info */}
      <div className="bg-green-50 p-4 rounded-lg mb-6 border border-green-200">
        <div className="flex items-center space-x-2 mb-3">
          <i className="ri-check-line text-green-600"></i>
          <h4 className="text-green-800 font-medium">Account Information (Verified)</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-green-700 font-medium">Business:</span>
            <p className="text-green-800">{formData.businessName}</p>
          </div>
          <div>
            <span className="text-green-700 font-medium">Phone:</span>
            <p className="text-green-800">{formData.contactPhone}</p>
          </div>
          <div>
            <span className="text-green-700 font-medium">Email:</span>
            <p className="text-green-800">{formData.contactEmail}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">What is your business type *</label>
              <div className="grid grid-cols-2 gap-3">
                {businessTypes.map(type => (
                  <label key={type} className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.businessType === type ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="businessType"
                      value={type}
                      checked={formData.businessType === type}
                      onChange={(e) => handleInputChange('businessType', e.target.value)}
                      className="w-4 h-4 text-yellow-400 border-gray-300 focus:ring-yellow-400"
                      required
                    />
                    <i className={`${getBusinessTypeIcon(type)} text-lg text-gray-600`}></i>
                    <span className="text-sm font-medium text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
              {errors.businessType && <p className="text-red-500 text-xs mt-1">{errors.businessType}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Business Categories *</label>
              <p className="text-sm text-gray-600 mb-4">Select all categories that apply to your business. This helps customers find you more easily.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto border border-gray-200 rounded-lg p-4">
                {categories.map(category => (
                  <label key={category} className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedCategories.includes(category) ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                    />
                    <span className="text-sm text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {selectedCategories.length} categories selected
                </span>
                {selectedCategories.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategories([]);
                      setFormData(prev => ({ ...prev, categories: [] }));
                    }}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Clear all
                  </button>
                )}
              </div>
              
              {errors.categories && <p className="text-red-500 text-xs mt-1">{errors.categories}</p>}
              
              {selectedCategories.length > 0 && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-800 mb-2">Selected Categories:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map(category => (
                      <span key={category} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Products/Services Keywords Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <i className="ri-search-line text-blue-600 text-xl"></i>
                  <h4 className="text-lg font-semibold text-blue-800">Products & Services Keywords *</h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowKeywordGuide(!showKeywordGuide)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <i className="ri-question-line mr-1"></i>
                  How to optimize?
                </button>
              </div>

              {showKeywordGuide && (
                <div className="bg-white p-4 rounded-lg mb-4 border border-blue-200">
                  <h5 className="font-medium text-gray-800 mb-3">
                    <i className="ri-lightbulb-line text-yellow-500 mr-2"></i>
                    How customers will find you
                  </h5>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-start space-x-3">
                      <i className="ri-search-2-line text-green-500 mt-0.5"></i>
                      <div>
                        <p className="font-medium">Search Matching</p>
                        <p>When customers search for "LED TV" or "office chairs", your business will appear if you include these keywords</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-price-tag-3-line text-blue-500 mt-0.5"></i>
                      <div>
                        <p className="font-medium">Be Specific</p>
                        <p>Use exact product names: "iPhone 15", "Samsung TV", "wooden dining table" instead of just "electronics"</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-group-line text-purple-500 mt-0.5"></i>
                      <div>
                        <p className="font-medium">Think Like Customers</p>
                        <p>Add terms customers actually search for: "cheap laptops", "bulk printing", "emergency repair"</p>
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                      <p className="text-yellow-800 font-medium text-xs">
                        <i className="ri-star-line mr-1"></i>
                        Pro Tip: Add 15-30 keywords including product names, brands, services, and customer search terms
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-4">
                <textarea
                  value={productKeywords}
                  onChange={(e) => handleProductKeywordsChange(e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm resize-none ${
                    errors.productKeywords ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter products and services separated by commas. Example: LED TV, Samsung electronics, iPhone repair, laptop wholesale, gaming computers, mobile accessories, warranty service, bulk orders..."
                />
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-xs ${errors.productKeywords ? 'text-red-500' : 'text-gray-600'}`}>
                    {errors.productKeywords || `${getKeywordCount()} keywords added (recommended: 15-30)`}
                  </span>
                  <span className={`text-xs ${productKeywords.length >= 20 ? 'text-green-500' : 'text-gray-400'}`}>
                    {productKeywords.length >= 20 ? '✓ Good' : `${productKeywords.length}/20 chars`}
                  </span>
                </div>
              </div>

              {/* Keyword Suggestions */}
              {selectedCategories.length > 0 && keywordSuggestions.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-blue-700 mb-3">
                    <i className="ri-magic-line mr-1"></i>
                    Quick suggestions based on your categories:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {keywordSuggestions.map((keyword, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => addSuggestedKeyword(keyword)}
                        className="bg-white border border-blue-300 text-blue-700 px-3 py-1 rounded-full text-xs hover:bg-blue-50 transition-colors cursor-pointer"
                      >
                        <i className="ri-add-line mr-1"></i>
                        {keyword}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Who do you serve? *</label>
              <div className="space-y-3">
                {targetCustomerOptions.map(customer => (
                  <label key={customer} className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedTargetCustomers.includes(customer) ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="checkbox"
                      checked={selectedTargetCustomers.includes(customer)}
                      onChange={() => handleTargetCustomerToggle(customer)}
                      className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                    />
                    <span className="text-sm text-gray-700">{customer}</span>
                  </label>
                ))}
              </div>
              {errors.targetCustomers && <p className="text-red-500 text-xs mt-1">{errors.targetCustomers}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Distance *</label>
              <select
                name="serviceDistance"
                value={formData.serviceDistance}
                onChange={(e) => handleInputChange('serviceDistance', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm pr-8 ${
                  errors.serviceDistance ? 'border-red-300' : 'border-gray-300'
                }`}
                required
              >
                <option value="">How far do you serve?</option>
                {serviceDistanceOptions.map(distance => (
                  <option key={distance} value={distance}>{distance}</option>
                ))}
              </select>
              {errors.serviceDistance && <p className="text-red-500 text-xs mt-1">{errors.serviceDistance}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Services Offered (Optional)</label>
              <div className="grid grid-cols-2 gap-3">
                {serviceOptions.map(service => (
                  <label key={service} className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedServices.includes(service) ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service)}
                      onChange={() => handleServiceToggle(service)}
                      className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                    />
                    <span className="text-sm text-gray-700">{service}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Select all services that apply to your business</p>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website (Optional)</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Business Phone *</label>
              <input
                type="tel"
                name="mainPhone"
                value={formData.mainPhone || formData.contactPhone}
                onChange={(e) => handleInputChange('mainPhone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                placeholder="+966 11 234 5678"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Primary contact number for your business</p>
            </div>

            {/* Additional Phone Numbers Section - Simplified */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">Additional Contact Numbers (Optional)</label>
                {additionalPhones.length < 4 && (
                  <button
                    type="button"
                    onClick={handleAddPhone}
                    className="text-yellow-600 hover:text-yellow-700 text-sm font-medium cursor-pointer"
                  >
                    <i className="ri-add-line mr-1"></i>
                    Add Number
                  </button>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-4">Add specialized contact numbers for different departments</p>

              <div className="space-y-3">
                {additionalPhones.map((phone, index) => (
                  <div key={phone.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <select
                        value={phone.type}
                        onChange={(e) => handlePhoneChange(phone.id, 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm pr-8"
                      >
                        {phoneTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <input
                        type="tel"
                        value={phone.number}
                        onChange={(e) => handlePhoneChange(phone.id, 'number', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                        placeholder="+966 50 123 4567"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={phone.name}
                        onChange={(e) => handlePhoneChange(phone.id, 'name', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                        placeholder="Contact name"
                      />
                      {additionalPhones.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemovePhone(phone.id)}
                          className="w-8 h-8 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer"
                        >
                          <i className="ri-close-line"></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {additionalPhones.length === 0 && (
                <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <i className="ri-phone-line text-gray-400 text-2xl mb-2"></i>
                  <p className="text-gray-600 text-sm mb-3">No additional numbers added</p>
                  <button
                    type="button"
                    onClick={handleAddPhone}
                    className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 text-sm font-medium whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-add-line mr-2"></i>
                    Add Contact Number
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm ${
                  errors.address ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your complete business address"
                required
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-800 mb-2">
                <i className="ri-map-pin-line mr-2"></i>
                Selected Location: Lat {selectedLocation.lat.toFixed(6)}, Lng {selectedLocation.lng.toFixed(6)}
              </p>
              <p className="text-xs text-yellow-700">
                Click on the map to adjust your business location pin for accurate positioning
              </p>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            {/* Working Hours Section - Compact */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-time-line text-blue-600 text-lg"></i>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-blue-800">Working Hours</h4>
                  <p className="text-blue-700 text-xs">Set your main business operating hours</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {Object.keys(formData.workingHours).map(day => (
                  <div key={day} className="flex items-center space-x-3 p-2 bg-white rounded-lg border border-blue-200">
                    <div className="w-16">
                      <span className="text-xs font-medium text-gray-700 capitalize">{day}</span>
                    </div>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.workingHours[day].closed}
                        onChange={(e) => handleWorkingHoursChange(day, 'closed', e.target.checked)}
                        className="w-3 h-3 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400 mr-1"
                      />
                      <span className="text-xs text-gray-600">Closed</span>
                    </label>
                    
                    {!formData.workingHours[day].closed && (
                      <div className="flex items-center space-x-1">
                        <input
                          type="time"
                          value={formData.workingHours[day].open}
                          onChange={(e) => handleWorkingHoursChange(day, 'open', e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-xs"
                        />
                        <span className="text-gray-500 text-xs">to</span>
                        <input
                          type="time"
                          value={formData.workingHours[day].close}
                          onChange={(e) => handleWorkingHoursChange(day, 'close', e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-xs"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Branch Management Section - Compact */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="ri-building-line text-green-600 text-lg"></i>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-green-800">Multiple Branches</h4>
                  <p className="text-green-700 text-xs">Expand your business reach with multiple locations</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <div className="bg-white p-3 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-1 mb-1">
                    <i className="ri-map-pin-line text-green-500 text-sm"></i>
                    <span className="font-medium text-gray-700 text-sm">Multiple Locations</span>
                  </div>
                  <p className="text-xs text-gray-600">Serve customers across different areas</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-1 mb-1">
                    <i className="ri-time-line text-blue-500 text-sm"></i>
                    <span className="font-medium text-gray-700 text-sm">Flexible Hours</span>
                  </div>
                  <p className="text-xs text-gray-600">Different hours per branch</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-1 mb-1">
                    <i className="ri-team-line text-purple-500 text-sm"></i>
                    <span className="font-medium text-gray-700 text-sm">Better Management</span>
                  </div>
                  <p className="text-xs text-gray-600">Track each location performance</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-800 font-medium text-sm">Ready to add branches?</p>
                  <p className="text-green-600 text-xs">Skip this step and add branches later</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBranchManagement(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 font-medium text-sm whitespace-nowrap cursor-pointer transition-all"
                >
                  <i className="ri-add-line mr-1"></i>
                  Add Branches
                </button>
              </div>
            </div>

            {/* Current Branches Summary - Compact */}
            {branches.length > 0 && (
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <h4 className="text-base font-semibold text-blue-800 mb-3">
                  <i className="ri-building-line mr-1"></i>
                  Your Branches ({branches.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {branches.slice(0, 4).map((branch) => (
                    <div key={branch.id} className="bg-white p-3 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="font-medium text-gray-800 text-sm">{branch.name}</h5>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          branch.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {branch.status}
                        </span>
                      </div>
                      <div className="space-y-0.5 text-xs text-gray-600">
                        <div className="flex items-center space-x-1">
                          <i className="ri-map-pin-line text-gray-400"></i>
                          <span className="truncate">{branch.address}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <i className="ri-phone-line text-gray-400"></i>
                          <span>{branch.phone}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {branches.length > 4 && (
                    <div className="bg-gray-100 p-3 rounded-lg border border-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 font-medium text-sm">
                        +{branches.length - 4} more branches
                      </span>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowBranchManagement(true)}
                  className="mt-3 bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 text-xs font-medium whitespace-nowrap cursor-pointer transition-all"
                >
                  <i className="ri-edit-line mr-1"></i>
                  Manage Branches
                </button>
              </div>
            )}

            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <div className="flex items-start space-x-2">
                <i className="ri-information-line text-yellow-600 text-lg mt-0.5"></i>
                <div>
                  <h4 className="text-yellow-800 font-semibold mb-1 text-sm">Branch Management Benefits</h4>
                  <ul className="text-xs text-gray-700 space-y-0.5">
                    <li>• Customers find your nearest location automatically</li>
                    <li>• Each branch has unique contact info and hours</li>
                    <li>• Track inquiries and performance by location</li>
                    <li>• Appear in more local search results</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <i className="ri-shield-check-line text-red-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-red-800">Business Verification Required</h4>
                  <p className="text-red-700 text-sm">Upload your Commercial Registration to verify your business legitimacy</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <h5 className="font-medium text-gray-800 mb-3">Why is this required?</h5>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start space-x-2">
                    <i className="ri-check-line text-green-500 mt-0.5"></i>
                    <span>Ensures only legitimate businesses are listed on our platform</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="ri-check-line text-green-500 mt-0.5"></i>
                    <span>Build trust with potential customers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="ri-check-line text-green-500 mt-0.5"></i>
                    <span>Provides legal protection and compliance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="ri-check-line text-green-500 mt-0.5"></i>
                    <span>Unlocks premium features and higher search ranking</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commercial Registration Document *
              </label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                errors.crFile ? 'border-red-300 bg-red-50' : crFile ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-yellow-400 hover:bg-yellow-50'
              }`}>
                <input
                  type="file"
                  id="cr-upload"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleCRFileChange}
                  className="hidden"
                />
                
                {!crFile ? (
                  <label htmlFor="cr-upload" className="cursor-pointer">
                    <div className="space-y-3">
                      <i className="ri-upload-cloud-2-line text-4xl text-gray-400"></i>
                      <div>
                        <p className="text-lg font-medium text-gray-700">Upload your Commercial Registration</p>
                        <p className="text-sm text-gray-500">
                          Click to browse or drag and drop your CR document
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          Supported formats: JPG, PNG, PDF (Max 5MB)
                        </p>
                      </div>
                    </div>
                  </label>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-3">
                      <i className="ri-file-check-line text-3xl text-green-600"></i>
                      <div className="text-left">
                        <p className="font-medium text-gray-800">{crFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(crFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    
                    {crPreview && (
                      <div className="max-w-sm mx-auto">
                        <img 
                          src={crPreview} 
                          alt="CR Preview" 
                          className="w-full h-auto rounded-lg shadow-md"
                        />
                      </div>
                    )}
                    
                    <div className="flex justify-center space-x-3">
                      <label htmlFor="cr-upload" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm cursor-pointer">
                        <i className="ri-refresh-line mr-2"></i>
                        Replace File
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setCrFile(null);
                          setCrPreview('');
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm cursor-pointer"
                      >
                        <i className="ri-delete-bin-line mr-2"></i>
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {errors.crFile && <p className="text-red-500 text-xs mt-1">{errors.crFile}</p>}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-medium text-blue-800 mb-2">
                <i className="ri-information-line mr-2"></i>
                What happens next?
              </h5>
              <ol className="text-sm text-blue-700 space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                  <span>Your document will be reviewed by our verification team</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                  <span>You'll receive a notification about verification status</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                  <span>Once approved, your business profile will go live</span>
                </li>
              </ol>
              <p className="text-xs text-blue-600 mt-3">
                Verification typically takes 1-2 business days
              </p>
            </div>

            {/* Profile Summary */}
            <div className="bg-green-50 p-6 rounded-lg mt-6">
              <h4 className="text-lg font-semibold text-green-800 mb-4">Profile Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><span className="font-medium">Business:</span> {formData.businessName}</p>
                  <p><span className="font-medium">Category:</span> {formData.category}</p>
                  <p><span className="font-medium">Type:</span> {formData.businessType}</p>
                  <p><span className="font-medium">Services:</span> {selectedServices.length} selected</p>
                </div>
                <div>
                  <p><span className="font-medium">Email:</span> {formData.contactEmail}</p>
                  <p><span className="font-medium">Phone:</span> {formData.contactPhone}</p>
                  <p><span className="font-medium">Target Customers:</span> {selectedTargetCustomers.length} types</p>
                  <p><span className="font-medium">Keywords:</span> {getKeywordCount()} added</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {submitStatus && (
          <div className={`p-4 rounded-lg ${
            submitStatus.includes('Failed') ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
          }`}>
            <p className="text-sm">{submitStatus}</p>
          </div>
        )}

        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-all ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Previous
          </button>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-yellow-400 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 font-medium whitespace-nowrap cursor-pointer transition-all"
            >
              Next Step
              <i className="ri-arrow-right-line ml-2"></i>
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-all ${
                isSubmitting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isSubmitting ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Submitting Profile...
                </>
              ) : (
                <>
                  <i className="ri-send-plane-line mr-2"></i>
                  Submit for Verification
                </>
              )}
            </button>
          )}
        </div>
      </form>

      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-check-line text-green-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Profile Completed!</h3>
            <p className="text-gray-600 mb-6">
              Your business profile is now complete and will be visible to customers searching in your area.
            </p>
            <div className="space-y-3">
              <Link
                href="/"
                className="block bg-yellow-400 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 font-medium whitespace-nowrap cursor-pointer w-full"
              >
                View Your Listing
              </Link>
              <button
                onClick={() => setShowSuccess(false)}
                className="block border border-gray-300 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap cursor-pointer w-full"
              >
                Continue Editing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verification Pending Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-lg mx-4 text-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-time-line text-yellow-600 text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Profile Submitted Successfully!</h3>
            <p className="text-gray-600 mb-6">
              Your business profile and Commercial Registration have been submitted for verification. 
              Our team will review your documents and information within 1-2 business days.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
              <h4 className="font-semibold text-blue-800 mb-2">What happens next:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>✓ Document verification by our team</li>
                <li>✓ Business information validation</li>
                <li>✓ Email notification of approval status</li>
                <li>✓ Profile goes live once verified</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <Link
                href="/dashboard"
                className="block bg-yellow-400 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 font-medium whitespace-nowrap cursor-pointer w-full"
              >
                <i className="ri-user-line mr-2"></i>
                View Profile
              </Link>
              <Link
                href="/"
                className="block border border-gray-300 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap cursor-pointer w-full"
              >
                Close
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Branch Management Modal */}
      {showBranchManagement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-7xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">Branch Management</h3>
                <button
                  onClick={() => setShowBranchManagement(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <BranchManagement 
                branches={branches}
                setBranches={setBranches}
                mainBusinessData={formData}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
