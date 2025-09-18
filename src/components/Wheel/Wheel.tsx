// // // components/Wheel/Wheel.tsx
// // import { useState, useEffect, useRef } from 'react';
// // import { WheelSlice } from './WheelSlice';
// // import { Player } from '../../models/types';
// // import ButtonPrimary from '../Shared/ButtonPrimary';

// // interface WheelProps {
// //   players: Player[];
// //   onSpin: () => void;
// //   spinning: boolean;
// //   selectedPlayerId?: number; // Matches the expected type
// //   isAdmin: boolean;
// // }

// // export const Wheel = ({ players, onSpin, spinning, selectedPlayerId, isAdmin }: WheelProps) => {
// //   const [rotation, setRotation] = useState(0);
// //   const wheelRef = useRef<SVGSVGElement>(null);

// //   // Calculate rotation to align selected player with pointer (top)
// //   useEffect(() => {
// //     if (!spinning && selectedPlayerId !== undefined) {
// //       const selectedIndex = players.findIndex(p => Number(p.id) === selectedPlayerId);
// //       if (selectedIndex !== -1) {
// //         const totalSlices = players.length;
// //         const targetRotation = -(selectedIndex * (360 / totalSlices)); // Rotate to align selected slice at top
// //         setRotation(targetRotation);
// //       }
// //     }
// //   }, [spinning, selectedPlayerId, players]);

// //   // Trigger spin animation
// //   useEffect(() => {
// //     if (spinning) {
// //       const duration = 3000 + Math.random() * 2000;
// //       const spins = 5 + Math.random() * 3;
// //       const targetRotation = rotation + spins * 360 + Math.random() * 360;
// //       setRotation(targetRotation);
// //     }
// //   }, [spinning, rotation]);

// //   const sliceAngle = 360 / players.length;

// //   return (
// //     <div className="relative w-96 h-96 mx-auto">
// //       <svg
// //         ref={wheelRef}
// //         className="w-full h-full"
// //         viewBox="0 0 200 200"
// //         style={{
// //           transform: `rotate(${rotation}deg)`,
// //           transition: spinning ? 'transform 4s cubic-bezier(0.23, 1, 0.320, 1)' : 'none',
// //         }}
// //       >
// //         {players.map((player, index) => (
// //           <WheelSlice
// //             key={player.id}
// //             player={player}
// //             angle={index * sliceAngle}
// //             totalSlices={players.length}
// //             selected={Number(player.id) === selectedPlayerId}
// //             rotation={rotation}
// //           />
// //         ))}
// //         {/* Pointer at top */}
// //         <polygon points="100,0 95,10 105,10" fill="white" />
// //       </svg>
// //       {isAdmin && (
// //         <ButtonPrimary
// //           onClick={onSpin}
// //           disabled={spinning}
// //           className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4"
// //         >
// //           Spin
// //         </ButtonPrimary>
// //       )}
// //     </div>
// //   );
// // };



// // "use client";

// // import { useState, useEffect } from 'react';
// // import { Player } from '../../models/types';
// // import ButtonPrimary from '../Shared/ButtonPrimary';

// // interface WheelProps {
// //   players: Player[];
// //   onSpin: () => void;
// //   spinning: boolean;
// //   selectedPlayerId?: number;
// //   isAdmin: boolean;
// // }

// // const sliceColors = [
// //   '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
// //   '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB',
// //   '#E74C3C', '#2ECC71', '#F1C40F', '#E67E22',
// // ];

// // const WheelSlice = ({
// //   player,
// //   angle,
// //   totalSlices,
// //   sliceIndex,
// // }: {
// //   player: Player;
// //   angle: number;
// //   totalSlices: number;
// //   sliceIndex: number;
// // }) => {
// //   const sliceAngle = 360 / totalSlices;
// //   const endAngle = angle + sliceAngle;
// //   const radius = 100;
// //   const textRadius = 90;

// //   const midAngle = angle + sliceAngle / 2;
// //   const x = 100 + textRadius * Math.cos((midAngle * Math.PI) / 180);
// //   const y = 100 + textRadius * Math.sin((midAngle * Math.PI) / 180);

