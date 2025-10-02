
'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    phone: '',
    email: ''
  });
  const [verificationMethod, setVerificationMethod] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Demo function - auto-fill form and proceed
  const handleDemoStep1 = () => {
    setFormData({
      businessName: 'Demo Business Solutions',
      phone: '+966 50 123 4567',
      email: 'demo@business.com'
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
    
    // Simulate sending verification code
    setTimeout(() => {
      setIsVerifying(false);
      setStep(3);
    }, 2000);
  };

  // Demo function - auto-fill verification code
  const handleDemoVerification = () => {
    setVerificationCode(['1', '2', '3', '4']);
    setTimeout(() => {
      setStep(4);
    }, 500);
  };

  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyCode = () => {
    const code = verificationCode.join('');
    if (code.length === 4) {
      setStep(4);
    } else {
      setErrors({ code: 'Please enter all 4 digits' });
    }
  };

  const handleCompleteRegistration = () => {
    // Save basic registration data (in real app, this would go to backend)
    localStorage.setItem('registrationData', JSON.stringify({
      ...formData,
      verificationMethod,
      verifiedAt: new Date().toISOString()
    }));
    
    // Redirect to complete profile page
    router.push('/complete-profile');
  };

  const renderStep1 = () => (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-store-line text-white text-2xl"></i>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Register Your Business</h1>
        <p className="text-gray-600">Start by providing your basic business information</p>
      </div>

      {/* Demo Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2">
          <i className="ri-information-line text-blue-600"></i>
          <span className="text-blue-800 font-medium text-sm">Demo Mode</span>
        </div>
        <p className="text-blue-700 text-sm mt-1">
          Click "Continue Demo" to proceed without filling out the form
        </p>
      </div>

      <form onSubmit={handleStep1Submit} className="space-y-6">
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
            Business Name *
          </label>
          <input
            type="text"
            id="businessName"
            value={formData.businessName}
            onChange={(e) => handleInputChange('businessName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            placeholder="Enter your business name"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            placeholder="+966 50 123 4567"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            placeholder="business@example.com"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 text-white py-3 px-6 rounded-lg hover:bg-yellow-500 font-semibold whitespace-nowrap cursor-pointer"
        >
          Continue Demo
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-yellow-600 hover:text-yellow-700 font-medium">
            Sign in here
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Verify Your Account</h1>
        <p className="text-gray-600">Choose how you'd like to receive your verification code</p>
      </div>

      {/* Demo Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2">
          <i className="ri-information-line text-blue-600"></i>
          <span className="text-blue-800 font-medium text-sm">Demo Mode</span>
        </div>
        <p className="text-blue-700 text-sm mt-1">
          Click any verification method to continue the demo
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => handleVerificationMethodSelect('phone')}
          disabled={isVerifying}
          className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <i className="ri-phone-line text-green-600 text-xl"></i>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Verify by Phone</h3>
              <p className="text-gray-600 text-sm">Send code to +966 50 123 4567</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => handleVerificationMethodSelect('email')}
          disabled={isVerifying}
          className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <i className="ri-mail-line text-blue-600 text-xl"></i>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Verify by Email</h3>
              <p className="text-gray-600 text-sm">Send code to demo@business.com</p>
            </div>
          </div>
        </button>
      </div>

      {isVerifying && (
        <div className="text-center mt-8">
          <div className="w-8 h-8 bg-yellow-400 rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-600">Sending verification code...</p>
        </div>
      )}

      <div className="text-center mt-6">
        <button
          onClick={() => setStep(1)}
          className="text-gray-500 hover:text-gray-700 font-medium"
        >
          ← Back to registration
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Enter Verification Code</h1>
        <p className="text-gray-600">
          We sent a 4-digit code to your {verificationMethod === 'phone' ? 'phone' : 'email'}
        </p>
      </div>

      {/* Demo Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2">
          <i className="ri-information-line text-blue-600"></i>
          <span className="text-blue-800 font-medium text-sm">Demo Mode</span>
        </div>
        <p className="text-blue-700 text-sm mt-1">
          Click "Auto-Fill Demo Code" to proceed automatically
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
            Auto-Fill Demo Code
          </button>

          <button
            onClick={handleVerifyCode}
            className="w-full bg-yellow-400 text-white py-3 px-6 rounded-lg hover:bg-yellow-500 font-semibold whitespace-nowrap cursor-pointer"
          >
            Verify Code
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={() => handleVerificationMethodSelect(verificationMethod)}
            className="text-yellow-600 hover:text-yellow-700 font-medium text-sm"
          >
            Didn't receive the code? Resend
          </button>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => setStep(2)}
          className="text-gray-500 hover:text-gray-700 font-medium"
        >
          ← Change verification method
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Account Verified!</h1>
        <p className="text-gray-600">
          Congratulations! Your account has been successfully verified.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-gray-800 mb-4">Complete Your Business Profile</h3>
        <p className="text-gray-600 text-sm mb-4">
          To get the most out of our platform, we recommend completing your full business profile with:
        </p>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center space-x-2">
            <i className="ri-check-line text-green-600"></i>
            <span>Business category and description</span>
          </li>
          <li className="flex items-center space-x-2">
            <i className="ri-check-line text-green-600"></i>
            <span>Target customers and service area</span>
          </li>
          <li className="flex items-center space-x-2">
            <i className="ri-check-line text-green-600"></i>
            <span>Business address and working hours</span>
          </li>
          <li className="flex items-center space-x-2">
            <i className="ri-check-line text-green-600"></i>
            <span>Services offered and contact details</span>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleCompleteRegistration}
          className="w-full bg-yellow-400 text-white py-3 px-6 rounded-lg hover:bg-yellow-500 font-semibold whitespace-nowrap cursor-pointer"
        >
          Complete Profile Now
        </button>
        
        <button
          onClick={() => router.push('/')}
          className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 font-semibold whitespace-nowrap cursor-pointer"
        >
          Skip for Now
        </button>
      </div>

      <div className="text-center mt-6">
        <p className="text-xs text-gray-500">
          You can complete your profile anytime from your dashboard
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-12">
        <div className="w-full px-6">
          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-12">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= stepNumber 
                      ? 'bg-yellow-400 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > stepNumber ? (
                      <i className="ri-check-line"></i>
                    ) : (
                      stepNumber
                    )}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step > stepNumber ? 'bg-yellow-400' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Register</span>
              <span>Verify</span>
              <span>Code</span>
              <span>Complete</span>
            </div>
          </div>

          {/* Step Content */}
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
