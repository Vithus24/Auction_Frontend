// src/pages/BidPage.tsx
'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import AuctionPage from '@/components/AuctionPage';
// import { UserRole } from '@/models/types';

// const BidPage: React.FC = () => {
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

//   // if (loading) {
//   //   return (
//   //     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
//   //       <div className="bg-white rounded-lg p-8 text-center">
//   //         <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500 mx-auto mb-4"></div>
//   //         <p className="text-gray-700 font-medium">Loading auction...</p>
//   //       </div>
//   //     </div>
//   //   );
//   // }

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

//   // if (!auctionId || !userRole) {
//   //   return (
//   //     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
//   //       <div className="bg-white rounded-lg p-8 text-center">
//   //         <p className="text-gray-700">Invalid auction ID or user role</p>
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   return (
//     <AuctionPage 
//       auctionId={auctionId as string} 
//       userRole={userRole} 
//     />
//   );
// };

// export default BidPage;

// // // src/app/bid/page.tsx (This replaces BidPage.tsx)
// // 'use client';

// // import React, { useEffect, useState } from 'react';
// // import { useRouter, useSearchParams } from 'next/navigation';
// // import { UserRole } from '@/models/types';

// // // Create a simple AuctionPage component since the import might be causing issues
// // const AuctionPage: React.FC<{ auctionId: string; userRole: UserRole }> = ({ auctionId, userRole }) => {
// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
// //       <div className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 text-center shadow-2xl">
// //         <h1 className="text-3xl font-bold text-gray-900 mb-6">Cricket Auction System</h1>
        
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //           {/* Auction Info */}
// //           <div className="bg-blue-50 p-6 rounded-lg">
// //             <h2 className="text-xl font-semibold text-blue-900 mb-3">Auction Details</h2>
// //             <p className="text-blue-700 mb-2"><strong>Auction ID:</strong> {auctionId}</p>
// //             <p className="text-blue-700 mb-2"><strong>Your Role:</strong> {userRole.role}</p>
// //             {userRole.teamName && (
// //               <p className="text-blue-700 mb-2"><strong>Team:</strong> {userRole.teamName}</p>
// //             )}
// //             <div className="mt-4 p-3 bg-green-100 rounded border-l-4 border-green-500">
// //               <p className="text-green-700 text-sm">✅ Successfully connected to auction system!</p>
// //             </div>
// //           </div>

// //           {/* Role-specific content */}
// //           <div className="bg-purple-50 p-6 rounded-lg">
// //             <h2 className="text-xl font-semibold text-purple-900 mb-3">
// //               {userRole.role === 'admin' ? 'Admin Controls' : 'Bidding Interface'}
// //             </h2>
            
// //             {userRole.role === 'admin' ? (
// //               <div className="space-y-3">
// //                 <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
// //                   🎯 Spin Wheel
// //                 </button>
// //                 <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
// //                   ✅ Allocate Player
// //                 </button>
// //                 <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
// //                   ❌ Mark Unsold
// //                 </button>
// //               </div>
// //             ) : (
// //               <div className="space-y-3">
// //                 <div className="p-3 bg-yellow-100 rounded border-l-4 border-yellow-500">
// //                   <p className="text-yellow-700 text-sm">Waiting for player selection...</p>
// //                 </div>
// //                 <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors" disabled>
// //                   💰 Place Bid (No player selected)
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Status */}
// //         <div className="mt-8 p-4 bg-gray-50 rounded-lg">
// //           <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
// //             <div className="flex items-center space-x-2">
// //               <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
// //               <span>Demo Mode - Full auction system loading...</span>
// //             </div>
// //           </div>
// //           <p className="text-gray-500 text-xs mt-2">
// //             This is a basic interface. The full auction system with wheel, live bidding, and WebSocket integration will load once all components are properly set up.
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const BidPage: React.FC = () => {
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const auctionId = searchParams.get('auctionId') || 'default-auction';
  
// //   const [userRole, setUserRole] = useState<UserRole | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     const loadUserRole = async () => {
// //       try {
// //         // Get user role from localStorage
// //         const storedRole = localStorage.getItem('userRole');
// //         const storedTeamId = localStorage.getItem('teamId');
// //         const storedUserId = localStorage.getItem('userId');
        
// //         if (storedRole && storedUserId) {
// //           const role: UserRole = {
// //             id: storedUserId,
// //             role: storedRole as 'admin' | 'bidder',
// //             teamId: storedTeamId || undefined,
// //             teamName: localStorage.getItem('teamName') || undefined,
// //           };
// //           setUserRole(role);
// //         } else {
// //           // Prompt user to select role
// //           const selectedRole = await promptUserRole();
// //           if (selectedRole) {
// //             setUserRole(selectedRole);
// //             // Save to localStorage
// //             localStorage.setItem('userRole', selectedRole.role);
// //             localStorage.setItem('userId', selectedRole.id);
// //             if (selectedRole.teamId) {
// //               localStorage.setItem('teamId', selectedRole.teamId);
// //               localStorage.setItem('teamName', selectedRole.teamName || '');
// //             }
// //           } else {
// //             setError('Please select a role to continue');
// //           }
// //         }
// //       } catch (err) {
// //         setError('Failed to load user role');
// //         console.error('Error loading user role:', err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadUserRole();
// //   }, []);

// //   const promptUserRole = async (): Promise<UserRole | null> => {
// //     return new Promise((resolve) => {
// //       const modal = document.createElement('div');
// //       modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75';
// //       modal.innerHTML = `
// //         <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
// //           <h2 class="text-xl font-bold mb-4">Select Your Role</h2>
// //           <div class="space-y-4">
// //             <button id="admin-btn" class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
// //               🔧 Admin (Auction Control)
// //             </button>
// //             <button id="bidder-btn" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
// //               💰 Bidder (Place Bids)
// //             </button>
// //           </div>
// //           <p class="text-gray-600 text-sm mt-4">This selection is for demo purposes.</p>
// //         </div>
// //       `;

// //       document.body.appendChild(modal);

// //       const adminBtn = modal.querySelector('#admin-btn');
// //       const bidderBtn = modal.querySelector('#bidder-btn');

// //       adminBtn?.addEventListener('click', () => {
// //         document.body.removeChild(modal);
// //         resolve({
// //           id: 'admin-' + Date.now(),
// //           role: 'admin',
// //         });
// //       });

// //       bidderBtn?.addEventListener('click', () => {
// //         // Show team selection
// //         const teamModal = document.createElement('div');
// //         teamModal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75';
// //         teamModal.innerHTML = `
// //           <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
// //             <h2 class="text-xl font-bold mb-4">Select Your Team</h2>
// //             <div class="space-y-3">
// //               <button class="team-btn w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors" data-team="bhargavi-xi" data-name="Bhargavi XI">
// //                 🏏 Bhargavi XI
// //               </button>
// //               <button class="team-btn w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors" data-team="jai-banjari-maa" data-name="Jai Banjari Maa">
// //                 🏏 Jai Banjari Maa
// //               </button>
// //               <button class="team-btn w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors" data-team="neta-ji-11" data-name="Neta Ji 11">
// //                 🏏 Neta Ji 11
// //               </button>
// //               <button class="team-btn w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors" data-team="rocky-xi" data-name="Rocky XI">
// //                 🏏 Rocky XI
// //               </button>
// //               <button class="team-btn w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors" data-team="danger-avenger" data-name="Danger Avenger">
// //                 🏏 Danger Avenger
// //               </button>
// //             </div>
// //           </div>
// //         `;

// //         document.body.removeChild(modal);
// //         document.body.appendChild(teamModal);

// //         const teamBtns = teamModal.querySelectorAll('.team-btn');
// //         teamBtns.forEach(btn => {
// //           btn.addEventListener('click', (e) => {
// //             const target = e.target as HTMLButtonElement;
// //             const teamId = target.getAttribute('data-team');
// //             const teamName = target.getAttribute('data-name');
            
// //             document.body.removeChild(teamModal);
// //             resolve({
// //               id: 'bidder-' + Date.now(),
// //               role: 'bidder',
// //               teamId: teamId || undefined,
// //               teamName: teamName || undefined,
// //             });
// //           });
// //         });
// //       });
// //     });
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
// //         <div className="bg-white rounded-lg p-8 text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500 mx-auto mb-4"></div>
// //           <p className="text-gray-700 font-medium">Loading auction...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
// //         <div className="bg-white rounded-lg p-8 text-center max-w-md">
// //           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //             <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //             </svg>
// //           </div>
// //           <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Auction</h2>
// //           <p className="text-gray-600 mb-4">{error}</p>
// //           <div className="space-y-2">
// //             <button
// //               onClick={() => {
// //                 localStorage.clear();
// //                 window.location.reload();
// //               }}
// //               className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
// //             >
// //               Reset & Try Again
// //             </button>
// //             <button
// //               onClick={() => router.push('/')}
// //               className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
// //             >
// //               Go Home
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!userRole) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
// //         <div className="bg-white rounded-lg p-8 text-center">
// //           <p className="text-gray-700">Please select your role to continue</p>
// //           <button
// //             onClick={() => window.location.reload()}
// //             className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
// //           >
// //             Refresh
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <AuctionPage 
// //       auctionId={auctionId} 
// //       userRole={userRole} 
// //     />
// //   );
// // };

// // export default BidPage;


// src/app/bid/page.tsx (Simplified - No Authentication)
'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import AuctionPage from '@/components/AuctionPage';
import { UserRole } from '@/models/types';

const BidPage: React.FC = () => {
  const searchParams = useSearchParams();
  const auctionId = searchParams.get('auctionId') || 'default-auction';
  
  // Default user role - change this to test different roles
  const [userRole] = useState<UserRole>({
    id: 'user-' + Date.now(),
    role: 'admin', // Change to 'bidder' to test bidder interface
    teamId: 'bhargavi-xi', // Only needed if role is 'bidder'
    teamName: 'Bhargavi XI', // Only needed if role is 'bidder'
  });

  // For bidder role, use this instead:
  /*
  const [userRole] = useState<UserRole>({
    id: 'user-' + Date.now(),
    role: 'bidder',
    teamId: 'bhargavi-xi',
    teamName: 'Bhargavi XI',
  });
  */

  return (
    <AuctionPage 
      auctionId={auctionId} 
      userRole={userRole} 
    />
  );
};

export default BidPage;