// //   const pathData = `
// //     M 100 100
// //     L ${100 + radius * Math.cos((angle * Math.PI) / 180)} ${100 + radius * Math.sin((angle * Math.PI) / 180)}
// //     A ${radius} ${radius} 0 ${sliceAngle > 180 ? 1 : 0} 1 ${100 + radius * Math.cos((endAngle * Math.PI) / 180)} ${100 + radius * Math.sin((endAngle * Math.PI) / 180)}
// //     Z
// //   `;

// //   const colorIndex = sliceIndex % sliceColors.length;
// //   const sliceColor = sliceColors[colorIndex];

// //   return (
// //     <g>
// //       <path d={pathData} fill={sliceColor}>
// //         <title>{player.id}</title>
// //       </path>
// //       <text
// //         x={x}
// //         y={y}
// //         textAnchor="middle"
// //         dominantBaseline="middle"
// //         fill="white"
// //         fontSize="14"
// //         transform={`rotate(${midAngle - 90}, ${x}, ${y})`}
// //       >
// //         {player.id}
// //       </text>
// //     </g>
// //   );
// // };

// // export const Wheel = ({
// //   players,
// //   onSpin,
// //   spinning,
// //   selectedPlayerId,
// //   isAdmin,
// // }: WheelProps) => {
// //   const [rotation, setRotation] = useState(0);
// //   const sliceAngle = 360 / players.length;

// //   useEffect(() => {
// //     if (spinning && players.length > 0) {
// //       if (selectedPlayerId === undefined) {
// //         // Temporary random spin while waiting for backend
// //         const randomRotation = rotation + 360 * 3 + Math.random() * 360;
// //         setRotation(randomRotation);
// //       } else {
// //         // Stop on backend-selected slice
// //         const selectedIndex = players.findIndex(p => p.id === selectedPlayerId);
// //         if (selectedIndex === -1) return;

// //         const sliceMid = selectedIndex * sliceAngle + sliceAngle / 2;
// //         const targetRotation = 360 * 3 - sliceMid;

// //         setRotation(targetRotation);
// //       }
// //     }
// //   }, [spinning, selectedPlayerId, players]);

// //   return (
// //     <div className="relative w-[400px] h-[400px] mx-auto p-4 bg-[#2D3748] border-2 border-white rounded-xl">
// //       <svg
// //         className="w-full h-full"
// //         viewBox="0 0 200 200"
// //         style={{
// //           transform: `rotate(${rotation}deg)`,
// //           transition: 'transform 3s ease-out',
// //         }}
// //       >
// //         {players.map((player, index) => (
// //           <WheelSlice
// //             key={player.id}
// //             player={player}
// //             angle={index * sliceAngle}
// //             totalSlices={players.length}
// //             sliceIndex={index}
// //           />
// //         ))}
// //       </svg>

// //       {/* Arrowhead at top */}
// //       <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-16 border-transparent border-t-red-500"></div>

// //       {/* Spin button at top-right */}
// //       {isAdmin && (
// //         <ButtonPrimary
// //           onClick={onSpin}
// //           disabled={spinning}
// //           className="absolute top-(-8) right-4"
// //         >
// //           Spin
// //         </ButtonPrimary>
// //       )}
// //     </div>
// //   );
// // };


// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Player } from "../../models/types";
// import ButtonPrimary from "../Shared/ButtonPrimary";

// interface WheelProps {
//   players: Player[];
//   onSpin: () => void;
//   spinning: boolean;
//   selectedPlayerId?: number;
//   isAdmin: boolean;
// }

// const sliceColors = [
//   "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4",
//   "#FFEEAD", "#D4A5A5", "#9B59B6", "#3498DB",
//   "#E74C3C", "#2ECC71", "#F1C40F", "#E67E22",
// ];

// const WheelSlice = ({
//   player,
//   angle,
//   totalSlices,
//   sliceIndex,
// }: {
//   player: Player;
//   angle: number;
//   totalSlices: number;
//   sliceIndex: number;
// }) => {
//   const sliceAngle = 360 / totalSlices;
//   const endAngle = angle + sliceAngle;
//   const radius = 100;
//   const textRadius = 90;

