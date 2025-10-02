
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800">
      {/* Vision 2030 Support Banner */}
      <div className="bg-yellow-400 text-white py-3">
        <div className="w-full px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-4 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-4 h-3 bg-green-600 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
                  </div>
                </div>
                <span className="font-medium">Proudly Supporting Saudi Vision 2030</span>
              </div>
              <span className="text-yellow-200">|</span>
              <span className="text-yellow-100">Empowering Local Businesses</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Brand Section - Reorganized and Better Aligned */}
            <div className="lg:col-span-1 text-center lg:text-left">
              {/* Logo Section */}
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 text-yellow-400" fill="currentColor">
                    <circle cx="7" cy="7" r="3" />
                    <circle cx="17" cy="17" r="3" />
                    <circle cx="17" cy="7" r="3" />
                    <path d="M10 7h4M10 10l7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="text-3xl font-bold">
                  <span className="text-gray-800">Supplier</span>
                  <span className="text-green-400">.sa</span>
                </div>
              </div>

              {/* 100% Saudi Made Badge - Centered */}
              <div className="mb-8">
                <div className="inline-flex items-center justify-center bg-gradient-to-r from-green-50 to-yellow-50 px-6 py-3 rounded-full border border-green-200">
                  <span className="text-gray-800 text-xl font-bold">100% Saudi Made</span>
                </div>
              </div>

              {/* Social Media Icons - Centered */}
              <div className="flex justify-center lg:justify-start space-x-4">
                <a href="#" className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                  <i className="ri-twitter-fill text-xl text-white"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-blue-700 hover:bg-blue-800 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-xl text-white"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                  <i className="ri-whatsapp-fill text-xl text-white"></i>
                </a>
              </div>
            </div>

            {/* Navigation Sections */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* For Businesses */}
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                  <i className="ri-building-line text-yellow-600 mr-2"></i>
                  For Businesses
                </h4>
                <ul className="space-y-4">
                  <li>
                    <Link href="/add-business" className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center">
                      <i className="ri-add-circle-line text-yellow-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>Register Business</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/businesses" className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center">
                      <i className="ri-search-line text-yellow-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>Find Suppliers</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/subscription" className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center">
                      <i className="ri-vip-crown-line text-yellow-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>Premium Plans</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center">
                      <i className="ri-dashboard-line text-yellow-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>Business Dashboard</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources & Support */}
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                  <i className="ri-book-line text-yellow-600 mr-2"></i>
                  Resources
                </h4>
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center">
                      <i className="ri-question-line text-yellow-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>Help Center</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center">
                      <i className="ri-guide-line text-yellow-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>Business Guides</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center">
                      <i className="ri-article-line text-yellow-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>Success Stories</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center">
                      <i className="ri-customer-service-line text-yellow-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>24/7 Support</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                  <i className="ri-team-line text-yellow-600 mr-2"></i>
                  Company
                </h4>
                <ul className="space-y-4">
                  <li>
                    <Link href="/about" className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center">
                      <i className="ri-information-line text-yellow-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>About Us</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/vision-2030" className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center">
                      <i className="ri-eye-line text-yellow-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>Vision 2030</span>
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center">
                      <i className="ri-briefcase-line text-yellow-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>Careers</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center">
                      <i className="ri-mail-line text-yellow-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>Contact Us</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-yellow-400 text-white">
        <div className="w-full px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              
              {/* Copyright */}
              <div className="flex items-center space-x-4">
                <p className="text-white text-sm">
                  © 2024 Supplier.sa. All rights reserved.
                </p>
                <div className="flex items-center space-x-2 text-xs text-yellow-100">
                  <div className="w-4 h-3 bg-white rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span>Proudly Made in Saudi Arabia</span>
                </div>
              </div>

              {/* Legal Links */}
              <div className="flex items-center space-x-6">
                <Link href="/privacy" className="text-white hover:text-yellow-100 text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-white hover:text-yellow-100 text-sm transition-colors">
                  Terms of Service
                </Link>
                <a href="#" className="text-white hover:text-yellow-100 text-sm transition-colors">
                  Cookie Policy
                </a>
                <a 
                  href="https://readdy.ai/?origin=logo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-yellow-100 hover:text-white text-sm transition-colors"
                >
                  <span>Made with</span>
                  <i className="ri-heart-fill text-red-400 mx-1"></i>
                  <span>Readdy</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
