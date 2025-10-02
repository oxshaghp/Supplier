
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TopSuppliers() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const topSuppliers = [
    {
      id: 101,
      name: 'Saudi Steel Manufacturing Co.',
      category: 'Steel & Metal',
      businessType: 'Supplier',
      rating: 4.9,
      reviews: 428,
      yearsInBusiness: 15,
      clientsServed: '500+',
      specialization: 'Industrial Steel Solutions',
      image: 'https://readdy.ai/api/search-image?query=Modern%20steel%20manufacturing%20facility%20with%20organized%20metal%20sheets%20and%20beams%2C%20industrial%20workspace%20with%20bright%20lighting%2C%20professional%20steel%20production%20environment%2C%20clean%20factory%20floor%20with%20yellow%20safety%20elements&width=400&height=280&seq=steel-supplier&orientation=landscape',
      badge: 'Premium Supplier',
      features: ['ISO Certified', '24/7 Support', 'Custom Solutions']
    },
    {
      id: 102,
      name: 'Al-Rajhi Electronics Wholesale',
      category: 'Electronics',
      businessType: 'Supplier',
      rating: 4.8,
      reviews: 356,
      yearsInBusiness: 12,
      clientsServed: '300+',
      specialization: 'Consumer Electronics Distribution',
      image: 'https://readdy.ai/api/search-image?query=Large%20electronics%20wholesale%20warehouse%20with%20organized%20shelves%20of%20electronic%20devices%2C%20modern%20distribution%20center%2C%20professional%20lighting%2C%20clean%20industrial%20space%20with%20electronic%20components%20neatly%20arranged&width=400&height=280&seq=electronics-wholesale&orientation=landscape',
      badge: 'Top Rated',
      features: ['Bulk Discounts', 'Fast Delivery', 'Warranty Support']
    },
    {
      id: 103,
      name: 'Kingdom Construction Materials',
      category: 'Construction',
      businessType: 'Supplier',
      rating: 4.9,
      reviews: 521,
      yearsInBusiness: 20,
      clientsServed: '800+',
      specialization: 'Premium Building Materials',
      image: 'https://readdy.ai/api/search-image?query=Professional%20construction%20materials%20warehouse%20with%20organized%20cement%20bags%2C%20steel%20rods%2C%20building%20supplies%2C%20clean%20industrial%20environment%20with%20yellow%20safety%20markings%2C%20modern%20storage%20facility&width=400&height=280&seq=construction-materials&orientation=landscape',
      badge: 'Gold Partner',
      features: ['Project Consulting', 'Bulk Orders', 'Quality Guarantee']
    },
    {
      id: 104,
      name: 'Fresh Valley Food Distributors',
      category: 'Food & Beverage',
      businessType: 'Supplier',
      rating: 4.7,
      reviews: 289,
      yearsInBusiness: 8,
      clientsServed: '200+',
      specialization: 'Fresh Produce & Packaged Foods',
      image: 'https://readdy.ai/api/search-image?query=Modern%20food%20distribution%20warehouse%20with%20organized%20fresh%20produce%2C%20refrigerated%20storage%20areas%2C%20clean%20food%20handling%20environment%2C%20professional%20packaging%20area%20with%20bright%20white%20interior&width=400&height=280&seq=food-distributor&orientation=landscape',
      badge: 'Certified Organic',
      features: ['Cold Chain', 'Daily Fresh', 'Organic Options']
    },
    {
      id: 105,
      name: 'Arabian Textile Industries',
      category: 'Textile',
      businessType: 'Supplier',
      rating: 4.8,
      reviews: 445,
      yearsInBusiness: 18,
      clientsServed: '600+',
      specialization: 'Premium Fabrics & Textiles',
      image: 'https://readdy.ai/api/search-image?query=Large%20textile%20manufacturing%20facility%20with%20colorful%20fabric%20rolls%20organized%20on%20shelves%2C%20modern%20textile%20production%20equipment%2C%20bright%20industrial%20space%20with%20various%20textile%20materials%20displayed%20professionally&width=400&height=280&seq=textile-industry&orientation=landscape',
      badge: 'Heritage Brand',
      features: ['Custom Designs', 'Premium Quality', 'Global Export']
    },
    {
      id: 106,
      name: 'Tech Solutions Arabia',
      category: 'Technology',
      businessType: 'Supplier',
      rating: 4.9,
      reviews: 312,
      yearsInBusiness: 10,
      clientsServed: '400+',
      specialization: 'Enterprise IT Solutions',
      image: 'https://readdy.ai/api/search-image?query=Modern%20technology%20office%20with%20server%20racks%2C%20computer%20equipment%2C%20professional%20IT%20workspace%2C%20clean%20tech%20environment%20with%20organized%20cables%20and%20networking%20equipment%2C%20contemporary%20design%20with%20yellow%20accents&width=400&height=280&seq=tech-solutions&orientation=landscape',
      badge: 'Innovation Leader',
      features: ['Cloud Services', 'AI Solutions', '24/7 Support']
    }
  ];

  // Mobile and tablet responsive items to show
  const getItemsToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1; // Mobile
      if (window.innerWidth < 1024) return 2; // Tablet
      return 3; // Desktop - reduced from 4 to 3 for better mobile experience
    }
    return 3;
  };

  const [itemsToShow, setItemsToShow] = useState(getItemsToShow());
  const maxIndex = Math.max(0, topSuppliers.length - itemsToShow);

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(getItemsToShow());
    };

    window.addEventListener('resize', handleResize);
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [maxIndex]);

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Premium Supplier': return 'bg-gradient-to-r from-purple-500 to-purple-700';
      case 'Top Rated': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'Gold Partner': return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 'Certified Organic': return 'bg-gradient-to-r from-green-500 to-emerald-600';
      case 'Heritage Brand': return 'bg-gradient-to-r from-blue-500 to-indigo-600';
      case 'Innovation Leader': return 'bg-gradient-to-r from-pink-500 to-red-500';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-700';
    }
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">Our Top Suppliers</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Premium suppliers with exceptional ratings and proven track records
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
          >
            {topSuppliers.map(supplier => (
              <div 
                key={supplier.id} 
                className="flex-shrink-0 px-2 md:px-3"
                style={{ width: `${100 / itemsToShow}%` }}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer h-full">
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img
                      src={supplier.image}
                      alt={supplier.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-3 md:top-4 left-3 md:left-4">
                      <div className={`${getBadgeColor(supplier.badge)} text-white px-2 md:px-3 py-1 rounded-full shadow-lg`}>
                        <span className="text-xs font-bold">{supplier.badge}</span>
                      </div>
                    </div>
                    <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-white rounded-full px-2 md:px-3 py-1 shadow-md">
                      <div className="flex items-center space-x-1">
                        <i className="ri-star-fill text-yellow-400 text-sm"></i>
                        <span className="text-sm font-bold text-gray-800">{supplier.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 md:p-6">
                    <div className="mb-3 md:mb-4">
                      <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1">{supplier.name}</h3>
                      <p className="text-yellow-600 font-medium text-sm">{supplier.category}</p>
                      <p className="text-gray-500 text-xs mt-1">{supplier.specialization}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4 text-xs">
                      <div className="text-center bg-gray-50 rounded-lg p-2">
                        <div className="font-bold text-gray-800">{supplier.yearsInBusiness}+</div>
                        <div className="text-gray-600">Years</div>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg p-2">
                        <div className="font-bold text-gray-800">{supplier.clientsServed}</div>
                        <div className="text-gray-600">Clients</div>
                      </div>
                    </div>

                    <div className="flex items-center mb-3 md:mb-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`text-sm ${i < Math.floor(supplier.rating) ? 'ri-star-fill text-yellow-400' : 'ri-star-line text-gray-300'}`}></i>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">({supplier.reviews} reviews)</span>
                    </div>

                    <div className="mb-3 md:mb-4">
                      <div className="flex flex-wrap gap-1">
                        {supplier.features.map((feature, index) => (
                          <span key={index} className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <button className="flex-1 bg-yellow-400 text-white py-2 px-3 md:px-4 rounded-lg hover:bg-yellow-500 font-medium text-sm whitespace-nowrap cursor-pointer">
                        <i className="ri-message-line mr-1 md:mr-2"></i>
                        Message
                      </button>
                      <Link href={`/business/${supplier.id}`} className="flex-1 border border-yellow-400 text-yellow-600 py-2 px-3 md:px-4 rounded-lg hover:bg-yellow-50 font-medium text-sm whitespace-nowrap cursor-pointer text-center">
                        View Details
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all cursor-pointer ${
                  currentIndex === index ? 'bg-yellow-400' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows - Hidden on mobile */}
          {maxIndex > 0 && (
            <>
              <button
                onClick={() => setCurrentIndex(prev => prev === 0 ? maxIndex : prev - 1)}
                className="hidden md:block absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <i className="ri-arrow-left-line text-gray-600 text-lg md:text-xl"></i>
              </button>
              <button
                onClick={() => setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1)}
                className="hidden md:block absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <i className="ri-arrow-right-line text-gray-600 text-lg md:text-xl"></i>
              </button>
            </>
          )}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:from-yellow-500 hover:to-orange-600 font-semibold text-base md:text-lg whitespace-nowrap cursor-pointer shadow-lg">
            View All Top Suppliers
          </button>
        </div>
      </div>
    </section>
  );
}
