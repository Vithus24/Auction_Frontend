'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Users, AlertTriangle, Plus, X, Trophy, Award } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import useAuthToken from '@/lib/hooks/useAuthToken';
import useUserData from '@/lib/hooks/useUserData';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const AUCTION_ID = 16; // constant number for this page

// ---------- Types ----------
interface TeamFormData {
  name: string;
  budget: string;
  logoFile?: File | null;
  logoPreview?: string | null;
  ownerId?: number;
  auctionId: number;
}

interface Team {
  id: number;
  name: string;
  budget: number;
  ownerId: number;
  ownerMail: string;
  auctionId: number;
  imageUrl: string;
  status: 'active' | 'inactive';
  playersCount?: number;
  points?: number;
  remainingPoints?: number;
  rating?: number;
}

interface TeamDetail {
  id: number;
  name: string;
  budget: number;
  ownerId: number;
  ownerMail: string;
  auctionId: number;
  imageUrl: string;
}

// ---------- Helpers ----------
const readFileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result as string);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });

const TeamRegistration: React.FC = () => {
  const { userId } = useUserData();
  const { token } = useAuthToken();
  const router = useRouter();
  // const AUCTION_ID = 16; // constant number for this page
  const searchParams = useSearchParams();
    // const { token } = useAuthToken();
  
    const auctionId = searchParams.get('auctionId');
  

  // ---------- Form state ----------
  const [formData, setFormData] = useState<TeamFormData>({
    name: '',
    budget: '',
    logoFile: null,
    logoPreview: null,
    ownerId: undefined,
    auctionId: auctionId,
  });

  const [errors, setErrors] = useState<Partial<TeamFormData> & { form?: string; logoFile?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ---------- List state ----------
  const [teams, setTeams] = useState<Team[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  // ---------- UI / Edit / Delete state ----------
  const [uiError, setUiError] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<TeamDetail | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Keep ownerId in sync with userId
  useEffect(() => {
    if (typeof userId === 'number') {
      setFormData(prev => ({ ...prev, ownerId: userId }));
    }
  }, [userId]);

  // Fetch teams
  useEffect(() => {
    const fetchTeams = async () => {
      setListLoading(true);
      setListError(null);
      try {
        const res = await fetch(`${BASE_URL}/teams`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          if (res.status === 403) throw new Error('Access denied. Please log in with admin credentials.');
          throw new Error(`Failed to fetch teams: ${res.status}`);
        }

        const data = await res.json();

        // Prefer server-provided auctionId for filtering if available
        const filtered = (Array.isArray(data) ? data : []).filter((t: any) =>
          typeof t?.auctionId === 'number' ? t.auctionId === AUCTION_ID : true
        );

        const mapped: Team[] = (filtered || []).map((t: any) => ({
          id: t.id,
          name: t.name || 'Unnamed Team',
          budget: Number(t.budget) || 0,
          ownerId: Number(t.ownerId),
          ownerMail: t.ownerMail || 'No email',
          auctionId: typeof t.auctionId === 'number' ? t.auctionId : AUCTION_ID,
          imageUrl: t.imageUrl || '',
          status: (t.status as 'active' | 'inactive') ?? 'active',
          playersCount: t.playersCount ?? 0,
          points: Number(t.budget) || 0,
          remainingPoints: Number(t.budget) || 0,
          rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 - 5.0
        }));
        setTeams(mapped);
      } catch (e) {
        setListError(e instanceof Error ? e.message : 'Failed to load teams');
        console.error('Error fetching teams:', e);
      } finally {
        setListLoading(false);
      }
    };

    fetchTeams();
  }, [token]);

  // Derived stats
  const stats = useMemo(() => {
    const total = teams.length;
    const active = teams.filter(t => t.status === 'active').length;
    const avgRating =
      total > 0 ? (teams.reduce((sum, t) => sum + (t.rating || 0), 0) / total).toFixed(1) : '0.0';
    return { total, active, avgRating };
  }, [teams]);

  // ---------- Handlers ----------
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === 'logoFile' && files?.[0]) {
      const file = files[0];
      readFileToDataUrl(file)
        .then(url => setFormData(prev => ({ ...prev, logoFile: file, logoPreview: url })))
        .catch(() => setErrors(prev => ({ ...prev, logoFile: 'Failed to read image' })));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    if ((errors as any)[name]) setErrors(prev => ({ ...prev, [name]: '' as any }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<TeamFormData> & { form?: string } = {};

    if (!formData.name?.trim()) newErrors.name = 'Team name is required';
    if (!formData.budget?.trim() || Number(formData.budget) <= 0) newErrors.budget = 'Budget must be greater than 0';
    if (!token) newErrors.form = 'You must be logged in to create a team.';
    if (!formData.auctionId) newErrors.form = 'Auction ID is required';
    if (typeof userId !== 'number') newErrors.form = 'Owner ID is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      const teamRequest = {
        name: formData.name.trim(),
        budget: Number(formData.budget),
        ownerId: userId,
        auctionId: auctionId,
      };

      formDataToSend.append('team', JSON.stringify(teamRequest));
      if (formData.logoFile) formDataToSend.append('image', formData.logoFile);

      const res = await fetch(`${BASE_URL}/teams`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `Failed to register team: ${res.status}`);
      }

      const createdTeam = await res.json();
      const newTeam: Team = {
        id: createdTeam.id,
        name: createdTeam.name,
        budget: Number(createdTeam.budget),
        ownerId: Number(userId),
        ownerMail: createdTeam.ownerMail,
        auctionId: typeof createdTeam.auctionId === 'number' ? createdTeam.auctionId : AUCTION_ID,
        imageUrl: createdTeam.imageUrl,
        status: (createdTeam.status as 'active' | 'inactive') ?? 'active',
        playersCount: createdTeam.playersCount ?? 0,
        points: Number(createdTeam.budget),
        remainingPoints: Number(createdTeam.budget),
        rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      };

      // Show newly created first
      setTeams(prev => [newTeam, ...prev]);

      setIsSuccess(true);
      setTimeout(() => {
        setFormData({
          name: '',
          budget: '',
          logoFile: null,
          logoPreview: null,
          ownerId: userId,
          auctionId: auctionId,
        });
        setIsSuccess(false);
      }, 1200);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Registration failed');
      console.error('Error creating team:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchTeamDetails = async (id: number) => {
    if (!token) {
      setUiError('Authentication required');
      return;
    }

    setEditLoading(true);
    setUiError(null);

    try {
      const res = await fetch(`${BASE_URL}/teams/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error((await res.text()) || 'Failed to fetch team details');

      const data = await res.json();
      const detail: TeamDetail = {
        id: data.id,
        name: data.name,
        budget: Number(data.budget),
        ownerId: Number(userId),
        ownerMail: data.ownerMail,
        auctionId: typeof data.auctionId === 'number' ? data.auctionId : AUCTION_ID,
        imageUrl: data.imageUrl,
      };

      setSelectedTeam(detail);
      setModalOpen(true);
    } catch (e) {
      setUiError(e instanceof Error ? e.message : 'Failed to load team details');
      console.error('Error fetching team details:', e);
    } finally {
      setEditLoading(false);
    }
  };

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !selectedTeam) return;

    setEditLoading(true);
    setUiError(null);

    try {
      const formDataToSend = new FormData();
      const teamRequest = {
        name: selectedTeam.name,
        budget: Number(selectedTeam.budget),
        ownerId: Number(userId),
        auctionId: auctionId,
      };

      formDataToSend.append('team', JSON.stringify(teamRequest));
      // optionally: formDataToSend.append('image', file);

      const res = await fetch(`${BASE_URL}/teams/${selectedTeam.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!res.ok) throw new Error((await res.text()) || 'Failed to update team');

      const updatedTeam = await res.json();

      setTeams(prev =>
        prev.map(t =>
          t.id === selectedTeam.id
            ? {
                ...t,
                name: updatedTeam.name,
                budget: Number(updatedTeam.budget),
                ownerId: Number(userId),
                ownerMail: updatedTeam.ownerMail,
                auctionId: typeof updatedTeam.auctionId === 'number' ? updatedTeam.auctionId : AUCTION_ID,
                imageUrl: updatedTeam.imageUrl,
                points: Number(updatedTeam.budget),
                remainingPoints: Number(updatedTeam.budget),
              }
            : t
        )
      );

      setModalOpen(false);
      setSelectedTeam(null);
    } catch (e) {
      setUiError(e instanceof Error ? e.message : 'Failed to save changes');
      console.error('Error updating team:', e);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!token || !teamToDelete) return;

    setDeleteLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/teams/${teamToDelete.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error((await res.text()) || 'Failed to delete team');

      setTeams(prev => prev.filter(t => t.id !== teamToDelete.id));
      setDeleteModalOpen(false);
      setTeamToDelete(null);
    } catch (e) {
      setUiError(e instanceof Error ? e.message : 'Failed to delete team');
      console.error('Error deleting team:', e);
    } finally {
      setDeleteLoading(false);
    }
  };

  // ---------- Render ----------
  return (
    <div className="bg-[url('/bg1.jpg')] bg-cover bg-center min-h-screen">
      <style jsx global>{`
        @keyframes grow {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

      <Navbar />

      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-lg p-8 text-center max-w-md w-full border border-white/20 relative z-10">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Registration Successful</h2>
            <p className="text-gray-600 mb-6">Your team has been registered successfully.</p>
            <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
              <div className="bg-green-600 h-1 rounded-full w-full animate-[grow_1.2s_ease]" />
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border mb-8">
            <div className="px-8 py-6 border-b border-gray-200">
              <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-red-400 bg-clip-text text-transparent">
                Team Registration & Management
              </h1>
              <p className="mt-2 text-gray-600">Register a team and manage all teams in this auction.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Form */}
            <div className="bg-white rounded-lg shadow-sm border lg:col-span-2">
              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {errors.form && (
                  <div className="mb-6 flex items-center text-sm text-red-600">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {errors.form}
                  </div>
                )}

                <div className="space-y-6">
                  <div className="flex items-center pb-4 border-b border-gray-200">
                    <Users className="w-5 h-5 text-gray-500 mr-3" />
                    <h3 className="text-lg font-medium text-gray-900">Team Information</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Team Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 text-gray-700'
                        }`}
                        placeholder="Enter team name"
                      />
                      {errors.name && (
                        <div className="mt-2 flex items-center text-sm text-red-600">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          {errors.name}
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                        Budget <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.budget ? 'border-red-300 bg-red-50' : 'border-gray-300 text-gray-700'
                        }`}
                        placeholder="Enter budget"
                        min={1}
                        step={1}
                      />
                      {errors.budget && (
                        <div className="mt-2 flex items-center text-sm text-red-600">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          {errors.budget}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Team Logo (optional)</label>
                      {!formData.logoPreview ? (
                        <label
                          htmlFor="logoFile"
                          className="relative cursor-pointer block w-full border-2 border-gray-300 border-dashed rounded-lg p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <Users className="mx-auto h-12 w-12 text-gray-400" />
                          <span className="mt-2 block text-sm font-medium text-gray-900">Upload team logo</span>
                          <span className="mt-1 block text-sm text-gray-500">Any image format supported</span>
                          <input
                            id="logoFile"
                            type="file"
                            name="logoFile"
                            accept="image/*"
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                        </label>
                      ) : (
                        <div className="relative">
                          <div className="relative w-full h-32 rounded-lg border-2 border-gray-300 overflow-hidden bg-gray-50">
                            <img
                              src={formData.logoPreview}
                              alt="Logo Preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, logoFile: null, logoPreview: null }))}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="mt-2 text-sm text-green-600">{formData.logoFile?.name}</p>
                        </div>
                      )}
                      {errors.logoFile && (
                        <div className="mt-2 flex items-center text-sm text-red-600">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          {errors.logoFile}
                        </div>
                      )}
                    </div>
                  </div>

                  {serverError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                      {serverError}
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                      isSubmitting
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                        Processing...
                      </div>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 inline mr-2" />
                        Register Team
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 shadow-lg border border-indigo-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-indigo-500 rounded-lg shadow-md">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-indigo-900">{stats.total}</span>
                </div>
                <p className="text-indigo-800 font-medium">Total Teams</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-lg border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-500 rounded-lg shadow-md">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-green-900">{stats.active}</span>
                </div>
                <p className="text-green-800 font-medium">Active Teams</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 shadow-lg border border-yellow-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-yellow-500 rounded-lg shadow-md">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-yellow-900">{stats.avgRating}</span>
                </div>
                <p className="text-yellow-800 font-medium">Average Rating</p>
                <p className="text-sm text-yellow-600 mt-1">Out of 5.0</p>
              </div>
            </div>
          </div>

          {/* ===== Team List ===== */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="px-8 py-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Teams in this Auction</h2>
              <span className="text-sm text-gray-500">{teams.length} team{teams.length === 1 ? '' : 's'}</span>
            </div>

            {listLoading ? (
              <div className="p-8 text-sm text-gray-600">Loading teams…</div>
            ) : listError ? (
              <div className="p-8 text-sm text-red-600">{listError}</div>
            ) : teams.length === 0 ? (
              <div className="p-8 text-sm text-gray-600">No teams yet. Create the first one using the form above.</div>
            ) : (
              <ul className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((t) => (
                  <li key={t.id} className="rounded-lg border shadow-sm hover:shadow-md transition-shadow bg-white">
                    <div className="p-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={t.imageUrl || '/placeholder-team.png'}
                          alt={t.name}
                          className="w-12 h-12 rounded-md object-cover border"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{t.name}</p>
                          <p className="text-xs text-gray-500">ID: {t.id} • Budget: {t.budget}</p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div>Owner ID: <span className="font-medium text-gray-800">{t.ownerId}</span></div>
                        <div>Status: <span className="font-medium capitalize">{t.status}</span></div>
                        <div>Points: <span className="font-medium">{t.points ?? 0}</span></div>
                        <div>Remaining: <span className="font-medium">{t.remainingPoints ?? 0}</span></div>
                      </div>

                      <div className="mt-5 flex items-center justify-end gap-2">
                        <button
                          onClick={() => fetchTeamDetails(t.id)}
                          className="px-3 py-1.5 text-sm rounded-md border hover:bg-gray-50"
                        >
                          View / Edit
                        </button>
                        <button
                          onClick={() => { setTeamToDelete(t); setDeleteModalOpen(true); }}
                          className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {uiError && <p className="text-sm text-red-600 mt-4">{uiError}</p>}
        </div>
      </div>

      {/* ===== Edit Modal ===== */}
      {modalOpen && selectedTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="bg-white rounded-lg shadow-lg p-6 relative z-10 max-w-lg w-full">
            <h3 className="text-lg font-semibold mb-4">Edit Team</h3>

            <form onSubmit={handleEditSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                <input
                  type="text"
                  value={selectedTeam.name}
                  onChange={(e) => setSelectedTeam(prev => prev ? { ...prev, name: e.target.value } : prev)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={selectedTeam.budget}
                  onChange={(e) => setSelectedTeam(prev => prev ? { ...prev, budget: Number(e.target.value) } : prev)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {editLoading && <p className="text-sm text-gray-600">Saving…</p>}
              {uiError && <p className="text-sm text-red-600">{uiError}</p>}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                  disabled={editLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  disabled={editLoading}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== Delete Modal ===== */}
      {deleteModalOpen && teamToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteModalOpen(false)} />
          <div className="bg-white rounded-lg shadow-lg p-6 relative z-10 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Delete Team</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete <span className="font-medium">{teamToDelete.name}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                disabled={deleteLoading}
              >
                {deleteLoading ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamRegistration;
