'use client';

import { useState, useEffect } from 'react';
import { Heart, X, Phone, MessageCircle, RotateCcw, Sparkles } from 'lucide-react';
import { sampleUsers } from '@/data/sampleUsers';
import SignUpForm from '@/components/SignUpForm';

export default function Dating() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [users, setUsers] = useState(sampleUsers.filter(user => user.type === 'dating'));

  const currentUser = users[currentIndex];

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    if (currentIndex >= users.length) return;
    
    setSwipeDirection(direction);
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setSwipeDirection(null);
    }, 300);
  };

  const resetCards = () => {
    setCurrentIndex(0);
    setSwipeDirection(null);
  };

  if (currentIndex >= users.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center gradient-bg rounded-2xl p-12 max-w-md">
          <Sparkles className="w-16 h-16 text-neon mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4 neon-glow">No More Matches</h2>
          <p className="text-gray-300 mb-8">Check back later for more amazing people!</p>
          <button
            onClick={resetCards}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-neon rounded-xl hover:bg-neon/80 transition-colors"
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
      {/* Background Animation */}
      <div className="absolute inset-0 gradient-animation opacity-10"></div>
      
      {/* Floating Sign Up Button */}
      <button
        onClick={() => setShowSignUp(true)}
        className="fixed top-24 right-4 z-30 px-6 py-3 bg-magenta rounded-full text-white font-semibold hover:bg-magenta/80 transition-all duration-300 card-hover pulse-glow"
      >
        Sign Up Now
      </button>

      {/* Main Container */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 neon-glow">Discover</h1>
            <p className="text-gray-400">Swipe to find your perfect match</p>
          </div>

          {/* Swipe Card */}
          <div className="relative h-[600px] mb-8">
            <div className={`swipe-card absolute inset-0 rounded-2xl overflow-hidden neon-border bg-gray-900 ${
              swipeDirection === 'left' ? 'swipe-left' : 
              swipeDirection === 'right' ? 'swipe-right' :
              swipeDirection === 'up' ? 'swipe-up' : ''
            }`}>
              <div className="relative h-2/3">
                <img
                  src={currentUser?.photo}
                  alt={currentUser?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                {/* Age Badge */}
                <div className="absolute top-4 right-4 bg-neon px-3 py-1 rounded-full text-sm font-semibold">
                  {currentUser?.age}
                </div>
                
                {/* Online Status */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Online</span>
                </div>
              </div>
              
              <div className="p-6 h-1/3 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{currentUser?.name}</h3>
                  <p className="text-gray-300 mb-2">{currentUser?.location}</p>
                  <p className="text-sm text-gray-400">{currentUser?.bio}</p>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  {currentUser?.interests.slice(0, 3).map((interest, idx) => (
                    <span key={idx} className="px-3 py-1 bg-neon/20 rounded-full text-xs">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6">
            <button
              onClick={() => handleSwipe('left')}
              className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-400 transition-all duration-300 card-hover"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={() => handleSwipe('up')}
              className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400 transition-all duration-300 card-hover"
            >
              <Phone className="w-8 h-8" />
            </button>
            
            <button
              onClick={() => handleSwipe('right')}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-all duration-300 card-hover"
            >
              <Heart className="w-8 h-8" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm mb-4">Quick actions: ← Pass | ↑ Call | → Like</p>
          </div>
        </div>
      </div>

      {/* Sign Up Modal */}
      {showSignUp && <SignUpForm onClose={() => setShowSignUp(false)} />}
    </div>
  );
}