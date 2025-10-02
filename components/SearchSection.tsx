
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';
import FeaturedBusinesses from './FeaturedBusinesses';

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [location, setLocation] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestData, setRequestData] = useState({
    product: '',
    quantity: '',
    location: '',
    description: '',
    urgency: 'normal',
    contactMethod: 'email'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [description, setDescription] = useState('');
  const [sentenceCount, setSentenceCount] = useState(0);
  const { t, isRTL } = useLanguage();
  const router = useRouter();

  // Enhanced business locations with proper category mapping
  const businessLocations = [
    // Agriculture category
    { name: 'Green Valley Agriculture', address: 'Industrial City, Riyadh', lat: 24.6986, lng: 46.6653, type: 'Agriculture', category: 'agriculture' },
    { name: 'Date Palm Suppliers', address: 'Agricultural Zone', lat: 24.5297, lng: 39.5742, type: 'Agriculture', category: 'agriculture' },
    { name: 'Northern Agriculture', address: 'King Abdulaziz Road, Tabuk', lat: 28.3998, lng: 36.5660, type: 'Agriculture', category: 'agriculture' },
    { name: 'Central Grain Trading', address: 'Agricultural Market, Buraidah', lat: 26.3260, lng: 43.9750, type: 'Agriculture', category: 'agriculture' },
    { name: 'Hail Agricultural Equipment', address: 'Agricultural Center, Hail', lat: 27.5114, lng: 41.6900, type: 'Agriculture', category: 'agriculture' },

    // Electronics category
    { name: 'Tech Solutions Center', address: 'King Fahd Road, Al-Olaya', lat: 24.7136, lng: 46.6753, type: 'Electronics', category: 'consumer-electronics' },
    { name: 'Metro Electronics Supply', address: 'Olaya Street, Riyadh', lat: 24.7186, lng: 46.6800, type: 'Electronics', category: 'consumer-electronics' },
    { name: 'Red Sea Electronics', address: 'Tahlia Street, Jeddah', lat: 21.4858, lng: 39.1925, type: 'Electronics', category: 'consumer-electronics' },
    { name: 'Eastern Electronics Hub', address: 'Dhahran Street, Dammam', lat: 26.4207, lng: 50.0888, type: 'Electronics', category: 'consumer-electronics' },
    { name: 'Qassim Electronics', address: 'Main Street', lat: 26.3310, lng: 43.9800, type: 'Electronics', category: 'consumer-electronics' },

    // Automotive category
    { name: 'Riyadh Auto Parts', address: 'Exit 5, Ring Road', lat: 24.7236, lng: 46.6853, type: 'Automotive', category: 'automobile' },
    { name: 'Eastern Auto Parts', address: 'King Saud Road', lat: 26.4157, lng: 50.0838, type: 'Automotive', category: 'automobile' },

    // Construction category
    { name: 'Capital Hardware', address: 'King Abdul Aziz Road', lat: 24.7086, lng: 46.6700, type: 'Hardware', category: 'construction-real-estate' },
    { name: 'Coastal Construction', address: 'Corniche Road', lat: 21.4808, lng: 39.1875, type: 'Construction', category: 'construction-real-estate' },
    { name: 'Tabuk Construction Materials', address: 'Industrial Area', lat: 28.4048, lng: 36.5710, type: 'Construction', category: 'construction-real-estate' },
    { name: 'Mountain Construction', address: 'Construction District', lat: 18.3111, lng: 42.7376, type: 'Construction', category: 'construction-real-estate' },

    // Industrial category
    { name: 'Jeddah Industrial Supplies', address: 'Industrial Area, Jeddah', lat: 21.4908, lng: 39.1975, type: 'Industrial', category: 'industrial-supplies' },
    { name: 'Oil Services Company', address: 'Industrial City', lat: 26.4257, lng: 50.0938, type: 'Oil&Gas', category: 'oil-gas' },
    { name: 'Industrial Equipment Co.', address: 'SABIC Area', lat: 27.0224, lng: 49.6634, type: 'Industrial', category: 'industrial-supplies' },
    { name: 'Jubail Petrochemicals', address: 'Industrial City, Al Jubail', lat: 27.0174, lng: 49.6584, type: 'Petrochemical', category: 'chemicals' },

    // Fashion & Textiles category
    { name: 'Fashion District', address: 'Al-Rawdah District', lat: 21.4758, lng: 39.1825, type: 'Fashion', category: 'apparel-fashion' },
    { name: 'Southern Textiles', address: 'Industrial Zone', lat: 18.2114, lng: 42.4997, type: 'Textiles', category: 'textiles-fabrics' },

    // Medical category
    { name: 'Medical Equipment Co.', address: 'Al-Sharafeyah', lat: 21.4958, lng: 39.2025, type: 'Medical', category: 'hospital-medical' },

    // Food & Beverage category
    { name: 'Mountain Fresh Foods', address: 'King Khalid Street, Abha', lat: 18.2164, lng: 42.5047, type: 'Food', category: 'food-beverage' },
    { name: 'Mecca Food Distributors', address: 'Al-Misfalah', lat: 21.3941, lng: 39.8629, type: 'Food', category: 'food-beverage' },

    // Technology category
    { name: 'Khobar Tech Center', address: 'Prince Faisal Street', lat: 26.2172, lng: 50.1971, type: 'Technology', category: 'computer-hardware-software' },

    // Office Supplies category
    { name: 'Office Plus Supplies', address: 'Business District', lat: 24.7286, lng: 46.6903, type: 'Office', category: 'office-school' },

    // Services category
    { name: 'Highland Tourism Services', address: 'Tourist District', lat: 18.2214, lng: 42.5097, type: 'Tourism', category: 'sports-entertainment' },
    { name: 'Mountain Tourism Equipment', address: 'Tourist Area', lat: 21.2753, lng: 40.4208, type: 'Tourism', category: 'sports-entertainment' },
    { name: 'Pilgrimage Services', address: 'Near Haram', lat: 21.3841, lng: 39.8529, type: 'Services', category: 'business-services' },

    // Trading & Logistics category
    { name: 'Medina Trading', address: 'Prophet Mosque Area', lat: 24.5247, lng: 39.5692, type: 'Trading', category: 'business-services' },
    { name: 'Northern Trading Post', address: 'Commercial Street', lat: 27.5164, lng: 41.6950, type: 'Trading', category: 'business-services' },
    { name: 'Border Trade Center', address: 'Commercial District, Najran', lat: 17.4924, lng: 44.1277, type: 'Trading', category: 'business-services' },
    { name: 'Southern Logistics', address: 'Transportation Hub', lat: 17.4974, lng: 44.1327, type: 'Logistics', category: 'transportation' },

    // Marine & Port category
    { name: 'Gulf Marine Supplies', address: 'Corniche, Al Khobar', lat: 26.2122, lng: 50.1921, type: 'Marine', category: 'transportation' },
    { name: 'Port Jazan Services', address: 'Port Area, Jazan', lat: 16.8892, lng: 42.5511, type: 'Port', category: 'transportation' },
    { name: 'Coastal Fishing Supplies', address: 'Marina District', lat: 16.8942, lng: 42.5561, type: 'Fishing', category: 'food-beverage' },

    // Specialty products category
    { name: 'Rose City Perfumes', address: 'Rose Garden Area, Taif', lat: 21.2703, lng: 40.4158, type: 'Perfumes', category: 'health-beauty' },
    { name: 'Islamic Books Store', address: 'Old City, Medina', lat: 24.5197, lng: 39.5642, type: 'Books', category: 'office-school' },
    { name: 'Desert Mining Equipment', address: 'Mining District', lat: 28.3948, lng: 36.5610, type: 'Mining', category: 'machinery' },
    { name: 'Desert Equipment Rental', address: 'Service Road', lat: 26.3210, lng: 43.9700, type: 'Equipment', category: 'machinery' },

    // Military & Security category
    { name: 'Southern Military Supplies', address: 'King Fahd Road, Khamis Mushait', lat: 18.3061, lng: 42.7326, type: 'Military', category: 'security-protection' },

    // General supplies category
    { name: 'Holy City Supplies', address: 'Ajyad Street, Mecca', lat: 21.3891, lng: 39.8579, type: 'Supplies', category: 'home-supplies' }
  ];

  const getBusinessTypeColor = (type) => {
    const colors = {
      'Electronics': 'bg-blue-500',
      'Hardware': 'bg-gray-600',
      'Automotive': 'bg-red-500',
      'Agriculture': 'bg-green-500',
      'Office': 'bg-purple-500',
      'Industrial': 'bg-orange-600',
      'Construction': 'bg-yellow-600',
      'Fashion': 'bg-pink-500',
      'Medical': 'bg-teal-500',
      'Supplies': 'bg-indigo-500',
      'Food': 'bg-orange-500',
      'Services': 'bg-cyan-500',
      'Trading': 'bg-emerald-500',
      'Books': 'bg-amber-600',
      'Technology': 'bg-violet-500',
      'Oil&Gas': 'bg-black',
      'Marine': 'bg-blue-600',
      'Mining': 'bg-stone-600',
      'Tourism': 'bg-rose-500',
      'Textiles': 'bg-fuchsia-500',
      'Equipment': 'bg-slate-600',
      'Military': 'bg-green-800',
      'Logistics': 'bg-blue-700',
      'Port': 'bg-navy-600',
      'Fishing': 'bg-blue-400',
      'Perfumes': 'bg-purple-600',
      'Petrochemical': 'bg-gray-800'
    };
    return colors[type] || 'bg-gray-500';
  };

  // Calculate position percentage based on Saudi Arabia map bounds
  const getMapPosition = (lat, lng) => {
    // Saudi Arabia approximate bounds: lat 16-32, lng 34-55
    const latPercent = ((32 - lat) / (32 - 16)) * 100;
    const lngPercent = ((lng - 34) / (55 - 34)) * 100;
    
    // Ensure positions stay within map bounds
    return {
      top: `${Math.max(2, Math.min(98, latPercent))}%`,
      left: `${Math.max(2, Math.min(98, lngPercent))}%`
    };
  };

  // Filter businesses based on selected category
  const getFilteredBusinesses = () => {
    if (selectedCategory === 'all') {
      return businessLocations;
    }
    return businessLocations.filter(business => business.category === selectedCategory);
  };

  const categories = [
    { id: 'all', name: t('allCategories'), icon: 'ri-apps-2-line', color: 'from-purple-400 to-purple-600' },
    { id: 'agriculture', name: 'Agriculture', icon: 'ri-plant-line', color: 'from-green-400 to-green-600' },
    { id: 'apparel-fashion', name: 'Apparel & Fashion', icon: 'ri-shirt-line', color: 'from-pink-400 to-pink-600' },
    { id: 'automobile', name: 'Automobile', icon: 'ri-car-line', color: 'from-red-400 to-red-600' },
    { id: 'brass-hardware', name: 'Brass Hardware & Components', icon: 'ri-tools-line', color: 'from-yellow-600 to-orange-600' },
    { id: 'business-services', name: 'Business Services', icon: 'ri-briefcase-line', color: 'from-blue-400 to-blue-600' },
    { id: 'chemicals', name: 'Chemicals', icon: 'ri-flask-line', color: 'from-purple-500 to-purple-700' },
    { id: 'computer-hardware-software', name: 'Computer Hardware & Software', icon: 'ri-computer-line', color: 'from-indigo-400 to-indigo-600' },
    { id: 'construction-real-estate', name: 'Construction & Real Estate', icon: 'ri-hammer-line', color: 'from-orange-500 to-red-500' },
    { id: 'consumer-electronics', name: 'Consumer Electronics', icon: 'ri-smartphone-line', color: 'from-blue-400 to-blue-600' },
    { id: 'electronics-electrical', name: 'Electronics & Electrical Supplies', icon: 'ri-flashlight-line', color: 'from-yellow-400 to-yellow-600' },
    { id: 'energy-power', name: 'Energy & Power', icon: 'ri-lightning-line', color: 'from-yellow-500 to-orange-500' },
    { id: 'environment-pollution', name: 'Environment & Pollution', icon: 'ri-leaf-line', color: 'from-green-500 to-green-700' },
    { id: 'food-beverage', name: 'Food & Beverage', icon: 'ri-restaurant-line', color: 'from-orange-400 to-red-500' },
    { id: 'furniture', name: 'Furniture', icon: 'ri-sofa-line', color: 'from-amber-400 to-orange-500' },
    { id: 'gifts-crafts', name: 'Gifts & Crafts', icon: 'ri-gift-line', color: 'from-pink-400 to-rose-500' },
    { id: 'health-beauty', name: 'Health & Beauty', icon: 'ri-scissors-line', color: 'from-fuchsia-400 to-pink-500' },
    { id: 'home-supplies', name: 'Home Supplies', icon: 'ri-home-line', color: 'from-teal-400 to-teal-600' },
    { id: 'home-textiles', name: 'Home Textiles & Furnishings', icon: 'ri-shirt-line', color: 'from-purple-400 to-purple-600' },
    { id: 'hospital-medical', name: 'Hospital & Medical Supplies', icon: 'ri-health-book-line', color: 'from-green-400 to-emerald-500' },
    { id: 'hotel-supplies', name: 'Hotel Supplies & Equipment', icon: 'ri-hotel-line', color: 'from-blue-500 to-blue-700' },
    { id: 'industrial-supplies', name: 'Industrial Supplies', icon: 'ri-settings-line', color: 'from-gray-500 to-gray-700' },
    { id: 'jewelry-gemstones', name: 'Jewelry & Gemstones', icon: 'ri-gem-line', color: 'from-yellow-400 to-yellow-600' },
    { id: 'leather-products', name: 'Leather & Leather Products', icon: 'ri-handbag-line', color: 'from-amber-600 to-amber-800' },
    { id: 'machinery', name: 'Machinery', icon: 'ri-settings-2-line', color: 'from-gray-600 to-gray-800' },
    { id: 'mineral-metals', name: 'Mineral & Metals', icon: 'ri-copper-diamond-line', color: 'from-gray-400 to-gray-600' },
    { id: 'office-school', name: 'Office & School Supplies', icon: 'ri-book-line', color: 'from-blue-400 to-blue-600' },
    { id: 'oil-gas', name: 'Oil and Gas', icon: 'ri-oil-line', color: 'from-black to-gray-800' },
    { id: 'packaging-paper', name: 'Packaging & Paper', icon: 'ri-box-line', color: 'from-brown-400 to-brown-600' },
    { id: 'pharmaceuticals', name: 'Pharmaceuticals', icon: 'ri-capsule-line', color: 'from-red-400 to-red-600' },
    { id: 'pipes-tubes', name: 'Pipes, Tubes & Fittings', icon: 'ri-roadster-line', color: 'from-gray-500 to-gray-700' },
    { id: 'plastics-products', name: 'Plastics & Products', icon: 'ri-recycle-line', color: 'from-green-400 to-green-600' },
    { id: 'printing-publishing', name: 'Printing & Publishing', icon: 'ri-printer-line', color: 'from-gray-400 to-gray-600' },
    { id: 'real-estate', name: 'Real Estate', icon: 'ri-building-line', color: 'from-blue-500 to-blue-700' },
    { id: 'scientific-laboratory', name: 'Scientific & Laboratory Instruments', icon: 'ri-microscope-line', color: 'from-purple-500 to-purple-700' },
    { id: 'security-protection', name: 'Security & Protection', icon: 'ri-shield-line', color: 'from-red-500 to-red-700' },
    { id: 'sports-entertainment', name: 'Sports & Entertainment', icon: 'ri-football-line', color: 'from-green-500 to-green-700' },
    { id: 'telecommunications', name: 'Telecommunications', icon: 'ri-phone-line', color: 'from-blue-500 to-blue-700' },
    { id: 'textiles-fabrics', name: 'Textiles & Fabrics', icon: 'ri-shirt-line', color: 'from-teal-400 to-cyan-500' },
    { id: 'toys', name: 'Toys', icon: 'ri-gamepad-line', color: 'from-pink-400 to-pink-600' },
    { id: 'transportation', name: 'Transportation', icon: 'ri-truck-line', color: 'from-blue-600 to-blue-800' }
  ];

  const handleSearch = () => {
    // Build query parameters for the businesses page
    const params = new URLSearchParams();
    
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }
    
    if (selectedCategory && selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }
    
    if (location.trim()) {
      params.set('location', location.trim());
    }
    
    // Navigate to businesses page with search parameters
    const queryString = params.toString();
    const url = queryString ? `/businesses?${queryString}` : '/businesses';
    
    router.push(url);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setDescription(value);
      
      // Count sentences
      const sentences = value.trim().split(/[.!?]+/).filter(s => s.trim().length > 0);
      const count = Math.min(sentences.length, 2);
      setSentenceCount(count);
      
      // Prevent more than 2 sentences
      if (sentences.length > 2) {
        const limitedText = sentences.slice(0, 2).join('. ') + (value.trim().endsWith('.') ? '' : '.');
        setDescription(limitedText);
        setSentenceCount(2);
      }
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    const nameType = document.querySelector('select[name="nameType"]')?.value;
    const category = document.querySelector('select[name="category"]')?.value;
    const distance = document.querySelector('select[name="distance"]')?.value;
    
    return nameType && category && distance && description.trim().length >= 10 && sentenceCount <= 2;
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      setSubmitStatus('Please fill all required fields');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const formData = new URLSearchParams();
      const nameType = document.querySelector('select[name="nameType"]').value;
      const category = document.querySelector('select[name="category"]').value;
      const distance = document.querySelector('select[name="distance"]').value;
      
      formData.append('nameType', nameType);
      formData.append('category', category);
      formData.append('distance', distance);
      formData.append('description', description);

      const response = await fetch('https://readdy.ai/api/form/d2rfvq7frndo9ftj12l0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
      });

      if (response.ok) {
        setSubmitStatus('Request submitted successfully!');
        setDescription('');
        setSentenceCount(0);
        // Reset form
        document.querySelector('select[name="nameType"]').value = 'profile';
        document.querySelector('select[name="category"]').value = '';
        document.querySelector('select[name="distance"]').value = '';
        setTimeout(() => setSubmitStatus(''), 3000);
      } else {
        setSubmitStatus('Failed to submit request. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="py-4 bg-gradient-to-b from-yellow-50 to-white">
        <div className="w-full px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
              {/* Categories Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-800">{t('allCategories')}</h3>
                  <div className="space-y-2 max-h-[400px] md:max-h-[600px] overflow-y-auto">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center space-x-2 md:space-x-3 p-2 md:p-3 rounded-xl transition-all cursor-pointer ${
                          selectedCategory === category.id 
                            ? 'bg-yellow-400 text-white shadow-md' 
                            : 'hover:bg-gray-50 text-gray-700'
                        } ${isRTL ? 'space-x-reverse text-right' : 'text-left'}`}
                      >
                        <div className={`w-6 h-6 md:w-8 md:h-8 rounded-lg flex items-center justify-center ${
                          selectedCategory === category.id 
                            ? 'bg-white/20' 
                            : `bg-gradient-to-r ${category.color}`
                        }`}>
                          <i className={`${category.icon} text-sm md:text-base ${
                            selectedCategory === category.id ? 'text-white' : 'text-white'
                          }`}></i>
                        </div>
                        <span className="font-medium text-xs md:text-sm">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Search and Map Section */}
              <div className="lg:col-span-3">
                {/* Search Form */}
                <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-4 md:mb-6">
                  {/* Search Guidelines */}
                  <div className="mb-4 text-left">
                    <p className="text-sm md:text-base font-bold text-gray-700">
                      <i className="ri-lightbulb-line text-yellow-500 mr-2"></i>
                      Search for products and services
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 md:mb-6">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={t('searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full py-3 md:py-4 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none text-sm ${
                          isRTL ? 'pr-10 md:pr-12 pl-4 text-right' : 'pl-10 md:pl-12 pr-4'
                        }`}
                      />
                      <i className={`ri-search-line absolute top-1/2 transform -translate-y-1/2 text-gray-400 text-sm ${
                        isRTL ? 'right-4' : 'left-4'
                      }`}></i>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        placeholder={t('locationPlaceholder')}
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className={`w-full py-3 md:py-4 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none text-sm ${
                          isRTL ? 'pr-10 md:pr-12 pl-4 text-right' : 'pl-10 md:pl-12 pr-4'
                        }`}
                      />
                      <i className={`ri-map-pin-line absolute top-1/2 transform -translate-y-1/2 text-gray-400 text-sm ${
                        isRTL ? 'right-4' : 'left-4'
                      }`}></i>
                    </div>
                  </div>

                  <Link
                    href="/businesses"
                    onClick={handleSearch}
                    className="w-full bg-yellow-400 text-white py-3 md:py-4 rounded-xl hover:bg-yellow-500 font-semibold text-base md:text-lg whitespace-nowrap cursor-pointer flex items-center justify-center"
                  >
                    <i className="ri-search-line mr-2"></i>
                    {t('searchBusinesses')}
                  </Link>
                </div>

                {/* Enhanced Map Section with Filtered Business Locations */}
                <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-xl relative h-64 md:h-96 mb-4 md:mb-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7476794.374816895!2d39.857910156249994!3d23.885837699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15e7b33fe7952a41%3A0x5960504bc21ab69b!2sSaudi%20Arabia!5e0!3m2!1sen!2sus!4v1647890123456!5m2!1sen!2sus&disableDefaultUI=true&gestureHandling=none&scrollwheel=false&disableDoubleClickZoom=true&clickableIcons=false"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  ></iframe>
                  
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Filtered Business Location Dots */}
                    {getFilteredBusinesses().map((business, index) => {
                      const position = getMapPosition(business.lat, business.lng);
                      const colorClass = getBusinessTypeColor(business.type);
                      
                      return (
                        <div
                          key={index}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                          style={position}
                          title={`${business.name} - ${business.address}`}
                        >
                          {/* Main Business Dot */}
                          <div className={`relative w-2 h-2 md:w-3 md:h-3 ${colorClass} rounded-full border-2 border-white shadow-lg`}>
                          </div>
                          
                          {/* Business Info Tooltip */}
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 min-w-40 md:min-w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto z-10">
                            <div className="text-xs">
                              <h4 className="font-semibold text-gray-800 mb-1">{business.name}</h4>
                              <p className="text-gray-600 mb-1">{business.address}</p>
                              <span className={`inline-block px-2 py-1 rounded-full text-white text-xs ${colorClass}`}>
                                {business.type}
                              </span>
                            </div>
                            {/* Tooltip Arrow */}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Category Filter Info */}
                  {selectedCategory !== 'all' && (
                    <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-2 md:p-3 z-10">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 md:w-3 md:h-3 ${categories.find(cat => cat.id === selectedCategory)?.color.includes('yellow') ? 'bg-yellow-500' : 'bg-blue-500'} rounded-full`}></div>
                        <span className="text-xs md:text-sm font-medium text-gray-700">
                          Showing: {categories.find(cat => cat.id === selectedCategory)?.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({getFilteredBusinesses().length} locations)
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Businesses Section */}
      <FeaturedBusinesses />

      {/* Request Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 md:mb-12">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                <i className="ri-search-2-line text-2xl md:text-3xl text-white"></i>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Can't Find What You're Looking For?</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Submit a request and let verified Saudi suppliers come to you with competitive offers
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Form Section */}
              <div className="p-6 md:p-8 lg:p-12">
                <form 
                  id="supplier-request-form"
                  data-readdy-form 
                  onSubmit={handleRequestSubmit}
                  className="space-y-6 md:space-y-8"
                >
                  {/* Form Fields Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-800 mb-3">Display Name</label>
                      <select 
                        name="nameType" 
                        className="w-full py-3 md:py-4 px-4 md:px-5 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors pr-8 md:pr-12 bg-gray-50 hover:bg-white"
                      >
                        <option value="profile">Use Profile Name</option>
                        <option value="anonymous">Anonymous Request</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-800 mb-3">Industry Category</label>
                      <select 
                        name="category" 
                        className="w-full py-3 md:py-4 px-4 md:px-5 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors pr-8 md:pr-12 bg-gray-50 hover:bg-white" 
                        required
                      >
                        <option value="">Select your industry</option>
                        <option value="agriculture">Agriculture & Farming</option>
                        <option value="apparel-fashion">Apparel & Fashion</option>
                        <option value="automobile">Automobile & Parts</option>
                        <option value="brass-hardware">Brass Hardware & Components</option>
                        <option value="business-services">Business Services</option>
                        <option value="chemicals">Chemicals & Materials</option>
                        <option value="computer-hardware-software">Computer Hardware & Software</option>
                        <option value="construction-real-estate">Construction & Real Estate</option>
                        <option value="consumer-electronics">Consumer Electronics</option>
                        <option value="electronics-electrical">Electronics & Electrical</option>
                        <option value="energy-power">Energy & Power</option>
                        <option value="environment-pollution">Environment & Sustainability</option>
                        <option value="food-beverage">Food & Beverage</option>
                        <option value="furniture">Furniture & Decor</option>
                        <option value="gifts-crafts">Gifts & Crafts</option>
                        <option value="health-beauty">Health & Beauty</option>
                        <option value="home-supplies">Home Supplies</option>
                        <option value="home-textiles">Home Textiles & Furnishings</option>
                        <option value="hospital-medical">Hospital & Medical</option>
                        <option value="hotel-supplies">Hotel & Hospitality</option>
                        <option value="industrial-supplies">Industrial Supplies</option>
                        <option value="jewelry-gemstones">Jewelry & Gemstones</option>
                        <option value="leather-products">Leather Products</option>
                        <option value="machinery">Machinery & Equipment</option>
                        <option value="mineral-metals">Minerals & Metals</option>
                        <option value="office-school">Office & School Supplies</option>
                        <option value="oil-gas">Oil & Gas</option>
                        <option value="packaging-paper">Packaging & Paper</option>
                        <option value="pharmaceuticals">Pharmaceuticals</option>
                        <option value="pipes-tubes">Pipes & Tubes</option>
                        <option value="plastics-products">Plastics & Products</option>
                        <option value="printing-publishing">Printing & Publishing</option>
                        <option value="real-estate">Real Estate</option>
                        <option value="scientific-laboratory">Scientific & Laboratory</option>
                        <option value="security-protection">Security & Protection</option>
                        <option value="sports-entertainment">Sports & Entertainment</option>
                        <option value="telecommunications">Telecommunications</option>
                        <option value="textiles-fabrics">Textiles & Fabrics</option>
                        <option value="toys">Toys & Games</option>
                        <option value="transportation">Transportation & Logistics</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-800 mb-3">Preferred Distance</label>
                      <select 
                        name="distance" 
                        className="w-full py-3 md:py-4 px-4 md:px-5 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors pr-8 md:pr-12 bg-gray-50 hover:bg-white" 
                        required
                      >
                        <option value="">Choose distance range</option>
                        <option value="5km">Within 5 km (Local)</option>
                        <option value="10km">Within 10 km (Nearby)</option>
                        <option value="25km">Within 25 km (City)</option>
                        <option value="50km">Within 50 km (Regional)</option>
                        <option value="100km">Within 100 km (Extended)</option>
                        <option value="anywhere">Anywhere in Saudi Arabia</option>
                      </select>
                    </div>
                  </div>

                  {/* Description Section */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-800">
                      Describe Your Requirements
                      <span className="text-yellow-600 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        name="description"
                        placeholder="Tell suppliers exactly what you need. Be specific about quantities, specifications, quality requirements, and any special conditions. Maximum 2 sentences, 200 characters."
                        rows={4}
                        maxLength={200}
                        value={description}
                        onChange={handleDescriptionChange}
                        className="w-full py-3 md:py-4 px-4 md:px-5 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none resize-none transition-colors bg-gray-50 hover:bg-white text-gray-800 placeholder:text-gray-500"
                        required
                      />
                      <div className="absolute bottom-3 right-4 flex items-center space-x-4 text-xs">
                        <span className={`${sentenceCount > 2 ? 'text-red-500' : 'text-gray-500'}`}>
                          {sentenceCount}/2 sentences
                        </span>
                        <span className={`${description.length > 180 ? 'text-orange-500' : 'text-gray-500'}`}>
                          {description.length}/200 chars
                        </span>
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <div className="flex justify-start pt-2">
                      <button
                        type="submit"
                        disabled={!isFormValid() || isSubmitting}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-3 px-6 md:px-8 rounded-xl hover:from-yellow-500 hover:to-yellow-600 font-semibold text-sm md:text-base whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        {isSubmitting ? (
                          <>
                            <i className="ri-loader-4-line animate-spin mr-2"></i>
                            <span className="hidden sm:inline">Submitting Request...</span>
                            <span className="sm:hidden">Submitting...</span>
                          </>
                        ) : (
                          <>
                            <i className="ri-send-plane-line mr-2"></i>
                            <span className="hidden sm:inline">Submit Supplier Request</span>
                            <span className="sm:hidden">Submit Request</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {submitStatus && (
                    <div className={`p-4 rounded-xl text-sm font-medium ${
                      submitStatus.includes('success') 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      <div className="flex items-center">
                        <i className={`${submitStatus.includes('success') ? 'ri-check-line' : 'ri-error-warning-line'} mr-2`}></i>
                        {submitStatus}
                      </div>
                    </div>
                  )}
                </form>
              </div>

              {/* How It Works Section */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 md:p-8 lg:p-12 border-t border-gray-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
                  <div>
                    <div className="flex items-center mb-4 md:mb-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3 md:mr-4">
                        <i className="ri-lightbulb-line text-blue-600 text-lg md:text-xl"></i>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-blue-900">How Our Request System Works</h3>
                    </div>
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold mt-0.5">1</div>
                        <p className="text-blue-800 font-medium text-sm md:text-base">Your request is instantly sent to relevant suppliers in your selected area</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold mt-0.5">2</div>
                        <p className="text-blue-800 font-medium text-sm md:text-base">Verified suppliers review your requirements and respond with detailed offers</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold mt-0.5">3</div>
                        <p className="text-blue-800 font-medium text-sm md:text-base">You receive direct contact details and competitive proposals from multiple suppliers</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold mt-0.5">4</div>
                        <p className="text-blue-800 font-medium text-sm md:text-base">Compare offers, negotiate terms, and choose the best supplier for your business needs</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-blue-100">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="ri-check-double-line text-xl md:text-2xl text-white"></i>
                      </div>
                      <h4 className="text-base md:text-lg font-bold text-gray-900 mb-2">Why Use Our Platform?</h4>
                    </div>
                    <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-700">
                      <li className="flex items-center space-x-2 md:space-x-3">
                        <i className="ri-shield-check-line text-green-500 text-base md:text-lg"></i>
                        <span><strong>Verified Suppliers:</strong> All suppliers are verified Saudi businesses</span>
                      </li>
                      <li className="flex items-center space-x-2 md:space-x-3">
                        <i className="ri-time-line text-green-500 text-base md:text-lg"></i>
                        <span><strong>Quick Response:</strong> Get quotes within 24-48 hours</span>
                      </li>
                      <li className="flex items-center space-x-2 md:space-x-3">
                        <i className="ri-price-tag-3-line text-green-500 text-base md:text-lg"></i>
                        <span><strong>Competitive Pricing:</strong> Multiple offers for best deals</span>
                      </li>
                      <li className="flex items-center space-x-2 md:space-x-3">
                        <i className="ri-map-pin-line text-green-500 text-base md:text-lg"></i>
                        <span><strong>Local Focus:</strong> Find suppliers in your preferred location</span>
                      </li>
                      <li className="flex items-center space-x-2 md:space-x-3">
                        <i className="ri-customer-service-2-line text-green-500 text-base md:text-lg"></i>
                        <span><strong>Free Service:</strong> No charges for submitting requests</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}