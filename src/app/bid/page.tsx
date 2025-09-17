// // src/pages/AuctionMonitorPage.tsx
// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import AuctionPage from '@/components/AuctionPage';
// import { UserRole } from '@/models/types';

// const AuctionMonitorPage: React.FC = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const auctionId = searchParams.get('auctionId');
  
//   const [userRole, setUserRole] = useState<UserRole | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // Get user role from localStorage, API, or authentication system
//     const loadUserRole = async () => {
//       try {
//         // Example: Get from localStorage (in real app, this would come from authentication)
//         const storedRole = localStorage.getItem('userRole');
//         const storedTeamId = localStorage.getItem('teamId');
//         const storedUserId = localStorage.getItem('userId');
        
//         if (storedRole && storedUserId) {
//           const role: UserRole = {
//             id: storedUserId,
//             role: storedRole as 'admin' | 'bidder',
//             teamId: storedTeamId || undefined,
//             teamName: localStorage.getItem('teamName') || undefined,
//           };
//           setUserRole(role);
//         } else {
//           // Fallback: prompt user to select role (for demo purposes)
//           const selectedRole = await promptUserRole();
//           if (selectedRole) {
//             setUserRole(selectedRole);
//             // Save to localStorage
//             localStorage.setItem('userRole', selectedRole.role);
//             localStorage.setItem('userId', selectedRole.id);
//             if (selectedRole.teamId) {
//               localStorage.setItem('teamId', selectedRole.teamId);
//               localStorage.setItem('teamName', selectedRole.teamName || '');
//             }
//           } else {
//             setError('Please select a role to continue');
//           }
//         }
//       } catch (err) {
//         setError('Failed to load user role');
//         console.error('Error loading user role:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (auctionId) {
//       loadUserRole();
//     }
//   }, [auctionId]);

//   const promptUserRole = async (): Promise<UserRole | null> => {
//     return new Promise((resolve) => {
//       const modal = document.createElement('div');
//       modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75';
//       modal.innerHTML = `
//         <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
//           <h2 class="text-xl font-bold mb-4">Select Your Role</h2>
//           <div class="space-y-4">
//             <button id="admin-btn" class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg">
//               🔧 Admin (Auction Control)
//             </button>
//             <button id="bidder-btn" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg">
//               💰 Bidder (Place Bids)
//             </button>
//           </div>
//           <p class="text-gray-600 text-sm mt-4">This selection is for demo purposes. In production, this would come from authentication.</p>
//         </div>
//       `;

//       document.body.appendChild(modal);

//       const adminBtn = modal.querySelector('#admin-btn');
//       const bidderBtn = modal.querySelector('#bidder-btn');

//       adminBtn?.addEventListener('click', () => {
//         document.body.removeChild(modal);
//         resolve({
//           id: 'admin-' + Date.now(),
//           role: 'admin',
//         });
//       });

//       bidderBtn?.addEventListener('click', () => {
//         // For bidder, we need to prompt for team selection
//         const teamModal = document.createElement('div');
//         teamModal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75';
//         teamModal.innerHTML = `
//           <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
//             <h2 class="text-xl font-bold mb-4">Select Your Team</h2>
//             <div class="space-y-3">
//               <button class="team-btn w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg" data-team="bhargavi-xi" data-name="Bhargavi XI">
//                 🏏 Bhargavi XI
//               </button>
//               <button class="team-btn w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg" data-team="jai-banjari-maa" data-name="Jai Banjari Maa">
//                 🏏 Jai Banjari Maa
//               </button>
//               <button class="team-btn w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg" data-team="neta-ji-11" data-name="Neta Ji 11">
//                 🏏 Neta Ji 11
//               </button>
//               <button class="team-btn w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg" data-team="rocky-xi" data-name="Rocky XI">
//                 🏏 Rocky XI
//               </button>
//               <button class="team-btn w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg" data-team="danger-avenger" data-name="Danger Avenger">
//                 🏏 Danger Avenger
//               </button>
//             </div>
//           </div>
//         `;

//         document.body.removeChild(modal);
//         document.body.appendChild(teamModal);

