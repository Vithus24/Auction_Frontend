import React, { useState } from 'react';
import { Player, Bid, Team } from '@/models/types';
import ButtonPrimary from '../Shared/ButtonPrimary';
import ModalConfirm from '../Shared/ModalConfirm';

interface FinalizeAllocateProps {
  currentPlayer?: Player;
  highestBid?: Bid;
  teams: Team[];
  onAllocate: (playerId: string, teamId: string) => Promise<void>;
  onMarkUnsold: (playerId: string) => Promise<void>;
  disabled?: boolean;
  loading?: boolean;
}

const FinalizeAllocate: React.FC<FinalizeAllocateProps> = ({
  currentPlayer,
  highestBid,
  teams,
  onAllocate,
  onMarkUnsold,
  disabled = false,
  loading = false,
}) => {
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [showUnsoldModal, setShowUnsoldModal] = useState(false);

  if (!currentPlayer) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 text-center">
        <p className="text-gray-400">No player selected for allocation</p>
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

  const handleAllocate = async () => {
    if (!highestBid) return;
    
    try {
      await onAllocate(currentPlayer.id, highestBid.teamId);
      setShowAllocateModal(false);
    } catch (error) {
      console.error('Failed to allocate player:', error);
    }
  };

  const handleMarkUnsold = async () => {
    try {
      await onMarkUnsold(currentPlayer.id);
      setShowUnsoldModal(false);
    } catch (error) {
      console.error('Failed to mark player as unsold:', error);
    }
  };

  const winningTeam = teams.find(team => team.id === highestBid?.teamId);

  return (
    <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-xl border-2 border-red-400 p-6 shadow-2xl">
      <h3 className="text-xl font-bold text-white mb-4 text-center">Admin Controls</h3>
      
      {/* Current Player Info */}
      <div className="bg-black bg-opacity-30 rounded-lg p-4 mb-4">
        <div className="text-center">
          <h4 className="text-white font-semibold">{currentPlayer.name}</h4>
          <p className="text-red-200 text-sm">Player ID: {currentPlayer.id}</p>
        </div>
      </div>

      {/* Bid Summary */}
      <div className="bg-black bg-opacity-30 rounded-lg p-4 mb-4">
        {highestBid ? (
          <div className="text-center">
            <p className="text-red-200 text-sm mb-1">Highest Bid</p>
            <p className="text-white text-2xl font-bold mb-1">
              {formatCurrency(highestBid.amount)}
            </p>
            <p className="text-red-200 text-sm">
              by <span className="font-semibold">{highestBid.teamName}</span>
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-red-200">No bids received</p>
            <p className="text-white text-lg">
              Base Price: {formatCurrency(currentPlayer.basePrice)}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {highestBid && winningTeam ? (
          <ButtonPrimary
            onClick={() => setShowAllocateModal(true)}
            disabled={disabled || loading}
            loading={loading}
            className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-4 rounded-lg"
          >
            🏆 Allocate to {winningTeam.name}
          </ButtonPrimary>
        ) : null}

        <ButtonPrimary
          onClick={() => setShowUnsoldModal(true)}
          disabled={disabled || loading}
          loading={loading}
          className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 px-4 rounded-lg"
        >
          ❌ Mark as Unsold
        </ButtonPrimary>
      </div>

      {/* Allocate Confirmation Modal */}
      <ModalConfirm
        isOpen={showAllocateModal}
        onClose={() => setShowAllocateModal(false)}
        onConfirm={handleAllocate}
        title="Confirm Player Allocation"
        message={
          <div className="text-center">
            <p>Allocate <strong>{currentPlayer.name}</strong> to <strong>{winningTeam?.name}</strong>?</p>
            <div className="mt-2 p-3 bg-green-100 rounded-lg">
              <p className="text-green-800 font-bold">
                Final Price: {highestBid ? formatCurrency(highestBid.amount) : 'N/A'}
              </p>
            </div>
          </div>
        }
        confirmText="Allocate Player"
        confirmButtonClass="bg-green-500 hover:bg-green-400"
      />

      {/* Unsold Confirmation Modal */}
      <ModalConfirm
        isOpen={showUnsoldModal}
        onClose={() => setShowUnsoldModal(false)}
        onConfirm={handleMarkUnsold}
        title="Mark Player as Unsold"
        message={
          <div className="text-center">
            <p>Mark <strong>{currentPlayer.name}</strong> as unsold?</p>
            <div className="mt-2 p-3 bg-orange-100 rounded-lg">
              <p className="text-orange-800">
                This action cannot be undone. The player will be removed from the current auction round.
              </p>
            </div>
          </div>
        }
        confirmText="Mark Unsold"
        confirmButtonClass="bg-orange-500 hover:bg-orange-400"
        cancelText="Cancel"
      />
    </div>
  );
};
export default FinalizeAllocate;