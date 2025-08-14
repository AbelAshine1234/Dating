'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Users, Sparkles } from 'lucide-react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-animation opacity-20"></div>
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 float-animation">
        <Heart className="w-8 h-8 text-magenta opacity-30" />
      </div>
      <div className="absolute top-40 right-20 float-animation" style={{ animationDelay: '2s' }}>
        <Sparkles className="w-6 h-6 text-neon opacity-40" />
      </div>
      <div className="absolute bottom-40 left-20 float-animation" style={{ animationDelay: '4s' }}>
        <Users className="w-10 h-10 text-magenta opacity-25" />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 min-h-screen flex items-center justify-center px-4 transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            <span className="neon-glow text-neon">Find Love.</span>
            <br />
            <span className="magenta-glow text-magenta">Your Way.</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the future of connections. Whether you're looking for romance or marriage, 
            we've got the perfect match waiting for you.
          </p>

          {/* Mode Selection Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button
              onClick={() => router.push('/dating')}
              className="group relative px-12 py-6 text-2xl font-semibold rounded-2xl border-2 border-neon bg-black/50 hover:bg-neon/10 transition-all duration-300 neon-border card-hover min-w-[250px]"
            >
              <div className="flex items-center justify-center gap-4">
                <Heart className="w-8 h-8" />
                <span>Dating</span>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-neon/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button
              onClick={() => router.push('/marriage')}
              className="group relative px-12 py-6 text-2xl font-semibold rounded-2xl border-2 border-magenta bg-black/50 hover:bg-magenta/10 transition-all duration-300 min-w-[250px]"
              style={{ boxShadow: '0 0 20px rgba(255, 60, 172, 0.5), inset 0 0 20px rgba(255, 60, 172, 0.1)' }}
            >
              <div className="flex items-center justify-center gap-4">
                <Users className="w-8 h-8" />
                <span>Marriage</span>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-magenta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Features Preview */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: 'Smart Matching', desc: 'Compatibility analysis' },
              { title: 'Video Calls', desc: 'Face-to-face conversations' },
              { title: 'Secure Chat', desc: 'Private messaging system' }
            ].map((feature, index) => (
              <div key={index} className="gradient-bg rounded-xl p-6 card-hover">
                <h3 className="text-xl font-semibold mb-2 text-neon">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}