'use client';

import { useState } from 'react';
import { Camera, Edit3, Heart, Users, Settings, Star, Crown, X } from 'lucide-react';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: Edit3 },
    { id: 'photos', label: 'Photos', icon: Camera },
    { id: 'preferences', label: 'Preferences', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-black pt-20 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile Header */}
        <div className="gradient-bg rounded-2xl p-8 mb-8 text-center">
          <div className="relative inline-block mb-4">
            <img
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-neon"
            />
            <button className="absolute bottom-2 right-2 bg-neon p-2 rounded-full hover:bg-neon/80 transition-colors">
              <Camera className="w-4 h-4 text-black" />
            </button>
          </div>
          
          <h1 className="text-3xl font-bold mb-2 neon-glow">John Doe</h1>
          <p className="text-gray-300 mb-4">Software Engineer • 28 years old</p>
          
          <div className="flex justify-center gap-6 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-neon">42</div>
              <div className="text-sm text-gray-400">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-magenta">18</div>
              <div className="text-sm text-gray-400">Matches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon">156</div>
              <div className="text-sm text-gray-400">Views</div>
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            <button className="px-6 py-2 bg-neon text-black rounded-lg font-semibold hover:bg-neon/80 transition-colors">
              Upgrade to Premium
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2 border border-neon text-neon rounded-lg font-semibold hover:bg-neon/10 transition-colors"
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-900 rounded-xl p-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-neon text-black'
                    : 'text-gray-400 hover:text-neon hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'personal' && (
          <div className="bg-gray-900 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 neon-glow">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white focus:border-neon focus:outline-none"
                  />
                ) : (
                  <p className="text-white py-3">John Doe</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    defaultValue="28"
                    className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white focus:border-neon focus:outline-none"
                  />
                ) : (
                  <p className="text-white py-3">28</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    defaultValue="San Francisco, CA"
                    className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white focus:border-neon focus:outline-none"
                  />
                ) : (
                  <p className="text-white py-3">San Francisco, CA</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Occupation</label>
                {isEditing ? (
                  <input
                    type="text"
                    defaultValue="Software Engineer"
                    className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white focus:border-neon focus:outline-none"
                  />
                ) : (
                  <p className="text-white py-3">Software Engineer</p>
                )}
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  rows={4}
                  defaultValue="Love traveling, coding, and trying new cuisines. Looking for someone to share adventures with!"
                  className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white focus:border-neon focus:outline-none resize-none"
                />
              ) : (
                <p className="text-white py-3">Love traveling, coding, and trying new cuisines. Looking for someone to share adventures with!</p>
              )}
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">Interests</label>
              <div className="flex flex-wrap gap-2">
                {['Technology', 'Travel', 'Photography', 'Cooking', 'Music', 'Fitness'].map((interest) => (
                  <span key={interest} className="px-3 py-1 bg-neon/20 border border-neon/30 rounded-full text-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="bg-gray-900 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 neon-glow">Photo Gallery</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="aspect-square bg-gray-800 rounded-xl border-2 border-dashed border-gray-600 flex items-center justify-center cursor-pointer hover:border-neon transition-colors">
                <div className="text-center">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Add Photo</p>
                </div>
              </div>
              
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="aspect-square relative group">
                  <img
                    src={`https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400`}
                    alt={`Photo ${index}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                    <button className="bg-red-500 p-2 rounded-full hover:bg-red-400">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="bg-gray-900 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 neon-glow">Preferences</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Age Range</h3>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="18"
                    max="100"
                    defaultValue="25"
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-sm text-gray-400">18-35</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Distance</h3>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    defaultValue="25"
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-gray-400">25 km</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Looking For</h3>
                <div className="space-y-2">
                  {['Casual Dating', 'Long-term Relationship', 'Marriage', 'Friendship'].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-neon bg-gray-800 border-gray-600 rounded focus:ring-neon focus:ring-2"
                      />
                      <span className="text-white">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-white">Show me on Discovery</span>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-white">Read Receipts</span>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-white">Last Seen</span>
                    <input type="checkbox" className="toggle" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}