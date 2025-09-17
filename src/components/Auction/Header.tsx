import React, { useState } from 'react';

interface TeamPlayerHeaderProps {
  activeTab: 'teams' | 'players';
  onTabChange: (tab: 'teams' | 'players') => void;
  soldCount: number;
  unsoldCount: number;
  availableCount: number;
  activeFilter?: 'all' | 'available' | 'sold' | 'unsold';
  onFilterChange?: (filter: 'all' | 'available' | 'sold' | 'unsold') => void;
  sortBy?: string;
  onSortChange?: (sort: string) => void;
  showListView?: boolean;
  onViewChange?: (listView: boolean) => void;
}

const Header: React.FC<TeamPlayerHeaderProps> = ({
  activeTab,
  onTabChange,
  soldCount,
  unsoldCount,
  availableCount,
  activeFilter = 'all',
  onFilterChange,
  sortBy = 'name',
  onSortChange,
  showListView = false,
  onViewChange,
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-indigo-900 border-b border-blue-700 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Left Side - Tabs */}
          <div className="flex items-center space-x-2">
            {/* Teams Tab */}
            <button
              onClick={() => onTabChange('teams')}
              className={`
                px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105
                ${activeTab === 'teams' 
                  ? 'bg-orange-400 text-black shadow-lg' 
                  : 'bg-transparent text-white border border-blue-400 hover:bg-blue-800'
                }
              `}
            >
              TEAMS
            </button>

            {/* Players Tab */}
            <button
              onClick={() => onTabChange('players')}
              className={`
                px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105
                ${activeTab === 'players' 
                  ? 'bg-orange-400 text-black shadow-lg' 
                  : 'bg-transparent text-white border border-blue-400 hover:bg-blue-800'
                }
              `}
            >
              PLAYERS
            </button>
          </div>

          {/* Center - Stats Badges */}
          <div className="flex items-center space-x-3">
            {/* Sold Badge */}
            <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center space-x-2 shadow-lg">
              <span>SOLD:</span>
              <span>{soldCount}</span>
            </div>

            {/* Unsold Badge */}
            <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center space-x-2 shadow-lg">
              <span>UNSOLD:</span>
              <span>{unsoldCount}</span>
            </div>

            {/* Available Badge */}
            <div className="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold text-sm flex items-center space-x-2 shadow-lg">
              <span>AVL:</span>
              <span>{availableCount}</span>
            </div>

            {/* Sound Icon */}
            <button className="p-2 text-white hover:text-yellow-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.147 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.147l4.236-3.793zM15.854 6.146a1 1 0 010 1.414L14.414 9l1.44 1.44a1 1 0 01-1.414 1.414L13 10.414l-1.44 1.44a1 1 0 01-1.414-1.414L11.586 9l-1.44-1.44a1 1 0 011.414-1.414L13 7.586l1.44-1.44a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Right Side - Controls */}
          <div className="flex items-center space-x-3">
            {/* Filter Buttons (Only for Players tab) */}
            {activeTab === 'players' && onFilterChange && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onFilterChange('all')}
                  className={`
                    px-3 py-2 rounded-lg font-medium text-sm transition-colors
                    ${activeFilter === 'all' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-blue-800 text-blue-200 hover:bg-blue-700'
                    }
                  `}
                >
                  All
                </button>
                <button
                  onClick={() => onFilterChange('available')}
                  className={`
                    px-3 py-2 rounded-lg font-medium text-sm transition-colors
                    ${activeFilter === 'available' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-blue-800 text-blue-200 hover:bg-blue-700'
                    }
                  `}
                >
                  AVL
                </button>
                <button
                  onClick={() => onFilterChange('sold')}
                  className={`
                    px-3 py-2 rounded-lg font-medium text-sm transition-colors
                    ${activeFilter === 'sold' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-blue-800 text-blue-200 hover:bg-blue-700'
                    }
                  `}
                >
                  SOLD
                </button>
                <button
                  onClick={() => onFilterChange('unsold')}
                  className={`
                    px-3 py-2 rounded-lg font-medium text-sm transition-colors
                    ${activeFilter === 'unsold' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-blue-800 text-blue-200 hover:bg-blue-700'
                    }
                  `}
                >
                  UNSOLD
                </button>
              </div>
            )}

            {/* Sort Dropdown */}
            {onSortChange && (
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg font-medium text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer pr-8"
                >
                  <option value="name">Sort By Name</option>
                  <option value="price">Sort By Price</option>
                  <option value="role">Sort By Role</option>
                  <option value="team">Sort By Team</option>
                  <option value="status">Sort By Status</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}

            {/* View Toggle */}
            {onViewChange && (
              <div className="flex items-center space-x-1 bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => onViewChange(false)}
                  className={`
                    p-2 rounded transition-colors
                    ${!showListView ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}
                  `}
                  title="Grid View"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => onViewChange(true)}
                  className={`
                    p-2 rounded transition-colors
                    ${showListView ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}
                  `}
                  title="List View"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;