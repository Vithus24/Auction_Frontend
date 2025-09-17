// src/components/CurrentPlayer/CurrentPlayerCard.tsx
import React from 'react';
import { Player, Bid } from '@/models/types';
import PlayerAvatar from '../Shared/PlayerAvatar';
interface CurrentPlayerCardProps {
  player?: Player;
  highestBid?: Bid;
  isSpinning: boolean;
  className?: string;
}

const CurrentPlayerCard: React.FC<CurrentPlayerCardProps> = ({
  player,
  highestBid,
  isSpinning,
  className = '',
}) => {
  if (isSpinning) {
    return (
      <div className={`bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl border-2 border-blue-400 p-6 shadow-2xl ${className}`}>
        <div className="flex items-center justify-center h-48">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-400 mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-white mb-2">Selecting Player...</h3>
            <p className="text-blue-200">Please wait while the wheel spins</p>
          </div>
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className={`bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl border-2 border-gray-500 p-6 shadow-2xl ${className}`}>
        <div className="flex items-center justify-center h-48">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-white mb-2">No Player Selected</h3>
            <p className="text-gray-300">Spin the wheel to select a player</p>
          </div>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={`bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl border-2 border-yellow-400 p-6 shadow-2xl relative overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 transform -skew-y-6"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start space-x-6">
          {/* Player Avatar */}
          <div className="flex-shrink-0">
            <PlayerAvatar
              src={player.picture}
              alt={player.name}
              size="lg"
              className="border-4 border-yellow-400 shadow-lg"
            />
          </div>

          {/* Player Details */}
          <div className="flex-1 min-w-0">
            {/* Player Name & ID */}
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-white mb-1">{player.name}</h2>
              <div className="flex items-center space-x-4">
                <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                  ID: {player.id}
                </span>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {player.role}
                </span>
              </div>
            </div>

            {/* Price Information */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-black bg-opacity-30 rounded-lg p-3">
                <p className="text-blue-200 text-sm font-medium mb-1">Base Price</p>
                <p className="text-white text-lg font-bold">{formatCurrency(player.basePrice)}</p>
              </div>
              <div className="bg-black bg-opacity-30 rounded-lg p-3">
                <p className="text-blue-200 text-sm font-medium mb-1">Max Price</p>
                <p className="text-white text-lg font-bold">{formatCurrency(player.maxPrice)}</p>
              </div>
            </div>

            {/* Current Highest Bid */}
            <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-lg p-4 border-2 border-green-400">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium mb-1">Current Highest Bid</p>
                  {highestBid ? (
                    <div>
                      <p className="text-white text-2xl font-bold mb-1">
                        {formatCurrency(highestBid.amount)}
                      </p>
                      <p className="text-green-200 text-sm">
                        by <span className="font-semibold">{highestBid.teamName}</span>
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-white text-2xl font-bold mb-1">
                        {formatCurrency(player.basePrice)}
                      </p>
                      <p className="text-green-200 text-sm">Starting Price</p>
                    </div>
                  )}
                </div>
                
                {/* Trending Arrow */}
                <div className="flex-shrink-0">
                  {highestBid && highestBid.amount > player.basePrice ? (
                    <div className="flex items-center text-green-200">
                      <svg className="w-6 h-6 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l7 7a1 1 0 01-1.414 1.414L10 5.414 3.707 11.707a1 1 0 01-1.414-1.414l7-7A1 1 0 0110 3z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium ml-1">Trending</span>
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">₹</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
            LIVE AUCTION
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentPlayerCard;