import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeartIcon, RingIcon, MessageIcon, CreditCardIcon } from '../constants';

const NavItem: React.FC<{ to: string, icon: React.ReactNode, label: string }> = ({ to, icon, label }) => {
    const navClass = ({ isActive }: { isActive: boolean }) =>
        `flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-300 ${
            isActive
                ? 'text-neon-purple'
                : 'text-gray-500 dark:text-gray-400 hover:text-neon-purple'
        }`;

    return (
        <NavLink to={to} className={navClass}>
            {icon}
            <span className="text-xs font-medium">{label}</span>
        </NavLink>
    );
};

export const BottomNavBar: React.FC = () => {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-around items-center h-16">
                <NavItem to="/dating" icon={<HeartIcon />} label="Dating" />
                <NavItem to="/marriage" icon={<RingIcon />} label="Marriage" />
                <NavItem to="/chat" icon={<MessageIcon />} label="Chat" />
                <NavItem to="/subscription" icon={<CreditCardIcon />} label="Pricing" />
            </div>
        </nav>
    );
};
