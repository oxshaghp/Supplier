"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../lib/LanguageContext";

export default function VerificationPendingStatus() {
  const { t } = useLanguage();
  const [verificationStatus] = useState({
    status: "pending", // pending, reviewing, approved, rejected
    submittedDate: "2024-01-20",
    expectedDate: "2024-01-22",
    documentsUploaded: [
      {
        name: "Commercial Registration",
        status: "uploaded",
        uploadDate: "2024-01-20",
      },
    ],
    businessInfo: {
      name: "Metro Electronics Supply",
      category: "Electronics & Electrical Supplies",
      phone: "+966 50 123 4567",
      email: "info@metroelectronics.com",
    },
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "reviewing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return "ri-time-line";
      case "reviewing":
        return "ri-search-line";
      case "approved":
        return "ri-check-double-line";
      case "rejected":
        return "ri-close-circle-line";
      default:
        return "ri-question-line";
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case "pending":
        return t("verification.msgPending");
      case "reviewing":
        return t("verification.msgReviewing");
      case "approved":
        return t("verification.msgApproved");
      case "rejected":
        return t("verification.msgRejected");
      default:
        return t("verification.unknown");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Main Status Card */}
      <div
        className={`border-2 rounded-2xl p-8 ${getStatusColor(
          verificationStatus.status
        )}`}
      >
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <i
              className={`${getStatusIcon(verificationStatus.status)} text-4xl`}
            ></i>
          </div>
          <h1 className="text-3xl font-bold mb-2">{t("verification.title")}</h1>
          <p className="text-lg">
            {getStatusMessage(verificationStatus.status)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/20 rounded-lg p-4">
            <i className="ri-calendar-line text-2xl mb-2"></i>
            <h4 className="font-semibold">{t("verification.submitted")}</h4>
            <p className="text-sm">
              {new Date(verificationStatus.submittedDate).toLocaleDateString()}
            </p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <i className="ri-timer-line text-2xl mb-2"></i>
            <h4 className="font-semibold">
              {t("verification.expectedReview")}
            </h4>
            <p className="text-sm">
              {new Date(verificationStatus.expectedDate).toLocaleDateString()}
            </p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <i className="ri-file-check-line text-2xl mb-2"></i>
            <h4 className="font-semibold">{t("verification.documents")}</h4>
            <p className="text-sm">
              {t("verification.uploadedCount").replace(
                "{{count}}",
                String(verificationStatus.documentsUploaded.length)
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Business Information */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          <i className="ri-building-line mr-2"></i>
          {t("verification.businessInfoUnder")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">
              {t("verification.businessDetails")}
            </h4>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">{t("verification.name")}</span>{" "}
                {verificationStatus.businessInfo.name}
              </p>
              <p>
                <span className="font-medium">
                  {t("verification.category")}
                </span>{" "}
                {verificationStatus.businessInfo.category}
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">
              {t("verification.contactInfo")}
            </h4>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">{t("verification.phone")}</span>{" "}
                {verificationStatus.businessInfo.phone}
              </p>
              <p>
                <span className="font-medium">{t("verification.email")}</span>{" "}
                {verificationStatus.businessInfo.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Status */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          <i className="ri-file-list-line mr-2"></i>
          {t("verification.submittedDocuments")}
        </h2>
        <div className="space-y-4">
          {verificationStatus.documentsUploaded.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <i className="ri-file-check-line text-green-600 text-xl"></i>
                <div>
                  <h4 className="font-medium text-gray-800">{doc.name}</h4>
                  <p className="text-sm text-gray-600">
                    {t("verification.uploadedOn").replace(
                      "{{date}}",
                      new Date(doc.uploadDate).toLocaleDateString()
                    )}
                  </p>
                </div>
              </div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                {t("verification.docStatusUploaded")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Verification Process */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          <i className="ri-roadmap-line mr-2"></i>
          {t("verification.verificationProcess")}
        </h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <i className="ri-check-line text-green-600"></i>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">
                {t("verification.stepDocsSubmitted")}
              </h4>
              <p className="text-sm text-gray-600">
                {t("verification.stepDocsSubmittedDesc")}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                verificationStatus.status === "reviewing"
                  ? "bg-blue-100"
                  : "bg-yellow-100"
              }`}
            >
              <i
                className={`${
                  verificationStatus.status === "reviewing"
                    ? "ri-search-line text-blue-600"
                    : "ri-time-line text-yellow-600"
                }`}
              ></i>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">
                {t("verification.stepDocReview")}
              </h4>
              <p className="text-sm text-gray-600">
                {verificationStatus.status === "reviewing"
                  ? t("verification.stepDocReviewDescReviewing")
                  : t("verification.stepDocReviewDescWaiting")}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <i className="ri-shield-check-line text-gray-400"></i>
            </div>
            <div>
              <h4 className="font-medium text-gray-500">
                {t("verification.stepComplete")}
              </h4>
              <p className="text-sm text-gray-400">
                {t("verification.stepCompleteDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What to Expect */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">
          <i className="ri-information-line mr-2"></i>
          {t("verification.whatToExpect")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">
              {t("verification.duringReview")}
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>{t("verification.dr1")}</li>
              <li>{t("verification.dr2")}</li>
              <li>{t("verification.dr3")}</li>
              <li>{t("verification.dr4")}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">
              {t("verification.onceApproved")}
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>{t("verification.oa1")}</li>
              <li>{t("verification.oa2")}</li>
              <li>{t("verification.oa3")}</li>
              <li>{t("verification.oa4")}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {t("verification.needHelp")}
            </h3>
            <p className="text-gray-600">{t("verification.needHelpDesc")}</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-medium whitespace-nowrap cursor-pointer">
              <i className="ri-chat-3-line mr-2"></i>
              {t("verification.liveChat")}
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap cursor-pointer">
              <i className="ri-mail-line mr-2"></i>
              {t("verification.emailSupport")}
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Link
          href="/"
          className="bg-yellow-400 text-white px-8 py-3 rounded-lg hover:bg-yellow-500 font-medium whitespace-nowrap cursor-pointer"
        >
          <i className="ri-home-line mr-2"></i>
          {t("verification.backHome")}
        </Link>
        <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap cursor-pointer">
          <i className="ri-refresh-line mr-2"></i>
          {t("verification.checkStatus")}
        </button>
      </div>
    </div>
  );
}
