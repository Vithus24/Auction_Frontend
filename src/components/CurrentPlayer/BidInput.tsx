// src/components/CurrentPlayer/BidInput.tsx
import React, { useState, useEffect } from 'react';
import { Player, Bid, UserRole } from '@/models/types';
import ButtonPrimary from '../Shared/ButtonPrimary';
interface BidInputProps {
  player?: Player;
  currentHighestBid?: Bid;
  bidIncrement: number;
  userRole: UserRole;
  onPlaceBid: (amount: number) => Promise<void>;
  disabled?: boolean;
  loading?: boolean;
}

const BidInput: React.FC<BidInputProps> = ({
  player,
  currentHighestBid,
  bidIncrement,
  userRole,
  onPlaceBid,
  disabled = false,
  loading = false,
}) => {
  const [customBid, setCustomBid] = useState<string>('');
  const [bidError, setBidError] = useState<string>('');

  // Calculate next minimum bid amount
  const getMinimumBid = () => {
    if (!player) return 0;
    const currentAmount = currentHighestBid?.amount || player.basePrice;
    return currentAmount + bidIncrement;
  };

  const minimumBid = getMinimumBid();

  // Reset custom bid when player changes
  useEffect(() => {
    setCustomBid('');
    setBidError('');
  }, [player?.id]);

  // Validate bid amount
  const validateBid = (amount: number): string => {
    if (!player) return 'No player selected';
    if (amount < minimumBid) {
      return `Minimum bid is ₹${minimumBid.toLocaleString()}`;
    }
    if (amount > player.maxPrice) {
      return `Maximum bid is ₹${player.maxPrice.toLocaleString()}`;
    }
    return '';
  };

  const handleQuickBid = async (multiplier: number = 1) => {
    const amount = minimumBid + (bidIncrement * (multiplier - 1));
    const error = validateBid(amount);
    
    if (error) {
      setBidError(error);
      return;
    }

    setBidError('');
    try {
      await onPlaceBid(amount);
    } catch (err) {
      setBidError('Failed to place bid. Please try again.');
    }
  };

  const handleCustomBid = async () => {
    const amount = parseInt(customBid.replace(/[^0-9]/g, ''));
    if (isNaN(amount)) {
      setBidError('Please enter a valid amount');
      return;
    }

    const error = validateBid(amount);
    if (error) {
      setBidError(error);
      return;
    }

    setBidError('');
    try {
      await onPlaceBid(amount);
      setCustomBid('');
    } catch (err) {
      setBidError('Failed to place bid. Please try again.');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Don't show bid input for admins
  if (userRole.role === 'admin') {
    return (
      <div className="bg-yellow-900 bg-opacity-50 border border-yellow-600 rounded-lg p-4">
        <div className="text-center">
          <div className="text-yellow-400 font-semibold mb-2">Admin View</div>
          <p className="text-yellow-200 text-sm">
            Use admin controls to manage the auction
          </p>
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-gray-400">Select a player to start bidding</p>
      </div>
    );
  }

  const isDisabled = disabled || loading || !player;

  return (
    <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-xl border-2 border-green-400 p-6 shadow-2xl">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-2">Place Your Bid</h3>
        <div className="flex items-center justify-between text-sm">
          <span className="text-green-200">Team: {userRole.teamName}</span>
          <span className="text-green-200">
            Minimum: {formatCurrency(minimumBid)}
          </span>
        </div>
      </div>

      {/* Quick Bid Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <ButtonPrimary
          onClick={() => handleQuickBid(1)}
          disabled={isDisabled}
          loading={loading}
          className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          <div className="text-center">
            <div className="text-sm">Quick Bid</div>
            <div className="text-lg font-bold">{formatCurrency(minimumBid)}</div>
          </div>
        </ButtonPrimary>

        <ButtonPrimary
          onClick={() => handleQuickBid(2)}
          disabled={isDisabled || minimumBid + bidIncrement > (player?.maxPrice || 0)}
          loading={loading}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          <div className="text-center">
            <div className="text-sm">Higher Bid</div>
            <div className="text-lg font-bold">{formatCurrency(minimumBid + bidIncrement)}</div>
          </div>
        </ButtonPrimary>
      </div>

      {/* Custom Bid Input */}
      <div className="mb-4">
        <label className="block text-green-200 text-sm font-medium mb-2">
          Custom Bid Amount
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={customBid}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setCustomBid(value);
              setBidError('');
            }}
            placeholder="Enter amount"
            className="flex-1 bg-black bg-opacity-30 border border-green-500 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            disabled={isDisabled}
          />
          <ButtonPrimary
            onClick={handleCustomBid}
            disabled={isDisabled || !customBid}
            loading={loading}
            className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 px-6 rounded-lg"
          >
            Bid
          </ButtonPrimary>
        </div>
      </div>

      {/* Error Message */}
      {bidError && (
        <div className="bg-red-900 bg-opacity-50 border border-red-600 rounded-lg p-3 mb-4">
          <p className="text-red-200 text-sm">{bidError}</p>
        </div>
      )}

      {/* Bid Information */}
      <div className="bg-black bg-opacity-30 rounded-lg p-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-green-200">Bid Increment:</span>
          <span className="text-white font-semibold">{formatCurrency(bidIncrement)}</span>
        </div>
        <div className="flex justify-between items-center text-sm mt-1">
          <span className="text-green-200">Max Allowed:</span>
          <span className="text-white font-semibold">{formatCurrency(player.maxPrice)}</span>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
            <span className="text-gray-700 font-medium">Placing bid...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidInput;