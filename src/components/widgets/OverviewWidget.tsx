import React from 'react';
import { TrendingUp, Users, MapPin, Clock, BarChart3 } from 'lucide-react';

export const OverviewWidget: React.FC = () => {
  const stats = [
    { label: 'Total Attendees', value: '2,847', change: '+12%', icon: Users, color: 'blue', trend: 'up' },
    { label: 'Check-ins', value: '2,341', change: '+8%', icon: MapPin, color: 'green', trend: 'up' },
    { label: 'Avg. Session Time', value: '4h 32m', change: '+15%', icon: Clock, color: 'purple', trend: 'up' },
    { label: 'Engagement Rate', value: '87%', change: '+5%', icon: TrendingUp, color: 'orange', trend: 'up' },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600',
    };
    return colors[color as keyof typeof colors];
  };

  const getBgColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50/80',
      green: 'bg-green-50/80',
      purple: 'bg-purple-50/80',
      orange: 'bg-orange-50/80',
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 ${getBgColorClasses(stat.color)} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${getColorClasses(stat.color)} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 rounded-full">
                    <TrendingUp size={14} className="text-green-600" />
                    <span className="text-sm font-semibold text-green-700">{stat.change}</span>
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                </div>
              </div>
              
              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${getColorClasses(stat.color)} opacity-5 rounded-bl-full`}></div>
            </div>
          );
        })}
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Attendance Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Attendance Over Time</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Live Data</span>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center border border-white/50">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 size={24} className="text-blue-600" />
              </div>
              <p className="text-gray-600 font-medium">Chart placeholder</p>
              <p className="text-gray-400 text-sm">Attendance trends visualization</p>
            </div>
          </div>
        </div>

        {/* Popular Sessions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Popular Sessions</h3>
            <div className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
              Top 4
            </div>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Robotics & Automation Showcase', attendees: 187, color: 'blue' },
              { name: 'Sustainable Energy Projects', attendees: 156, color: 'green' },
              { name: 'Civil Engineering Innovations', attendees: 134, color: 'purple' },
              { name: 'Student Startup Pitches', attendees: 98, color: 'orange' }
            ].map((session, index) => (
              <div key={index} className="group flex items-center justify-between p-4 bg-gradient-to-r from-gray-50/50 to-white/50 rounded-xl border border-white/50 hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 bg-${session.color}-500 rounded-full`}></div>
                  <span className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
                    {session.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-700">{session.attendees}</span>
                  <span className="text-xs text-gray-500">attendees</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};