//   const midAngle = angle + sliceAngle / 2;
//   const x = 100 + textRadius * Math.cos((midAngle * Math.PI) / 180);
//   const y = 100 + textRadius * Math.sin((midAngle * Math.PI) / 180);

//   const pathData = `
//     M 100 100
//     L ${100 + radius * Math.cos((angle * Math.PI) / 180)} ${100 + radius * Math.sin((angle * Math.PI) / 180)}
//     A ${radius} ${radius} 0 ${sliceAngle > 180 ? 1 : 0} 1 ${100 + radius * Math.cos((endAngle * Math.PI) / 180)} ${100 + radius * Math.sin((endAngle * Math.PI) / 180)}
//     Z
//   `;

//   const colorIndex = sliceIndex % sliceColors.length;
//   const sliceColor = sliceColors[colorIndex];

//   return (
//     <g>
//       <path d={pathData} fill={sliceColor}>
//         <title>{player.id}</title>
//       </path>
//       <text
//         x={x}
//         y={y}
//         textAnchor="middle"
//         dominantBaseline="middle"
//         fill="white"
//         fontSize="14"
//         transform={`rotate(${midAngle - 90}, ${x}, ${y})`}
//       >
//         {player.id}
//       </text>
//     </g>
//   );
// };

// export const Wheel = ({
//   players,
//   onSpin,
//   spinning,
//   selectedPlayerId,
//   isAdmin,
// }: WheelProps) => {
//   const [rotation, setRotation] = useState(0);
//   const [isStopping, setIsStopping] = useState(false);
//   const requestRef = useRef<number | null>(null);
//   const lastTime = useRef<number | null>(null);
//   const velocity = useRef(360); // degrees per second

//   const sliceAngle = 360 / players.length;

//   // Continuous spin loop
//   useEffect(() => {
//     if (!spinning) return;

//     const animate = (time: number) => {
//       if (lastTime.current === null) lastTime.current = time;
//       const delta = (time - lastTime.current) / 1000; // seconds
//       lastTime.current = time;

//       setRotation((prev) => prev + velocity.current * delta);
//       requestRef.current = requestAnimationFrame(animate);
//     };

//     requestRef.current = requestAnimationFrame(animate);

//     return () => {
//       if (requestRef.current) cancelAnimationFrame(requestRef.current);
//       lastTime.current = null;
//     };
//   }, [spinning]);

//   // Stop when selectedPlayerId arrives
//   useEffect(() => {
//     if (spinning && selectedPlayerId !== undefined && players.length > 0) {
//       if (requestRef.current) cancelAnimationFrame(requestRef.current);

//       const selectedIndex = players.findIndex((p) => p.id === selectedPlayerId);
//       if (selectedIndex === -1) return;

//       const sliceMid = selectedIndex * sliceAngle + sliceAngle / 2;

//       // Find nearest stop position: 3 extra turns + exact slice
//       const currentRotation = rotation % 360;
//       const targetRotation = rotation + (360 * 3 - (currentRotation + sliceMid) % 360);

//       setIsStopping(true);
//       setRotation(targetRotation);
//     }
//   }, [selectedPlayerId, spinning, players, sliceAngle, rotation]);

//   return (
//     <div className="relative w-[400px] h-[400px] mx-auto p-4 bg-[#2D3748] border-2 border-white rounded-xl">
//       <svg
//         className="w-full h-full"
//         viewBox="0 0 200 200"
//         style={{
//           transform: `rotate(${rotation}deg)`,
//           transition: isStopping ? "transform 3s ease-out" : "none",
//         }}
//       >
//         {players.map((player, index) => (
//           <WheelSlice
//             key={player.id}
//             player={player}
//             angle={index * sliceAngle}
//             totalSlices={players.length}
//             sliceIndex={index}
//           />
//         ))}
//       </svg>

//       {/* Arrowhead */}
//       <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-16 border-transparent border-t-red-500"></div>

