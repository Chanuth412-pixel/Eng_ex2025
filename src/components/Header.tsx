import React, { useState } from 'react';
import { Bell, Search, Settings, LogOut, ChevronDown, Calendar, MapPin, Users } from 'lucide-react';

interface HeaderProps {
  eventInfo: {
    title: string;
    date: string;
    location: string;
  };
  userInfo: {
    name: string;
    role: string;
    avatar?: string;
  };
}

export const Header: React.FC<HeaderProps> = ({ eventInfo, userInfo }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-white/20 shadow-lg sticky top-0 z-50">
      <div className="px-4 py-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Event Information */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {eventInfo.title}
              </h1>
              <div className="flex items-center space-x-6 text-sm text-gray-600 mt-2">
                <div className="flex items-center space-x-2 px-3 py-1 bg-blue-50 rounded-full">
                  <Calendar size={16} className="text-blue-600" />
                  <span className="font-medium">{eventInfo.date}</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1 bg-purple-50 rounded-full">
                  <MapPin size={16} className="text-purple-600" />
                  <span className="font-medium">{eventInfo.location}</span>
                </div>
              </div>
            </div>
            <div className="md:hidden">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {eventInfo.title}
              </h1>
              <div className="flex items-center space-x-3 text-xs text-gray-600 mt-1">
                <span className="px-2 py-1 bg-blue-50 rounded-full">{eventInfo.date}</span>
                <span className="px-2 py-1 bg-purple-50 rounded-full">{eventInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions & User Menu */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group">
              <Search size={20} className="group-hover:scale-110 transition-transform duration-200" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-3 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200 relative group"
              >
                <Bell size={20} className="group-hover:scale-110 transition-transform duration-200" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium shadow-lg">
                  3
                </span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 z-50 animate-fadeIn">
                  <div className="p-5 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900 text-lg">Notifications</h3>
                    <p className="text-sm text-gray-500 mt-1">You have 3 unread notifications</p>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <div className="p-4 border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">New feedback received</p>
                          <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Export completed</p>
                          <p className="text-xs text-gray-400 mt-1">5 minutes ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-gray-50/50 transition-colors duration-200">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">System update available</p>
                          <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <button className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 group">
              <Settings size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                  <Users size={18} className="text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-900">{userInfo.name}</p>
                  <p className="text-xs text-gray-600">{userInfo.role}</p>
                </div>
                <ChevronDown size={16} className="text-gray-500 group-hover:text-gray-700 transition-colors duration-200" />
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 z-50 animate-fadeIn">
                  <div className="p-5 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Users size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{userInfo.name}</p>
                        <p className="text-sm text-gray-600">{userInfo.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl flex items-center space-x-3 transition-all duration-200 group">
                      <Settings size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                      <span>Settings</span>
                    </button>
                    <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-xl flex items-center space-x-3 transition-all duration-200 group">
                      <LogOut size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};