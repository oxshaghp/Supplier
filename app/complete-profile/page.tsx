"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CompleteProfileForm from "../../components/CompleteProfileForm";
import BusinessLocationMap from "../../components/BusinessLocationMap";
import { useLanguage } from "@/lib/LanguageContext";
import { FormData } from "@/lib/types";
import { initialFormData } from "@/lib/initialData";

export default function CompleteProfilePage() {
  const { t } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 24.7136,
    lng: 46.6753,
  });

  // State لتتبع الخطوة الحالية
  const [currentStep, setCurrentStep] = useState(1);

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

          {/* التعديل الرئيسي هنا */}
          <div
            className={`max-w-7xl mx-auto px-6 ${
              currentStep >= 4 // تغيير الشرط هنا
                ? "grid grid-cols-1 gap-8" // من الخطوة 4 فما فوق: عمود واحد فقط
                : "grid grid-cols-1 lg:grid-cols-2 gap-12" // في الخطوات 1,2,3: عمودين
            }`}
          >
            {/* النموذج */}
            <div
              className={currentStep >= 4 ? "order-1" : "order-2 lg:order-1"}
            >
              <CompleteProfileForm
                formData={formData}
                setFormData={setFormData}
                selectedLocation={selectedLocation}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            </div>

            {/* الخريطة */}
            <div
              className={currentStep >= 4 ? "order-2" : "order-1 lg:order-2"}
            >
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
