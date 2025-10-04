"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "../lib/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import ContactModal from "./ContactModal";
import Image from "next/image";

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
      from: "Sarah Johnson",
      company: "Tech Solutions Co.",
      subject: "Bulk order inquiry for LED TVs",
      preview:
        "Hi, I am interested in placing a bulk order for LED TVs. We need approximately 50 units...",
      time: "2h ago",
      unread: true,
      avatar: "SJ",
    },
    {
      id: 2,
      from: "Ahmed Al-Mansouri",
      company: "Emirates Mall",
      subject: "Partnership opportunity",
      preview:
        "We are expanding our electronics section and would like to discuss a potential partnership...",
      time: "5h ago",
      unread: true,
      avatar: "AM",
    },
    {
      id: 3,
      from: "Michael Chen",
      company: "Digital Innovations",
      subject: "Request for quotation",
      preview:
        "We need a quote for gaming computers and accessories. Our requirements include 20 high-end...",
      time: "1d ago",
      unread: true,
      avatar: "MC",
    },
  ];

  const handleSignOut = () => {
    setIsUserMenuOpen(false);
    router.push("/");
  };

  const handleMessageClick = (messageId: number) => {
    setIsMessagesOpen(false);
    router.push(`/dashboard?tab=messages&messageId=${messageId}`);
  };

  const handleViewAllMessages = () => {
    setIsMessagesOpen(false);
    router.push("/dashboard?tab=messages");
  };

  return (
    <>
      {/* Advertising Banner */}
      <div className="bg-gradient-to-r from-yellow-400 to-green-400 text-white py-2 overflow-hidden">
        <div className="animate-scroll whitespace-nowrap">
          <div className="inline-flex items-center space-x-4 md:space-x-8 text-xs md:text-sm font-medium">
            <span className="flex items-center">
              <i className="ri-trophy-fill mr-1 md:mr-2"></i>
              <span className="hidden sm:inline">
                {t("banner.slogan1Long")}
              </span>
              <span className="sm:hidden">{t("banner.slogan1Short")}</span>
            </span>
            <span className="text-yellow-100">•</span>
            <span className="flex items-center">
              <i className="ri-global-line mr-1 md:mr-2"></i>
              <span className="hidden sm:inline">
                {t("banner.slogan2Long")}
              </span>
              <span className="sm:hidden">{t("banner.slogan2Short")}</span>
            </span>
            <span className="text-yellow-100">•</span>
            <span className="flex items-center">
              <i className="ri-truck-line mr-1 md:mr-2"></i>
              <span className="hidden sm:inline">
                {t("banner.slogan3Long")}
              </span>
              <span className="sm:hidden">{t("banner.slogan3Short")}</span>
            </span>
            <span className="text-yellow-100">•</span>
            <span className="flex items-center">
              <i className="ri-handshake-line mr-1 md:mr-2"></i>
              <span className="hidden sm:inline">
                {t("banner.slogan4Long")}
              </span>
              <span className="sm:hidden">{t("banner.slogan4Short")}</span>
            </span>
          </div>
        </div>
      </div>

      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="w-full px-3 sm:px-4 md:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo Section */}
            <div className="flex items-center justify-center lg:justify-center space-x-2 sm:space-x-3">
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
              <div className="text-xl sm:text-2xl md:text-3xl font-bold">
                <span className="text-gray-800">Supplier</span>
                <span className="text-green-400">.sa</span>
              </div>
            </div>

            {/* Navigation - Desktop Only */}
            <nav className="hidden lg:flex space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-yellow-600 font-medium transition-colors"
              >
                {t("nav.home")}
              </Link>
              <Link
                href="/businesses"
                className="text-gray-700 hover:text-yellow-600 font-medium transition-colors"
              >
                {t("nav.allSuppliers")}
              </Link>
              <Link
                href="/subscription"
                className="text-gray-700 hover:text-yellow-600 font-medium transition-colors"
              >
                {t("nav.subscription")}
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-yellow-600 font-medium transition-colors"
              >
                {t("nav.aboutUs")}
              </Link>
              <button
                onClick={() => setShowContactModal(true)}
                className="text-gray-700 hover:text-yellow-600 font-medium transition-colors cursor-pointer"
              >
                {t("nav.contact")}
              </button>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
              {/* Language Switcher - Hidden on small screens */}
              <div className="hidden sm:block">
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
                      <div className="absolute right-0 mt-2 w-72 sm:w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 py-3 z-50 max-h-80 md:max-h-96 overflow-hidden">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                              {t("messages.recent")}
                            </h3>
                            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                              {unreadCount} {t("messages.newCountSuffix")}
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
                                  <p className="text-xs text-gray-600 mb-1">
                                    {message.company}
                                  </p>
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
                            {t("messages.viewAll")}
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
                      <span className="hidden md:block font-medium text-sm md:text-base">
                        {userName}
                      </span>
                      <i className="ri-arrow-down-s-line text-sm md:text-base"></i>
                    </button>

                    {/* User Dropdown */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-40 sm:w-44 md:w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <Link
                          href="/dashboard"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <i className="ri-dashboard-line"></i>
                          <span>{t("userMenu.dashboard")}</span>
                        </Link>
                        <Link
                          href="/add-business"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <i className="ri-building-2-line"></i>
                          <span>{t("userMenu.addBusiness")}</span>
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 text-sm cursor-pointer"
                        >
                          <i className="ri-logout-box-r-line"></i>
                          <span>{t("userMenu.signOut")}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* If not logged in, show auth links */}
                  <div className="hidden sm:flex items-center space-x-2 md:space-x-4">
                    <Link
                      href="/register"
                      className="text-gray-700 hover:text-yellow-600 font-medium transition-colors text-sm md:text-base"
                    >
                      {t("nav.register")}
                    </Link>
                    <Link
                      href="/login"
                      className="bg-yellow-400 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors text-sm md:text-base"
                    >
                      {t("nav.login")}
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Contact Modal */}
      {showContactModal && (
        <ContactModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
        />
      )}
    </>
  );
}
