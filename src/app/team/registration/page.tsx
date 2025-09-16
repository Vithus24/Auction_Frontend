'use client';

import React, { useState } from 'react';
import { Users, Mail, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useSearchParams, useRouter } from 'next/navigation';
import useAuthToken from '@/lib/hooks/useAuthToken'; // Adjust the import path as needed

interface TeamFormData {
  name: string;
  ownerMail: string;
}

const TeamRegistration = () => {
  const [formData, setFormData] = useState<TeamFormData>({
    name: '',
    ownerMail: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<TeamFormData>>({});
  const { token } = useAuthToken();
  const searchParams = useSearchParams();
  const router = useRouter();

  const auctionId = searchParams.get('auctionId');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof TeamFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<TeamFormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Team name is required';
    if (!formData.ownerMail.trim()) {
      newErrors.ownerMail = 'Owner email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.ownerMail)) {
      newErrors.ownerMail = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Assuming ownerId needs to be fetched or hardcoded for now (replace with actual logic)
      const ownerId = 2; // Placeholder; replace with dynamic owner ID logic if needed

      const teamData = {
        name: formData.name,
        budget: 1000000.0, // Default budget as per example; adjust as needed
        owner: { id: ownerId },
        auction: { id: auctionId ? parseInt(auctionId) : null }, // Include auctionId if available
      };

      const response = await fetch('http://localhost:8080/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}`,
        },
        body: JSON.stringify(teamData),
      });

      if (!response.ok) {
        throw new Error('Failed to register team');
      }

      setIsSuccess(true);
      
      setTimeout(() => {
        setFormData({
          name: '',
          ownerMail: '',
        });
        setIsSuccess(false);
        router.push('/auction/dashboard'); // Redirect back to dashboard after success
      }, 3000);
      
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-lg p-8 text-center max-w-md w-full border border-white/20 relative z-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Registration Successful</h2>
          <p className="text-gray-600 mb-6">
            Your team has been registered successfully. You will receive a confirmation email shortly.
          </p>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div className="bg-green-600 h-1 rounded-full w-full transition-all duration-1000"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-[url(/bg1.jpg)] bg-cover bg-center bg-custom bg-cover bg-center'>
      <Navbar />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border mb-8">
            <div className="px-8 py-6 border-b border-gray-200 text-center">
              <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-red-400 bg-clip-text text-transparent">Team Registration</h1>
              <p className="mt-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                Register your team for the upcoming auction
              </p>
            </div>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-lg shadow-sm border">
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              
              {/* Team Information */}
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
                    <label htmlFor="ownerMail" className="block text-sm font-medium text-gray-700 mb-2">
                      Owner Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="ownerMail"
                      name="ownerMail"
                      value={formData.ownerMail}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.ownerMail ? 'border-red-300 bg-red-50' : 'border-gray-300 text-gray-700'
                      }`}
                      placeholder="owner.email@example.com"
                    />
                    {errors.ownerMail && (
                      <div className="mt-2 flex items-center text-sm text-red-600">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        {errors.ownerMail}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
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
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    'Register Team'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamRegistration;