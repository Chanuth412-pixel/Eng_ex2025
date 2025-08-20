import React from 'react';
import { MapPin, Thermometer } from 'lucide-react';

export const HeatmapWidget: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Thermometer size={20} className="text-red-500" />
            <span>Venue Heatmap</span>
          </h3>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Event duration</option>
          </select>
        </div>
        
        {/* Heatmap Visualization */}
        <div className="h-96 bg-gradient-to-br from-blue-100 to-red-100 rounded-lg flex items-center justify-center border">
          <div className="text-center">
            <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Interactive heatmap visualization</p>
            <p className="text-sm text-gray-500 mt-2">Shows crowd density and movement patterns</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-300 rounded"></div>
            <span className="text-sm text-gray-600">Low Activity</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-300 rounded"></div>
            <span className="text-sm text-gray-600">Medium Activity</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-300 rounded"></div>
            <span className="text-sm text-gray-600">High Activity</span>
          </div>
        </div>
      </div>

      {/* Zone Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Main Hall', 'Exhibition Area', 'Networking Lounge'].map((zone, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-3">{zone}</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Peak Occupancy:</span>
                <span className="text-sm font-medium">{Math.floor(Math.random() * 200) + 100}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg. Dwell Time:</span>
                <span className="text-sm font-medium">{Math.floor(Math.random() * 30) + 15}min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Activity Level:</span>
                <span className={`text-sm font-medium ${index === 0 ? 'text-red-600' : index === 1 ? 'text-yellow-600' : 'text-green-600'}`}>
                  {index === 0 ? 'High' : index === 1 ? 'Medium' : 'Low'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};