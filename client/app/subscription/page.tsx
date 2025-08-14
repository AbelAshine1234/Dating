'use client';

import { useState } from 'react';
import { Check, Crown, Star, Zap, Heart, Users, MessageCircle, Phone, Video, Shield } from 'lucide-react';

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Free Trial',
      originalPrice: null,
      duration: '7 days',
      icon: Heart,
      color: 'text-gray-400',
      borderColor: 'border-gray-600',
      bgColor: 'bg-gray-800/50',
      features: [
        '5 likes per day',
        'Basic matching',
        'Limited chat messages',
        'View profiles',
        'Basic filters'
      ],
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₹499',
      originalPrice: '₹699',
      duration: 'month',
      icon: Star,
      color: 'text-neon',
      borderColor: 'border-neon',
      bgColor: 'bg-neon/5',
      features: [
        'Unlimited likes',
        'Advanced matching algorithm',
        'Unlimited chat messages',
        'See who liked you',
        'Advanced filters',
        'Read receipts',
        'Priority support'
      ],
      popular: true
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '₹999',
      originalPrice: '₹1299',
      duration: 'month',
      icon: Crown,
      color: 'text-magenta',
      borderColor: 'border-magenta',
      bgColor: 'bg-magenta/5',
      features: [
        'Everything in Premium',
        'Video calls',
        'Voice messages',
        'Profile boost',
        'Incognito mode',
        'Travel mode',
        'Premium badges',
        '24/7 VIP support'
      ],
      popular: false
    }
  ];

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId);
    // In a real app, this would integrate with payment gateway
    console.log(`Subscribing to ${planId} plan`);
  };

  return (
    <div className="min-h-screen bg-black pt-20 pb-24">
      {/* Background Animation */}
      <div className="absolute inset-0 gradient-animation opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 neon-glow">
            Choose Your Subscription Plan
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Unlock premium features and find your perfect match faster with our advanced matching algorithms
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;
            
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 transition-all duration-500 card-hover ${
                  plan.popular 
                    ? 'transform scale-105 neon-border pulse-glow' 
                    : `border-2 ${plan.borderColor}`
                } ${plan.bgColor} ${
                  isSelected ? 'ring-4 ring-neon/50' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-neon text-black px-6 py-2 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    plan.popular ? 'bg-neon/20' : 'bg-gray-700'
                  }`}>
                    <Icon className={`w-8 h-8 ${plan.color}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  
                  <div className="mb-4">
                    {plan.originalPrice && (
                      <span className="text-gray-400 line-through text-lg mr-2">
                        {plan.originalPrice}
                      </span>
                    )}
                    <span className={`text-4xl font-bold ${plan.color}`}>
                      {plan.price}
                    </span>
                    {plan.price !== 'Free Trial' && (
                      <span className="text-gray-400">/{plan.duration}</span>
                    )}
                  </div>
                  
                  {plan.price === 'Free Trial' && (
                    <p className="text-sm text-gray-400">No credit card required</p>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.popular ? 'bg-neon' : 'bg-gray-600'
                      }`}>
                        <Check className={`w-3 h-3 ${
                          plan.popular ? 'text-black' : 'text-white'
                        }`} />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Subscribe Button */}
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    plan.popular
                      ? 'bg-neon text-black hover:bg-neon/80 hover:scale-105'
                      : plan.id === 'pro'
                      ? 'bg-magenta text-white hover:bg-magenta/80 hover:scale-105'
                      : 'bg-gray-700 text-white hover:bg-gray-600 hover:scale-105'
                  } ${isSelected ? 'ring-4 ring-white/20' : ''}`}
                >
                  {isSelected ? 'Selected' : plan.price === 'Free Trial' ? 'Start Free Trial' : 'Subscribe Now'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Additional Features Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-12 magenta-glow">Why Choose Premium?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Users,
                title: 'Smart Matching',
                description: 'AI-powered compatibility analysis'
              },
              {
                icon: Video,
                title: 'Video Calls',
                description: 'Face-to-face conversations'
              },
              {
                icon: MessageCircle,
                title: 'Unlimited Chat',
                description: 'No message limits'
              },
              {
                icon: Shield,
                title: 'Privacy Control',
                description: 'Advanced privacy settings'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="gradient-bg rounded-xl p-6 card-hover">
                  <Icon className="w-12 h-12 text-neon mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-16 text-center gradient-bg rounded-2xl p-8 max-w-2xl mx-auto">
          <Shield className="w-16 h-16 text-neon mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">30-Day Money Back Guarantee</h3>
          <p className="text-gray-300">
            Not satisfied with your subscription? Get a full refund within 30 days, no questions asked.
          </p>
        </div>
      </div>
    </div>
  );
}