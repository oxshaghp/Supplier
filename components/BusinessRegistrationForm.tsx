
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BusinessRegistrationForm() {
  const [currentStep, setCurrentStep] = useState('register'); // 'register', 'verify', 'success'
  const [registrationData, setRegistrationData] = useState({
    businessName: '',
    phone: '',
    email: ''
  });
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const [verificationMethod, setVerificationMethod] = useState('phone'); // 'phone' or 'email'
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedCode] = useState(Math.floor(1000 + Math.random() * 9000).toString());

  const handleInputChange = (field, value) => {
    setRegistrationData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateRegistration = () => {
    const newErrors = {};
    
    if (!registrationData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    
    if (!registrationData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(registrationData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }
    
    if (!registrationData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(registrationData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateRegistration()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCurrentStep('verify');
    setIsSubmitting(false);
  };

  const handleVerificationCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.querySelector(`input[name="code-${index + 1}"]`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    
    const enteredCode = verificationCode.join('');
    if (enteredCode.length !== 4) {
      setErrors({ verification: 'Please enter the complete 4-digit code' });
      return;
    }
    
    if (enteredCode !== generatedCode) {
      setErrors({ verification: 'Invalid verification code. Please try again.' });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setCurrentStep('success');
    setIsSubmitting(false);
  };

  const resendCode = () => {
    setVerificationCode(['', '', '', '']);
    setErrors({});
    // In real implementation, this would trigger a new code to be sent
  };

  if (currentStep === 'register') {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-user-add-line text-yellow-600 text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
          <p className="text-gray-600">Enter your basic information to get started</p>
        </div>

        <form onSubmit={handleRegistrationSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Name *
            </label>
            <input
              type="text"
              value={registrationData.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm ${
                errors.businessName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your business name"
              required
            />
            {errors.businessName && (
              <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={registrationData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm ${
                errors.phone ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="+966 50 123 4567"
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={registrationData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="business@example.com"
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
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-yellow-400 text-white hover:bg-yellow-500'
            }`}
          >
            {isSubmitting ? (
              <>
                <i className="ri-loader-4-line animate-spin mr-2"></i>
                Creating Account...
              </>
            ) : (
              <>
                <i className="ri-arrow-right-line mr-2"></i>
                Continue to Verification
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-yellow-600 hover:text-yellow-700 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    );
  }

  if (currentStep === 'verify') {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-shield-check-line text-blue-600 text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Account</h2>
          <p className="text-gray-600 mb-4">
            We've sent a 4-digit verification code to verify your identity
          </p>
        </div>

        {/* Verification Method Selection */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Choose verification method:</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setVerificationMethod('phone')}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                verificationMethod === 'phone'
                  ? 'border-yellow-400 bg-yellow-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <i className="ri-phone-line text-lg text-gray-600"></i>
                <div>
                  <p className="font-medium text-gray-800">Phone</p>
                  <p className="text-sm text-gray-500">{registrationData.phone}</p>
                </div>
              </div>
            </button>
            
            <button
              type="button"
              onClick={() => setVerificationMethod('email')}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                verificationMethod === 'email'
                  ? 'border-yellow-400 bg-yellow-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <i className="ri-mail-line text-lg text-gray-600"></i>
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <p className="text-sm text-gray-500">{registrationData.email}</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-blue-800">
            <i className="ri-information-line mr-2"></i>
            For demo purposes, the verification code is: <strong>{generatedCode}</strong>
          </p>
        </div>

        <form onSubmit={handleVerificationSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Enter 4-digit verification code
            </label>
            <div className="flex space-x-3 justify-center">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  name={`code-${index}`}
                  value={digit}
                  onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
                  className="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  maxLength={1}
                />
              ))}
            </div>
            {errors.verification && (
              <p className="text-red-500 text-sm mt-3 text-center">{errors.verification}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-lg font-medium text-lg whitespace-nowrap cursor-pointer transition-all ${
              isSubmitting
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-yellow-400 text-white hover:bg-yellow-500'
            }`}
          >
            {isSubmitting ? (
              <>
                <i className="ri-loader-4-line animate-spin mr-2"></i>
                Verifying...
              </>
            ) : (
              <>
                <i className="ri-check-line mr-2"></i>
                Verify Account
              </>
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={resendCode}
              className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
            >
              Didn't receive the code? Resend
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setCurrentStep('register')}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            <i className="ri-arrow-left-line mr-1"></i>
            Back to Registration
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 'success') {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-check-line text-green-600 text-3xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Account Verified!</h2>
          <p className="text-gray-600 text-lg mb-6">
            Great! Your account has been successfully verified. Now let's complete your business profile to help customers find you.
          </p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-xl mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            <i className="ri-clipboard-line mr-2 text-yellow-600"></i>
            Complete Your Business Profile
          </h3>
          <p className="text-gray-700 mb-4">
            To get the most out of our platform, please provide the following information:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <i className="ri-check-line text-green-500 text-sm"></i>
                <span className="text-gray-700">Business Category & Type</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-check-line text-green-500 text-sm"></i>
                <span className="text-gray-700">Business Description</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-check-line text-green-500 text-sm"></i>
                <span className="text-gray-700">Services & Specialties</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <i className="ri-check-line text-green-500 text-sm"></i>
                <span className="text-gray-700">Business Address & Location</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-check-line text-green-500 text-sm"></i>
                <span className="text-gray-700">Working Hours</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-check-line text-green-500 text-sm"></i>
                <span className="text-gray-700">Target Customers</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Link 
            href="/complete-profile"
            className="w-full bg-yellow-400 text-white py-4 px-6 rounded-lg hover:bg-yellow-500 font-medium text-lg text-center whitespace-nowrap cursor-pointer block"
          >
            <i className="ri-edit-line mr-2"></i>
            Complete Business Profile
          </Link>
          
          <Link 
            href="/"
            className="w-full border border-gray-300 text-gray-700 py-4 px-6 rounded-lg hover:bg-gray-50 font-medium text-lg text-center whitespace-nowrap cursor-pointer block"
          >
            <i className="ri-home-line mr-2"></i>
            Skip for Now - Go to Homepage
          </Link>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-xl">
          <div className="flex items-start space-x-3">
            <i className="ri-lightbulb-line text-blue-600 text-xl mt-1"></i>
            <div>
              <h4 className="text-blue-800 font-semibold mb-2">Why complete your profile?</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Get discovered by more potential customers</li>
                <li>• Appear higher in search results</li>
                <li>• Build trust with detailed business information</li>
                <li>• Receive direct inquiries and contact requests</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
