'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdminStats from '../../components/AdminStats';
import UserManagement from '../../components/UserManagement';
import EmployeeManagement from '../../components/EmployeeManagement';
import ContentManagement from '../../components/ContentManagement';
import SystemSettings from '../../components/SystemSettings';
import AdminAnalytics from '../../components/AdminAnalytics';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();
  const [adminUser] = useState({
    name: 'Super Admin',
    email: 'admin@businessdirectory.com',
    role: 'Super Administrator',
    avatar: 'https://readdy.ai/api/search-image?query=Professional%20executive%20portrait%2C%20confident%20business%20leader%2C%20modern%20office%20background%2C%20corporate%20headshot%20style%2C%20clean%20professional%20lighting&width=100&height=100&seq=admin-avatar&orientation=squarish',
    lastLogin: '2024-01-15T10:30:00Z'
  });

  const handleLogout = () => {
    router.push('/');
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'ri-dashboard-3-line' },
    { id: 'users', name: 'User Management', icon: 'ri-user-settings-line' },
    { id: 'employees', name: 'Employee Management', icon: 'ri-team-line' },
    { id: 'content', name: 'Content Management', icon: 'ri-file-list-3-line' },
    { id: 'analytics', name: 'System Analytics', icon: 'ri-bar-chart-box-line' },
    { id: 'settings', name: 'System Settings', icon: 'ri-settings-3-line' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="w-full px-6">
          <div className="max-w-7xl mx-auto">
            
            {/* Admin Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex items-center space-x-6 mb-6 md:mb-0">
                  <img
                    src={adminUser.avatar}
                    alt={adminUser.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white/20"
                  />
                  <div>
                    <h1 className="text-3xl font-bold">Admin Control Panel</h1>
                    <p className="text-red-100 mb-2">Welcome back, {adminUser.name}</p>
                    <div className="flex items-center space-x-4 text-sm text-red-100">
                      <span className="flex items-center">
                        <i className="ri-shield-check-line mr-1"></i>
                        {adminUser.role}
                      </span>
                      <span className="flex items-center">
                        <i className="ri-time-line mr-1"></i>
                        Last login: {new Date(adminUser.lastLogin).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button className="bg-white/20 backdrop-blur text-white px-6 py-3 rounded-lg hover:bg-white/30 font-medium whitespace-nowrap cursor-pointer transition-all">
                    <i className="ri-notification-3-line mr-2"></i>
                    Alerts (3)
                  </button>
                  <button className="bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 font-medium whitespace-nowrap cursor-pointer transition-all">
                    <i className="ri-backup-line mr-2"></i>
                    System Backup
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-800 font-medium whitespace-nowrap cursor-pointer transition-all"
                  >
                    <i className="ri-logout-box-line mr-2"></i>
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-2xl shadow-sm mb-8 border border-gray-100">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer transition-all ${
                        activeTab === tab.id
                          ? 'border-red-500 text-red-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <i className={`${tab.icon} mr-2`}></i>
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && <AdminStats />}
                {activeTab === 'users' && <UserManagement />}
                {activeTab === 'employees' && <EmployeeManagement />}
                {activeTab === 'content' && <ContentManagement />}
                {activeTab === 'analytics' && <AdminAnalytics />}
                {activeTab === 'settings' && <SystemSettings />}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}