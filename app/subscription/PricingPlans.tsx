"use client";

import { useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";

export default function PricingPlans() {
  const { t } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const monthlyPrice = 49;
  const yearlyPrice = 490;
  const yearlySavings = Math.round(
    ((monthlyPrice * 12 - yearlyPrice) / (monthlyPrice * 12)) * 100
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("subscription.plansTitle")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t("subscription.plansDesc")}
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-100 rounded-full p-1 mb-12">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-3 rounded-full font-medium transition-all cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {t("subscription.monthly")}
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-3 rounded-full font-medium transition-all cursor-pointer ${
                billingCycle === "yearly"
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {t("subscription.yearly")}
              <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                {t("subscription.saveXPercent").replace(
                  "{{percent}}",
                  String(yearlySavings)
                )}
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 relative shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t("subscription.freeTitle")}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("subscription.freeSubtitle")}
              </p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">$0</span>
                <span className="text-gray-600 text-lg">
                  {t("subscription.perMonth")}
                </span>
              </div>
              <button className="w-full bg-gray-800 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-700 transition-colors whitespace-nowrap cursor-pointer">
                <i className="ri-play-line mr-2"></i>
                {t("subscription.getStartedFree")}
              </button>
              <p className="text-sm text-gray-500 mt-2">
                {t("subscription.noCard")}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                {t("subscription.whatsIncluded")}
              </h4>
              <div className="flex items-center">
                <i className="ri-check-line text-green-500 mr-3 text-lg"></i>
                <span className="text-gray-700">{t("subscription.incl1")}</span>
              </div>
              <div className="flex items-center">
                <i className="ri-check-line text-green-500 mr-3 text-lg"></i>
                <span className="text-gray-700">{t("subscription.incl2")}</span>
              </div>
              <div className="flex items-center">
                <i className="ri-check-line text-green-500 mr-3 text-lg"></i>
                <span className="text-gray-700">{t("subscription.incl3")}</span>
              </div>
              <div className="flex items-center">
                <i className="ri-check-line text-green-500 mr-3 text-lg"></i>
                <span className="text-gray-700">{t("subscription.incl4")}</span>
              </div>
              <div className="flex items-center">
                <i className="ri-check-line text-green-500 mr-3 text-lg"></i>
                <span className="text-gray-700">{t("subscription.incl5")}</span>
              </div>
              <div className="flex items-center">
                <i className="ri-check-line text-green-500 mr-3 text-lg"></i>
                <span className="text-gray-700">{t("subscription.incl6")}</span>
              </div>
              <div className="flex items-center">
                <i className="ri-check-line text-green-500 mr-3 text-lg"></i>
                <span className="text-gray-700">{t("subscription.incl7")}</span>
              </div>
              <div className="flex items-center">
                <i className="ri-check-line text-green-500 mr-3 text-lg"></i>
                <span className="text-gray-700">{t("subscription.incl8")}</span>
              </div>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-400 p-8 relative shadow-xl">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                🚀 Most Popular Choice
              </span>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t("subscription.premiumTitle")}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("subscription.premiumSubtitle")}
              </p>

              {/* Pricing Display */}
              <div className="mb-6">
                {billingCycle === "monthly" ? (
                  <div>
                    <span className="text-5xl font-bold text-gray-900">
                      ${monthlyPrice}
                    </span>
                    <span className="text-gray-600 text-lg">
                      {t("subscription.perMonth")}
                    </span>
                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-sm text-green-800">
                        {t("subscription.saveWithYearly")}{" "}
                        <strong>
                          ${yearlyPrice}
                          {t("subscription.perYear")}
                        </strong>
                        <span className="ml-1 font-bold text-green-700">
                          (
                          {t("subscription.saveXPercent").replace(
                            "{{percent}}",
                            String(yearlySavings)
                          )}
                          )
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-2xl font-medium text-gray-500 line-through">
                        ${monthlyPrice * 12}
                      </span>
                      <span className="text-5xl font-bold text-gray-900">
                        ${yearlyPrice}
                      </span>
                    </div>
                    <span className="text-gray-600 text-lg">
                      {t("subscription.perYear")}
                    </span>
                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold text-sm">
                        {t("subscription.saveAmount")
                          .replace(
                            "{{amount}}",
                            String(monthlyPrice * 12 - yearlyPrice)
                          )
                          .replace("{{percent}}", String(yearlySavings))}
                      </span>
                      <div className="mt-2 text-sm text-green-700">
                        {t("subscription.justPerMonth").replace(
                          "{{amount}}",
                          String(Math.round(yearlyPrice / 12))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button className="w-full bg-yellow-400 text-gray-900 py-4 px-6 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors whitespace-nowrap cursor-pointer shadow-lg">
                <i className="ri-rocket-line mr-2"></i>
                {t("subscription.premiumCTA")}
              </button>
              <p className="text-sm text-gray-600 mt-2">
                {t("subscription.guarantee")}
              </p>
            </div>

            <div className="mb-6">
              <p className="font-bold text-gray-900 mb-4 text-lg flex items-center">
                <i className="ri-gift-line mr-2 text-yellow-600"></i>
                {t("subscription.premiumAllFreePlus")}
              </p>
            </div>

            {/* Core Business Features */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-base">
                <i className="ri-building-line mr-2 text-yellow-600"></i>
                {t("subscription.coreFeatures")}
              </h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-3 text-lg"></i>
                  <span className="text-gray-700">
                    {t("subscription.fCore1")}
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-3 text-lg"></i>
                  <span className="text-gray-700">
                    {t("subscription.fCore2")}
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-3 text-lg"></i>
                  <span className="text-gray-700">
                    {t("subscription.fCore3")}
                  </span>
                </div>
              </div>
            </div>

            {/* Communication & Lead Generation */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-base">
                <i className="ri-message-line mr-2 text-yellow-600"></i>
                {t("subscription.commLead")}
              </h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-3 text-lg"></i>
                  <span className="text-gray-700">
                    {t("subscription.fComm1")}
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-3 text-lg"></i>
                  <span className="text-gray-700">
                    {t("subscription.fComm2")}
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-3 text-lg"></i>
                  <span className="text-gray-700">
                    {t("subscription.fComm3")}
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-3 text-lg"></i>
                  <span className="text-gray-700">
                    {t("subscription.fComm4")}
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-3 text-lg"></i>
                  <span className="text-gray-700">
                    {t("subscription.fComm5")}
                  </span>
                </div>
              </div>
            </div>

            {/* Premium Marketing & Analytics */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-base">
                <i className="ri-star-line mr-2 text-yellow-600"></i>
                {t("subscription.marketingAnalytics")}
              </h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-3 text-lg"></i>
                  <span className="text-gray-700">
                    {t("subscription.fMark1")}
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-3 text-lg"></i>
                  <span className="text-gray-700">
                    {t("subscription.fMark2")}
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-3 text-lg"></i>
                  <span className="text-gray-700">
                    {t("subscription.fMark3")}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-yellow-200 bg-yellow-25 rounded-lg p-4">
              <div className="text-center">
                <p className="text-sm text-gray-700 font-medium">
                  🛡️ 30-day money-back guarantee • 🎯 Trusted by 5000+ Saudi
                  businesses
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Business Statistics */}
        <div className="text-center mt-16 bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {t("subscription.joinTitle")}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                5000+
              </div>
              <div className="text-gray-600">
                {t("subscription.statActive")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                50,000+
              </div>
              <div className="text-gray-600">
                {t("subscription.statMonthly")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">13</div>
              <div className="text-gray-600">
                {t("subscription.statRegions")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                99.8%
              </div>
              <div className="text-gray-600">
                {t("subscription.statUptime")}
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="text-center mt-12">
          <div className="bg-blue-50 rounded-xl p-8 max-w-2xl mx-auto">
            <h4 className="text-xl font-bold text-gray-900 mb-4">
              {t("subscription.helpChoosing")}
            </h4>
            <p className="text-gray-600 mb-6">{t("subscription.helpDesc")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                <i className="ri-phone-line mr-2"></i>
                {t("subscription.callSales")}
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap cursor-pointer">
                <i className="ri-chat-3-line mr-2"></i>
                {t("subscription.chatSupport")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
