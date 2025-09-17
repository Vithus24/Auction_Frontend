// src/components/Wheel/WheelSlice.tsx
import React from 'react';
import { Player } from '@/models/types';

interface WheelSliceProps {
  player: Player;
  startAngle: number;
  sliceAngle: number;
  isSelected: boolean;
  radius: number;
  index: number;
}

const WheelSlice: React.FC<WheelSliceProps> = ({
  player,
  startAngle,
  sliceAngle,
  isSelected,
  radius,
  index,
}) => {
  // Calculate the path for the slice
  const centerX = radius;
  const centerY = radius;
  const outerRadius = radius - 8; // Account for border
  const innerRadius = 20; // Inner circle radius

  const startAngleRad = (startAngle * Math.PI) / 180;
  const endAngleRad = ((startAngle + sliceAngle) * Math.PI) / 180;

  // Calculate points for the slice path
  const x1 = centerX + innerRadius * Math.cos(startAngleRad);
  const y1 = centerY + innerRadius * Math.sin(startAngleRad);
  const x2 = centerX + outerRadius * Math.cos(startAngleRad);
  const y2 = centerY + outerRadius * Math.sin(startAngleRad);
  
  const x3 = centerX + outerRadius * Math.cos(endAngleRad);
  const y3 = centerY + outerRadius * Math.sin(endAngleRad);
  const x4 = centerX + innerRadius * Math.cos(endAngleRad);
  const y4 = centerY + innerRadius * Math.sin(endAngleRad);

  const largeArcFlag = sliceAngle > 180 ? 1 : 0;

  const pathData = [
    `M ${x1} ${y1}`,
    `L ${x2} ${y2}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x3} ${y3}`,
    `L ${x4} ${y4}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1} ${y1}`,
  ].join(' ');

  // Calculate text position (middle of the slice)
  const textAngle = startAngle + sliceAngle / 2;
  const textAngleRad = (textAngle * Math.PI) / 180;
  const textRadius = (innerRadius + outerRadius) / 2;
  const textX = centerX + textRadius * Math.cos(textAngleRad);
  const textY = centerY + textRadius * Math.sin(textAngleRad);

  // Slice colors - alternate between different shades
  const sliceIndex = Math.floor(startAngle / sliceAngle);
  const colors = [
    { bg: '#3b82f6', border: '#2563eb' }, // Blue
    { bg: '#8b5cf6', border: '#7c3aed' }, // Purple  
    { bg: '#06b6d4', border: '#0891b2' }, // Cyan
    { bg: '#10b981', border: '#059669' }, // Emerald
    { bg: '#f59e0b', border: '#d97706' }, // Amber
    { bg: '#ef4444', border: '#dc2626' }, // Red
  ];
  
  const color = colors[sliceIndex % colors.length];
  const selectedColor = { bg: '#fbbf24', border: '#f59e0b' }; // Golden yellow for selected

  const currentColor = isSelected ? selectedColor : color;

  return (
    <g>
      {/* Slice Background */}
      <path
        d={pathData}
        fill={currentColor.bg}
        stroke={currentColor.border}
        strokeWidth="1"
        className={`transition-all duration-300 ${
          isSelected ? 'drop-shadow-lg' : 'hover:brightness-110'
        }`}
      />
      
      {/* Player ID Text */}
      <text
        x={textX}
        y={textY}
        fill="white"
        fontSize="14"
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="central"
        className={`pointer-events-none select-none ${
          isSelected ? 'text-black' : 'text-white'
        }`}
        transform={`rotate(${textAngle > 90 && textAngle < 270 ? textAngle + 180 : textAngle}, ${textX}, ${textY})`}
      >
        {player.id}
      </text>

      {/* Selection Indicator */}
      {isSelected && (
        <circle
          cx={textX}
          cy={textY}
          r="8"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          className="animate-pulse"
        />
      )}
    </g>
  );
};

export default WheelSlice;