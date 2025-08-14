import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileCompletion: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would save the profile data
        navigate('/dating'); // Redirect to dating page after completion
    };

    return (
        <div className="flex-grow bg-gray-100 dark:bg-dark-bg p-4 sm:p-6 lg:p-8 flex items-center justify-center animate-fade-in">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                <h1 className="text-3xl md:text-4xl font-bold font-heading text-center mb-2">Complete Your Profile</h1>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-8">A complete profile gets more attention. Let's set yours up!</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Occupation</label>
                        <input type="text" placeholder="e.g., Software Engineer" required className="mt-1 block w-full p-3 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-neon-purple focus:border-neon-purple" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                        <input type="text" placeholder="e.g., Neo-Tokyo" required className="mt-1 block w-full p-3 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-neon-purple focus:border-neon-purple" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">About Me</label>
                        <textarea rows={4} placeholder="Tell everyone a little about yourself..." required className="mt-1 block w-full p-3 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-neon-purple focus:border-neon-purple" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Your Preferences</h3>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Age Range</label>
                        <div className="flex items-center gap-4 mt-1">
                            <input type="number" defaultValue="25" className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md"/>
                            <span>to</span>
                            <input type="number" defaultValue="35" className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md"/>
                        </div>
                    </div>
                    <button type="submit" className="w-full py-3 bg-gradient-to-r from-neon-purple to-neon-magenta text-white font-bold rounded-md hover:scale-105 transition-transform">
                        Start Matching!
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileCompletion;
