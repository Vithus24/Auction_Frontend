"use client";

import { Button, Card, CardContent } from "@mui/material";
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

  // Add showBidButton state (default true, adjust logic as needed)
  const [showBidButton, setShowBidButton] = useState<boolean>(false);

  // Role filter state for players view
  const [activeRoleFilter, setActiveRoleFilter] = useState<string>("ALL");

  const roleFilters = [
    "ALL",
    "ICON",
    "Batsman",
    "Allrounder",
    "Bowler",
    "Wicketkeeper",
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
            <CardContent className="bg-gradient-to-r from-blue-800 to-blue-700 border border-blue-300 flex items-center justify-between p-6">
              <div className="flex items-center space-x-4">
                <img
                  src="/rensa-logo.png"
                  // alt="Rensa Logo"
                  className="w-16 h-16 rounded-lg border-2 border-yellow-400 object-cover shadow-sm"
                />

                <div>
                  <h1 className="text-xl font-bold text-yellow-400">
                    RENSA BSPL-2
                  </h1>
                </div>
              </div>
              <img
                src="/rensa-sponsor.png"
                // alt="Sponsor"
                className="w-16 h-16 rounded-lg border-2 border-yellow-400 object-cover shadow-sm"
              />
            </CardContent>
          </Card>
          {/* Current Player Card */}
          <div className="bg-gradient-to-br from-yellow-800 to-yellow-700  margin-0 pb-3 rounded-xl border border-blue-400">
            <div className="flex items-start justify-between mb-3">
              {/* Player Number Badge */}
              <div className="bg-yellow-400 text-black font-bold text-sm px-2 py-0.5 rounded-tl-xl shadow">
                {currentPlayer.id}
              </div>

              {/* Player Role Badge */}
              <div className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-tr-xl shadow">
                {currentPlayer.role}
              </div>
            </div>

            {/* Player Info */}
            <div className="flex items-start space-x-3 pl-3  mb-1">
              <img
                src={currentPlayer.photo}
                // alt={currentPlayer.name}
                className="w-16 h-16 rounded-lg border-2 border-yellow-400 object-cover shadow-sm"
              />
              <div className="flex-1">
                <h2 className="text-sm font-bold text-yellow-400 ">
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
            <div className="bg-gradient-to-r from-yellow-600 to-gray-800 animate-pulse rounded-lg p-3 ml-3 mr-3 mb-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src={currentPlayer.currentBidderLogo}
                  // alt={currentPlayer.currentBidder}
                  className="w-8 h-8 rounded-full border border-gray-600 shadow"
                />
                <span className="text-white font-bold text-sm uppercase">
                  Current Bid
                </span>
              </div>
              <div className="text-lg font-bold text-yellow-300">
                {formatCurrency(currentPlayer.currentBid)}
              </div>
            </div>

            {/* Team Name */}
            <div className="text-center text-white-100 font-semibold tracking-wide uppercase text-sm border-t border-gray-700 pt-1">
              {currentPlayer.currentBidder}
            </div>
          </div>
          {/* <div className="flex justify-center pt-3">
            <button
              className="
                  w-80 h-30 
                  bg-gradient-to-r from-green-500 to-emerald-600
                  hover:from-green-400 hover:to-emerald-500
                  active:from-green-600 active:to-emerald-700
                  text-white text-3xl font-bold uppercase tracking-wider
                  rounded-xl
                  shadow-xl hover:shadow-2xl hover:shadow-green-500/30
                  transform hover:-translate-y-1 active:translate-y-0
                  transition-all duration-200 ease-out
                  border-2 border-green-300 hover:border-green-200
                  focus:outline-none focus:ring-4 focus:ring-green-300
                  relative group
                  animate-pulse
                "
            >
              <span className="flex items-center justify-center space-x-3">
                {/* <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
      </svg> */}
          {/* <span>PLACE BID</span>
              </span>
            </button>
          </div> */}{" "}
          */
          <div className="flex justify-center pt-1">
            <button
              className={`
      w-80 h-30 
      ${
        showBidButton
          ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 active:from-green-600 active:to-emerald-700 border-green-300 hover:border-green-200 focus:ring-green-300 hover:shadow-green-500/30 text-white"
          : "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 active:from-yellow-600 active:to-orange-700 border-yellow-300 hover:border-yellow-200 focus:ring-yellow-300 hover:shadow-yellow-500/30 text-black"
      }
      text-3xl font-bold uppercase tracking-wider
      rounded-xl
      shadow-xl hover:shadow-2xl
      transform hover:-translate-y-1 active:translate-y-0
      transition-all duration-200 ease-out
      border-2
      focus:outline-none focus:ring-4
      relative group
      animate-pulse
    `}
            >
              <span className="flex items-center justify-center space-x-3">
                {showBidButton ? (
                  <>
                    <svg
                      className="w-10 h-10"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>PLACE BID</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-10 h-10 animate-spin"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 2a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h12v11H4V4z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M10 8a1 1 0 011 1v3a1 1 0 11-2 0V9a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                      <path d="M10 6a1 1 0 100 2 1 1 0 000-2z" />
                    </svg>
                    <span>SPIN WHEEL</span>
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-8/12  bg-black/20 h-full overflow-hidden">
        <div className="col-span-7 ">
          {/* Header */}
          <Card className=" rounded-2xl shadow-lg border border-blue-400   mb-1 m-4">
            <CardContent className="px-4 py-4 bg-gradient-to-r from-blue-800 to-blue-700">
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
                    : "bg-transparent text-white border border-blue-300 hover:bg-blue-600"
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
                    : "bg-transparent text-white border border-blue-200 hover:bg-blue-600"
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
                      px-3 py-2 rounded-lg font-medium text-sm transition-colors hover:scale-105
                      ${
                        activeFilter === filter
                          ? "bg-blue-300 text-white"
                          : "bg-blue-800 text-white hover:bg-blue-600"
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
            <Card className="bg-blue-300 rounded-2xl shadow-lg border border-blue-700    ml-4 mr-4">
              <CardContent className="px-4 py-4 bg-gradient-to-r from-blue-800 to-blue-700">
                <div className="flex items-center space-x-1">
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded text-sm font-bold mr-3">
                    151
                  </span>
                  {roleFilters.map((role) => (
                    <button
                      key={role}
                      onClick={() => setActiveRoleFilter(role)}
                      className={`
            px-3 py-1 rounded text-sm font-medium transition-colors hover:scale-105 border border-blue-400
            ${
              activeRoleFilter === role
                ? "bg-blue-300 text-white"
                : "bg-blue-800 text-white hover:bg-blue-600"
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
          <div className=" overflow-hidden m-4">
            <div className=" h-100 overflow-y-auto custom-scroll">
              {activeTab === "teams" && (
                <div className=" grid grid-cols-2 gap-4">
                  {teams.map((team) => (
                    <div
                      key={team.id}
                      className="relative w-90 h-30 rounded-lg  shadow-md transition-transform transform hover:scale-105 bg-gradient-to-r from-blue-800 to-blue-700 p-4"
                    >
                      <div className="flex items-center space-x-4 mb-3">
                        <img
                          src={team.logo}
                          // alt={team.name}
                          className="w-16 h-16 rounded-lg border-2 border-yellow-400 object-cover shadow-sm"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white">
                            {team.name}
                          </h3>
                          <div className="text-2xl font-bold text-yellow-400">
                            {team.playerCount}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-1xl font-bold text-yellow-400">
                            {formatCurrency(team.currentBid)}
                          </div>
                          <div className="text-sm text-black-800">
                            Max {formatCurrency(team.maxBudget)}
                          </div>
                          <div className="text-sm text-black-400">
                            Res {formatCurrency(team.remainingBudget)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "players" && (
                <div className="h-90 overflow-y-auto custom-scroll">
                  <div className="grid grid-cols-3 gap-4">
                    {filteredPlayers.map((player, index) => (
                      <div
                        key={player.id}
                        className={`relative w-60 h-30 rounded-lg shadow-md transition-transform transform hover:scale-105  ${
                          player.status === "sold"
                            ? "bg-gradient-to-r from-green-600 to-green-500"
                            : "bg-gradient-to-r from-blue-800 to-blue-700"
                        }`}
                      >
                        {/* Player Number Badge */}
                        <div className="absolute top-0 left-0 bg-yellow-400 text-black text-xs font-bold rounded-tl-lg px-2 py-1 shadow">
                          {index + 1}
                        </div>

                        {/* Player Info */}
                        <div className="flex items-start space-x-3 p-3">
                          <img
                            src={player.photo}
                            // alt={player.name}
                            className="w-16 h-16 rounded-lg border-2 border-yellow-400 object-cover shadow-sm"
                          />
                          <div className="flex-1">
                            <h3 className="text-xs font-semibold text-yellow-400 uppercase leading-tight">
                              {player.name}
                            </h3>

                            <div className="text-xs text-white leading-tight ml-2">
                              <p>{player.batting}</p>
                              <p>{player.bowling}</p>
                              <p>Age : {player.age} Yrs</p>
                            </div>
                          </div>
                        </div>

                        {/* Role Badge */}
                        <div className="absolute bottom-4 left-0 w-full text-left px-2 pb-2 text-xs font-bold text-orange-300 uppercase">
                          {player.role}
                        </div>

                        {/* Sold Bar (only if sold) */}
                        {player.status === "sold" && (
                          <div className="absolute bottom-0 left-0 w-full grid grid-cols-2 bg-gradient-to-r from-green-700 to-green-600 text-white text-xs font-bold">
                            <div className="px-2 py-1 truncate">
                              {player.team}
                            </div>
                            <div className="px-2 py-1 text-right text-yellow-200">
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
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;
