import React from 'react';
import { TrendingUp, Users, MapPin, Clock } from 'lucide-react';

export const OverviewWidget: React.FC = () => {
  const stats = [
    { label: 'Total Attendees', value: '2,847', change: '+12%', icon: Users, color: 'blue' },
    { label: 'Check-ins', value: '2,341', change: '+8%', icon: MapPin, color: 'green' },
    { label: 'Avg. Session Time', value: '4h 32m', change: '+15%', icon: Clock, color: 'purple' },
    { label: 'Engagement Rate', value: '87%', change: '+5%', icon: TrendingUp, color: 'orange' },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      orange: 'bg-orange-50 text-orange-600 border-orange-200',
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg border ${getColorClasses(stat.color)}`}>
                  <Icon size={24} />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Over Time</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - Attendance trends</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Sessions</h3>
          <div className="space-y-3">
            {['Robotics & Automation Showcase','Sustainable Energy Projects','Civil Engineering Innovations','Student Startup Pitches'].map((session, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{session}</span>
                <span className="text-sm text-gray-600">{Math.floor(Math.random() * 200) + 50} attendees</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};