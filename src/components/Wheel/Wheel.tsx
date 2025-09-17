// src/components/Wheel/Wheel.tsx (Updated with SVG implementation)
import React, { useState, useRef, useEffect } from 'react';
import { Player } from '@/models/types';
import WheelSlice from './WheelSlice';

interface WheelProps {
  players: Player[];
  currentPlayerId?: string;
  isSpinning: boolean;
  onSpinComplete?: (selectedPlayerId: string) => void;
  disabled?: boolean;
}

const Wheel: React.FC<WheelProps> = ({
  players,
  currentPlayerId,
  isSpinning,
  onSpinComplete,
  disabled = false,
}) => {
  const [rotation, setRotation] = useState(0);
  const [spinDuration, setSpinDuration] = useState(0);

  const availablePlayers = players.filter(player => player.status === 'available');
  const playerCount = availablePlayers.length;
  const sliceAngle = playerCount > 0 ? 360 / playerCount : 0;

  // Calculate current player index and rotation
  const currentPlayerIndex = currentPlayerId 
    ? availablePlayers.findIndex(p => p.id === currentPlayerId)
    : -1;

  useEffect(() => {
    if (isSpinning) {
      // Spin animation: 3-5 full rotations plus random final position
      const minRotations = 3;
      const maxRotations = 5;
      const randomRotations = minRotations + Math.random() * (maxRotations - minRotations);
      
      // Calculate final position to land on current player if selected
      let finalAngle = randomRotations * 360;
      if (currentPlayerId && currentPlayerIndex >= 0) {
        // Adjust to point to the selected player (accounting for pointer at top)
        const targetAngle = currentPlayerIndex * sliceAngle + sliceAngle / 2;
        finalAngle = randomRotations * 360 + (360 - targetAngle);
      }
      
      setSpinDuration(3000 + Math.random() * 2000); // 3-5 seconds
      setRotation(prev => prev + finalAngle);
    }
  }, [isSpinning, currentPlayerId, currentPlayerIndex, sliceAngle]);

  useEffect(() => {
    if (!isSpinning && currentPlayerId && onSpinComplete) {
      const timer = setTimeout(() => {
        onSpinComplete(currentPlayerId);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isSpinning, currentPlayerId, onSpinComplete]);

  if (playerCount === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-80 h-80 border-4 border-gray-600 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 shadow-2xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a8 8 0 110 15.292V15.16a5.5 5.5 0 01-4.94-2.35L5 13.5l-1.26-1.26a8 8 0 0116.52 0L19 13.5l-2.06-.69A5.5 5.5 0 0112 15.16v4.486z" />
              </svg>
            </div>
            <p className="text-white text-lg font-semibold">No Available Players</p>
            <p className="text-gray-300 text-sm mt-1">All players have been allocated</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center">
      {/* Wheel Container */}
      <div className="relative w-80 h-80">
        {/* Wheel SVG */}
        <svg
          width="320"
          height="320"
          viewBox="0 0 320 320"
          className={`
            w-full h-full drop-shadow-2xl transition-transform ease-out
            ${isSpinning ? 'duration-[3000ms]' : 'duration-500'}
          `}
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center',
          }}
        >
          {/* Wheel Background Circle */}
          <circle
            cx="160"
            cy="160"
            r="156"
            fill="url(#wheelGradient)"
            stroke="#facc15"
            strokeWidth="8"
            className="drop-shadow-lg"
          />
          
          {/* Define gradients */}
          <defs>
            <radialGradient id="wheelGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="50%" stopColor="#3730a3" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </radialGradient>
            <linearGradient id="hubGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Player Slices */}
          {availablePlayers.map((player, index) => {
            const startAngle = index * sliceAngle;
            const isSelected = player.id === currentPlayerId && !isSpinning;
            
            return (
              <WheelSlice
                key={player.id}
                player={player}
                startAngle={startAngle}
                sliceAngle={sliceAngle}
                isSelected={isSelected}
                radius={160}
                index={index}
              />
            );
          })}
          
          {/* Center Hub */}
          <circle
            cx="160"
            cy="160"
            r="24"
            fill="url(#hubGradient)"
            stroke="#d97706"
            strokeWidth="3"
            className="drop-shadow-lg"
          />
          
          {/* Hub Inner Circle */}
          <circle
            cx="160"
            cy="160"
            r="12"
            fill="#b45309"
            className="drop-shadow-sm"
          />
        </svg>

        {/* Pointer */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
          <svg width="24" height="24" viewBox="0 0 24 24" className="drop-shadow-lg">
            <path
              d="M12 2L8 8h8l-4-6z"
              fill="#ef4444"
              stroke="#dc2626"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Spinning Overlay */}
        {isSpinning && (
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center z-20 backdrop-blur-sm">
            <div className="bg-black bg-opacity-70 rounded-lg px-6 py-3">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-3 border-yellow-400"></div>
                <div className="text-center">
                  <div className="text-white text-xl font-bold">Spinning...</div>
                  <div className="text-yellow-200 text-sm">Selecting player</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Disabled State Overlay */}
        {disabled && !isSpinning && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-60 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="bg-black bg-opacity-70 rounded-lg px-4 py-2">
              <div className="text-white text-lg font-semibold text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0H10m4-6V9a2 2 0 00-2-2H8a2 2 0 00-2 2v2m8 0V9a2 2 0 00-2-2m2 2h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h2" />
                </svg>
                <div>Wheel Disabled</div>
                <div className="text-gray-300 text-sm">Admin access required</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Current Selection Display */}
      {currentPlayerId && !isSpinning && (
        <div className="mt-6 text-center">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-3 rounded-full font-bold shadow-lg">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Selected: Player #{currentPlayerId}</span>
            </div>
          </div>
        </div>
      )}

      {/* Wheel Stats */}
      <div className="mt-4 flex items-center space-x-6 text-sm">
        <div className="text-center">
          <div className="text-white font-semibold">{playerCount}</div>
          <div className="text-purple-300">Available</div>
        </div>
        <div className="w-1 h-8 bg-purple-400"></div>
        <div className="text-center">
          <div className="text-white font-semibold">{sliceAngle.toFixed(1)}°</div>
          <div className="text-purple-300">Per Slice</div>
        </div>
      </div>
    </div>
  );
};

export default Wheel;