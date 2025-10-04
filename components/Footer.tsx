"use client";

import Link from "next/link";
import { useLanguage } from "../lib/LanguageContext";

export default function Footer() {
  const { t, isRTL } = useLanguage();
  return (
    <footer className="bg-white text-gray-800">
      {/* Vision 2030 Support Banner */}
      <div className="bg-yellow-400 text-white py-3">
        <div className="w-full px-6">
          <div className="max-w-7xl mx-auto">
            <div
              className={`flex items-center justify-center ${
                isRTL ? "space-x-reverse space-x-4" : "space-x-4"
              } text-sm`}
            >
              <div className="flex items-center space-x-2">
                <div className="w-6 h-4 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-4 h-3 bg-green-600 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
                  </div>
                </div>
                <span className="font-medium">
                  {t("footer.bannerSupport2030")}
                </span>
              </div>
              <span className="text-yellow-200">|</span>
              <span className="text-yellow-100">
                {t("footer.bannerEmpowerLocal")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
            {/* Brand Section - Reorganized and Better Aligned */}
            <div className="lg:col-span-1 text-center lg:text-left">
              {/* Logo Section */}
              <div className="flex items-center justify-center lg:justify-start space-x-2 sm:space-x-3 mb-6 sm:mb-8">
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400"
                    fill="currentColor"
                  >
                    <circle cx="7" cy="7" r="3" />
                    <circle cx="17" cy="17" r="3" />
                    <circle cx="17" cy="7" r="3" />
                    <path
                      d="M10 7h4M10 10l7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="text-2xl sm:text-3xl font-bold">
                  <span className="text-gray-800">Supplier</span>
                  <span className="text-green-400">.sa</span>
                </div>
              </div>

              {/* 100% Saudi Made Badge - Centered */}
              <div className="mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center bg-gradient-to-r from-green-50 to-yellow-50 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-green-200">
                  <span className="text-gray-800 text-base sm:text-lg md:text-xl font-bold">
                    {t("footer.brandMadeInSaudi")}
                  </span>
                </div>
              </div>

              {/* Social Media Icons - Centered */}
              <div className="flex justify-center lg:justify-start space-x-3 sm:space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i className="ri-twitter-fill text-lg sm:text-xl text-white"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-700 hover:bg-blue-800 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i className="ri-linkedin-fill text-lg sm:text-xl text-white"></i>
                </a>
                <a
                  href="tel:+966542741977"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i className="ri-whatsapp-fill text-lg sm:text-xl text-white"></i>
                </a>
              </div>
            </div>

            {/* Navigation Sections */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {/* For Businesses */}
              <div>
                <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                  <i className="ri-building-line text-yellow-600 mr-2"></i>
                  {t("footer.forBusinesses")}
                </h4>
                <ul className="space-y-3 sm:space-y-4">
                  <li>
                    <Link
                      href="/add-business"
                      className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center"
                    >
                      <i className="ri-add-circle-line text-yellow-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>{t("footer.registerBusiness")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/businesses"
                      className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center"
                    >
                      <i className="ri-search-line text-yellow-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>{t("footer.findSuppliers")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/subscription"
                      className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center"
                    >
                      <i className="ri-vip-crown-line text-yellow-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>{t("footer.pricingPlans")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard"
                      className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center"
                    >
                      <i className="ri-dashboard-line text-yellow-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>{t("footer.businessDashboard")}</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources & Support */}
              <div>
                <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                  <i className="ri-book-line text-yellow-600 mr-2"></i>
                  {t("footer.resources")}
                </h4>
                <ul className="space-y-3 sm:space-y-4">
                  <li>
                    <Link
                      href="/help-center"
                      className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center"
                    >
                      <i className="ri-question-line text-yellow-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>{t("footer.helpCenter")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/business-guides"
                      className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center"
                    >
                      <i className="ri-guide-line text-yellow-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>{t("footer.businessGuides")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/success-stories"
                      className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center"
                    >
                      <i className="ri-article-line text-yellow-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>{t("footer.successStories")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/support"
                      className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center"
                    >
                      <i className="ri-customer-service-line text-yellow-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>{t("footer.support247")}</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                  <i className="ri-team-line text-yellow-600 mr-2"></i>
                  {t("footer.company")}
                </h4>
                <ul className="space-y-3 sm:space-y-4">
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center"
                    >
                      <i className="ri-information-line text-yellow-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span>{t("footer.aboutUs")}</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-yellow-400 text-white">
        <div className="w-full px-3 sm:px-4 md:px-6 py-4 sm:py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 sm:space-y-4 lg:space-y-0">
              {/* Copyright */}
              <div
                className={`flex flex-col sm:flex-row items-center ${
                  isRTL
                    ? "space-x-reverse space-x-2 sm:space-x-4"
                    : "space-x-2 sm:space-x-4"
                }`}
              >
                <p className="text-white text-xs sm:text-sm">
                  {t("footer.copyright")}
                </p>
                <div
                  className={`flex items-center ${
                    isRTL
                      ? "space-x-reverse space-x-1 sm:space-x-2"
                      : "space-x-1 sm:space-x-2"
                  } text-xs text-yellow-100`}
                >
                  <div className="w-3 h-2 sm:w-4 sm:h-3 bg-white rounded-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-xs">
                    {t("footer.proudlyMadeInSaudi")}
                  </span>
                </div>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap items-center justify-center lg:justify-end space-x-3 sm:space-x-4 md:space-x-6 gap-2">
                <Link
                  href="/privacy"
                  className="text-white hover:text-yellow-100 text-xs sm:text-sm transition-colors"
                >
                  {t("footer.privacyPolicy")}
                </Link>
                <Link
                  href="/terms"
                  className="text-white hover:text-yellow-100 text-xs sm:text-sm transition-colors"
                >
                  {t("footer.termsOfService")}
                </Link>
                <Link
                  href="/cookie-policy"
                  className="text-white hover:text-yellow-100 text-xs sm:text-sm transition-colors"
                >
                  {t("footer.cookiePolicy")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
