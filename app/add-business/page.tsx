
'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BusinessRegistrationForm from '../../components/BusinessRegistrationForm';

export default function AddBusinessPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="py-16 bg-gradient-to-b from-yellow-50 to-white">
          <div className="w-full px-6">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-800 mb-4">Register Your Business</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Start by creating your account, then complete your business profile to get discovered by customers.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <BusinessRegistrationForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
