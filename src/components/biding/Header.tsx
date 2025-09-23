"use client";

import React, { useState, useEffect } from "react";

// Mock data for teams and players
const mockTeams = [
  { id: 1, name: "PURBEE XI", logo: "/team1.jpg", maxBid: 100, reserve: 950, players: 9 },
  { id: 2, name: "SHOBHAN XI", logo: "/team2.jpg", maxBid: 350, reserve: 800, players: 13 },
  { id: 3, name: "RR XI", logo: "/team3.jpg", maxBid: 950, reserve: 950, players: 17 },
  { id: 4, name: "AYUSH 11", logo: "/team4.jpg", maxBid: 1600, reserve: 1750, players: 15 },
];

const mockPlayers = [
  { id: 1, name: "Mohan Pradhan", role: "All Rounder", team: "RR XI", bid: 150, status: "sold", photo: "/player1.jpg" },
  { id: 2, name: "Ananda Chandra Hota", role: "All Rounder", team: "RTP KINGS", bid: 2400, status: "sold", photo: "/player2.jpg" },
  { id: 3, name: "Abhishek Thakur", role: "Bowler", team: "RR XI", bid: 450, status: "sold", photo: "/player3.jpg" },
  { id: 4, name: "Akash Jaypuria", role: "All Rounder", team: "RR XI", bid: 900, status: "sold", photo: "/player4.jpg" },
  { id: 5, name: "Bikash Rout", role: "All Rounder", team: "RTP KINGS", bid: 900, status: "sold", photo: "/player5.jpg" },
  { id: 6, name: "Gulshan Choudhury", role: "Wicket Keeper", team: "PURBEE XI", bid: 150, status: "sold", photo: "/player6.jpg" },
  { id: 7, name: "Prakash Kumar Prusty", role: "All Rounder", team: "JAY BAJRANG CLUB", bid: 150, status: "sold", photo: "/player7.jpg" },
  { id: 8, name: "Prithvi Raj", role: "All Rounder", team: "JMBD", bid: 150, status: "sold", photo: "/player8.jpg" },
  { id: 9, name: "Raj Kumar Chauhan", role: "All Rounder", team: "RTP KINGS", bid: 400, status: "sold", photo: "/player9.jpg" },
  { id: 10, name: "Rinku Naik", role: "All Rounder", team: "AYUSH 11", bid: 900, status: "sold", photo: "/player10.jpg" },
  { id: 11, name: "Somnath Thakur", role: "All Rounder", team: "JMBD", bid: 3600, status: "sold", photo: "/player11.jpg" },
  { id: 12, name: "Sunil Bag", role: "All Rounder", team: "SHOBHAN XI", bid: 2400, status: "sold", photo: "/player12.jpg" },
];

