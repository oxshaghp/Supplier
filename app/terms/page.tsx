
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-12">
        <div className="w-full px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Terms of Service</h1>
              <p className="text-gray-600 text-lg">
                Last updated: January 2024
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 space-y-8">
              
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Agreement to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing and using Supplier.sa, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Use License</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Permission is granted to temporarily download one copy of the materials on Supplier.sa for personal, 
                  non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained on the website</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Business Listings</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  When you create a business listing on Supplier.sa, you agree to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Provide accurate and truthful information about your business</li>
                  <li>Keep your business information up to date</li>
                  <li>Respond to customer inquiries in a timely manner</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Not use the platform for fraudulent or illegal activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. User Accounts</h2>
                <p className="text-gray-600 leading-relaxed">
                  You are responsible for safeguarding the password and for any activities that occur under your account. 
                  You agree not to disclose your password to any third party and to take sole responsibility for activities 
                  that happen under your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Privacy Policy</h2>
                <p className="text-gray-600 leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of 
                  the Service, to understand our practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Prohibited Uses</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You may not use our service:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations or laws</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Service Availability</h2>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to withdraw or amend our service, and any service or material we provide on the website, 
                  in our sole discretion without notice. We do not warrant that our service will be uninterrupted, timely, 
                  secure, or error-free.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Limitation of Liability</h2>
                <p className="text-gray-600 leading-relaxed">
                  In no case shall Supplier.sa, its directors, officers, employees, affiliates, agents, contractors, 
                  interns, suppliers, service providers, or licensors be liable for any injury, loss, claim, or any direct, 
                  indirect, incidental, punitive, special, or consequential damages of any kind.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Governing Law</h2>
                <p className="text-gray-600 leading-relaxed">
                  These terms and conditions are governed by and construed in accordance with the laws of Saudi Arabia 
                  and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Changes to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                  If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
                <p className="text-gray-600 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <p className="text-gray-700">
                    <strong>Email:</strong> legal@supplier.sa<br />
                    <strong>Phone:</strong> +966 11 123 4567<br />
                    <strong>Address:</strong> Riyadh, Saudi Arabia
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
