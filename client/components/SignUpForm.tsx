'use client';

import { useState } from 'react';
import { X, User, Mail, Lock, Calendar, Users } from 'lucide-react';

interface SignUpFormProps {
  onClose: () => void;
  type?: 'dating' | 'marriage';
}

export default function SignUpForm({ onClose, type = 'dating' }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    age: '',
  });
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: any = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.age || parseInt(formData.age) < 18) newErrors.age = 'Must be 18 or older';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Form is valid
      console.log('Form submitted:', formData);
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 relative neon-border">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 neon-glow">
            Join {type === 'marriage' ? 'Marriage' : 'Dating'}
          </h2>
          <p className="text-gray-400">Create your account in seconds</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 bg-black border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors ${
                  errors.name ? 'border-red-500' : 'border-gray-600 focus:border-neon'
                }`}
              />
            </div>
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 bg-black border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-600 focus:border-neon'
                }`}
              />
            </div>
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 bg-black border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors ${
                  errors.password ? 'border-red-500' : 'border-gray-600 focus:border-neon'
                }`}
              />
            </div>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Gender & Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 bg-black border rounded-xl text-white focus:outline-none transition-colors appearance-none ${
                    errors.gender ? 'border-red-500' : 'border-gray-600 focus:border-neon'
                  }`}
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {errors.gender && <p className="text-red-400 text-xs mt-1">{errors.gender}</p>}
            </div>

            <div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  min="18"
                  max="100"
                  value={formData.age}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 bg-black border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors ${
                    errors.age ? 'border-red-500' : 'border-gray-600 focus:border-neon'
                  }`}
                />
              </div>
              {errors.age && <p className="text-red-400 text-xs mt-1">{errors.age}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 card-hover ${
              type === 'marriage' 
                ? 'bg-magenta hover:bg-magenta/80' 
                : 'bg-neon hover:bg-neon/80'
            }`}
          >
            Create Account
          </button>
        </form>

        {/* Terms */}
        <p className="text-xs text-gray-400 text-center mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}