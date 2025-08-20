import React from 'react';
import { Star, MessageSquare, ThumbsUp, AlertCircle } from 'lucide-react';

export const FeedbackWidget: React.FC = () => {
  const feedbackStats = [
    { label: 'Overall Rating', value: '4.7/5', icon: Star, color: 'text-yellow-500' },
    { label: 'Total Reviews', value: '1,247', icon: MessageSquare, color: 'text-blue-500' },
    { label: 'Satisfaction Rate', value: '92%', icon: ThumbsUp, color: 'text-green-500' },
  ];

  const recentFeedback = [
    { rating: 5, comment: "Excellent event organization and great speakers!", time: "2 hours ago", sentiment: "positive" },
    { rating: 4, comment: "Good content, but the venue was a bit crowded.", time: "3 hours ago", sentiment: "neutral" },
    { rating: 5, comment: "Amazing networking opportunities!", time: "5 hours ago", sentiment: "positive" },
    { rating: 3, comment: "WiFi connectivity issues in the main hall.", time: "6 hours ago", sentiment: "negative" },
  ];

  const getSentimentColor = (sentiment: string) => {
    const colors = {
      positive: 'border-l-green-500 bg-green-50',
      neutral: 'border-l-yellow-500 bg-yellow-50',
      negative: 'border-l-red-500 bg-red-50',
    };
    return colors[sentiment as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      {/* Feedback Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {feedbackStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-3">
                <Icon size={24} className={stat.color} />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Feedback */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Feedback</h3>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {recentFeedback.map((feedback, index) => (
            <div key={index} className={`border-l-4 p-4 rounded-lg ${getSentimentColor(feedback.sentiment)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{feedback.time}</span>
                  </div>
                  <p className="text-gray-700">{feedback.comment}</p>
                </div>
                {feedback.sentiment === 'negative' && (
                  <AlertCircle size={20} className="text-red-500 ml-2 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Collection */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Collect Feedback</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
            <h4 className="font-medium text-gray-900">Session Feedback</h4>
            <p className="text-sm text-gray-600 mt-1">Get feedback on specific sessions</p>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
            <h4 className="font-medium text-gray-900">Event Survey</h4>
            <p className="text-sm text-gray-600 mt-1">Overall event experience survey</p>
          </button>
        </div>
      </div>
    </div>
  );
};