import React from 'react';
import ButtonPrimary from '../Shared/ButtonPrimary';
interface AdminSpinButtonProps {
  onSpin: () => void;
  isSpinning: boolean;
  disabled?: boolean;
  playersCount: number;
}

export const AdminSpinButton: React.FC<AdminSpinButtonProps> = ({
  onSpin,
  isSpinning,
  disabled = false,
  playersCount,
}) => {
  const isDisabled = disabled || isSpinning || playersCount === 0;

  return (
    <div className="text-center">
      <ButtonPrimary
        onClick={onSpin}
        disabled={isDisabled}
        loading={isSpinning}
        className={`
          relative px-8 py-4 text-xl font-bold rounded-full shadow-2xl transition-all duration-300 transform
          ${isSpinning 
            ? 'bg-yellow-600 text-white cursor-not-allowed' 
            : 'bg-yellow-400 hover:bg-yellow-300 text-black hover:scale-105'
          }
          ${isDisabled && !isSpinning ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {isSpinning ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            <span>Spinning...</span>
          </div>
        ) : (
          <>
            🎯 SPIN WHEEL
          </>
        )}
      </ButtonPrimary>
      
      {playersCount === 0 && (
        <p className="text-red-400 text-sm mt-2">No available players to spin</p>
      )}
    </div>
  );
};