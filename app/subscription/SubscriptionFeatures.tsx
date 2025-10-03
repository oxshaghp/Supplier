"use client";

export default function SubscriptionFeatures() {
  // For simplicity, keep static copy; could be translated similarly if needed later
  const features = [
    {
      icon: "ri-customer-service-2-line",
      title: "Direct Customer Communication",
      description:
        "Enable customers to send requests to be contacted directly. Get instant notifications when potential buyers want to connect with your business.",
      benefits: [
        "Request contact form integration",
        "Direct messaging with customers",
        "Procurement team contact numbers",
        "Real-time communication alerts",
      ],
    },
    {
      icon: "ri-map-pin-line",
      title: "Advanced Location Management",
      description:
        "Pin your business locations on the map and manage multiple branches. Help customers find you easily with precise location mapping.",
      benefits: [
        "Pin exact location on map",
        "Add multiple business locations",
        "Location-based customer targeting",
        "Interactive map integration",
      ],
    },
    {
      icon: "ri-star-line",
      title: "Featured Business Placement",
      description:
        "Appear prominently on the homepage featured businesses section. Get maximum visibility and attract more customers to your business.",
      benefits: [
        "Homepage featured placement",
        "Priority in search results",
        "Increased profile visibility",
        "Higher customer engagement",
      ],
    },
    {
      icon: "ri-shield-star-line",
      title: "Special Business Verification",
      description:
        "Get a special verified badge on your business name and become a recommended supplier in search results for enhanced credibility.",
      benefits: [
        "Verified business badge",
        "Recommended supplier status",
        "Enhanced trust signals",
        "Premium business credibility",
      ],
    },
    {
      icon: "ri-bar-chart-box-line",
      title: "Comprehensive Business Analytics",
      description:
        "Get detailed insights into your profile performance, customer engagement, and business growth with advanced analytics dashboard.",
      benefits: [
        "Profile performance tracking",
        "Customer engagement metrics",
        "Lead conversion analysis",
        "Growth trend reports",
      ],
    },
    {
      icon: "ri-notification-badge-line",
      title: "Real-Time Lead Alerts",
      description:
        "Receive instant notifications for new leads and customer inquiries. Never miss a business opportunity with our alert system.",
      benefits: [
        "Instant lead notifications",
        "Email and SMS alerts",
        "Lead priority scoring",
        "Response time tracking",
      ],
    },
    {
      icon: "ri-headphone-line",
      title: "Dedicated Customer Service",
      description:
        "Get dedicated customer service support to help generate leads, create professional quotations, and grow your business.",
      benefits: [
        "Lead generation assistance",
        "Professional quotation tools",
        "Business growth consulting",
        "24/7 priority support",
      ],
    },
    {
      icon: "ri-file-text-line",
      title: "Professional Quotation System",
      description:
        "Create and send professional quotations to customers directly through the platform. Streamline your sales process and close deals faster.",
      benefits: [
        "Quotation builder tools",
        "Professional templates",
        "Digital signature support",
        "Quote tracking system",
      ],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="w-full px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {/* These could be wired to t('subscription.featuresTitle1/2') if desired */}
              Everything You Need to{" "}
              <span className="text-yellow-600"> Grow Your Business</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive subscription includes every feature and tool
              your business needs to attract customers, generate leads, and
              increase sales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all group hover:bg-white"
              >
                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-200 transition-colors">
                  <i className={`${feature.icon} text-yellow-600 text-2xl`}></i>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  {feature.description}
                </p>

                <div className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 text-xs">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-12 text-center text-white">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Business?
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of successful businesses that have accelerated
                their growth with our complete business solution. Get everything
                you need in one comprehensive plan.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">10,000+</div>
                  <div className="text-sm opacity-90">Active Businesses</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">500K+</div>
                  <div className="text-sm opacity-90">
                    Monthly Leads Generated
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">98%</div>
                  <div className="text-sm opacity-90">
                    Customer Satisfaction
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button className="bg-white text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all whitespace-nowrap cursor-pointer">
                  <i className="ri-rocket-line mr-2"></i>Start Your 30-Day Free
                  Trial
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-800 transition-all whitespace-nowrap cursor-pointer">
                  <i className="ri-phone-line mr-2"></i>Schedule Demo Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
