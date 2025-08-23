import React, { useState } from 'react';
import { Download, FileText, Image, FileSpreadsheet, Calendar, CheckCircle } from 'lucide-react';

export const ExportWidget: React.FC = () => {
  const [exportHistory, setExportHistory] = useState([
    { name: 'Attendance Report.pdf', type: 'PDF', date: '2025-09-23', status: 'completed' },
    { name: 'Feedback Analysis.xlsx', type: 'Excel', date: '2025-09-23', status: 'completed' },
    { name: 'Heatmap Data.csv', type: 'CSV', date: '2025-09-23', status: 'processing' },
  ]);

  const exportOptions = [
    {
      title: 'Analytics Report',
      description: 'Comprehensive overview with charts and statistics',
      formats: ['PDF', 'Excel'],
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'Attendance Data',
      description: 'Detailed attendee information and check-in data',
      formats: ['CSV', 'Excel'],
      icon: FileSpreadsheet,
      color: 'green'
    },
    {
      title: 'Heatmap Images',
      description: 'Visual heatmap representations',
      formats: ['PNG', 'SVG'],
      icon: Image,
      color: 'purple'
    },
    {
      title: 'Event Summary',
      description: 'Executive summary for stakeholders',
      formats: ['PDF'],
      icon: Calendar,
      color: 'orange'
    },
  ];

  const handleExport = (title: string, format: string) => {
    // Simulate export process
    const newExport = {
      name: `${title}.${format.toLowerCase()}`,
      type: format,
      date: new Date().toISOString().split('T')[0],
      status: 'processing' as const
    };
    
    setExportHistory(prev => [newExport, ...prev]);
    
    // Simulate completion after 3 seconds
    setTimeout(() => {
      setExportHistory(prev => prev.map(item => 
        item.name === newExport.name ? { ...item, status: 'completed' as const } : item
      ));
    }, 3000);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'border-blue-200 hover:border-blue-300 hover:bg-blue-50',
      green: 'border-green-200 hover:border-green-300 hover:bg-green-50',
      purple: 'border-purple-200 hover:border-purple-300 hover:bg-purple-50',
      orange: 'border-orange-200 hover:border-orange-300 hover:bg-orange-50',
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exportOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <div key={index} className={`bg-white rounded-lg border-2 p-6 transition-all ${getColorClasses(option.color)}`}>
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-${option.color}-100`}>
                  <Icon size={24} className={`text-${option.color}-600`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {option.formats.map((format) => (
                      <button
                        key={format}
                        onClick={() => handleExport(option.title, format)}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-1"
                      >
                        <Download size={14} />
                        <span>{format}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Export History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Exports</h3>
        <div className="space-y-3">
          {exportHistory.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded ${item.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                  {item.status === 'completed' ? (
                    <CheckCircle size={16} className="text-green-600" />
                  ) : (
                    <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.type} • {item.date}</p>
                </div>
              </div>
              {item.status === 'completed' && (
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                  Download
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Exports */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule Automated Exports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-300 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Daily Reports</h4>
            <p className="text-sm text-gray-600 mb-3">Automatically generate daily analytics</p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Set Up
            </button>
          </div>
          <div className="p-4 border border-gray-300 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Final Report</h4>
            <p className="text-sm text-gray-600 mb-3">Complete overview after the event ends</p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Set Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};