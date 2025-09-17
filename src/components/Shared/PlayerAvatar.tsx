import React from 'react';

interface PlayerAvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
  src,
  alt,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  // Extract initials from alt text (player name)
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            // Fallback to initials if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      ) : null}
      
      {/* Fallback initials */}
      <div 
        className={`
          ${!src ? 'flex' : 'absolute inset-0 hidden'} 
          items-center justify-center rounded-full 
          bg-gradient-to-br from-blue-500 to-purple-600 
          text-white font-bold ${textSizeClasses[size]}
        `}
      >
        {getInitials(alt)}
      </div>
    </div>
  );
};
export default PlayerAvatar;