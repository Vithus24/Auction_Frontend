// src/components/CurrentPlayer/RecentBids.tsx
import React, { useEffect, useRef } from 'react';
import { Bid } from '@/models/types';

interface RecentBidsProps {
  bids: Bid[];
  currentPlayerId?: string;
  className?: string;
}

const RecentBids: React.FC<RecentBidsProps> = ({
  bids,
  currentPlayerId,
  className = '',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter bids for current player only
  const playerBids = bids.filter(bid => bid.playerId === currentPlayerId);
  const sortedBids = [...playerBids].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // Auto-scroll to top when new bids arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [sortedBids.length]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date().getTime();
    const bidTime = new Date(timestamp).getTime();
    const diffInSeconds = Math.floor((now - bidTime) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    }
  };

  if (!currentPlayerId) {
    return (
      <div className={`bg-gray-800 rounded-lg p-4 ${className}`}>
        <div className="text-center text-gray-400">
          <h3 className="font-semibold mb-2">Bid History</h3>
          <p className="text-sm">Select a player to view bid history</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl border-2 border-purple-400 shadow-2xl ${className}`}>
      {/* Header */}
      <div className="border-b border-purple-400 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Bid History</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-purple-200 text-sm">Live</span>
          </div>
        </div>
        <p className="text-purple-200 text-sm mt-1">
          Player #{currentPlayerId} • {sortedBids.length} bid{sortedBids.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Bid List */}
      <div className="p-4">
        {sortedBids.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <p className="text-purple-300 font-medium">No bids yet</p>
            <p className="text-purple-400 text-sm">Be the first to place a bid!</p>
          </div>
        ) : (
          <div 
            ref={scrollRef}
            className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-track-purple-800 scrollbar-thumb-purple-400"
          >
            {sortedBids.map((bid, index) => (
              <div
                key={bid.id}
                className={`bg-black bg-opacity-30 rounded-lg p-3 border transition-all duration-300 ${
                  index === 0 
                    ? 'border-yellow-400 bg-yellow-400 bg-opacity-10 shadow-lg' 
                    : 'border-purple-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-yellow-400' : 'bg-purple-400'
                    }`}></div>
                    <span className="text-white font-semibold">{bid.teamName}</span>
                    {index === 0 && (
                      <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                        HIGHEST
                      </span>
                    )}
                  </div>
                  <span className="text-purple-200 text-sm">
                    {getTimeAgo(bid.timestamp)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-xl font-bold ${
                    index === 0 ? 'text-yellow-400' : 'text-white'
                  }`}>
                    {formatCurrency(bid.amount)}
                  </span>
                  <span className="text-purple-300 text-sm">
                    {formatTime(bid.timestamp)}
                  </span>
                </div>

                {/* Bid increase indicator */}
                {index < sortedBids.length - 1 && (
                  <div className="mt-2 flex items-center space-x-1 text-xs">
                    <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l7 7a1 1 0 01-1.414 1.414L10 5.414 3.707 11.707a1 1 0 01-1.414-1.414l7-7A1 1 0 0110 3z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-400">
                      +{formatCurrency(bid.amount - sortedBids[index + 1].amount)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Last Bid Flyer - Shows at bottom for latest bid */}
      {sortedBids.length > 0 && (
        <div className="border-t border-purple-400 p-3 bg-black bg-opacity-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <span className="text-purple-200 text-sm">Latest bid:</span>
            </div>
            <div className="text-right">
              <div className="text-white font-bold">
                {formatCurrency(sortedBids[0].amount)}
              </div>
              <div className="text-purple-300 text-xs">
                by {sortedBids[0].teamName}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentBids;