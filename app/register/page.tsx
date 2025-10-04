"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext"; // عدل المسار حسب مكانك

export default function RegisterPage() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    phone: "",
    email: "",
  });
  const [verificationMethod, setVerificationMethod] = useState("");
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleDemoStep1 = () => {
    setFormData({
      businessName: "Demo Business Solutions",
      phone: "+966 50 123 4567",
      email: "demo@business.com",
    });
    setStep(2);
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    handleDemoStep1();
  };

  const handleVerificationMethodSelect = (method) => {
    setVerificationMethod(method);
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setStep(3);
    }, 2000);
  };

  const handleDemoVerification = () => {
    setVerificationCode(["1", "2", "3", "4"]);
    setTimeout(() => {
      setStep(4);
    }, 500);
  };

  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyCode = () => {
    const code = verificationCode.join("");
    if (code.length === 4) {
      setStep(4);
    } else {
      setErrors({ code: t("register.errors.codeIncomplete") });
    }
  };

  const handleCompleteRegistration = () => {
    localStorage.setItem(
      "registrationData",
      JSON.stringify({
        ...formData,
        verificationMethod,
        verifiedAt: new Date().toISOString(),
      })
    );

    router.push("/complete-profile");
  };

  const renderStep1 = () => (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-store-line text-white text-2xl"></i>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {t("register.step1.title")}
        </h1>
        <p className="text-gray-600">{t("register.step1.subtitle")}</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2">
          <i className="ri-information-line text-blue-600"></i>
          <span className="text-blue-800 font-medium text-sm">
            {t("register.demoNotice.title")}
          </span>
        </div>
        <p className="text-blue-700 text-sm mt-1">
          {t("register.demoNotice.message")}
        </p>
      </div>

      <form onSubmit={handleStep1Submit} className="space-y-6">
        <div>
          <label
            htmlFor="businessName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t("register.step1.businessNameLabel")}
          </label>
          <input
            type="text"
            id="businessName"
            value={formData.businessName}
            onChange={(e) => handleInputChange("businessName", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            placeholder={t("register.step1.businessNamePlaceholder")}
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t("register.step1.phoneLabel")}
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            placeholder={t("register.step1.phonePlaceholder")}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t("register.step1.emailLabel")}
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            placeholder={t("register.step1.emailPlaceholder")}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 text-white py-3 px-6 rounded-lg hover:bg-yellow-500 font-semibold whitespace-nowrap cursor-pointer"
        >
          {t("register.step1.button")}
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-600">
          {t("register.step1.haveAccount")}{" "}
          <Link
            href="/login"
            className="text-yellow-600 hover:text-yellow-700 font-medium"
          >
            {t("register.step1.signinLink")}
          </Link>
        </p>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-shield-check-line text-white text-2xl"></i>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {t("register.step2.title")}
        </h1>
        <p className="text-gray-600">{t("register.step2.subtitle")}</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2">
          <i className="ri-information-line text-blue-600"></i>
          <span className="text-blue-800 font-medium text-sm">
            {t("register.demoNotice.title")}
          </span>
        </div>
        <p className="text-blue-700 text-sm mt-1">
          {t("register.step2.demoMessage")}
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => handleVerificationMethodSelect("phone")}
          disabled={isVerifying}
          className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <i className="ri-phone-line text-green-600 text-xl"></i>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">
                {t("register.step2.phoneTitle")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("register.step2.phoneSubtitle")}
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => handleVerificationMethodSelect("email")}
          disabled={isVerifying}
          className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <i className="ri-mail-line text-blue-600 text-xl"></i>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">
                {t("register.step2.emailTitle")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("register.step2.emailSubtitle")}
              </p>
            </div>
          </div>
        </button>
      </div>

      {isVerifying && (
        <div className="text-center mt-8">
          <div className="w-8 h-8 bg-yellow-400 rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-600">{t("register.step2.sending")}</p>
        </div>
      )}

      <div className="text-center mt-6">
        <button
          onClick={() => setStep(1)}
          className="text-gray-500 hover:text-gray-700 font-medium"
        >
          ← {t("register.step2.backButton")}
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-key-line text-white text-2xl"></i>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {t("register.step3.title")}
        </h1>
        <p className="text-gray-600">
          {t("register.step3.subtitle")}{" "}
          {verificationMethod === "phone"
            ? t("register.step3.phone")
            : t("register.step3.email")}
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2">
          <i className="ri-information-line text-blue-600"></i>
          <span className="text-blue-800 font-medium text-sm">
            {t("register.demoNotice.title")}
          </span>
        </div>
        <p className="text-blue-700 text-sm mt-1">
          {t("register.step3.demoMessage")}
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center space-x-4">
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleCodeKeyDown(index, e)}
              className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              maxLength={1}
            />
          ))}
        </div>

        {errors.code && (
          <p className="text-red-600 text-sm text-center">{errors.code}</p>
        )}

        <div className="space-y-3">
          <button
            onClick={handleDemoVerification}
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 font-semibold whitespace-nowrap cursor-pointer"
          >
            {t("register.step3.autoFillButton")}
          </button>

          <button
            onClick={handleVerifyCode}
            className="w-full bg-yellow-400 text-white py-3 px-6 rounded-lg hover:bg-yellow-500 font-semibold whitespace-nowrap cursor-pointer"
          >
            {t("register.step3.verifyButton")}
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={() => handleVerificationMethodSelect(verificationMethod)}
            className="text-yellow-600 hover:text-yellow-700 font-medium text-sm"
          >
            {t("register.step3.resendCode")}
          </button>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => setStep(2)}
          className="text-gray-500 hover:text-gray-700 font-medium"
        >
          ← {t("register.step3.backButton")}
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-check-line text-white text-2xl"></i>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {t("register.step4.title")}
        </h1>
        <p className="text-gray-600">{t("register.step4.subtitle")}</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-gray-800 mb-4">
          {t("register.step4.completeTitle")}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {t("register.step4.completeSubtitle")}
        </p>
        <ul className="space-y-2 text-sm text-gray-600">
          {Array.isArray(t("register.step4.checklist", { returnObjects: true }))
            ? t("register.step4.checklist", { returnObjects: true }).map(
                (item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <i className="ri-check-line text-green-600"></i>
                    <span>{item}</span>
                  </li>
                )
              )
            : null}
        </ul>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleCompleteRegistration}
          className="w-full bg-yellow-400 text-white py-3 px-6 rounded-lg hover:bg-yellow-500 font-semibold whitespace-nowrap cursor-pointer"
        >
          {t("register.step4.completeButton")}
        </button>

        <button
          onClick={() => router.push("/")}
          className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 font-semibold whitespace-nowrap cursor-pointer"
        >
          {t("register.step4.skipButton")}
        </button>
      </div>

      <div className="text-center mt-6">
        <p className="text-xs text-gray-500">{t("register.step4.note")}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="py-12">
        <div className="w-full px-6">
          <div className="max-w-md mx-auto mb-12">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step >= stepNumber
                        ? "bg-yellow-400 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step > stepNumber ? (
                      <i className="ri-check-line"></i>
                    ) : (
                      stepNumber
                    )}
                  </div>
                  {stepNumber < 4 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        step > stepNumber ? "bg-yellow-400" : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>{t("register.progress.register")}</span>
              <span>{t("register.progress.verify")}</span>
              <span>{t("register.progress.code")}</span>
              <span>{t("register.progress.complete")}</span>
            </div>
          </div>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>
      </main>

      <Footer />
    </div>
  );
}
