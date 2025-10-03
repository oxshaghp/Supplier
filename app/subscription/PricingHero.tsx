"use client";

import { useRouter } from "next/navigation";

export default function PricingHero() {
  const router = useRouter();
  return (
    <section
      className="relative py-24 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 overflow-hidden"
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20business%20office%20environment%20with%20professional%20team%20collaboration%2C%20clean%20workspace%20with%20computers%20and%20documents%2C%20bright%20natural%20lighting%20from%20large%20windows%2C%20contemporary%20corporate%20setting%20with%20yellow%20and%20orange%20accent%20colors%2C%20minimalist%20design%20aesthetic%2C%20successful%20business%20atmosphere&width=1200&height=600&seq=subscription-hero&orientation=landscape')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative w-full px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
            <i className="ri-vip-crown-line text-yellow-300"></i>
            <span className="text-sm font-medium">
              All-in-One Business Solution
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Your Business with
            <span className="text-yellow-300"> One Complete Plan</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get every premium feature, advanced tool, and growth opportunity in
            one comprehensive subscription. No tiers, no limits, just everything
            you need to succeed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <button
              onClick={() => router.push("/auth")}
              className="bg-white text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer"
            >
              <i className="ri-rocket-line mr-2"></i>
              Start Your Success Story
            </button>
            <button
              onClick={() => router.push("/subscription#how-it-works")}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-800 transition-all whitespace-nowrap cursor-pointer"
            >
              <i className="ri-play-circle-line mr-2"></i>
              See How It Works
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center mb-4 mx-auto">
                <i className="ri-customer-service-2-line text-gray-800 text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Direct Communication
              </h3>
              <p className="text-gray-200 text-sm">
                Get contacted directly by customers and procurement teams
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center mb-4 mx-auto">
                <i className="ri-map-pin-line text-gray-800 text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Featured Placement</h3>
              <p className="text-gray-200 text-sm">
                Appear first on homepage and in all search results
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center mb-4 mx-auto">
                <i className="ri-shield-star-line text-gray-800 text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Special Verification
              </h3>
              <p className="text-gray-200 text-sm">
                Get verified badge and recommended supplier status
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center mb-4 mx-auto">
                <i className="ri-line-chart-line text-gray-800 text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Analytics</h3>
              <p className="text-gray-200 text-sm">
                Real-time leads alerts and comprehensive business insights
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-4 text-lg font-semibold">
              <div className="flex items-center space-x-2">
                <i className="ri-check-line text-green-300"></i>
                <span>30-Day Free Trial</span>
              </div>
              <div className="w-px h-6 bg-white/30"></div>
              <div className="flex items-center space-x-2">
                <i className="ri-shield-check-line text-green-300"></i>
                <span>Cancel Anytime</span>
              </div>
              <div className="w-px h-6 bg-white/30"></div>
              <div className="flex items-center space-x-2">
                <i className="ri-customer-service-line text-green-300"></i>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
