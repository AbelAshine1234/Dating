
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockUsers } from '../data/mocks';
import Button from '../components/ui/Button';
import { MdVerified, MdArrowBack } from 'react-icons/md';

const ViewProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const user = mockUsers.find(u => u.id === parseInt(userId || ''));

  if (!user) {
    return (
        <div className="container mx-auto p-6 text-center">
            <h2 className="text-2xl font-bold">User not found</h2>
            <Button onClick={() => navigate(-1)} className="mt-4"><MdArrowBack className="mr-2"/> Go Back</Button>
        </div>
    );
  }

  return (
    <div className="container mx-auto p-4 lg:p-6 bg-gray-50">
        <div className="mb-4">
             <Button variant="secondary" onClick={() => navigate(-1)}><MdArrowBack className="mr-2"/> Back to Search</Button>
        </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
          <img src={user.photoUrl} alt={user.name} className="w-32 h-32 rounded-full border-4 border-white shadow-md" />
          <div className="md:ml-6 mt-4 md:mt-0">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center md:justify-start">{user.name} {user.isVerified && <MdVerified className="text-blue-500 ml-2" />}</h2>
            <p className="text-gray-600">{user.age} years old from {user.location}</p>
            {user.isPremium && <span className="mt-2 inline-block bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">PREMIUM</span>}
          </div>
        </div>

        <div className="mt-8 space-y-8">
            <div><h3 className="text-xl font-bold border-b pb-2">About {user.name}</h3></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <div><strong>Age:</strong> {user.age} years</div><div><strong>Location:</strong> {user.location}</div><div><strong>Religion:</strong> {user.religion}</div><div><strong>Caste:</strong> {user.caste}</div>
                <div className="md:col-span-2"><strong>Bio:</strong> {user.bio}</div>
            </div>
            <div><h3 className="text-xl font-bold border-b pb-2 mt-6">Family Details</h3></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <div><strong>Family Type:</strong> {user.familyDetails?.type}</div><div><strong>Father's Occupation:</strong> {user.familyDetails?.fatherOccupation}</div>
                <div className="md:col-span-2"><strong>Description:</strong> {user.familyDetails?.description}</div>
            </div>
            <div><h3 className="text-xl font-bold border-b pb-2 mt-6">Lifestyle & Hobbies</h3></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <div><strong>Diet:</strong> {user.lifestyle?.diet}</div><div><strong>Smoking:</strong> {user.lifestyle?.smoking ? 'Yes' : 'No'}</div><div><strong>Drinking:</strong> {user.lifestyle?.drinking ? 'Yes' : 'No'}</div>
                <div className="md:col-span-2"><strong>Hobbies:</strong> {user.hobbies?.join(', ')}</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfilePage;
