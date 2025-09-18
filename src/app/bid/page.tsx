"use client";

import { Card, CardContent } from "@mui/material";
import React, { useState, useEffect } from "react";
const mockTeams = [
  {
    id: 1,
    name: "B UNITED",
    logo: "/team-logos/b-united.png",
    playerCount: 1,
    maxBudget: 63500000,
    remainingBudget: 14000000,
    currentBid: 77500000,
  },
  {
    id: 2,
    name: "META TITANS",
    logo: "/team-logos/meta-titans.png",
    playerCount: 1,
    maxBudget: 76000000,
    remainingBudget: 14000000,
    currentBid: 90000000,
  },
  {
    id: 3,
    name: "MRB ROYALS",
    logo: "/team-logos/mrb-royals.png",
    playerCount: 1,
    maxBudget: 76000000,
    remainingBudget: 14000000,
    currentBid: 90000000,
  },
  {
    id: 4,
    name: "MUNOT SMASHERS",
    logo: "/team-logos/munot-smashers.png",
    playerCount: 1,
    maxBudget: 76000000,
    remainingBudget: 14000000,
    currentBid: 90000000,
  },
  {
    id: 5,
    name: "RAJPUTANA RANGERS",
    logo: "/team-logos/rajputana-rangers.png",
    playerCount: 1,
    maxBudget: 71000000,
    remainingBudget: 14000000,
    currentBid: 85000000,
  },
  {
    id: 6,
    name: "REAL CMR ROYALS",
    logo: "/team-logos/real-cmr-royals.png",
    playerCount: 1,
    maxBudget: 71000000,
    remainingBudget: 14000000,
    currentBid: 85000000,
  },
  {
    id: 7,
    name: "REVANT ROYALS",
    logo: "/team-logos/revant-royals.png",
    playerCount: 2,
    maxBudget: 75400000,
    remainingBudget: 13000000,
    currentBid: 88400000,
  },
  {
    id: 8,
    name: "WARRIORS",
    logo: "/team-logos/warriors.png",
    playerCount: 1,
    maxBudget: 76000000,
    remainingBudget: 14000000,
    currentBid: 90000000,
  },
];

// Mock data for players
const mockPlayers = [
  {
    id: 1,
    name: "ARSHIL DOSHI",
    role: "ALLROUNDER",
    batting: "LBH",
    bowling: "Right Arm Fast",
    age: "17 Yrs",
    photo: "/players/arshil-doshi.jpg",
    status: "available",
    basePrice: 150000,
    team: "REAL CMR ROYALS",
    soldPrice: 1500000,
  },
  {
    id: 2,
    name: "Abhi shah",
    role: "BATSMAN",
    batting: "RBH",
    bowling: "Right Arm Fast",
    age: "27 Yrs",
    photo: "/players/abhi-shah.jpg",
    status: "available",
    basePrice: 150000,
    team: "",
    soldPrice: 0,
  },
  {
    id: 3,
    name: "Abhishek mehta",
    role: "BATSMAN",
    batting: "RBH",
    bowling: "",
    age: "39 Yrs",
    photo: "/players/abhishek-mehta.jpg",
    status: "available",
    basePrice: 150000,
    team: "",
    soldPrice: 0,
  },
  {
    id: 4,
    name: "Ajit m shah",
    role: "ALLROUNDER",
    batting: "RBH",
    bowling: "Right Arm Spin",
    age: "36 Yrs",
    photo: "/players/ajit-shah.jpg",
    status: "available",
    basePrice: 150000,
    team: "",
    soldPrice: 0,
  },
  {
    id: 5,
    name: "Akash S sanghvi",
    role: "ALLROUNDER",
    batting: "RBH",
    bowling: "Left Arm Fast",
    age: "31 Yrs",
    photo: "/players/akash-sanghvi.jpg",
    status: "available",
    basePrice: 150000,
    team: "",
    soldPrice: 0,
  },
  {
    id: 6,
    name: "Amit Sanghvi",
    role: "BATSMAN",
    batting: "RBH",
    bowling: "Right Arm Fast",
    age: "41 Yrs",
    photo: "/players/amit-sanghvi.jpg",
    status: "available",
    basePrice: 150000,
    team: "",
    soldPrice: 0,
  },
  {
    id: 7,
    name: "Ankit Ramesh Sanghvi",
    role: "ALLROUNDER",
    batting: "LBH",
    bowling: "Right Arm Spin",
    age: "36 Yrs",
    photo: "/players/ankit-sanghvi.jpg",
    status: "sold",
    basePrice: 150000,
    team: "REAL CMR ROYALS",
    soldPrice: 1500000,
  },
  {
    id: 8,
    name: "Ashik Mehta",
    role: "ALLROUNDER",
    batting: "RBH",
    bowling: "Right Arm Spin",
    age: "32 Yrs",
    photo: "/players/ashik-mehta.jpg",
    status: "available",
    basePrice: 150000,
    team: "",
    soldPrice: 0,
  },
  {
    id: 9,
    name: "Atit Shah",
    role: "BOWLER",
    batting: "RBH",
    bowling: "Left Arm Fast",
    age: "26 Yrs",
    photo: "/players/atit-shah.jpg",
    status: "available",
    basePrice: 150000,
    team: "",
    soldPrice: 0,
  },
  {
    id: 10,
    name: "Ayaan Vikram Sanghvi",
    role: "BOWLER",
    batting: "RBH",
    bowling: "Right Arm Fast",
    age: "16 Yrs",
    photo: "/players/ayaan-sanghvi.jpg",
    status: "available",
    basePrice: 150000,
    team: "",
    soldPrice: 0,
  },
  {
    id: 11,
    name: "Bharat bhansali",
    role: "BATSMAN",
    batting: "RBH",
    bowling: "",
    age: "39 Yrs",
    photo: "/players/bharat-bhansali.jpg",
    status: "available",
    basePrice: 150000,
    team: "",
    soldPrice: 0,
  },
  {
    id: 12,
    name: "Bharat shah",
    role: "ALLROUNDER",
    batting: "RBH",
    bowling: "Right Arm Fast",
    age: "37 Yrs",
    photo: "/players/bharat-shah.jpg",
    status: "available",
    basePrice: 150000,
    team: "",
    soldPrice: 0,
  },
];

