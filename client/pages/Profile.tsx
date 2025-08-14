
import React, { useState } from 'react';
import { UserIcon, SettingsIcon, SparklesIcon } from '../constants';

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 text-lg font-heading rounded-t-lg transition-colors ${
            active
                ? 'bg-white dark:bg-gray-800 text-neon-purple border-b-2 border-neon-purple'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
    >
        {children}
    </button>
);

const ProfileForm: React.FC = () => (
    <div className="space-y-6">
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input type="text" defaultValue="Aria" className="mt-1 block w-full p-3 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-neon-purple focus:border-neon-purple" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Occupation</label>
            <input type="text" defaultValue="Graphic Designer" className="mt-1 block w-full p-3 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-neon-purple focus:border-neon-purple" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">About Me</label>
            <textarea rows={4} defaultValue="Creative soul who loves turning coffee into stunning visuals. Looking for someone to share gallery visits and late-night talks with." className="mt-1 block w-full p-3 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-neon-purple focus:border-neon-purple" />
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-neon-purple to-neon-magenta text-white font-bold rounded-md hover:scale-105 transition-transform">
            Save Changes
        </button>
    </div>
);

const PhotosPanel: React.FC = () => (
    <div>
        <h3 className="text-xl font-bold mb-4">Your Photos</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1027, 1012, 1014, 237, 1025, 1011].map(id => (
                <div key={id} className="relative group aspect-square">
                    <img src={`https://picsum.photos/id/${id}/300/300`} className="rounded-lg object-cover w-full h-full" alt="profile" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="text-white text-xs bg-red-500/80 px-2 py-1 rounded">Delete</button>
                    </div>
                </div>
            ))}
             <div className="aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                <button className="text-gray-500 dark:text-gray-400 text-center">
                    <span className="text-3xl">+</span><br/>Add Photo
                </button>
            </div>
        </div>
    </div>
);

const PreferencesPanel: React.FC = () => (
    <div className="space-y-6">
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age Range</label>
            <div className="flex items-center gap-4 mt-1">
                <input type="number" defaultValue="25" className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md"/>
                <span>to</span>
                <input type="number" defaultValue="35" className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md"/>
            </div>
        </div>
         <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Distance</label>
            <input type="range" min="1" max="100" defaultValue="50" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-neon-magenta" />
            <p className="text-right">50 km</p>
        </div>
    </div>
);


export const Profile: React.FC = () => {
    const [activeTab, setActiveTab] = useState('info');

    return (
        <div className="flex-grow bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 animate-fade-in">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-white dark:bg-dark-bg rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-8 text-center bg-gradient-to-br from-neon-purple/80 to-neon-magenta/80">
                         <img src="https://picsum.photos/id/1027/200/200" alt="Profile" className="w-32 h-32 rounded-full mx-auto ring-4 ring-white/50 object-cover" />
                        <h2 className="mt-4 text-3xl font-bold font-heading text-white">Aria, 26</h2>
                        <p className="text-purple-200">Neo-Tokyo</p>
                    </div>
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="flex justify-center -mb-px">
                            <TabButton active={activeTab === 'info'} onClick={() => setActiveTab('info')}><UserIcon /> Personal Info</TabButton>
                            <TabButton active={activeTab === 'photos'} onClick={() => setActiveTab('photos')}><SparklesIcon /> Photos</TabButton>
                            <TabButton active={activeTab === 'prefs'} onClick={() => setActiveTab('prefs')}><SettingsIcon /> Preferences</TabButton>
                        </nav>
                    </div>
                    <div className="p-8">
                        {activeTab === 'info' && <ProfileForm />}
                        {activeTab === 'photos' && <PhotosPanel />}
                        {activeTab === 'prefs' && <PreferencesPanel />}
                    </div>
                </div>
            </div>
        </div>
    );
};
