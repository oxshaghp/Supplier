'use client';

import { useState } from 'react';

export default function BranchManagement({ branches, setBranches, mainBusinessData }) {
  const [showAddBranch, setShowAddBranch] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [newBranch, setNewBranch] = useState({
    id: '',
    name: '',
    address: '',
    phone: '',
    email: '',
    manager: '',
    location: { lat: 24.7136, lng: 46.6753 },
    workingHours: {
      monday: { open: '09:00', close: '17:00', closed: false },
      tuesday: { open: '09:00', close: '17:00', closed: false },
      wednesday: { open: '09:00', close: '17:00', closed: false },
      thursday: { open: '09:00', close: '17:00', closed: false },
      friday: { open: '09:00', close: '17:00', closed: false },
      saturday: { open: '10:00', close: '16:00', closed: false },
      sunday: { open: '10:00', close: '16:00', closed: true }
    },
    status: 'active',
    specialServices: [],
    isMainBranch: false
  });
  const [errors, setErrors] = useState({});
  const [selectedLocation, setSelectedLocation] = useState({ lat: 24.7136, lng: 46.6753 });

  const saudiCities = [
    { name: 'Riyadh', lat: 24.7136, lng: 46.6753 },
    { name: 'Jeddah', lat: 21.4858, lng: 39.1925 },
    { name: 'Mecca', lat: 21.3891, lng: 39.8579 },
    { name: 'Medina', lat: 24.5247, lng: 39.5692 },
    { name: 'Dammam', lat: 26.4207, lng: 50.0888 },
    { name: 'Khobar', lat: 26.2172, lng: 50.1971 }
  ];

  const specialServices = [
    'Express Delivery', 'Installation Service', 'Technical Support', 'Bulk Orders',
    'Emergency Service', 'Consultation', 'Training', 'Maintenance'
  ];

  const handleInputChange = (field, value) => {
    setNewBranch(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLocationSelect = (city) => {
    const selectedCity = saudiCities.find(c => c.name === city);
    if (selectedCity) {
      setSelectedLocation(selectedCity);
      setNewBranch(prev => ({
        ...prev,
        location: selectedCity
      }));
    }
  };

  const handleWorkingHoursChange = (day, field, value) => {
    setNewBranch(prev => ({
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

  const handleServiceToggle = (service) => {
    setNewBranch(prev => ({
      ...prev,
      specialServices: prev.specialServices.includes(service)
        ? prev.specialServices.filter(s => s !== service)
        : [...prev.specialServices, service]
    }));
  };

  const validateBranch = () => {
    const newErrors = {};
    
    if (!newBranch.name.trim()) newErrors.name = 'Branch name is required';
    if (!newBranch.address.trim()) newErrors.address = 'Branch address is required';
    if (!newBranch.phone.trim()) newErrors.phone = 'Branch phone is required';
    if (!newBranch.manager.trim()) newErrors.manager = 'Branch manager is required';
    
    // Check for duplicate branch names
    const existingBranch = branches.find(b => 
      b.name.toLowerCase() === newBranch.name.toLowerCase() && 
      b.id !== newBranch.id
    );
    if (existingBranch) {
      newErrors.name = 'Branch name already exists';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveBranch = () => {
    if (!validateBranch()) return;
    
    const branchData = {
      ...newBranch,
      id: editingBranch ? editingBranch.id : Date.now().toString(),
      location: selectedLocation
    };
    
    if (editingBranch) {
      setBranches(prev => prev.map(b => b.id === editingBranch.id ? branchData : b));
    } else {
      setBranches(prev => [...prev, branchData]);
    }
    
    handleCancelAdd();
  };

  const handleEditBranch = (branch) => {
    setEditingBranch(branch);
    setNewBranch({ ...branch });
    setSelectedLocation(branch.location);
    setShowAddBranch(true);
  };

  const handleDeleteBranch = (branchId) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      setBranches(prev => prev.filter(b => b.id !== branchId));
    }
  };

  const handleCancelAdd = () => {
    setShowAddBranch(false);
    setEditingBranch(null);
    setNewBranch({
      id: '',
      name: '',
      address: '',
      phone: '',
      email: '',
      manager: '',
      location: { lat: 24.7136, lng: 46.6753 },
      workingHours: {
        monday: { open: '09:00', close: '17:00', closed: false },
        tuesday: { open: '09:00', close: '17:00', closed: false },
        wednesday: { open: '09:00', close: '17:00', closed: false },
        thursday: { open: '09:00', close: '17:00', closed: false },
        friday: { open: '09:00', close: '17:00', closed: false },
        saturday: { open: '10:00', close: '16:00', closed: false },
        sunday: { open: '10:00', close: '16:00', closed: true }
      },
      status: 'active',
      specialServices: [],
      isMainBranch: false
    });
    setSelectedLocation({ lat: 24.7136, lng: 46.6753 });
    setErrors({});
  };

  const toggleBranchStatus = (branchId) => {
    setBranches(prev => prev.map(b => 
      b.id === branchId 
        ? { ...b, status: b.status === 'active' ? 'inactive' : 'active' }
        : b
    ));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Branch Management</h2>
          <p className="text-gray-600">Manage multiple locations for {mainBusinessData.businessName}</p>
        </div>
        <button
          onClick={() => setShowAddBranch(true)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 font-medium whitespace-nowrap cursor-pointer transition-all"
        >
          <i className="ri-add-line mr-2"></i>
          Add New Branch
        </button>
      </div>

      {/* Business Overview */}
      <div className="bg-blue-50 p-6 rounded-xl mb-8 border border-blue-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <i className="ri-building-line text-blue-600 text-xl"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-800">{mainBusinessData.businessName}</h3>
            <p className="text-blue-600 text-sm">{mainBusinessData.category} • {mainBusinessData.businessType}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <i className="ri-map-pin-line text-green-500"></i>
              <span className="font-medium text-gray-700">Total Branches</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{branches.length}</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <i className="ri-check-line text-green-500"></i>
              <span className="font-medium text-gray-700">Active Branches</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{branches.filter(b => b.status === 'active').length}</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <i className="ri-pause-line text-orange-500"></i>
              <span className="font-medium text-gray-700">Inactive Branches</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">{branches.filter(b => b.status === 'inactive').length}</p>
          </div>
        </div>
      </div>

      {/* Branches List */}
      {branches.length > 0 ? (
        <div className="space-y-4 mb-8">
          {branches.map((branch) => (
            <div key={branch.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    branch.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <i className={`ri-store-line text-xl ${
                      branch.status === 'active' ? 'text-green-600' : 'text-gray-500'
                    }`}></i>
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{branch.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        branch.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {branch.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                      {branch.isMainBranch && (
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                          Main Branch
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <i className="ri-map-pin-line text-gray-400"></i>
                        <span>{branch.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="ri-phone-line text-gray-400"></i>
                        <span>{branch.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="ri-user-line text-gray-400"></i>
                        <span>Manager: {branch.manager}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleBranchStatus(branch.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer transition-all ${
                      branch.status === 'active'
                        ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    <i className={`${branch.status === 'active' ? 'ri-pause-line' : 'ri-play-line'} mr-1`}></i>
                    {branch.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleEditBranch(branch)}
                    className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 text-sm font-medium whitespace-nowrap cursor-pointer transition-all"
                  >
                    <i className="ri-edit-line mr-1"></i>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBranch(branch.id)}
                    className="bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 text-sm font-medium whitespace-nowrap cursor-pointer transition-all"
                  >
                    <i className="ri-delete-bin-line mr-1"></i>
                    Delete
                  </button>
                </div>
              </div>

              {/* Branch Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Working Hours</h4>
                  <div className="space-y-1 text-sm">
                    {Object.entries(branch.workingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="capitalize text-gray-600">{day}:</span>
                        <span className="text-gray-800">
                          {hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {branch.specialServices.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Special Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {branch.specialServices.map((service) => (
                        <span
                          key={service}
                          className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-store-line text-gray-400 text-2xl"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">No Branches Added Yet</h3>
          <p className="text-gray-500 mb-6">Add your first branch location to expand your business reach</p>
          <button
            onClick={() => setShowAddBranch(true)}
            className="bg-yellow-400 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 font-medium whitespace-nowrap cursor-pointer transition-all"
          >
            <i className="ri-add-line mr-2"></i>
            Add First Branch
          </button>
        </div>
      )}

      {/* Add/Edit Branch Modal */}
      {showAddBranch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {editingBranch ? 'Edit Branch' : 'Add New Branch'}
              </h3>
              <button
                onClick={handleCancelAdd}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Branch Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Branch Name *</label>
                  <input
                    type="text"
                    value={newBranch.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Downtown Branch, Mall Location"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Branch Address *</label>
                  <textarea
                    value={newBranch.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm resize-none ${
                      errors.address ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Complete branch address with landmarks"
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Branch Phone *</label>
                    <input
                      type="tel"
                      value={newBranch.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm ${
                        errors.phone ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="+966 50 123 4567"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Branch Email</label>
                    <input
                      type="email"
                      value={newBranch.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                      placeholder="branch@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Branch Manager *</label>
                  <input
                    type="text"
                    value={newBranch.manager}
                    onChange={(e) => handleInputChange('manager', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm ${
                      errors.manager ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Manager's full name"
                  />
                  {errors.manager && <p className="text-red-500 text-xs mt-1">{errors.manager}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={saudiCities.find(c => c.lat === selectedLocation.lat && c.lng === selectedLocation.lng)?.name || ''}
                    onChange={(e) => handleLocationSelect(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm pr-8"
                  >
                    <option value="">Select city...</option>
                    {saudiCities.map(city => (
                      <option key={city.name} value={city.name}>{city.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Special Services (Optional)</label>
                  <div className="grid grid-cols-2 gap-3">
                    {specialServices.map(service => (
                      <label key={service} className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all ${
                        newBranch.specialServices.includes(service) ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <input
                          type="checkbox"
                          checked={newBranch.specialServices.includes(service)}
                          onChange={() => handleServiceToggle(service)}
                          className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                        />
                        <span className="text-sm text-gray-700">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Working Hours</h4>
                  <div className="space-y-4">
                    {Object.keys(newBranch.workingHours).map(day => (
                      <div key={day} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-20">
                          <span className="text-sm font-medium text-gray-700 capitalize">{day}</span>
                        </div>
                        
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newBranch.workingHours[day].closed}
                            onChange={(e) => handleWorkingHoursChange(day, 'closed', e.target.checked)}
                            className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400 mr-2"
                          />
                          <span className="text-sm text-gray-600">Closed</span>
                        </label>
                        
                        {!newBranch.workingHours[day].closed && (
                          <div className="flex items-center space-x-2 flex-1">
                            <input
                              type="time"
                              value={newBranch.workingHours[day].open}
                              onChange={(e) => handleWorkingHoursChange(day, 'open', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                            />
                            <span className="text-gray-500">to</span>
                            <input
                              type="time"
                              value={newBranch.workingHours[day].close}
                              onChange={(e) => handleWorkingHoursChange(day, 'close', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location Map Preview */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-3">Branch Location</h4>
                  <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
                    <iframe
                      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2!2d${selectedLocation.lng}!3d${selectedLocation.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${selectedLocation.lat}%2C${selectedLocation.lng}!5e0!3m2!1sen!2sus!4v1645123456789!5m2!1sen!2sus&disableDefaultUI=true&gestureHandling=none&scrollwheel=false&disableDoubleClickZoom=true&clickableIcons=false`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Branch Location Map"
                    ></iframe>
                    
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Lat: {selectedLocation.lat.toFixed(6)}, Lng: {selectedLocation.lng.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleCancelAdd}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap cursor-pointer transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBranch}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 font-medium whitespace-nowrap cursor-pointer transition-all"
              >
                <i className="ri-save-line mr-2"></i>
                {editingBranch ? 'Update Branch' : 'Add Branch'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}