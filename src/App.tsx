import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { OverviewWidget } from './components/widgets/OverviewWidget';
import { HeatmapWidget } from './components/widgets/HeatmapWidget';
import { FeedbackWidget } from './components/widgets/FeedbackWidget';
import { ExportWidget } from './components/widgets/ExportWidget';

const eventInfo = {
  title: 'EngEx2025',
  date: 'September 23-27, 2025',
  location: 'Faculty of Engineering, University of Perdeniya'
};

const userInfo = {
  name: 'Group_14',
  role: 'Event Administrator',
  avatar: undefined
};

type Section = 'overview' | 'heatmaps' | 'feedback' | 'export';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // WS client setup
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<{ name: string; message: string }[]>([]);
  const [message, setMessage] = useState('');

  //WS connection
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001'); // Connect to WebSocket server

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    //Listen for msgs
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'history') {
        setMessages(data.messages || []);
      }
    };

    socket.onclose = (event) => {
      console.log('Disconnected from WebSocket server', event);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setSocket(socket);

    return () => {
      socket.close(); // Cleanup when component unmounts
    };
  }, []);

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

  const getSectionTitle = (): string => {
    const titles: Record<Section, string> = {
      overview: 'Overview',
      heatmaps: 'Heatmaps',
      feedback: 'Feedback',
      export: 'Export & Reports'
    };
    return titles[activeSection];
  };

  const sectionDescriptions: Record<Section, string> = {
    overview: 'Event Analytics and Performance Insights',
    heatmaps: 'Visualize crowd density and movement patterns',
    feedback: 'Track attendee satisfaction and comments',
    export: 'Generate and download reports',
  };

  // Handle sending a message to the WebSocket server
  const handleSendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN && message.trim() !== '') {
      socket.send(JSON.stringify({ message }));
      setMessage(''); // Only clear the input field
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
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
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-white/20 mb-4">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium text-gray-600">Live Dashboard</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-3">
                {getSectionTitle()}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                {sectionDescriptions[activeSection]}
              </p>
            </div>
            
            {/* Widget Content */}
            <div className="animate-fadeIn">
              {renderContent()}
            </div>

            {/* Chat Section */}
            <div className="mt-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                  <h2 className="text-xl font-bold text-gray-900">Live Chat</h2>
                  <div className="ml-auto px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Connected
                  </div>
                </div>
                <div className="bg-gray-50/50 rounded-xl p-4 mb-4" style={{ minHeight: 200, maxHeight: 300 }}>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {messages.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <p className="text-gray-500 font-medium">No messages yet</p>
                        <p className="text-gray-400 text-sm">Start the conversation!</p>
                      </div>
                    ) : (
                      messages.map((msg, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-medium">{msg.name.charAt(0).toUpperCase()}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-100">
                              <p className="text-sm text-gray-900">{msg.message}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{msg.name}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className="flex space-x-3">
                  <input
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleSendMessage(); }}
                    placeholder="Type your message here..."
                  />
                  <button
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
