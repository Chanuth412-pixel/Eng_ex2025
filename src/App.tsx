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

  // WebSocket client setup
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<{ name: string; message: string }[]>([]);
  const [message, setMessage] = useState('');

  // Initialize WebSocket connection
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001'); // Connect to WebSocket server

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    // Listen for incoming messages from WebSocket server
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

  // Function to render content based on active section
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
                {sectionDescriptions[activeSection]}
              </p>
            </div>
            
            {/* Widget Content */}
            <div className="animate-fadeIn">
              {renderContent()}
            </div>

            {/* Chat Section */}
            <div className="mt-6">
              <h2 className="text-xl font-bold">Chat</h2>
              <div className="border p-4 bg-white rounded-lg shadow" style={{ minHeight: 150 }}>
                <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                  {messages.length === 0 ? (
                    <div className="text-gray-400">No messages yet.</div>
                  ) : (
                    messages.map((msg, idx) => (
                      <div key={idx} className="mb-1">
                        <span className="font-semibold">{msg.name}:</span> {msg.message}
                      </div>
                    ))
                  )}
                </div>
                <div className="flex mt-2">
                  <input
                    className="flex-1 border rounded px-2 py-1 mr-2"
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleSendMessage(); }}
                    placeholder="Type a message..."
                  />
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded"
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