const AuctionPage = () => {
  const [activeTab, setActiveTab] = useState<"teams" | "players">("players");
  const [activeFilter, setActiveFilter] = useState<"all" | "available" | "sold" | "unsold">("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [showListView, setShowListView] = useState<boolean>(false);
  const [teams, setTeams] = useState(mockTeams);
  const [players, setPlayers] = useState(mockPlayers);
  const [soldCount, setSoldCount] = useState(0);
  const [unsoldCount, setUnsoldCount] = useState(0);
  const [availableCount, setAvailableCount] = useState(0);

  // Simulate fetching data from an endpoint
  useEffect(() => {
    const fetchAuctionData = async () => {
      // Simulate API call with mock data
      const sold = players.filter(p => p.status === "sold").length;
      const unsold = players.filter(p => p.status === "unsold").length;
      const available = players.filter(p => p.status === "available").length;
      setSoldCount(sold);
      setUnsoldCount(unsold);
      setAvailableCount(available);
    };
    fetchAuctionData();
  }, [players]);

  const handleTabChange = (tab: "teams" | "players") => {
    setActiveTab(tab);
  };

  const handleFilterChange = (filter: "all" | "available" | "sold" | "unsold") => {
    setActiveFilter(filter);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    // Simulate sorting logic
    let sortedPlayers = [...players];
    switch (sort) {
      case "name":
        sortedPlayers.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price":
        sortedPlayers.sort((a, b) => b.bid - a.bid);
        break;
      case "role":
        sortedPlayers.sort((a, b) => a.role.localeCompare(b.role));
        break;
      case "team":
        sortedPlayers.sort((a, b) => a.team.localeCompare(b.team));
        break;
      case "status":
        sortedPlayers.sort((a, b) => a.status.localeCompare(b.status));
        break;
    }
    setPlayers(sortedPlayers);
  };

  const handleViewChange = (listView: boolean) => {
    setShowListView(listView);
  };

  const filteredPlayers = players.filter(player => {
    if (activeFilter === "all") return true;
    if (activeFilter === "sold") return player.status === "sold";
    if (activeFilter === "unsold") return player.status === "unsold";
    if (activeFilter === "available") return player.status === "available";
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 text-white">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 border-b border-blue-700 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Left Side - Tabs */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleTabChange("teams")}
                className={`
                  px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105
                  ${activeTab === "teams" ? "bg-yellow-400 text-black shadow-lg" : "bg-transparent text-white border border-blue-400 hover:bg-blue-800"}
                `}
              >
                TEAMS
              </button>
              <button
                onClick={() => handleTabChange("players")}
                className={`
                  px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105
                  ${activeTab === "players" ? "bg-yellow-400 text-black shadow-lg" : "bg-transparent text-white border border-blue-400 hover:bg-blue-800"}
                `}
              >
                PLAYERS
              </button>
            </div>

            {/* Center - Stats Badges */}
            {activeTab === "teams" && (
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center space-x-2 shadow-lg">
                  <span>SOLD:</span>
                  <span>{soldCount}</span>
                </div>
                <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center space-x-2 shadow-lg">
                  <span>UNSOLD:</span>
                  <span>{unsoldCount}</span>
                </div>
                <div className="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold text-sm flex items-center space-x-2 shadow-lg">
                  <span>AVL:</span>
                  <span>{availableCount}</span>
                </div>
              </div>
            )}
            {activeTab === "players" && (
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center space-x-2 shadow-lg">
                  <span>SOLD:</span>
                  <span>{96}</span>
                </div>
                <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center space-x-2 shadow-lg">
                  <span>UNSOLD:</span>
                  <span>{55}</span>
                </div>
                <div className="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold text-sm flex items-center space-x-2 shadow-lg">
                  <span>AVL:</span>
                  <span>{30}</span>
                </div>
              </div>
            )}

            {/* Right Side - Controls */}
            <div className="flex items-center space-x-3">
              {/* Filter Buttons (Only for Players tab) */}
              {activeTab === "players" && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleFilterChange("all")}
                    className={`
                      px-3 py-2 rounded-lg font-medium text-sm transition-colors
                      ${activeFilter === "all" ? "bg-blue-500 text-white" : "bg-blue-800 text-blue-200 hover:bg-blue-700"}
                    `}
                  >
                    All
                  </button>
                  <button
                    onClick={() => handleFilterChange("available")}
                    className={`
                      px-3 py-2 rounded-lg font-medium text-sm transition-colors
                      ${activeFilter === "available" ? "bg-blue-500 text-white" : "bg-blue-800 text-blue-200 hover:bg-blue-700"}
                    `}
                  >
                    AVL
                  </button>
                  <button
                    onClick={() => handleFilterChange("sold")}
                    className={`
                      px-3 py-2 rounded-lg font-medium text-sm transition-colors
                      ${activeFilter === "sold" ? "bg-blue-500 text-white" : "bg-blue-800 text-blue-200 hover:bg-blue-700"}
                    `}
                  >
                    SOLD
                  </button>
                  <button
                    onClick={() => handleFilterChange("unsold")}
                    className={`
                      px-3 py-2 rounded-lg font-medium text-sm transition-colors
                      ${activeFilter === "unsold" ? "bg-blue-500 text-white" : "bg-blue-800 text-blue-200 hover:bg-blue-700"}
                    `}
                  >
                    UNSOLD
                  </button>
                </div>
              )}

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg font-medium text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer pr-8"
                >
                  <option value="name">Sort By Name</option>
                  <option value="price">Sort By Price</option>
                  <option value="role">Sort By Role</option>
                  <option value="team">Sort By Team</option>
                  <option value="status">Sort By Status</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center space-x-1 bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => handleViewChange(false)}
                  className={`
                    p-2 rounded transition-colors
                    ${!showListView ? "bg-blue-500 text-white" : "text-gray-400 hover:text-white"}
                  `}
                  title="Grid View"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleViewChange(true)}
                  className={`
                    p-2 rounded transition-colors
                    ${showListView ? "bg-blue-500 text-white" : "text-gray-400 hover:text-white"}
                  `}
                  title="List View"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-6">
        {activeTab === "teams" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {teams.map((team) => (
              <div
                key={team.id}
                className="bg-blue-800 rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={team.logo}
                  alt={`${team.name} logo`}
                  className="w-20 h-20 mx-auto mb-2"
                />
                <h3 className="text-lg font-bold">{team.name}</h3>
                <p className="text-yellow-400">Max - {team.maxBid}</p>
                <p className="text-green-400">Res {team.reserve}</p>
                <p className="text-gray-300">{team.players} Players</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "players" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredPlayers.map((player) => (
              <div
                key={player.id}
                className="bg-green-800 rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={player.photo}
                  alt={`${player.name} photo`}
                  className="w-20 h-20 mx-auto mb-2 rounded-full"
                />
                <h3 className="text-lg font-bold">{player.name}</h3>
                <p className="text-yellow-400">{player.role}</p>
                <p className="text-green-400">{player.team}</p>
                <p className="text-gray-300">{player.bid}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionPage;