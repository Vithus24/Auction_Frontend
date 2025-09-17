// src/components/CurrentPlayer/PlayerCard.tsx
import React from "react";
import { Player, Bid } from "@/models/types";
import PlayerAvatar from "../Shared/PlayerAvatar";

interface PlayerCardProps {
  player?: Player;
  latestBid?: Bid; // only the last bid
  className?: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, latestBid, className = "" }) => {
  if (!player) {
    return (
      <div
        className={`bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl border-2 border-gray-500 p-6 shadow-2xl ${className}`}
      >
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

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div
      className={`bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl border-2 border-yellow-400 p-6 shadow-2xl relative overflow-hidden ${className}`}
    >
      {/* Player Info */}
      <div className="flex items-start space-x-6">
        {/* Avatar */}
        <PlayerAvatar
          src={player.picture}
          alt={player.name}
          size="lg"
          className="border-4 border-yellow-400 shadow-lg"
        />

        {/* Details */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">{player.name}</h2>
          <div className="flex items-center space-x-3 mt-1">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {player.role}
            </span>
            <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
              Points: {player.points ?? "-"}
            </span>
          </div>
        </div>
      </div>

      {/* Latest Bid at Bottom */}
      <div className="mt-6 bg-black bg-opacity-30 rounded-lg p-4 border-2 border-green-400">
        {latestBid ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Last Bid</p>
              <p className="text-white text-2xl font-bold">
                {formatCurrency(latestBid.amount)}
              </p>
              <p className="text-green-200 text-sm">
                by <span className="font-semibold">{latestBid.teamName}</span>
              </p>
            </div>
            <div className="flex items-center text-green-200">
              <svg
                className="w-6 h-6 animate-bounce"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 01.707.293l7 7a1 1 0 01-1.414 1.414L10 5.414 3.707 11.707a1 1 0 01-1.414-1.414l7-7A1 1 0 0110 3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-green-100 text-sm">Starting Price</p>
            <p className="text-white text-xl font-bold">
              {formatCurrency(player.basePrice)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