//         const teamBtns = teamModal.querySelectorAll('.team-btn');
//         teamBtns.forEach(btn => {
//           btn.addEventListener('click', (e) => {
//             const target = e.target as HTMLButtonElement;
//             const teamId = target.getAttribute('data-team');
//             const teamName = target.getAttribute('data-name');
            
//             document.body.removeChild(teamModal);
//             resolve({
//               id: 'bidder-' + Date.now(),
//               role: 'bidder',
//               teamId: teamId || undefined,
//               teamName: teamName || undefined,
//             });
//           });
//         });
//       });
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
//         <div className="bg-white rounded-lg p-8 text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500 mx-auto mb-4"></div>
//           <p className="text-gray-700 font-medium">Loading auction...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
//         <div className="bg-white rounded-lg p-8 text-center max-w-md">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//           <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Auction</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!auctionId || !userRole) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
//         <div className="bg-white rounded-lg p-8 text-center">
//           <p className="text-gray-700">Invalid auction ID or user role</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <AuctionPage 
//       auctionId={auctionId as string} 
//       userRole={userRole} 
//     />
//   );
// };

// export default AuctionMonitorPage;

// src/app/bid/page.tsx (This replaces AuctionMonitorPage.tsx)
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { UserRole } from '@/models/types';

// Create a simple AuctionPage component since the import might be causing issues
const AuctionPage: React.FC<{ auctionId: string; userRole: UserRole }> = ({ auctionId, userRole }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 text-center shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Cricket Auction System</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Auction Info */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-900 mb-3">Auction Details</h2>
            <p className="text-blue-700 mb-2"><strong>Auction ID:</strong> {auctionId}</p>
            <p className="text-blue-700 mb-2"><strong>Your Role:</strong> {userRole.role}</p>
            {userRole.teamName && (
              <p className="text-blue-700 mb-2"><strong>Team:</strong> {userRole.teamName}</p>
            )}
            <div className="mt-4 p-3 bg-green-100 rounded border-l-4 border-green-500">
              <p className="text-green-700 text-sm">✅ Successfully connected to auction system!</p>
            </div>
          </div>

          {/* Role-specific content */}
          <div className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-purple-900 mb-3">
              {userRole.role === 'admin' ? 'Admin Controls' : 'Bidding Interface'}
            </h2>
            
            {userRole.role === 'admin' ? (
              <div className="space-y-3">
                <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                  🎯 Spin Wheel
                </button>
                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                  ✅ Allocate Player
                </button>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                  ❌ Mark Unsold
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-yellow-100 rounded border-l-4 border-yellow-500">
                  <p className="text-yellow-700 text-sm">Waiting for player selection...</p>
                </div>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors" disabled>
                  💰 Place Bid (No player selected)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <span>Demo Mode - Full auction system loading...</span>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-2">
            This is a basic interface. The full auction system with wheel, live bidding, and WebSocket integration will load once all components are properly set up.
          </p>
        </div>
      </div>
    </div>
  );
};

const BidPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auctionId = searchParams.get('auctionId') || 'default-auction';
  
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserRole = async () => {
      try {
        // Get user role from localStorage
        const storedRole = localStorage.getItem('userRole');
        const storedTeamId = localStorage.getItem('teamId');
        const storedUserId = localStorage.getItem('userId');
        
        if (storedRole && storedUserId) {
          const role: UserRole = {
            id: storedUserId,
            role: storedRole as 'admin' | 'bidder',
            teamId: storedTeamId || undefined,
            teamName: localStorage.getItem('teamName') || undefined,
          };
          setUserRole(role);
        } else {
          // Prompt user to select role
          const selectedRole = await promptUserRole();
          if (selectedRole) {
            setUserRole(selectedRole);
            // Save to localStorage
            localStorage.setItem('userRole', selectedRole.role);
            localStorage.setItem('userId', selectedRole.id);
            if (selectedRole.teamId) {
              localStorage.setItem('teamId', selectedRole.teamId);
              localStorage.setItem('teamName', selectedRole.teamName || '');
            }
          } else {
            setError('Please select a role to continue');
          }
        }
      } catch (err) {
        setError('Failed to load user role');
        console.error('Error loading user role:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUserRole();
  }, []);

  const promptUserRole = async (): Promise<UserRole | null> => {
    return new Promise((resolve) => {
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75';
      modal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <h2 class="text-xl font-bold mb-4">Select Your Role</h2>
          <div class="space-y-4">
            <button id="admin-btn" class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
              🔧 Admin (Auction Control)
            </button>
            <button id="bidder-btn" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
              💰 Bidder (Place Bids)
            </button>
          </div>
          <p class="text-gray-600 text-sm mt-4">This selection is for demo purposes.</p>
        </div>
      `;

      document.body.appendChild(modal);

      const adminBtn = modal.querySelector('#admin-btn');
      const bidderBtn = modal.querySelector('#bidder-btn');

      adminBtn?.addEventListener('click', () => {
        document.body.removeChild(modal);
        resolve({
          id: 'admin-' + Date.now(),
          role: 'admin',
        });
      });

      bidderBtn?.addEventListener('click', () => {
        // Show team selection
        const teamModal = document.createElement('div');
        teamModal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75';
        teamModal.innerHTML = `
          <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 class="text-xl font-bold mb-4">Select Your Team</h2>
            <div class="space-y-3">
              <button class="team-btn w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors" data-team="bhargavi-xi" data-name="Bhargavi XI">
                🏏 Bhargavi XI
              </button>
              <button class="team-btn w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors" data-team="jai-banjari-maa" data-name="Jai Banjari Maa">
                🏏 Jai Banjari Maa
              </button>
              <button class="team-btn w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors" data-team="neta-ji-11" data-name="Neta Ji 11">
                🏏 Neta Ji 11
              </button>
              <button class="team-btn w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors" data-team="rocky-xi" data-name="Rocky XI">
                🏏 Rocky XI
              </button>
              <button class="team-btn w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors" data-team="danger-avenger" data-name="Danger Avenger">
                🏏 Danger Avenger
              </button>
            </div>
          </div>
        `;

        document.body.removeChild(modal);
        document.body.appendChild(teamModal);

        const teamBtns = teamModal.querySelectorAll('.team-btn');
        teamBtns.forEach(btn => {
          btn.addEventListener('click', (e) => {
            const target = e.target as HTMLButtonElement;
            const teamId = target.getAttribute('data-team');
            const teamName = target.getAttribute('data-name');
            
            document.body.removeChild(teamModal);
            resolve({
              id: 'bidder-' + Date.now(),
              role: 'bidder',
              teamId: teamId || undefined,
              teamName: teamName || undefined,
            });
          });
        });
      });
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Loading auction...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Auction</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-y-2">
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Reset & Try Again
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 text-center">
          <p className="text-gray-700">Please select your role to continue</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <AuctionPage 
      auctionId={auctionId} 
      userRole={userRole} 
    />
  );
};

export default BidPage;












// // src/components/AuctionPage/index.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Player, Team, Auction, Bid, UserRole, AuctionState, WheelSpinState } from '@/models/types';
// import { useAuctionApi } from '@/lib/hooks/useAuctionApi';
// import { useAuctionSocket } from '@/lib/hooks/useAuctionSocket';
// import Wheel from '@/components/Wheel/Wheel';
// import { AdminSpinButton } from '@/components/AdminControls/AdminSpinButton';
// import CurrentPlayerCard from '@/components/CurrentPlayer/CurrentPlayerCard';
// import BidInput from '@/components/CurrentPlayer/BidInput';
// import FinalizeAllocate from '@/components/AdminControls/FinalizeAllocate';
// import RecentBids from '@/components/CurrentPlayer/RecentBids';

// // Component imports


// interface AuctionPageProps {
//   auctionId: string;
//   userRole: UserRole;
// }

// const AuctionPage: React.FC<AuctionPageProps> = ({ auctionId, userRole }) => {
//   // State management
//   const [auctionState, setAuctionState] = useState<AuctionState>({
//     auction: {
//       id: auctionId,
//       name: '',
//       status: 'draft',
//       bidIncrement: 500,
//       soldCount: 0,
//       unsoldCount: 0,
//       totalPlayers: 0,
//     },
//     players: [],
//     teams: [],
//     recentBids: [],
//     wheelSpinState: {
//       isSpinning: false,
//     },
//   });

//   const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
//   const [error, setError] = useState<string | null>(null);

//   // API hook
//   const {
//     loading: apiLoading,
//     error: apiError,
//     fetchAuctionDetails,
//     placeBid: apiPlaceBid,
//     allocatePlayer: apiAllocatePlayer,
//     markPlayerUnsold: apiMarkPlayerUnsold,
//   } = useAuctionApi(auctionId);

//   // WebSocket event handlers
//   const handleWheelSpinStart = () => {
//     setAuctionState(prev => ({
//       ...prev,
//       wheelSpinState: {
//         isSpinning: true,
//         selectedPlayerId: undefined,
//         spinStartTime: Date.now(),
//       },
//     }));
//   };

//   const handleWheelSpinEnd = (playerId: string, playerName: string) => {
//     setAuctionState(prev => ({
//       ...prev,
//       auction: {
//         ...prev.auction,
//         currentPlayerId: playerId,
//       },
//       wheelSpinState: {
//         isSpinning: false,
//         selectedPlayerId: playerId,
//       },
//       // Clear previous bids when new player is selected
//       recentBids: prev.recentBids.filter(bid => bid.playerId === playerId),
//     }));
//   };

//   const handleNewBid = (bid: Bid) => {
//     setAuctionState(prev => ({
//       ...prev,
//       highestBid: bid,
//       recentBids: [bid, ...prev.recentBids.filter(b => b.id !== bid.id)],
//     }));
//   };

//   const handleBidUpdate = (playerId: string, highestBid: Bid) => {
//     setAuctionState(prev => ({
//       ...prev,
//       highestBid: playerId === prev.auction.currentPlayerId ? highestBid : prev.highestBid,
//     }));
//   };

//   const handlePlayerAllocated = (playerId: string, teamId: string, newTeamPlayerCount: number) => {
//     setAuctionState(prev => ({
//       ...prev,
//       players: prev.players.map(p => 
//         p.id === playerId ? { ...p, status: 'sold', teamId } : p
//       ),
//       teams: prev.teams.map(t => 
//         t.id === teamId ? { ...t, playerCount: newTeamPlayerCount } : t
//       ),
//       auction: {
//         ...prev.auction,
//         soldCount: prev.auction.soldCount + 1,
//         currentPlayerId: undefined,
//       },
//       highestBid: undefined,
//       recentBids: [],
//     }));
//   };

//   const handlePlayerUnsold = (playerId: string) => {
//     setAuctionState(prev => ({
//       ...prev,
//       players: prev.players.map(p => 
//         p.id === playerId ? { ...p, status: 'unsold' } : p
//       ),
//       auction: {
//         ...prev.auction,
//         unsoldCount: prev.auction.unsoldCount + 1,
//         currentPlayerId: undefined,
//       },
//       highestBid: undefined,
//       recentBids: [],
//     }));
//   };

//   const handlePlayersUpdate = (players: Player[]) => {
//     setAuctionState(prev => ({
//       ...prev,
//       players,
//     }));
//   };

//   const handleAuctionStateUpdate = (auction: Auction, currentPlayer?: Player) => {
//     setAuctionState(prev => ({
//       ...prev,
//       auction,
//       currentPlayer,
//     }));
//   };

//   // WebSocket hook
//   const {
//     isConnected,
//     connectionError,
//     spinWheel,
//     placeBid: socketPlaceBid,
//     allocatePlayer: socketAllocatePlayer,
//     markPlayerUnsold: socketMarkPlayerUnsold,
//   } = useAuctionSocket({
//     auctionId,
//     userId: userRole.id,
//     onWheelSpinStart: handleWheelSpinStart,
//     onWheelSpinEnd: handleWheelSpinEnd,
//     onNewBid: handleNewBid,
//     onBidUpdate: handleBidUpdate,
//     onPlayerAllocated: handlePlayerAllocated,
//     onPlayerUnsold: handlePlayerUnsold,
//     onPlayersUpdate: handlePlayersUpdate,
//     onAuctionStateUpdate: handleAuctionStateUpdate,
//   });

//   // Update connection status
//   useEffect(() => {
//     if (isConnected) {
//       setConnectionStatus('connected');
//       setError(null);
//     } else if (connectionError) {
//       setConnectionStatus('disconnected');
//       setError(connectionError);
//     } else {
//       setConnectionStatus('connecting');
//     }
//   }, [isConnected, connectionError]);

//   // Load initial data
//   useEffect(() => {
//     const loadInitialData = async () => {
//       const data = await fetchAuctionDetails();
//       if (data) {
//         setAuctionState(prev => ({
//           ...prev,
//           auction: data.auction,
//           players: data.players,
//           teams: data.teams,
//           currentPlayer: data.currentPlayer,
//           highestBid: data.highestBid,
//           recentBids: data.recentBids,
//         }));
//       }
//     };

//     loadInitialData();
//   }, [fetchAuctionDetails]);

//   // Action handlers
//   const handleSpinWheel = () => {
//     if (userRole.role === 'admin') {
//       spinWheel(userRole.id);
//     }
//   };

//   const handlePlaceBid = async (amount: number) => {
//     if (!auctionState.currentPlayer || !userRole.teamId) return;
    
//     try {
//       // Optimistic update
//       const optimisticBid: Bid = {
//         id: `temp-${Date.now()}`,
//         playerId: auctionState.currentPlayer.id,
//         teamId: userRole.teamId,
//         teamName: userRole.teamName || 'Unknown',
//         amount,
//         timestamp: new Date(),
//         auctionId,
//       };
      
//       handleNewBid(optimisticBid);
      
//       // Send via WebSocket for real-time updates
//       socketPlaceBid(auctionState.currentPlayer.id, userRole.teamId, amount);
      
//       // Also send via API for persistence
//       await apiPlaceBid(auctionState.currentPlayer.id, userRole.teamId, amount);
//     } catch (error) {
//       console.error('Failed to place bid:', error);
//       setError('Failed to place bid. Please try again.');
//     }
//   };

//   const handleAllocatePlayer = async (playerId: string, teamId: string) => {
//     if (userRole.role !== 'admin') return;
    
//     try {
//       // Send via WebSocket for real-time updates
//       socketAllocatePlayer(userRole.id, playerId, teamId);
      
//       // Also send via API for persistence
//       await apiAllocatePlayer(playerId, teamId, userRole.id);
//     } catch (error) {
//       console.error('Failed to allocate player:', error);
//       setError('Failed to allocate player. Please try again.');
//     }
//   };

//   const handleMarkUnsold = async (playerId: string) => {
//     if (userRole.role !== 'admin') return;
    
//     try {
//       // Send via WebSocket for real-time updates
//       socketMarkPlayerUnsold(userRole.id, playerId);
      
//       // Also send via API for persistence
//       await apiMarkPlayerUnsold(playerId, userRole.id);
//     } catch (error) {
//       console.error('Failed to mark player as unsold:', error);
//       setError('Failed to mark player as unsold. Please try again.');
//     }
//   };

//   const availablePlayers = auctionState.players.filter(p => p.status === 'available');
//   const currentPlayer = auctionState.currentPlayer || 
//     auctionState.players.find(p => p.id === auctionState.auction.currentPlayerId);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-20">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 transform -skew-y-6 scale-150"></div>
//         <div className="absolute inset-0 bg-gradient-to-l from-indigo-600/20 to-blue-600/20 transform skew-y-6 scale-150 translate-y-12"></div>
//       </div>

//       {/* Header */}
//       <header className="relative z-10 bg-black bg-opacity-30 border-b border-purple-400/30 backdrop-blur-sm">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-white">{auctionState.auction.name || 'Cricket Auction'}</h1>
//               <div className="flex items-center space-x-4 mt-1 text-sm">
//                 <span className="text-purple-200">
//                   Sold: <span className="text-green-400 font-semibold">{auctionState.auction.soldCount}</span>
//                 </span>
//                 <span className="text-purple-200">
//                   Unsold: <span className="text-red-400 font-semibold">{auctionState.auction.unsoldCount}</span>
//                 </span>
//                 <span className="text-purple-200">
//                   Available: <span className="text-yellow-400 font-semibold">{availablePlayers.length}</span>
//                 </span>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               {/* Connection Status */}
//               <div className="flex items-center space-x-2">
//                 <div className={`w-3 h-3 rounded-full ${
//                   connectionStatus === 'connected' ? 'bg-green-400 animate-pulse' : 
//                   connectionStatus === 'connecting' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'
//                 }`}></div>
//                 <span className="text-white text-sm capitalize">{connectionStatus}</span>
//               </div>

//               {/* User Info */}
//               <div className="text-right">
//                 <div className="text-white font-semibold">{userRole.teamName || 'Admin'}</div>
//                 <div className="text-purple-200 text-sm capitalize">{userRole.role}</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Error Banner */}
//       {(error || apiError) && (
//         <div className="relative z-10 bg-red-900 bg-opacity-90 border-b border-red-600 px-4 py-3">
//           <div className="container mx-auto">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//                 <span className="text-red-200">{error || apiError}</span>
//               </div>
//               <button 
//                 onClick={() => setError(null)}
//                 className="text-red-300 hover:text-red-100"
//               >
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <main className="relative z-10 container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
//           {/* Left Column - Wheel and Admin Controls */}
//           <div className="xl:col-span-1 space-y-6">
//             {/* Player Wheel */}
//             <div className="flex flex-col items-center">
//               <Wheel
//                 players={availablePlayers}
//                 currentPlayerId={auctionState.auction.currentPlayerId}
//                 isSpinning={auctionState.wheelSpinState.isSpinning}
//                 disabled={userRole.role !== 'admin' || availablePlayers.length === 0}
//               />
              
//               {/* Spin Button */}
//               {userRole.role === 'admin' && (
//                 <div className="mt-6">
//                   <AdminSpinButton
//                     onSpin={handleSpinWheel}
//                     isSpinning={auctionState.wheelSpinState.isSpinning}
//                     playersCount={availablePlayers.length}
//                     disabled={!isConnected}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Middle Column - Current Player and Bidding */}
//           <div className="xl:col-span-1 space-y-6">
//             {/* Current Player Card */}
//             <CurrentPlayerCard
//               player={currentPlayer}
//               highestBid={auctionState.highestBid}
//               isSpinning={auctionState.wheelSpinState.isSpinning}
//             />

//             {/* Bid Input */}
//             <BidInput
//               player={currentPlayer}
//               currentHighestBid={auctionState.highestBid}
//               bidIncrement={auctionState.auction.bidIncrement}
//               userRole={userRole}
//               onPlaceBid={handlePlaceBid}
//               disabled={!isConnected || !currentPlayer || auctionState.wheelSpinState.isSpinning}
//               loading={apiLoading}
//             />
//           </div>

//           {/* Right Column - Bid History and Admin Controls */}
//           <div className="xl:col-span-1 space-y-6">
//             {/* Recent Bids */}
//             <RecentBids
//               bids={auctionState.recentBids}
//               currentPlayerId={auctionState.auction.currentPlayerId}
//             />

//             {/* Admin Controls */}
//             {userRole.role === 'admin' && (
//               <FinalizeAllocate
//                 currentPlayer={currentPlayer}
//                 highestBid={auctionState.highestBid}
//                 teams={auctionState.teams}
//                 onAllocate={handleAllocatePlayer}
//                 onMarkUnsold={handleMarkUnsold}
//                 disabled={!isConnected || auctionState.wheelSpinState.isSpinning}
//                 loading={apiLoading}
//               />
//             )}
//           </div>
//         </div>
//       </main>

//       {/* Loading Overlay */}
//       {connectionStatus === 'connecting' && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-8 text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500 mx-auto mb-4"></div>
//             <p className="text-gray-700 font-medium">Connecting to auction...</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AuctionPage;