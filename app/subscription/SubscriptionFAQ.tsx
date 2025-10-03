"use client";

import { useState } from "react";

export default function SubscriptionFAQ() {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      question: "What makes this different from free business listings?",
      answer:
        "Our premium subscription gives you everything needed to grow: direct customer communication, featured homepage placement, verified business badge, real-time lead alerts, professional quotation tools, and dedicated customer service. Free listings are basic profiles - our subscription transforms your business presence and actively generates leads.",
    },
    {
      question:
        "How does the direct messaging and contact request system work?",
      answer:
        "Customers can send direct contact requests through your profile, message you in real-time, and access your procurement/sales team numbers. You get instant notifications via email and SMS for every inquiry, ensuring you never miss a potential customer or business opportunity.",
    },
    {
      question: 'What does "featured business placement" include?',
      answer:
        "Your business appears prominently on our homepage featured section, gets priority ranking in all search results, and shows up first when customers browse your category. This dramatically increases your visibility and attracts significantly more customers to your business.",
    },
    {
      question:
        "How does the special verification and recommended supplier status work?",
      answer:
        'You receive a special verified badge next to your business name, gain "Recommended Supplier" status in search results, and get enhanced credibility signals. This builds trust with customers and significantly increases your chances of being chosen over competitors.',
    },
    {
      question: "What kind of analytics and insights do I get?",
      answer:
        "Comprehensive dashboard showing profile views, customer engagement, lead sources, conversion rates, response times, and growth trends. Plus real-time alerts for new leads, competitor analysis, and detailed reports to help you make data-driven business decisions.",
    },
    {
      question: "How does the quotation generation system work?",
      answer:
        "Professional quotation builder with customizable templates, automated calculations, digital signatures, and quote tracking. Send professional proposals directly through the platform, track quote status, and get notified when customers view or respond to your quotations.",
    },
    {
      question: "Can I manage multiple business locations?",
      answer:
        "Yes! Pin unlimited locations on the map, manage each branch separately with unique contact information and working hours, track performance by location, and help customers find your nearest branch automatically.",
    },
    {
      question: "What kind of customer service support do I get?",
      answer:
        "24/7 priority support, dedicated account manager, lead generation assistance, business growth consulting, training sessions, and phone support. Our team actively helps you optimize your profile and generate more leads.",
    },
    {
      question: "Is there a contract or can I cancel anytime?",
      answer:
        "No contracts required - cancel anytime with just one click. We offer a 30-day money-back guarantee, so you can try all features risk-free. Most businesses see significant results within the first month.",
    },
    {
      question: "How quickly will I start seeing results?",
      answer:
        "Most businesses see increased inquiries within 24-48 hours of activation. Featured placement and verified status are applied immediately, and our customer service team helps optimize your profile for maximum lead generation from day one.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="w-full px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our comprehensive business
              growth solution
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                  className="w-full text-left p-6 focus:outline-none hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 pr-8">
                      {faq.question}
                    </h3>
                    <div
                      className={`transform transition-transform duration-200 ${
                        openFAQ === index ? "rotate-180" : ""
                      }`}
                    >
                      <i className="ri-arrow-down-s-line text-xl text-gray-500"></i>
                    </div>
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openFAQ === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white rounded-2xl p-8 text-center shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our business experts are here to help you understand how our
              platform can transform your business growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-yellow-400 text-white px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-all whitespace-nowrap cursor-pointer">
                <i className="ri-chat-3-line mr-2"></i>
                Chat with Expert
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all whitespace-nowrap cursor-pointer">
                <i className="ri-phone-line mr-2"></i>
                Schedule Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
