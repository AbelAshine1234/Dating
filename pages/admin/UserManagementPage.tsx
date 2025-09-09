
import React, { useState } from 'react';
import { mockUsers } from '../../data/mocks';
import Button from '../../components/ui/Button';

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const toggleVerification = (id: number) => {
    setUsers(users.map(u => u.id === id ? {...u, isVerified: !u.isVerified} : u));
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full md:w-1/3 p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-sm">ID</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Age</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Location</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b">
                  <td className="py-3 px-4">{user.id}</td>
                  <td className="py-3 px-4 font-medium">{user.name}</td>
                  <td className="py-3 px-4">{user.age}</td>
                  <td className="py-3 px-4">{user.location}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${user.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {user.isVerified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    <Button variant="secondary" className="text-xs" onClick={() => toggleVerification(user.id)}>
                        {user.isVerified ? 'Un-verify' : 'Verify'}
                    </Button>
                    <Button variant="link" className="text-xs text-red-500">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
