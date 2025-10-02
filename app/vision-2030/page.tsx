'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchSection from '../../components/SearchSection';
import FeaturedBusinesses from '../../components/FeaturedBusinesses';
import TopSuppliers from '../../components/TopSuppliers';
import TrustedPartners from '../../components/TrustedPartners';
import HowItWorks from '../../components/HowItWorks';
import AIChatWidget from '../../components/AIChatWidget';
import AIFilterBar from '../../components/AIFilterBar';
import EnhancedSearch from '../../components/EnhancedSearch';
import { useLanguage } from '../../lib/LanguageContext';

export default function Vision2030Page() {
  const { t } = useLanguage();
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = (searchTerm) => {
    // Navigate to businesses page with search term
    const params = new URLSearchParams();
    params.set('search', searchTerm);
    window.location.href = `/businesses?${params.toString()}`;
  };

  const handleAIFilter = (filterData) => {
    // Navigate to businesses page with AI-generated filters
    const params = new URLSearchParams();
    
    if (filterData.query) {
      params.set('search', filterData.query);
    }
    
    if (filterData.filters.categories.length > 0) {
      params.set('category', filterData.filters.categories[0]);
    }
    
    if (filterData.filters.locations.length > 0) {
      params.set('location', filterData.filters.locations.join(','));
    }
    
    if (filterData.filters.businessTypes.length > 0) {
      params.set('type', filterData.filters.businessTypes[0]);
    }
    
    if (filterData.filters.rating) {
      params.set('rating', filterData.filters.rating.toString());
    }
    
    if (filterData.filters.features.length > 0) {
      params.set('features', filterData.filters.features.join(','));
    }
    
    window.location.href = `/businesses?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section with Enhanced Search */}
      <section className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20Saudi%20Arabian%20business%20district%20with%20traditional%20and%20contemporary%20architecture%20blending%20together%2C%20showing%20skyscrapers%20and%20traditional%20buildings%2C%20bright%20daylight%20with%20clean%20professional%20atmosphere%20representing%20economic%20growth%20and%20Vision%202030%2C%20people%20in%20business%20attire%20walking%2C%20green%20and%20golden%20color%20tones&width=1920&height=1080&seq=hero-bg-saudi&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Hero Content */}
          <div className="mb-12">
            {/* Saudi Pride Badge */}
            <div className="flex justify-center items-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-3">
                <div className="w-8 h-6 bg-green-600 flex items-center justify-center relative overflow-hidden rounded">
                  <div className="w-full h-full bg-green-600 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>
                  </div>
                </div>
                <span className="text-white font-bold">{t('hero.proudSaudi')}</span>
                <div className="w-8 h-6 bg-green-600 flex items-center justify-center relative overflow-hidden rounded">
                  <div className="w-full h-full bg-green-600 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {t('hero.title')}
              <br />
              <span className="text-yellow-400">{t('hero.subtitle')}</span>
            </h1>
            
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
              {t('hero.description')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">5000+</div>
                <div className="text-white text-sm">{t('hero.stats.suppliers')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">20+</div>
                <div className="text-white text-sm">{t('hero.stats.categories')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">13</div>
                <div className="text-white text-sm">{t('hero.stats.regions')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">24/7</div>
                <div className="text-white text-sm">{t('hero.stats.support')}</div>
              </div>
            </div>
          </div>

          {/* Enhanced Search Component */}
          <EnhancedSearch onSearch={handleSearch} />
        </div>
      </section>

      {/* AI Filter Bar */}
      <AIFilterBar onFilterChange={handleAIFilter} />

      {/* Vision 2030 Support Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-8">
            <img 
              src="https://readdy.ai/api/search-image?query=Saudi%20Arabia%20Vision%202030%20logo%20design%20with%20modern%20geometric%20patterns%20in%20green%20and%20gold%20colors%2C%20clean%20white%20background%2C%20professional%20corporate%20branding%20style%20representing%20economic%20transformation%20and%20business%20growth&width=120&height=80&seq=vision-2030-logo-2&orientation=landscape"
              alt="Vision 2030"
              className="h-16 object-contain mr-6"
            />
            <div className="text-left">
              <h2 className="text-3xl font-bold text-white">{t('vision.title')}</h2>
              <p className="text-green-100">{t('vision.subtitle')}</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-building-2-line text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{t('vision.diversification.title')}</h3>
              <p className="text-green-100">{t('vision.diversification.description')}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-smartphone-line text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{t('vision.digital.title')}</h3>
              <p className="text-green-100">{t('vision.digital.description')}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-team-line text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{t('vision.empowerment.title')}</h3>
              <p className="text-green-100">{t('vision.empowerment.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* RFQ Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
              <i className="ri-file-text-line text-3xl text-white"></i>
            </div>
            <h2 className="text-4xl font-bold text-white">Request for Quote (RFQ) System</h2>
          </div>
          
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
            Get competitive quotes from verified Saudi suppliers. Post your requirements and receive proposals from qualified businesses within 24-48 hours.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-edit-2-line text-xl text-white"></i>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Post Requirements</h3>
              <p className="text-blue-100 text-sm">Specify your exact needs, quantities, and requirements</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-price-tag-3-line text-xl text-white"></i>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Receive Quotes</h3>
              <p className="text-blue-100 text-sm">Get competitive quotes from multiple verified suppliers</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-handshake-line text-xl text-white"></i>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Choose Best Deal</h3>
              <p className="text-blue-100 text-sm">Compare and select the best supplier for your needs</p>
            </div>
          </div>

          <a href="/create-rfq" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer inline-flex items-center">
            <i className="ri-file-add-line mr-2"></i>
            Post Your RFQ Now
          </a>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Featured Businesses */}
      <FeaturedBusinesses />

      {/* Top Suppliers */}
      <TopSuppliers />

      {/* Trusted Partners */}
      <TrustedPartners />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-8 bg-white rounded flex items-center justify-center mr-4">
              <div className="w-8 h-6 bg-green-600 flex items-center justify-center relative overflow-hidden rounded">
                <div className="w-full h-full bg-green-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>
                </div>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white">
              {t('cta.title')}
            </h2>
            <div className="w-12 h-8 bg-white rounded flex items-center justify-center ml-4">
              <div className="w-8 h-6 bg-green-600 flex items-center justify-center relative overflow-hidden rounded">
                <div className="w-full h-full bg-green-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xl text-yellow-100 mb-8 max-w-4xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="bg-white text-yellow-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer">
              {t('cta.registerBusiness')}
            </a>
            <a href="/businesses" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-yellow-600 transition-colors whitespace-nowrap cursor-pointer">
              {t('cta.browseSuppliers')}
            </a>
          </div>
          
          <div className="mt-8 flex items-center justify-center text-yellow-100">
            <i className="ri-heart-fill text-red-400 mr-2"></i>
            <span className="text-lg">{t('cta.support')}</span>
            <i className="ri-heart-fill text-red-400 ml-2"></i>
          </div>
        </div>
      </section>

      <Footer />
      <AIChatWidget />
    </div>
  );
}