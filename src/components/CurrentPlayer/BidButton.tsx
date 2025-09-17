// components/CurrentPlayer/BidButton.tsx

import ButtonPrimary from "../Shared/ButtonPrimary";

interface BidButtonProps {
  onBid: () => void;
  disabled: boolean;
  isAdmin: boolean; // Hide for admins
}

export const BidButton = ({ onBid, disabled, isAdmin }: BidButtonProps) => {
  if (isAdmin) return null; // Hide for admins, as bidding is for non-admin users

  return (
    <ButtonPrimary
      onClick={onBid}
      disabled={disabled}
      className="text-xl py-4 px-8 bg-green-600 hover:bg-green-700"
    >
      Place Bid
    </ButtonPrimary>
  );
};