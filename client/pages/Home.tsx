import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, ConnectIcon, UsersIcon, ChatBubbleIcon, SparklesIcon } from '../constants';

const ModeButton: React.FC<{ to: string, title: string, description: string }> = ({ to, title, description }) => (
    <Link to={to} className="group relative w-full md:w-1/3 p-8 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-neon-magenta/30">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-purple to-neon-magenta rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
        <div className="relative">
            <h2 className="text-4xl font-bold font-heading text-gray-800 dark:text-white">{title}</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
        </div>
    </Link>
);

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-neon-purple/20 transition-shadow duration-300 text-center">
        <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center bg-neon-purple/10 text-neon-purple rounded-full">
            <div className="[&>svg]:w-8 [&>svg]:h-8">
                {icon}
            </div>
        </div>
        <h3 className="text-2xl font-bold font-heading text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
);

const BackgroundIcon: React.FC<{ icon: React.ReactNode, top?: string, left?: string, right?: string, bottom?: string, size?: string, opacity?: string, animation?: string }> = ({ icon, top, left, right, bottom, size = 'w-16 h-16', opacity='opacity-5', animation='animate-pulse' }) => (
    <div className={`absolute ${top} ${left} ${right} ${bottom} ${size} ${opacity} text-neon-magenta/50 dark:text-neon-purple/50 ${animation} -z-10`}>
        {icon}
    </div>
);

export const Home: React.FC = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center animate-fade-in bg-light-bg dark:bg-dark-bg overflow-hidden">
        <div className="relative w-full z-10 text-center text-gray-800 dark:text-white py-20 md:py-32">
             <BackgroundIcon icon={<HeartIcon/>} top="top-10" left="left-10" />
             <BackgroundIcon icon={<ConnectIcon/>} top="top-1/4" right="right-20" size="w-24 h-24" animation="animate-spin-slow"/>
             <BackgroundIcon icon={<UsersIcon/>} bottom="bottom-1/3" left="left-24" size="w-20 h-20"/>
             <BackgroundIcon icon={<ChatBubbleIcon/>} bottom="bottom-10" right="right-10" />
            <h1 className="text-6xl md:text-8xl font-bold font-heading drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] dark:drop-shadow-none animate-glow">
                Find Love. Your Way.
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Whether you're looking for a spark or a soulmate, your journey starts here. Choose your path.
            </p>
            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 px-4">
                <ModeButton to="/dating" title="Dating" description="Spontaneous. Exciting. Modern."/>
                <ModeButton to="/marriage" title="Marriage" description="Intentional. Meaningful. Forever."/>
            </div>
        </div>

        <section className="py-20 w-full bg-white dark:bg-gray-800/50">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold font-heading mb-4 text-gray-800 dark:text-white">How We Connect</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">DATEMATCH offers a unique blend of modern dating dynamics and intentional relationship-building tools.</p>
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard icon={<SparklesIcon />} title="Swipe & Match" description="Instantly connect with people who catch your eye with our intuitive and fun swipe interface." />
                    <FeatureCard icon={<ChatBubbleIcon />} title="Meaningful Chats" description="Go beyond small talk. Our chat features are designed to spark deeper conversations." />
                    <FeatureCard icon={<UsersIcon />} title="Smart Recommendations" description="Get tailored suggestions based on your preferences and activity to meet your most compatible matches." />
                </div>
            </div>
        </section>

        <section className="py-20 w-full">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="md:w-1/2">
                        <img src="https://picsum.photos/id/12/800/600" alt="Couple laughing" className="rounded-2xl shadow-2xl" />
                    </div>
                    <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-4xl font-bold font-heading mb-4 text-gray-800 dark:text-white">Start Your Dating Journey Here</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                            Create your profile in minutes and start exploring a world of possibilities. With advanced filters, verified profiles, and dedicated modes for different relationship goals, you're in control.
                        </p>
                        <Link to="/dating" className="inline-block py-3 px-8 bg-gradient-to-r from-neon-magenta to-neon-purple text-white font-bold rounded-lg hover:scale-105 transition-transform shadow-lg">
                            Find Your Match
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
};