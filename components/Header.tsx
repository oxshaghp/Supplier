
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../lib/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import ContactModal from './ContactModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const { t, isRTL } = useLanguage();
  const router = useRouter();

  const isLoggedIn = true;
  const unreadCount = 3;
  const userName = "Ahmed Al-Rashid";
  const userInitials = "AR";

  // Sample messages for quick preview
  const recentMessages = [
    {
      id: 1,
      from: 'Sarah Johnson',
      company: 'Tech Solutions Co.',
      subject: 'Bulk order inquiry for LED TVs',
      preview: 'Hi, I am interested in placing a bulk order for LED TVs. We need approximately 50 units...',
      time: '2h ago',
      unread: true,
      avatar: 'SJ'
    },
    {
      id: 2,
      from: 'Ahmed Al-Mansouri',
      company: 'Emirates Mall',
      subject: 'Partnership opportunity',
      preview: 'We are expanding our electronics section and would like to discuss a potential partnership...',
      time: '5h ago',
      unread: true,
      avatar: 'AM'
    },
    {
      id: 3,
      from: 'Michael Chen',
      company: 'Digital Innovations',
      subject: 'Request for quotation',
      preview: 'We need a quote for gaming computers and accessories. Our requirements include 20 high-end...',
      time: '1d ago',
      unread: true,
      avatar: 'MC'
    }
  ];

  const handleSignOut = () => {
    setIsUserMenuOpen(false);
    router.push('/');
  };

  const handleMessageClick = (messageId) => {
    setIsMessagesOpen(false);
    router.push(`/dashboard?tab=messages&messageId=${messageId}`);
  };

  const handleViewAllMessages = () => {
    setIsMessagesOpen(false);
    router.push('/dashboard?tab=messages');
  };

  return (
    <>
      {/* Advertising Banner */}
      <div className="bg-gradient-to-r from-yellow-400 to-green-400 text-white py-2 overflow-hidden">
        <div className="animate-scroll whitespace-nowrap">
          <div className="inline-flex items-center space-x-4 md:space-x-8 text-xs md:text-sm font-medium">
            <span className="flex items-center">
              <i className="ri-trophy-fill mr-1 md:mr-2"></i>
              <span className="hidden sm:inline">#1 Website Where All Businesses Meet</span>
              <span className="sm:hidden">#1 Business Network</span>
            </span>
            <span className="text-yellow-100">•</span>
            <span className="flex items-center">
              <i className="ri-global-line mr-1 md:mr-2"></i>
              <span className="hidden sm:inline">We Make The Far Closer</span>
              <span className="sm:hidden">Global Reach</span>
            </span>
            <span className="text-yellow-100">•</span>
            <span className="flex items-center">
              <i className="ri-truck-line mr-1 md:mr-2"></i>
              <span className="hidden sm:inline">We Supply, You Succeed</span>
              <span className="sm:hidden">Supply Solutions</span>
            </span>
            <span className="text-yellow-100">•</span>
            <span className="flex items-center">
              <i className="ri-handshake-line mr-1 md:mr-2"></i>
              <span className="hidden sm:inline">Connecting Saudi Businesses Since Day One</span>
              <span className="sm:hidden">Saudi Network</span>
            </span>
          </div>
        </div>
      </div>

      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="w-full px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" fill="currentColor">
                  <circle cx="7" cy="7" r="3" />
                  <circle cx="17" cy="17" r="3" />
                  <circle cx="17" cy="7" r="3" />
                  <path d="M10 7h4M10 10l7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              </div>
              <div className="text-xl md:text-3xl font-bold">
                <span className="text-gray-800">Supplier</span>
                <span className="text-green-400">.sa</span>
              </div>
            </Link>

            {/* Navigation - Desktop Only */}
            <nav className="hidden lg:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">
                Home
              </Link>
              <Link href="/businesses" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">
                All Suppliers
              </Link>
              <Link href="/subscription" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">
                Subscription
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">
                About Us
              </Link>
              <button 
                onClick={() => setShowContactModal(true)}
                className="text-gray-700 hover:text-yellow-600 font-medium transition-colors cursor-pointer"
              >
                Contact
              </button>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Language Switcher - Hidden on small screens */}
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>
              
              {/* Logged In User Menu */}
              {isLoggedIn ? (
                <>
                  {/* Messages */}
                  <div className="relative">
                    <button 
                      onClick={() => setIsMessagesOpen(!isMessagesOpen)}
                      className="relative text-gray-700 hover:text-yellow-600 transition-colors cursor-pointer"
                    >
                      <i className="ri-message-2-line text-lg md:text-xl"></i>
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </button>

                    {/* Messages Dropdown */}
                    {isMessagesOpen && (
                      <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 py-3 z-50 max-h-80 md:max-h-96 overflow-hidden">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-800 text-sm md:text-base">Recent Messages</h3>
                            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                              {unreadCount} new
                            </span>
                          </div>
                        </div>
                        
                        <div className="max-h-60 md:max-h-80 overflow-y-auto">
                          {recentMessages.map((message) => (
                            <div
                              key={message.id}
                              onClick={() => handleMessageClick(message.id)}
                              className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                            >
                              <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-400 text-white rounded-full flex items-center justify-center font-medium text-xs md:text-sm flex-shrink-0">
                                  {message.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-medium text-gray-800 text-sm truncate">
                                      {message.from}
                                    </h4>
                                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                                      {message.time}
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-600 mb-1">{message.company}</p>
                                  <p className="text-sm font-medium text-gray-800 mb-1 truncate">
                                    {message.subject}
                                  </p>
                                  <p className="text-xs text-gray-500 line-clamp-2">
                                    {message.preview}
                                  </p>
                                </div>
                                {message.unread && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="px-4 py-3 border-t border-gray-100">
                          <button
                            onClick={handleViewAllMessages}
                            className="w-full bg-yellow-400 text-white py-2 px-4 rounded-lg hover:bg-yellow-500 font-medium text-sm whitespace-nowrap cursor-pointer transition-colors"
                          >
                            View All Messages
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-1 md:space-x-2 text-gray-700 hover:text-yellow-600 transition-colors cursor-pointer"
                    >
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center font-medium text-xs md:text-sm">
                        {userInitials}
                      </div>
                      <span className="hidden sm:block font-medium text-sm md:text-base">{userName}</span>
                      <i className="ri-arrow-down-s-line text-sm md:text-base"></i>
                    </button>

                    {/* User Dropdown */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-44 md:w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <Link 
                          href="/dashboard" 
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <i className="ri-dashboard-line"></i>
                          <span>Dashboard</span>
                        </Link>
                        <Link 
                          href="/add-business" 
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <i className="ri-add-circle-line"></i>
                          <span>Add Business</span>
                        </Link>
                        <Link 
                          href="/manage-businesses" 
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <i className="ri-building-2-line"></i>
                          <span>My Businesses</span>
                        </Link>
                        <div className="border-t border-gray-200 my-2"></div>
                        <button 
                          onClick={handleSignOut}
                          className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left cursor-pointer text-sm"
                        >
                          <i className="ri-logout-box-line"></i>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link 
                    href="/auth" 
                    className="bg-yellow-400 text-white px-4 md:px-8 py-2 md:py-3 rounded-full hover:bg-yellow-500 font-medium transition-colors whitespace-nowrap text-sm md:text-base"
                  >
                    <span className="hidden sm:inline">Sign In / Sign Up</span>
                    <span className="sm:hidden">Sign In</span>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-gray-700 hover:text-yellow-600 cursor-pointer"
              >
                <i className={`ri-${mobileMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 py-4">
            <div className="w-full px-4 md:px-6">
              <nav className="flex flex-col space-y-4">
                <Link 
                  href="/" 
                  className="text-gray-700 hover:text-yellow-600 font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/businesses" 
                  className="text-gray-700 hover:text-yellow-600 font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  All Suppliers
                </Link>
                <Link 
                  href="/subscription" 
                  className="text-gray-700 hover:text-yellow-600 font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Subscription
                </Link>
                <Link 
                  href="/about" 
                  className="text-gray-700 hover:text-yellow-600 font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <button 
                  onClick={() => {
                    setShowContactModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-yellow-600 font-medium transition-colors py-2 text-left cursor-pointer"
                >
                  Contact
                </button>
                
                {/* Language Switcher in Mobile Menu */}
                <div className="md:hidden pt-2 border-t border-gray-200">
                  <LanguageSwitcher />
                </div>
                
                {/* Mobile User Menu */}
                {isLoggedIn && (
                  <>
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center font-medium">
                          {userInitials}
                        </div>
                        <span className="font-medium text-gray-800">{userName}</span>
                      </div>
                      <Link 
                        href="/dashboard" 
                        className="flex items-center space-x-2 text-gray-700 hover:text-yellow-600 font-medium transition-colors py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <i className="ri-dashboard-line"></i>
                        <span>Dashboard</span>
                      </Link>
                      <Link 
                        href="/add-business" 
                        className="flex items-center space-x-2 text-gray-700 hover:text-yellow-600 font-medium transition-colors py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <i className="ri-add-circle-line"></i>
                        <span>Add Business</span>
                      </Link>
                      <Link 
                        href="/manage-businesses" 
                        className="flex items-center space-x-2 text-gray-700 hover:text-yellow-600 font-medium transition-colors py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <i className="ri-building-2-line"></i>
                        <span>My Businesses</span>
                      </Link>
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 text-red-600 hover:bg-red-50 font-medium transition-colors py-2 cursor-pointer"
                      >
                        <i className="ri-logout-box-line"></i>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </>
  );
}