// Current player being auctioned
const currentPlayer = {
  id: 39,
  name: "JOGENDRA SHANTILAL MUTTA",
  role: "ALLROUNDER",
  batting: "RBH",
  bowling: "RIGHT ARM SPIN",
  age: "28 YRS",
  experience: "RRC SPL, SPL-AHMEDABAD, ELITE SAVIOURS, RENSA SPL-1 VADODARA",
  photo: "/players/jogendra-mutta.jpg",
  currentBid: 1350000,
  currentBidder: "MUNOT SMASHERS",
  currentBidderLogo: "/team-logos/munot-smashers.png",
};

const AuctionPage = () => {
  const [activeTab, setActiveTab] = useState<"teams" | "players">("teams");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "available" | "sold" | "unsold"
  >("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [showListView, setShowListView] = useState<boolean>(false);
  const [teams] = useState(mockTeams);
  const [players] = useState(mockPlayers);
  const [soldCount, setSoldCount] = useState(9);
  const [unsoldCount, setUnsoldCount] = useState(5);
  const [availableCount, setAvailableCount] = useState(137);

  // Role filter state for players view
  const [activeRoleFilter, setActiveRoleFilter] = useState<string>("ALL");

  const roleFilters = [
    "ALL",
    "ICON",
    "Batsman",
    "Allrounder",
    "Bowler",
    "Wicketkeeper",
    "No category",
  ];

  const handleTabChange = (tab: "teams" | "players") => {
    setActiveTab(tab);
  };

  const handleFilterChange = (
    filter: "all" | "available" | "sold" | "unsold"
  ) => {
    setActiveFilter(filter);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handleViewChange = (listView: boolean) => {
    setShowListView(listView);
  };

  const filteredPlayers = players.filter((player) => {
    let statusMatch = true;
    if (activeFilter === "sold") statusMatch = player.status === "sold";
    else if (activeFilter === "unsold")
      statusMatch = player.status === "unsold";
    else if (activeFilter === "available")
      statusMatch = player.status === "available";

    let roleMatch = true;
    if (activeRoleFilter !== "ALL") {
      if (activeRoleFilter === "Batsman") roleMatch = player.role === "BATSMAN";
      else if (activeRoleFilter === "Allrounder")
        roleMatch = player.role === "ALLROUNDER";
      else if (activeRoleFilter === "Bowler")
        roleMatch = player.role === "BOWLER";
      else if (activeRoleFilter === "Wicketkeeper")
        roleMatch = player.role === "WICKETKEEPER";
    }

    return statusMatch && roleMatch;
  });

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex" 
      style={{ backgroundImage: "url('/bg1.jpg')", height: "100vh" }} 
    >
      {/* Left Section */}
      <div className="w-4/12  bg-black/10">
        <div className="col-span-5 p-5 ">
          <Card className="bg-blue-300 mb-4 rounded-2xl shadow-lg ">
            <CardContent className="bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-between p-6">
              <div className="flex items-center space-x-4">
                <img
                  src="/rensa-logo.png"
                  alt="Rensa Logo"
                  className="w-20 h-20 rounded-xl shadow-md"
                />
                <div>
                  <h1 className="text-2xl font-bold text-yellow-400">
                    RENSA BSPL-2
                  </h1>
                </div>
              </div>
              <img
                src="/rensa-sponsor.png"
                alt="Sponsor"
                className="w-16 h-16 rounded-lg shadow"
              />
            </CardContent>
          </Card>

          {/* Current Player Card */}
          <Card className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl shadow-lg text-white  relative ">
            <CardContent className="p-4">
              {/* Top Section */}
              <div className="flex items-start justify-between mb-3">
                {/* Player Number Badge */}
                <div className="bg-yellow-400 text-black font-bold text-sm px-2 py-0.5 rounded-br-md shadow">
                  {currentPlayer.id}
                </div>

                {/* Player Role Badge */}
                <div className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-md shadow">
                  {currentPlayer.role}
                </div>
              </div>

              {/* Player Info */}
              <div className="flex items-start space-x-3 mb-4">
                <img
                  src={currentPlayer.photo}
                  alt={currentPlayer.name}
                  className="w-20 h-20 rounded-lg border border-yellow-400 object-cover shadow-md"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-yellow-400 ">
                    {currentPlayer.name}
                  </h2>
                  <div className="space-y-0.1 text-xs text-gray-2000 leading-snug">
                    <p>{currentPlayer.batting}</p>
                    <p>{currentPlayer.bowling}</p>
                    <p>AGE : {currentPlayer.age} YRS</p>
                    <p>{currentPlayer.experience}</p>
                  </div>
                </div>
              </div>

              {/* Current Bid Section */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-3 mb-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={currentPlayer.currentBidderLogo}
                    alt={currentPlayer.currentBidder}
                    className="w-8 h-8 rounded-full border border-gray-600 shadow"
                  />
                  <span className="text-gray-400 text-[11px] uppercase">
                    Current Bid
                  </span>
                </div>
                <div className="text-lg font-bold text-yellow-400">
                  {formatCurrency(currentPlayer.currentBid)}
                </div>
              </div>

              {/* Team Name */}
              <div className="text-center text-yellow-400 font-semibold tracking-wide uppercase text-sm border-t border-gray-700 pt-1">
                {currentPlayer.currentBidder}
              </div>
            </CardContent>
          </Card>
        </div>{" "}
      </div>

      {/* Right Section */}
      <div className="w-8/12  bg-black/20 h-full overflow-hidden">
        <div className="col-span-7 ">
          {/* Header */}
          <Card className="bg-blue-300 rounded-2xl shadow-lg border border-blue-700   mb-6 m-4">
            <CardContent className="px-4 py-4 bg-gradient-to-r from-blue-400 to-blue-500">
              <div className="flex items-center justify-between flex-wrap gap-4">
                {/* Left Side - Tabs */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleTabChange("teams")}
                    className={`
                px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105
                ${
                  activeTab === "teams"
                    ? "bg-orange-400 text-black shadow-lg"
                    : "bg-transparent text-white border border-blue-400 hover:bg-blue-800"
                }
              `}
                  >
                    TEAMS
                  </button>
                  <button
                    onClick={() => handleTabChange("players")}
                    className={`
                px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105
                ${
                  activeTab === "players"
                    ? "bg-orange-400 text-black shadow-lg"
                    : "bg-transparent text-white border border-blue-400 hover:bg-blue-800"
                }
              `}
                  >
                    PLAYERS
                  </button>
                </div>

                {/* Center - Stats Badges (only for teams tab) */}
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

                {/* Right Side - Controls */}
                <div className="flex items-center space-x-3">
                  {activeTab === "players" && (
                    <div className="flex items-center space-x-2">
                      {(
                        ["all", "available", "sold", "unsold"] as Array<
                          "all" | "available" | "sold" | "unsold"
                        >
                      ).map((filter) => (
                        <button
                          key={filter}
                          onClick={() => handleFilterChange(filter)}
                          className={`
                      px-3 py-2 rounded-lg font-medium text-sm transition-colors
                      ${
                        activeFilter === filter
                          ? "bg-blue-500 text-white"
                          : "bg-blue-800 text-blue-200 hover:bg-blue-700"
                      }
                    `}
                        >
                          {filter.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role Filter for Players (Second row) */}
          {activeTab === "players" && (
            <Card className="bg-blue-300 rounded-2xl shadow-lg border border-blue-700   mb-6 m-4">
              <CardContent className="px-4 py-4 bg-gradient-to-r from-blue-400 to-blue-500">
                <div className="flex items-center space-x-1">
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded text-sm font-bold mr-3">
                    151
                  </span>
                  {roleFilters.map((role) => (
                    <button
                      key={role}
                      onClick={() => setActiveRoleFilter(role)}
                      className={`
            px-3 py-1 rounded text-sm font-medium transition-colors
            ${
              activeRoleFilter === role
                ? "bg-blue-500 text-white"
                : "bg-blue-700 text-blue-200 hover:bg-blue-600"
            }
          `}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Content Section */}
          <div className="h-screen">
  <div className="h-100 overflow-y-auto custom-scroll">
    {activeTab === "teams" && (
      <div className="grid grid-cols-2 gap-4">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-blue-400 rounded-lg p-4 hover:bg-blue-500 transition-colors m-2"
          >
            <div className="flex items-center space-x-4 mb-3">
              <img src={team.logo} alt={team.name} className="w-12 h-12" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{team.name}</h3>
                <div className="text-2xl font-bold text-yellow-400">
                  {team.playerCount}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-400">
                  {formatCurrency(team.currentBid)}
                </div>
                <div className="text-sm text-gray-300">
                  Max {formatCurrency(team.maxBudget)}
                </div>
                <div className="text-sm text-green-400">
                  Res {formatCurrency(team.remainingBudget)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    {activeTab === "players" && (
      <div className="h-85 overflow-y-auto custom-scroll">
        <div className="grid grid-cols-3 gap-4">
          {filteredPlayers.map((player, index) => (
            <div
              key={player.id}
              className="bg-blue-300 rounded-lg p-4 hover:bg-blue-400 transition-colors relative m-2"
            >
              {/* Player Number Badge */}
              <div className="absolute -top-2 -left-2 bg-yellow-400 text-black text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                {index + 1}
              </div>

              <div className="flex items-start space-x-3 mb-3">
                <img
                  src={player.photo}
                  alt={player.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-yellow-400 mb-1">
                    {player.name}
                  </h3>
                  <div className="text-sm text-black-300 mb-1">{player.batting}</div>
                  <div className="text-sm text-black-300 mb-1">{player.bowling}</div>
                  <div className="text-sm text-black-300">Age: {player.age}</div>
                </div>
              </div>

              {/* Role Badge */}
              <div
                className={`
                  text-xs font-bold px-2 py-1 rounded w-fit mb-2
                  ${
                    player.role === "ALLROUNDER"
                      ? "bg-orange-500 text-black"
                      : player.role === "BATSMAN"
                      ? "bg-yellow-500 text-black"
                      : player.role === "BOWLER"
                      ? "bg-green-500 text-white"
                      : "bg-blue-500 text-white"
                  }
                `}
              >
                {player.role}
              </div>

              {/* Team and Price Info */}
              {player.status === "sold" && (
                <div className="mt-2">
                  <div className="bg-green-600 text-white px-2 py-1 rounded text-sm font-bold">
                    {player.team}
                  </div>
                  <div className="text-lg font-bold text-black-400 mt-1">
                    {formatCurrency(player.soldPrice)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</div>
        </div>{" "}
      </div>
    </div>
  );
};

export default AuctionPage;
