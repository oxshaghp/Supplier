"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BranchManagement from "../../components/BranchManagement";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext"; // عدل المسار حسب مكانك

export default function ManageBusinessesPage() {
  const { t } = useLanguage();
  const [businesses, setBusinesses] = useState([
    {
      id: "1",
      businessName: "Metro Electronics Supply",
      category: "Consumer Electronics",
      businessType: "Supplier",
      contactEmail: "info@metroelectronics.com",
      contactPhone: "+966 50 123 4567",
      status: "verified",
      branches: [
        {
          id: "1",
          name: "Main Branch - Riyadh",
          address: "King Fahd Road, Al-Olaya District, Riyadh",
          phone: "+966 50 123 4567",
          email: "riyadh@metroelectronics.com",
          manager: "Ahmed Al-Rashid",
          location: { lat: 24.7136, lng: 46.6753 },
          status: "active",
          specialServices: ["Express Delivery", "Technical Support"],
          isMainBranch: true,
          workingHours: {
            monday: { open: "09:00", close: "17:00", closed: false },
            tuesday: { open: "09:00", close: "17:00", closed: false },
            wednesday: { open: "09:00", close: "17:00", closed: false },
            thursday: { open: "09:00", close: "17:00", closed: false },
            friday: { open: "09:00", close: "17:00", closed: false },
            saturday: { open: "10:00", close: "16:00", closed: false },
            sunday: { open: "10:00", close: "16:00", closed: true },
          },
        },
        {
          id: "2",
          name: "Jeddah Branch",
          address: "Prince Sultan Road, Al-Baghdadiyah, Jeddah",
          phone: "+966 50 987 6543",
          email: "jeddah@metroelectronics.com",
          manager: "Omar Al-Ghamdi",
          location: { lat: 21.4858, lng: 39.1925 },
          status: "active",
          specialServices: ["Installation Service", "Bulk Orders"],
          isMainBranch: false,
          workingHours: {
            monday: { open: "10:00", close: "18:00", closed: false },
            tuesday: { open: "10:00", close: "18:00", closed: false },
            wednesday: { open: "10:00", close: "18:00", closed: false },
            thursday: { open: "10:00", close: "18:00", closed: false },
            friday: { open: "10:00", close: "18:00", closed: false },
            saturday: { open: "11:00", close: "17:00", closed: false },
            sunday: { open: "11:00", close: "17:00", closed: true },
          },
        },
      ],
    },
    {
      id: "2",
      businessName: "Golden Spice Trading",
      category: "Food & Beverage",
      businessType: "Supplier",
      contactEmail: "info@goldenspice.com",
      contactPhone: "+966 55 234 5678",
      status: "pending",
      branches: [],
    },
    {
      id: "3",
      businessName: "Saudi Tech Solutions",
      category: "Computer Hardware & Software",
      businessType: "Office",
      contactEmail: "contact@sauditech.com",
      contactPhone: "+966 56 345 6789",
      status: "verified",
      branches: [
        {
          id: "3",
          name: "Head Office",
          address: "King Abdul Aziz Road, Al-Malaz, Riyadh",
          phone: "+966 56 345 6789",
          email: "contact@sauditech.com",
          manager: "Fahad Al-Otaibi",
          location: { lat: 24.6877, lng: 46.7219 },
          status: "active",
          specialServices: ["Consulting", "Training"],
          isMainBranch: true,
          workingHours: {
            monday: { open: "08:00", close: "16:00", closed: false },
            tuesday: { open: "08:00", close: "16:00", closed: false },
            wednesday: { open: "08:00", close: "16:00", closed: false },
            thursday: { open: "08:00", close: "16:00", closed: false },
            friday: { open: "08:00", close: "16:00", closed: true },
            saturday: { open: "08:00", close: "16:00", closed: true },
            sunday: { open: "08:00", close: "16:00", closed: true },
          },
        },
      ],
    },
  ]);

  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showAddBusiness, setShowAddBusiness] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "verified":
        return "ri-check-line";
      case "pending":
        return "ri-time-line";
      case "rejected":
        return "ri-close-line";
      default:
        return "ri-question-line";
    }
  };

  const getStatusText = (status) => {
    return t(`manageBusinesses.status.${status}`);
  };

  const updateBusinessBranches = (businessId, updatedBranches) => {
    setBusinesses((prev) =>
      prev.map((business) =>
        business.id === businessId
          ? { ...business, branches: updatedBranches }
          : business
      )
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="w-full px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">
                  {t("manageBusinesses.title")}
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {t("manageBusinesses.subtitle")}
                </p>
              </div>

              {/* Business Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className="ri-building-line text-blue-600 text-xl"></i>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">
                        {businesses.length}
                      </p>
                      <p className="text-sm text-gray-600">
                        {t("manageBusinesses.stats.totalBusinesses")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <i className="ri-check-line text-green-600 text-xl"></i>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        {
                          businesses.filter((b) => b.status === "verified")
                            .length
                        }
                      </p>
                      <p className="text-sm text-gray-600">
                        {t("manageBusinesses.stats.verified")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <i className="ri-time-line text-yellow-600 text-xl"></i>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-yellow-600">
                        {
                          businesses.filter((b) => b.status === "pending")
                            .length
                        }
                      </p>
                      <p className="text-sm text-gray-600">
                        {t("manageBusinesses.stats.pending")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <i className="ri-map-pin-line text-purple-600 text-xl"></i>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">
                        {businesses.reduce(
                          (total, business) => total + business.branches.length,
                          0
                        )}
                      </p>
                      <p className="text-sm text-gray-600">
                        {t("manageBusinesses.stats.totalBranches")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/add-business"
                  className="bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 font-medium text-lg whitespace-nowrap cursor-pointer transition-all text-center"
                >
                  <i className="ri-add-line mr-2"></i>
                  {t("manageBusinesses.buttons.addNewBusiness")}
                </Link>
                <button
                  onClick={() => setShowAddBusiness(true)}
                  className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 font-medium text-lg whitespace-nowrap cursor-pointer transition-all"
                >
                  <i className="ri-building-line mr-2"></i>
                  {t("manageBusinesses.buttons.quickSetup")}
                </button>
              </div>

              {/* Business List */}
              <div className="space-y-6">
                {businesses.map((business) => (
                  <div
                    key={business.id}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                  >
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                            {business.businessName.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-2xl font-bold text-gray-800">
                                {business.businessName}
                              </h3>
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                  business.status
                                )}`}
                              >
                                <i
                                  className={`${getStatusIcon(
                                    business.status
                                  )} mr-1`}
                                ></i>
                                {getStatusText(business.status)}
                              </span>
                            </div>
                            <div className="space-y-1 text-gray-600">
                              <p className="flex items-center space-x-2">
                                <i className="ri-price-tag-line text-gray-400"></i>
                                <span>
                                  {business.category} • {business.businessType}
                                </span>
                              </p>
                              <p className="flex items-center space-x-2">
                                <i className="ri-mail-line text-gray-400"></i>
                                <span>{business.contactEmail}</span>
                              </p>
                              <p className="flex items-center space-x-2">
                                <i className="ri-phone-line text-gray-400"></i>
                                <span>{business.contactPhone}</span>
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          {business.status === "pending" && (
                            <Link
                              href="/verification-status"
                              className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-200 text-sm font-medium whitespace-nowrap cursor-pointer transition-all"
                            >
                              <i className="ri-time-line mr-2"></i>
                              {t("manageBusinesses.buttons.checkStatus")}
                            </Link>
                          )}
                          <button
                            onClick={() =>
                              setSelectedBusiness(
                                selectedBusiness?.id === business.id
                                  ? null
                                  : business
                              )
                            }
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-medium whitespace-nowrap cursor-pointer transition-all"
                          >
                            <i className="ri-settings-line mr-2"></i>
                            {t("manageBusinesses.buttons.manageBranches")}
                          </button>
                          <Link
                            href={`/business/${business.id}`}
                            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 font-medium whitespace-nowrap cursor-pointer transition-all"
                          >
                            <i className="ri-eye-line mr-2"></i>
                            {t("manageBusinesses.buttons.viewProfile")}
                          </Link>
                        </div>
                      </div>

                      {/* Branches Summary */}
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-800">
                            <i className="ri-map-pin-line mr-2"></i>
                            {t("manageBusinesses.branches.title")} (
                            {business.branches.length})
                          </h4>
                          {business.branches.length > 0 && (
                            <span className="text-sm text-gray-600">
                              {
                                business.branches.filter(
                                  (b) => b.status === "active"
                                ).length
                              }{" "}
                              {t("manageBusinesses.branches.active")}
                            </span>
                          )}
                        </div>

                        {business.branches.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {business.branches.slice(0, 3).map((branch) => (
                              <div
                                key={branch.id}
                                className="bg-white p-4 rounded-lg border border-gray-200"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="font-medium text-gray-800 truncate">
                                    {branch.name}
                                  </h5>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      branch.status === "active"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                                  >
                                    {t(
                                      `manageBusinesses.branchStatus.${branch.status}`
                                    )}
                                  </span>
                                </div>
                                <div className="space-y-1 text-sm text-gray-600">
                                  <p className="flex items-center space-x-2">
                                    <i className="ri-map-pin-line text-gray-400"></i>
                                    <span className="truncate">
                                      {branch.address}
                                    </span>
                                  </p>
                                  <p className="flex items-center space-x-2">
                                    <i className="ri-phone-line text-gray-400"></i>
                                    <span>{branch.phone}</span>
                                  </p>
                                </div>
                              </div>
                            ))}
                            {business.branches.length > 3 && (
                              <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 flex items-center justify-center">
                                <span className="text-gray-600 font-medium">
                                  +{business.branches.length - 3}{" "}
                                  {t("manageBusinesses.branches.more")}
                                </span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                              <i className="ri-map-pin-line text-gray-400 text-xl"></i>
                            </div>
                            <p className="text-gray-600 mb-3">
                              {t("manageBusinesses.branches.noBranches")}
                            </p>
                            <button
                              onClick={() => setSelectedBusiness(business)}
                              className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 text-sm font-medium whitespace-nowrap cursor-pointer transition-all"
                            >
                              <i className="ri-add-line mr-1"></i>
                              {t("manageBusinesses.branches.addFirst")}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {businesses.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="ri-building-line text-gray-400 text-4xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-600 mb-4">
                    {t("manageBusinesses.empty.title")}
                  </h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    {t("manageBusinesses.empty.message")}
                  </p>
                  <Link
                    href="/add-business"
                    className="bg-yellow-400 text-white px-8 py-4 rounded-lg hover:bg-yellow-500 font-medium text-lg whitespace-nowrap cursor-pointer transition-all inline-block"
                  >
                    <i className="ri-add-line mr-2"></i>
                    {t("manageBusinesses.empty.button")}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Branch Management Modal */}
      {selectedBusiness && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-7xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">
                  {t("manageBusinesses.modal.title")} -{" "}
                  {selectedBusiness.businessName}
                </h3>
                <button
                  onClick={() => setSelectedBusiness(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <BranchManagement
                branches={selectedBusiness.branches}
                setBranches={(branches) =>
                  updateBusinessBranches(selectedBusiness.id, branches)
                }
                mainBusinessData={selectedBusiness}
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
