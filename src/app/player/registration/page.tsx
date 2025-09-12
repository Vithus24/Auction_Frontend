'use client'

import React, { useState } from 'react'
import { User, Mail, Phone, Calendar, Shirt, Target, Check, AlertTriangle } from 'lucide-react'

interface PlayerFormData {
  firstname: string
  lastname: string
  mobileno: string
  email: string
  dob: string
  tshirtSize: string
  bottomSize: string
  typeOfSportCategory: string
}

const PlayerRegistration = () => {
  const [formData, setFormData] = useState<PlayerFormData>({
    firstname: '',
    lastname: '',
    mobileno: '',
    email: '',
    dob: '',
    tshirtSize: '',
    bottomSize: '',
    typeOfSportCategory: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Partial<PlayerFormData>>({})

  const sportCategories = [
    'Cricket',
    'Football',
    'Basketball',
    'Tennis',
    'Badminton',
    'Volleyball',
    'Hockey',
    'Swimming'
  ]

  const tshirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
  const bottomSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name as keyof PlayerFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<PlayerFormData> = {}

    if (!formData.firstname.trim()) newErrors.firstname = 'First name is required'
    if (!formData.lastname.trim()) newErrors.lastname = 'Last name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.mobileno.trim()) {
      newErrors.mobileno = 'Mobile number is required'
    } else if (!/^\d{10}$/.test(formData.mobileno.replace(/\D/g, ''))) {
      newErrors.mobileno = 'Please enter a valid 10-digit mobile number'
    }
    if (!formData.dob) newErrors.dob = 'Date of birth is required'
    if (!formData.tshirtSize) newErrors.tshirtSize = 'T-shirt size is required'
    if (!formData.bottomSize) newErrors.bottomSize = 'Bottom size is required'
    if (!formData.typeOfSportCategory) newErrors.typeOfSportCategory = 'Sport category is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would make the actual API call to your Spring Boot backend
      // const response = await fetch('/api/players', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // })
      
      setIsSuccess(true)
      
      setTimeout(() => {
        setFormData({
          firstname: '',
          lastname: '',
          mobileno: '',
          email: '',
          dob: '',
          tshirtSize: '',
          bottomSize: '',
          typeOfSportCategory: ''
        })
        setIsSuccess(false)
      }, 3000)
      
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
    <div className="min-h-screen flex items-center justify-center p-4">
        
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm "></div>
        <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-lg p-8 text-center max-w-md w-full border border-white/20 relative z-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Registration Successful</h2>
          <p className="text-gray-600 mb-6">
            Your player profile has been created successfully. You will receive a confirmation email shortly.
          </p>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div className="bg-green-600 h-1 rounded-full w-full transition-all duration-1000"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-[url(/bg1.jpg)] bg-cover bg-center bg-custom bg-cover bg-center">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="px-8 py-6 border-b border-gray-200">
            <h1 className="text-3xl font-semibold text-gray-900">Player Registration</h1>
            <p className="mt-2 text-gray-600">
              Complete your registration to participate in the upcoming auction
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-lg shadow-sm border">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* Personal Information */}
            <div className="space-y-6">
              <div className="flex items-center pb-4 border-b border-gray-200">
                <User className="w-5 h-5 text-gray-500 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.firstname ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter first name"
                  />
                  {errors.firstname && (
                    <div className="mt-2 flex items-center text-sm text-red-600">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {errors.firstname}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.lastname ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter last name"
                  />
                  {errors.lastname && (
                    <div className="mt-2 flex items-center text-sm text-red-600">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {errors.lastname}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="flex items-center pb-4 border-b border-gray-200">
                <Mail className="w-5 h-5 text-gray-500 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <div className="mt-2 flex items-center text-sm text-red-600">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="mobileno" className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobileno"
                    name="mobileno"
                    value={formData.mobileno}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.mobileno ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter mobile number"
                  />
                  {errors.mobileno && (
                    <div className="mt-2 flex items-center text-sm text-red-600">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {errors.mobileno}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-6">
              <div className="flex items-center pb-4 border-b border-gray-200">
                <Calendar className="w-5 h-5 text-gray-500 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">Additional Details</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.dob ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.dob && (
                    <div className="mt-2 flex items-center text-sm text-red-600">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {errors.dob}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="typeOfSportCategory" className="block text-sm font-medium text-gray-700 mb-2">
                    Sport Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="typeOfSportCategory"
                    name="typeOfSportCategory"
                    value={formData.typeOfSportCategory}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.typeOfSportCategory ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select sport category</option>
                    {sportCategories.map((sport) => (
                      <option key={sport} value={sport}>
                        {sport}
                      </option>
                    ))}
                  </select>
                  {errors.typeOfSportCategory && (
                    <div className="mt-2 flex items-center text-sm text-red-600">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {errors.typeOfSportCategory}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sizing Information */}
            <div className="space-y-6">
              <div className="flex items-center pb-4 border-b border-gray-200">
                <Shirt className="w-5 h-5 text-gray-500 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">Sizing Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="tshirtSize" className="block text-sm font-medium text-gray-700 mb-2">
                    T-shirt Size <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="tshirtSize"
                    name="tshirtSize"
                    value={formData.tshirtSize}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.tshirtSize ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select t-shirt size</option>
                    {tshirtSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  {errors.tshirtSize && (
                    <div className="mt-2 flex items-center text-sm text-red-600">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {errors.tshirtSize}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="bottomSize" className="block text-sm font-medium text-gray-700 mb-2">
                    Bottom Size <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="bottomSize"
                    name="bottomSize"
                    value={formData.bottomSize}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.bottomSize ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select bottom size</option>
                    {bottomSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  {errors.bottomSize && (
                    <div className="mt-2 flex items-center text-sm text-red-600">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {errors.bottomSize}
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
                  'Register Player'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PlayerRegistration