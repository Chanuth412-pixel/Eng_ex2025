import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { OverviewWidget } from './components/widgets/OverviewWidget';
import { HeatmapWidget } from './components/widgets/HeatmapWidget';
import { FeedbackWidget } from './components/widgets/FeedbackWidget';
import { ExportWidget } from './components/widgets/ExportWidget';

const eventInfo = {
  title: 'EngEx2025',
  date: 'September 23-27, 2025',
  location: 'Faculty of Enginnering, University of Perdeniya'
};

const userInfo = {
  name: 'Tithurshan',
  role: 'Event Administrator',
  avatar: undefined
};

function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewWidget />;
      case 'heatmaps':
        return <HeatmapWidget />;
      case 'feedback':
        return <FeedbackWidget />;
      case 'export':
        return <ExportWidget />;
      default:
        return <OverviewWidget />;
    }
  };

  const getSectionTitle = () => {
    const titles = {
      overview: 'Overview',
      heatmaps: 'Heatmaps',
      feedback: 'Feedback',
      export: 'Export & Reports'
    };
    return titles[activeSection as keyof typeof titles] || 'Overview';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header eventInfo={eventInfo} userInfo={userInfo} />
      
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 lg:ml-0" role="main">
          <div className="max-w-7xl mx-auto">
            {/* Content Header */}
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {getSectionTitle()}
              </h1>
              <p className="text-gray-600">
                {activeSection === 'overview' && 'Event Analytics and Performance Insights'}
                {activeSection === 'heatmaps' && 'Visualize crowd density and movement patterns'}
                {activeSection === 'feedback' && 'Track attendee satisfaction and comments'}
                {activeSection === 'export' && 'Generate and download reports'}
          
              </p>
            </div>
            
            {/* Widget Content */}
            <div className="animate-fadeIn">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;