'use client';

import { useState } from 'react';

export default function SystemSettings() {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Business Directory Platform',
      siteDescription: 'Connect businesses with customers across Saudi Arabia',
      contactEmail: 'admin@businessdirectory.com',
      supportEmail: 'support@businessdirectory.com',
      timezone: 'Asia/Riyadh',
      language: 'en',
      maintenanceMode: false
    },
    business: {
      autoApproval: false,
      requiredFields: ['name', 'email', 'phone', 'category'],
      maxPhotos: 10,
      maxDescription: 500,
      verificationRequired: true,
      premiumFeaturesEnabled: true
    },
    payments: {
      currency: 'SAR',
      basicPlanPrice: 0,
      premiumPlanPrice: 290,
      enterprisePlanPrice: 990,
      paymentGateway: 'stripe',
      taxRate: 15,
      invoicePrefix: 'INV-'
    },
    security: {
      twoFactorRequired: false,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordStrengthRequired: true,
      dataEncryption: true,
      backupRetention: 30
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      marketingEmails: true,
      systemAlerts: true,
      maintenanceNotifications: true
    },
    api: {
      rateLimit: 1000,
      apiKeysEnabled: true,
      webhooksEnabled: true,
      corsEnabled: true,
      apiVersioning: true,
      documentationUrl: 'https://api.businessdirectory.com/docs'
    }
  });

  const sections = [
    { id: 'general', name: 'General Settings', icon: 'ri-settings-3-line' },
    { id: 'business', name: 'Business Rules', icon: 'ri-store-line' },
    { id: 'payments', name: 'Payment Settings', icon: 'ri-money-dollar-circle-line' },
    { id: 'security', name: 'Security & Privacy', icon: 'ri-shield-check-line' },
    { id: 'notifications', name: 'Notifications', icon: 'ri-notification-3-line' },
    { id: 'api', name: 'API Configuration', icon: 'ri-code-line' }
  ];

  const handleSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    // Here you would save settings to your backend
  };

  const handleSystemBackup = () => {
    console.log('Creating system backup...');
    // Here you would trigger system backup
  };

  const handleSystemReset = () => {
    if (confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      console.log('Resetting system settings...');
      // Here you would reset settings
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">System Settings</h2>
        <div className="flex space-x-3">
          <button
            onClick={handleSystemBackup}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-medium text-sm whitespace-nowrap cursor-pointer"
          >
            <i className="ri-backup-line mr-2"></i>
            Create Backup
          </button>
          <button
            onClick={handleSaveSettings}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 font-medium text-sm whitespace-nowrap cursor-pointer"
          >
            <i className="ri-save-line mr-2"></i>
            Save Changes
          </button>
        </div>
      </div>

      {/* Settings Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-6 px-6 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer transition-all ${
                  activeSection === section.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className={`${section.icon} mr-2`}></i>
                {section.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* General Settings */}
          {activeSection === 'general' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                  <input
                    type="text"
                    value={settings.general.siteName}
                    onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={settings.general.contactEmail}
                    onChange={(e) => handleSettingChange('general', 'contactEmail', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                  <input
                    type="email"
                    value={settings.general.supportEmail}
                    onChange={(e) => handleSettingChange('general', 'supportEmail', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={settings.general.timezone}
                    onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm pr-8"
                  >
                    <option value="Asia/Riyadh">Asia/Riyadh (GMT+3)</option>
                    <option value="Asia/Dubai">Asia/Dubai (GMT+4)</option>
                    <option value="UTC">UTC (GMT+0)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                <textarea
                  value={settings.general.siteDescription}
                  onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">{settings.general.siteDescription.length}/500 characters</p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.general.maintenanceMode}
                    onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
                  />
                  <div>
                    <span className="font-medium text-gray-800">Maintenance Mode</span>
                    <p className="text-sm text-gray-600">Enable this to put the site in maintenance mode for users</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Business Rules */}
          {activeSection === 'business' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Photos per Business</label>
                  <input
                    type="number"
                    value={settings.business.maxPhotos}
                    onChange={(e) => handleSettingChange('business', 'maxPhotos', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Description Length</label>
                  <input
                    type="number"
                    value={settings.business.maxDescription}
                    onChange={(e) => handleSettingChange('business', 'maxDescription', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.business.autoApproval}
                    onChange={(e) => handleSettingChange('business', 'autoApproval', e.target.checked)}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
                  />
                  <div>
                    <span className="font-medium text-gray-800">Auto-approve Business Listings</span>
                    <p className="text-sm text-gray-600">Automatically approve new business listings without manual review</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.business.verificationRequired}
                    onChange={(e) => handleSettingChange('business', 'verificationRequired', e.target.checked)}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
                  />
                  <div>
                    <span className="font-medium text-gray-800">Require Business Verification</span>
                    <p className="text-sm text-gray-600">Require businesses to verify their information before listing</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.business.premiumFeaturesEnabled}
                    onChange={(e) => handleSettingChange('business', 'premiumFeaturesEnabled', e.target.checked)}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
                  />
                  <div>
                    <span className="font-medium text-gray-800">Enable Premium Features</span>
                    <p className="text-sm text-gray-600">Allow businesses to access premium features with paid plans</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Payment Settings */}
          {activeSection === 'payments' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Basic Plan Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">SAR</span>
                    <input
                      type="number"
                      value={settings.payments.basicPlanPrice}
                      onChange={(e) => handleSettingChange('payments', 'basicPlanPrice', parseFloat(e.target.value))}
                      className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Premium Plan Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">SAR</span>
                    <input
                      type="number"
                      value={settings.payments.premiumPlanPrice}
                      onChange={(e) => handleSettingChange('payments', 'premiumPlanPrice', parseFloat(e.target.value))}
                      className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enterprise Plan Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">SAR</span>
                    <input
                      type="number"
                      value={settings.payments.enterprisePlanPrice}
                      onChange={(e) => handleSettingChange('payments', 'enterprisePlanPrice', parseFloat(e.target.value))}
                      className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                  <input
                    type="number"
                    value={settings.payments.taxRate}
                    onChange={(e) => handleSettingChange('payments', 'taxRate', parseFloat(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Prefix</label>
                  <input
                    type="text"
                    value={settings.payments.invoicePrefix}
                    onChange={(e) => handleSettingChange('payments', 'invoicePrefix', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Gateway</label>
                  <select
                    value={settings.payments.paymentGateway}
                    onChange={(e) => handleSettingChange('payments', 'paymentGateway', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm pr-8"
                  >
                    <option value="stripe">Stripe</option>
                    <option value="paypal">PayPal</option>
                    <option value="razorpay">Razorpay</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeSection === 'security' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                  <input
                    type="number"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Backup Retention (days)</label>
                  <input
                    type="number"
                    value={settings.security.backupRetention}
                    onChange={(e) => handleSettingChange('security', 'backupRetention', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.security.twoFactorRequired}
                    onChange={(e) => handleSettingChange('security', 'twoFactorRequired', e.target.checked)}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
                  />
                  <div>
                    <span className="font-medium text-gray-800">Require Two-Factor Authentication</span>
                    <p className="text-sm text-gray-600">Force all users to enable 2FA for enhanced security</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.security.passwordStrengthRequired}
                    onChange={(e) => handleSettingChange('security', 'passwordStrengthRequired', e.target.checked)}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
                  />
                  <div>
                    <span className="font-medium text-gray-800">Strong Password Requirements</span>
                    <p className="text-sm text-gray-600">Enforce strong password policies for all users</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.security.dataEncryption}
                    onChange={(e) => handleSettingChange('security', 'dataEncryption', e.target.checked)}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
                  />
                  <div>
                    <span className="font-medium text-gray-800">Data Encryption</span>
                    <p className="text-sm text-gray-600">Encrypt sensitive data at rest and in transit</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.notifications.emailNotifications}
                    onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
                  />
                  <div>
                    <span className="font-medium text-gray-800">Email Notifications</span>
                    <p className="text-sm text-gray-600">Send notifications via email</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.notifications.smsNotifications}
                    onChange={(e) => handleSettingChange('notifications', 'smsNotifications', e.target.checked)}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
                  />
                  <div>
                    <span className="font-medium text-gray-800">SMS Notifications</span>
                    <p className="text-sm text-gray-600">Send urgent notifications via SMS</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.notifications.pushNotifications}
                    onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
                  />
                  <div>
                    <span className="font-medium text-gray-800">Push Notifications</span>
                    <p className="text-sm text-gray-600">Send push notifications to mobile apps</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.notifications.systemAlerts}
                    onChange={(e) => handleSettingChange('notifications', 'systemAlerts', e.target.checked)}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
                  />
                  <div>
                    <span className="font-medium text-gray-800">System Alerts</span>
                    <p className="text-sm text-gray-600">Notify admins about system issues and alerts</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.notifications.maintenanceNotifications}
                    onChange={(e) => handleSettingChange('notifications', 'maintenanceNotifications', e.target.checked)}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
                  />
                  <div>
                    <span className="font-medium text-gray-800">Maintenance Notifications</span>
                    <p className="text-sm text-gray-600">Notify users about scheduled maintenance</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* API Configuration */}
          {activeSection === 'api' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">API Rate Limit (requests/hour)</label>
                  <input
                    type="number"
                    value={settings.api.rateLimit}
                    onChange={(e) => handleSettingChange('api', 'rateLimit', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">API Documentation URL</label>
                  <input
                    type="url"
                    value={settings.api.documentationUrl}
                    onChange={(e) => handleSettingChange('api', 'documentationUrl', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.api.apiKeysEnabled}
                    onChange={(e) => handleSettingChange('api', 'apiKeysEnabled', e.target.checked)}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
                  />
                  <div>
                    <span className="font-medium text-gray-800">Enable API Keys</span>
                    <p className="text-sm text-gray-600">Allow users to generate API keys for third-party integrations</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.api.webhooksEnabled}
                    onChange={(e) => handleSettingChange('api', 'webhooksEnabled', e.target.checked)}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
                  />
                  <div>
                    <span className="font-medium text-gray-800">Enable Webhooks</span>
                    <p className="text-sm text-gray-600">Allow webhook configurations for real-time notifications</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.api.corsEnabled}
                    onChange={(e) => handleSettingChange('api', 'corsEnabled', e.target.checked)}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
                  />
                  <div>
                    <span className="font-medium text-gray-800">Enable CORS</span>
                    <p className="text-sm text-gray-600">Allow cross-origin requests from web applications</p>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-red-800 mb-4">Danger Zone</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-red-800">Reset All Settings</h4>
              <p className="text-sm text-red-700">Reset all system settings to their default values</p>
            </div>
            <button
              onClick={handleSystemReset}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-medium text-sm whitespace-nowrap cursor-pointer"
            >
              <i className="ri-restart-line mr-2"></i>
              Reset Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}