'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AIChatWidget() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. I can help you find suppliers and automatically filter businesses based on your specific needs. Just tell me what you're looking for!",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAISuggestions = (query) => {
    const lowerQuery = query.toLowerCase();
    
    const suggestions = {
      categories: [],
      locations: [],
      rating: null,
      features: [],
      businessTypes: []
    };

    // Enhanced product/service recognition and category mapping
    const categoryMappings = {
      'glass|window|door|construction|building|cement|concrete|marble|tile|paint|steel|metal|iron': 'construction-real-estate',
      'electronic|computer|tech|software|hardware|smartphone|laptop|tablet': 'consumer-electronics',
      'food|restaurant|catering|grocery|beverage|drink|cafe|kitchen': 'food-beverage',
      'medical|healthcare|hospital|pharmaceutical|medicine|clinic|equipment': 'hospital-medical',
      'auto|car|vehicle|automotive|spare parts|garage|tire|engine': 'automobile',
      'textile|fabric|clothing|apparel|fashion|garment|cotton|silk': 'textiles-fabrics',
      'chemical|industrial|manufacturing|factory|machinery|equipment': 'industrial-supplies',
      'furniture|office|home|decoration|interior|chair|table|sofa': 'furniture',
      'oil|gas|petroleum|energy|fuel|power|electricity': 'oil-gas',
      'agriculture|farming|crop|livestock|fertilizer|seed|plant': 'agriculture',
      'jewelry|gold|silver|diamond|accessories|watch|ring': 'jewelry-gemstones',
      'leather|bag|shoe|belt|wallet|handbag': 'leather-products',
      'plastic|polymer|packaging|container|bottle': 'plastics-products',
      'paper|printing|publishing|stationery|book|magazine': 'printing-publishing',
      'security|protection|safety|surveillance|camera|alarm': 'security-protection',
      'sport|entertainment|game|toy|recreation|fitness': 'sports-entertainment',
      'telecommunication|phone|internet|network|mobile|wifi': 'telecommunications',
      'hotel|hospitality|restaurant|catering|tourism': 'hotel-supplies',
      'office|school|education|stationery|supplies|pen|notebook': 'office-school'
    };

    Object.entries(categoryMappings).forEach(([keywords, category]) => {
      const keywordList = keywords.split('|');
      if (keywordList.some(keyword => lowerQuery.includes(keyword))) {
        if (!suggestions.categories.includes(category)) {
          suggestions.categories.push(category);
        }
      }
    });

    // Enhanced location detection
    const locationMappings = {
      'riyadh|riyad|الرياض': 'Riyadh',
      'jeddah|jidda|jedda|جدة': 'Jeddah',
      'makkah|mecca|maka|مكة': 'Makkah',
      'medina|madinah|المدينة': 'Madinah',
      'dammam|الدمام': 'Dammam',
      'khobar|خبر': 'Khobar',
      'taif|الطائف': 'Taif',
      'abha|أبها': 'Abha',
      'tabuk|تبوك': 'Tabuk',
      'buraidah|بريدة': 'Buraidah'
    };

    Object.entries(locationMappings).forEach(([keywords, location]) => {
      const keywordList = keywords.split('|');
      if (keywordList.some(keyword => lowerQuery.includes(keyword))) {
        if (!suggestions.locations.includes(location)) {
          suggestions.locations.push(location);
        }
      }
    });

    // Business type detection
    const businessTypeMappings = {
      'supplier|supply|supplying|distribute|distributor': 'Supplier',
      'store|shop|retail|market|outlet': 'Store',
      'office|company|corporate|business': 'Office',
      'individual|freelance|personal|private': 'Individual'
    };

    Object.entries(businessTypeMappings).forEach(([keywords, type]) => {
      const keywordList = keywords.split('|');
      if (keywordList.some(keyword => lowerQuery.includes(keyword))) {
        if (!suggestions.businessTypes.includes(type)) {
          suggestions.businessTypes.push(type);
        }
      }
    });

    // Quality indicators
    const qualityIndicators = {
      'best|top|excellent|premium|high quality|superior': 5,
      'good|quality|reliable|trusted': 4,
      'average|decent|okay': 3
    };

    Object.entries(qualityIndicators).forEach(([keywords, rating]) => {
      const keywordList = keywords.split('|');
      if (keywordList.some(keyword => lowerQuery.includes(keyword))) {
        suggestions.rating = Math.max(suggestions.rating || 0, rating);
      }
    });

    // Feature detection
    const featureMappings = {
      'delivery|shipping|transport': 'Free Delivery',
      '24/7|24 hours|always open': '24/7 Service',
      'warranty|guarantee': 'Warranty',
      'installation|setup|fitting': 'Installation Service'
    };

    Object.entries(featureMappings).forEach(([keywords, feature]) => {
      const keywordList = keywords.split('|');
      if (keywordList.some(keyword => lowerQuery.includes(keyword))) {
        if (!suggestions.features.includes(feature)) {
          suggestions.features.push(feature);
        }
      }
    });

    return suggestions;
  };

  const navigateAndFilter = (suggestions, query) => {
    // Create URL with search parameters for filtering
    const params = new URLSearchParams();
    
    if (suggestions.categories.length > 0) {
      params.set('category', suggestions.categories[0]);
    }
    if (suggestions.locations.length > 0) {
      params.set('location', suggestions.locations.join(','));
    }
    if (suggestions.businessTypes.length > 0) {
      params.set('type', suggestions.businessTypes[0]);
    }
    if (suggestions.rating) {
      params.set('rating', suggestions.rating.toString());
    }
    if (suggestions.features.length > 0) {
      params.set('features', suggestions.features.join(','));
    }
    
    params.set('search', query);
    
    // Navigate to businesses page with filters
    router.push(`/businesses?${params.toString()}`);
  };

  const simulateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check if user is looking for specific suppliers or products
    if (lowerMessage.includes('supplier') || lowerMessage.includes('find') || lowerMessage.includes('looking for') || lowerMessage.includes('need')) {
      const suggestions = generateAISuggestions(userMessage);
      
      // Navigate to businesses page with filters
      setTimeout(() => {
        navigateAndFilter(suggestions, userMessage);
      }, 2000);
      
      let response = "Perfect! I found what you're looking for. Let me search our database and take you to the filtered results...";
      
      if (suggestions.categories.length > 0) {
        response += ` I detected you need ${suggestions.categories.join(', ')} suppliers.`;
      }
      
      if (suggestions.locations.length > 0) {
        response += ` Looking in ${suggestions.locations.join(', ')}.`;
      }
      
      response += " Taking you to the results page now!";
      
      return response;
    }
    
    // General responses for other queries
    const responses = [
      "I can help you find suppliers in various categories. What type of business are you looking for?",
      "Tell me what product or service you need, and I'll find the right suppliers for you!",
      "I can search by location, category, rating, and specific requirements. What do you need?",
      "Would you like me to show you suppliers with the highest ratings in your area?",
      "I can filter suppliers by categories like Electronics, Construction, Food & Beverage, and more. Which interests you?",
      "Based on your location, I can find several nearby suppliers. What are you looking for?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: simulateAIResponse(currentMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Widget - Always visible */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Minimized State */}
        {isMinimized && (
          <button
            onClick={() => setIsMinimized(false)}
            className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center group"
          >
            <i className="ri-robot-line text-xl group-hover:animate-pulse"></i>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </button>
        )}

        {/* Full Chat Widget */}
        {!isMinimized && (
          <div className="w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <i className="ri-robot-line text-yellow-500"></i>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">AI Supplier Finder</h3>
                  <p className="text-yellow-100 text-xs">Find & Filter Instantly</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-white hover:text-yellow-100 cursor-pointer p-1 rounded"
                  title="Minimize"
                >
                  <i className="ri-subtract-line text-lg"></i>
                </button>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-white hover:text-yellow-100 cursor-pointer p-1 rounded"
                  title="Close"
                >
                  <i className="ri-close-line text-lg"></i>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] ${
                    message.sender === 'user'
                      ? 'bg-yellow-500 text-white rounded-2xl rounded-br-sm'
                      : 'bg-white text-gray-800 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100'
                  } px-4 py-2`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-yellow-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., Glass supplier in Jeddah..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="w-10 h-10 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <i className="ri-send-plane-line"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}