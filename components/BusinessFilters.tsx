"use client";

import { useState } from "react";
import { useLanguage } from "../lib/LanguageContext";

export default function BusinessFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedBusinessType,
  setSelectedBusinessType,
}) {
  const { t } = useLanguage();
  const [showVerified, setShowVerified] = useState(false);
  const [showOpenNow, setShowOpenNow] = useState(false);

  const categories = [
    { id: "all", name: t("filters.allCategories"), icon: "ri-apps-2-line" },
    { id: "agriculture", name: t("cat.agriculture"), icon: "ri-plant-line" },
    { id: "apparel-fashion", name: "Apparel & Fashion", icon: "ri-shirt-line" },
    { id: "automobile", name: "Automobile", icon: "ri-car-line" },
    {
      id: "brass-hardware",
      name: "Brass Hardware & Components",
      icon: "ri-tools-line",
    },
    {
      id: "business-services",
      name: "Business Services",
      icon: "ri-briefcase-line",
    },
    { id: "chemicals", name: "Chemicals", icon: "ri-flask-line" },
    {
      id: "computer-hardware-software",
      name: "Computer Hardware & Software",
      icon: "ri-computer-line",
    },
    {
      id: "construction-real-estate",
      name: "Construction & Real Estate",
      icon: "ri-hammer-line",
    },
    {
      id: "consumer-electronics",
      name: "Consumer Electronics",
      icon: "ri-smartphone-line",
    },
    {
      id: "electronics-electrical",
      name: "Electronics & Electrical Supplies",
      icon: "ri-flashlight-line",
    },
    { id: "energy-power", name: "Energy & Power", icon: "ri-lightning-line" },
    {
      id: "environment-pollution",
      name: "Environment & Pollution",
      icon: "ri-leaf-line",
    },
    {
      id: "food-beverage",
      name: "Food & Beverage",
      icon: "ri-restaurant-line",
    },
    { id: "furniture", name: "Furniture", icon: "ri-sofa-line" },
    { id: "gifts-crafts", name: "Gifts & Crafts", icon: "ri-gift-line" },
    { id: "health-beauty", name: "Health & Beauty", icon: "ri-scissors-line" },
    { id: "home-supplies", name: "Home Supplies", icon: "ri-home-line" },
    {
      id: "home-textiles",
      name: "Home Textiles & Furnishings",
      icon: "ri-shirt-line",
    },
    {
      id: "hospital-medical",
      name: "Hospital & Medical Supplies",
      icon: "ri-health-book-line",
    },
    {
      id: "hotel-supplies",
      name: "Hotel Supplies & Equipment",
      icon: "ri-hotel-line",
    },
    {
      id: "industrial-supplies",
      name: "Industrial Supplies",
      icon: "ri-settings-line",
    },
    {
      id: "jewelry-gemstones",
      name: "Jewelry & Gemstones",
      icon: "ri-gem-line",
    },
    {
      id: "leather-products",
      name: "Leather & Leather Products",
      icon: "ri-handbag-line",
    },
    { id: "machinery", name: "Machinery", icon: "ri-settings-2-line" },
    {
      id: "mineral-metals",
      name: "Mineral & Metals",
      icon: "ri-copper-diamond-line",
    },
    {
      id: "office-school",
      name: "Office & School Supplies",
      icon: "ri-book-line",
    },
    { id: "oil-gas", name: "Oil and Gas", icon: "ri-oil-line" },
    { id: "packaging-paper", name: "Packaging & Paper", icon: "ri-box-line" },
    { id: "pharmaceuticals", name: "Pharmaceuticals", icon: "ri-capsule-line" },
    {
      id: "pipes-tubes",
      name: "Pipes, Tubes & Fittings",
      icon: "ri-roadster-line",
    },
    {
      id: "plastics-products",
      name: "Plastics & Products",
      icon: "ri-recycle-line",
    },
    {
      id: "printing-publishing",
      name: "Printing & Publishing",
      icon: "ri-printer-line",
    },
    { id: "real-estate", name: "Real Estate", icon: "ri-building-line" },
    {
      id: "scientific-laboratory",
      name: "Scientific & Laboratory Instruments",
      icon: "ri-microscope-line",
    },
    {
      id: "security-protection",
      name: "Security & Protection",
      icon: "ri-shield-line",
    },
    {
      id: "sports-entertainment",
      name: "Sports & Entertainment",
      icon: "ri-football-line",
    },
    {
      id: "telecommunications",
      name: "Telecommunications",
      icon: "ri-phone-line",
    },
    {
      id: "textiles-fabrics",
      name: "Textiles & Fabrics",
      icon: "ri-shirt-line",
    },
    { id: "toys", name: "Toys", icon: "ri-gamepad-line" },
    { id: "transportation", name: "Transportation", icon: "ri-truck-line" },
  ];

  const businessTypes = [
    { id: "all", name: t("filters.allTypes"), icon: "ri-building-line" },
    { id: "Supplier", name: "Supplier", icon: "ri-truck-line" },
    { id: "Store", name: "Store", icon: "ri-store-line" },
    { id: "Office", name: "Office", icon: "ri-building-line" },
    { id: "Individual", name: "Individual", icon: "ri-user-line" },
  ];

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedBusinessType("all");
    setShowVerified(false);
    setShowOpenNow(false);
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          {t("filters.searchTitle")}
        </h3>
        <div className="relative">
          <input
            type="text"
            placeholder={t("filters.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 pl-10 pr-4 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none text-sm"
          />
          <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          {t("filters.categoriesTitle")}
        </h3>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all cursor-pointer ${
                selectedCategory === category.id
                  ? "bg-yellow-400 text-white shadow-md"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <i className={`${category.icon} text-sm`}></i>
              <span className="font-medium text-sm">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Business Types */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          {t("filters.businessTypeTitle")}
        </h3>
        <div className="space-y-2">
          {businessTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedBusinessType(type.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all cursor-pointer ${
                selectedBusinessType === type.id
                  ? "bg-yellow-400 text-white shadow-md"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <i className={`${type.icon} text-sm`}></i>
              <span className="font-medium text-sm">{type.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Additional Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          {t("filters.filtersTitle")}
        </h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showVerified}
              onChange={(e) => setShowVerified(e.target.checked)}
              className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
            />
            <div className="flex items-center space-x-2">
              <i className="ri-verified-badge-line text-green-500 text-sm"></i>
              <span className="text-sm text-gray-700">
                {t("filters.verifiedOnly")}
              </span>
            </div>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showOpenNow}
              onChange={(e) => setShowOpenNow(e.target.checked)}
              className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
            />
            <div className="flex items-center space-x-2">
              <i className="ri-time-line text-green-500 text-sm"></i>
              <span className="text-sm text-gray-700">
                {t("filters.openNow")}
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Clear Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <button
          onClick={clearAllFilters}
          className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-200 font-medium text-sm cursor-pointer"
        >
          <i className="ri-refresh-line mr-2"></i>
          {t("filters.clearAll")}
        </button>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          {t("filters.quickStats")}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {t("filters.totalBusinesses")}
            </span>
            <span className="text-sm font-semibold text-gray-800">1,247</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {t("filters.verified")}
            </span>
            <span className="text-sm font-semibold text-green-600">892</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {t("filters.openNow")}
            </span>
            <span className="text-sm font-semibold text-blue-600">634</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {t("filters.newThisWeek")}
            </span>
            <span className="text-sm font-semibold text-yellow-600">23</span>
          </div>
        </div>
      </div>
    </div>
  );
}
