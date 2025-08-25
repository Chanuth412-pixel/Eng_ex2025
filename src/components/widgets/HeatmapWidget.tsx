import React from 'react';
import { MapPin, Thermometer, Activity, Clock, Users } from 'lucide-react';

export const HeatmapWidget: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Main Heatmap */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl text-white shadow-lg">
              <Thermometer size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Venue Heatmap</h3>
              <p className="text-gray-600">Real-time crowd density visualization</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              Live Data
            </div>
            <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm">
              <option>Last 24 hours</option>
              <option>Last 7 days</option>
              <option>Event duration</option>
            </select>
          </div>
        </div>
        
        {/* Heatmap Visualization */}
        <div className="relative h-96 bg-gradient-to-br from-blue-50 via-yellow-50 to-red-50 rounded-2xl flex items-center justify-center border border-white/50 overflow-hidden">
          {/* Decorative grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          
          <div className="text-center relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MapPin size={32} className="text-blue-600" />
            </div>
            <p className="text-gray-700 font-medium text-lg">Interactive heatmap visualization</p>
            <p className="text-gray-500 mt-2">Shows crowd density and movement patterns</p>
          </div>
          
          {/* Activity indicators */}
          <div className="absolute top-6 left-6 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-16 w-3 h-3 bg-yellow-500 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-16 left-20 w-5 h-5 bg-orange-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-8 right-8 w-2 h-2 bg-blue-500 rounded-full animate-pulse-slow"></div>
        </div>

        {/* Enhanced Legend */}
        <div className="flex items-center justify-center space-x-8 mt-6">
          <div className="flex items-center space-x-3 px-4 py-2 bg-blue-50 rounded-full">
            <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
            <span className="text-sm font-medium text-blue-700">Low Activity</span>
          </div>
          <div className="flex items-center space-x-3 px-4 py-2 bg-yellow-50 rounded-full">
            <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
            <span className="text-sm font-medium text-yellow-700">Medium Activity</span>
          </div>
          <div className="flex items-center space-x-3 px-4 py-2 bg-red-50 rounded-full">
            <div className="w-4 h-4 bg-red-400 rounded-full"></div>
            <span className="text-sm font-medium text-red-700">High Activity</span>
          </div>
        </div>
      </div>

      {/* Zone Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Main Hall', icon: Users, color: 'red', peak: 187, dwell: 28, activity: 'High' },
          { name: 'Exhibition Area', icon: Activity, color: 'yellow', peak: 134, dwell: 22, activity: 'Medium' },
          { name: 'Networking Lounge', icon: Clock, color: 'green', peak: 89, dwell: 35, activity: 'Low' }
        ].map((zone, index) => (
          <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-3 bg-gradient-to-br from-${zone.color}-500 to-${zone.color}-600 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <zone.icon size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{zone.name}</h4>
                <div className={`px-2 py-1 bg-${zone.color}-100 text-${zone.color}-700 rounded-full text-xs font-medium w-fit`}>
                  {zone.activity} Activity
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                <span className="text-sm text-gray-600 flex items-center space-x-2">
                  <Users size={14} />
                  <span>Peak Occupancy:</span>
                </span>
                <span className="text-sm font-bold text-gray-900">{zone.peak}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                <span className="text-sm text-gray-600 flex items-center space-x-2">
                  <Clock size={14} />
                  <span>Avg. Dwell Time:</span>
                </span>
                <span className="text-sm font-bold text-gray-900">{zone.dwell}min</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};