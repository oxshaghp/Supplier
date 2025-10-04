"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../lib/LanguageContext";

export default function BusinessRegistrationForm() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState("register"); // 'register', 'verify', 'success'
  const [registrationData, setRegistrationData] = useState({
    businessName: "",
    phone: "",
    email: "",
  });
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [verificationMethod, setVerificationMethod] = useState("phone"); // 'phone' or 'email'
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedCode] = useState(
    Math.floor(1000 + Math.random() * 9000).toString()
  );

  const handleInputChange = (field, value) => {
    setRegistrationData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateRegistration = () => {
    const newErrors = {};
    if (!registrationData.businessName.trim()) {
      newErrors.businessName = t("business.errors.businessNameRequired");
    }
    if (!registrationData.phone.trim()) {
      newErrors.phone = t("business.errors.phoneRequired");
    } else {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(registrationData.phone)) {
        newErrors.phone = t("business.errors.phoneInvalid");
      }
    }
    if (!registrationData.email.trim()) {
      newErrors.email = t("business.errors.emailRequired");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(registrationData.email)) {
        newErrors.email = t("business.errors.emailInvalid");
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    if (!validateRegistration()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentStep("verify");
    setIsSubmitting(false);
  };

  const handleVerificationCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      if (value && index < 3) {
        const nextInput = document.querySelector(
          `input[name="code-${index + 1}"]`
        );
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    const enteredCode = verificationCode.join("");
    if (enteredCode.length !== 4) {
      setErrors({ verification: t("business.errors.verificationIncomplete") });
      return;
    }
    if (enteredCode !== generatedCode) {
      setErrors({ verification: t("business.errors.verificationInvalid") });
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setCurrentStep("success");
    setIsSubmitting(false);
  };

  const resendCode = () => {
    setVerificationCode(["", "", "", ""]);
    setErrors({});
  };

  // REGISTER STEP
  if (currentStep === "register") {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-user-add-line text-yellow-600 text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t("business.form.createAccountTitle")}
          </h2>
          <p className="text-gray-600">
            {t("business.form.enterInfoSubtitle")}
          </p>
        </div>

        <form onSubmit={handleRegistrationSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("business.form.businessNameLabel")}
            </label>
            <input
              type="text"
              value={registrationData.businessName}
              onChange={(e) =>
                handleInputChange("businessName", e.target.value)
              }
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm ${
                errors.businessName ? "border-red-300" : "border-gray-300"
              }`}
              placeholder={t("business.form.businessNamePlaceholder")}
              required
            />
            {errors.businessName && (
              <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("business.form.phoneLabel")}
            </label>
            <input
              type="tel"
              value={registrationData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm ${
                errors.phone ? "border-red-300" : "border-gray-300"
              }`}
              placeholder={t("business.form.phonePlaceholder")}
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("business.form.emailLabel")}
            </label>
            <input
              type="email"
              value={registrationData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm ${
                errors.email ? "border-red-300" : "border-gray-300"
              }`}
              placeholder={t("business.form.emailPlaceholder")}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-lg font-medium text-lg whitespace-nowrap cursor-pointer transition-all ${
              isSubmitting
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-yellow-400 text-white hover:bg-yellow-500"
            }`}
          >
            {isSubmitting
              ? t("business.form.continueButtonSubmitting")
              : t("business.form.continueButton")}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            {t("business.form.alreadyAccount")}{" "}
            <Link
              href="/login"
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              {t("business.form.signIn")}
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // VERIFY STEP
  if (currentStep === "verify") {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-shield-check-line text-blue-600 text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t("business.form.verifyAccountTitle")}
          </h2>
          <p className="text-gray-600 mb-4">
            {t("business.form.verifyAccountSubtitle")}
          </p>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">
            {t("business.form.chooseVerification")}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setVerificationMethod("phone")}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                verificationMethod === "phone"
                  ? "border-yellow-400 bg-yellow-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                <i className="ri-phone-line text-lg text-gray-600"></i>
                <div>
                  <p className="font-medium text-gray-800">
                    {t("business.form.phone")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {registrationData.phone}
                  </p>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setVerificationMethod("email")}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                verificationMethod === "email"
                  ? "border-yellow-400 bg-yellow-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                <i className="ri-mail-line text-lg text-gray-600"></i>
                <div>
                  <p className="font-medium text-gray-800">
                    {t("business.form.email")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {registrationData.email}
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-blue-800">
            <i className="ri-information-line mr-2"></i>
            {t("business.form.demoCode")} <strong>{generatedCode}</strong>
          </p>
        </div>

        <form onSubmit={handleVerificationSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t("business.form.enterVerificationCode")}
            </label>
            <div className="flex space-x-3 justify-center">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  name={`code-${index}`}
                  value={digit}
                  onChange={(e) =>
                    handleVerificationCodeChange(index, e.target.value)
                  }
                  className="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  maxLength={1}
                />
              ))}
            </div>
            {errors.verification && (
              <p className="text-red-500 text-sm mt-3 text-center">
                {errors.verification}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-lg font-medium text-lg whitespace-nowrap cursor-pointer transition-all ${
              isSubmitting
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-yellow-400 text-white hover:bg-yellow-500"
            }`}
          >
            {isSubmitting
              ? t("business.form.verifying")
              : t("business.form.verifyButton")}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={resendCode}
              className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
            >
              {t("business.form.resendCode")}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setCurrentStep("register")}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            <i className="ri-arrow-left-line mr-1"></i>
            {t("business.form.backToRegistration")}
          </button>
        </div>
      </div>
    );
  }

  // SUCCESS STEP
  if (currentStep === "success") {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-check-line text-green-600 text-3xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t("business.form.accountVerified")}
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            {t("business.form.successMessage")}
          </p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-xl mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            <i className="ri-clipboard-line mr-2 text-yellow-600"></i>
            {t("business.form.completeProfileTitle")}
          </h3>
          <p className="text-gray-700 mb-4">
            {t("business.form.completeProfileSubtitle")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {t("business.form.profileChecklist", { returnObjects: true }).map(
              (item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <i className="ri-check-line text-green-500 text-sm"></i>
                  <span className="text-gray-700">{item}</span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Link
            href="/complete-profile"
            className="w-full bg-yellow-400 text-white py-4 px-6 rounded-lg hover:bg-yellow-500 font-medium text-lg text-center whitespace-nowrap cursor-pointer block"
          >
            <i className="ri-edit-line mr-2"></i>
            {t("business.form.completeProfileButton")}
          </Link>

          <Link
            href="/"
            className="w-full border border-gray-300 text-gray-700 py-4 px-6 rounded-lg hover:bg-gray-50 font-medium text-lg text-center whitespace-nowrap cursor-pointer block"
          >
            <i className="ri-home-line mr-2"></i>
            {t("business.form.skipButton")}
          </Link>
        </div>
      </div>
    );
  }
}
