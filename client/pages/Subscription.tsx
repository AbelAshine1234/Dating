import React, { useState } from 'react';

interface PlanProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  isSelected: boolean;
  onSelect: () => void;
}

const SubscriptionPlan: React.FC<PlanProps> = ({ title, price, features, isPopular, isSelected, onSelect }) => {
  const popularClasses = isPopular ? 'border-neon-magenta scale-105 shadow-neon-magenta/30' : 'border-gray-200 dark:border-gray-700';
  const selectedClasses = isSelected ? 'ring-2 ring-neon-purple shadow-2xl' : 'shadow-lg';

  return (
    <div
      onClick={onSelect}
      className={`relative p-8 bg-white dark:bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ${popularClasses} ${selectedClasses}`}
    >
      {isPopular && <span className="absolute top-0 right-4 -mt-3 bg-neon-magenta text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</span>}
      <h3 className="text-2xl font-bold font-heading text-gray-800 dark:text-white">{title}</h3>
      <p className="mt-2 text-4xl font-bold font-heading text-gray-900 dark:text-white">{price}<span className="text-lg font-medium text-gray-500 dark:text-gray-400">/month</span></p>
      <ul className="mt-6 space-y-3 text-gray-600 dark:text-gray-300 font-sans">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            {feature}
          </li>
        ))}
      </ul>
      <button className="mt-8 w-full py-3 bg-gradient-to-r from-neon-purple to-neon-magenta text-white font-bold rounded-md hover:scale-105 transition-transform disabled:opacity-50" disabled={!isSelected}>
        {isSelected ? 'Current Plan' : 'Choose Plan'}
      </button>
    </div>
  );
}

export const Subscription: React.FC = () => {
    const [selectedPlan, setSelectedPlan] = useState('premium');
  
    const plans = [
        { id: 'basic', title: 'Basic', price: 'Free', features: ['5 Swipes per day', 'Limited messaging', 'Basic filters'], isPopular: false },
        { id: 'premium', title: 'Premium', price: '₹499', features: ['Unlimited Swipes', 'Unlimited messaging', 'Advanced filters', 'See who likes you'], isPopular: true },
        { id: 'pro', title: 'Pro', price: '₹999', features: ['All Premium features', '1 free Boost per month', 'Message before matching', 'Priority support'], isPopular: false },
    ];
  
    return (
        <div className="flex-grow bg-gray-100 dark:bg-dark-bg p-4 sm:p-6 lg:p-8 animate-fade-in">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 dark:text-white">Choose Your Subscription Plan</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Unlock more features and find your match faster.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map(plan => (
                        <SubscriptionPlan 
                            key={plan.id}
                            title={plan.title}
                            price={plan.price}
                            features={plan.features}
                            isPopular={plan.isPopular}
                            isSelected={selectedPlan === plan.id}
                            onSelect={() => setSelectedPlan(plan.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
