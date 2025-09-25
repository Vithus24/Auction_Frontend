// src/components/CurrentPlayer/FixedBidButton.tsx
import React from "react";
import { Player, UserRole } from "@/models/types";
import ButtonPrimary from "../Shared/ButtonPrimary";

interface FixedBidButtonProps {
  player?: Player;
  currentBid: number;
  bidIncrement: number;
  userRole: UserRole;
  onPlaceBid: () => Promise<void>; // no amount needed
  disabled?: boolean;
  loading?: boolean;
}

const FixedBidButton: React.FC<FixedBidButtonProps> = ({
  player,
  currentBid,
  bidIncrement,
  userRole,
  onPlaceBid,
  disabled = false,
  loading = false,
}) => {
  if (userRole.role === "admin") {
    return (
      <div className="bg-yellow-900 bg-opacity-50 border border-yellow-600 rounded-lg p-4">
        <p className="text-yellow-400 font-semibold text-center">
          Admin controls bidding separately
        </p>
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

  const nextBid = currentBid + bidIncrement;
  const isDisabled = disabled || loading;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-xl border-2 border-green-400 p-6 shadow-2xl text-center">
      <h3 className="text-xl font-bold text-white mb-4">Place Your Bid</h3>

      <div className="mb-6 text-green-200">
        Current Bid:{" "}
        <span className="font-semibold text-white">
          {formatCurrency(currentBid)}
        </span>
      </div>

      <ButtonPrimary
        onClick={onPlaceBid}
        disabled={isDisabled}
        loading={loading}
        className="bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-6 rounded-lg transition-transform transform hover:scale-105"
      >
        <div>
          <div className="text-sm">Next Bid</div>
          <div className="text-lg font-bold">{formatCurrency(nextBid)}</div>
        </div>
      </ButtonPrimary>
    </div>
  );
};

export default FixedBidButton;
