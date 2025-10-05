"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CompleteProfileForm from "../../components/CompleteProfileForm";
import BusinessLocationMap from "../../components/BusinessLocationMap";
import { useLanguage } from "@/lib/LanguageContext";
import { FormData } from "@/lib/types"; // استدعي الـ FormData
import { initialFormData } from "@/lib/initialData";

export default function CompleteProfilePage() {
  const { t } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 24.7136,
    lng: 46.6753,
  });

  // هذا هو السطر الصحيح - داخل الـ function
  const [formData, setFormData] = useState<FormData>(initialFormData);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="py-16 bg-gradient-to-b from-yellow-50 to-white">
          <div className="w-full px-6">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-800 mb-4">
                {t("completeProfile.title")}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("completeProfile.subtitle")}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* النموذج */}
            <div className="order-2 lg:order-1">
              <CompleteProfileForm
                formData={formData}
                setFormData={setFormData}
                selectedLocation={selectedLocation}
              />
            </div>

            {/* الخريطة */}
            <div className="order-1 lg:order-2">
              <BusinessLocationMap
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
