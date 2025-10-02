
'use client';

import { useState } from 'react';

export default function DashboardStats() {
  const [timeRange, setTimeRange] = useState('7days');
  
  const stats = {
    views: { current: 1247, change: 12.5, trend: 'up' },
    contacts: { current: 89, change: 8.2, trend: 'up' },
    inquiries: { current: 34, change: -3.1, trend: 'down' },
    rating: { current: 4.8, change: 0.2, trend: 'up' }
  };

  const recentActivities = [
    {
      id: 1,
      type: 'inquiry',
      title: 'New inquiry from Sarah Johnson',
      message: 'Looking for LED TVs in bulk',
      time: '2 hours ago',
      icon: 'ri-message-line',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 2,
      type: 'view',
      title: 'Profile viewed by Tech Solutions Co.',
      message: 'Viewed your electronics category',
      time: '4 hours ago',
      icon: 'ri-eye-line',
      color: 'text-green-600 bg-green-100'
    },
    {
      id: 3,
      type: 'review',
      title: 'New 5-star review received',
      message: 'Michael Chen: "Excellent service and quality"',
      time: '1 day ago',
      icon: 'ri-star-line',
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      id: 4,
      type: 'contact',
      title: 'Contact request from Emirates Mall',
      message: 'Requested phone consultation',
      time: '2 days ago',
      icon: 'ri-phone-line',
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  const quickActions = [
    {
      title: 'Update Business Hours',
      description: 'Modify your working schedule',
      icon: 'ri-time-line',
      color: 'bg-blue-500',
      action: 'hours'
    },
    {
      title: 'Add New Products',
      description: 'Update your product keywords',
      icon: 'ri-add-circle-line',
      color: 'bg-green-500',
      action: 'products'
    },
    {
      title: 'Respond to Reviews',
      description: '3 reviews need responses',
      icon: 'ri-chat-1-line',
      color: 'bg-yellow-500',
      action: 'reviews'
    },
    {
      title: 'Upload Photos',
      description: 'Add more business images',
      icon: 'ri-camera-line',
      color: 'bg-purple-500',
      action: 'photos'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Time Range Filter */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm pr-8"
        >
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="90days">Last 90 days</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-eye-line text-blue-600 text-xl"></i>
            </div>
            <span className={`text-sm font-medium ${stats.views.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              <i className={`${stats.views.trend === 'up' ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} mr-1`}></i>
              {Math.abs(stats.views.change)}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{stats.views.current.toLocaleString()}</h3>
          <p className="text-gray-600 text-sm">Profile Views</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-contacts-line text-green-600 text-xl"></i>
            </div>
            <span className={`text-sm font-medium ${stats.contacts.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              <i className={`${stats.contacts.trend === 'up' ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} mr-1`}></i>
              {Math.abs(stats.contacts.change)}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{stats.contacts.current}</h3>
          <p className="text-gray-600 text-sm">Contact Requests</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-question-line text-yellow-600 text-xl"></i>
            </div>
            <span className={`text-sm font-medium ${stats.inquiries.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              <i className={`${stats.inquiries.trend === 'up' ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} mr-1`}></i>
              {Math.abs(stats.inquiries.change)}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{stats.inquiries.current}</h3>
          <p className="text-gray-600 text-sm">Business Inquiries</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-star-line text-purple-600 text-xl"></i>
            </div>
            <span className={`text-sm font-medium ${stats.rating.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              <i className={`${stats.rating.trend === 'up' ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} mr-1`}></i>
              {Math.abs(stats.rating.change)}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{stats.rating.current}</h3>
          <p className="text-gray-600 text-sm">Average Rating</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-left cursor-pointer group"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <i className={`${action.icon} text-white text-xl`}></i>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">{action.title}</h4>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h3>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="space-y-1">
            {recentActivities.map((activity, index) => (
              <div key={activity.id} className={`p-6 ${index !== recentActivities.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.color}`}>
                    <i className={`${activity.icon} text-sm`}></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-1">{activity.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{activity.message}</p>
                    <span className="text-gray-400 text-xs">{activity.time}</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                    <i className="ri-more-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-100">
            <button className="w-full text-center py-2 text-gray-600 hover:text-gray-800 font-medium text-sm cursor-pointer">
              View All Activity
              <i className="ri-arrow-right-line ml-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
