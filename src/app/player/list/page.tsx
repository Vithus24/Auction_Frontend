'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  User,
  Calendar,
  Trophy,
  Users,
  SortAsc,
  Grid,
  List,
  MoreVertical,
  Star,
  Award,
  Activity,
  Link
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import useAuthToken from '@/lib/hooks/useAuthToken';

interface Player {
  id: number;
  firstname: string;
  lastname: string;
  age?: number;
  sport: string;
  image?: string;
  position?: string;
  experience?: string;
  rating?: number;
  status: string;
  joinDate: string;
  matches?: number;
  goals?: number;
  auctionId: number;
}

const sportCategories = ["All Sports", "Football", "Basketball", "Tennis", "Cricket", "Volleyball"];
const DEFAULT_ICON = '/api/placeholder/150/150';

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSport, setFilterSport] = useState('All Sports');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
//   const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const { token } = useAuthToken();

  const auctionId = searchParams.get('auctionId');

  // Fetch players from API
  useEffect(() => {
    const fetchPlayers = async () => {
      if (!auctionId) {
        setError('Auction ID is required');
        setLoading(false);
        return;
      }
      if (!token) return; // Skip if no token yet

      setLoading(true);
      setError(null); // Clear previous error

      try {
        console.log(`🔄 Fetching players for auction ID: ${auctionId}`);
        
        const response = await fetch(`http://localhost:8080/players/auction/${auctionId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        console.log(`📡 API Response Status: ${response.status}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ API Error:', errorText);
          if (response.status === 403) {
            throw new Error('Access denied. You do not have permission to view these players. Please log in with admin credentials or contact support.');
          }
          throw new Error(`Failed to fetch players: ${errorText}`);
        }
        
        const data = await response.json();
        console.log('📦 Raw API Data:', data);
        console.log(`📊 Number of players received: ${data.length}`);

        const mappedPlayers = data.map((player: any, index: number) => {
          console.log(`👤 Processing Player ${index + 1}:`, {
            id: player.id,
            name: `${player.firstname} ${player.lastname}`,
            hasImage: !!player.imageBase64,
            imagePreview: player.imageBase64 ? player.imageBase64.substring(0, 50) + '...' : 'No image',
            imageType: player.imageType || 'Unknown',
          });

          let calculatedAge = null;
          if (player.dob) {
            try {
              const birthDate = new Date(player.dob);
              const today = new Date();
              calculatedAge = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365));
              console.log(`🎂 Calculated age for ${player.firstname}: ${calculatedAge} years`);
            } catch (ageError) {
              console.warn(`⚠️ Could not calculate age for ${player.firstname}:`, ageError);
            }
          }

          return {
            id: player.id,
            firstname: player.firstname || '',
            lastname: player.lastname || '',
            age: calculatedAge,
            sport: player.typeOfSportCategory || 'Unknown',
            image: player.imageBase64 || null,
            position: player.typeOfSportCategory || 'Player',
            experience: getExperienceForSport(player.typeOfSportCategory),
            rating: generateMockRating(),
            status: player.sold ? 'inactive' : 'active',
            joinDate: player.dob || new Date().toISOString().split('T')[0],
            matches: Math.floor(Math.random() * 50),
            goals: Math.floor(Math.random() * 20),
            auctionId: player.auctionId || 0,
          };
        });

        console.log('✅ Mapped Players:', mappedPlayers);
        console.log(`🖼️ Players with images: ${mappedPlayers.filter(p => p.image).length}`);
        console.log(`🚫 Players without images: ${mappedPlayers.filter(p => !p.image).length}`);

        setPlayers(mappedPlayers);
      } catch (err) {
        console.error('💥 Fetch Error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [auctionId, token]);

  const getExperienceForSport = (sport: string) => {
    const experiences = {
      'Football': '4-6 years',
      'Basketball': '3-5 years',
      'Cricket': '5-7 years',
      'Tennis': '2-4 years',
      'Volleyball': '3-5 years'
    };
    return experiences[sport as keyof typeof experiences] || '2-3 years';
  };

  const generateMockRating = () => {
    return Math.round((Math.random() * 2 + 3) * 10) / 10;
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>, playerName: string) => {
    console.error(`🖼️ Image load error for ${playerName}:`, event);
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  };

  const handleImageLoad = (playerName: string) => {
    console.log(`✅ Image loaded successfully for ${playerName}`);
  };

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.sport.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = filterSport === 'All Sports' || player.sport === filterSport;
    const matchesStatus = filterStatus === 'all' || player.status === filterStatus;
    return matchesSearch && matchesSport && matchesStatus;
  });

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return `${a.firstname} ${a.lastname}`.localeCompare(`${b.firstname} ${b.lastname}`);
      case 'age':
        return (a.age || 0) - (b.age || 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'experience':
        return (parseInt((b.experience || '0').split('-')[0]) || 0) - (parseInt((a.experience || '0').split('-')[0]) || 0);
      default:
        return 0;
    }
  });

  const getSportColor = (sport: string) => {
    const colors = {
      'Football': 'bg-green-100 text-green-800 border-green-200',
      'Basketball': 'bg-orange-100 text-orange-800 border-orange-200',
      'Tennis': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Cricket': 'bg-blue-100 text-blue-800 border-blue-200',
      'Volleyball': 'bg-purple-100 text-purple-800 border-purple-200',
    };
    return colors[sport as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const stats = {
    total: players.length,
    active: players.filter(p => p.status === 'active').length,
    inactive: players.filter(p => p.status === 'inactive').length,
    avgRating: players.length > 0 ? (players.reduce((sum, p) => sum + (p.rating || 0), 0) / players.length).toFixed(1) : '0.0'
  };

  const PlayerImage = ({ player, className }: { player: Player, className: string }) => {
    const [imageError, setImageError] = useState(false);
    const playerName = `${player.firstname} ${player.lastname}`;

    console.log(`🖼️ Rendering image for ${playerName}:`, {
      hasImage: !!player.image,
      imageLength: player.image?.length || 0,
      isDataUri: player.image?.startsWith('data:') || false
    });

    if (!player.image || imageError) {
      return (
        <div className={`${className} bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg`}>
          <User className="w-16 h-16 text-indigo-600" />
        </div>
      );
    }

    return (
      <div className={`${className} bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl shadow-lg overflow-hidden`}>
        <img 
          src={player.image} 
          alt={playerName}
          className="w-full h-full object-cover"
          onLoad={() => handleImageLoad(playerName)}
          onError={(e) => {
            handleImageError(e, playerName);
            setImageError(true);
          }}
        />
      </div>
    );
  };

  // Add Player Form State
  const [newPlayer, setNewPlayer] = useState({
    firstname: '',
    lastname: '',
    dob: '',
    typeOfSportCategory: '',
    imageBase64: '',
    imageType: '',
    auctionId: auctionId ? parseInt(auctionId) : 0,
  });
  const [addError, setAddError] = useState<string | null>(null);
  const [addLoading, setAddLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewPlayer({ ...newPlayer, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPlayer({
          ...newPlayer,
          imageBase64: (reader.result as string).split(',')[1], // Base64 without data URI prefix
          imageType: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setAddError('No authentication token available.');
      return;
    }
    if (!newPlayer.firstname || !newPlayer.lastname || !newPlayer.dob || !newPlayer.typeOfSportCategory) {
      setAddError('All fields are required.');
      return;
    }

    setAddLoading(true);
    setAddError(null);

    try {
      const response = await fetch('http://localhost:8080/players', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlayer),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add player: ${errorText}`);
      }

      // Success: Close modal and refetch players
    //   setShowAddModal(false);
      // Trigger refetch by resetting players temporarily or call fetchPlayers again (but since useEffect depends on token/auctionId, we can force a reload or add a dummy dep)
      window.location.reload(); // Simple way to refetch; alternatively, call fetchPlayers() if you extract it.
    } catch (err) {
      setAddError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setAddLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[url('/bg1.jpg')] bg-cover bg-center bg-fixed flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-center">Loading players...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[url('/bg1.jpg')] bg-cover bg-center bg-fixed flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
          <p className="text-red-600 text-lg font-medium mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
          <p className="text-gray-500 mt-2">If the issue persists, ensure you have the correct permissions or contact an administrator.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/bg1.jpg')] bg-cover bg-center bg-fixed">
      <Navbar />
      
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
                    <Users className="w-10 h-10 mr-4 text-indigo-600" />
                    Player Management
                  </h1>
                  <p className="text-gray-600 text-lg">Manage and organize all registered players</p>
                </div>
             
                <button 
                  onClick={() => window.location.href = `/player/registration?auctionId=${auctionId}`}
                  className="mt-6 lg:mt-0 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-lg flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add New Player</span>
                </button>
        
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 shadow-lg border border-indigo-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-indigo-500 rounded-lg shadow-md">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-indigo-900">{stats.total}</span>
              </div>
              <p className="text-indigo-800 font-medium">Total Players</p>
              <p className="text-sm text-indigo-600 mt-1">Registered</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-lg border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500 rounded-lg shadow-md">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-green-900">{stats.active}</span>
              </div>
              <p className="text-green-800 font-medium">Active Players</p>
              <p className="text-sm text-green-600 mt-1">Currently playing</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 shadow-lg border border-red-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-500 rounded-lg shadow-md">
                  <User className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-red-900">{stats.inactive}</span>
              </div>
              <p className="text-red-800 font-medium">Inactive Players</p>
              <p className="text-sm text-red-600 mt-1">Not playing</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 shadow-lg border border-yellow-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-500 rounded-lg shadow-md">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-yellow-900">{stats.avgRating}</span>
              </div>
              <p className="text-yellow-800 font-medium">Average Rating</p>
              <p className="text-sm text-yellow-600 mt-1">Out of 5.0</p>
            </div>
          </div>

          {/* Search, Filter and View Controls */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search players by name or sport..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              
              {/* Sport Filter */}
              <div className="relative lg:w-48">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterSport}
                  onChange={(e) => setFilterSport(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer bg-white"
                >
                  {sportCategories.map(sport => (
                    <option key={sport} value={sport}>{sport}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="relative lg:w-48">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Sort */}
              <div className="relative lg:w-48">
                <SortAsc className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer bg-white"
                >
                  <option value="name">Sort by Name</option>
                  <option value="age">Sort by Age</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="experience">Sort by Experience</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Players Grid/List */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Award className="w-6 h-6 mr-3 text-indigo-600" />
                    Players Directory
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {sortedPlayers.length} player{sortedPlayers.length !== 1 ? 's' : ''} found
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              {sortedPlayers.length === 0 ? (
                <div className="text-center py-16">
                  <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-xl font-medium">No players found</p>
                  <p className="text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}>
                  {sortedPlayers.map((player) => (
                    <div key={player.id} className={`bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105 ${
                      viewMode === 'list' ? 'flex items-center p-6' : 'p-6'
                    }`}>
                      
                      {/* Player Image */}
                      <div className={`${viewMode === 'list' ? 'w-24 h-24 mr-6' : 'w-full h-48 mb-4'} relative`}>
                        <PlayerImage 
                          player={player} 
                          className={viewMode === 'list' ? 'w-24 h-24' : 'w-32 h-32 mx-auto'} 
                        />
                        <div className={`absolute ${viewMode === 'list' ? 'top-0 right-0' : '-top-2 -right-2'} bg-white rounded-full p-2 shadow-lg`}>
                          <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(player.status)}`}>
                            {player.status}
                          </div>
                        </div>
                      </div>

                      {/* Player Info */}
                      <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div className={`${viewMode === 'list' ? 'flex items-center justify-between' : 'text-center'}`}>
                          <div className={`${viewMode === 'list' ? 'text-left' : ''}`}>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{`${player.firstname} ${player.lastname}`}</h3>
                            
                            <div className={`flex ${viewMode === 'list' ? 'space-x-4' : 'flex-col space-y-2'} mb-4`}>
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-600">{player.age ? `${player.age} years` : 'Age unknown'}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Trophy className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-600">{player.position}</span>
                              </div>
                            </div>

                            <div className={`flex ${viewMode === 'list' ? 'space-x-2' : 'flex-wrap gap-2 justify-center'} mb-4`}>
                              <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getSportColor(player.sport)}`}>
                                {player.sport}
                              </div>
                            </div>

                            <div className={`flex items-center ${viewMode === 'list' ? 'space-x-4' : 'justify-center space-x-2'} mb-4`}>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{player.rating?.toFixed(1) || 0}</span>
                              </div>
                              <span className="text-gray-300">•</span>
                              <span className="text-sm text-gray-600">{player.experience || 'N/A'}</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className={`flex ${viewMode === 'list' ? 'flex-row space-x-2' : 'flex-wrap gap-2 justify-center'}`}>
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              {viewMode === 'grid' && <span>View</span>}
                            </button>
                            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1">
                              <Edit className="w-4 h-4" />
                              {viewMode === 'grid' && <span>Edit</span>}
                            </button>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1">
                              <Trash2 className="w-4 h-4" />
                              {viewMode === 'grid' && <span>Delete</span>}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}