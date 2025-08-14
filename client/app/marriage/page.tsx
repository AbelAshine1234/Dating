'use client';

import { useState } from 'react';
import { Heart, X, MessageCircle, RotateCcw, Users, MapPin, Briefcase, Target } from 'lucide-react';
import { sampleUsers } from '@/data/sampleUsers';
import SignUpForm from '@/components/SignUpForm';

export default function Marriage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [users, setUsers] = useState(sampleUsers.filter(user => user.type === 'marriage'));

  const currentUser = users[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentIndex >= users.length) return;
    
    setSwipeDirection(direction);
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setSwipeDirection(null);
    }, 400);
  };

  const resetCards = () => {
    setCurrentIndex(0);
    setSwipeDirection(null);
  };

  if (currentIndex >= users.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center gradient-bg rounded-2xl p-12 max-w-md">
          <Users className="w-16 h-16 text-magenta mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4 magenta-glow">No More Profiles</h2>
          <p className="text-gray-300 mb-8">Check back later for more potential matches!</p>
          <button
            onClick={resetCards}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-magenta rounded-xl hover:bg-magenta/80 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background */}
      <div className="absolute inset-0 gradient-animation opacity-10"></div>
      
      {/* Side Panel Sign Up */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
        <div className="bg-gray-900 rounded-2xl p-6 max-w-xs border border-magenta/30">
          <h3 className="text-lg font-semibold mb-4 text-magenta">Join Today</h3>
          <p className="text-sm text-gray-400 mb-4">Find your life partner with our advanced matching system</p>
          <button
            onClick={() => setShowSignUp(true)}
            className="w-full px-4 py-2 bg-magenta rounded-lg hover:bg-magenta/80 transition-colors text-sm font-semibold"
          >
            Register Now
          </button>
        </div>
      </div>

      {/* Mobile Sign Up Button */}
      <button
        onClick={() => setShowSignUp(true)}
        className="fixed top-24 right-4 z-30 lg:hidden px-6 py-3 bg-magenta rounded-full text-white font-semibold hover:bg-magenta/80 transition-all duration-300 card-hover"
      >
        Register
      </button>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 magenta-glow">Marriage Matches</h1>
            <p className="text-gray-400">Find your perfect life partner</p>
          </div>

          {/* Profile Card */}
          <div className="relative">
            <div className={`swipe-card rounded-3xl overflow-hidden bg-gray-900 border border-magenta/30 transition-all duration-400 ${
              swipeDirection === 'left' ? 'swipe-left' : 
              swipeDirection === 'right' ? 'swipe-right' : ''
            }`} style={{ boxShadow: '0 0 30px rgba(255, 60, 172, 0.2)' }}>
              
              {/* Photo Section */}
              <div className="relative h-80">
                <img
                  src={currentUser?.photo}
                  alt={currentUser?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-4 left-6">
                  <h2 className="text-3xl font-bold mb-1">{currentUser?.name}</h2>
                  <div className="flex items-center gap-2 text-gray-300">
                    <span>{currentUser?.age} years old</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {currentUser?.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-6 space-y-6">
                {/* Occupation */}
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-magenta" />
                  <div>
                    <p className="font-semibold">Occupation</p>
                    <p className="text-gray-400">{currentUser?.occupation || 'Software Engineer'}</p>
                  </div>
                </div>

                {/* Family Background */}
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-magenta" />
                  <div>
                    <p className="font-semibold">Family</p>
                    <p className="text-gray-400">{currentUser?.family || 'Traditional values, close-knit family'}</p>
                  </div>
                </div>

                {/* Marriage Goals */}
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-magenta" />
                  <div>
                    <p className="font-semibold">Looking For</p>
                    <p className="text-gray-400">{currentUser?.goals || 'Long-term commitment and family'}</p>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <p className="font-semibold mb-2">About</p>
                  <p className="text-gray-400 leading-relaxed">{currentUser?.bio}</p>
                </div>

                {/* Interests */}
                <div>
                  <p className="font-semibold mb-3">Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {currentUser?.interests.map((interest, idx) => (
                      <span key={idx} className="px-3 py-1 bg-magenta/20 border border-magenta/30 rounded-full text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-8 mt-8">
            <button
              onClick={() => handleSwipe('left')}
              className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-all duration-300 card-hover"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={() => handleSwipe('right')}
              className="w-16 h-16 bg-magenta rounded-full flex items-center justify-center hover:bg-magenta/80 transition-all duration-300 card-hover"
            >
              <Heart className="w-8 h-8" />
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">← Pass | → Interested</p>
          </div>
        </div>
      </div>

      {/* Sign Up Modal */}
      {showSignUp && <SignUpForm onClose={() => setShowSignUp(false)} type="marriage" />}
    </div>
  );
}