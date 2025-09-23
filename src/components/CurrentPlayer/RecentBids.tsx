// src/components/CurrentPlayer/BidHistoryForCurrentPlayer.tsx
import React from "react";
import { Bid } from "@/models/types";

interface BidHistoryProps {
  bids: Bid[]; // all bids for current player
}

const BidHistoryForCurrentPlayer: React.FC<BidHistoryProps> = ({ bids }) => {
  if (!bids.length) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg text-gray-300">
        No bids yet for this player.
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
    <div className="bg-gray-900 rounded-xl p-4 shadow-md">
      <h3 className="text-white text-lg font-bold mb-3">Bid History</h3>
      <ul className="space-y-2 max-h-60 overflow-y-auto">
        {bids.map((bid, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center bg-gray-800 p-2 rounded-md"
          >
            <span className="text-green-300 font-medium">
              {formatCurrency(bid.amount)}
            </span>
            <span className="text-yellow-300 font-semibold">{bid.teamName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BidHistoryForCurrentPlayer;
