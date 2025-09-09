
import React from 'react';
import { FaUsers, FaUserPlus, FaCheckCircle } from 'react-icons/fa';
import { mockUsers } from '../../data/mocks';

const AdminDashboard: React.FC = () => {
  const totalUsers = mockUsers.length;
  const newSignups = 5; // mock data
  const verifiedProfiles = mockUsers.filter(u => u.isVerified).length;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-blue-500 text-white p-4 rounded-full mr-4">
            <FaUsers size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-3xl font-bold">{totalUsers}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-green-500 text-white p-4 rounded-full mr-4">
            <FaUserPlus size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500">New Sign-ups (24h)</p>
            <p className="text-3xl font-bold">{newSignups}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="bg-purple-500 text-white p-4 rounded-full mr-4">
            <FaCheckCircle size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Verified Profiles</p>
            <p className="text-3xl font-bold">{verifiedProfiles}</p>
          </div>
        </div>
      </div>
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <ul>
            <li className="border-b py-2">User <strong>User 48</strong> registered.</li>
            <li className="border-b py-2">User <strong>User 21</strong> upgraded to Premium.</li>
            <li className="border-b py-2">Profile of <strong>User 15</strong> was verified.</li>
            <li className="py-2">User <strong>User 50</strong> registered.</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