//       {/* Spin button */}
//       {isAdmin && (
//         <ButtonPrimary
//           onClick={onSpin}
//           disabled={spinning && !isStopping}
//           className="absolute top-4 right-4"
//         >
//           Spin
//         </ButtonPrimary>
//       )}
//     </div>
//   );
// };



"use client";

import { useState, useEffect } from 'react';
import { Player } from '../../models/types';
import ButtonPrimary from '../Shared/ButtonPrimary';

interface WheelProps {
  players: Player[];
  onSpin: () => void;
  spinning: boolean;
  selectedPlayerId?: number;
  isAdmin: boolean;
}

const sliceColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB',
  '#E74C3C', '#2ECC71', '#F1C40F', '#E67E22',
];

const WheelSlice = ({
  player,
  angle,
  totalSlices,
  sliceIndex,
}: {
  player: Player;
  angle: number;
  totalSlices: number;
  sliceIndex: number;
}) => {
  const sliceAngle = 360 / totalSlices;
  const endAngle = angle + sliceAngle;
  const radius = 100;
  const textRadius = 90;

  const midAngle = angle + sliceAngle / 2;
  const x = 100 + textRadius * Math.cos((midAngle * Math.PI) / 180);
  const y = 100 + textRadius * Math.sin((midAngle * Math.PI) / 180);

  const pathData = `
    M 100 100
    L ${100 + radius * Math.cos((angle * Math.PI) / 180)} ${100 + radius * Math.sin((angle * Math.PI) / 180)}
    A ${radius} ${radius} 0 ${sliceAngle > 180 ? 1 : 0} 1 ${100 + radius * Math.cos((endAngle * Math.PI) / 180)} ${100 + radius * Math.sin((endAngle * Math.PI) / 180)}
    Z
  `;

  const colorIndex = sliceIndex % sliceColors.length;
  const sliceColor = sliceColors[colorIndex];

  return (
    <g>
      <path d={pathData} fill={sliceColor}>
        <title>{player.id}</title>
      </path>
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="14"
        transform={`rotate(${midAngle - 90}, ${x}, ${y})`}
      >
        {player.id}
      </text>
    </g>
  );
};

export const Wheel = ({
  players,
  onSpin,
  spinning,
  selectedPlayerId = 2, // Default to player id 2
  isAdmin,
}: WheelProps) => {
  const [rotation, setRotation] = useState(0);
  const sliceAngle = 360 / players.length;

  useEffect(() => {
    if (spinning && players.length > 0) {
      // Stop on pre-selected player with id=2
      const selectedIndex = players.findIndex(p => p.id === selectedPlayerId);
      if (selectedIndex === -1) {
        console.warn(`Player with id ${selectedPlayerId} not found, defaulting to random spin`);
        const randomRotation = rotation + 360 * 3 + Math.random() * 360;
        setRotation(randomRotation);
        return;
      }

      // Calculate rotation to center the selected player's slice under the arrow
      const sliceMid = selectedIndex * sliceAngle + sliceAngle / 2;
      const targetRotation = 360 * 3 - sliceMid; // Spin 3 full rotations then stop at slice

      setRotation(targetRotation);
    }
  }, [spinning, selectedPlayerId, players, sliceAngle, rotation]);

  return (
    <div className="relative w-[400px] h-[400px] mx-auto p-4 bg-[#2D3748] border-2 border-white rounded-xl">
      <svg
        className="w-full h-full"
        viewBox="0 0 200 200"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: 'transform 3s ease-out',
        }}
      >
        {players.map((player, index) => (
          <WheelSlice
            key={player.id}
            player={player}
            angle={index * sliceAngle}
            totalSlices={players.length}
            sliceIndex={index}
          />
        ))}
      </svg>

      {/* Arrowhead at top */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-16 border-transparent border-t-red-500"></div>

      {/* Spin button at top-right */}
      {isAdmin && (
        <ButtonPrimary
          onClick={onSpin}
          disabled={spinning}
          className="absolute top-[-8px] right-4"
        >
          Spin
        </ButtonPrimary>
      )}
    </div>
  );
};